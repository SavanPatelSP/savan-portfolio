import type { DiagnosticsReport } from "../../types/report";
import { buildSentryTags } from "./sentry-tags";
import { buildSentryContexts, buildSentryExtra } from "./sentry-context";

const SENSITIVE_KEYS = [
  "password",
  "secret",
  "token",
  "authorization",
  "cookie",
  "set-cookie",
  "api_key",
  "apikey",
  "access_token",
  "refresh_token",
];

function sanitizeValue(value: unknown): unknown {
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    for (const key of SENSITIVE_KEYS) {
      if (lower.includes(key)) {
        return "[REDACTED]";
      }
    }
    if (value.length > 500) {
      return value.slice(0, 500) + "...[TRUNCATED]";
    }
  }
  return value;
}

function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    const isSensitive = SENSITIVE_KEYS.some((sensitive) =>
      lowerKey.includes(sensitive)
    );

    if (isSensitive) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = value;
    } else {
      sanitized[key] = sanitizeValue(value);
    }
  }
  return sanitized;
}

function buildFingerprints(report: DiagnosticsReport): string[] {
  const fingerprints: string[] = [];

  fingerprints.push(report.classification.category);
  fingerprints.push(report.classification.severity);

  if (report.error.stack) {
    const stackLines = report.error.stack.split("\n").slice(0, 5);
    fingerprints.push(stackLines.join("|"));
  }

  if (report.classification.likelyCauses.length > 0) {
    fingerprints.push(report.classification.likelyCauses[0]);
  }

  return fingerprints;
}

function buildRelease(): string {
  const version = process.env.npm_package_version || "0.1.0";
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA || "";
  const env = process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

  if (commitSha) {
    return `${version}@${commitSha.slice(0, 7)}`;
  }
  return `${version}@${env}`;
}

export interface MappedSentryEvent {
  exception: {
    values: Array<{
      type: string;
      value: string;
      stacktrace?: {
        frames: Array<{
          filename?: string;
          function?: string;
          lineno?: number;
          colno?: number;
          in_app?: boolean;
        }>;
      };
    }>;
  };
  tags: Record<string, string>;
  contexts: Record<string, unknown>;
  extra: Record<string, unknown>;
  fingerprints: string[];
  level: "fatal" | "error" | "warning" | "info";
  release: string;
  environment: string;
  timestamp: number;
}

export function mapReportToSentryEvent(
  report: DiagnosticsReport
): MappedSentryEvent {
  const stackFrames = parseStackTrace(report.error.stack);

  const level = mapSeverityToLevel(report.classification.severity);

  return {
    exception: {
      values: [
        {
          type: report.error.name || "DiagnosticsError",
          value: report.error.message,
          ...(stackFrames.length > 0 && {
            stacktrace: {
              frames: stackFrames,
            },
          }),
        },
      ],
    },
    tags: buildSentryTags(report),
    contexts: buildSentryContexts(report),
    extra: buildSentryExtra(report),
    fingerprints: buildFingerprints(report),
    level,
    release: buildRelease(),
    environment:
      process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
    timestamp: new Date(report.timestampISO).getTime() / 1000,
  };
}

function parseStackTrace(
  stack?: string
): Array<{
  filename?: string;
  function?: string;
  lineno?: number;
  colno?: number;
  in_app?: boolean;
}> {
  if (!stack) return [];

  const frames: Array<{
    filename?: string;
    function?: string;
    lineno?: number;
    colno?: number;
    in_app?: boolean;
  }> = [];

  const lines = stack.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const atMatch = trimmed.match(
      /at\s+(?:(.+?)\s+\()?(.+?):(\d+):(\d+)\)?/
    );
    if (atMatch) {
      frames.push({
        function: atMatch[1] || undefined,
        filename: atMatch[2],
        lineno: parseInt(atMatch[3], 10),
        colno: parseInt(atMatch[4], 10),
        in_app: !atMatch[2]?.includes("node_modules"),
      });
      continue;
    }

    const lineMatch = trimmed.match(/(.+?):(\d+):(\d+)/);
    if (lineMatch) {
      frames.push({
        filename: lineMatch[1],
        lineno: parseInt(lineMatch[2], 10),
        colno: parseInt(lineMatch[3], 10),
        in_app: !lineMatch[1]?.includes("node_modules"),
      });
    }
  }

  return frames.reverse();
}

function mapSeverityToLevel(
  severity: string
): "fatal" | "error" | "warning" | "info" {
  switch (severity) {
    case "critical":
      return "error";
    case "transient":
      return "warning";
    case "recoverable":
      return "info";
    default:
      return "error";
  }
}

export { sanitizeObject, buildRelease };
