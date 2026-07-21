"use client";

import { Plus, Wrench, Bug, AlertTriangle, CheckCircle2, ArrowRight, Calendar, Tag } from "lucide-react";
import { ease, NORMAL, SLOW, FAST } from "@/lib/motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { releases, APP_VERSION } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";
import Link from "next/link";

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
    <div className="mt-5">
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("h-2 w-2 rounded-full shrink-0", config.dotColor)} />
        <h4 className="text-xs font-medium text-white/40 uppercase tracking-wider">{config.label}</h4>
      </div>
      <ul className="pl-6 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="relative text-sm text-white/30 leading-relaxed">
            <span className="absolute -left-4 top-2 h-1 w-1 rounded-full bg-white/10" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ClientPage() {
  return (
    <AppShell
      navigation={portfolioNavigation}
      basePath="/portfolio-app"
    >
    <div className="bg-[#0a0a0a] min-h-screen pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="flex items-center gap-3 mb-5">
            <Tag className="h-4 w-4 text-white/20" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Changelog
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            Release Notes
          </h1>

          <p className="mt-4 text-base text-white/30 leading-relaxed max-w-lg">
            Changelog and version history for the Portfolio App.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[11px] font-mono text-white/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            Current: v{APP_VERSION}
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />

          <div className="space-y-10">
            {releases.map((release, index) => {
              const type = typeConfig[release.type];
              return (
                <motion.div
                  key={release.version}
                  className="relative pl-8 sm:pl-10"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                    duration: NORMAL,
                    ease: ease.out,
                  }}
                >
                  <div className="absolute left-0 top-7 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-[#0a0a0a] border-2 border-white/20 z-10" />

                  <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-1">
                      <h2 className="text-2xl sm:text-3xl font-mono font-semibold text-white/80 tracking-tight">
                        v{release.version}
                      </h2>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider",
                            type.className
                          )}
                        >
                          {type.label}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs text-white/20">
                          <Calendar className="h-3 w-3" />
                          {release.date}
                        </span>
                      </div>
                    </div>

                    <ReleaseSection type="added" items={release.added} />
                    <ReleaseSection type="improved" items={release.improved} />
                    <ReleaseSection type="fixed" items={release.fixed} />

                    {release.knownIssues.length > 0 && (
                      <div className="mt-6 rounded-lg border border-amber-500/10 bg-amber-500/[0.03] p-4">
                        <div className="flex items-center gap-2 mb-2.5">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400/50" />
                          <span className="text-xs font-medium text-amber-400/50 uppercase tracking-wider">
                            Known Issues
                          </span>
                        </div>
                        <ul className="pl-5 space-y-1.5">
                          {release.knownIssues.map((issue, i) => (
                            <li key={i} className="relative text-[13px] text-white/25 leading-relaxed">
                              <span className="absolute -left-3 top-2 h-1 w-1 rounded-full bg-amber-400/30" />
                              {issue}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.section
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: NORMAL, ease: ease.out }}
        >
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white/70 tracking-tight mb-3">
              What&apos;s Next
            </h3>
            <p className="text-sm text-white/30 leading-relaxed max-w-2xl mb-5">
              Future updates will focus on enhanced offline capabilities, background sync,
              and expanded platform support.
            </p>
            <Link
              href="/founder/roadmap"
              className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/50 transition-colors duration-200"
            >
              View Founder Roadmap
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.section>

        <motion.nav
          className="mt-16 sm:mt-20 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: FAST, ease: ease.out }}
          aria-label="Page navigation"
        >
          <Link
            href="/portfolio-app/offline"
            className="group inline-flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            <ArrowRight className="h-3.5 w-3.5 rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <div className="text-left">
              <span className="block text-[10px] font-mono text-white/15 uppercase tracking-wider">
                Previous
              </span>
              Offline Experience
            </div>
          </Link>
          <Link
            href="/portfolio-app/faq"
            className="group inline-flex items-center gap-2 text-sm text-white/25 hover:text-white/50 transition-colors duration-200"
          >
            <div className="text-right">
              <span className="block text-[10px] font-mono text-white/15 uppercase tracking-wider">
                Next
              </span>
              FAQ
            </div>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </motion.nav>
      </div>
    </div>
    </AppShell>
  );
}
