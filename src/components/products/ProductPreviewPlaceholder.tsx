"use client";

import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductPreviewPlaceholderProps {
  color: string;
  icon?: React.ElementType;
  name: string;
  className?: string;
}

export function ProductPreviewPlaceholder({
  color,
  icon: Icon,
  name,
  className,
}: ProductPreviewPlaceholderProps) {
  return (
    <div className={cn("relative w-full max-w-lg mx-auto", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm",
          "shadow-2xl min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center p-8 text-center"
        )}
      >
        {/* Soft radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}10, transparent 65%)`,
          }}
          aria-hidden="true"
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />

        {/* Glass orb decoration */}
        <div
          className="absolute -top-24 -right-24 h-48 w-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${color}08` }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: `${color}06` }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${color}22, ${color}11)`,
              border: `1px solid ${color}33`,
            }}
          >
            {Icon ? (
              <Icon className="h-6 w-6" style={{ color }} />
            ) : (
              <Sparkles className="h-6 w-6" style={{ color }} />
            )}
          </div>

          <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/25 mb-2">
            Official Product Preview
          </p>
          <h4 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-2">
            Coming Soon
          </h4>
          <p className="text-xs sm:text-sm text-white/30 leading-relaxed max-w-[260px] mx-auto">
            Authentic screenshots and product UI for {name} will be uploaded in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
