"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Eye,
  Database,
  Trash2,
  RefreshCw,
  Lock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { ease, NORMAL, SLOW, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { privacyInfo } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-3">
      {children}
    </span>
  );
}

export default function ClientPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const promiseRef = useRef<HTMLDivElement>(null);
  const promiseInView = useInView(promiseRef, { once: true, amount: 0.2 });
  const storedRef = useRef<HTMLDivElement>(null);
  const storedInView = useInView(storedRef, { once: true, amount: 0.15 });
  const notStoredRef = useRef<HTMLDivElement>(null);
  const notStoredInView = useInView(notStoredRef, { once: true, amount: 0.15 });
  const updatesRef = useRef<HTMLDivElement>(null);
  const updatesInView = useInView(updatesRef, { once: true, amount: 0.2 });
  const uninstallRef = useRef<HTMLDivElement>(null);
  const uninstallInView = useInView(uninstallRef, { once: true, amount: 0.2 });
  const cacheRef = useRef<HTMLDivElement>(null);
  const cacheInView = useInView(cacheRef, { once: true, amount: 0.2 });
  const thirdPartyRef = useRef<HTMLDivElement>(null);
  const thirdPartyInView = useInView(thirdPartyRef, { once: true, amount: 0.2 });
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
            className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400/60 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <Shield className="h-5 w-5" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
            Privacy
          </h1>

          <p className="mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            No tracking, no analytics, no data collection. Full transparency
            about what the app stores on your device.
          </p>
        </motion.div>

        {/* ─── PRIVACY PROMISE ─── */}
        <motion.section
          ref={promiseRef}
          className="mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={promiseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-emerald-400/50 mb-6">
              <Shield className="h-5 w-5" />
            </div>
            <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-medium">
              The Portfolio App collects zero data. There are no analytics,
              tracking cookies, or telemetry. Your browsing activity stays
              entirely on your device.
            </p>
          </div>
        </motion.section>

        {/* ─── WHAT IS STORED LOCALLY ─── */}
        <section className="mb-20 sm:mb-28" ref={storedRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={storedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Transparency</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              What is stored locally
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.02] overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={storedInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-6 py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                      Item
                    </th>
                    <th className="text-left px-6 py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                      Description
                    </th>
                    <th className="text-right px-6 py-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
                      Size
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {privacyInfo.stored.map((item, i) => (
                    <tr
                      key={item.item}
                      className={cn(
                        "border-b border-white/[0.03] last:border-0",
                        i % 2 === 0 ? "bg-white/[0.01]" : ""
                      )}
                    >
                      <td className="px-6 py-4 text-white/50 font-medium">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 text-white/30">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-right text-white/20 font-mono text-xs">
                        {item.size}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="border-t border-white/[0.04] mb-20 sm:mb-28" />

        {/* ─── WHAT IS NOT STORED ─── */}
        <section className="mb-20 sm:mb-28" ref={notStoredRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={notStoredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Guarantee</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              What is not stored
            </h2>
          </motion.div>

          <div className="space-y-0 max-w-3xl">
            {privacyInfo.notStored.map((item, i) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 py-4 border-b border-white/[0.04]"
                initial={{ opacity: 0, x: -8 }}
                animate={notStoredInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: FAST, delay: 0.1 + i * 0.04, ease: ease.out }}
              >
                <XCircle className="h-4 w-4 text-red-400/50 shrink-0" />
                <p className="text-sm text-white/50 leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="border-t border-white/[0.04] mb-20 sm:mb-28" />

        {/* ─── HOW UPDATES WORK ─── */}
        <section className="mb-20 sm:mb-28" ref={updatesRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={updatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Updates</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              How updates work
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={updatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                <RefreshCw className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-medium text-white/60">
                Service Worker Update Cycle
              </h3>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">
              {privacyInfo.howUpdatesWork}
            </p>
          </motion.div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="border-t border-white/[0.04] mb-20 sm:mb-28" />

        {/* ─── HOW TO UNINSTALL ─── */}
        <section className="mb-20 sm:mb-28" ref={uninstallRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={uninstallInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Removal</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              How to uninstall
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={uninstallInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <div className="space-y-4 text-sm text-white/30 leading-relaxed">
              <p>{privacyInfo.howToUninstall}</p>
              <div className="pt-2 border-t border-white/[0.04]">
                <p className="text-white/40 font-medium mb-2">What gets removed:</p>
                <ul className="space-y-2">
                  {[
                    "All cached HTML, CSS, JavaScript, and image files",
                    "Theme preferences stored locally",
                    "Install prompt dismiss states",
                    "Service worker registration",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Trash2 className="h-3.5 w-3.5 text-red-400/40 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="border-t border-white/[0.04] mb-20 sm:mb-28" />

        {/* ─── HOW TO CLEAR CACHE ─── */}
        <section className="mb-20 sm:mb-28" ref={cacheRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={cacheInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Maintenance</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              How to clear cache
            </h2>
          </motion.div>

          <motion.div
            className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8"
            initial={{ opacity: 0, y: 16 }}
            animate={cacheInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: NORMAL, delay: 0.1, ease: ease.out }}
          >
            <div className="space-y-4 text-sm text-white/30 leading-relaxed">
              <div className="flex items-start gap-3">
                <Database className="h-4 w-4 text-blue-400/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/40 font-medium mb-1">Via browser settings</p>
                  <p>{privacyInfo.howToClearCache}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-2 border-t border-white/[0.04]">
                <RefreshCw className="h-4 w-4 text-blue-400/40 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white/40 font-medium mb-1">Fresh start</p>
                  <p>
                    Uninstall the app and reinstall it. This removes all cached
                    data and downloads a clean copy of every asset.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── DIVIDER ─── */}
        <div className="border-t border-white/[0.04] mb-20 sm:mb-28" />

        {/* ─── THIRD-PARTY SERVICES ─── */}
        <section className="mb-20 sm:mb-28" ref={thirdPartyRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={thirdPartyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Integrity</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              Third-party services
            </h2>
          </motion.div>

          <div className="space-y-0 max-w-3xl">
            {[
              { label: "Google Analytics", description: "No tracking scripts or page view collection" },
              { label: "Facebook Pixel", description: "No conversion tracking or retargeting" },
              { label: "Mixpanel / Amplitude", description: "No product analytics or event tracking" },
              { label: "Third-party cookies", description: "No cookies from external services" },
              { label: "CDN tracking", description: "No analytics from content delivery networks" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center justify-between py-4 border-b border-white/[0.04]"
                initial={{ opacity: 0, x: -8 }}
                animate={thirdPartyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: FAST, delay: 0.1 + i * 0.04, ease: ease.out }}
              >
                <div className="flex items-center gap-3">
                  <XCircle className="h-4 w-4 text-red-400/50 shrink-0" />
                  <span className="text-sm text-white/50 font-medium">{item.label}</span>
                </div>
                <span className="text-xs text-white/20">{item.description}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 flex items-start gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={thirdPartyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: NORMAL, delay: 0.35, ease: ease.out }}
          >
            <Lock className="h-4 w-4 text-emerald-400/40 mt-0.5 shrink-0" />
            <p className="text-sm text-white/30 leading-relaxed">
              The only network requests the app makes are to fetch its own
              static assets from the hosting provider. No data is sent to
              third-party servers at any point.
            </p>
          </motion.div>
        </section>

        {/* ─── BOTTOM NAVIGATION ─── */}
        <section ref={navRef}>
          <motion.div
            className="flex flex-col sm:flex-row items-stretch gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={navInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <Link
              href="/portfolio-app/offline"
              className="group flex-1 flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300"
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-1.5">
                  Previous
                </p>
                <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200">
                  Offline Experience
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/15 rotate-180 group-hover:-translate-x-0.5 transition-transform duration-200" />
            </Link>

            <Link
              href="/portfolio-app/faq"
              className="group flex-1 flex items-center justify-between rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300"
            >
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-1.5">
                  Next
                </p>
                <p className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200">
                  FAQ
                </p>
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
