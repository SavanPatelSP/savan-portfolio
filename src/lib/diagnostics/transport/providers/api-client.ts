import type { DiagnosticsApiPayload, ApiAcknowledgement, ApiBatchPayload, ApiBatchAcknowledgement } from "./schema";
import { buildAuthHeaders } from "./authentication";
import { API_CONTENT_TYPE, API_ENDPOINT, API_BATCH_ENDPOINT } from "./schema";

const TAG = "[diagnostics:api-client]";

export interface ApiClientConfig {
  readonly apiUrl: string;
  readonly timeout: number;
  readonly retryLimit: number;
  readonly batchSize: number;
  readonly batchInterval: number;
  readonly compressionEnabled: boolean;
}

interface QueueEntry {
  readonly payload: DiagnosticsApiPayload;
  readonly resolve: (value: ApiAcknowledgement) => void;
  readonly reject: (reason: Error) => void;
  readonly enqueuedAt: number;
}

function log(level: "info" | "warn" | "error", msg: string): void {
  const entry = `${TAG} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

function getEnv(name: string): string | null {
  if (typeof process === "undefined") return null;
  const val = process.env[name];
  if (!val || val.trim() === "") return null;
  return val.trim();
}

export function getApiClientConfig(): ApiClientConfig {
  const apiUrl = getEnv("DIAGNOSTICS_API_URL") || "";
  const timeout = parseInt(getEnv("DIAGNOSTICS_TIMEOUT") || "10000", 10);
  const retryLimit = parseInt(getEnv("DIAGNOSTICS_RETRY_LIMIT") || "3", 10);
  const batchSize = parseInt(getEnv("DIAGNOSTICS_BATCH_SIZE") || "1", 10);
  const batchInterval = parseInt(getEnv("DIAGNOSTICS_BATCH_INTERVAL") || "5000", 10);
  const compressionEnabled = getEnv("DIAGNOSTICS_COMPRESSION") === "true";

  return {
    apiUrl,
    timeout: isNaN(timeout) ? 10000 : timeout,
    retryLimit: isNaN(retryLimit) ? 3 : retryLimit,
    batchSize: isNaN(batchSize) ? 1 : batchSize,
    batchInterval: isNaN(batchInterval) ? 5000 : batchInterval,
    compressionEnabled,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function calculateRetryDelay(attempt: number): number {
  return Math.min(1000 * Math.pow(2, attempt), 30000);
}

function isRetryableError(status: number): boolean {
  return status === 429 || status >= 500;
}

export async function sendReport(
  payload: DiagnosticsApiPayload,
  config: ApiClientConfig
): Promise<ApiAcknowledgement> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= config.retryLimit; attempt++) {
    try {
      const response = await fetchWithTimeout(
        `${config.apiUrl}${API_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": API_CONTENT_TYPE,
            ...buildAuthHeaders(),
          },
          body: JSON.stringify(payload),
        },
        config.timeout
      );

      if (response.ok) {
        const acknowledgement: ApiAcknowledgement = {
          remoteReportId: response.headers.get("X-Report-Id") || payload.errorId,
          receivedAt: new Date().toISOString(),
          correlationId: response.headers.get("X-Correlation-Id") || payload.errorId,
        };
        log("info", `Report sent: ${payload.errorId} → ${acknowledgement.remoteReportId}`);
        return acknowledgement;
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const retryDelay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : calculateRetryDelay(attempt);

        log("warn", `Rate limited, retrying in ${retryDelay}ms (attempt ${attempt + 1})`);
        await sleep(retryDelay);
        continue;
      }

      if (isRetryableError(response.status)) {
        const retryDelay = calculateRetryDelay(attempt);
        log("warn", `Server error ${response.status}, retrying in ${retryDelay}ms`);
        await sleep(retryDelay);
        continue;
      }

      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`API error ${response.status}: ${errorText}`);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < config.retryLimit) {
        const retryDelay = calculateRetryDelay(attempt);
        log("warn", `Request failed, retrying in ${retryDelay}ms: ${lastError.message}`);
        await sleep(retryDelay);
      }
    }
  }

  const finalError = lastError || new Error("API request failed after all retries");
  log("error", `Failed to send report: ${finalError.message}`);
  throw finalError;
}

export async function sendBatch(
  payloads: readonly DiagnosticsApiPayload[],
  config: ApiClientConfig
): Promise<ApiBatchAcknowledgement> {
  const batchPayload: ApiBatchPayload = {
    version: "1.0.0",
    reports: payloads,
    batchId: `batch-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    timestamp: new Date().toISOString(),
  };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= config.retryLimit; attempt++) {
    try {
      const response = await fetchWithTimeout(
        `${config.apiUrl}${API_BATCH_ENDPOINT}`,
        {
          method: "POST",
          headers: {
            "Content-Type": API_CONTENT_TYPE,
            ...buildAuthHeaders(),
          },
          body: JSON.stringify(batchPayload),
        },
        config.timeout
      );

      if (response.ok) {
        const acknowledgement: ApiBatchAcknowledgement = {
          batchId: batchPayload.batchId,
          receivedAt: new Date().toISOString(),
          reportCount: payloads.length,
          results: payloads.map((p) => ({
            remoteReportId: p.errorId,
            receivedAt: new Date().toISOString(),
            correlationId: p.errorId,
          })),
        };
        log("info", `Batch sent: ${payloads.length} reports`);
        return acknowledgement;
      }

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const retryDelay = retryAfter
          ? parseInt(retryAfter, 10) * 1000
          : calculateRetryDelay(attempt);

        log("warn", `Rate limited, retrying in ${retryDelay}ms (attempt ${attempt + 1})`);
        await sleep(retryDelay);
        continue;
      }

      if (isRetryableError(response.status)) {
        const retryDelay = calculateRetryDelay(attempt);
        log("warn", `Server error ${response.status}, retrying in ${retryDelay}ms`);
        await sleep(retryDelay);
        continue;
      }

      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`API error ${response.status}: ${errorText}`);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < config.retryLimit) {
        const retryDelay = calculateRetryDelay(attempt);
        log("warn", `Request failed, retrying in ${retryDelay}ms: ${lastError.message}`);
        await sleep(retryDelay);
      }
    }
  }

  const finalError = lastError || new Error("Batch request failed after all retries");
  log("error", `Failed to send batch: ${finalError.message}`);
  throw finalError;
}

const batchQueue: QueueEntry[] = [];
let batchTimer: ReturnType<typeof setTimeout> | null = null;

export function enqueueForBatch(
  payload: DiagnosticsApiPayload,
  config: ApiClientConfig
): Promise<ApiAcknowledgement> {
  return new Promise((resolve, reject) => {
    batchQueue.push({
      payload,
      resolve,
      reject,
      enqueuedAt: Date.now(),
    });

    if (batchQueue.length >= config.batchSize) {
      flushBatch(config);
    } else if (!batchTimer) {
      batchTimer = setTimeout(() => {
        flushBatch(config);
      }, config.batchInterval);
    }
  });
}

async function flushBatch(config: ApiClientConfig): Promise<void> {
  if (batchTimer) {
    clearTimeout(batchTimer);
    batchTimer = null;
  }

  if (batchQueue.length === 0) return;

  const entries = batchQueue.splice(0, config.batchSize);
  const payloads = entries.map((e) => e.payload);

  try {
    const acknowledgement = await sendBatch(payloads, config);

    for (const entry of entries) {
      const reportAck = acknowledgement.results.find(
        (r) => r.remoteReportId === entry.payload.errorId
      ) || {
        remoteReportId: entry.payload.errorId,
        receivedAt: acknowledgement.receivedAt,
        correlationId: entry.payload.errorId,
      };
      entry.resolve(reportAck);
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    for (const entry of entries) {
      entry.reject(error);
    }
  }
}
