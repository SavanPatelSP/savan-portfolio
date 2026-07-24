import type { DiagnosticsReport } from "../types/report";
import type { ProviderResult } from "../types/provider";
import type { HookResult, LifecycleEvent } from "./events";

export interface PipelineTiming {
  collectorTime: number;
  analyzerTime: number;
  reportTime: number;
  pipelineTime: number;
  transportTime: number;
  providerTimes: Record<string, number>;
  totalTime: number;
}

export interface PipelineMetrics {
  hookCount: number;
  executedHooks: number;
  failedHooks: number;
  providerCount: number;
  successfulProviders: number;
  failedProviders: number;
  retryCount: number;
  dispatchDuration: number;
}

export interface PipelineContext {
  readonly report: DiagnosticsReport;
  readonly startTime: number;
  readonly events: LifecycleEvent[];
  readonly hookResults: HookResult[];
  readonly providerResults: ProviderResult[];
  timing: PipelineTiming;
  metrics: PipelineMetrics;
  cancelled: boolean;
  cancellationReason?: string;
}

export function createPipelineContext(
  report: DiagnosticsReport
): PipelineContext {
  const now = performance.now();
  return {
    report,
    startTime: now,
    events: [],
    hookResults: [],
    providerResults: [],
    timing: {
      collectorTime: 0,
      analyzerTime: 0,
      reportTime: 0,
      pipelineTime: 0,
      transportTime: 0,
      providerTimes: {},
      totalTime: 0,
    },
    metrics: {
      hookCount: 0,
      executedHooks: 0,
      failedHooks: 0,
      providerCount: 0,
      successfulProviders: 0,
      failedProviders: 0,
      retryCount: 0,
      dispatchDuration: 0,
    },
    cancelled: false,
  };
}

export function recordProviderResult(
  ctx: PipelineContext,
  result: ProviderResult,
  duration: number
): void {
  ctx.providerResults.push(result);
  ctx.timing.providerTimes[result.providerId] = duration;
  ctx.metrics.providerCount += 1;

  if (result.success) {
    ctx.metrics.successfulProviders += 1;
  } else {
    ctx.metrics.failedProviders += 1;
  }
}

export function recordHookResults(
  ctx: PipelineContext,
  results: HookResult[]
): void {
  ctx.hookResults.push(...results);
  ctx.metrics.executedHooks += results.length;
  ctx.metrics.failedHooks += results.filter((r) => !r.success).length;
}

export function finalizeTiming(ctx: PipelineContext): void {
  ctx.timing.totalTime = performance.now() - ctx.startTime;
  ctx.timing.pipelineTime = ctx.timing.totalTime;
}

export interface PipelineReportAddon {
  readonly pipeline: {
    readonly timing: PipelineTiming;
    readonly metrics: PipelineMetrics;
  };
}

export function buildPipelineAddon(
  ctx: PipelineContext
): PipelineReportAddon["pipeline"] {
  return {
    timing: { ...ctx.timing },
    metrics: { ...ctx.metrics },
  };
}
