export type {
  StorageProvider,
  StoredReport,
  ReportCorrelation,
  OccurrenceRecord,
  OccurrenceEntry,
  StorageMetadata,
  ProviderResultRecord,
  PipelineResultRecord,
  RetentionPolicy,
  RetentionPolicyType,
  RetentionConfig,
  SearchQuery,
  SearchResult,
  StorageMetrics,
  ListOptions,
  StorageHealth,
} from "./storage";

export { MemoryStorageProvider } from "./memory";

export {
  registerStorageProvider,
  unregisterStorageProvider,
  getStorageProvider,
  setActiveStorageProvider,
  getAllStorageProviders,
  isStorageProviderRegistered,
  clearStorageProviders,
} from "./registry";

export {
  buildFingerprint,
  buildCorrelation,
  buildOccurrenceRecord,
  incrementOccurrence,
  getCorrelationById,
  getCorrelationByFingerprint,
  getCorrelationsBySession,
  findDuplicates as findDuplicateCorrelations,
  getOccurrenceHistory,
  clearCorrelationData,
  getCorrelationMetrics,
} from "./correlation";

export {
  initializeStorage,
  saveReport,
  updateReportAfterDispatch,
  findReport,
  searchReports,
  deleteReport,
  clearStorage,
  getMetricsSummary,
  applyRetentionCleanup,
  getStorageHealth,
  findByErrorId,
  findBySession,
  findByCategory,
  findBySeverity,
  findByRoute,
  findByFingerprint,
  findRecent,
  findDuplicates,
  getMetrics,
  getRetentionConfig,
  updateRetentionConfig,
  getDefaultRetentionPolicy,
} from "./manager";

export { getMetrics as getStorageMetrics, resetMetrics as resetStorageMetrics } from "./metrics";
export { getRetentionConfig as getRetentionConfiguration, applyRetention, getReportsToDelete, getRetentionSummary } from "./retention";
export { searchReports as searchInReports, getUniqueSessions, getUniqueRoutes, getCategoryCounts, getSeverityCounts } from "./search";
