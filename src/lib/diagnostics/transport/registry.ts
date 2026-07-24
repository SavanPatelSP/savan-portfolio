import type { DiagnosticsProvider, ProviderConfig } from "./provider";
import { getConfig } from "../config";

const providers = new Map<string, DiagnosticsProvider>();
const providerConfigs = new Map<string, ProviderConfig>();

export function registerProvider(
  provider: DiagnosticsProvider,
  config?: Partial<ProviderConfig>
): void {
  providers.set(provider.id, provider);

  const fullConfig: ProviderConfig = {
    enabled: true,
    environment: "all",
    ...config,
  };
  providerConfigs.set(provider.id, fullConfig);
}

export function unregisterProvider(id: string): void {
  providers.delete(id);
  providerConfigs.delete(id);
}

export function getProvider(id: string): DiagnosticsProvider | undefined {
  return providers.get(id);
}

export function getActiveProviders(): DiagnosticsProvider[] {
  const config = getConfig();
  const active: DiagnosticsProvider[] = [];

  for (const [id, provider] of providers) {
    const providerConfig = providerConfigs.get(id);
    if (!providerConfig?.enabled) continue;

    if (
      providerConfig.environment &&
      providerConfig.environment !== "all" &&
      providerConfig.environment !== config.environment
    ) {
      continue;
    }

    if (provider.isAvailable && !provider.isAvailable()) continue;

    active.push(provider);
  }

  return active;
}

export function getAllRegisteredProviders(): DiagnosticsProvider[] {
  return Array.from(providers.values());
}

export function isProviderRegistered(id: string): boolean {
  return providers.has(id);
}
