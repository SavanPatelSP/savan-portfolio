export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export type BrowserCapability = "chromium" | "safari" | "standalone" | "unsupported";

export function detectBrowserCapability(): BrowserCapability {
  if (typeof window === "undefined") return "unsupported";

  const isStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (isStandalone) return "standalone";

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari =
    navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");

  if (isIOS || isSafari) return "safari";

  return "chromium";
}

export function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
