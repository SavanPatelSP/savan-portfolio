import type { ProviderConfig } from "./types/provider";
import type { SessionConfig } from "./types/session";

export type Environment = "development" | "production";

export interface DiagnosticsConfig {
  environment: Environment;
  enabled: boolean;
  providers: Record<string, ProviderConfig>;
  session: SessionConfig;
  consoleProvider: {
    enabled: boolean;
    groupOutput: boolean;
  };
}

const defaultProviderConfigs: Record<string, ProviderConfig> = {
  console: { enabled: true, environment: "all" },
  resend: { enabled: false, environment: "production" },
  sentry: { enabled: false, environment: "production" },
  discord: { enabled: false, environment: "production" },
  "internal-api": { enabled: false, environment: "production" },
};

const defaultSessionConfig: SessionConfig = {
  maxDuration: 30 * 60 * 1000,
  maxErrors: 50,
  persistAcrossNavigation: true,
};

function resolveEnvironment(): Environment {
  if (
    typeof process !== "undefined" &&
    process.env?.NODE_ENV === "production"
  ) {
    return "production";
  }
  return "development";
}

function buildDefaultConfig(): DiagnosticsConfig {
  return {
    environment: resolveEnvironment(),
    enabled: true,
    providers: { ...defaultProviderConfigs },
    session: { ...defaultSessionConfig },
    consoleProvider: {
      enabled: true,
      groupOutput: resolveEnvironment() === "development",
    },
  };
}

let cachedConfig: DiagnosticsConfig | null = null;

export function getConfig(): DiagnosticsConfig {
  if (!cachedConfig) {
    cachedConfig = buildDefaultConfig();
  }
  return cachedConfig;
}

export function updateConfig(
  partial: Partial<DiagnosticsConfig>
): DiagnosticsConfig {
  cachedConfig = { ...getConfig(), ...partial };
  return cachedConfig;
}

export function isDevelopment(): boolean {
  return getConfig().environment === "development";
}

export function isProduction(): boolean {
  return getConfig().environment === "production";
}
