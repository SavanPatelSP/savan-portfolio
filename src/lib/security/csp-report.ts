import { CSP_REPORT } from "./constants";

interface CSPReportBody {
  "document-uri"?: string;
  referrer?: string;
  "blocked-uri"?: string;
  violatedDirective?: string;
  "effective-directive"?: string;
  "original-policy"?: string;
  disposition?: string;
  "status-code"?: number;
  "script-sample"?: string;
  sourceFile?: string;
  "line-number"?: number;
  "column-number"?: number;
}

export interface SanitizedCSPReport {
  timestamp: string;
  blockedUri: string;
  violatedDirective: string;
  documentUri: string;
  userAgent: string;
  sourceFile: string;
  lineNumber: number | null;
  columnNumber: number | null;
  statusCode: number | null;
  disposition: string;
}

function sanitizeField(value: string | undefined, maxLen: number = CSP_REPORT.MAX_FIELD_LENGTH): string {
  if (!value || typeof value !== "string") return "";
  return value.replace(/[<>"'&\x00-\x1f]/g, "").slice(0, maxLen);
}

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return null;
}

export function parseCSPReport(body: unknown): SanitizedCSPReport | null {
  if (!body || typeof body !== "object") return null;

  const raw = body as Record<string, unknown>;
  const report = (raw["csp-report"] || raw) as Record<string, unknown>;

  if (!report || typeof report !== "object") return null;

  const blockedUri = sanitizeField(report["blocked-uri"] as string);
  const violatedDirective = sanitizeField(
    (report.violatedDirective || report["effective-directive"]) as string,
  );

  if (!blockedUri && !violatedDirective) return null;

  return {
    timestamp: new Date().toISOString(),
    blockedUri,
    violatedDirective,
    documentUri: sanitizeField(report["document-uri"] as string),
    userAgent: sanitizeField(report["user-agent"] as string, 150),
    sourceFile: sanitizeField(report.sourceFile as string),
    lineNumber: parseNumber(report["line-number"]),
    columnNumber: parseNumber(report["column-number"]),
    statusCode: parseNumber(report["status-code"]),
    disposition: CSP_REPORT.ALLOWED_DISPOSITIONS.includes(
      (report.disposition as "enforce" | "report") || "enforce",
    )
      ? (report.disposition as string)
      : "enforce",
  };
}

export function logCSPReport(report: SanitizedCSPReport): void {
  console.warn(CSP_REPORT.TAG, JSON.stringify(report));
}
