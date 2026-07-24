export type ErrorCategory =
  | "module-loading"
  | "chunk-loading"
  | "hydration"
  | "network"
  | "runtime"
  | "server"
  | "permission"
  | "unknown";

export type ErrorSeverity = "recoverable" | "transient" | "critical";

export interface ErrorClassification {
  category: ErrorCategory;
  label: string;
  summary: string;
  likelyCauses: string[];
  suggestedResolution: string[];
  severity: ErrorSeverity;
}

export interface CollectorData {
  browser: string;
  browserVersion: string;
  os: string;
  device: string;
  route: string;
  viewport: ViewportData;
  environment: EnvironmentData;
  runtime: RuntimeData;
}

export interface ViewportData {
  width: number;
  height: number;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  language: string;
  timezone: string;
}

export interface EnvironmentData {
  userAgent: string;
  timestamp: string;
  timestampISO: string;
  nextJsVersion?: string;
}

export interface RuntimeData {
  framework: string;
  frameworkVersion?: string;
  isClient: boolean;
  isServer: boolean;
}
