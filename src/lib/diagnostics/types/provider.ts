import type { DiagnosticsReport } from "./report";

export interface DiagnosticsProvider {
  readonly name: string;
  readonly id: string;
  send(report: DiagnosticsReport): Promise<ProviderResult>;
  flush?(): Promise<void>;
  isAvailable?(): boolean;
}

export interface ProviderResult {
  success: boolean;
  providerId: string;
  error?: string;
  timestamp: string;
}

export interface ProviderConfig {
  enabled: boolean;
  environment?: "development" | "production" | "all";
  sampleRate?: number;
  maxRetries?: number;
  timeout?: number;
}
