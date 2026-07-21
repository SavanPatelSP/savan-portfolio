"use client";

import { motion } from "framer-motion";
import { Plus, Wrench, Bug, AlertTriangle, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, NORMAL, FAST } from "@/lib/motion";
import type { ReleaseNote } from "@/data/portfolio-app";

const typeConfig: Record<string, { label: string; className: string }> = {
  major: { label: "Major", className: "text-blue-400/70 bg-blue-500/10 border-blue-500/20" },
  minor: { label: "Minor", className: "text-emerald-400/70 bg-emerald-500/10 border-emerald-500/20" },
  patch: { label: "Patch", className: "text-white/40 bg-white/[0.04] border-white/[0.08]" },
};

const sectionConfig = {
  added: { icon: Plus, dotColor: "bg-emerald-400/60", label: "Added" },
  improved: { icon: Wrench, dotColor: "bg-blue-400/60", label: "Improved" },
  fixed: { icon: Bug, dotColor: "bg-white/25", label: "Fixed" },
};

function ReleaseSection({
  type,
  items,
}: {
  type: "added" | "improved" | "fixed";
  items: string[];
}) {
  if (items.length === 0) return null;
  const config = sectionConfig[type];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2.5">
        <span className={cn("h-2 w-2 rounded-full shrink-0", config.dotColor)} />
        <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-wider">{config.label}</h4>
      </div>
      <ul className="pl-5 space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="relative text-[13px] text-white/30 leading-relaxed">
            <span className="absolute -left-4 top-2 h-1 w-1 rounded-full bg-white/10" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReleaseTimeline({
  releases,
  className,
  showFull = true,
}: {
  releases: ReleaseNote[];
  className?: string;
  showFull?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />

      <div className="space-y-8">
        {releases.map((release, index) => {
          const type = typeConfig[release.type];
          return (
            <motion.div
              key={release.version}
              className="relative pl-8 sm:pl-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                delay: index * 0.08,
                duration: NORMAL,
                ease: ease.out,
              }}
            >
              <div className="absolute left-0 top-7 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-[#0a0a0a] border-2 border-white/20 z-10" />

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6 hover:border-white/[0.06] transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                  <h3 className="text-lg sm:text-xl font-mono font-semibold text-white/80 tracking-tight">
                    v{release.version}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider",
                        type.className
                      )}
                    >
                      {type.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] text-white/20 font-mono">
                      <Calendar className="h-3 w-3" />
                      {release.date}
                    </span>
                  </div>
                </div>

                <ReleaseSection type="added" items={release.added} />
                <ReleaseSection type="improved" items={release.improved} />
                <ReleaseSection type="fixed" items={release.fixed} />

                {release.knownIssues.length > 0 && (
                  <div className="mt-4 rounded-lg border border-amber-500/10 bg-amber-500/[0.03] p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400/50" />
                      <span className="text-[11px] font-medium text-amber-400/50 uppercase tracking-wider">
                        Known Issues
                      </span>
                    </div>
                    <ul className="pl-5 space-y-1">
                      {release.knownIssues.map((issue, i) => (
                        <li key={i} className="relative text-[12px] text-white/25 leading-relaxed">
                          <span className="absolute -left-3 top-2 h-1 w-1 rounded-full bg-amber-400/30" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {showFull && release.upgradeNotes && (
                  <div className="mt-4 pt-3 border-t border-white/[0.04]">
                    <span className="text-[10px] font-mono text-white/15 uppercase tracking-wider">Upgrade Notes</span>
                    <p className="text-[12px] text-white/25 leading-relaxed mt-1">{release.upgradeNotes}</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
