"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Monitor, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, NORMAL } from "@/lib/motion";
import { type BeforeInstallPromptEvent, isStandalone } from "@/lib/pwa";
import { useIsStandalone } from "@/hooks/useIsStandalone";

const DISMISS_KEY = "portfolio-install-dismissed";
const SHOWN_KEY = "portfolio-install-shown";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const isStandaloneState = useIsStandalone();
  const isIOS = useSyncExternalStore(
    () => () => {},
    () => /iPad|iPhone|iPod/.test(navigator.userAgent),
    () => false,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = localStorage.getItem(DISMISS_KEY);
    if (dismissed) return;

    if (isStandalone()) return;

    const shown = parseInt(localStorage.getItem(SHOWN_KEY) || "0", 10);
    if (shown >= 3) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      localStorage.setItem(SHOWN_KEY, String(shown + 1));
      setTimeout(() => setVisible(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    setIsInstalling(true);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setIsInstalling(false);
    if (outcome === "accepted") setVisible(false);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  }, []);

  const showIOSGuide = isIOS && !isStandaloneState;

  if (isStandaloneState) return null;
  if (!visible && !showIOSGuide) return null;

  return (
    <AnimatePresence>
      {(visible || showIOSGuide) && (
        <motion.div
          className="fixed bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[380px] z-[200]"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: NORMAL, ease: ease.out }}
        >
          <div className="rounded-2xl border border-white/[0.06] bg-[#111111]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <Download className="h-4 w-4 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80">Install Portfolio App</h3>
                    <p className="text-[11px] text-white/25 mt-0.5">Savan Patel</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/20 hover:text-white/50 hover:bg-white/[0.04] transition-all duration-200"
                  aria-label="Dismiss install prompt"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-[13px] text-white/35 leading-relaxed mb-4">
                Install the portfolio as a desktop application for a faster, distraction-free experience with offline access.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { icon: Monitor, label: "Desktop app" },
                  { icon: Download, label: "Offline access" },
                  { icon: Smartphone, label: "Mobile optimized" },
                  { icon: Monitor, label: "Auto updates" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 text-[11px] text-white/25">
                    <f.icon className="h-3 w-3 text-white/15" />
                    {f.label}
                  </div>
                ))}
              </div>

              {showIOSGuide ? (
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.04] p-4">
                  <p className="text-[12px] text-white/40 leading-relaxed">
                    <span className="text-white/55 font-medium">Safari:</span> Tap the Share button{" "}
                    then &quot;Add to Home Screen&quot;
                  </p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    disabled={isInstalling || !deferredPrompt}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black transition-all duration-200 min-h-[44px]",
                      (!deferredPrompt || isInstalling) && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    {isInstalling ? "Installing..." : "Install Now"}
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2.5 rounded-xl border border-white/[0.06] text-sm text-white/35 hover:text-white/55 hover:border-white/[0.1] transition-all duration-200 min-h-[44px]"
                  >
                    Maybe Later
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
