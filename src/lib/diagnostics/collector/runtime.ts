import type { RuntimeData } from "../types/diagnostics";

export function collectRuntime(): RuntimeData {
  return {
    framework: "Next.js",
    isClient: typeof window !== "undefined",
    isServer: typeof window === "undefined",
  };
}
