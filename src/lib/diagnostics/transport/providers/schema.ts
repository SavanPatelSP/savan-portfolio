export interface DiagnosticsApiPayload {
  readonly version: string;
  readonly errorId: string;
  readonly sessionId: string;
  readonly timestamp: string;
  readonly timestampISO: string;
  readonly route: string;
  readonly error: ApiErrorData;
  readonly classification: ApiClassificationData;
  readonly environment: ApiEnvironmentData;
  readonly session: ApiSessionData;
  readonly metadata: ApiMetadataData;
  readonly pipeline?: ApiPipelineData;
  readonly storage?: ApiStorageData;
  readonly correlation?: ApiCorrelationData;
  readonly occurrences?: ApiOccurrencesData;
  readonly providerResults?: readonly ApiProviderResultData[];
  readonly pipelineResults?: readonly ApiPipelineResultData[];
  readonly retentionPolicy?: string;
}

export interface ApiErrorData {
  readonly message: string;
  readonly stack?: string;
  readonly digest?: string;
  readonly name: string;
}

export interface ApiClassificationData {
  readonly category: string;
  readonly label: string;
  readonly severity: string;
  readonly summary: string;
  readonly likelyCauses: readonly string[];
  readonly suggestedResolution: readonly string[];
}

export interface ApiEnvironmentData {
  readonly browser: string;
  readonly browserVersion: string;
  readonly os: string;
  readonly device: string;
  readonly viewport: ApiViewportData;
  readonly runtime: ApiRuntimeData;
}

export interface ApiViewportData {
  readonly width: number;
  readonly height: number;
  readonly screenWidth: number;
  readonly screenHeight: number;
  readonly pixelRatio: number;
  readonly language: string;
  readonly timezone: string;
}

export interface ApiRuntimeData {
  readonly framework: string;
  readonly frameworkVersion?: string;
  readonly isClient: boolean;
  readonly isServer: boolean;
}

export interface ApiSessionData {
  readonly sessionId: string;
  readonly startedAt: string;
  readonly errorsThisSession: number;
  readonly recovered: boolean;
  readonly recoveryAttempts: number;
  readonly duration: number;
}

export interface ApiMetadataData {
  readonly sdkVersion: string;
  readonly buildId?: string;
}

export interface ApiPipelineData {
  readonly timing: ApiPipelineTiming;
  readonly metrics: ApiPipelineMetrics;
}

export interface ApiPipelineTiming {
  readonly collectorTime: number;
  readonly analyzerTime: number;
  readonly reportTime: number;
  readonly pipelineTime: number;
  readonly transportTime: number;
  readonly providerTimes: Readonly<Record<string, number>>;
  readonly totalTime: number;
}

export interface ApiPipelineMetrics {
  readonly hookCount: number;
  readonly executedHooks: number;
  readonly failedHooks: number;
  readonly providerCount: number;
  readonly successfulProviders: number;
  readonly failedProviders: number;
  readonly retryCount: number;
  readonly dispatchDuration: number;
}

export interface ApiStorageData {
  readonly storedAt: string;
  readonly updatedAt: string;
  readonly providerId: string;
  readonly version: number;
  readonly size: number;
}

export interface ApiCorrelationData {
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

export interface ApiOccurrencesData {
  readonly count: number;
  readonly firstAt: string;
  readonly latestAt: string;
}

export interface ApiProviderResultData {
  readonly providerId: string;
  readonly success: boolean;
  readonly timestamp: string;
  readonly error?: string;
}

export interface ApiPipelineResultData {
  readonly timestamp: string;
  readonly hookCount: number;
  readonly executedHooks: number;
  readonly failedHooks: number;
  readonly providerCount: number;
  readonly successfulProviders: number;
  readonly failedProviders: number;
  readonly dispatchDuration: number;
}

export interface ApiAcknowledgement {
  readonly remoteReportId: string;
  readonly receivedAt: string;
  readonly correlationId: string;
}

export interface ApiBatchPayload {
  readonly version: string;
  readonly reports: readonly DiagnosticsApiPayload[];
  readonly batchId: string;
  readonly timestamp: string;
}

export interface ApiBatchAcknowledgement {
  readonly batchId: string;
  readonly receivedAt: string;
  readonly reportCount: number;
  readonly results: readonly ApiAcknowledgement[];
}

export const API_VERSION = "1.0.0";
export const API_CONTENT_TYPE = "application/json";
export const API_ENDPOINT = "/v1/diagnostics/report";
export const API_BATCH_ENDPOINT = "/v1/diagnostics/reports";
