"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Download,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  Fingerprint,
  Radio,
  Tag,
  Hash,
  FileText,
  Monitor,
  Smartphone,
  Tablet,
  Terminal,
  Globe,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  Info,
  ChevronDown,
  Clock,
  Cpu,
  Layers,
  Zap,
} from "lucide-react";
import { ease, spring, NORMAL, SLOW, FAST } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { VersionBadge } from "@/components/downloads/VersionBadge";
import { DownloadCard } from "@/components/downloads/DownloadCard";
import { DownloadFlow } from "@/components/downloads/DownloadFlow";
import { ScreenshotGallery } from "@/components/downloads/ScreenshotGallery";
import { ReleaseTimeline } from "@/components/downloads/ReleaseTimeline";
import { PlatformTabs } from "@/components/downloads/PlatformTabs";
import { ApplicationPreview } from "@/components/portfolio-app/ApplicationPreview";
import { MultiDevicePreview } from "@/components/portfolio-app/MultiDevicePreview";
import { releases, APP_VERSION } from "@/data/portfolio-app";
import { downloadProducts, downloadIntegrity, DOWNLOAD_PLATFORMS } from "@/data/downloads";

const product = downloadProducts[0];

const integrityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Building2,
  Lock,
  Fingerprint,
  Radio,
  Tag,
  Hash,
  FileText,
};

const platformSteps = [
  {
    id: "windows",
    name: "Windows",
    icon: "Monitor",
    steps: [
      "Open the site in Chrome or Edge.",
      "Look for the install icon (a screen with a down arrow) in the address bar.",
      'Click the install icon, then confirm by clicking "Install" in the dialog.',
      "The app opens in its own window. Pin it to your taskbar from the taskbar icon.",
    ],
    browsers: [
      { name: "Chrome 67+", note: "Click the install icon in the address bar." },
      { name: "Edge 79+", note: "Three-dot menu \u2192 Apps \u2192 Install this site as an app." },
    ],
    requirements: "Windows 10 or later",
  },
  {
    id: "macos",
    name: "macOS",
    icon: "Monitor",
    steps: [
      "Open the site in Safari, Chrome, or Edge.",
      'Safari: Click File \u2192 "Add to Dock" in the menu bar.',
      "Chrome or Edge: Click the install icon in the address bar, then confirm.",
      "The app appears in your Dock and Launchpad.",
    ],
    browsers: [
      { name: "Safari 14.1+", note: 'File \u2192 "Add to Dock" in the menu bar.' },
      { name: "Chrome 67+", note: "Click the install icon in the address bar." },
    ],
    requirements: "macOS 11 Big Sur or later",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "Terminal",
    steps: [
      "Open the site in Chrome or Edge.",
      "Click the install icon in the address bar.",
      'Confirm the installation by clicking "Install" in the prompt.',
      "The app integrates with your desktop environment.",
    ],
    browsers: [
      { name: "Chrome 67+", note: "Click the install icon in the address bar." },
      { name: "Edge 79+", note: "Three-dot menu \u2192 Apps \u2192 Install." },
    ],
    requirements: "Any modern Linux distribution",
  },
  {
    id: "android",
    name: "Android",
    icon: "Smartphone",
    steps: [
      "Open the site in Chrome or Samsung Internet.",
      'Tap the three-dot menu (\u22ee) in the top-right corner.',
      'Tap "Install app" or "Add to Home Screen".',
      "Confirm. The app icon appears on your home screen and in the app drawer.",
    ],
    browsers: [
      { name: "Chrome 67+", note: 'Three-dot menu \u2192 "Install app".' },
      { name: "Samsung Internet 14+", note: 'Hamburger menu \u2192 "Add page to" \u2192 "Home screen".' },
    ],
    requirements: "Android 5.0 or later",
  },
  {
    id: "ios",
    name: "iOS",
    icon: "Smartphone",
    steps: [
      "Open the site in Safari.",
      "Tap the Share button (the square with an up arrow) in the toolbar.",
      'Scroll down and tap "Add to Home Screen".',
      "Tap Add in the top-right corner. The app icon appears on your home screen.",
    ],
    browsers: [
      { name: "Safari 14.1+ (iOS 15+)", note: 'Share button \u2192 "Add to Home Screen".' },
    ],
    requirements: "iOS 15 or later",
    limitations: "iOS Safari does not support automatic install prompts. Push notifications and some advanced web APIs are restricted.",
  },
  {
    id: "chromeos",
    name: "ChromeOS",
    icon: "Globe",
    steps: [
      "Open the site in Chrome.",
      "Click the install icon in the address bar.",
      'Confirm the installation by clicking "Install".',
      "The app appears in your app launcher.",
    ],
    browsers: [{ name: "Chrome 67+", note: "Click the install icon in the address bar." }],
    requirements: "ChromeOS with Chrome 67+",
  },
];

/* ─── FAQ ACCORDION ─────────────────────────────────────────── */

const faqs = [
  {
    q: "What is the Portfolio App?",
    a: "A Progressive Web App (PWA) that transforms the portfolio into a native-like application. Install it on your desktop or mobile device for faster access, offline browsing, and a distraction-free experience.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The Portfolio App is completely free with no in-app purchases, subscriptions, or hidden costs.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. Once installed and visited at least once while online, previously viewed pages are cached for offline access. The homepage and core assets are always available offline.",
  },
  {
    q: "How are updates delivered?",
    a: "The app checks for updates each time it connects to the internet. New versions are automatically cached. Restart the app to see the latest version.",
  },
  {
    q: "Does it collect data?",
    a: "No. The Portfolio App does not use analytics, tracking cookies, or any data collection. Your browsing activity stays entirely on your device.",
  },
  {
    q: "How do I uninstall it?",
    a: "On desktop: right-click the taskbar icon or use OS app management. On mobile: long-press the app icon and select Remove.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border-b border-white/[0.04] last:border-b-0"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: FAST, ease: ease.out }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left min-h-[48px] group"
        aria-expanded={open}
      >
        <span className="text-sm text-white/50 font-medium pr-4 group-hover:text-white/70 transition-colors">{faq.q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/20 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            className="overflow-hidden"
          >
            <p className="text-[13px] text-white/30 leading-relaxed pb-4">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────────── */

function SectionHeader({
  label,
  title,
  action,
}: {
  label: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">
          {label}
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-2 tracking-tight">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────── */

export default function ClientPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, amount: 0.15 });
  const previewRef = useRef<HTMLDivElement>(null);
  const previewInView = useInView(previewRef, { once: true, amount: 0.1 });
  const integrityRef = useRef<HTMLDivElement>(null);
  const integrityInView = useInView(integrityRef, { once: true, amount: 0.1 });
  const screenshotsRef = useRef<HTMLDivElement>(null);
  const screenshotsInView = useInView(screenshotsRef, { once: true, amount: 0.1 });
  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const requirementsRef = useRef<HTMLDivElement>(null);
  const requirementsInView = useInView(requirementsRef, { once: true, amount: 0.1 });
  const installRef = useRef<HTMLDivElement>(null);
  const installInView = useInView(installRef, { once: true, amount: 0.1 });
  const releaseRef = useRef<HTMLDivElement>(null);
  const releaseInView = useInView(releaseRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 sm:pt-32 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Install", href: "/downloads" },
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
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
            {/* Left: Info */}
            <div className="flex-1">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.06] px-3.5 py-1.5 text-[11px] font-mono text-emerald-400/60 mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: NORMAL, delay: 0.1 }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                Stable Release
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92] mb-4">
                Portfolio
                <br />
                <span className="text-white/40">App</span>
              </h1>

              <p className="text-base text-white/30 leading-relaxed mb-6 max-w-lg">
                The flagship installable web application by SP NET INC.
                Native experience, offline access, and automatic updates.
              </p>

              <div className="flex items-center gap-3 flex-wrap mb-8">
                <VersionBadge version={APP_VERSION} channel="stable" size="sm" />
                <span className="text-[11px] font-mono text-white/15">Build 2026.07.17</span>
                <span className="text-[11px] font-mono text-white/15">PWA</span>
              </div>

              {/* Download Flow */}
              <DownloadFlow
                productName="Portfolio App"
                version={APP_VERSION}
              />

              <p className="mt-3 text-[11px] text-white/15">
                Free install. No account required. Works on all modern browsers.
              </p>
            </div>

            {/* Right: Quick Info */}
            <div className="lg:w-72 shrink-0">
              {/* App Info Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <DownloadCard label="Version" value={`v${APP_VERSION}`} accent />
                <DownloadCard label="Channel" value="Stable" accent />
                <DownloadCard label="Architecture" value="PWA" />
                <DownloadCard label="File Size" value="~5\u201315 MB" />
                <DownloadCard label="Release Date" value="2026" />
                <DownloadCard label="License" value="Free" />
                <DownloadCard label="Build" value="2026.07.17" />
                <DownloadCard label="Checksum" value="sha256:\u2026" />
              </div>

              {/* Developer Info */}
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-[7px] font-bold text-white">SP</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-white/50">SP NET INC</p>
                    <p className="text-[9px] text-white/20">Developer & Publisher</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "Developer", value: "Savan Patel" },
                    { label: "Publisher", value: "SP NET INC" },
                    { label: "First Release", value: "2026" },
                    { label: "Category", value: "Productivity" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-white/20">{item.label}</span>
                      <span className="text-[10px] text-white/40 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ APPLICATION PREVIEW ═══ */}
        <motion.section
          ref={previewRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={previewInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Preview" title="Application Preview" />

          {/* Hero Preview - Desktop Window */}
          <div className="mb-8">
            <ApplicationPreview activeTab="home" variant="hero" />
          </div>

          {/* Multi-Device Preview */}
          <MultiDevicePreview />
        </motion.section>

        {/* ═══ SCREENSHOTS ═══ */}
        <motion.section
          ref={screenshotsRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={screenshotsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Gallery" title="Screenshots" />
          <ScreenshotGallery />
        </motion.section>

        {/* ═══ DOWNLOAD INTEGRITY ═══ */}
        <motion.section
          ref={integrityRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={integrityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Trust" title="Install Confidence" />

          {/* Trust summary */}
          <div className="mb-6 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/[0.06] border border-emerald-500/15">
                <ShieldCheck className="h-4 w-4 text-emerald-400/50" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/60">Verified & Secure</p>
                <p className="text-[11px] text-white/25">Every install is verified for integrity and authenticity.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Official Build", "Verified by SP NET INC", "Built from Source", "No Hidden Modifications", "Secure Distribution", "Version Controlled"].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-[11px] text-white/30">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400/40 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Integrity cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {downloadIntegrity.map((item, i) => {
              const Icon = integrityIcons[item.icon] ?? ShieldCheck;
              return (
                <motion.div
                  key={item.label}
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 hover:border-blue-500/15 hover:bg-blue-500/[0.02] transition-all duration-300"
                  initial={{ opacity: 0, y: 12 }}
                  animate={integrityInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.04, duration: FAST, ease: ease.out }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04] mb-3 group-hover:border-blue-500/15 transition-all duration-300">
                    <Icon className="h-3.5 w-3.5 text-white/25 group-hover:text-blue-400/50 transition-colors duration-300" />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs font-medium text-white/50">{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ═══ PLATFORMS ═══ */}
        <motion.section
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Compatibility" title="Supported Platforms" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DOWNLOAD_PLATFORMS.map((p, i) => (
              <motion.div
                key={p.id}
                className={cn(
                  "group rounded-xl border p-4 text-center transition-all duration-300",
                  p.support === "full"
                    ? "border-white/[0.04] bg-white/[0.01] hover:border-blue-500/15 hover:bg-blue-500/[0.02]"
                    : "border-amber-500/10 bg-amber-500/[0.02] hover:border-amber-500/20"
                )}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: FAST, ease: ease.out }}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg mx-auto mb-3 border transition-all duration-300",
                    p.support === "full"
                      ? "bg-white/[0.03] border-white/[0.04] group-hover:border-blue-500/15"
                      : "bg-amber-500/[0.06] border-amber-500/10"
                  )}
                >
                  {p.icon === "Monitor" && <Monitor className="h-4 w-4 text-white/30" />}
                  {p.icon === "Smartphone" && <Smartphone className="h-4 w-4 text-white/30" />}
                  {p.icon === "Tablet" && <Tablet className="h-4 w-4 text-white/30" />}
                  {p.icon === "Terminal" && <Terminal className="h-4 w-4 text-white/30" />}
                  {p.icon === "Globe" && <Globe className="h-4 w-4 text-white/30" />}
                </div>
                <p className="text-xs font-medium text-white/50 mb-1">{p.name}</p>
                <span
                  className={cn(
                    "text-[9px] font-mono uppercase tracking-wider",
                    p.support === "full" ? "text-emerald-400/40" : "text-amber-400/40"
                  )}
                >
                  {p.method}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ FEATURES ═══ */}
        <motion.section
          ref={featuresRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Highlights" title="Features" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 hover:border-blue-500/15 hover:bg-blue-500/[0.02] transition-all duration-300"
                initial={{ opacity: 0, y: 12 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0.1 + i * 0.04, duration: NORMAL, ease: ease.out }}
                whileHover={{ y: -2 }}
              >
                <h3 className="text-sm font-medium text-white/60 group-hover:text-white/75 transition-colors mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-white/25 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ═══ SYSTEM REQUIREMENTS ═══ */}
        <motion.section
          ref={requirementsRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={requirementsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Requirements" title="System Requirements" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-white/[0.03] border border-white/[0.04] flex items-center justify-center">
                  <Cpu className="h-3.5 w-3.5 text-white/25" />
                </div>
                <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Minimum
                </h3>
              </div>
              <p className="text-[13px] text-white/30 leading-relaxed">
                {product.minimumRequirements}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-blue-500/[0.06] border border-blue-500/10 flex items-center justify-center">
                  <Layers className="h-3.5 w-3.5 text-blue-400/50" />
                </div>
                <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Recommended
                </h3>
              </div>
              <p className="text-[13px] text-white/30 leading-relaxed">
                {product.recommendedRequirements}
              </p>
            </div>
          </div>
        </motion.section>

        {/* ═══ INSTALLATION ═══ */}
        <motion.section
          ref={installRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={installInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader label="Setup" title="Installation Guide" />
          <PlatformTabs platforms={platformSteps} />
        </motion.section>

        {/* ═══ RELEASE NOTES ═══ */}
        <motion.section
          ref={releaseRef}
          className="mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={releaseInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          <SectionHeader
            label="Changelog"
            title="Release Notes"
            action={
              <Link
                href="/portfolio-app/release-notes"
                className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors duration-200"
              >
                Full History
                <ArrowRight className="h-3 w-3" />
              </Link>
            }
          />
          <ReleaseTimeline releases={releases} />
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

          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-6">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "Full Documentation", description: "Overview, features, and architecture", href: "/portfolio-app", icon: BookOpen },
              { title: "Platform Support", description: "Browser and OS compatibility details", href: "/portfolio-app/platform-support", icon: Globe },
              { title: "Offline Experience", description: "How caching and offline access work", href: "/portfolio-app/offline", icon: Download },
              { title: "Privacy", description: "What data is and is not collected", href: "/portfolio-app/privacy", icon: ShieldCheck },
              { title: "Release Notes", description: "Changelog and version history", href: "/portfolio-app/release-notes", icon: Tag },
              { title: "FAQ", description: "Answers to common questions", href: "/portfolio-app/faq", icon: Info },
            ].map((link, i) => (
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
              <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-4">
                Ready to install?
              </h2>
              <p className="text-sm text-white/30 mb-8 max-w-md mx-auto">
                Get the native app experience with faster loading, automatic
                updates, and offline access.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <DownloadFlow
                  productName="Portfolio App"
                  version={APP_VERSION}
                />
                <Link
                  href="/downloads"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-6 py-3.5 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.1] transition-all duration-200 min-h-[48px]"
                >
                  All Products
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
