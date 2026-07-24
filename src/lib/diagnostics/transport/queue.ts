import type { DiagnosticsReport } from "../types/report";

interface QueueEntry {
  report: DiagnosticsReport;
  providerId: string;
  enqueuedAt: number;
  attempts: number;
}

const queue: QueueEntry[] = [];
let isProcessing = false;
const MAX_QUEUE_SIZE = 100;

export function enqueue(
  report: DiagnosticsReport,
  providerId: string
): void {
  if (queue.length >= MAX_QUEUE_SIZE) {
    queue.shift();
  }

  queue.push({
    report,
    providerId,
    enqueuedAt: Date.now(),
    attempts: 0,
  });
}

export function dequeue(): QueueEntry | undefined {
  return queue.shift();
}

export function peek(): QueueEntry | undefined {
  return queue[0];
}

export function queueSize(): number {
  return queue.length;
}

export function isQueueProcessing(): boolean {
  return isProcessing;
}

export function setProcessing(value: boolean): void {
  isProcessing = value;
}

export function clearQueue(): void {
  queue.length = 0;
}

export function removeByProviderId(providerId: string): void {
  const index = queue.findIndex((entry) => entry.providerId === providerId);
  if (index !== -1) {
    queue.splice(index, 1);
  }
}

export function getPendingEntries(): ReadonlyArray<QueueEntry> {
  return [...queue];
}

export interface QueueStats {
  total: number;
  processing: boolean;
  byProvider: Record<string, number>;
}

export function getQueueStats(): QueueStats {
  const byProvider: Record<string, number> = {};
  for (const entry of queue) {
    byProvider[entry.providerId] = (byProvider[entry.providerId] || 0) + 1;
  }

  return {
    total: queue.length,
    processing: isProcessing,
    byProvider,
  };
}
