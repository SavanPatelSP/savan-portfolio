import type { ErrorClassification } from "../types/diagnostics";
import { classifyError } from "./classifier";

export interface AnalysisResult {
  classification: ErrorClassification;
  timestamp: string;
  analyzedAt: string;
}

export function analyzeError(
  message: string,
  stack?: string
): AnalysisResult {
  const classification = classifyError(message, stack);
  const now = new Date();

  return {
    classification,
    timestamp: now.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    analyzedAt: now.toISOString(),
  };
}

export { classifyError } from "./classifier";
export { buildSummary, getCategoryLabel, getSeverityLabel } from "./summary";
export { extractLikelyCauses, extractUserResolutions, extractDeveloperNotes } from "./causes";
export { generateSuggestions } from "./suggestions";
