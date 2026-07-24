import type { DiagnosticsApiPayload } from "./schema";

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

const REQUIRED_FIELDS = [
  "version",
  "errorId",
  "sessionId",
  "timestamp",
  "timestampISO",
  "route",
  "error",
  "classification",
  "environment",
  "session",
  "metadata",
] as const;

const VALID_CATEGORIES = [
  "module-loading",
  "chunk-loading",
  "hydration",
  "network",
  "runtime",
  "server",
  "permission",
  "unknown",
] as const;

const VALID_SEVERITIES = [
  "recoverable",
  "transient",
  "critical",
] as const;

const MAX_STRING_LENGTH = 10000;
const MAX_STACK_LENGTH = 50000;
const MAX_ARRAY_LENGTH = 100;

export function validatePayload(
  payload: DiagnosticsApiPayload
): ValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (payload[field as keyof DiagnosticsApiPayload] === undefined) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  if (typeof payload.version !== "string" || payload.version.trim() === "") {
    errors.push("Invalid version: must be a non-empty string");
  }

  if (typeof payload.errorId !== "string" || payload.errorId.trim() === "") {
    errors.push("Invalid errorId: must be a non-empty string");
  }

  if (typeof payload.sessionId !== "string" || payload.sessionId.trim() === "") {
    errors.push("Invalid sessionId: must be a non-empty string");
  }

  if (typeof payload.timestamp !== "string" || payload.timestamp.trim() === "") {
    errors.push("Invalid timestamp: must be a non-empty string");
  }

  if (typeof payload.timestampISO !== "string" || payload.timestampISO.trim() === "") {
    errors.push("Invalid timestampISO: must be a non-empty string");
  }

  if (typeof payload.route !== "string") {
    errors.push("Invalid route: must be a string");
  }

  if (payload.error) {
    if (typeof payload.error.message !== "string") {
      errors.push("Invalid error.message: must be a string");
    }
    if (typeof payload.error.name !== "string") {
      errors.push("Invalid error.name: must be a string");
    }
    if (payload.error.stack !== undefined && typeof payload.error.stack !== "string") {
      errors.push("Invalid error.stack: must be a string");
    }
  }

  if (payload.classification) {
    if (!VALID_CATEGORIES.includes(payload.classification.category as typeof VALID_CATEGORIES[number])) {
      errors.push(`Invalid classification.category: must be one of ${VALID_CATEGORIES.join(", ")}`);
    }
    if (!VALID_SEVERITIES.includes(payload.classification.severity as typeof VALID_SEVERITIES[number])) {
      errors.push(`Invalid classification.severity: must be one of ${VALID_SEVERITIES.join(", ")}`);
    }
    if (typeof payload.classification.summary !== "string") {
      errors.push("Invalid classification.summary: must be a string");
    }
  }

  if (payload.environment) {
    if (typeof payload.environment.browser !== "string") {
      errors.push("Invalid environment.browser: must be a string");
    }
    if (typeof payload.environment.os !== "string") {
      errors.push("Invalid environment.os: must be a string");
    }
    if (typeof payload.environment.device !== "string") {
      errors.push("Invalid environment.device: must be a string");
    }
  }

  if (payload.session) {
    if (typeof payload.session.sessionId !== "string") {
      errors.push("Invalid session.sessionId: must be a string");
    }
    if (typeof payload.session.errorsThisSession !== "number") {
      errors.push("Invalid session.errorsThisSession: must be a number");
    }
  }

  if (payload.metadata) {
    if (typeof payload.metadata.sdkVersion !== "string") {
      errors.push("Invalid metadata.sdkVersion: must be a string");
    }
  }

  if (payload.error && payload.error.message && payload.error.message.length > MAX_STRING_LENGTH) {
    errors.push(`Invalid error.message: exceeds maximum length of ${MAX_STRING_LENGTH}`);
  }

  if (payload.error && payload.error.stack && payload.error.stack.length > MAX_STACK_LENGTH) {
    errors.push(`Invalid error.stack: exceeds maximum length of ${MAX_STACK_LENGTH}`);
  }

  if (payload.classification && payload.classification.likelyCauses) {
    if (payload.classification.likelyCauses.length > MAX_ARRAY_LENGTH) {
      errors.push(`Invalid classification.likelyCauses: exceeds maximum length of ${MAX_ARRAY_LENGTH}`);
    }
  }

  if (payload.classification && payload.classification.suggestedResolution) {
    if (payload.classification.suggestedResolution.length > MAX_ARRAY_LENGTH) {
      errors.push(`Invalid classification.suggestedResolution: exceeds maximum length of ${MAX_ARRAY_LENGTH}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function sanitizePayload(
  payload: DiagnosticsApiPayload
): DiagnosticsApiPayload {
  const sanitized = { ...payload };

  if (sanitized.error) {
    sanitized.error = {
      ...sanitized.error,
      message: sanitizeString(sanitized.error.message, MAX_STRING_LENGTH),
      name: sanitizeString(sanitized.error.name, 200),
      stack: sanitized.error.stack
        ? sanitizeString(sanitized.error.stack, MAX_STACK_LENGTH)
        : undefined,
    };
  }

  if (sanitized.classification) {
    sanitized.classification = {
      ...sanitized.classification,
      summary: sanitizeString(sanitized.classification.summary, MAX_STRING_LENGTH),
      likelyCauses: sanitized.classification.likelyCauses.slice(0, MAX_ARRAY_LENGTH),
      suggestedResolution: sanitized.classification.suggestedResolution.slice(0, MAX_ARRAY_LENGTH),
    };
  }

  return sanitized;
}

function sanitizeString(value: string, maxLength: number): string {
  if (value.length > maxLength) {
    return value.slice(0, maxLength);
  }
  return value;
}
