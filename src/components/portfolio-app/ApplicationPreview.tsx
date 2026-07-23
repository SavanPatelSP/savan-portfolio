"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, SLOW } from "@/lib/motion";
import { screenshots } from "@/data/screenshots";

const TAB_TO_SCREENSHOT: Record<string, string> = {
  home: "dashboard",
  projects: "projects",
  downloads: "downloads",
  docs: "documentation",
  offline: "offline",
  settings: "settings",
  install: "dashboard",
};

function MacWindowFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "border border-white/[0.08]",
        "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.5),0_2px_12px_-2px_rgba(0,0,0,0.3)]",
        className
      )}
      style={{
        background: "linear-gradient(180deg, rgba(28,28,30,0.98) 0%, rgba(18,18,20,1) 100%)",
      }}
    >
      {/* Title Bar with Glass Effect */}
      <div
        className="relative flex items-center h-8 px-3 border-b border-white/[0.06]"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5 mr-3 shrink-0">
          <div className="group/traffic relative h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] cursor-default">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/traffic:opacity-100 transition-opacity">
              <span className="text-[5px] text-[#4a0002] font-bold leading-none">x</span>
            </div>
          </div>
          <div className="group/traffic relative h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] cursor-default">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/traffic:opacity-100 transition-opacity">
              <span className="text-[5px] text-[#5a3b00] font-bold leading-none">-</span>
            </div>
          </div>
          <div className="group/traffic relative h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] cursor-default">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/traffic:opacity-100 transition-opacity">
              <span className="text-[5px] text-[#0a4a00] font-bold leading-none">+</span>
            </div>
          </div>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="flex items-center gap-1.5 px-3 py-[3px] rounded-md max-w-[220px] w-full"
            style={{
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <Lock className="h-2 w-2 text-emerald-400/40 shrink-0" />
            <span className="text-[7px] text-white/30 font-mono truncate">savan.sp-net.in</span>
          </div>
        </div>

        {/* Right spacer to balance traffic lights */}
        <div className="w-10 shrink-0" />
      </div>

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}

function PreviewPlaceholder() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[280px] sm:min-h-[360px] p-8 text-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.08), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/[0.08] border border-blue-500/20">
          <Sparkles className="h-5 w-5 text-blue-400/70" />
        </div>
        <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-white/25 mb-2">
          Official Product Preview
        </p>
        <h4 className="text-lg font-semibold text-white mb-1">Coming Soon</h4>
        <p className="text-xs text-white/30 max-w-[260px]">
          Authentic Portfolio App screenshots will be uploaded in a future update.
        </p>
      </div>
    </div>
  );
}

export function ApplicationPreview({
  className,
  activeTab = "home",
  variant: _variant = "hero",
}: {
  className?: string;
  activeTab?: string;
  variant?: "hero" | "full";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const screenshotId = TAB_TO_SCREENSHOT[activeTab];
  const screenshot = screenshotId
    ? screenshots.find((s) => s.id === screenshotId)
    : undefined;

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: SLOW, delay: 0.2, ease: ease.out }}
    >
      {/* Ambient glow behind window */}
      <div className="absolute -inset-8 bg-gradient-to-b from-blue-500/[0.06] via-blue-500/[0.02] to-transparent rounded-3xl blur-2xl pointer-events-none" />
      <div className="relative">
        <MacWindowFrame>
          {screenshot ? (
            <Image
              src={screenshot.src}
              alt={screenshot.title}
              width={1440}
              height={900}
              quality={85}
              priority
              className="w-full h-auto"
            />
          ) : (
            <PreviewPlaceholder />
          )}
        </MacWindowFrame>
      </div>
      {/* Floor reflection */}
      <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-gradient-to-b from-white/[0.02] to-transparent rounded-full blur-xl pointer-events-none" />
    </motion.div>
  );
}
