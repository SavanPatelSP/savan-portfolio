"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Monitor, Smartphone, ArrowRight } from "lucide-react";
import { ease, NORMAL, SLOW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { compatibilityMatrix } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true)
    return <CheckCircle2 className="h-4 w-4 text-emerald-400/70" />;
  if (value === false)
    return <XCircle className="h-4 w-4 text-red-400/50" />;
  if (value === "Manual")
    return (
      <span className="text-[11px] font-mono text-amber-400/60">Manual</span>
    );
  return null;
}

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <CheckCircle2 className="h-4 w-4 text-emerald-400/70" />
  ) : (
    <XCircle className="h-4 w-4 text-red-400/50" />
  );
}

export default function ClientPage() {
  return (
    <AppShell
      navigation={portfolioNavigation}
      basePath="/portfolio-app"
    >
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* ─── HERO ─── */}
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-[11px] font-mono text-white/30 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            Compatibility Matrix
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92]">
            Platform
            <br />
            <span className="text-white/40">Support</span>
          </h1>

          <p className="mt-6 mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            Detailed compatibility information for browsers, operating systems,
            and features.
          </p>
        </motion.div>

        {/* ─── BROWSER COMPATIBILITY ─── */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: NORMAL, ease: ease.out }}
        >
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Browsers
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Browser Compatibility
            </h2>
          </div>

          <div className="rounded-xl border border-white/[0.04] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    {["Browser", "Desktop", "Mobile", "Install", "Offline", "Notes"].map(
                      (h) => (
                        <th
                          key={h}
                          className="bg-white/[0.02] px-5 py-3 text-left text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 last:text-right"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {compatibilityMatrix.browsers.map((browser, i) => (
                    <tr
                      key={browser.name}
                      className={cn(
                        "group border-t border-white/[0.04] transition-colors duration-150 hover:bg-white/[0.02]",
                        i < compatibilityMatrix.browsers.length - 1 &&
                          "border-b-0"
                      )}
                    >
                      <td className="px-5 py-4 text-sm font-medium text-white/60">
                        {browser.name}
                      </td>
                      <td className="px-5 py-4">
                        <BoolIcon value={browser.desktop} />
                      </td>
                      <td className="px-5 py-4">
                        <BoolIcon value={browser.mobile} />
                      </td>
                      <td className="px-5 py-4">
                        <BoolIcon value={browser.install} />
                      </td>
                      <td className="px-5 py-4">
                        <BoolIcon value={browser.offline} />
                      </td>
                      <td className="px-5 py-4 text-right text-sm text-white/40">
                        {browser.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* ─── FEATURE COMPARISON BY PLATFORM ─── */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: NORMAL, ease: ease.out }}
        >
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Feature Comparison by Platform
            </h2>
          </div>

          <div className="rounded-xl border border-white/[0.04] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr>
                    {["Feature", "Windows", "macOS", "Linux", "Android", "iOS"].map(
                      (h) => (
                        <th
                          key={h}
                          className="bg-white/[0.02] px-5 py-3 text-left text-[10px] font-mono uppercase tracking-[0.2em] text-white/30"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {compatibilityMatrix.features.map((feature, _i) => (
                    <tr
                      key={feature.name}
                      className={cn(
                        "group border-t border-white/[0.04] transition-colors duration-150 hover:bg-white/[0.02]"
                      )}
                    >
                      <td className="px-5 py-4 text-sm font-medium text-white/60 whitespace-nowrap">
                        {feature.name}
                      </td>
                      <td className="px-5 py-4">
                        <StatusIcon value={feature.windows} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusIcon value={feature.macos} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusIcon value={feature.linux} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusIcon value={feature.android} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusIcon value={feature.ios} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* ─── DESKTOP VS MOBILE ─── */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: NORMAL, ease: ease.out }}
        >
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Desktop vs Mobile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Desktop */}
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <Monitor className="h-4 w-4 text-white/30" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Desktop</h3>
                  <p className="text-[10px] text-white/20 font-mono">
                    Windows, macOS, Linux
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Full install with native window",
                  "Taskbar / Dock integration",
                  "Standalone window without browser chrome",
                  "Keyboard shortcuts fully available",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-white/35"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/40 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile */}
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <Smartphone className="h-4 w-4 text-white/30" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Mobile</h3>
                  <p className="text-[10px] text-white/20 font-mono">
                    Android, iOS
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Home screen icon with full-screen mode",
                  "Touch-optimized interface",
                  "Limited on-screen keyboard",
                  "Manual install on iOS (Share → Add to Home Screen)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-white/35"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/40 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* ─── UNSUPPORTED FEATURES ─── */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: NORMAL, ease: ease.out }}
        >
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Limitations
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Unsupported Features
            </h2>
          </div>

          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] overflow-hidden">
            {[
              {
                feature: "Push Notifications",
                status: "Not implemented",
                icon: <XCircle className="h-4 w-4 text-red-400/50" />,
              },
              {
                feature: "Background Sync",
                status: "Planned",
                icon: <AlertCircle className="h-4 w-4 text-amber-400/50" />,
              },
              {
                feature: "App Store Distribution",
                status: "Not applicable — installed via browser",
                icon: <XCircle className="h-4 w-4 text-red-400/50" />,
              },
              {
                feature: "Cross-Device Sync",
                status: "Not implemented — each install is independent",
                icon: <XCircle className="h-4 w-4 text-red-400/50" />,
              },
            ].map((item, i, arr) => (
              <div
                key={item.feature}
                className={cn(
                  "flex items-center justify-between gap-4 px-5 py-4",
                  i < arr.length - 1 && "border-b border-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm text-white/50">{item.feature}</span>
                </div>
                <span className="text-[13px] text-white/25 shrink-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── FUTURE IMPROVEMENTS ─── */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: NORMAL, ease: ease.out }}
        >
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Future Improvements
            </h2>
          </div>

          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
            <ul className="space-y-4">
              {[
                {
                  title: "Enhanced Offline Prefetching",
                  description:
                    "Smarter background caching of pages based on navigation patterns and user behavior.",
                },
                {
                  title: "Background Content Updates",
                  description:
                    "Periodic sync to refresh cached content when the app is in the background.",
                },
                {
                  title: "Richer Platform Integration",
                  description:
                    "Deeper OS integration including file handling, protocol handlers, and shortcut actions.",
                },
                {
                  title: "Push Notifications",
                  description:
                    "Will be enabled when broader platform support and user demand justify implementation.",
                },
              ].map((item, i, arr) => (
                <li
                  key={item.title}
                  className={cn(
                    "flex items-start gap-3",
                    i < arr.length - 1 && "pb-4"
                  )}
                >
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-white/25">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/50">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-white/25 leading-relaxed mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ─── NAVIGATION ─── */}
        <motion.nav
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: NORMAL, ease: ease.out }}
        >
          <Link
            href="/portfolio-app/release-notes"
            className="group flex items-center justify-between sm:justify-start gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200 min-h-[48px]"
          >
            <span className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Release Notes
            </span>
          </Link>
          <Link
            href="/portfolio-app/offline"
            className="group flex items-center justify-between sm:justify-end gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200 min-h-[48px]"
          >
            <span className="flex items-center gap-2">
              Offline Experience
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.nav>
      </div>
    </div>
    </AppShell>
  );
}
