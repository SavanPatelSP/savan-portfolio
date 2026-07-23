"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  CheckCircle2,
  Smartphone,
  Monitor,
  ArrowRight,
  Share,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST } from "@/lib/motion";
import { type BeforeInstallPromptEvent, type BrowserCapability } from "@/lib/pwa";
import { useBrowserCapability } from "@/hooks/useBrowserCapability";

export function DownloadFlow({
  productName = "Portfolio App",
  version: _version = "1.0.0",
  className,
}: {
  productName?: string;
  version?: string;
  className?: string;
}) {
  const initialCapability = useBrowserCapability();
  const [overrideCapability, setOverrideCapability] = useState<string | null>(null);
  const capability = (overrideCapability as BrowserCapability | null) ?? initialCapability;
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  const promptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      const evt = e as BeforeInstallPromptEvent;
      promptRef.current = evt;
      setDeferredPrompt(evt);
      setOverrideCapability("chromium");
    };

    const onAppInstalled = () => {
      promptRef.current = null;
      setDeferredPrompt(null);
      setInstalled(true);
      setOverrideCapability("standalone");
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstall = useCallback(async () => {
    if (!promptRef.current) return;
    setInstalling(true);
    try {
      promptRef.current.prompt();
      const { outcome } = await promptRef.current.userChoice;
      if (outcome === "accepted") {
        setInstalled(true);
      }
    } catch {
      // prompt failed
    }
    promptRef.current = null;
    setDeferredPrompt(null);
    setInstalling(false);
  }, []);

  if (capability === "standalone" || installed) {
    return (
      <div className={cn("relative", className)}>
        <div className="inline-flex items-center gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-3.5 text-sm font-medium text-emerald-400/80 min-h-[56px]">
          <CheckCircle2 className="h-4 w-4" />
          {productName} is installed
        </div>
      </div>
    );
  }

  if (capability === "chromium" && deferredPrompt) {
    return (
      <div className={cn("relative", className)}>
        <motion.button
          onClick={handleInstall}
          disabled={installing}
          className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black overflow-hidden min-h-[56px]"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.gentle}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.08] to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out">
            <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
          </div>
          <div className="absolute inset-0 rounded-xl border border-black/10 group-hover:border-black/20 transition-colors duration-300 pointer-events-none" />
          <Download className="h-4 w-4 relative z-[1] group-hover:translate-y-0.5 transition-transform duration-200" />
          <span className="relative z-[1]">
            {installing ? "Installing..." : `Install ${productName}`}
          </span>
          {!installing && (
            <ArrowRight className="h-3.5 w-3.5 relative z-[1] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
          )}
        </motion.button>
      </div>
    );
  }

  if (capability === "chromium") {
    return (
      <div className={cn("relative", className)}>
        <motion.button
          onClick={() => {
            window.location.href = "/install";
          }}
          className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black overflow-hidden min-h-[56px]"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={spring.gentle}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.08] to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out">
            <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
          </div>
          <div className="absolute inset-0 rounded-xl border border-black/10 group-hover:border-black/20 transition-colors duration-300 pointer-events-none" />
          <Monitor className="h-4 w-4 relative z-[1] group-hover:translate-y-0.5 transition-transform duration-200" />
          <span className="relative z-[1]">Install {productName}</span>
          <ArrowRight className="h-3.5 w-3.5 relative z-[1] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </motion.button>
      </div>
    );
  }

  if (capability === "safari") {
    return (
      <div className={cn("relative", className)}>
        <SafariInstallGuide productName={productName} />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <motion.a
        href="/install"
        className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-white/[0.06] border border-white/[0.08] px-8 py-4 text-sm font-medium text-white/60 overflow-hidden min-h-[56px] hover:text-white/80 hover:border-white/[0.12] transition-all duration-200"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={spring.gentle}
      >
        <Info className="h-4 w-4 relative z-[1]" />
        <span className="relative z-[1]">How to install</span>
        <ArrowRight className="h-3.5 w-3.5 relative z-[1] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </motion.a>
    </div>
  );
}

function SafariInstallGuide({ productName }: { productName: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full">
      <motion.button
        onClick={() => setExpanded(!expanded)}
        className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black overflow-hidden min-h-[56px]"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={spring.gentle}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.08] to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 rounded-xl border border-black/10 group-hover:border-black/20 transition-colors duration-300 pointer-events-none" />
        <Share className="h-4 w-4 relative z-[1]" />
        <span className="relative z-[1]">Install {productName}</span>
        <ArrowRight className={cn(
          "h-3.5 w-3.5 relative z-[1] transition-all duration-200",
          expanded ? "rotate-90 opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
        )} />
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: FAST, ease: ease.out }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-4 w-4 text-white/40" />
                <span className="text-sm font-medium text-white/60">
                  Safari Installation
                </span>
              </div>
              <ol className="space-y-3">
                {[
                  { step: 1, text: "Tap the Share button in the toolbar" },
                  { step: 2, text: "Scroll down and tap \"Add to Home Screen\"" },
                  { step: 3, text: "Tap Add in the top-right corner" },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.06] text-[10px] font-mono font-bold text-white/40 shrink-0 mt-0.5">
                      {step}
                    </span>
                    <span className="text-[13px] text-white/40 leading-relaxed">{text}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[11px] text-white/20 mt-4">
                The app icon will appear on your home screen.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
