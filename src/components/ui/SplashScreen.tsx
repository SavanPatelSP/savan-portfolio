"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", handler);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.span
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] text-white/90"
            initial={reducedMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            SAVAN PATEL
          </motion.span>
          <motion.span
            className="mt-3 text-xs sm:text-sm font-light tracking-[0.2em] text-white/60"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            SP NET INC
          </motion.span>

          {!reducedMotion && (
            <motion.div
              className="mt-8 h-px w-28 sm:w-36 bg-white/[0.04] overflow-hidden rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.div
                className="h-full w-full bg-white/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
