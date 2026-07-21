"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ease, FAST, NORMAL } from "@/lib/motion";
import {
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
  Globe,
  CheckCircle2,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
  Globe,
};

interface PlatformTab {
  id: string;
  name: string;
  icon: string;
  steps: string[];
  browsers?: { name: string; note: string }[];
  requirements: string;
  limitations?: string;
}

export function PlatformTabs({
  platforms,
  className,
}: {
  platforms: PlatformTab[];
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(platforms[0]?.id || "");
  const active = platforms.find((p) => p.id === activeTab) || platforms[0];

  return (
    <div className={cn("relative", className)}>
      {/* Tab buttons */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none border-b border-white/[0.04] mb-6 -mx-1 px-1">
        {platforms.map((p) => {
          const Icon = iconMap[p.icon] ?? Globe;
          const isActive = activeTab === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={cn(
                "relative shrink-0 flex items-center gap-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-200",
                isActive ? "text-white/60" : "text-white/25 hover:text-white/40"
              )}
            >
              <Icon className="h-3.5 w-3.5 opacity-60" />
              {p.name}
              {isActive && (
                <motion.span
                  layoutId="platform-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20"
                  transition={{ duration: FAST, ease: ease.out }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: FAST, ease: ease.out }}
          >
            {/* Steps */}
            <div className="mb-6">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-4">
                Installation Steps
              </h4>
              <ol className="relative ml-5 space-y-0">
                {active.steps.map((step, i) => (
                  <li key={i} className="relative flex gap-4 pb-4 last:pb-0">
                    {i < active.steps.length - 1 && (
                      <div className="absolute left-[-13px] top-[18px] bottom-0 w-px bg-white/[0.06]" />
                    )}
                    <span className="relative z-[1] flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-white/40 shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[13px] text-white/35 leading-relaxed pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Browsers */}
            {active.browsers && active.browsers.length > 0 && (
              <div className="mb-6">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-3">
                  Supported Browsers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {active.browsers.map((b) => (
                    <span
                      key={b.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-mono text-white/30"
                    >
                      {b.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-2">
                Requirements
              </h4>
              <p className="text-[13px] text-white/30">{active.requirements}</p>
            </div>

            {/* Limitations */}
            {active.limitations && (
              <div className="rounded-lg border border-amber-400/10 bg-amber-400/[0.03] p-4">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/40 mb-2">
                  Limitations
                </h4>
                <p className="text-[13px] text-amber-400/30 leading-relaxed">
                  {active.limitations}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
