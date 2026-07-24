import type { ErrorClassification } from "../types/diagnostics";

export interface Suggestion {
  type: "user" | "developer";
  priority: "high" | "medium" | "low";
  message: string;
}

export function generateSuggestions(
  classification: ErrorClassification
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  for (const resolution of classification.suggestedResolution) {
    suggestions.push({
      type: "user",
      priority: classification.severity === "critical" ? "high" : "medium",
      message: resolution,
    });
  }

  if (classification.severity === "critical") {
    suggestions.push({
      type: "developer",
      priority: "high",
      message: "Critical error detected — investigate immediately.",
    });
  }

  if (classification.category === "runtime") {
    suggestions.push({
      type: "developer",
      priority: "medium",
      message:
        "Review stack trace to identify the root cause in application code.",
    });
  }

  if (classification.category === "network") {
    suggestions.push({
      type: "developer",
      priority: "low",
      message: "Verify service health endpoints and retry logic.",
    });
  }

  return suggestions;
}
