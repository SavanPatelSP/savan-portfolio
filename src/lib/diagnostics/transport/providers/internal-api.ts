import type { DiagnosticsProvider, ProviderResult } from "../provider";
import type { DiagnosticsReport } from "../../types/report";
import type { DiagnosticsApiPayload, ApiAcknowledgement } from "./schema";
import { serializeReport } from "./serializer";
import { validatePayload, sanitizePayload } from "./validation";
import {
  getApiClientConfig,
  sendReport,
  enqueueForBatch,
  type ApiClientConfig,
} from "./api-client";
import { isAuthenticationConfigured } from "./authentication";

const TAG = "[diagnostics:internal-api]";

const acknowledgements = new Map<string, ApiAcknowledgement>();
const MAX_ACKNOWLEDGEMENTS = 500;

function log(level: "info" | "warn" | "error", msg: string): void {
  const entry = `${TAG} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

function storeAcknowledgement(errorId: string, ack: ApiAcknowledgement): void {
  acknowledgements.set(errorId, ack);
  if (acknowledgements.size > MAX_ACKNOWLEDGEMENTS) {
    const firstKey = acknowledgements.keys().next().value;
    if (firstKey) acknowledgements.delete(firstKey);
  }
}

export function getAcknowledgement(errorId: string): ApiAcknowledgement | null {
  return acknowledgements.get(errorId) || null;
}

export function getAllAcknowledgements(): readonly ApiAcknowledgement[] {
  return Array.from(acknowledgements.values());
}

export function clearAcknowledgements(): void {
  acknowledgements.clear();
}

export function isApiConfigured(): boolean {
  const config = getApiClientConfig();
  return config.apiUrl.length > 0;
}

async function sendSingle(
  report: DiagnosticsReport,
  config: ApiClientConfig
): Promise<ProviderResult> {
  try {
    let payload: DiagnosticsApiPayload = serializeReport(report);

    const validation = validatePayload(payload);
    if (!validation.valid) {
      log("warn", `Payload validation failed: ${validation.errors.join(", ")}`);
      payload = sanitizePayload(payload);
    }

    const acknowledgement = await sendReport(payload, config);
    storeAcknowledgement(report.errorId, acknowledgement);

    return {
      success: true,
      providerId: "internal-api",
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown API error";
    log("error", `Failed to send: ${report.errorId} — ${message}`);
    return {
      success: false,
      providerId: "internal-api",
      error: message,
      timestamp: new Date().toISOString(),
    };
  }
}

async function sendBatched(
  report: DiagnosticsReport,
  config: ApiClientConfig
): Promise<ProviderResult> {
  try {
    let payload: DiagnosticsApiPayload = serializeReport(report);

    const validation = validatePayload(payload);
    if (!validation.valid) {
      log("warn", `Payload validation failed: ${validation.errors.join(", ")}`);
      payload = sanitizePayload(payload);
    }

    const acknowledgement = await enqueueForBatch(payload, config);
    storeAcknowledgement(report.errorId, acknowledgement);

    return {
      success: true,
      providerId: "internal-api",
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown batch error";
    log("error", `Failed to batch: ${report.errorId} — ${message}`);
    return {
      success: false,
      providerId: "internal-api",
      error: message,
      timestamp: new Date().toISOString(),
    };
  }
}

export const InternalApiProvider: DiagnosticsProvider = {
  name: "Internal API",
  id: "internal-api",

  isAvailable(): boolean {
    if (!isApiConfigured()) return false;
    if (!isAuthenticationConfigured()) return false;
    return true;
  },

  async send(report: DiagnosticsReport): Promise<ProviderResult> {
    const config = getApiClientConfig();

    log("info", `Queued: ${report.errorId}`);

    if (config.batchSize > 1) {
      return sendBatched(report, config);
    }

    return sendSingle(report, config);
  },

  async flush(): Promise<void> {
    log("info", "Flush requested");
  },
};
