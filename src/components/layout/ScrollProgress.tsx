"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[1.5px] origin-left bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60"
      style={{ scaleX: smooth }}
    />
  );
}
