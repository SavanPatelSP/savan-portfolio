"use client";

import {
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
  Globe,
};

const supportConfig = {
  full: {
    color: "text-emerald-400/60",
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/15",
  },
  guided: {
    color: "text-amber-400/60",
    bg: "bg-amber-500/8",
    border: "border-amber-500/15",
  },
  limited: {
    color: "text-white/25",
    bg: "bg-white/[0.03]",
    border: "border-white/[0.06]",
  },
} as const;

export function PlatformBadge({
  platformId: _platformId,
  name,
  icon,
  support = "full",
  className,
  showLabel = false,
}: {
  platformId: string;
  name: string;
  icon: string;
  support?: "full" | "guided" | "limited";
  className?: string;
  showLabel?: boolean;
}) {
  const Icon = iconMap[icon] ?? Globe;
  const config = supportConfig[support];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 font-mono text-[10px]",
        config.color,
        config.bg,
        config.border,
        className
      )}
      aria-label={`${name}: ${support} support`}
    >
      <Icon className="h-3 w-3 shrink-0 opacity-60" />
      {showLabel && name}
    </span>
  );
}
