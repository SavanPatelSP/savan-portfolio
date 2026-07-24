import type { DiagnosticsReport } from "../../types/report";

export interface SentryContexts {
  [key: string]: Record<string, unknown>;
}

export function buildSentryContexts(report: DiagnosticsReport): SentryContexts {
  return {
    "spnet.diagnostics": {
      error_id: report.errorId,
      session_id: report.session.sessionId,
      timestamp: report.timestampISO,
      route: report.route,
      sdk_version: report.metadata.sdkVersion,
    },
    "spnet.classification": {
      category: report.classification.category,
      label: report.classification.label,
      severity: report.classification.severity,
      summary: report.classification.summary,
      likely_causes: [...report.classification.likelyCauses],
      suggested_resolution: [...report.classification.suggestedResolution],
    },
    "spnet.session": {
      session_id: report.session.sessionId,
      started_at: report.session.startedAt,
      errors_this_session: report.session.errorsThisSession,
      recovered: report.session.recovered,
      recovery_attempts: report.session.recoveryAttempts,
      duration_ms: report.session.duration,
    },
    "spnet.environment": {
      browser: report.environment.browser,
      browser_version: report.environment.browserVersion,
      os: report.environment.os,
      device: report.environment.device,
      user_agent: report.environment.environment.userAgent,
      framework: report.environment.runtime.framework,
      is_client: report.environment.runtime.isClient,
      is_server: report.environment.runtime.isServer,
    },
    "spnet.viewport": {
      width: report.environment.viewport.width,
      height: report.environment.viewport.height,
      screen_width: report.environment.viewport.screenWidth,
      screen_height: report.environment.viewport.screenHeight,
      pixel_ratio: report.environment.viewport.pixelRatio,
      language: report.environment.viewport.language,
      timezone: report.environment.viewport.timezone,
    },
  };
}

export function buildSentryExtra(report: DiagnosticsReport): Record<string, unknown> {
  return {
    "spnet.likely_causes": report.classification.likelyCauses,
    "spnet.suggested_resolution": report.classification.suggestedResolution,
    "spnet.full_report": {
      error_id: report.errorId,
      session_id: report.session.sessionId,
      timestamp: report.timestampISO,
      route: report.route,
      error: {
        message: report.error.message,
        name: report.error.name,
      },
      classification: {
        category: report.classification.category,
        label: report.classification.label,
        severity: report.classification.severity,
        summary: report.classification.summary,
      },
      environment: {
        browser: report.environment.browser,
        os: report.environment.os,
        device: report.environment.device,
      },
      session: {
        errors_this_session: report.session.errorsThisSession,
        duration_ms: report.session.duration,
      },
    },
  };
}
