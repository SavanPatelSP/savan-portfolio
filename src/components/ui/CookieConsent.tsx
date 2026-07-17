"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Shield,
  Check,
  ChevronDown,
  HardDrive,
  Globe,
  Cookie,
  ArrowRight,
  X,
  Lock,
  Fingerprint,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FAST, NORMAL, SLOW, ease, spring } from "@/lib/motion";

/* ─── Status Chips Data ─────────────────────────────────────── */

const statusChips = [
  { icon: Cookie, label: "No Advertising Cookies" },
  { icon: Globe, label: "No Cross-site Tracking" },
  { icon: Lock, label: "Stored Only In Your Browser" },
] as const;

/* ─── Flow Steps Data ───────────────────────────────────────── */

const flowSteps = [
  { icon: Globe, label: "Browser" },
  { icon: HardDrive, label: "localStorage" },
  { icon: Shield, label: "Preference Saved" },
  { icon: Check, label: "Visits Remembered" },
] as const;

/* ─── Learn More Items ──────────────────────────────────────── */

const learnMoreItems = [
  {
    title: "What is localStorage?",
    body: "A browser-native storage mechanism that saves data locally on your device. Unlike cookies, localStorage data never leaves your browser — it is never sent to any server.",
  },
  {
    title: "Cookies vs localStorage",
    body: "Cookies are sent with every HTTP request to the server, enabling tracking. localStorage stays entirely on your device. SP NET INC uses localStorage, not cookies.",
  },
  {
    title: "What SP NET Stores",
    body: "A single key: 'cookie-consent' with a value of 'accepted' or 'declined'. No names, emails, device IDs, or any personal information is stored.",
  },
  {
    title: "Third-party Services",
    body: "Resend processes contact form emails. Vercel provides hosting. Neither sets tracking cookies through this site. No analytics scripts are loaded.",
  },
] as const;

/* ─── Focus Trap Hook ───────────────────────────────────────── */

function useFocusTrap(active: boolean, containerRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const focusable = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    first?.focus();
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [active, containerRef]);
}

/* ─── Main Component ────────────────────────────────────────── */

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  /* ─── Visibility ──────────────────────────────────────────── */

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timeout = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ─── Focus trap + Escape ─────────────────────────────────── */

  useFocusTrap(visible, containerRef);

  useEffect(() => {
    if (!visible) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") decline();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Body scroll lock on mobile ──────────────────────────── */

  useEffect(() => {
    if (!visible || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [visible, isMobile]);

  /* ─── Actions (unchanged logic) ───────────────────────────── */

  const accept = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }, []);

  /* ─── Motion configs ──────────────────────────────────────── */

  const cardVariants = isMobile
    ? {
        hidden: { y: "100%", opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
      }
    : {
        hidden: { y: 40, opacity: 0, scale: 0.96, filter: "blur(12px)" },
        visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { y: 20, opacity: 0, scale: 0.98, filter: "blur(6px)" },
      };

  const cardTransition = isMobile
    ? { duration: SLOW, ease: ease.out }
    : { duration: SLOW, ease: ease.out };

  /* ─── Render ──────────────────────────────────────────────── */

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm sm:bg-black/20 sm:backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-label="Privacy preferences"
            aria-modal="true"
            className={cn(
              "fixed z-[100] overflow-hidden",
              /* mobile: bottom sheet */
              "bottom-0 left-0 right-0 rounded-t-3xl",
              /* desktop: floating card */
              "sm:bottom-6 sm:right-6 sm:left-auto sm:rounded-3xl sm:w-[440px]"
            )}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={cardTransition}
          >
            {/* Glass background */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(14,14,17,0.95) 0%, rgba(8,8,11,0.98) 100%)",
                backdropFilter: "blur(40px) saturate(1.5)",
                WebkitBackdropFilter: "blur(40px) saturate(1.5)",
              }}
            />
            {/* Border glow */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 0 0 1px rgba(59,130,246,0.04), 0 25px 60px -12px rgba(0,0,0,0.6), 0 0 80px -20px rgba(59,130,246,0.06)",
              }}
            />

            {/* Content */}
            <div className="relative z-[1] p-5 sm:p-6">

              {/* ─── Header ─────────────────────────────── */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-start gap-3">
                  <motion.div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)",
                      border: "1px solid rgba(59,130,246,0.12)",
                    }}
                    animate={
                      prefersReduced
                        ? {}
                        : { boxShadow: ["0 0 0 0 rgba(59,130,246,0)", "0 0 20px 4px rgba(59,130,246,0.08)", "0 0 0 0 rgba(59,130,246,0)"] }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield className="h-5 w-5 text-blue-400/80" />
                  </motion.div>
                  <div>
                    <h2 className="text-sm font-semibold text-white/90 tracking-tight">
                      Privacy Preferences
                    </h2>
                    <p className="text-[11px] text-white/30 mt-0.5 leading-relaxed">
                      Your privacy matters. We store only a small browser preference<br className="hidden sm:inline" />
                      so we remember your choice on future visits.
                    </p>
                  </div>
                </div>
                <button
                  onClick={decline}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white/20 hover:text-white/40 hover:bg-white/[0.04] transition-all duration-200 mt-0.5"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* ─── Status Chips ───────────────────────── */}
              <div className="flex flex-wrap gap-2 mb-5">
                {statusChips.map((chip, i) => (
                  <motion.div
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white/50"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: FAST, delay: 0.15 + i * 0.06, ease: ease.out }}
                    whileHover={{ borderColor: "rgba(59,130,246,0.2)", backgroundColor: "rgba(59,130,246,0.04)" }}
                  >
                    <Check className="h-3 w-3 text-blue-400/70" />
                    {chip.label}
                  </motion.div>
                ))}
              </div>

              {/* ─── How It Works Flow ──────────────────── */}
              <motion.div
                className="rounded-2xl p-4 mb-5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/20 mb-3">
                  How it works
                </p>
                <div className="flex items-center justify-between gap-1">
                  {flowSteps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex items-center gap-1 flex-1">
                        <motion.div
                          className="flex flex-col items-center gap-1.5 flex-1"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: FAST, delay: 0.35 + i * 0.08, ease: ease.out }}
                        >
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-xl"
                            style={{
                              background: "rgba(255,255,255,0.03)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <Icon className="h-3.5 w-3.5 text-white/30" />
                          </div>
                          <span className="text-[10px] text-white/25 text-center leading-tight whitespace-nowrap">
                            {step.label}
                          </span>
                        </motion.div>
                        {i < flowSteps.length - 1 && (
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: FAST, delay: 0.4 + i * 0.08, ease: ease.out }}
                            className="origin-left"
                          >
                            <ArrowRight className="h-3 w-3 text-white/10 shrink-0 -mx-0.5" />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ─── Buttons ────────────────────────────── */}
              <motion.div
                className="flex flex-col sm:flex-row gap-2.5 mb-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: NORMAL, delay: 0.45, ease: ease.out }}
              >
                {/* Primary: Accept */}
                <motion.button
                  ref={acceptRef}
                  onClick={accept}
                  className="relative flex-1 group rounded-2xl px-5 py-3 text-sm font-semibold text-white min-h-[48px] overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                    boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 4px 16px -4px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                  whileHover={{
                    scale: 1.015,
                    y: -1,
                    boxShadow: "0 0 0 1px rgba(59,130,246,0.4), 0 8px 30px -6px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 40px -10px rgba(59,130,246,0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring.gentle}
                >
                  <span className="relative z-[1]">Accept Preferences</span>
                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/[0.06] to-transparent" />
                </motion.button>

                {/* Secondary: Decline */}
                <motion.button
                  onClick={decline}
                  className="flex-1 sm:flex-initial rounded-2xl px-5 py-3 text-sm font-medium text-white/40 hover:text-white/60 min-h-[48px] transition-colors duration-200"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  whileHover={{
                    scale: 1.01,
                    borderColor: "rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring.gentle}
                >
                  Continue Without Saving
                </motion.button>
              </motion.div>

              {/* ─── Expandable Learn More ──────────────── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: NORMAL, delay: 0.55, ease: ease.out }}
              >
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-[11px] text-white/25 hover:text-white/40 transition-colors duration-200 group"
                  aria-expanded={expanded}
                >
                  <Fingerprint className="h-3 w-3" />
                  <span>Learn More</span>
                  <motion.span
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: FAST, ease: ease.out }}
                    className="inline-flex"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: NORMAL, ease: ease.out }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-2.5">
                        {learnMoreItems.map((item, i) => (
                          <motion.div
                            key={item.title}
                            className="rounded-xl p-3"
                            style={{
                              background: "rgba(255,255,255,0.02)",
                              border: "1px solid rgba(255,255,255,0.04)",
                            }}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: FAST, delay: i * 0.04, ease: ease.out }}
                          >
                            <p className="text-[11px] font-medium text-white/40 mb-1">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-white/25 leading-relaxed">
                              {item.body}
                            </p>
                          </motion.div>
                        ))}

                        <div className="flex items-center gap-3 pt-1">
                          <a
                            href="/trust/cookies"
                            className="text-[11px] text-blue-400/40 hover:text-blue-400/60 transition-colors duration-200 underline underline-offset-2"
                          >
                            Cookies &amp; Local Storage
                          </a>
                          <span className="text-white/10">·</span>
                          <a
                            href="/trust/privacy"
                            className="text-[11px] text-blue-400/40 hover:text-blue-400/60 transition-colors duration-200 underline underline-offset-2"
                          >
                            Privacy Policy
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
