import type { DiagnosticsProvider, ProviderResult } from "../provider";
import type { DiagnosticsReport } from "../../types/report";
import { mapReportToSentryEvent } from "./sentry-mapper";
import { buildSentryTags } from "./sentry-tags";

const TAG = "[diagnostics:sentry]";

const correlations = new Map<string, string>();
const MAX_CORRELATIONS = 500;

function log(level: "info" | "warn" | "error", msg: string): void {
  const entry = `${TAG} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

function getEnv(name: string): string | null {
  if (typeof process === "undefined") return null;
  const val = process.env[name];
  if (!val || val.trim() === "") return null;
  return val.trim();
}

function isConfigured(): boolean {
  return getEnv("SENTRY_DSN") !== null;
}

function getSampleRate(): number {
  const raw = getEnv("SENTRY_TRACES_SAMPLE_RATE");
  if (!raw) return 1;
  const parsed = parseFloat(raw);
  if (isNaN(parsed) || parsed < 0) return 1;
  if (parsed > 1) return 1;
  return parsed;
}

function storeCorrelation(spnetErrorId: string, sentryEventId: string): void {
  correlations.set(spnetErrorId, sentryEventId);

  if (correlations.size > MAX_CORRELATIONS) {
    const firstKey = correlations.keys().next().value;
    if (firstKey) correlations.delete(firstKey);
  }
}

async function loadSentry(): Promise<typeof import("@sentry/nextjs") | null> {
  try {
    return await import("@sentry/nextjs");
  } catch {
    return null;
  }
}

async function addDiagnosticsBreadcrumbs(
  report: DiagnosticsReport
): Promise<void> {
  try {
    const Sentry = await loadSentry();
    if (!Sentry) return;

    Sentry.addBreadcrumb({
      category: "spnet.diagnostics",
      message: `Error captured: ${report.errorId}`,
      level: "info",
      data: {
        error_id: report.errorId,
        route: report.route,
        severity: report.classification.severity,
        category: report.classification.category,
      },
    });

    Sentry.addBreadcrumb({
      category: "spnet.session",
      message: `Session ${report.session.sessionId} — ${report.session.errorsThisSession} errors`,
      level: "info",
      data: {
        session_id: report.session.sessionId,
        errors_this_session: report.session.errorsThisSession,
        duration_ms: report.session.duration,
      },
    });

    if (report.classification.likelyCauses.length > 0) {
      Sentry.addBreadcrumb({
        category: "spnet.classification",
        message: `Likely cause: ${report.classification.likelyCauses[0]}`,
        level: "info",
        data: {
          causes: report.classification.likelyCauses,
          resolutions: report.classification.suggestedResolution,
        },
      });
    }

    for (const resolution of report.classification.suggestedResolution) {
      Sentry.addBreadcrumb({
        category: "spnet.resolution",
        message: resolution,
        level: "info",
      });
    }
  } catch {
    // Breadcrumb failures are non-critical
  }
}

async function sendToSentry(
  report: DiagnosticsReport
): Promise<ProviderResult> {
  try {
    const Sentry = await loadSentry();
    if (!Sentry) {
      return {
        success: false,
        providerId: "sentry",
        error: "Sentry module could not be loaded",
        timestamp: new Date().toISOString(),
      };
    }

    const mappedEvent = mapReportToSentryEvent(report);

    const eventId = Sentry.withScope((scope) => {
      const tags = buildSentryTags(report);
      for (const [key, value] of Object.entries(tags)) {
        scope.setTag(key, value);
      }

      for (const [key, value] of Object.entries(mappedEvent.contexts)) {
        scope.setContext(key, value as Record<string, unknown>);
      }

      scope.setFingerprint(mappedEvent.fingerprints);
      scope.setLevel(mappedEvent.level);

      for (const [key, value] of Object.entries(mappedEvent.extra)) {
        scope.setExtra(key, value);
      }

      const originalError = new Error(report.error.message);
      originalError.name = report.error.name || "DiagnosticsError";
      if (report.error.stack) {
        originalError.stack = report.error.stack;
      }

      return Sentry.captureException(originalError);
    });

    if (eventId) {
      storeCorrelation(report.errorId, eventId);
      log("info", `Correlation created: ${report.errorId} → ${eventId}`);
    }

    return {
      success: true,
      providerId: "sentry",
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Sentry error";
    log("error", `Failed to send to Sentry: ${message}`);
    return {
      success: false,
      providerId: "sentry",
      error: message,
      timestamp: new Date().toISOString(),
    };
  }
}

export interface SentryCorrelation {
  spnetErrorId: string;
  sentryEventId: string;
}

export function getCorrelation(spnetErrorId: string): SentryCorrelation | null {
  const sentryEventId = correlations.get(spnetErrorId);
  if (!sentryEventId) return null;
  return { spnetErrorId, sentryEventId };
}

export function getAllCorrelations(): SentryCorrelation[] {
  return Array.from(correlations.entries()).map(
    ([spnetErrorId, sentryEventId]) => ({ spnetErrorId, sentryEventId })
  );
}

export function clearCorrelations(): void {
  correlations.clear();
}

export const SentryProvider: DiagnosticsProvider = {
  name: "Sentry",
  id: "sentry",

  isAvailable(): boolean {
    if (!isConfigured()) return false;
    try {
      return typeof window !== "undefined" || typeof process !== "undefined";
    } catch {
      return false;
    }
  },

  async send(report: DiagnosticsReport): Promise<ProviderResult> {
    const sampleRate = getSampleRate();
    if (sampleRate < 1) {
      const random = Math.random();
      if (random > sampleRate) {
        log("info", `Skipped (sampled out): ${report.errorId}`);
        return {
          success: true,
          providerId: "sentry",
          timestamp: new Date().toISOString(),
        };
      }
    }

    log("info", `Queued to Sentry: ${report.errorId}`);
    await addDiagnosticsBreadcrumbs(report);

    const result = await sendToSentry(report);

    if (result.success) {
      log("info", `Uploaded: ${report.errorId}`);
    } else {
      log("error", `Failed: ${report.errorId} — ${result.error}`);
    }

    return result;
  },
};
