"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease, SLOW } from "@/lib/motion";

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
    }, reducedMotion ? 300 : 2800);

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
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
          transition={{ duration: reducedMotion ? 0 : 0.7, ease: ease.out }}
        >
          {/* Ambient glow behind name */}
          {!reducedMotion && (
            <motion.div
              className="absolute h-64 w-64 rounded-full opacity-0"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.8, 0.5], scale: [0.8, 1.1, 1] }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
            />
          )}

          <motion.span
            className="relative text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[0.12em] text-white/90"
            initial={reducedMotion ? {} : { opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reducedMotion ? 0 : SLOW, delay: reducedMotion ? 0 : 0.2, ease: ease.out }}
          >
            SAVAN PATEL
          </motion.span>
          <motion.span
            className="relative mt-3 text-xs sm:text-sm font-light tracking-[0.2em] text-white/60"
            initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.5, ease: ease.out }}
          >
            SP NET INC
          </motion.span>

          {!reducedMotion && (
            <motion.div
              className="relative mt-8 h-px w-28 sm:w-36 bg-white/[0.04] overflow-hidden rounded-full"
              initial={{ opacity: 0, scaleX: 0.5 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <motion.div
                className="h-full w-full bg-white/50"
                initial={{ scaleX: 0, x: "-100%" }}
                animate={{ scaleX: 1, x: "0%" }}
                transition={{ duration: 1.8, delay: 0.5, ease: ease.out }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
