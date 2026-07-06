"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-label="Cookie notice"
        >
          <div
            className="mx-auto max-w-3xl rounded-2xl border p-4 sm:p-5 backdrop-blur-xl"
            style={{
              borderColor: "rgba(59,130,246,0.12)",
              backgroundColor: "rgba(10,10,10,0.9)",
              boxShadow: "0 0 40px rgba(59,130,246,0.04)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-blue-200">🍪 Cookie Notice</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed">
                  This site uses localStorage to remember your consent preferences. No cookies, tracking, or analytics are used. By continuing, you accept this use of local storage.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  ref={acceptRef}
                  onClick={accept}
                  className="rounded-lg bg-blue-500/20 border border-blue-500/30 px-3 sm:px-4 py-2 text-xs font-medium text-blue-200 hover:bg-blue-500/30 transition-all duration-200 whitespace-nowrap"
                >
                  Accept
                </button>
                <button
                  onClick={decline}
                  className="rounded-lg border border-white/[0.06] px-3 sm:px-4 py-2 text-xs font-medium text-white/30 hover:text-white/50 hover:border-white/10 transition-all duration-200 whitespace-nowrap"
                >
                  Decline
                </button>
                <button
                  onClick={decline}
                  className="flex items-center justify-center h-8 w-8 rounded-lg text-white/20 hover:text-white/40 hover:bg-white/[0.03] transition-all duration-200"
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
