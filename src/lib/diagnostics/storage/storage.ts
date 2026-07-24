import type { DiagnosticsReport } from "../types/report";
import type { ErrorCategory, ErrorSeverity } from "../types/diagnostics";

// ── Storage Report ──────────────────────────────────────────────────────

export interface StoredReport {
  readonly report: DiagnosticsReport;
  readonly correlation: ReportCorrelation;
  readonly occurrences: OccurrenceRecord;
  readonly storage: StorageMetadata;
  readonly providerResults: ProviderResultRecord[];
  readonly pipelineResults: PipelineResultRecord[];
  readonly retentionPolicy: RetentionPolicyType;
}

export interface ReportCorrelation {
  readonly id: string;
  readonly fingerprint: string;
  readonly sessionId: string;
  readonly parentId: string | null;
  readonly relatedIds: readonly string[];
  readonly duplicateCount: number;
  readonly occurrenceCount: number;
  readonly firstOccurrence: string;
  readonly latestOccurrence: string;
}

export interface OccurrenceRecord {
  readonly count: number;
  readonly firstAt: string;
  readonly latestAt: string;
  readonly history: readonly OccurrenceEntry[];
}

export interface OccurrenceEntry {
  readonly timestamp: string;
  readonly errorId: string;
  readonly sessionId: string;
}

export interface StorageMetadata {
  readonly storedAt: string;
  readonly updatedAt: string;
  readonly providerId: string;
  readonly version: number;
  readonly size: number;
}

export interface ProviderResultRecord {
  readonly providerId: string;
  readonly success: boolean;
  readonly timestamp: string;
  readonly error?: string;
  readonly duration?: number;
}

export interface PipelineResultRecord {
  readonly timestamp: string;
  readonly hookCount: number;
  readonly executedHooks: number;
  readonly failedHooks: number;
  readonly providerCount: number;
  readonly successfulProviders: number;
  readonly failedProviders: number;
  readonly dispatchDuration: number;
}

// ── Retention ───────────────────────────────────────────────────────────

export type RetentionPolicyType =
  | "session-only"
  | "last-100"
  | "last-24h"
  | "last-7d"
  | "last-30d"
  | "forever";

export interface RetentionPolicy {
  readonly type: RetentionPolicyType;
  readonly maxAge?: number;
  readonly maxCount?: number;
  readonly enabled: boolean;
}

export interface RetentionConfig {
  readonly defaultPolicy: RetentionPolicyType;
  readonly policies: Record<RetentionPolicyType, RetentionPolicy>;
  readonly cleanupInterval: number;
}

// ── Search ──────────────────────────────────────────────────────────────

export interface SearchQuery {
  readonly errorId?: string;
  readonly sessionId?: string;
  readonly category?: ErrorCategory;
  readonly severity?: ErrorSeverity;
  readonly route?: string;
  readonly fingerprint?: string;
  readonly from?: string;
  readonly to?: string;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: "timestamp" | "severity" | "occurrenceCount";
  readonly sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  readonly reports: readonly StoredReport[];
  readonly total: number;
  readonly hasMore: boolean;
}

// ── Metrics ─────────────────────────────────────────────────────────────

export interface StorageMetrics {
  readonly totalReports: number;
  readonly storedReports: number;
  readonly deletedReports: number;
  readonly duplicateReports: number;
  readonly averageDispatchTime: number;
  readonly averagePipelineTime: number;
  readonly providerSuccessRate: number;
  readonly providerFailureRate: number;
  readonly mostFrequentCategory: string | null;
  readonly mostFrequentRoute: string | null;
  readonly lastUpdated: string;
}

// ── Storage Provider Interface ──────────────────────────────────────────

export interface StorageProvider {
  readonly name: string;
  readonly id: string;

  initialize(): Promise<void>;
  saveReport(stored: StoredReport): Promise<void>;
  updateReport(stored: StoredReport): Promise<void>;
  getReport(errorId: string): Promise<StoredReport | null>;
  deleteReport(errorId: string): Promise<boolean>;
  listReports(options?: ListOptions): Promise<readonly StoredReport[]>;
  searchReports(query: SearchQuery): Promise<SearchResult>;
  clear(): Promise<void>;
  health(): Promise<StorageHealth>;
}

export interface ListOptions {
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: string;
  readonly sortOrder?: "asc" | "desc";
}

export interface StorageHealth {
  readonly healthy: boolean;
  readonly ready: boolean;
  readonly reportCount: number;
  readonly lastError?: string;
}
