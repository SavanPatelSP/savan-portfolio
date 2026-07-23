"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Shield, Cookie, Globe, Lock, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAST, NORMAL, ease, spring } from "@/lib/motion";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "cookie-consent";

const statusChips = [
  { icon: Cookie, label: "No Advertising Cookies" },
  { icon: Globe, label: "No Cross-site Tracking" },
  { icon: Lock, label: "Browser-only Storage" },
] as const;

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */

function useFocusTrap(active: boolean, ref: React.RefObject<HTMLDivElement | null>) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (active) {
      previousFocus.current = document.activeElement as HTMLElement;
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const getFocusable = () =>
      container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(() => {
      const focusable = getFocusable();
      focusable[0]?.focus();
    });

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [active, ref]);
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  /* ─── Mount: show if no consent yet ────────────────────────── */

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  /* ─── Responsive ──────────────────────────────────────────── */

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ─── Focus trap + Escape ─────────────────────────────────── */

  useFocusTrap(visible, panelRef);

  /* ─── Body scroll lock on mobile ──────────────────────────── */

  useEffect(() => {
    if (!visible || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [visible, isMobile]);

  /* ─── Actions ────────────────────────────────────────────── */

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }, []);

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [visible, handleDismiss]);

  /* ─── Panel motion variants ───────────────────────────────── */

  const panelVariants = isMobile
    ? { hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } }
    : { hidden: { y: 20, opacity: 0, scale: 0.96 }, visible: { y: 0, opacity: 1, scale: 1 }, exit: { y: 8, opacity: 0, scale: 0.97 } };

  /* ─── Render ──────────────────────────────────────────────── */

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="pointer-events-none fixed inset-0 z-[99]"
            style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            aria-hidden="true"
          />

          {/* Card */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label="Privacy preferences"
            aria-modal="true"
            className={cn(
              "fixed z-[100] overflow-hidden",
              "bottom-0 left-0 right-0 rounded-t-3xl",
              "sm:bottom-6 sm:right-6 sm:left-auto sm:rounded-3xl sm:w-[380px]"
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: NORMAL, ease: ease.out }}
          >
            {/* Glass background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(160deg, rgba(14,14,17,0.97) 0%, rgba(6,6,9,0.99) 100%)",
                backdropFilter: "blur(40px) saturate(1.5)",
                WebkitBackdropFilter: "blur(40px) saturate(1.5)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 0 0 1px rgba(59,130,246,0.04), 0 25px 60px -12px rgba(0,0,0,0.7), 0 0 100px -30px rgba(59,130,246,0.06)",
              }}
            />

            {/* Content */}
            <div className="relative z-[1] p-5 sm:p-6">

              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)",
                    border: "1px solid rgba(59,130,246,0.12)",
                  }}
                >
                  <Shield className="h-4 w-4 text-blue-400/80" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-white/90 tracking-tight">Privacy Preferences</h2>
                  <p className="text-[11px] text-white/35 mt-0.5 leading-relaxed">
                    We store only a small browser preference to remember your choice.
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/20 hover:text-white/40 hover:bg-white/[0.04] transition-all duration-200"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Status chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {statusChips.map((chip, i) => {
                  const Icon = chip.icon;
                  return (
                    <motion.div
                      key={chip.label}
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5"
                      style={{
                        background: "rgba(16,185,129,0.06)",
                        border: "1px solid rgba(16,185,129,0.10)",
                      }}
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: FAST, delay: 0.05 + i * 0.05, ease: ease.out }}
                    >
                      <Icon className="h-3 w-3 text-emerald-400/60" />
                      <span className="text-[10px] font-medium text-emerald-400/50">{chip.label}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <motion.button
                  ref={acceptRef}
                  onClick={handleAccept}
                  className="relative flex-1 group rounded-xl px-4 py-2.5 text-sm font-semibold text-white min-h-[44px] overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                    boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 4px 16px -4px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                  whileHover={{ scale: 1.015, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring.gentle}
                >
                  <span className="relative z-[1]">Accept</span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/[0.06] to-transparent" />
                </motion.button>

                <motion.a
                  href="/trust/cookies"
                  onClick={() => localStorage.setItem(STORAGE_KEY, "declined")}
                  className="flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-white/40 hover:text-white/60 min-h-[44px] transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring.gentle}
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.a>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                <a
                  href="/trust/privacy"
                  className="text-[10px] text-blue-400/30 hover:text-blue-400/50 transition-colors underline underline-offset-2"
                >
                  Privacy Policy
                </a>
                <span className="text-[9px] text-white/12 font-mono">localStorage only</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
