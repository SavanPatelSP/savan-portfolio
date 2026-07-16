"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, NORMAL } from "@/lib/motion";

interface ProductStatusProps {
  status?: string;
  className?: string;
}

const statusMessages: Record<string, { primary: string; secondary: string }> = {
  building: { primary: "Active Development", secondary: "In Progress" },
  official: { primary: "Production Ready", secondary: "Official Project" },
  "future-initiative": { primary: "Future Initiative", secondary: "Research & Planning" },
  future: { primary: "Future Initiative", secondary: "Research & Planning" },
  research: { primary: "Research", secondary: "Exploration Phase" },
  researching: { primary: "Research & Development", secondary: "In Progress" },
};

export function ProductStatus({ status = "building", className }: ProductStatusProps) {
  const messages = statusMessages[status] || statusMessages.building;
  return (
    <motion.div
      className={cn(
        "group/status relative inline-flex items-center gap-2.5",
        className
      )}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: NORMAL, ease: ease.out }}
    >
      {/* Status dot with glow + slow pulse */}
      <div className="relative flex items-center justify-center">
        {/* Expanding ring — slow pulse */}
        <span
          className="absolute h-4 w-4 rounded-full bg-emerald-400/15 motion-safe:animate-glow-ping"
          style={{ animationDuration: "3.5s" }}
        />
        {/* Outer glow — breathing */}
        <motion.span
          className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400/30 blur-[2px]"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Core dot */}
        <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
      </div>

      {/* Primary badge with shimmer */}
      <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-emerald-400/80 tracking-wide transition-all duration-300 group-hover/status:border-emerald-500/30 group-hover/status:bg-emerald-500/[0.1] group-hover/status:text-emerald-400">
        {/* Shimmer overlay */}
        <span className="absolute inset-0 pointer-events-none overflow-hidden">
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-shimmer" style={{ animationDuration: "4s" }} />
        </span>
        <svg className="relative h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="relative">{messages.primary}</span>
      </span>

      {/* Secondary label */}
      <span className="hidden sm:inline-flex text-[10px] font-mono uppercase tracking-[0.15em] text-white/15 transition-colors duration-300 group-hover/status:text-white/25">
        {messages.secondary}
      </span>
    </motion.div>
  );
}
