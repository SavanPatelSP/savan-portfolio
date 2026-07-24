import type { StorageProvider } from "./storage";

const TAG = "[diagnostics:storage:registry]";

const providers = new Map<string, StorageProvider>();
let activeProviderId: string | null = null;

function log(level: "info" | "warn" | "error", msg: string): void {
  const entry = `${TAG} ${msg}`;
  if (level === "error") console.error(entry);
  else if (level === "warn") console.warn(entry);
  else console.log(entry);
}

export function registerStorageProvider(provider: StorageProvider): void {
  if (providers.has(provider.id)) {
    log("warn", `Provider '${provider.id}' already registered, replacing`);
  }

  providers.set(provider.id, provider);

  if (!activeProviderId) {
    activeProviderId = provider.id;
    log("info", `Set active provider: ${provider.id}`);
  }

  log("info", `Registered provider: ${provider.id} (${provider.name})`);
}

export function unregisterStorageProvider(id: string): boolean {
  const result = providers.delete(id);

  if (result && activeProviderId === id) {
    const remaining = Array.from(providers.keys());
    activeProviderId = remaining.length > 0 ? remaining[0] : null;
    if (activeProviderId) {
      log("info", `Active provider changed to: ${activeProviderId}`);
    } else {
      log("warn", "No storage providers registered");
    }
  }

  return result;
}

export function getStorageProvider(id?: string): StorageProvider | null {
  if (id) {
    return providers.get(id) || null;
  }
  if (activeProviderId) {
    return providers.get(activeProviderId) || null;
  }
  return null;
}

export function setActiveStorageProvider(id: string): boolean {
  if (!providers.has(id)) {
    log("error", `Provider '${id}' not registered`);
    return false;
  }

  activeProviderId = id;
  log("info", `Active provider changed to: ${id}`);
  return true;
}

export function getAllStorageProviders(): readonly StorageProvider[] {
  return Array.from(providers.values());
}

export function isStorageProviderRegistered(id: string): boolean {
  return providers.has(id);
}

export function clearStorageProviders(): void {
  providers.clear();
  activeProviderId = null;
  log("info", "All providers cleared");
}
