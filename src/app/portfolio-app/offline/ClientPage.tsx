"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Wifi,
  WifiOff,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Database,
} from "lucide-react";
import { ease, NORMAL, SLOW, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { offlineCapabilities } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-3">
      {children}
    </span>
  );
}

const maximizeSteps = [
  { step: "01", title: "Visit pages while connected", description: "Navigate to every page you want available offline while you have an internet connection." },
  { step: "02", title: "Let each page fully load", description: "Wait for all assets — images, scripts, and styles — to finish loading before navigating away." },
  { step: "03", title: "Service worker caches automatically", description: "The service worker intercepts and caches each page in the background. No manual action required." },
  { step: "04", title: "Content is available offline", description: "Once cached, pages load instantly from the cache, even without a network connection." },
];

const limitations = [
  "Pages must be visited while online before they are available offline",
  "No background synchronization — data isn't sent or received offline",
  "No periodic background sync — cached content doesn't auto-refresh",
  "Cache storage is limited by the browser, typically 50MB maximum",
  "New versions require a page visit to update cached assets",
  "External embedded content (iframes, third-party widgets) is not cached",
];

export default function ClientPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const explainRef = useRef<HTMLDivElement>(null);
  const explainInView = useInView(explainRef, { once: true, amount: 0.15 });
  const cachedRef = useRef<HTMLDivElement>(null);
  const cachedInView = useInView(cachedRef, { once: true, amount: 0.1 });
  const maximizeRef = useRef<HTMLDivElement>(null);
  const maximizeInView = useInView(maximizeRef, { once: true, amount: 0.1 });
  const fallbackRef = useRef<HTMLDivElement>(null);
  const fallbackInView = useInView(fallbackRef, { once: true, amount: 0.15 });
  const strategyRef = useRef<HTMLDivElement>(null);
  const strategyInView = useInView(strategyRef, { once: true, amount: 0.15 });
  const limitsRef = useRef<HTMLDivElement>(null);
  const limitsInView = useInView(limitsRef, { once: true, amount: 0.15 });
  const futureRef = useRef<HTMLDivElement>(null);
  const futureInView = useInView(futureRef, { once: true, amount: 0.15 });
  const navRef = useRef<HTMLDivElement>(null);
  const navInView = useInView(navRef, { once: true, amount: 0.2 });

  return (
    <AppShell
      navigation={portfolioNavigation}
      basePath="/portfolio-app"
    >
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* ─── HERO ─── */}
        <motion.div
          ref={heroRef}
          className="text-center mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 text-[11px] font-mono text-white/30 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <Wifi className="h-3 w-3 text-emerald-400/60" />
            Offline Access
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
            Offline
            <br />
            <span className="text-white/40">Experience</span>
          </h1>

          <p className="mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            The Portfolio App caches content for offline access. Here&apos;s how
            it works and what to expect.
          </p>
        </motion.div>

        {/* ─── HOW OFFLINE WORKS ─── */}
        <section className="mb-20 sm:mb-28" ref={explainRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={explainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Architecture</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-8">
              How offline works
            </h2>
          </motion.div>

          <motion.div
            className="space-y-5 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={explainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
          >
            <p>
              The Portfolio App registers a service worker that intercepts all
              fetch requests at the network level. When you visit a page, the
              service worker first checks whether the response is already in the
              cache. If it is, the cached version is served instantly without a
              network round-trip. If not, the request passes through to the
              network, and the response is stored in the cache for future use.
            </p>
            <p>
              Static assets — CSS, JavaScript bundles, images, and web fonts —
              follow a <span className="font-mono text-white/40">cache-first</span> strategy. They are
              cached on the first visit and served from the cache on all
              subsequent visits, providing near-instant load times. HTML pages
              follow a <span className="font-mono text-white/40">stale-while-revalidate</span> approach:
              the cached version is returned immediately while a background
              network request fetches the latest version for next time.
            </p>
            <p>
              When the service worker detects a new version of the app, it
              installs the updated assets in the background without interrupting
              your session. The changes take effect on the next page load. This
              ensures the app stays current while providing uninterrupted offline
              access to previously viewed content.
            </p>
          </motion.div>
        </section>

        {/* ─── CACHED & NOT CACHED ─── */}
        <section className="mb-20 sm:mb-28" ref={cachedRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cachedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Availability</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              What&apos;s available offline
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Cached */}
            <motion.div
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={cachedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.1, duration: NORMAL, ease: ease.out }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/10">
                  <Wifi className="h-3.5 w-3.5 text-emerald-400/60" />
                </div>
                <h3 className="text-sm font-medium text-white/60">Available offline</h3>
              </div>
              <ul className="space-y-3">
                {offlineCapabilities.cached.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-white/30"
                    initial={{ opacity: 0, x: -8 }}
                    animate={cachedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ delay: 0.2 + i * 0.04, duration: FAST, ease: ease.out }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400/40 shrink-0 mt-0.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Not cached */}
            <motion.div
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
              initial={{ opacity: 0, y: 16 }}
              animate={cachedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.2, duration: NORMAL, ease: ease.out }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <WifiOff className="h-3.5 w-3.5 text-white/25" />
                </div>
                <h3 className="text-sm font-medium text-white/60">Not cached</h3>
              </div>
              <ul className="space-y-3">
                {offlineCapabilities.notCached.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] text-white/30"
                    initial={{ opacity: 0, x: -8 }}
                    animate={cachedInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                    transition={{ delay: 0.3 + i * 0.04, duration: FAST, ease: ease.out }}
                  >
                    <XCircle className="h-3.5 w-3.5 text-white/15 shrink-0 mt-0.5" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ─── HOW TO MAXIMIZE OFFLINE ─── */}
        <section className="mb-20 sm:mb-28" ref={maximizeRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={maximizeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Guide</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              How to maximize offline access
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {maximizeSteps.map((item, i) => (
              <motion.div
                key={item.step}
                className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={maximizeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.1 + i * 0.06, duration: NORMAL, ease: ease.out }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-white/20">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-medium text-white/60">{item.title}</h3>
                </div>
                <p className="text-[13px] text-white/25 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── OFFLINE FALLBACK ─── */}
        <section className="mb-20 sm:mb-28" ref={fallbackRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={fallbackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Fallback</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-8">
              Offline fallback page
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={fallbackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.1, duration: NORMAL, ease: ease.out }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <WifiOff className="h-4 w-4 text-white/30" />
              </div>
              <h3 className="text-sm font-medium text-white/60">When pages aren&apos;t cached</h3>
            </div>
            <div className="space-y-4 text-[13px] text-white/30 leading-relaxed">
              <p>
                When you navigate to a page that hasn&apos;t been cached and
                there&apos;s no internet connection, the service worker serves a
                dedicated offline fallback page instead of the browser&apos;s
                default error screen.
              </p>
              <p>
                The fallback page maintains the portfolio&apos;s visual identity —
                dark theme, typography, and layout consistency. It provides
                clear navigation links to pages that are cached and available
                offline, so you can continue browsing content without
                interruption.
              </p>
              <p>
                This is a significant improvement over the standard browser
                &quot;No internet&quot; error, which offers no navigation
                options and breaks the user experience entirely.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ─── CACHING STRATEGY ─── */}
        <section className="mb-20 sm:mb-28" ref={strategyRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={strategyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Technical</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-8">
              Caching strategy
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={strategyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.1, duration: NORMAL, ease: ease.out }}
          >
            <div className="space-y-6">
              {[
                { icon: Database, label: "Cache-first", target: "Static assets", description: "CSS, JavaScript bundles, images, and web fonts are served from cache on repeat visits. Only fetched from the network on the first load or when a new version is detected." },
                { icon: RefreshCw, label: "Stale-while-revalidate", target: "HTML pages", description: "The cached HTML is returned immediately while a background network request fetches the latest version. This provides instant load times while keeping content fresh." },
                { icon: Clock, label: "Automatic invalidation", target: "Version updates", description: "When a new deployment is detected, old cached assets are replaced with updated versions in the background. No manual cache clearing is required." },
                { icon: Database, label: "Storage footprint", target: "5–15 MB typical", description: "Cached content typically uses between 5 and 15 megabytes of browser storage, well within the limits imposed by modern browsers." },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className={cn(
                    "flex items-start gap-4",
                    i < 3 && "pb-6 border-b border-white/[0.04]"
                  )}
                  initial={{ opacity: 0, x: -8 }}
                  animate={strategyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: FAST, ease: ease.out }}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <item.icon className="h-4 w-4 text-white/25" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-sm font-medium text-white/60">{item.label}</span>
                      <span className="text-[10px] font-mono text-white/15 bg-white/[0.03] border border-white/[0.04] rounded px-1.5 py-0.5">
                        {item.target}
                      </span>
                    </div>
                    <p className="text-[13px] text-white/25 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── LIMITATIONS ─── */}
        <section className="mb-20 sm:mb-28" ref={limitsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={limitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Constraints</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-8">
              Limitations
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={limitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.1, duration: NORMAL, ease: ease.out }}
          >
            <ul className="space-y-3.5">
              {limitations.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-white/30 leading-relaxed"
                  initial={{ opacity: 0, x: -8 }}
                  animate={limitsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: FAST, ease: ease.out }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15 shrink-0 mt-1.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ─── FUTURE ROADMAP ─── */}
        <section className="mb-20 sm:mb-28" ref={futureRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={futureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Roadmap</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-8">
              Future improvements
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offlineCapabilities.future.map((item, i) => (
              <motion.div
                key={item}
                className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 flex items-start gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={futureInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0.1 + i * 0.06, duration: NORMAL, ease: ease.out }}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <RefreshCw className="h-3 w-3 text-white/20" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1">{item}</h3>
                  <p className="text-[12px] text-white/20 leading-relaxed">
                    {item === "Background synchronization" && "Queue actions offline and sync when connectivity returns."}
                    {item === "Periodic background sync for content updates" && "Automatically refresh cached content on a schedule."}
                    {item === "Enhanced prefetching strategies" && "Predict and cache pages the user is likely to visit next."}
                    {item === "Selective page caching controls" && "Let users choose which pages to pin for offline access."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── PREV / NEXT NAV ─── */}
        <section ref={navRef}>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={navInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <Link
              href="/portfolio-app/platform-support"
              className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
            >
              <div>
                <span className="block text-[10px] font-mono text-white/15 uppercase tracking-[0.15em] mb-2">
                  Previous
                </span>
                <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
                  Platform Support
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/15 rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>

            <Link
              href="/portfolio-app/privacy"
              className="group flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
            >
              <div>
                <span className="block text-[10px] font-mono text-white/15 uppercase tracking-[0.15em] mb-2">
                  Next
                </span>
                <span className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
                  Privacy
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/15 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
    </AppShell>
  );
}
