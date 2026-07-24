import type {
  StoredReport,
  StorageMetadata,
  ProviderResultRecord,
  PipelineResultRecord,
  SearchQuery,
  SearchResult,
  StorageHealth,
} from "./storage";
import type { DiagnosticsReport } from "../types/report";
import { MemoryStorageProvider } from "./memory";
import {
  registerStorageProvider,
  getStorageProvider,
  setActiveStorageProvider,
} from "./registry";
import {
  buildFingerprint,
  buildCorrelation,
  buildOccurrenceRecord,
  incrementOccurrence,
  updateStoredReportCorrelation,
  clearCorrelationData,
} from "./correlation";
import {
  getDefaultRetentionPolicy,
  getReportsToDelete,
} from "./retention";
import {
  findByErrorId,
  findBySession,
  findByCategory,
  findBySeverity,
  findByRoute,
  findByFingerprint,
  findRecent,
  findDuplicates,
} from "./search";
import {
  getMetrics,
  incrementTotalReports,
  incrementStoredReports,
  incrementDeletedReports,
  incrementDuplicateReports,
  recordDispatchTime,
  recordPipelineTime,
  recordProviderResult,
  updateFrequentCategory,
  updateFrequentRoute,
  resetMetrics,
} from "./metrics";

const TAG = "[diagnostics:storage:manager]";

let initialized = false;

function log(level: "info" | "warn" | "error", msg: string): void {
  const entry = `${TAG} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

function estimateSize(report: DiagnosticsReport): number {
  try {
    return JSON.stringify(report).length;
  } catch {
    return 0;
  }
}

export async function initializeStorage(): Promise<void> {
  if (initialized) return;

  registerStorageProvider(MemoryStorageProvider);
  setActiveStorageProvider("memory");

  const provider = getStorageProvider();
  if (provider) {
    await provider.initialize();
  }

  initialized = true;
  log("info", "Storage initialized");
}

function ensureInitialized(): void {
  if (!initialized) {
    log("warn", "Storage not initialized, initializing now");
    initializeStorage();
  }
}

export async function saveReport(
  report: DiagnosticsReport,
  providerResults?: ProviderResultRecord[],
  pipelineResults?: PipelineResultRecord
): Promise<StoredReport | null> {
  ensureInitialized();
  incrementTotalReports();

  const storageProvider = getStorageProvider();
  if (!storageProvider) {
    log("error", "No storage provider available");
    return null;
  }

  const existing = await storageProvider.getReport(report.errorId);
  if (existing) {
    incrementDuplicateReports();
    incrementOccurrence(report.errorId);

    const updatedProviderResults = providerResults
      ? [...existing.providerResults, ...providerResults]
      : existing.providerResults;

    const updatedStored = updateStoredReportCorrelation(
      existing,
      updatedProviderResults,
      pipelineResults
    );

    await storageProvider.updateReport(updatedStored);
    log("info", `Updated existing report: ${report.errorId}`);
    return updatedStored;
  }

  const fingerprint = buildFingerprint(
    report.error.name,
    report.error.message,
    report.error.stack,
    report.classification.category,
    report.classification.severity
  );

  const correlation = buildCorrelation(
    report.errorId,
    report.session.sessionId,
    fingerprint,
    report.timestamp
  );

  const occurrences = buildOccurrenceRecord(
    report.errorId,
    report.session.sessionId,
    report.timestamp
  );

  const retentionPolicy = getDefaultRetentionPolicy();
  const storage: StorageMetadata = {
    storedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    providerId: storageProvider.id,
    version: 1,
    size: estimateSize(report),
  };

  const stored: StoredReport = {
    report,
    correlation,
    occurrences,
    storage,
    providerResults: providerResults || [],
    pipelineResults: pipelineResults ? [pipelineResults] : [],
    retentionPolicy,
  };

  await storageProvider.saveReport(stored);
  incrementStoredReports();

  const allReports = await storageProvider.listReports({ limit: 1000 });
  updateFrequentCategory(allReports);
  updateFrequentRoute(allReports);

  log("info", `Saved new report: ${report.errorId}`);
  return stored;
}

export async function updateReportAfterDispatch(
  errorId: string,
  providerResults: ProviderResultRecord[],
  pipelineResults: PipelineResultRecord
): Promise<StoredReport | null> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (!storageProvider) return null;

  const existing = await storageProvider.getReport(errorId);
  if (!existing) return null;

  recordDispatchTime(pipelineResults.dispatchDuration);
  recordPipelineTime(pipelineResults.dispatchDuration);

  for (const result of providerResults) {
    recordProviderResult(result.success);
  }

  const updated = updateStoredReportCorrelation(
    existing,
    providerResults,
    pipelineResults
  );

  await storageProvider.updateReport(updated);
  return updated;
}

export async function findReport(
  errorId: string
): Promise<StoredReport | null> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (!storageProvider) return null;

  return storageProvider.getReport(errorId);
}

export async function searchReports(
  query: SearchQuery
): Promise<SearchResult> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (!storageProvider) {
    return { reports: [], total: 0, hasMore: false };
  }

  return storageProvider.searchReports(query);
}

export async function deleteReport(errorId: string): Promise<boolean> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (!storageProvider) return false;

  const result = await storageProvider.deleteReport(errorId);
  if (result) {
    incrementDeletedReports();
  }
  return result;
}

export async function clearStorage(): Promise<void> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (storageProvider) {
    await storageProvider.clear();
  }

  clearCorrelationData();
  resetMetrics();
  log("info", "Storage cleared");
}

export async function getMetricsSummary() {
  return getMetrics();
}

export async function applyRetentionCleanup(): Promise<number> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (!storageProvider) return 0;

  const allReports = await storageProvider.listReports({ limit: 10000 });
  const toDelete = getReportsToDelete(allReports);

  for (const errorId of toDelete) {
    await storageProvider.deleteReport(errorId);
    incrementDeletedReports();
  }

  log("info", `Retention cleanup: ${toDelete.length} reports deleted`);
  return toDelete.length;
}

export async function getStorageHealth(): Promise<StorageHealth> {
  ensureInitialized();

  const storageProvider = getStorageProvider();
  if (!storageProvider) {
    return {
      healthy: false,
      ready: false,
      reportCount: 0,
      lastError: "No storage provider registered",
    };
  }

  return storageProvider.health();
}

export {
  findByErrorId,
  findBySession,
  findByCategory,
  findBySeverity,
  findByRoute,
  findByFingerprint,
  findRecent,
  findDuplicates,
};

export type { ProviderResultRecord, PipelineResultRecord };

export { getMetrics } from "./metrics";
export { getRetentionConfig, updateRetentionConfig } from "./retention";
export { getDefaultRetentionPolicy } from "./retention";
