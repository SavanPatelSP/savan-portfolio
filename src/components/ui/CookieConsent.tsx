"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
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
  Eye,
  RefreshCw,
  Copy,
  Trash2,
  Fingerprint,
  Activity,
  Clock,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FAST, NORMAL, SLOW, ease, spring } from "@/lib/motion";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const STORAGE_KEY = "cookie-consent";

const statusItems = [
  { icon: Cookie, label: "No Advertising Cookies", color: "text-emerald-400/70" },
  { icon: Globe, label: "No Cross-site Tracking", color: "text-emerald-400/70" },
  { icon: Lock, label: "Browser-only Storage", color: "text-emerald-400/70" },
  { icon: Eye, label: "User Controlled", color: "text-emerald-400/70" },
] as const;

const flowSteps = [
  { icon: Globe, label: "Browser" },
  { icon: HardDrive, label: "localStorage" },
  { icon: Shield, label: "Saved" },
  { icon: Check, label: "Remembered" },
] as const;

const learnMoreItems = [
  {
    title: "Cookies vs localStorage",
    body: "Cookies are sent with every HTTP request to the server, enabling cross-site tracking. localStorage stays entirely on your device — it never leaves your browser. SP NET INC uses localStorage, not cookies.",
  },
  {
    title: "Why preferences are stored",
    body: "The Website Preferences notice uses localStorage so you do not need to see it on every page load. Without it, the notice would reappear every visit. The stored value is a simple string: 'accepted' or 'declined'.",
  },
  {
    title: "Third-party services",
    body: "Resend processes contact form emails. Vercel provides hosting. Neither sets tracking cookies through this site. No analytics, no tracking pixels, no session recording.",
  },
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

function useStorageReader() {
  const [data, setData] = useState<{ key: string; value: string; size: number; exists: boolean }>({
    key: STORAGE_KEY,
    value: "",
    size: 0,
    exists: false,
  });

  const refresh = useCallback(() => {
    if (typeof window === "undefined") return;
    const value = localStorage.getItem(STORAGE_KEY) ?? "";
    const exists = value.length > 0;
    const encoder = new TextEncoder();
    const size = encoder.encode(STORAGE_KEY + value).length;
    setData({ key: STORAGE_KEY, value: exists ? value : "(not set)", size, exists });
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { ...data, refresh };
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING SHIELD
   ═══════════════════════════════════════════════════════════════ */

function FloatingShield({
  onClick,
  visible,
  reduced,
}: {
  onClick: () => void;
  visible: boolean;
  reduced: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="fixed bottom-6 right-6 z-[90] flex items-center justify-center rounded-full cursor-pointer select-none"
          style={{
            width: 52,
            height: 52,
            background: "linear-gradient(135deg, rgba(14,14,17,0.9) 0%, rgba(8,8,11,0.95) 100%)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 0 1px rgba(59,130,246,0.08), 0 8px 32px -8px rgba(0,0,0,0.5), 0 0 60px -20px rgba(59,130,246,0.08)",
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={spring.smooth}
          aria-label="Open privacy preferences"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Breathing glow */}
          {!reduced && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59,130,246,0)",
                  "0 0 24px 4px rgba(59,130,246,0.1)",
                  "0 0 0 0 rgba(59,130,246,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Shield icon */}
          <motion.div
            animate={hovered ? { scale: 1.1 } : { scale: 1 }}
            transition={spring.gentle}
          >
            <Shield className="h-5 w-5 text-blue-400/80" />
          </motion.div>

          {/* Expand label on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.span
                className="absolute right-full mr-3 whitespace-nowrap text-xs font-medium text-white/60 px-3 py-1.5 rounded-lg pointer-events-none"
                style={{
                  background: "rgba(14,14,17,0.9)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: FAST, ease: ease.out }}
              >
                Privacy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STATUS CARDS
   ═══════════════════════════════════════════════════════════════ */

function StatusCards({ reduced }: { reduced: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {statusItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: FAST, delay: 0.1 + i * 0.06, ease: ease.out }}
            whileHover={{ borderColor: "rgba(59,130,246,0.15)", backgroundColor: "rgba(59,130,246,0.03)" }}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
              <Check className="h-3 w-3 text-emerald-400/70" />
            </div>
            <span className="text-[11px] font-medium text-white/45 leading-tight">{item.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOW DIAGRAM
   ═══════════════════════════════════════════════════════════════ */

function FlowDiagram({ reduced }: { reduced: boolean }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="flex items-center gap-[2px]">
        {flowSteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center flex-1">
              <motion.div
                className="flex flex-col items-center gap-1.5 flex-1 min-w-0"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: FAST, delay: 0.2 + i * 0.07, ease: ease.out }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <Icon className="h-3.5 w-3.5 text-white/30" />
                </div>
                <span className="text-[9px] text-white/25 text-center leading-tight whitespace-nowrap">{step.label}</span>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: FAST, delay: 0.25 + i * 0.07, ease: ease.out }}
                  className="origin-left shrink-0 -mx-0.5"
                >
                  <ArrowRight className="h-2.5 w-2.5 text-white/10" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STORAGE INSPECTOR
   ═══════════════════════════════════════════════════════════════ */

function StorageInspector({
  storageKey,
  storageValue,
  storageSize,
  storageExists,
  onRefresh,
  onReset,
  reduced,
}: {
  storageKey: string;
  storageValue: string;
  storageSize: number;
  storageExists: boolean;
  onRefresh: () => void;
  onReset: () => void;
  reduced: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`${storageKey}=${storageValue}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [storageKey, storageValue]);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="h-3 w-3 text-white/20" />
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/20">Storage Inspector</span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            onClick={onRefresh}
            className="flex h-6 w-6 items-center justify-center rounded-md text-white/20 hover:text-white/40 hover:bg-white/[0.04] transition-colors"
            whileTap={{ scale: 0.9, rotate: 180 }}
            transition={spring.snappy}
            aria-label="Refresh"
          >
            <RefreshCw className="h-3 w-3" />
          </motion.button>
          <motion.button
            onClick={onReset}
            className="flex h-6 w-6 items-center justify-center rounded-md text-white/20 hover:text-red-400/50 hover:bg-red-500/[0.04] transition-colors"
            whileTap={{ scale: 0.9 }}
            transition={spring.snappy}
            aria-label="Clear stored preference"
          >
            <Trash2 className="h-3 w-3" />
          </motion.button>
        </div>
      </div>

      <div className="px-4 pb-3 space-y-1.5">
        {[
          { label: "Location", value: "Browser localStorage", mono: false },
          { label: "Key", value: storageKey, mono: true },
          { label: "Value", value: storageValue, mono: true },
          { label: "Size", value: `${storageSize} bytes`, mono: true },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between py-1">
            <span className="text-[10px] text-white/20">{row.label}</span>
            <span className={cn("text-[10px] text-white/40", row.mono && "font-mono")}>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3 flex items-center gap-2">
        <motion.button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-medium text-white/30 hover:text-white/50 transition-colors"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}
          whileTap={{ scale: 0.97 }}
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400/60" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEARN MORE ACCORDION
   ═══════════════════════════════════════════════════════════════ */

function LearnMoreAccordion({ reduced }: { reduced: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-1.5">
      {learnMoreItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={item.title}
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.04)" }}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: FAST, delay: 0.05 * i, ease: ease.out }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[11px] font-medium text-white/40">{item.title}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: FAST, ease: ease.out }} className="shrink-0">
                <ChevronDown className="h-3 w-3 text-white/20" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: NORMAL, ease: ease.out }}
                  className="overflow-hidden"
                >
                  <p className="px-3.5 pb-3 text-[11px] text-white/25 leading-relaxed">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function CookieConsent() {
  const [phase, setPhase] = useState<"idle" | "panel" | "shield">("idle");
  const [isMobile, setIsMobile] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  const storage = useStorageReader();

  /* ─── Mount: decide initial state ─────────────────────────── */

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      const t = setTimeout(() => setPhase("panel"), 1800);
      return () => clearTimeout(t);
    }
    setPhase("shield");
  }, []);

  /* ─── Responsive ──────────────────────────────────────────── */

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ─── Focus trap + Escape (only when panel is open) ───────── */

  useFocusTrap(phase === "panel", panelRef);

  useEffect(() => {
    if (phase !== "panel") return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ─── Body scroll lock on mobile ──────────────────────────── */

  useEffect(() => {
    if (phase !== "panel" || !isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [phase, isMobile]);

  /* ─── Actions (same localStorage logic) ───────────────────── */

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    storage.refresh();
    setPhase("shield");
  }, [storage]);

  const handleDismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "declined");
    storage.refresh();
    setPhase("shield");
  }, [storage]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    storage.refresh();
    setPhase("panel");
  }, [storage]);

  const handleReopen = useCallback(() => {
    setPhase("panel");
  }, []);

  const panelVisible = phase === "panel";
  const shieldVisible = phase === "shield";

  /* ─── Panel motion variants ───────────────────────────────── */

  const panelVariants = isMobile
    ? { hidden: { y: "100%", opacity: 0 }, visible: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } }
    : { hidden: { y: 40, opacity: 0, scale: 0.96, filter: "blur(12px)" }, visible: { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }, exit: { y: 16, opacity: 0, scale: 0.97, filter: "blur(8px)" } };

  /* ─── Render ──────────────────────────────────────────────── */

  return (
    <>
      <LayoutGroup>
        {/* Floating Shield */}
        <FloatingShield
          onClick={handleReopen}
          visible={shieldVisible}
          reduced={!!prefersReduced}
        />

        {/* Panel */}
        <AnimatePresence>
          {panelVisible && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-[99]"
                style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)" }}
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
                  "bottom-0 left-0 right-0 rounded-t-[28px]",
                  "sm:bottom-6 sm:right-6 sm:left-auto sm:rounded-[28px] sm:w-[440px]"
                )}
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: SLOW, ease: ease.out }}
              >
                {/* Glass */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(160deg, rgba(14,14,17,0.96) 0%, rgba(6,6,9,0.99) 100%)",
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
                <div className="relative z-[1] p-5 sm:p-6 max-h-[85vh] sm:max-h-[80vh] overflow-y-auto scrollbar-none">

                  {/* ─── Header ───────────────────────── */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 100%)",
                          border: "1px solid rgba(59,130,246,0.12)",
                        }}
                        animate={prefersReduced ? {} : {
                          boxShadow: [
                            "0 0 0 0 rgba(59,130,246,0)",
                            "0 0 20px 4px rgba(59,130,246,0.06)",
                            "0 0 0 0 rgba(59,130,246,0)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Shield className="h-5 w-5 text-blue-400/80" />
                      </motion.div>
                      <div>
                        <h2 className="text-sm font-semibold text-white/90 tracking-tight">Privacy Preferences</h2>
                        <p className="text-[11px] text-white/30 mt-0.5 leading-relaxed">
                          Your privacy matters. We store only a small browser preference so we remember your choice.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleDismiss}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white/20 hover:text-white/40 hover:bg-white/[0.04] transition-all duration-200 mt-0.5"
                      aria-label="Close"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* ─── Status Cards ─────────────────── */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Activity className="h-3 w-3 text-white/15" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/15">Privacy Status</span>
                    </div>
                    <StatusCards reduced={!!prefersReduced} />
                  </div>

                  {/* ─── Flow Diagram ─────────────────── */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Info className="h-3 w-3 text-white/15" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/15">How It Works</span>
                    </div>
                    <FlowDiagram reduced={!!prefersReduced} />
                  </div>

                  {/* ─── Storage Inspector ─────────────── */}
                  <div className="mb-4">
                    <StorageInspector
                      storageKey={storage.key}
                      storageValue={storage.value}
                      storageSize={storage.size}
                      storageExists={storage.exists}
                      onRefresh={storage.refresh}
                      onReset={handleReset}
                      reduced={!!prefersReduced}
                    />
                  </div>

                  {/* ─── Learn More ────────────────────── */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2.5">
                      <Fingerprint className="h-3 w-3 text-white/15" />
                      <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/15">Learn More</span>
                    </div>
                    <LearnMoreAccordion reduced={!!prefersReduced} />
                  </div>

                  {/* ─── Buttons ───────────────────────── */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-2.5 mb-4"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
                  >
                    <motion.button
                      ref={acceptRef}
                      onClick={handleAccept}
                      className="relative flex-1 group rounded-2xl px-5 py-3 text-sm font-semibold text-white min-h-[48px] overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                        boxShadow: "0 0 0 1px rgba(59,130,246,0.3), 0 4px 16px -4px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}
                      whileHover={{ scale: 1.015, y: -1, boxShadow: "0 0 0 1px rgba(59,130,246,0.4), 0 8px 30px -6px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 40px -10px rgba(59,130,246,0.15)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring.gentle}
                    >
                      <span className="relative z-[1]">Accept Preferences</span>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/[0.06] to-transparent" />
                    </motion.button>

                    <motion.button
                      onClick={handleDismiss}
                      className="flex-1 sm:flex-initial rounded-2xl px-5 py-3 text-sm font-medium text-white/40 hover:text-white/60 min-h-[48px] transition-colors duration-200"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      transition={spring.gentle}
                    >
                      Continue Without Saving
                    </motion.button>
                  </motion.div>

                  {/* ─── Footer ────────────────────────── */}
                  <motion.div
                    className="flex items-center justify-between pt-3 border-t border-white/[0.04]"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: NORMAL, delay: 0.4, ease: ease.out }}
                  >
                    <div className="flex items-center gap-3">
                      <a href="/trust/cookies" className="text-[10px] text-blue-400/30 hover:text-blue-400/50 transition-colors underline underline-offset-2">
                        Cookies &amp; Storage
                      </a>
                      <span className="text-white/8">·</span>
                      <a href="/trust/privacy" className="text-[10px] text-blue-400/30 hover:text-blue-400/50 transition-colors underline underline-offset-2">
                        Privacy Policy
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-2.5 w-2.5 text-white/10" />
                      <span className="text-[9px] text-white/12 font-mono">v1.0</span>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </>
  );
}
