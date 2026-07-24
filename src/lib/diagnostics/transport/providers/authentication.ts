export interface AuthConfig {
  readonly apiKey: string;
  readonly headerName: string;
  readonly headerPrefix: string;
}

const DEFAULT_AUTH_CONFIG: AuthConfig = {
  apiKey: "",
  headerName: "Authorization",
  headerPrefix: "Bearer",
};

function getEnv(name: string): string | null {
  if (typeof process === "undefined") return null;
  const val = process.env[name];
  if (!val || val.trim() === "") return null;
  return val.trim();
}

export function getAuthConfig(): AuthConfig {
  const apiKey = getEnv("DIAGNOSTICS_API_KEY") || "";
  return {
    ...DEFAULT_AUTH_CONFIG,
    apiKey,
  };
}

export function buildAuthHeaders(): Record<string, string> {
  const config = getAuthConfig();
  if (!config.apiKey) {
    return {};
  }
  return {
    [config.headerName]: `${config.headerPrefix} ${config.apiKey}`,
  };
}

export function isAuthenticationConfigured(): boolean {
  return getAuthConfig().apiKey.length > 0;
}
