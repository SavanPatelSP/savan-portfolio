import type { DiagnosticsReport } from "../../types/report";
import type {
  DiagnosticsApiPayload,
  ApiErrorData,
  ApiClassificationData,
  ApiEnvironmentData,
  ApiSessionData,
  ApiMetadataData,
  ApiPipelineData,
  ApiStorageData,
  ApiCorrelationData,
  ApiOccurrencesData,
  ApiProviderResultData,
  ApiPipelineResultData,
} from "./schema";
import { API_VERSION } from "./schema";

export function serializeReport(report: DiagnosticsReport): DiagnosticsApiPayload {
  const payload: DiagnosticsApiPayload = {
    version: API_VERSION,
    errorId: report.errorId,
    sessionId: report.session.sessionId,
    timestamp: report.timestamp,
    timestampISO: report.timestampISO,
    route: report.route,
    error: serializeError(report),
    classification: serializeClassification(report),
    environment: serializeEnvironment(report),
    session: serializeSession(report),
    metadata: serializeMetadata(report),
  };

  if (report.pipeline) {
    const pipelineData: ApiPipelineData = {
      timing: {
        collectorTime: report.pipeline.timing.collectorTime,
        analyzerTime: report.pipeline.timing.analyzerTime,
        reportTime: report.pipeline.timing.reportTime,
        pipelineTime: report.pipeline.timing.pipelineTime,
        transportTime: report.pipeline.timing.transportTime,
        providerTimes: report.pipeline.timing.providerTimes,
        totalTime: report.pipeline.timing.totalTime,
      },
      metrics: {
        hookCount: report.pipeline.metrics.hookCount,
        executedHooks: report.pipeline.metrics.executedHooks,
        failedHooks: report.pipeline.metrics.failedHooks,
        providerCount: report.pipeline.metrics.providerCount,
        successfulProviders: report.pipeline.metrics.successfulProviders,
        failedProviders: report.pipeline.metrics.failedProviders,
        retryCount: report.pipeline.metrics.retryCount,
        dispatchDuration: report.pipeline.metrics.dispatchDuration,
      },
    };
    (payload as { pipeline?: ApiPipelineData }).pipeline = pipelineData;
  }

  if (report.storage) {
    const storageData: ApiStorageData = {
      storedAt: report.storage.storedAt,
      updatedAt: report.storage.updatedAt,
      providerId: report.storage.providerId,
      version: report.storage.version,
      size: report.storage.size,
    };
    (payload as { storage?: ApiStorageData }).storage = storageData;
  }

  if (report.correlation) {
    const correlationData: ApiCorrelationData = {
      id: report.correlation.id,
      fingerprint: report.correlation.fingerprint,
      sessionId: report.correlation.sessionId,
      parentId: report.correlation.parentId,
      relatedIds: report.correlation.relatedIds,
      duplicateCount: report.correlation.duplicateCount,
      occurrenceCount: report.correlation.occurrenceCount,
      firstOccurrence: report.correlation.firstOccurrence,
      latestOccurrence: report.correlation.latestOccurrence,
    };
    (payload as { correlation?: ApiCorrelationData }).correlation = correlationData;
  }

  if (report.occurrences) {
    const occurrencesData: ApiOccurrencesData = {
      count: report.occurrences.count,
      firstAt: report.occurrences.firstAt,
      latestAt: report.occurrences.latestAt,
    };
    (payload as { occurrences?: ApiOccurrencesData }).occurrences = occurrencesData;
  }

  if (report.providerResults && report.providerResults.length > 0) {
    const providerResultsData: ApiProviderResultData[] = report.providerResults.map(
      (r) => ({
        providerId: r.providerId,
        success: r.success,
        timestamp: r.timestamp,
        error: r.error,
      })
    );
    (payload as { providerResults?: ApiProviderResultData[] }).providerResults = providerResultsData;
  }

  if (report.pipelineResults && report.pipelineResults.length > 0) {
    const pipelineResultsData: ApiPipelineResultData[] = report.pipelineResults.map(
      (r) => ({
        timestamp: r.timestamp,
        hookCount: r.hookCount,
        executedHooks: r.executedHooks,
        failedHooks: r.failedHooks,
        providerCount: r.providerCount,
        successfulProviders: r.successfulProviders,
        failedProviders: r.failedProviders,
        dispatchDuration: r.dispatchDuration,
      })
    );
    (payload as { pipelineResults?: ApiPipelineResultData[] }).pipelineResults = pipelineResultsData;
  }

  if (report.retentionPolicy) {
    (payload as { retentionPolicy?: string }).retentionPolicy = report.retentionPolicy;
  }

  return payload;
}

function serializeError(report: DiagnosticsReport): ApiErrorData {
  return {
    message: report.error.message,
    stack: report.error.stack,
    digest: report.error.digest,
    name: report.error.name,
  };
}

function serializeClassification(report: DiagnosticsReport): ApiClassificationData {
  return {
    category: report.classification.category,
    label: report.classification.label,
    severity: report.classification.severity,
    summary: report.classification.summary,
    likelyCauses: report.classification.likelyCauses,
    suggestedResolution: report.classification.suggestedResolution,
  };
}

function serializeEnvironment(report: DiagnosticsReport): ApiEnvironmentData {
  return {
    browser: report.environment.browser,
    browserVersion: report.environment.browserVersion,
    os: report.environment.os,
    device: report.environment.device,
    viewport: {
      width: report.environment.viewport.width,
      height: report.environment.viewport.height,
      screenWidth: report.environment.viewport.screenWidth,
      screenHeight: report.environment.viewport.screenHeight,
      pixelRatio: report.environment.viewport.pixelRatio,
      language: report.environment.viewport.language,
      timezone: report.environment.viewport.timezone,
    },
    runtime: {
      framework: report.environment.runtime.framework,
      frameworkVersion: report.environment.runtime.frameworkVersion,
      isClient: report.environment.runtime.isClient,
      isServer: report.environment.runtime.isServer,
    },
  };
}

function serializeSession(report: DiagnosticsReport): ApiSessionData {
  return {
    sessionId: report.session.sessionId,
    startedAt: report.session.startedAt,
    errorsThisSession: report.session.errorsThisSession,
    recovered: report.session.recovered,
    recoveryAttempts: report.session.recoveryAttempts,
    duration: report.session.duration,
  };
}

function serializeMetadata(report: DiagnosticsReport): ApiMetadataData {
  return {
    sdkVersion: report.metadata.sdkVersion,
    buildId: report.metadata.buildId,
  };
}

export function serializeBatch(
  reports: readonly DiagnosticsReport[]
): readonly DiagnosticsApiPayload[] {
  return reports.map(serializeReport);
}

export function getPayloadSize(payload: DiagnosticsApiPayload): number {
  try {
    return JSON.stringify(payload).length;
  } catch {
    return 0;
  }
}
