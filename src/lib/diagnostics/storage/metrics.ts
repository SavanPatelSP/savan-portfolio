import type { StorageMetrics, StoredReport } from "./storage";

interface MutableStorageMetrics {
  totalReports: number;
  storedReports: number;
  deletedReports: number;
  duplicateReports: number;
  averageDispatchTime: number;
  averagePipelineTime: number;
  providerSuccessRate: number;
  providerFailureRate: number;
  mostFrequentCategory: string | null;
  mostFrequentRoute: string | null;
  lastUpdated: string;
}

const metrics: MutableStorageMetrics = {
  totalReports: 0,
  storedReports: 0,
  deletedReports: 0,
  duplicateReports: 0,
  averageDispatchTime: 0,
  averagePipelineTime: 0,
  providerSuccessRate: 0,
  providerFailureRate: 0,
  mostFrequentCategory: null,
  mostFrequentRoute: null,
  lastUpdated: new Date().toISOString(),
};

const dispatchTimes: number[] = [];
const pipelineTimes: number[] = [];
const MAX_SAMPLES = 1000;

function log(level: "info" | "warn" | "error", msg: string): void {
  const tag = "[diagnostics:metrics]";
  const entry = `${tag} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

export function getMetrics(): StorageMetrics {
  return { ...metrics };
}

export function incrementTotalReports(): void {
  metrics.totalReports += 1;
  metrics.lastUpdated = new Date().toISOString();
}

export function incrementStoredReports(): void {
  metrics.storedReports += 1;
  metrics.lastUpdated = new Date().toISOString();
}

export function incrementDeletedReports(): void {
  metrics.deletedReports += 1;
  if (metrics.storedReports > 0) {
    metrics.storedReports -= 1;
  }
  metrics.lastUpdated = new Date().toISOString();
}

export function incrementDuplicateReports(): void {
  metrics.duplicateReports += 1;
  metrics.lastUpdated = new Date().toISOString();
}

export function recordDispatchTime(durationMs: number): void {
  dispatchTimes.push(durationMs);
  if (dispatchTimes.length > MAX_SAMPLES) {
    dispatchTimes.shift();
  }
  metrics.averageDispatchTime =
    dispatchTimes.reduce((a, b) => a + b, 0) / dispatchTimes.length;
  metrics.lastUpdated = new Date().toISOString();
}

export function recordPipelineTime(durationMs: number): void {
  pipelineTimes.push(durationMs);
  if (pipelineTimes.length > MAX_SAMPLES) {
    pipelineTimes.shift();
  }
  metrics.averagePipelineTime =
    pipelineTimes.reduce((a, b) => a + b, 0) / pipelineTimes.length;
  metrics.lastUpdated = new Date().toISOString();
}

export function recordProviderResult(success: boolean): void {
  const total = metrics.providerSuccessRate * 100 + metrics.providerFailureRate * 100;
  const currentSuccess = metrics.providerSuccessRate * total;
  const currentFailure = metrics.providerFailureRate * total;

  const newSuccess = currentSuccess + (success ? 1 : 0);
  const newFailure = currentFailure + (success ? 0 : 1);
  const newTotal = newSuccess + newFailure;

  metrics.providerSuccessRate = newTotal > 0 ? newSuccess / newTotal : 0;
  metrics.providerFailureRate = newTotal > 0 ? newFailure / newTotal : 0;
  metrics.lastUpdated = new Date().toISOString();
}

export function updateFrequentCategory(reports: readonly StoredReport[]): void {
  const counts: Record<string, number> = {};
  for (const report of reports) {
    const category = report.report.classification.category;
    counts[category] = (counts[category] || 0) + 1;
  }

  let maxCount = 0;
  let maxCategory: string | null = null;
  for (const [category, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxCategory = category;
    }
  }

  metrics.mostFrequentCategory = maxCategory;
  metrics.lastUpdated = new Date().toISOString();
}

export function updateFrequentRoute(reports: readonly StoredReport[]): void {
  const counts: Record<string, number> = {};
  for (const report of reports) {
    const route = report.report.route;
    counts[route] = (counts[route] || 0) + 1;
  }

  let maxCount = 0;
  let maxRoute: string | null = null;
  for (const [route, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxRoute = route;
    }
  }

  metrics.mostFrequentRoute = maxRoute;
  metrics.lastUpdated = new Date().toISOString();
}

export function resetMetrics(): void {
  metrics.totalReports = 0;
  metrics.storedReports = 0;
  metrics.deletedReports = 0;
  metrics.duplicateReports = 0;
  metrics.averageDispatchTime = 0;
  metrics.averagePipelineTime = 0;
  metrics.providerSuccessRate = 0;
  metrics.providerFailureRate = 0;
  metrics.mostFrequentCategory = null;
  metrics.mostFrequentRoute = null;
  metrics.lastUpdated = new Date().toISOString();

  dispatchTimes.length = 0;
  pipelineTimes.length = 0;

  log("info", "Metrics reset");
}
