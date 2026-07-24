import type { ErrorCategory, ErrorSeverity, CollectorData } from "./diagnostics";

export interface DiagnosticsReport {
  readonly errorId: string;
  readonly sessionId: string;
  readonly timestamp: string;
  readonly timestampISO: string;
  readonly route: string;
  readonly error: {
    readonly message: string;
    readonly stack?: string;
    readonly digest?: string;
    readonly name: string;
  };
  readonly classification: {
    readonly category: ErrorCategory;
    readonly label: string;
    readonly severity: ErrorSeverity;
    readonly summary: string;
    readonly likelyCauses: readonly string[];
    readonly suggestedResolution: readonly string[];
  };
  readonly environment: CollectorData;
  readonly session: {
    readonly sessionId: string;
    readonly startedAt: string;
    readonly errorsThisSession: number;
    readonly recovered: boolean;
    readonly recoveryAttempts: number;
    readonly duration: number;
  };
  readonly metadata: {
    readonly sdkVersion: string;
    readonly buildId?: string;
  };
  readonly pipeline?: {
    readonly timing: {
      readonly collectorTime: number;
      readonly analyzerTime: number;
      readonly reportTime: number;
      readonly pipelineTime: number;
      readonly transportTime: number;
      readonly providerTimes: Readonly<Record<string, number>>;
      readonly totalTime: number;
    };
    readonly metrics: {
      readonly hookCount: number;
      readonly executedHooks: number;
      readonly failedHooks: number;
      readonly providerCount: number;
      readonly successfulProviders: number;
      readonly failedProviders: number;
      readonly retryCount: number;
      readonly dispatchDuration: number;
    };
  };
  readonly storage?: {
    readonly storedAt: string;
    readonly updatedAt: string;
    readonly providerId: string;
    readonly version: number;
    readonly size: number;
  };
  readonly correlation?: {
    readonly id: string;
    readonly fingerprint: string;
    readonly sessionId: string;
    readonly parentId: string | null;
    readonly relatedIds: readonly string[];
    readonly duplicateCount: number;
    readonly occurrenceCount: number;
    readonly firstOccurrence: string;
    readonly latestOccurrence: string;
  };
  readonly occurrences?: {
    readonly count: number;
    readonly firstAt: string;
    readonly latestAt: string;
    readonly history: readonly {
      readonly timestamp: string;
      readonly errorId: string;
      readonly sessionId: string;
    }[];
  };
  readonly providerResults?: readonly {
    readonly providerId: string;
    readonly success: boolean;
    readonly timestamp: string;
    readonly error?: string;
  }[];
  readonly pipelineResults?: readonly {
    readonly timestamp: string;
    readonly hookCount: number;
    readonly executedHooks: number;
    readonly failedHooks: number;
    readonly providerCount: number;
    readonly successfulProviders: number;
    readonly failedProviders: number;
    readonly dispatchDuration: number;
  }[];
  readonly retentionPolicy?: "session-only" | "last-100" | "last-24h" | "last-7d" | "last-30d" | "forever";
}

export interface FormattedReport {
  readonly header: string;
  readonly sections: ReportSection[];
  readonly footer: string;
}

export interface ReportSection {
  readonly title: string;
  readonly entries: ReportEntry[];
}

export interface ReportEntry {
  readonly label: string;
  readonly value: string;
}
