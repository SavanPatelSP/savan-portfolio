import type { DiagnosticsReport } from "../types/report";
import { getActiveProviders } from "./registry";
import {
  enqueue,
  dequeue,
  setProcessing,
  queueSize,
  isQueueProcessing,
} from "./queue";
import { withRetry } from "./retry";
import { updateStatus, recordSuccess, recordFailure } from "./status";

export async function dispatch(report: DiagnosticsReport): Promise<void> {
  const providers = getActiveProviders();

  if (providers.length === 0) return;

  for (const provider of providers) {
    enqueue(report, provider.id);
  }

  processQueue();
}

async function processQueue(): Promise<void> {
  if (isProcessing()) return;

  setProcessing(true);

  try {
    while (queueSize() > 0) {
      const entry = dequeue();
      if (!entry) break;

      const providers = getActiveProviders();
      const provider = providers.find((p) => p.id === entry.providerId);

      if (!provider) continue;

      updateStatus(entry.providerId, "sending");

      try {
        const result = await withRetry(
          () => provider.send(entry.report),
          { maxAttempts: 3, baseDelay: 1000, maxDelay: 10000 }
        );

        if (result.success) {
          recordSuccess(entry.providerId);
        } else {
          recordFailure(entry.providerId, result.error);
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown dispatch error";
        recordFailure(entry.providerId, message);
      }
    }
  } finally {
    setProcessing(false);
  }
}

function isProcessing(): boolean {
  return isQueueProcessing();
}
