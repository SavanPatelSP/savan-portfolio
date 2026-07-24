import { safeExecute } from "../utils";
import type { ViewportData } from "../types/diagnostics";

export function collectViewport(): ViewportData {
  return safeExecute(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight,
      screenWidth: screen.width,
      screenHeight: screen.height,
      pixelRatio: window.devicePixelRatio || 1,
      language: navigator.language || "Unknown",
      timezone:
        Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
    }),
    {
      width: 0,
      height: 0,
      screenWidth: 0,
      screenHeight: 0,
      pixelRatio: 1,
      language: "Unknown",
      timezone: "Unknown",
    }
  );
}
