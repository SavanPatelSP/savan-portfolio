import type { ErrorClassification } from "../types/diagnostics";

export function extractLikelyCauses(
  classification: ErrorClassification
): string[] {
  return [...classification.likelyCauses];
}

export function extractUserResolutions(
  classification: ErrorClassification
): string[] {
  return [...classification.suggestedResolution];
}

export function extractDeveloperNotes(
  classification: ErrorClassification
): string {
  const parts: string[] = [];
  parts.push(`Category: ${classification.category}`);
  parts.push(`Severity: ${classification.severity}`);
  parts.push(`Label: ${classification.label}`);

  if (classification.category === "runtime") {
    parts.push(
      "This error may indicate a bug in application logic. Review the stack trace for the originating file and line number."
    );
  }

  if (classification.category === "network") {
    parts.push(
      "Verify the backend service is healthy and the request URL is correct."
    );
  }

  if (classification.category === "server") {
    parts.push(
      "Check server logs for additional context. This may be a transient issue."
    );
  }

  return parts.join("\n");
}
