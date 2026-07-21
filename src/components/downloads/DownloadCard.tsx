"use client";

import { cn } from "@/lib/utils";

interface DownloadCardProps {
  label: string;
  value: string;
  className?: string;
  accent?: boolean;
}

export function DownloadCard({ label, value, className, accent = false }: DownloadCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 sm:p-5 transition-all duration-300",
        accent
          ? "border-blue-500/15 bg-blue-500/[0.04] hover:border-blue-500/25 hover:bg-blue-500/[0.06]"
          : "border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] hover:bg-white/[0.03]",
        className
      )}
    >
      <span className={cn(
        "block text-[10px] font-mono uppercase tracking-[0.2em] mb-2",
        accent ? "text-blue-400/30" : "text-white/15"
      )}>
        {label}
      </span>
      <span className={cn(
        "block text-sm font-medium font-mono",
        accent ? "text-blue-400/60" : "text-white/60"
      )}>
        {value}
      </span>
    </div>
  );
}
