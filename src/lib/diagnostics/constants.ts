export const SDK_VERSION = "0.1.0";

export const ERROR_ID_PREFIX = "SPNET";
export const ERROR_ID_LENGTH = 8;
export const ERROR_ID_DATE_FORMAT = "YYYYMMDD";

export const SESSION_STORAGE_KEY = "spnet-diagnostics-session";
export const SESSION_MAX_DURATION = 30 * 60 * 1000;
export const SESSION_MAX_ERRORS = 50;

export const RETRY_MAX_ATTEMPTS = 3;
export const RETRY_BASE_DELAY = 1000;
export const RETRY_MAX_DELAY = 10000;

export const QUEUE_FLUSH_INTERVAL = 2000;
export const QUEUE_MAX_SIZE = 100;

export const CONSOLE_GROUP_LABEL = "SP NET Diagnostics";
export const CONSOLE_TIMESTAMP_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
};

export const SEVERITY_LABELS: Record<string, string> = {
  recoverable: "Recoverable",
  transient: "Transient",
  critical: "Critical",
};

export const CATEGORY_LABELS: Record<string, string> = {
  "module-loading": "Module Loading",
  "chunk-loading": "Chunk Loading",
  hydration: "Hydration",
  network: "Network",
  runtime: "Runtime",
  server: "Server",
  permission: "Permission",
  unknown: "Unknown",
};
