/**
 * SP NET Diagnostics SDK
 *
 * A reusable diagnostics platform for the SP NET ecosystem.
 * Provides error collection, analysis, session tracking, fingerprinting,
 * report building, pipeline lifecycle, and transport capabilities.
 *
 * @version 0.1.0
 * @module @spnet/diagnostics
 */

// ── Types ────────────────────────────────────────────────────────────────
export type {
  ErrorCategory,
  ErrorSeverity,
  ErrorClassification,
  CollectorData,
  ViewportData,
  EnvironmentData,
  RuntimeData,
} from "./types/diagnostics";

export type {
  DiagnosticsReport,
  FormattedReport,
  ReportSection,
  ReportEntry,
} from "./types/report";

export type {
  DiagnosticsProvider,
  ProviderResult,
  ProviderConfig,
} from "./types/provider";

export type {
  SessionData,
  SessionConfig,
  RecoveryAttempt,
} from "./types/session";

// ── Pipeline Types ──────────────────────────────────────────────────────
export type {
  LifecycleEvent,
  HookPriority,
  HookCategory,
  HookContext,
  HookRegistration,
  HookResult,
  PipelineCancellation,
  PipelineContext,
  PipelineTiming,
  PipelineMetrics,
  PipelineReportAddon,
  PipelineResult,
} from "./pipeline";

// ── Fingerprint ──────────────────────────────────────────────────────────
export {
  generateErrorId,
  generateShortErrorId,
  generateSessionId,
  isSessionValid,
  generateContentHash,
} from "./fingerprint";

// ── Collector ────────────────────────────────────────────────────────────
export {
  collectAll as collectDiagnostics,
  collectBrowserInfo,
  collectBrowserVersion,
  collectOS,
  collectDevice,
  collectRoute,
  collectViewport,
  collectEnvironment,
  collectRuntime,
} from "./collector";

// ── Analyzer ─────────────────────────────────────────────────────────────
export {
  analyzeError,
  classifyError,
  buildSummary,
  getCategoryLabel,
  getSeverityLabel,
  extractLikelyCauses,
  extractUserResolutions,
  extractDeveloperNotes,
  generateSuggestions,
} from "./analyzer";

// ── Session ──────────────────────────────────────────────────────────────
export {
  getSession,
  incrementErrorCount,
  markRecovered,
  incrementRecoveryAttempts,
  resetSession,
  clearSession,
  attemptRecovery,
  recordRecoverySuccess,
  getRecoveryHistory,
  clearRecoveryHistory,
} from "./session";

// ── Reporter ─────────────────────────────────────────────────────────────
export {
  buildReport,
  formatReport,
  formatReportToPlainText,
  copyReportToClipboard,
  getReportAsText,
} from "./reporter";

// ── Pipeline ─────────────────────────────────────────────────────────────
export {
  registerHook,
  removeHook,
  clearHooks,
  clearHooksByEvent,
  clearHooksByCategory,
  getHooksForEvent,
  getHookCount,
  getHooksByCategory,
  executeHooks,
  executePipeline,
  cancelPipeline,
} from "./pipeline";

// ── Transport ────────────────────────────────────────────────────────────
export {
  registerProvider,
  unregisterProvider,
  getProvider,
  getActiveProviders,
  getAllRegisteredProviders,
  isProviderRegistered,
  dispatch,
  ConsoleProvider,
  ResendProvider,
  SentryProvider,
  getCorrelation,
  getAllCorrelations,
  clearCorrelations,
  InternalApiProvider,
  getAcknowledgement,
  getAllAcknowledgements,
  clearAcknowledgements,
  isApiConfigured,
  serializeReport,
  serializeBatch,
  getPayloadSize,
  validatePayload,
  sanitizePayload,
  buildAuthHeaders,
  isAuthenticationConfigured,
} from "./transport";

export type {
  SentryCorrelation,
  ApiAcknowledgement,
  ValidationResult,
  AuthConfig,
} from "./transport";

// ── Configuration ────────────────────────────────────────────────────────
export { getConfig, updateConfig, isDevelopment, isProduction } from "./config";
export type { DiagnosticsConfig, Environment } from "./config";

// ── Storage ─────────────────────────────────────────────────────────────
export {
  initializeStorage,
  saveReport,
  findReport,
  searchReports,
  deleteReport,
  clearStorage,
  getMetricsSummary as getStorageMetrics,
  applyRetentionCleanup,
  getStorageHealth,
  registerStorageProvider,
  getStorageProvider,
  setActiveStorageProvider,
  MemoryStorageProvider,
} from "./storage";

export type {
  StorageProvider,
  StoredReport,
  SearchQuery,
  SearchResult,
  StorageMetrics,
  StorageHealth,
  RetentionPolicyType,
} from "./storage";

// ── Constants ────────────────────────────────────────────────────────────
export {
  SDK_VERSION,
  ERROR_ID_PREFIX,
  SEVERITY_LABELS,
  CATEGORY_LABELS,
} from "./constants";

// ── Public SDK Functions ─────────────────────────────────────────────────

import { generateErrorId } from "./fingerprint";
import { collectAll } from "./collector";
import { analyzeError } from "./analyzer";
import { incrementErrorCount } from "./session";
import { buildReport } from "./reporter";
import { executePipeline } from "./pipeline";
import type { DiagnosticsReport } from "./types/report";
import type { PipelineResult } from "./pipeline";

let lastPipelineResult: PipelineResult | null = null;

function processError(
  error: Error & { digest?: string },
  overrides?: { errorId?: string }
): DiagnosticsReport {
  const errorId = overrides?.errorId || error.digest || generateErrorId();
  const session = incrementErrorCount();
  const environment = collectAll();
  const analysis = analyzeError(error.message, error.stack);

  return buildReport({
    errorId,
    sessionId: session.sessionId,
    error: {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      name: error.name,
    },
    classification: analysis.classification,
    environment,
    session,
  });
}

export function captureError(
  error: Error & { digest?: string }
): DiagnosticsReport {
  const report = processError(error);

  executePipeline(report).then((result) => {
    lastPipelineResult = result;
  }).catch(() => {
    // Pipeline errors are isolated — never block the application
  });

  return report;
}

export function captureException(
  error: Error & { digest?: string }
): DiagnosticsReport {
  return captureError(error);
}

export function captureMessage(message: string): DiagnosticsReport {
  const error = new Error(message);
  return captureError(error);
}

export function captureUnhandledRejection(
  event: PromiseRejectionEvent
): DiagnosticsReport {
  const reason = event.reason;
  const message =
    reason instanceof Error
      ? reason.message
      : typeof reason === "string"
        ? reason
        : "Unhandled Promise Rejection";

  const error =
    reason instanceof Error ? reason : new Error(message);

  return captureError(error);
}

export function captureWindowError(
  event: ErrorEvent
): DiagnosticsReport {
  const error = new Error(event.message);
  error.name = event.error?.name || "WindowError";
  error.stack = event.error?.stack || `${event.filename}:${event.lineno}:${event.colno}`;

  return captureError(error);
}

export function buildReportFromError(
  error: Error & { digest?: string }
): DiagnosticsReport {
  return processError(error);
}

export function getLastPipelineResult(): PipelineResult | null {
  return lastPipelineResult;
}
