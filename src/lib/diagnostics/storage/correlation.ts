import type {
  ReportCorrelation,
  OccurrenceRecord,
  OccurrenceEntry,
  StoredReport,
} from "./storage";
import { generateContentHash } from "../fingerprint";

const correlations = new Map<string, ReportCorrelation>();
const occurrenceHistory = new Map<string, OccurrenceEntry[]>();
const fingerprintIndex = new Map<string, Set<string>>();
const sessionIndex = new Map<string, Set<string>>();
const MAX_HISTORY = 500;

function log(level: "info" | "warn" | "error", msg: string): void {
  const tag = "[diagnostics:correlation]";
  const entry = `${tag} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

export function buildFingerprint(
  errorName: string,
  errorMessage: string,
  stack?: string,
  category?: string,
  severity?: string
): string {
  const parts = [
    errorName || "unknown",
    errorMessage || "unknown",
    category || "unknown",
    severity || "unknown",
  ];

  if (stack) {
    const frames = stack.split("\n").slice(0, 5);
    for (const frame of frames) {
      const trimmed = frame.trim();
      if (trimmed && !trimmed.startsWith("at ")) {
        parts.push(trimmed);
      }
    }
  }

  const input = parts.join(":::");
  return generateContentHash(input);
}

export function buildCorrelation(
  errorId: string,
  sessionId: string,
  fingerprint: string,
  timestamp: string
): ReportCorrelation {
  const existingIds = fingerprintIndex.get(fingerprint) || new Set();

  if (existingIds.size > 0) {
    const parentErrorId = Array.from(existingIds)[0];
    const parent = correlations.get(parentErrorId);
    if (parent) {
      const updatedParent: ReportCorrelation = {
        ...parent,
        relatedIds: [...parent.relatedIds, errorId],
        duplicateCount: parent.duplicateCount + 1,
        latestOccurrence: timestamp,
      };
      correlations.set(parentErrorId, updatedParent);
    }
  }

  const correlation: ReportCorrelation = {
    id: generateContentHash(`${errorId}:${sessionId}:${timestamp}`),
    fingerprint,
    sessionId,
    parentId: existingIds.size > 0 ? Array.from(existingIds)[0] : null,
    relatedIds: [],
    duplicateCount: 0,
    occurrenceCount: 1,
    firstOccurrence: timestamp,
    latestOccurrence: timestamp,
  };

  correlations.set(errorId, correlation);

  if (!fingerprintIndex.has(fingerprint)) {
    fingerprintIndex.set(fingerprint, new Set());
  }
  fingerprintIndex.get(fingerprint)!.add(errorId);

  if (!sessionIndex.has(sessionId)) {
    sessionIndex.set(sessionId, new Set());
  }
  sessionIndex.get(sessionId)!.add(errorId);

  return correlation;
}

export function buildOccurrenceRecord(
  errorId: string,
  sessionId: string,
  timestamp: string
): OccurrenceRecord {
  const entry: OccurrenceEntry = {
    timestamp,
    errorId,
    sessionId,
  };

  if (!occurrenceHistory.has(errorId)) {
    occurrenceHistory.set(errorId, []);
  }

  const history = occurrenceHistory.get(errorId)!;
  history.push(entry);

  if (history.length > MAX_HISTORY) {
    history.shift();
  }

  const correlation = correlations.get(errorId);
  const count = correlation ? correlation.occurrenceCount : 1;

  return {
    count,
    firstAt: correlation?.firstOccurrence || timestamp,
    latestAt: timestamp,
    history: [...history],
  };
}

export function incrementOccurrence(errorId: string): void {
  const correlation = correlations.get(errorId);
  if (correlation) {
    const updated: ReportCorrelation = {
      ...correlation,
      occurrenceCount: correlation.occurrenceCount + 1,
      latestOccurrence: new Date().toISOString(),
    };
    correlations.set(errorId, updated);
  }
}

export function getCorrelationById(errorId: string): ReportCorrelation | null {
  return correlations.get(errorId) || null;
}

export function getCorrelationByFingerprint(
  fingerprint: string
): readonly ReportCorrelation[] {
  const ids = fingerprintIndex.get(fingerprint);
  if (!ids) return [];
  return Array.from(ids)
    .map((id) => correlations.get(id))
    .filter((c): c is ReportCorrelation => c !== null);
}

export function getCorrelationsBySession(
  sessionId: string
): readonly ReportCorrelation[] {
  const ids = sessionIndex.get(sessionId);
  if (!ids) return [];
  return Array.from(ids)
    .map((id) => correlations.get(id))
    .filter((c): c is ReportCorrelation => c !== null);
}

export function findDuplicates(
  fingerprint: string
): readonly ReportCorrelation[] {
  return getCorrelationByFingerprint(fingerprint).filter(
    (c) => c.duplicateCount > 0 || c.occurrenceCount > 1
  );
}

export function getOccurrenceHistory(
  errorId: string
): readonly OccurrenceEntry[] {
  return occurrenceHistory.get(errorId) || [];
}

export function updateStoredReportCorrelation(
  stored: StoredReport,
  providerResults: readonly { providerId: string; success: boolean; timestamp: string; error?: string }[],
  pipelineResults?: { hookCount: number; executedHooks: number; failedHooks: number; providerCount: number; successfulProviders: number; failedProviders: number; dispatchDuration: number }
): StoredReport {
  const errorId = stored.report.errorId;
  const correlation = correlations.get(errorId);
  const occurrences = occurrenceHistory.get(errorId) || [];

  const updatedCorrelation: ReportCorrelation = correlation
    ? { ...correlation }
    : stored.correlation;

  const updatedOccurrences: OccurrenceRecord = {
    ...stored.occurrences,
    count: updatedCorrelation.occurrenceCount,
    latestAt: new Date().toISOString(),
    history: occurrences.map((e) => ({ ...e })),
  };

  const updatedProviderResults = providerResults.map((r) => ({
    providerId: r.providerId,
    success: r.success,
    timestamp: r.timestamp,
    error: r.error,
  }));

  const updatedPipelineResults = pipelineResults
    ? [
        ...stored.pipelineResults,
        {
          timestamp: new Date().toISOString(),
          hookCount: pipelineResults.hookCount,
          executedHooks: pipelineResults.executedHooks,
          failedHooks: pipelineResults.failedHooks,
          providerCount: pipelineResults.providerCount,
          successfulProviders: pipelineResults.successfulProviders,
          failedProviders: pipelineResults.failedProviders,
          dispatchDuration: pipelineResults.dispatchDuration,
        },
      ]
    : stored.pipelineResults;

  return {
    ...stored,
    correlation: updatedCorrelation,
    occurrences: updatedOccurrences,
    providerResults: updatedProviderResults,
    pipelineResults: updatedPipelineResults,
    storage: {
      ...stored.storage,
      updatedAt: new Date().toISOString(),
    },
  };
}

export function clearCorrelationData(): void {
  correlations.clear();
  occurrenceHistory.clear();
  fingerprintIndex.clear();
  sessionIndex.clear();
  log("info", "Correlation data cleared");
}

export function getCorrelationMetrics(): {
  totalCorrelations: number;
  totalSessions: number;
  totalFingerprints: number;
  averageOccurrences: number;
  duplicatesFound: number;
} {
  let totalOccurrences = 0;
  let duplicatesFound = 0;

  for (const correlation of correlations.values()) {
    totalOccurrences += correlation.occurrenceCount;
    if (correlation.duplicateCount > 0) {
      duplicatesFound += 1;
    }
  }

  return {
    totalCorrelations: correlations.size,
    totalSessions: sessionIndex.size,
    totalFingerprints: fingerprintIndex.size,
    averageOccurrences:
      correlations.size > 0 ? totalOccurrences / correlations.size : 0,
    duplicatesFound,
  };
}
