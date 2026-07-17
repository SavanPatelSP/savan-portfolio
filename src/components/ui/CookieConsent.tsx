"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timeout = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => acceptRef.current?.focus());
    }
  }, [visible]);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4 md:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-label="Privacy preferences"
        >
          <div
            className="mx-auto max-w-3xl rounded-2xl border p-4 sm:p-5 backdrop-blur-xl"
            style={{
              borderColor: "rgba(59,130,246,0.12)",
              backgroundColor: "rgba(10,10,10,0.9)",
              boxShadow: "0 0 40px rgba(59,130,246,0.04)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-xs font-medium text-white/60">Website Preferences</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  This site does not use advertising cookies or tracking. Your preference (accepted or declined) is stored locally in your browser using localStorage so the notice does not reappear. No personal information is stored. See the{" "}
                  <a href="/trust/cookies" className="underline underline-offset-2 hover:text-white/60 transition-colors">
                    Cookies &amp; Local Storage
                  </a>{" "}
                  page for full details.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <button
                  ref={acceptRef}
                  onClick={accept}
                  className="rounded-lg bg-white/[0.06] border border-white/[0.10] px-4 py-2.5 text-xs font-medium text-white/70 hover:bg-white/[0.10] transition-all duration-200 whitespace-nowrap min-h-[44px]"
                >
                  Accept
                </button>
                <button
                  onClick={decline}
                  className="rounded-lg border border-white/[0.06] px-4 py-2.5 text-xs font-medium text-white/30 hover:text-white/50 hover:border-white/10 transition-all duration-200 whitespace-nowrap min-h-[44px]"
                >
                  Decline
                </button>
                <button
                  onClick={decline}
                  className="flex items-center justify-center h-11 w-11 rounded-lg text-white/20 hover:text-white/40 hover:bg-white/[0.03] transition-all duration-200"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
