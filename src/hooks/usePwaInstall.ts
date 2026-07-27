"use client";

import { useState, useEffect, useCallback, useSyncExternalStore, useRef } from "react";
import { type BeforeInstallPromptEvent, isStandalone, detectBrowserCapability } from "@/lib/pwa";

export interface PwaInstallState {
  canInstall: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isSafari: boolean;
  isChromium: boolean;
  isStandalone: boolean;
  prompt: BeforeInstallPromptEvent | null;
  promptInstall: () => Promise<boolean>;
}

export function usePwaInstall(): PwaInstallState {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const capabilityRef = useRef<"chromium" | "safari" | "standalone" | "unsupported">("unsupported");

  const isStandaloneState = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(display-mode: standalone)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    isStandalone,
    () => false,
  );

  const isIOS = useSyncExternalStore(
    () => () => {},
    () => /iPad|iPhone|iPod/.test(navigator.userAgent),
    () => false,
  );

  const isSafari = useSyncExternalStore(
    () => () => {},
    () => navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"),
    () => false,
  );

  const isChromium = useSyncExternalStore(
    () => () => {},
    () => !isIOS && !isSafari,
    () => false,
  );

  const capability = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      capabilityRef.current = detectBrowserCapability();
      callback();
      return () => {};
    },
    () => capabilityRef.current,
    () => "unsupported" as const,
  );

  const isInstalled = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const handleAppInstalled = () => callback();
      window.addEventListener("appinstalled", handleAppInstalled);
      return () => window.removeEventListener("appinstalled", handleAppInstalled);
    },
    () => isStandalone() || capability === "standalone",
    () => false,
  );

  const canInstall = capability === "chromium" && !!deferredPrompt && !isInstalled;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        setDeferredPrompt(null);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [deferredPrompt]);

  return {
    canInstall,
    isInstalled,
    isIOS,
    isSafari,
    isChromium,
    isStandalone: isStandaloneState || isInstalled,
    prompt: deferredPrompt,
    promptInstall,
  };
}
