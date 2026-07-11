"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { spring } from "@/lib/motion";

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  const showBtn = useTransform(scrollY, (y) => Math.min(Math.max((y - 300) / 150, 0), 1));
  const btnScale = useTransform(showBtn, [0, 1], [0.8, 1]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-white/15"
        style={{ scaleX: smoothProgress }}
      />
      <motion.button
        onClick={handleScrollToTop}
        className="fixed bottom-6 right-6 z-[100] flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/[0.08] bg-black/70 backdrop-blur-md shadow-lg shadow-black/20"
        style={{ opacity: showBtn, scale: btnScale }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={spring.gentle}
        aria-label="Scroll to top"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <motion.circle
            cx="50" cy="50" r="44"
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: smoothProgress }}
          />
        </svg>
        <ArrowUp className="h-4 w-4 text-white/40 relative z-10" />
      </motion.button>
    </>
  );
}
