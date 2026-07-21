"use client";

import { cn } from "@/lib/utils";

const channelConfig = {
  stable: {
    color: "text-emerald-400/70",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400/60",
  },
  beta: {
    color: "text-amber-400/70",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    dot: "bg-amber-400/60",
  },
  alpha: {
    color: "text-blue-400/70",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    dot: "bg-blue-400/60",
  },
  unreleased: {
    color: "text-white/30",
    bg: "bg-white/[0.04]",
    border: "border-white/[0.08]",
    dot: "bg-white/20",
  },
} as const;

export function VersionBadge({
  version,
  channel = "stable",
  className,
  showDot = true,
  size = "sm",
}: {
  version: string;
  channel?: "stable" | "beta" | "alpha" | "unreleased";
  className?: string;
  showDot?: boolean;
  size?: "xs" | "sm" | "md";
}) {
  const config = channelConfig[channel];
  const sizeClasses = {
    xs: "px-2 py-0.5 text-[9px]",
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1.5 text-[11px]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono uppercase tracking-wider",
        config.color,
        config.bg,
        config.border,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={`Version ${version}, ${channel} release channel`}
    >
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.dot, channel === "stable" && "animate-pulse")} />
      )}
      v{version}
    </span>
  );
}
