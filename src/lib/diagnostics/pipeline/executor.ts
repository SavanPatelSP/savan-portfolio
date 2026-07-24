import type { DiagnosticsReport } from "../types/report";
import type { ProviderResult } from "../types/provider";
import type { LifecycleEvent, HookContext } from "./events";
import {
  createPipelineContext,
  recordProviderResult,
  recordHookResults,
  finalizeTiming,
  buildPipelineAddon,
  type PipelineContext,
  type PipelineReportAddon,
} from "./lifecycle";
import { executeHooks } from "./hooks";
import { getActiveProviders } from "../transport/registry";
import { withRetry } from "../transport/retry";
import { updateStatus, recordSuccess, recordFailure } from "../transport/status";
import { getConfig } from "../config";
import { SDK_VERSION } from "../constants";
import {
  saveReport,
  updateReportAfterDispatch,
  type ProviderResultRecord,
  type PipelineResultRecord,
} from "../storage/manager";

export interface PipelineResult {
  report: DiagnosticsReport;
  context: PipelineContext;
  addon: PipelineReportAddon["pipeline"];
}

function buildHookContext(
  event: LifecycleEvent,
  ctx: PipelineContext,
  provider?: { id: string; name: string },
  result?: ProviderResult
): HookContext {
  const config = getConfig();
  return {
    report: ctx.report,
    event,
    timestamp: new Date().toISOString(),
    sdkVersion: SDK_VERSION,
    sessionId: ctx.report.session.sessionId,
    config: {
      environment: config.environment,
      enabled: config.enabled,
    },
    provider,
    result,
  };
}

export async function executePipeline(
  report: DiagnosticsReport
): Promise<PipelineResult> {
  const ctx = createPipelineContext(report);

  await saveReport(report);

  await fireHooks("before_dispatch", ctx);

  if (ctx.cancelled) {
    finalizeTiming(ctx);
    return {
      report,
      context: ctx,
      addon: buildPipelineAddon(ctx),
    };
  }

  const transportStart = performance.now();
  await dispatchThroughPipeline(ctx);
  ctx.timing.transportTime = performance.now() - transportStart;

  await updateStoredReport(ctx);

  await fireHooks("after_dispatch", ctx);

  await fireHooks("report_complete", ctx);

  finalizeTiming(ctx);

  return {
    report,
    context: ctx,
    addon: buildPipelineAddon(ctx),
  };
}

async function dispatchThroughPipeline(
  ctx: PipelineContext
): Promise<void> {
  const providers = getActiveProviders();
  if (providers.length === 0) return;

  ctx.metrics.providerCount = providers.length;

  for (const provider of providers) {
    if (ctx.cancelled) break;

    updateStatus(provider.id, "sending");
    const providerStart = performance.now();

    try {
      const result = await withRetry(
        () => provider.send(ctx.report),
        { maxAttempts: 3, baseDelay: 1000, maxDelay: 10000 }
      );

      const duration = performance.now() - providerStart;
      recordProviderResult(ctx, result, duration);

      if (result.success) {
        recordSuccess(provider.id);
        await fireHooks("provider_success", ctx, {
          id: provider.id,
          name: provider.name,
        }, result);
      } else {
        recordFailure(provider.id, result.error);
        await fireHooks("provider_failure", ctx, {
          id: provider.id,
          name: provider.name,
        }, result);
      }
    } catch (err) {
      const duration = performance.now() - providerStart;
      const message =
        err instanceof Error ? err.message : "Unknown dispatch error";

      const failResult: ProviderResult = {
        success: false,
        providerId: provider.id,
        error: message,
        timestamp: new Date().toISOString(),
      };

      recordProviderResult(ctx, failResult, duration);
      recordFailure(provider.id, message);

      await fireHooks("provider_failure", ctx, {
        id: provider.id,
        name: provider.name,
      }, failResult);
    }
  }
}

async function fireHooks(
  event: LifecycleEvent,
  ctx: PipelineContext,
  provider?: { id: string; name: string },
  result?: ProviderResult
): Promise<void> {
  ctx.events.push(event);
  const hookContext = buildHookContext(event, ctx, provider, result);
  const hookResults = await executeHooks(event, hookContext);
  ctx.metrics.hookCount += hookResults.length;
  recordHookResults(ctx, hookResults);
}

async function updateStoredReport(ctx: PipelineContext): Promise<void> {
  try {
    const providerResults: ProviderResultRecord[] = ctx.providerResults.map(
      (r) => ({
        providerId: r.providerId,
        success: r.success,
        timestamp: r.timestamp,
        error: r.error,
      })
    );

    const pipelineResults: PipelineResultRecord = {
      timestamp: new Date().toISOString(),
      hookCount: ctx.metrics.hookCount,
      executedHooks: ctx.metrics.executedHooks,
      failedHooks: ctx.metrics.failedHooks,
      providerCount: ctx.metrics.providerCount,
      successfulProviders: ctx.metrics.successfulProviders,
      failedProviders: ctx.metrics.failedProviders,
      dispatchDuration: ctx.metrics.dispatchDuration,
    };

    await updateReportAfterDispatch(
      ctx.report.errorId,
      providerResults,
      pipelineResults
    );
  } catch {
    // Storage errors are isolated — never block the pipeline
  }
}

export function cancelPipeline(
  ctx: PipelineContext,
  reason?: string
): void {
  ctx.cancelled = true;
  ctx.cancellationReason = reason;
}
