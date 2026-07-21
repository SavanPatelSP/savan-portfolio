"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Monitor, Smartphone, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, NORMAL, SLOW, FAST } from "@/lib/motion";
import { isStandalone } from "@/lib/pwa";

const DISMISS_KEY = "portfolio-app-modal-dismissed";
const SHOWN_KEY = "portfolio-app-modal-shown";

const FEATURES = [
  "Opens in its own window \u2014 no browser chrome",
  "Works offline after first visit",
  "Always up to date automatically",
];

export function InstallModal() {
  const [visible, setVisible] = useState(false);
  const [sectionsViewed, setSectionsViewed] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem(DISMISS_KEY)) return;
    if (sessionStorage.getItem(SHOWN_KEY)) return;

    if (isStandalone()) return;

    const sectionSet = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            sectionSet.add(entry.target.id);
            setSectionsViewed(sectionSet.size);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setTimeSpent(elapsed);

      if ((sectionSet.size >= 3 && elapsed >= 15) || elapsed >= 60) {
        if (!localStorage.getItem(DISMISS_KEY) && !sessionStorage.getItem(SHOWN_KEY)) {
          setVisible(true);
          sessionStorage.setItem(SHOWN_KEY, "true");
          clearInterval(timer);
          observer.disconnect();
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, "true");
  }, []);

  const handleInstall = useCallback(async () => {
    if (typeof window === "undefined") return;
    window.location.href = "/portfolio-app/install";
  }, []);

  const handleLearnMore = useCallback(() => {
    if (typeof window === "undefined") return;
    window.location.href = "/portfolio-app";
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, handleDismiss]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FAST }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Install the Portfolio App"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ ...spring.smooth, duration: NORMAL }}
          >
            <div className="h-px bg-gradient-to-r from-blue-400/40 via-blue-400/20 to-transparent" />

            <button
              onClick={handleDismiss}
              className="absolute right-3 top-4 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg text-white/30 hover:text-white/60 transition-colors duration-200"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-6 pt-8 pb-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
                <Monitor className="h-5 w-5 text-blue-400" />
              </div>

              <h2 className="text-lg font-semibold text-white/80">Install the Portfolio App</h2>
              <p className="mt-2 text-sm text-white/35 leading-relaxed">
                Add it to your desktop for instant access, offline browsing, and a native app
                experience.
              </p>

              <ul className="mt-5 space-y-2.5">
                {FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/40">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400/60" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={handleInstall}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black min-h-[48px] hover:bg-white/90 transition-colors duration-200"
                >
                  Install Now
                  <ArrowRight className="h-4 w-4 opacity-50" />
                </button>
                <button
                  onClick={handleLearnMore}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-white/40 min-h-[48px] hover:text-white/60 hover:border-white/[0.15] transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>

              <p className="mt-5 text-center text-[11px] text-white/20">
                Free &bull; No account required &bull; Privacy first
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
