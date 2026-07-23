"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Monitor,
  Download,
  Wifi,
  Zap,
  Shield,
  ArrowRight,
  RefreshCw,
  Smartphone,
  Globe,
  Lock,
  ChevronRight,
} from "lucide-react";
import { ease, NORMAL, SLOW } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { APP_VERSION, features, platforms } from "@/data/portfolio-app";
import { AppShell } from "@/components/navigation";
import { portfolioNavigation } from "@/data/navigation/portfolio-navigation";
import { ApplicationPreview } from "@/components/portfolio-app/ApplicationPreview";
import { MultiDevicePreview } from "@/components/portfolio-app/MultiDevicePreview";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Wifi,
  RefreshCw,
  Zap,
  Shield,
  Smartphone,
};

const navLinks = [
  {
    title: "Installation Guide",
    description: "Step-by-step instructions for every platform.",
    href: "/portfolio-app/install",
    icon: Download,
  },
  {
    title: "Platform Support",
    description: "Browser and OS compatibility details.",
    href: "/portfolio-app/platform-support",
    icon: Globe,
  },
  {
    title: "Offline Experience",
    description: "How caching and offline access work.",
    href: "/portfolio-app/offline",
    icon: Wifi,
  },
  {
    title: "Privacy",
    description: "What data is and is not collected.",
    href: "/portfolio-app/privacy",
    icon: Lock,
  },
  {
    title: "Release Notes",
    description: "Changelog and version history.",
    href: "/portfolio-app/release-notes",
    icon: RefreshCw,
  },
  {
    title: "FAQ",
    description: "Answers to common questions.",
    href: "/portfolio-app/faq",
    icon: Shield,
  },
];

const storySteps = [
  {
    step: "01",
    title: "Visit the portfolio",
    description: "Browse the portfolio content in your browser. Explore projects, research, and product pages to find what interests you.",
    icon: Globe,
  },
  {
    step: "02",
    title: "Install the app",
    description: "Click the install icon in your browser's address bar or use the menu option. The app installs in seconds.",
    icon: Download,
  },
  {
    step: "03",
    title: "Use offline",
    description: "Content you've visited is cached automatically. Access your favorite pages anytime, even without an internet connection.",
    icon: Wifi,
  },
];

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
  const previewRef = useRef<HTMLDivElement>(null);
  const previewInView = useInView(previewRef, { once: true, amount: 0.1 });
  const proseRef = useRef<HTMLDivElement>(null);
  const proseInView = useInView(proseRef, { once: true, amount: 0.2 });
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.15 });
  const platformsRef = useRef<HTMLDivElement>(null);
  const platformsInView = useInView(platformsRef, { once: true, amount: 0.1 });
  const navRef = useRef<HTMLDivElement>(null);
  const navInView = useInView(navRef, { once: true, amount: 0.1 });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 });

  return (
    <AppShell
      navigation={portfolioNavigation}
      basePath="/portfolio-app"
    >
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ─── HERO ─── */}
        <motion.div
          ref={heroRef}
          className="text-center mb-16 sm:mb-20"
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
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            Progressive Web App
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
            Portfolio App
          </h1>

          <p className="mx-auto max-w-lg text-base text-white/30 leading-relaxed mb-4">
            A flagship installable web application developed by SP NET INC.
          </p>

          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1 text-[11px] font-mono text-emerald-400/50 mb-10"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: NORMAL, delay: 0.2 }}
          >
            v{APP_VERSION} &middot; Stable
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: NORMAL, delay: 0.25, ease: ease.out }}
          >
            <Link
              href="/downloads/portfolio-app"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.08] to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Download className="h-4 w-4 relative z-[1]" />
              <span className="relative z-[1]">Download</span>
              <ArrowRight className="h-4 w-4 relative z-[1] group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/portfolio-app"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-6 py-3 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.1] transition-all duration-200 min-h-[48px]"
            >
              Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* ─── APPLICATION PREVIEW ─── */}
        <motion.section
          ref={previewRef}
          className="mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={previewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="text-center mb-10">
            <SectionLabel>Preview</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-3">
              See it in action
            </h2>
            <p className="text-sm text-white/25 max-w-md mx-auto">
              A full desktop application experience, built entirely with web standards.
            </p>
          </div>

          {/* Desktop Window Preview */}
          <ApplicationPreview activeTab="home" variant="hero" />
        </motion.section>

        {/* ─── MULTI DEVICE ─── */}
        <motion.section
          className="mb-20 sm:mb-28"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <div className="text-center mb-10">
            <SectionLabel>Every Device</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-3">
              One app, every screen
            </h2>
            <p className="text-sm text-white/25 max-w-md mx-auto">
              Optimized for desktop, laptop, tablet, and phone — in portrait and landscape.
            </p>
          </div>

          <MultiDevicePreview />
        </motion.section>

        {/* ─── WHAT IS THE PORTFOLIO APP? ─── */}
        <section className="mb-20 sm:mb-28" ref={proseRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={proseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Overview</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-8">
              What is the Portfolio App?
            </h2>
          </motion.div>

          <motion.div
            className="space-y-5 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            animate={proseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
          >
            <p>
              The Portfolio App is a Progressive Web App that transforms the
              portfolio website into a native-like application. It runs in its
              own standalone window without browser chrome, launches directly
              from your desktop or home screen, and provides a focused,
              distraction-free experience for navigating through projects,
              research, and product documentation.
            </p>
            <p>
              Built on modern web standards — service workers, the Web App
              Manifest, and cache-first asset strategies — the app installs
              on Windows, macOS, Linux, Android, and iOS. Once installed,
              previously viewed pages are cached and available offline, so
              the portfolio remains accessible even without a network
              connection.
            </p>
            <p>
              Unlike traditional web bookmarks, the Portfolio App delivers a
              genuine application experience: a dedicated window, taskbar or
              dock integration, automatic content updates, and zero data
              collection. There are no analytics, no tracking, and no account
              requirements. Install it, and use it immediately.
            </p>
          </motion.div>
        </section>

        {/* ─── FEATURES GRID ─── */}
        <section className="mb-20 sm:mb-28" ref={featuresRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              Built for every device
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || Monitor;
              return (
                <motion.div
                  key={feature.id}
                  className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: NORMAL, ease: ease.out }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 group-hover:border-blue-500/15 group-hover:text-blue-400/50 transition-all duration-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-medium text-white/60">{feature.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/25 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="mb-20 sm:mb-28" ref={stepsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Process</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              How it works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 relative">
            {storySteps.map((item, i) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={stepsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.15 + i * 0.1, duration: NORMAL, ease: ease.out }}
              >
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-7 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] group-hover:border-blue-500/15 transition-all duration-300">
                      <item.icon className="h-4 w-4 text-white/30" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-white/25 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {i < 2 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-4 sm:-right-5 -translate-y-1/2 z-10">
                    <ChevronRight className="h-5 w-5 text-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── PLATFORMS ─── */}
        <section className="mb-20 sm:mb-28" ref={platformsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Compatibility</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              Platform support
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 sm:p-6 hover:border-white/[0.08] transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                animate={platformsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.1 + i * 0.05, duration: NORMAL, ease: ease.out }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white/60">{platform.name}</h3>
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border",
                      platform.support === "Full Support"
                        ? "text-emerald-400/60 bg-emerald-500/[0.06] border-emerald-500/10"
                        : "text-amber-400/60 bg-amber-500/[0.06] border-amber-500/10"
                    )}
                  >
                    {platform.support}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {platform.browsers.map((browser) => (
                    <span
                      key={browser}
                      className="text-[10px] font-mono text-white/20 bg-white/[0.03] border border-white/[0.04] rounded px-2 py-0.5"
                    >
                      {browser}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── NAVIGATION LINKS ─── */}
        <section className="mb-20 sm:mb-28" ref={navRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={navInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <SectionLabel>Documentation</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-12">
              Explore the documentation
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={navInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.1 + i * 0.05, duration: NORMAL, ease: ease.out }}
              >
                <Link
                  href={link.href}
                  className="group flex flex-col rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-300 h-full"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 mb-4 group-hover:text-white/50 group-hover:border-blue-500/15 transition-all duration-200">
                    <link.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60 mb-1.5 group-hover:text-white/80 transition-colors duration-200">
                    {link.title}
                  </h3>
                  <p className="text-xs text-white/25 leading-relaxed flex-1">
                    {link.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-[11px] font-mono text-white/15 group-hover:text-white/30 transition-colors duration-200">
                    <span>View</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── BOTTOM CTA ─── */}
        <section ref={ctaRef}>
          <motion.div
            className="relative rounded-2xl border border-white/[0.05] bg-white/[0.015] p-8 sm:p-12 text-center overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-4">
                Ready to install?
              </h2>
              <p className="text-sm text-white/30 mb-8 max-w-md mx-auto">
                Get the native app experience with faster loading, automatic
                updates, and offline access.
              </p>
              <Link
                href="/downloads/portfolio-app"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/[0.08] to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Download className="h-4 w-4 relative z-[1]" />
                <span className="relative z-[1]">Download Now</span>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
    </AppShell>
  );
}
