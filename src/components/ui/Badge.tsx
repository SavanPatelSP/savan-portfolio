"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "beta" | "accent";
  className?: string;
}

const variants = {
  default: "bg-white/[0.04] text-white/50 border-white/[0.06]",
  success: "bg-emerald-500/8 text-emerald-400 border-emerald-500/15",
  warning: "bg-amber-500/8 text-amber-400 border-amber-500/15",
  beta: "bg-blue-500/8 text-blue-400 border-blue-500/15",
  accent: "bg-purple-500/8 text-purple-400 border-purple-500/15",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {variant === "beta" && (
        <span className="h-1 w-1 rounded-full bg-blue-400 animate-pulse-soft" />
      )}
      {children}
    </span>
  );
}
