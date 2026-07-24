import type { DiagnosticsReport } from "../../types/report";
import { SEVERITY_LABELS, CATEGORY_LABELS } from "../../constants";

export interface SentryTags {
  [key: string]: string;
}

export function buildSentryTags(report: DiagnosticsReport): SentryTags {
  const severityLabel =
    SEVERITY_LABELS[report.classification.severity] ||
    report.classification.severity;
  const categoryLabel =
    CATEGORY_LABELS[report.classification.category] ||
    report.classification.category;

  return {
    "spnet.error_id": report.errorId,
    "spnet.session_id": report.session.sessionId,
    "spnet.severity": severityLabel,
    "spnet.category": report.classification.category,
    "spnet.category_label": categoryLabel,
    "spnet.route": report.route,
    "spnet.error_name": report.error.name,
    "spnet.sdk_version": report.metadata.sdkVersion,
    "spnet.errors_this_session": String(report.session.errorsThisSession),
    "spnet.recovered": String(report.session.recovered),
    "spnet.recovery_attempts": String(report.session.recoveryAttempts),

    "browser.name": report.environment.browser,
    "browser.version": report.environment.browserVersion,
    "os.name": report.environment.os,
    "device.type": report.environment.device,
    "viewport.size": `${report.environment.viewport.width}x${report.environment.viewport.height}`,
    "viewport.screen": `${report.environment.viewport.screenWidth}x${report.environment.viewport.screenHeight}`,
    "viewport.pixel_ratio": String(report.environment.viewport.pixelRatio),
    "viewport.language": report.environment.viewport.language,
    "viewport.timezone": report.environment.viewport.timezone,

    "runtime.framework": report.environment.runtime.framework,
  };
}
