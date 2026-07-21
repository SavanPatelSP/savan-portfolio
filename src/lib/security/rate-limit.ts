import { Ratelimit } from "@upstash/ratelimit";
import { getRedis, isRedisConfigured } from "./redis";
import { RATE_LIMIT } from "./constants";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset: number;
}

const FALLBACK_RESULT: RateLimitResult = {
  allowed: true,
  remaining: 0,
  reset: 0,
};

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit {
  if (limiter) return limiter;

  const max = Number(process.env.RATE_LIMIT_MAX || RATE_LIMIT.DEFAULT_MAX);
  const windowSeconds = Number(
    process.env.RATE_LIMIT_WINDOW_SECONDS || RATE_LIMIT.DEFAULT_WINDOW_SECONDS,
  );

  limiter = new Ratelimit({
    redis: getRedis(),
    limiter: Ratelimit.slidingWindow(max, `${windowSeconds}s`),
    analytics: true,
    prefix: RATE_LIMIT.KEY_PREFIX,
  });

  return limiter;
}

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  if (!isRedisConfigured()) {
    return FALLBACK_RESULT;
  }

  try {
    const rl = getLimiter();
    const result = await rl.limit(key);
    return {
      allowed: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch {
    return FALLBACK_RESULT;
  }
}
