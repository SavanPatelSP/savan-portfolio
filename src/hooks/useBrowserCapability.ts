import { useSyncExternalStore } from "react";
import { detectBrowserCapability, type BrowserCapability } from "@/lib/pwa";

export function useBrowserCapability(): BrowserCapability {
  return useSyncExternalStore(
    () => () => {},
    detectBrowserCapability,
    () => "unsupported",
  );
}
