"use client";

import { useState } from "react";
import {
  Download,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { ease, spring, NORMAL, SLOW, FAST } from "@/lib/motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { platforms, APP_VERSION } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";
import Link from "next/link";

const iconMap: Record<string, typeof Monitor> = {
  desktop: Monitor,
  monitor: Monitor,
  terminal: Terminal,
  smartphone: Smartphone,
  tablet: Tablet,
};

const supportConfig: Record<
  string,
  { color: string; bg: string; border: string; label: string }
> = {
  "Full Support": {
    color: "text-emerald-400/70",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    label: "Full Support",
  },
  "Guided Install": {
    color: "text-amber-400/70",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    label: "Guided Install",
  },
  Limited: {
    color: "text-white/30",
    bg: "bg-white/[0.04]",
    border: "border-white/[0.08]",
    label: "Limited",
  },
};

function getInstallSteps(platform: (typeof platforms)[number]): string[] {
  switch (platform.name) {
    case "Windows":
      return [
        "Open the site in Chrome or Edge.",
        'Look for the install icon (a screen with a down arrow) in the address bar.',
        'Click the install icon, then confirm by clicking "Install" in the dialog.',
        "The app opens in its own window. Pin it to your taskbar from the taskbar icon.",
      ];
    case "macOS":
      return [
        "Open the site in Safari, Chrome, or Edge.",
        "Safari: Click File in the menu bar, then select \"Add to Dock\".",
        "Chrome or Edge: Click the install icon in the address bar, then confirm the install.",
        "The app appears in your Dock and Launchpad. Launch it like any native app.",
      ];
    case "Linux":
      return [
        "Open the site in Chrome or Edge.",
        'Click the install icon in the address bar.',
        'Confirm the installation by clicking "Install" in the prompt.',
        "The app integrates with your desktop environment and appears in the application menu.",
      ];
    case "Android":
      return [
        "Open the site in Chrome or Samsung Internet.",
        'Tap the three-dot menu (⋮) in the top-right corner.',
        'Tap "Install app" or "Add to Home Screen".',
        "Confirm the install. The app icon appears on your home screen and in the app drawer.",
      ];
    case "iPhone":
      return [
        "Open the site in Safari.",
        "Tap the Share button (the square with an up arrow) in the toolbar.",
        'Scroll down and tap "Add to Home Screen".',
        "Tap Add in the top-right corner. The app icon appears on your home screen.",
      ];
    case "iPad":
      return [
        "Open the site in Safari.",
        "Tap the Share button (the square with an up arrow) in the toolbar.",
        'Scroll down and tap "Add to Home Screen".',
        "Tap Add in the top-right corner. The app icon appears on your home screen.",
      ];
    default:
      return [platform.method];
  }
}

function getBrowserNotes(
  platform: (typeof platforms)[number]
): { browser: string; note: string }[] {
  const notes: { browser: string; note: string }[] = [];

  if (platform.name === "Windows") {
    notes.push({
      browser: "Chrome",
      note: 'Click the install icon (monitor with arrow) in the left side of the address bar, or open the three-dot menu and select "Install app".',
    });
    notes.push({
      browser: "Edge",
      note: 'Click the three-dot menu → "Apps" → "Install this site as an app", or click the install icon in the address bar.',
    });
  } else if (platform.name === "macOS") {
    notes.push({
      browser: "Safari",
      note: 'Click File → "Add to Dock" in the menu bar. The app installs with full native integration.',
    });
    notes.push({
      browser: "Chrome",
      note: 'Click the install icon in the address bar, then confirm. The app runs in its own window.',
    });
  } else if (platform.name === "Android") {
    notes.push({
      browser: "Chrome",
      note: 'Tap the three-dot menu (⋮) → "Install app" or "Add to Home Screen". Some devices show a banner at the bottom of the screen.',
    });
    notes.push({
      browser: "Samsung Internet",
      note: 'Tap the hamburger menu → "Add page to" → "Home screen". The app icon is added to your launcher.',
    });
  } else if (platform.name === "iPhone" || platform.name === "iPad") {
    notes.push({
      browser: "Safari",
      note: 'There is no automatic install prompt. Tap the Share button → "Add to Home Screen" → tap Add. This is the only supported method on iOS.',
    });
  }

  return notes;
}

function PlatformCard({
  platform,
  index,
}: {
  platform: (typeof platforms)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = iconMap[platform.icon] ?? Monitor;
  const support = supportConfig[platform.support] ?? supportConfig.Limited;
  const steps = getInstallSteps(platform);
  const browserNotes = getBrowserNotes(platform);

  return (
    <motion.div
      className="rounded-xl border border-white/[0.04] bg-white/[0.01] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.05 + index * 0.06,
        duration: SLOW,
        ease: ease.out,
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-4 p-5 sm:p-6 text-left min-h-[48px] group"
        aria-expanded={expanded}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04] shrink-0">
          <Icon className="h-4 w-4 text-white/30" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-sm font-medium text-white/60">
              {platform.name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-mono border",
                support.color,
                support.bg,
                support.border
              )}
            >
              {support.label}
            </span>
          </div>
          <p className="text-[13px] text-white/25 mt-1 truncate">
            {platform.method}
          </p>
        </div>

        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/15 shrink-0 transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: NORMAL, ease: ease.out }}
        className="overflow-hidden"
      >
        <div className="px-5 sm:px-6 pb-6 space-y-6 border-t border-white/[0.04]">
          {/* How to Install — numbered steps */}
          <div className="pt-6">
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-4">
              How to Install
            </h4>
            <ol className="relative ml-5 space-y-0">
              {steps.map((step, i) => (
                <li key={i} className="relative flex gap-4 pb-4 last:pb-0">
                  {i < steps.length - 1 && (
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

          {/* Supported Browsers */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-3">
              Supported Browsers
            </h4>
            <div className="flex flex-wrap gap-2">
              {platform.browsers.map((browser) => (
                <span
                  key={browser}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-mono text-white/30"
                >
                  {browser}
                </span>
              ))}
            </div>
          </div>

          {/* Browser-specific notes */}
          {browserNotes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
                Browser Details
              </h4>
              {browserNotes.map((bn) => (
                <div
                  key={bn.browser}
                  className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-4"
                >
                  <span className="text-xs font-medium text-white/40">
                    {bn.browser}
                  </span>
                  <p className="text-[13px] text-white/25 leading-relaxed mt-1">
                    {bn.note}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Requirements */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-2">
              Requirements
            </h4>
            <p className="text-[13px] text-white/30">
              {platform.requirements}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-2">
              Experience
            </h4>
            <p className="text-[13px] text-white/30 leading-relaxed">
              {platform.experience}
            </p>
          </div>

          {/* Limitations */}
          {platform.limitations && (
            <div className="rounded-lg border border-amber-400/10 bg-amber-400/[0.03] p-4">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400/40 mb-2">
                Limitations
              </h4>
              <p className="text-[13px] text-amber-400/30 leading-relaxed">
                {platform.limitations}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
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
        {/* ─── DOWNLOAD BANNER ─── */}
        <motion.div
          className="mb-8 rounded-xl border border-blue-500/10 bg-blue-500/[0.03] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: NORMAL, ease: ease.out }}
        >
          <div className="flex-1">
            <p className="text-sm text-white/50">
              <span className="font-medium text-white/60">New:</span> Visit the{" "}
              <Link href="/downloads/portfolio-app" className="text-blue-400/70 hover:text-blue-400 underline underline-offset-2 transition-colors">
                official download page
              </Link>{" "}
              for the complete download experience with version info, screenshots, and release notes.
            </p>
          </div>
          <Link
            href="/downloads/portfolio-app"
            className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 text-[11px] font-medium text-white/50 hover:text-white/70 hover:bg-white/[0.08] transition-all duration-200 shrink-0"
          >
            Go to Downloads
            <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        {/* ─── HERO ─── */}
        <motion.div
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-mono text-white/30 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            v{APP_VERSION}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92]">
            Installation
            <br />
            <span className="text-white/40">Guide</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/30 leading-relaxed">
            Install the Portfolio App on your device. Each platform has specific
            instructions for the best installation experience.
          </p>
        </motion.div>

        {/* ─── QUICK SUMMARY ─── */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: NORMAL, ease: ease.out }}
        >
          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 -mx-1 px-1">
            {platforms.map((p) => {
              const support = supportConfig[p.support] ?? supportConfig.Limited;
              const Icon = iconMap[p.icon] ?? Monitor;
              return (
                <div
                  key={p.name}
                  className={cn(
                    "flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[12px] font-medium whitespace-nowrap shrink-0",
                    support.color,
                    support.border,
                    "bg-white/[0.01]"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 opacity-60" />
                  {p.name}
                  <span className="text-[10px] opacity-50 font-mono">
                    {support.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* ─── PLATFORM SECTIONS ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Step-by-Step
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Platform guides
            </h2>
          </div>
          <div className="space-y-3">
            {platforms.map((platform, i) => (
              <PlatformCard key={platform.name} platform={platform} index={i} />
            ))}
          </div>
        </section>

        {/* ─── TROUBLESHOOTING ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
              Help
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">
              Troubleshooting
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                issue: "Install option doesn't appear",
                fix: "Ensure you are using a supported browser (Chrome, Edge, or Safari). The install prompt only appears after the browser determines the site meets PWA criteria. Try refreshing the page or navigating to a different section first.",
              },
              {
                issue: "App shows browser frame after install",
                fix: "Some browsers need a restart after installation. Close the app completely and reopen it. If the issue persists, uninstall and reinstall the app.",
              },
              {
                issue: "iOS: no install prompt",
                fix: "iOS Safari does not support automatic install prompts. Use the Share button (the square with an up arrow) in Safari's toolbar, then tap \"Add to Home Screen\".",
              },
              {
                issue: "Offline pages show errors",
                fix: "Pages must be visited at least once while online to be cached for offline use. Open the pages you want available offline, then they will work without a connection.",
              },
            ].map((item) => (
              <div
                key={item.issue}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5"
              >
                <h3 className="text-sm font-medium text-white/50 mb-1">
                  {item.issue}
                </h3>
                <p className="text-[13px] text-white/25 leading-relaxed">
                  {item.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NAVIGATION ─── */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/portfolio-app/platform-support"
              className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-200 min-h-[48px]"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
                  Previous
                </span>
                <p className="text-sm font-medium text-white/50 mt-1 group-hover:text-white/70 transition-colors">
                  Platform Support
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/15 rotate-180 group-hover:text-white/30 transition-colors" />
            </Link>

            <Link
              href="/portfolio-app/release-notes"
              className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-200 min-h-[48px]"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
                  Next
                </span>
                <p className="text-sm font-medium text-white/50 mt-1 group-hover:text-white/70 transition-colors">
                  Release Notes
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/15 group-hover:text-white/30 transition-colors" />
            </Link>
          </div>
        </section>
      </div>
    </div>
    </AppShell>
  );
}
