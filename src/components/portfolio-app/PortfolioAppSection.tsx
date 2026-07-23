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
  CheckCircle2,
  Smartphone,
  RefreshCw,
  Globe,
  Laptop,
  Terminal,
  Package,
  Clock,
  Layers,
  Eye,
  Cog,
  FileCheck,
  Lock,
  BookOpen,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";
import { SectionContainer, SectionTitle, FadeIn } from "@/components/ui/AnimationPrimitives";
import { ParticleField } from "@/components/ui/ParticleField";
import { ApplicationPreview } from "@/components/portfolio-app/ApplicationPreview";
import { APP_VERSION, features } from "@/data/portfolio-app";
import { ease, NORMAL } from "@/lib/motion";

/* ─── ICON MAP ───────────────────────────────────────────────── */

const iconMap: Record<string, React.ElementType> = {
  Monitor,
  Download,
  Wifi,
  Zap,
  Shield,
  Smartphone,
  RefreshCw,
  Globe,
  Laptop,
  Terminal,
};

/* ─── PLATFORMS ──────────────────────────────────────────────── */

const platforms = [
  { name: "Windows", icon: Monitor },
  { name: "macOS", icon: Laptop },
  { name: "Linux", icon: Terminal },
  { name: "Android", icon: Smartphone },
  { name: "iOS", icon: Smartphone },
  { name: "iPad", icon: Smartphone },
];

/* ─── METRICS ─────────────────────────────────────────────────── */

const metrics = [
  { label: "Platforms", value: "6", icon: Globe },
  { label: "Version", value: APP_VERSION, icon: Package },
  { label: "Release Channel", value: "Stable", icon: GitBranch },
  { label: "First Release", value: "2026", icon: Clock },
];

/* ─── WHY INSTALL ─────────────────────────────────────────────── */

const whyInstallReasons = [
  {
    icon: Zap,
    title: "Faster Launch",
    description: "Opens directly from your desktop or home screen. No browser navigation, no tab management.",
  },
  {
    icon: Wifi,
    title: "Offline Experience",
    description: "Previously viewed pages stay cached. Browse the portfolio without an internet connection.",
  },
  {
    icon: Eye,
    title: "Cleaner Interface",
    description: "No browser chrome, no address bar, no tab strip. Just the portfolio in a focused window.",
  },
  {
    icon: Monitor,
    title: "Dedicated Window",
    description: "Runs in its own standalone window. Pin it to your taskbar or dock like any native app.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Updates",
    description: "Always stays current. The app checks for updates each time it connects to the internet.",
  },
  {
    icon: Cog,
    title: "System Integration",
    description: "Appears in your Start menu, Dock, or app drawer. Launches like any installed application.",
  },
];

/* ─── TRUST ───────────────────────────────────────────────────── */

const trustItems = [
  { icon: FileCheck, label: "Official Build" },
  { icon: Lock, label: "Secure Distribution" },
  { icon: Shield, label: "No Hidden Tracking" },
  { icon: Eye, label: "Privacy Focused" },
  { icon: BookOpen, label: "Open Documentation" },
  { icon: GitBranch, label: "Version Controlled" },
];

/* ─── BACKGROUND ─────────────────────────────────────────────── */

function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full opacity-[0.06] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full opacity-[0.04] blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}

/* ─── SECTION DIVIDER ─────────────────────────────────────────── */

function SectionDivider({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <FadeIn delay={0.2} y={8} blur={4}>
      <div className="mb-6 sm:mb-8 flex items-center gap-3 justify-center lg:justify-start">
        <div className="h-px flex-1 bg-gradient-to-r from-blue-400/20 via-blue-400/35 to-blue-400/20" />
        <Icon className="h-3.5 w-3.5 text-blue-400/50 shrink-0" />
        <span className="text-[10px] font-mono tracking-wider text-blue-400/50">
          {label}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-400/20 via-blue-400/35 to-blue-400/20" />
      </div>
    </FadeIn>
  );
}

/* ─── FEATURE CARD ───────────────────────────────────────────── */

function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof features)[number];
  index: number;
  isInView: boolean;
}) {
  const Icon = iconMap[feature.icon] || Monitor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: NORMAL,
        delay: 0.3 + index * 0.07,
        ease: ease.out,
      }}
      className="group relative"
    >
      <div
        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:border-blue-500/25 hover:bg-blue-500/[0.04]"
        style={{
          transition:
            "border-color 0.4s ease, background-color 0.4s ease, box-shadow 0.4s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "0 0 40px rgba(59,130,246,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div className="flex items-start gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/[0.06]">
            <Icon className="h-4.5 w-4.5 text-blue-400/70" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white/80 group-hover:text-white/90 transition-colors duration-200">
              {feature.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-white/30 group-hover:text-white/40 transition-colors duration-200">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── WHY INSTALL CARD ────────────────────────────────────────── */

function WhyInstallCard({
  item,
  index,
  isInView,
}: {
  item: (typeof whyInstallReasons)[number];
  index: number;
  isInView: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: NORMAL,
        delay: 0.15 + index * 0.06,
        ease: ease.out,
      }}
      className="group"
    >
      <div className="relative rounded-xl border border-white/[0.04] bg-white/[0.015] p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.03]">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] mb-3 group-hover:border-blue-500/15 group-hover:bg-blue-500/[0.06] transition-all duration-300">
          <Icon className="h-4 w-4 text-white/30 group-hover:text-blue-400/60 transition-colors duration-300" />
        </div>
        <h3 className="text-sm font-medium text-white/60 group-hover:text-white/75 transition-colors duration-200 mb-1.5">
          {item.title}
        </h3>
        <p className="text-xs leading-relaxed text-white/25 group-hover:text-white/35 transition-colors duration-200">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────── */

export function PortfolioAppSection() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });

  const whyInstallRef = useRef<HTMLDivElement>(null);
  const whyInstallInView = useInView(whyInstallRef, { once: true, amount: 0.1 });

  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true, amount: 0.1 });

  return (
    <SectionContainer
      id="portfolio-app"
      className="bg-black relative overflow-hidden"
    >
      <SectionBackground />
      <ParticleField count={35} connectionDistance={130} speed={0.12} />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent" />

      <div className="relative z-[2]">
        {/* ─── Title ─── */}
        <SectionTitle
          label="Portfolio App"
          title="The portfolio, installed."
          subtitle="A flagship installable web application developed by SP NET INC. Experience the portfolio as a native desktop or mobile application."
        />

        {/* ─── Hero Card ─── */}
        <FadeIn delay={0.15} y={16} blur={4}>
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden">
            <div
              className="relative px-6 sm:px-8 py-7 sm:py-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(59,130,246,0.06) 0%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/[0.08]">
                    <Download className="h-3.5 w-3.5 text-blue-400/80" />
                  </div>
                  <span className="text-sm font-medium text-white/80">
                    Portfolio App
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-500/[0.08] px-2 py-0.5 text-[10px] font-mono text-blue-400/70">
                    Stable
                  </span>
                  <span className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-mono text-white/40">
                    v{APP_VERSION}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/30 mb-6">
                The portfolio, installed. A native-like experience for desktop and mobile.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/downloads/portfolio-app"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Install Now
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/portfolio-app"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white/70 hover:border-white/[0.18] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Documentation
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── Application Preview ─── */}
        <FadeIn delay={0.2} y={16} blur={6}>
          <div className="mt-10 sm:mt-14">
            <ApplicationPreview activeTab="home" variant="hero" />
          </div>
        </FadeIn>

        {/* ─── Metrics Row ─── */}
        <FadeIn delay={0.25} y={12} blur={4}>
          <div className="mt-10 sm:mt-14">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.015] px-4 py-3.5 transition-all duration-300 hover:border-blue-500/15 hover:bg-blue-500/[0.02]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03]">
                      <Icon className="h-3.5 w-3.5 text-white/25" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white/70 truncate">{m.value}</p>
                      <p className="text-[10px] text-white/25 font-mono truncate">{m.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ─── Product Overview ─── */}
        <FadeIn delay={0.3} y={12} blur={4}>
          <div className="mt-14 sm:mt-18">
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/15 bg-blue-500/[0.06]">
                  <Layers className="h-4 w-4 text-blue-400/60" />
                </div>
                <h3 className="text-sm font-medium text-white/70">
                  What is the Portfolio App?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-relaxed text-white/30">
                <p>
                  The Portfolio App is a Progressive Web App (PWA) that transforms this portfolio
                  into a native-like application. Install it on your desktop or mobile device for
                  faster access, offline browsing, and a distraction-free experience.
                </p>
                <p>
                  Unlike a browser bookmark, the installed app runs in its own standalone window
                  without tabs or address bar. It caches content for offline viewing, launches
                  instantly from your desktop, and stays updated automatically.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ─── Feature Grid ─── */}
        <div ref={featuresRef} className="mt-16 sm:mt-20">
          <SectionDivider icon={CheckCircle2} label="FEATURES" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={i}
                isInView={featuresInView}
              />
            ))}
          </div>
        </div>

        {/* ─── Why Install ─── */}
        <div ref={whyInstallRef} className="mt-16 sm:mt-20">
          <SectionDivider icon={Zap} label="WHY INSTALL" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {whyInstallReasons.map((item, i) => (
              <WhyInstallCard
                key={item.title}
                item={item}
                index={i}
                isInView={whyInstallInView}
              />
            ))}
          </div>
        </div>

        {/* ─── Trust Section ─── */}
        <div ref={trustRef} className="mt-16 sm:mt-20">
          <SectionDivider icon={Shield} label="TRUST & TRANSPARENCY" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={trustInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{
                    duration: NORMAL,
                    delay: 0.1 + i * 0.05,
                    ease: ease.out,
                  }}
                  className="group flex flex-col items-center text-center rounded-xl border border-white/[0.04] bg-white/[0.015] p-4 transition-all duration-300 hover:border-blue-500/15 hover:bg-blue-500/[0.02]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.03] mb-2.5 group-hover:border-blue-500/15 transition-all duration-300">
                    <Icon className="h-4 w-4 text-white/25 group-hover:text-blue-400/50 transition-colors duration-300" />
                  </div>
                  <span className="text-[11px] font-medium text-white/40 group-hover:text-white/55 transition-colors duration-200">
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── Platform Strip ─── */}
        <FadeIn delay={0.35} y={12} blur={4}>
          <div className="mt-12 sm:mt-16">
            <SectionDivider icon={Globe} label="PLATFORMS" />

            <div className="flex flex-wrap items-center justify-center gap-2">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.name}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.04]"
                  >
                    <Icon className="h-3.5 w-3.5 text-white/30" />
                    <span className="text-xs font-medium text-white/40">
                      {p.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ─── Bottom CTA ─── */}
        <FadeIn delay={0.4} y={12} blur={4}>
          <div className="mt-14 sm:mt-18">
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white/70 tracking-tight mb-2">
                Ready to install?
              </h3>
              <p className="text-xs text-white/30 mb-6 max-w-md mx-auto">
                Get the native app experience with faster loading, offline access, and a distraction-free interface.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/downloads/portfolio-app"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Install Portfolio App
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/portfolio-app"
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white/70 hover:border-white/[0.18] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  View Documentation
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
    </SectionContainer>
  );
}
