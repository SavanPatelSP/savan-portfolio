"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Monitor,
  Smartphone,
  Zap,
  Wifi,
  RefreshCw,
  Shield,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Laptop,
  Terminal,
  Share,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, SLOW, NORMAL, FAST } from "@/lib/motion";
import { type BeforeInstallPromptEvent, isStandalone } from "@/lib/pwa";
import { faqs as portfolioFaqs } from "@/data/portfolio-app";

const features = [
  {
    icon: Zap,
    title: "Faster Launching",
    description: "Opens instantly from your desktop or home screen without opening a browser.",
  },
  {
    icon: Monitor,
    title: "Native Experience",
    description: "Runs in its own window with no browser chrome — clean, distraction-free interface.",
  },
  {
    icon: Wifi,
    title: "Offline Access",
    description: "Previously viewed pages remain available even without an internet connection.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Updates",
    description: "Always stays up to date with the latest content and improvements.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "No tracking, no analytics, no data collection. Your browsing stays private.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Works beautifully on Android and iOS with a touch-optimized experience.",
  },
];

const platforms = [
  {
    name: "Windows",
    icon: Monitor,
    support: "Full Support",
    method: "Chrome, Edge — click install icon in address bar",
    details: "Chrome 67+, Edge 79+",
  },
  {
    name: "macOS",
    icon: Laptop,
    support: "Full Support",
    method: "Chrome, Edge, Safari — install from menu or address bar",
    details: "Chrome 67+, Safari 14.1+, Edge 79+",
  },
  {
    name: "Linux",
    icon: Terminal,
    support: "Full Support",
    method: "Chrome, Edge — click install icon in address bar",
    details: "Chrome 67+, Edge 79+",
  },
  {
    name: "Android",
    icon: Smartphone,
    support: "Full Support",
    method: "Chrome — tap 'Add to Home Screen' from menu",
    details: "Chrome 67+, Samsung Internet 14+",
  },
  {
    name: "iOS",
    icon: Smartphone,
    support: "Guided Install",
    method: "Safari — tap Share → 'Add to Home Screen'",
    details: "Safari 14.1+ (iOS 15+)",
  },
];

const faqs = portfolioFaqs.slice(0, 6).map((f) => ({ q: f.question, a: f.answer }));

function FAQItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.04] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left min-h-[48px]"
        aria-expanded={open}
      >
        <span className="text-sm text-white/60 font-medium pr-4">{faq.q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/20 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: FAST, ease: ease.out }}
          className="overflow-hidden"
        >
          <p className="text-sm text-white/30 leading-relaxed pb-5">{faq.a}</p>
        </motion.div>
      )}
    </div>
  );
}

export function InstallPageClient() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsInstalled(isStandalone());

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setInstalling(false);
    if (outcome === "accepted") setIsInstalled(true);
  }, [deferredPrompt]);

  return (
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
            Progressive Web App
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[0.92]">
            Install the
            <br />
            <span className="text-white/40">Portfolio App</span>
          </h1>

          <p className="mt-6 mx-auto max-w-lg text-base text-white/30 leading-relaxed">
            Experience the portfolio as a native desktop or mobile application.
            Faster, cleaner, and available offline.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {isInstalled ? (
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 text-sm font-medium text-emerald-400/80">
                <CheckCircle2 className="h-4 w-4" />
                Already Installed
              </div>
            ) : deferredPrompt ? (
              <button
                onClick={handleInstall}
                disabled={installing}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px]"
              >
                <Download className="h-4 w-4" />
                {installing ? "Installing..." : "Install Now"}
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/[0.08] px-6 py-3 text-sm text-white/40 min-h-[48px]">
                <Download className="h-4 w-4" />
                Use your browser&apos;s install option
              </div>
            )}
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-6 py-3 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.1] transition-all duration-200 min-h-[48px]"
            >
              Back to Portfolio
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* ─── FEATURES ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">Benefits</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">Why install?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: NORMAL, ease: ease.out }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04] mb-4">
                  <f.icon className="h-4 w-4 text-white/30" />
                </div>
                <h3 className="text-sm font-medium text-white/60 mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/25 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── PLATFORMS ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">Compatibility</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">Platform support</h2>
          </div>
          <div className="rounded-xl border border-white/[0.04] overflow-hidden">
            {platforms.map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  "flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5",
                  i < platforms.length - 1 && "border-b border-white/[0.04]"
                )}
              >
                <div className="flex items-center gap-3 sm:w-40 shrink-0">
                  <p.icon className="h-5 w-5 text-white/40" />
                  <div>
                    <span className="text-sm font-medium text-white/60">{p.name}</span>
                    <span className="block text-[10px] text-emerald-400/50 font-mono mt-0.5">{p.support}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[13px] text-white/35">{p.method}</p>
                  <p className="text-[11px] text-white/15 mt-1">{p.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── OFFLINE ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                <Wifi className="h-4 w-4 text-white/30" />
              </div>
              <h2 className="text-xl font-semibold text-white/70 tracking-tight">Offline Experience</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-2">What works offline</h3>
                <ul className="space-y-2">
                  {["Homepage and navigation", "Previously viewed pages", "Static assets and images", "Fonts and icons"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-white/30">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white/50 mb-2">How caching works</h3>
                <p className="text-[13px] text-white/25 leading-relaxed">
                  The app uses a smart caching strategy. Core assets are cached on first visit.
                  Pages you visit are cached automatically. The app checks for updates each time
                  you connect to the internet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRIVACY ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.04]">
                <Shield className="h-4 w-4 text-white/30" />
              </div>
              <h2 className="text-xl font-semibold text-white/70 tracking-tight">Privacy</h2>
            </div>
            <p className="text-[13px] text-white/30 leading-relaxed max-w-2xl">
              The portfolio app collects no data. There are no analytics, no tracking cookies, and
              no telemetry. Your browsing history stays on your device. The service worker only
              caches assets to enable offline access — it never sends data to external servers.
            </p>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">Support</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] px-6">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        </section>

        {/* ─── TROUBLESHOOTING ─── */}
        <section className="mb-16 sm:mb-24">
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">Help</span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">Troubleshooting</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                issue: "Install option doesn't appear",
                fix: "Ensure you're using a supported browser (Chrome, Edge, or Safari). The install prompt appears after the browser determines the site meets PWA criteria. Try refreshing the page.",
              },
              {
                issue: "App shows browser frame after install",
                fix: "Some browsers need a restart after installation. Close and reopen the app. If the issue persists, uninstall and reinstall.",
              },
              {
                issue: "Offline pages show errors",
                fix: "Pages must be visited at least once while online to be cached. Visit the pages you want available offline, then they'll work without a connection.",
              },
              {
                issue: "iOS: no install prompt",
                fix: "iOS Safari doesn't support automatic install prompts. Use the Share button in Safari's toolbar, then tap 'Add to Home Screen'.",
              },
            ].map((item) => (
              <div key={item.issue} className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5">
                <h3 className="text-sm font-medium text-white/50 mb-1">{item.issue}</h3>
                <p className="text-[13px] text-white/25 leading-relaxed">{item.fix}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="text-center">
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white/70 tracking-tight mb-4">
              Ready to install?
            </h2>
            <p className="text-sm text-white/30 mb-8 max-w-md mx-auto">
              Get the native app experience with faster loading and offline access.
            </p>
            {deferredPrompt && !isInstalled ? (
              <button
                onClick={handleInstall}
                disabled={installing}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px]"
              >
                <Download className="h-4 w-4" />
                {installing ? "Installing..." : "Install Now"}
              </button>
            ) : isInstalled ? (
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-8 py-3.5 text-sm font-medium text-emerald-400/80 min-h-[48px]">
                <CheckCircle2 className="h-4 w-4" />
                App Installed
              </div>
            ) : (
              <p className="text-sm text-white/25">
                Use your browser&apos;s install option in the address bar or menu.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
