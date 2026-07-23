"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Mail, Shield, Clock, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendAnother: () => void;
}

export function SuccessModal({ isOpen, onClose, onSendAnother }: SuccessModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const [submittedAt, setSubmittedAt] = useState("");

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
    let rafId: number | undefined;
    if (isOpen) {
      rafId = requestAnimationFrame(() => {
        setSubmittedAt(new Date().toLocaleString());
      });
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
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
      document.removeEventListener("keydown", escHandler);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isOpen, escHandler, trapFocus]);

  const handleSendAnother = () => {
    onSendAnother();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
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
            aria-label="Message sent successfully"
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent bg-black/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.06] text-white/25 hover:text-white/60 hover:border-white/12 transition-all duration-200 z-10"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Check className="h-5 w-5 text-emerald-400" />
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white/90">
              Message Sent Successfully
            </h2>

            <h3 className="mt-2 text-sm font-medium tracking-wide text-white/50">
              Thank you for contacting SP NET INC.
            </h3>

            <div className="mt-5 space-y-3 text-sm text-white/35 leading-relaxed">
              <p>
                Your message has been securely delivered to Savan Patel and will
                be reviewed as soon as possible.
              </p>
              <p>
                If your enquiry requires a response, it will be sent to the email
                address you provided.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06]">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                </span>
                <div>
                  <span className="text-[11px] font-medium text-white/20 uppercase tracking-wider">
                    Delivery Status
                  </span>
                  <p className="text-sm text-emerald-400/80 font-medium">
                    Successfully Delivered
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/[0.06]">
                  <Mail className="h-3.5 w-3.5 text-blue-400" />
                </span>
                <div>
                  <span className="text-[11px] font-medium text-white/20 uppercase tracking-wider">
                    Recipient
                  </span>
                  <p className="text-sm text-white/60 font-mono">
                    savan@sp-net.in
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/[0.06]">
                  <Shield className="h-3.5 w-3.5 text-purple-400" />
                </span>
                <div>
                  <span className="text-[11px] font-medium text-white/20 uppercase tracking-wider">
                    Delivery
                  </span>
                  <p className="text-sm text-white/60">Secured by Resend</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/[0.06]">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                </span>
                <div>
                  <span className="text-[11px] font-medium text-white/20 uppercase tracking-wider">
                    Submitted
                  </span>
                  <p className="text-sm text-white/60">{submittedAt}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="primary" onClick={onClose}>
                Continue Browsing
                <ArrowRight className="h-4 w-4 opacity-50" />
              </Button>
              <Button variant="secondary" onClick={handleSendAnother}>
                <RotateCcw className="h-4 w-4 opacity-50" />
                Send Another Message
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
