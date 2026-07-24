import type { DiagnosticsReport } from "../types/report";
import { formatReportToPlainText } from "./formatter";

export function copyReportToClipboard(report: DiagnosticsReport): Promise<boolean> {
  const text = formatReportToPlainText(report);

  if (typeof navigator !== "undefined" && navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );
  }

  return Promise.resolve(false);
}

export function getReportAsText(report: DiagnosticsReport): string {
  return formatReportToPlainText(report);
}
