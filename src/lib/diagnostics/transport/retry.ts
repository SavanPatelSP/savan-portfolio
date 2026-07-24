import type { ProviderResult } from "./provider";

export interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000,
};

function calculateDelay(attempt: number, config: RetryConfig): number {
  const delay = config.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, config.maxDelay);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config?: Partial<RetryConfig>
): Promise<T> {
  const mergedConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < mergedConfig.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < mergedConfig.maxAttempts - 1) {
        const delay = calculateDelay(attempt, mergedConfig);
        await sleep(delay);
      }
    }
  }

  throw lastError || new Error("Retry failed: unknown error");
}

export function createRetryProviderResult(
  providerId: string,
  error: string
): ProviderResult {
  return {
    success: false,
    providerId,
    error,
    timestamp: new Date().toISOString(),
  };
}
