import type { ErrorClassification } from "../types/diagnostics";
import { CATEGORY_LABELS, SEVERITY_LABELS } from "../constants";

export function buildSummary(classification: ErrorClassification): string {
  return `[${SEVERITY_LABELS[classification.severity] || classification.severity}] ${classification.label}: ${classification.summary}`;
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

export function getSeverityLabel(severity: string): string {
  return SEVERITY_LABELS[severity] || severity;
}

export function formatCauses(causes: readonly string[]): string {
  return causes.map((c) => `  - ${c}`).join("\n");
}

export function formatResolutions(resolutions: readonly string[]): string {
  return resolutions.map((r) => `  - ${r}`).join("\n");
}
