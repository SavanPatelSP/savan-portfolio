import type { DiagnosticsReport } from "../types/report";
import type { CollectorData } from "../types/diagnostics";
import type { SessionData } from "../types/session";
import { SDK_VERSION } from "../constants";
import { deepFreeze } from "../utils";

export interface ReportBuilderInput {
  errorId: string;
  sessionId: string;
  error: {
    message: string;
    stack?: string;
    digest?: string;
    name: string;
  };
  classification: {
    category: string;
    label: string;
    severity: string;
    summary: string;
    likelyCauses: string[];
    suggestedResolution: string[];
  };
  environment: CollectorData;
  session: SessionData;
}

export function buildReport(input: ReportBuilderInput): DiagnosticsReport {
  const now = new Date();

  const report: DiagnosticsReport = {
    errorId: input.errorId,
    sessionId: input.sessionId,
    timestamp: input.environment.environment.timestamp,
    timestampISO: input.environment.environment.timestampISO,
    route: input.environment.route,
    error: {
      message: input.error.message,
      stack: input.error.stack,
      digest: input.error.digest,
      name: input.error.name,
    },
    classification: {
      category: input.classification.category as DiagnosticsReport["classification"]["category"],
      label: input.classification.label,
      severity: input.classification.severity as DiagnosticsReport["classification"]["severity"],
      summary: input.classification.summary,
      likelyCauses: [...input.classification.likelyCauses],
      suggestedResolution: [...input.classification.suggestedResolution],
    },
    environment: { ...input.environment },
    session: {
      sessionId: input.session.sessionId,
      startedAt: input.session.startedAt,
      errorsThisSession: input.session.errorsThisSession,
      recovered: input.session.recovered,
      recoveryAttempts: input.session.recoveryAttempts,
      duration: now.getTime() - new Date(input.session.startedAtISO).getTime(),
    },
    metadata: {
      sdkVersion: SDK_VERSION,
    },
  };

  return deepFreeze(report);
}
