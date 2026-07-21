export const RATE_LIMIT = {
  DEFAULT_MAX: 5,
  DEFAULT_WINDOW_SECONDS: 60,
  KEY_PREFIX: "portfolio",
  HTTP_TOO_MANY_REQUESTS: 429,
} as const;

export const REDIS = {
  KEY_PREFIX: "portfolio",
  CONNECT_TIMEOUT_MS: 5_000,
  COMMAND_TIMEOUT_MS: 3_000,
} as const;

export const CSP_REPORT = {
  MAX_FIELD_LENGTH: 200,
  ALLOWED_DISPOSITIONS: ["enforce", "report"] as const,
  TAG: "[csp-report]",
} as const;
