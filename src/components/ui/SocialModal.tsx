"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Send, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SocialModal({ isOpen, onClose }: SocialModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const escHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      "button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      prevFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", escHandler);
      document.addEventListener("keydown", trapFocus);
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escHandler);
      document.removeEventListener("keydown", trapFocus);
      prevFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escHandler);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen, escHandler, trapFocus]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Social profile coming soon"
            className="relative w-full max-w-md rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent bg-black/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-white/25 hover:text-white/60 hover:border-white/12 transition-all duration-200"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <Sparkles className="h-5 w-5 text-white/40" />
            </div>

            <h2 className="text-2xl font-semibold tracking-tight text-white/90">
              Coming Soon
            </h2>

            <div className="mt-4 space-y-3 text-sm text-white/35 leading-relaxed">
              <p>
                My official X and LinkedIn profiles are currently being prepared.
              </p>
              <p>
                I&apos;m taking the time to build a professional presence that
                reflects my work, projects, and long-term vision. These profiles
                will become publicly available soon.
              </p>
              <p>
                In the meantime, you&apos;re welcome to connect with me through
                my Personal Communication Assistant, which is the fastest and
                recommended way to reach me.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                variant="primary"
                href="https://t.me/SAVANPATELSP_BOT"
                external
              >
                <Send className="h-4 w-4" />
                Open Personal Communication Assistant
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
