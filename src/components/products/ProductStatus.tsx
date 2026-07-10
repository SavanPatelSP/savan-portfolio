"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductStatusProps {
  className?: string;
}

export function ProductStatus({ className }: ProductStatusProps) {
  return (
    <motion.div
      className={cn(
        "group/status relative inline-flex items-center gap-2.5",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Status dot with glow */}
      <div className="relative flex items-center justify-center">
        {/* Expanding ring */}
        <span className="absolute h-3.5 w-3.5 rounded-full bg-emerald-400/20 motion-safe:animate-ping" style={{ animationDuration: "3s" }} />
        {/* Outer glow */}
        <span className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400/30 blur-[2px]" />
        {/* Core dot */}
        <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
      </div>

      {/* Primary badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-emerald-400/80 tracking-wide transition-all duration-300 group-hover/status:border-emerald-500/30 group-hover/status:bg-emerald-500/[0.1] group-hover/status:text-emerald-400">
        <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Production Ready
      </span>

      {/* Secondary label */}
      <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-[0.15em] text-white/15 transition-colors duration-300 group-hover/status:text-white/25">
        Official Product
      </span>
    </motion.div>
  );
}
