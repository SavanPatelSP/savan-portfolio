import type { DiagnosticsReport } from "../types/report";
import type { ProviderResult } from "../types/provider";

export type LifecycleEvent =
  | "before_analyze"
  | "after_analyze"
  | "before_report"
  | "after_report"
  | "before_dispatch"
  | "after_dispatch"
  | "provider_success"
  | "provider_failure"
  | "report_complete";

export type HookPriority = "low" | "normal" | "high" | "critical";

export type HookCategory = "system" | "internal" | "user" | "provider";

export interface HookContext {
  readonly report: DiagnosticsReport;
  readonly event: LifecycleEvent;
  readonly timestamp: string;
  readonly sdkVersion: string;
  readonly sessionId: string;
  readonly config: {
    readonly environment: string;
    readonly enabled: boolean;
  };
  readonly provider?: {
    readonly id: string;
    readonly name: string;
  };
  readonly result?: ProviderResult;
}

export interface HookRegistration {
  readonly id: string;
  readonly event: LifecycleEvent;
  readonly priority: HookPriority;
  readonly category: HookCategory;
  readonly name: string;
  handler: (context: HookContext) => void | Promise<void>;
}

export interface PipelineCancellation {
  cancelled: boolean;
  reason?: string;
}

export interface HookResult {
  hookId: string;
  success: boolean;
  error?: string;
  duration: number;
}
