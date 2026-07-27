"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Terminal,
  Globe,
  BookOpen,
  Info,
  Download,
  Check,
  Tag,
  Shield,
  Zap,
  Wifi,
} from "lucide-react";
import { ease, NORMAL, SLOW, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { faqs as portfolioFaqs } from "@/data/portfolio-app";
import { usePwaInstall } from "@/hooks/usePwaInstall";
import { SectionHeader } from "@/components/portfolio-app/shared/SectionHeader";
import { FAQAccordion } from "@/components/portfolio-app/shared/FAQAccordion";
import { FeatureHighlights } from "@/components/portfolio-app/shared/FeatureHighlights";

/* ─── DATA ───────────────────────────────────────────────────── */

const platformSupport = [
  { name: "Web Browser", icon: Globe, status: "Available Now" as const },
  { name: "Chrome", icon: Globe, status: "Install Supported" as const },
  { name: "Edge", icon: Globe, status: "Install Supported" as const },
  { name: "Brave", icon: Globe, status: "Install Supported" as const },
  { name: "Safari", icon: Globe, status: "Add to Home Screen" as const },
];

const comingLaterPlatforms = [
  { name: "macOS Native", icon: Monitor },
  { name: "Windows Native", icon: Monitor },
  { name: "Linux Native", icon: Terminal },
  { name: "Android APK", icon: Smartphone },
  { name: "iOS App Store", icon: Smartphone },
];

const highlightFeatures = [
  { label: "Works offline", icon: Wifi },
  { label: "Auto-updates", icon: Zap },
  { label: "Privacy-first", icon: Shield },
  { label: "App-like experience", icon: Monitor },
];

const docLinks = [
  { title: "Documentation", description: "Overview, features, and architecture", href: "/portfolio-app", icon: BookOpen },
  { title: "Platform Support", description: "Browser and OS compatibility details", href: "/portfolio-app/platform-support", icon: Globe },
  { title: "Release Notes", description: "Changelog and version history", href: "/portfolio-app/release-notes", icon: Tag },
  { title: "FAQ", description: "Answers to common questions", href: "/portfolio-app/faq", icon: Info },
];

const faqs = portfolioFaqs.slice(0, 6).map((f) => ({ q: f.question, a: f.answer }));

/* ─── MAIN PAGE ─────────────────────────────────────────────── */

export default function ClientPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.15 });
  const installRef = useRef<HTMLDivElement>(null);
  const installInView = useInView(installRef, { once: true, amount: 0.1 });
  const platformsRef = useRef<HTMLDivElement>(null);
  const platformsInView = useInView(platformsRef, { once: true, amount: 0.1 });

  const { canInstall, isInstalled, isIOS, isSafari, promptInstall } = usePwaInstall();
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstall = async () => {
    if (!canInstall || isInstalling) return;
    setIsInstalling(true);
    const success = await promptInstall();
    setIsInstalling(false);
    if (success) {
      setInstallSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Downloads", href: "/downloads" },
            { label: "Portfolio App" },
          ]}
          className="mb-8 sm:mb-12"
        />

        {/* ═══ HERO ═══ */}
        <motion.div
          ref={heroRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="text-center max-w-2xl mx-auto">
            {/* Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-4 py-1.5 text-[11px] font-mono text-emerald-400/60 mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: NORMAL, delay: 0.1 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
              Available Now
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
              Portfolio
              <br />
              <span className="text-white/40">Application</span>
            </h1>

            <p className="text-base text-white/30 leading-relaxed mb-8 max-w-lg mx-auto">
              A Progressive Web App built by SP NET INC. Install it directly from your browser for a native-like experience with offline access and automatic updates.
            </p>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/portfolio-app"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <BookOpen className="h-4 w-4" />
                Learn About PWA
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/portfolio-app/install"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white/70 hover:border-white/[0.18] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Installation Guide
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ═══ INSTALL SECTION ═══ */}
        <motion.section
          ref={installRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={installInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Install" title="Install Portfolio App" />

          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
            {/* Install button area */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/[0.08] border border-blue-500/15 mb-5">
                {isInstalled ? (
                  <Check className="h-7 w-7 text-emerald-400/70" />
                ) : (
                  <Download className="h-7 w-7 text-blue-400/60" />
                )}
              </div>

              {isInstalled ? (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white/70 mb-2">Installed</h3>
                  <p className="text-sm text-white/30">
                    The Portfolio App is installed on this device.
                  </p>
                </div>
              ) : installSuccess ? (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-emerald-400/70 mb-2">Installation Started</h3>
                  <p className="text-sm text-white/30">
                    Follow the prompts to complete installation.
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white/70 mb-2">Install App</h3>
                  <p className="text-sm text-white/30 max-w-md">
                    {isIOS || isSafari ? (
                      "On Safari, tap the Share button then \"Add to Home Screen\" to install."
                    ) : canInstall ? (
                      "Click below to install the Portfolio App directly from your browser."
                    ) : (
                      "This browser doesn't support one-click installation. You can still use the Portfolio Application directly from your browser."
                    )}
                  </p>
                </div>
              )}

              {/* Install button */}
              {!isInstalled && !installSuccess && (
                <motion.button
                  onClick={handleInstall}
                  disabled={!canInstall || isInstalling}
                  className={cn(
                    "mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-xl px-8 py-3 text-sm font-medium transition-all duration-200",
                    canInstall && !isInstalling
                      ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
                      : "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.06]"
                  )}
                  whileHover={canInstall && !isInstalling ? { scale: 1.02 } : undefined}
                  whileTap={canInstall && !isInstalling ? { scale: 0.98 } : undefined}
                >
                  {isInstalling ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Installing...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Install App
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* Features */}
            <FeatureHighlights features={highlightFeatures} />
          </div>
        </motion.section>

        {/* ═══ PLATFORM AWARENESS ═══ */}
        <motion.section
          ref={platformsRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Platforms" title="Platform Support" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {platformSupport.map((platform, i) => (
              <motion.div
                key={platform.name}
                className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: i * 0.04, duration: FAST, ease: ease.out }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/[0.06] border border-emerald-500/10 group-hover:border-emerald-500/15 transition-all duration-300">
                    <platform.icon className="h-4 w-4 text-emerald-400/50" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/50">{platform.name}</p>
                    <span className="text-[11px] font-mono text-emerald-400/50">{platform.status}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Coming Later */}
          <div className="mt-8">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-4">
              Coming Later
            </h3>
            <div className="flex flex-wrap gap-2">
              {comingLaterPlatforms.map((platform, i) => (
                <motion.div
                  key={platform.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.02] px-4 py-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={platformsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                  transition={{ delay: 0.3 + i * 0.04, duration: FAST, ease: ease.out }}
                >
                  <platform.icon className="h-3.5 w-3.5 text-white/20" />
                  <span className="text-[11px] font-medium text-white/25">{platform.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ═══ DOCUMENTATION ═══ */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Documentation" title="Learn More" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {docLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: FAST, ease: ease.out }}
              >
                <Link
                  href={link.href}
                  className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 hover:border-blue-500/15 hover:bg-blue-500/[0.02] transition-all duration-300"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04] shrink-0 group-hover:border-blue-500/15 transition-all duration-300">
                    <link.icon className="h-4 w-4 text-white/25 group-hover:text-blue-400/50 transition-colors duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">
                      {link.title}
                    </p>
                    <p className="text-[11px] text-white/15 truncate">{link.description}</p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30 shrink-0 group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FAQ ═══ */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Support" title="Frequently Asked Questions" />
          <FAQAccordion faqs={faqs} />
        </motion.section>

        {/* ═══ BOTTOM CTA ═══ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 sm:p-12 text-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/[0.08] border border-blue-500/15 mx-auto mb-6">
                <Shield className="h-5 w-5 text-blue-400/60" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-4">
                Get Started
              </h2>
              <p className="text-sm text-white/30 mb-8 max-w-md mx-auto">
                Install the Portfolio App for the best experience. Offline access, automatic updates, and a distraction-free interface — all from your browser.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={handleInstall}
                  disabled={!canInstall || isInstalled || isInstalling}
                  className={cn(
                    "group inline-flex min-h-[48px] items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200",
                    canInstall && !isInstalled && !isInstalling
                      ? "bg-white text-black hover:bg-white/90 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
                      : "bg-white/[0.04] text-white/30 cursor-not-allowed border border-white/[0.06]"
                  )}
                >
                  {isInstalled ? (
                    <>
                      <Check className="h-4 w-4" />
                      Installed
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Install App
                    </>
                  )}
                </button>
                <Link
                  href="/portfolio-app"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white/70 hover:border-white/[0.18] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Documentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
