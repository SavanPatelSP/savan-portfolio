import { safeExecute } from "../utils";
import type { EnvironmentData } from "../types/diagnostics";

export function collectEnvironment(): EnvironmentData {
  return safeExecute(
    () => {
      const now = new Date();
      return {
        userAgent: navigator.userAgent,
        timestamp: now.toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        timestampISO: now.toISOString(),
      };
    },
    {
      userAgent: "Unknown",
      timestamp: new Date().toLocaleString("en-US"),
      timestampISO: new Date().toISOString(),
    }
  );
}
