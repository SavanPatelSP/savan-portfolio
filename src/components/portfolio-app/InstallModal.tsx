"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Monitor,
  Smartphone,
  Wifi,
  Shield,
  Eye,
  Download,
  ChevronRight,
  ArrowLeft,
  Zap,
} from "lucide-react";
import { spring, NORMAL, FAST } from "@/lib/motion";
import { isStandalone } from "@/lib/pwa";
import { useSplash } from "@/lib/splash";

const DISMISS_KEY = "portfolio-app-modal-dismissed";
const SHOWN_KEY = "portfolio-app-modal-shown";
const COOKIE_KEY = "cookie-consent";
const INSTALL_PROMPT_DISMISS_KEY = "portfolio-install-dismissed";
const INSTALL_PROMPT_SHOWN_KEY = "portfolio-install-shown";

const STEPS = [
  {
    id: "intro",
    icon: Monitor,
    title: "Install the Portfolio App",
    subtitle: "A native-like experience for your desktop or mobile device.",
    features: [
      { icon: Zap, text: "Opens in its own window — no browser chrome" },
      { icon: Wifi, text: "Works offline after first visit" },
      { icon: Eye, text: "Clean, distraction-free interface" },
      { icon: Shield, text: "No tracking, privacy-first" },
    ],
  },
  {
    id: "platform",
    icon: Smartphone,
    title: "Choose your platform",
    subtitle: "Installation varies by browser and device. We'll guide you through it.",
    platforms: [
      { name: "Chrome / Edge / Brave", method: "Click the install icon in the address bar, or use the menu → Install App", icon: Monitor },
      { name: "Safari (macOS)", method: "Click the Share button → Add to Dock", icon: Monitor },
      { name: "Safari (iOS / iPad)", method: "Tap the Share button → Add to Home Screen", icon: Smartphone },
    ],
  },
];

export function InstallModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const { ready: splashReady } = useSplash();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!splashReady) return;
    if (!localStorage.getItem(COOKIE_KEY)) return;

    if (localStorage.getItem(DISMISS_KEY)) return;
    if (sessionStorage.getItem(SHOWN_KEY)) return;
    if (localStorage.getItem(INSTALL_PROMPT_DISMISS_KEY)) return;
    if (localStorage.getItem(INSTALL_PROMPT_SHOWN_KEY)) return;

    if (isStandalone()) return;

    const sectionSet = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            sectionSet.add(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

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
  }, [splashReady]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setStep(0);
    localStorage.setItem(DISMISS_KEY, "true");
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, []);

  const handleBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleInstall = useCallback(async () => {
    if (typeof window === "undefined") return;
    window.location.href = "/portfolio-app/install";
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
      if (e.key === "ArrowRight" && step < STEPS.length - 1) handleNext();
      if (e.key === "ArrowLeft" && step > 0) handleBack();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible, step, handleDismiss, handleNext, handleBack]);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const currentStep = STEPS[step];

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
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
            transition={{ ...spring.smooth, duration: NORMAL }}
          >
            <div className="h-px bg-gradient-to-r from-blue-400/40 via-blue-400/20 to-transparent" />

            <button
              onClick={handleDismiss}
              className="absolute right-3 top-4 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg text-white/30 hover:text-white/60 transition-colors duration-200 z-10"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Step indicators */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === step ? "w-6 bg-blue-400/60" : i < step ? "w-1.5 bg-blue-400/30" : "w-1.5 bg-white/10"
                  }`}
                />
              ))}
            </div>

            <div className="px-6 pt-12 pb-6">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {step === 0 && (
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
                        <Monitor className="h-5 w-5 text-blue-400" />
                      </div>

                      <h2 className="text-lg font-semibold text-white/80">{currentStep.title}</h2>
                      <p className="mt-2 text-sm text-white/35 leading-relaxed">{currentStep.subtitle}</p>

                      <div className="mt-6 space-y-3">
                        {currentStep.features?.map((f) => (
                          <div key={f.text} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-400/10">
                              <f.icon className="h-3 w-3 text-blue-400/60" />
                            </div>
                            <span className="text-sm text-white/45">{f.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10">
                        <Smartphone className="h-5 w-5 text-blue-400" />
                      </div>

                      <h2 className="text-lg font-semibold text-white/80">{currentStep.title}</h2>
                      <p className="mt-2 text-sm text-white/35 leading-relaxed">{currentStep.subtitle}</p>

                      <div className="mt-6 space-y-3">
                        {currentStep.platforms?.map((p) => (
                          <div
                            key={p.name}
                            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <p.icon className="h-4 w-4 text-blue-400/50" />
                              <span className="text-sm font-medium text-white/60">{p.name}</span>
                            </div>
                            <p className="text-xs text-white/30 leading-relaxed">{p.method}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between">
                <div>
                  {step > 0 && (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-sm text-white/30 hover:text-white/50 transition-colors"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  {step < STEPS.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black min-h-[44px] hover:bg-white/90 transition-colors duration-200"
                    >
                      Continue
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </button>
                  ) : (
                    <button
                      onClick={handleInstall}
                      className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black min-h-[44px] hover:bg-white/90 transition-colors duration-200"
                    >
                      <Download className="h-4 w-4" />
                      Install Now
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-5 text-center text-[11px] text-white/15">
                Free &bull; No account required &bull; Privacy first
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
