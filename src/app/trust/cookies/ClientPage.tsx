"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  HardDrive,
  Cookie,
  Shield,
  Globe,
  Settings,
  RefreshCw,
  Copy,
  Trash2,
  Check,
  ArrowRight,
  Activity,
  Lock,
  Eye,
  X,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { CTASection } from "@/components/ui/CTASection";
import { cn } from "@/lib/utils";
import { FAST, ease, spring } from "@/lib/motion";
import type { FAQItem } from "@/data/faqs";

type LocalFAQItem = Omit<FAQItem, "category" | "links" | "related">;

const STORAGE_KEY = "cookie-consent";

const statusCards = [
  { icon: Cookie, label: "No Advertising Cookies", color: "text-emerald-400/70" },
  { icon: Globe, label: "No Cross-site Tracking", color: "text-emerald-400/70" },
  { icon: Lock, label: "Browser-only Storage", color: "text-emerald-400/70" },
  { icon: Eye, label: "User Controlled", color: "text-emerald-400/70" },
] as const;

const flowSteps = [
  { icon: Globe, label: "Browser" },
  { icon: HardDrive, label: "localStorage" },
  { icon: Shield, label: "Saved" },
  { icon: Check, label: "Remembered" },
] as const;

const comparisonItems = [
  {
    title: "Cookies",
    features: [
      { label: "Sent to server", value: true },
      { label: "Can be used for tracking", value: true },
      { label: "Set by third parties", value: true },
      { label: "Used by this site", value: false },
    ],
  },
  {
    title: "localStorage",
    features: [
      { label: "Stays on your device", value: true },
      { label: "Never sent to server", value: true },
      { label: "No third-party access", value: true },
      { label: "Used by this site", value: true },
    ],
  },
] as const;

const faqItems: LocalFAQItem[] = [
  {
    question: "Does this site use cookies?",
    answer:
      "No. SP NET INC does not use advertising cookies, tracking cookies, or analytics cookies. A Website Preferences notice may appear once to remember whether you accepted or declined it. That preference is stored locally in your browser using localStorage — a local-only storage mechanism. No personal data is collected or transmitted.",
  },
  {
    question: "What is browser localStorage?",
    answer:
      "localStorage is a browser-native storage mechanism that lets websites save small amounts of data locally on your device. Unlike cookies, localStorage data is never sent to any server. It is entirely local to your browser. SP NET INC uses it only to remember your preference about the Website Preferences notice.",
  },
  {
    question: "What does the Website Preferences notice store?",
    answer:
      "The notice stores a single value: whether you accepted or declined the preference notice. This is stored under the key 'cookie-consent' with a value of either 'accepted' or 'declined'. No names, email addresses, or any other personal information is stored.",
  },
  {
    question: "Can I clear my browser preferences?",
    answer:
      "Yes. You can clear localStorage through your browser's developer tools (Application tab → Local Storage) or through your browser settings. Clearing it will cause the Website Preferences notice to reappear the next time you visit the site.",
  },
  {
    question: "What is the difference between cookies and localStorage?",
    answer:
      "Cookies are small text files that websites can set on your browser. Cookies are sent to the server with every HTTP request, which is why they can be used for tracking. localStorage is a browser-only storage mechanism that stays on your device and is never transmitted to any server. SP NET INC uses localStorage, not cookies.",
  },
  {
    question: "Does localStorage collect any personal data?",
    answer:
      "No. The only localStorage entry used by SP NET INC is 'cookie-consent', which stores a simple preference string ('accepted' or 'declined'). No personal information, device identifiers, or behavioral data is stored.",
  },
  {
    question: "Does this site use Google Analytics or any tracking?",
    answer:
      "No. SP NET INC does not use Google Analytics, Plausible, Hotjar, or any other analytics or tracking service. There are no third-party scripts that monitor your behavior on this site.",
  },
  {
    question: "Can I contact you about data privacy?",
    answer:
      "Yes. If you have any questions about data privacy, you can reach out via the PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT or email at savan@sp-net.in. For full privacy details, visit the Privacy Policy page.",
  },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Trust", href: "/trust" },
  { label: "Cookies & Local Storage" },
];

/* ═══════════════════════════════════════════════════════════════
   STORAGE INSPECTOR COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function StorageInspector() {
  const [storageData, setStorageData] = useState<{
    key: string;
    value: string;
    size: number;
    exists: boolean;
  }>({ key: STORAGE_KEY, value: "", size: 0, exists: false });
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(() => {
    if (typeof window === "undefined") return;
    const value = localStorage.getItem(STORAGE_KEY) ?? "";
    const exists = value.length > 0;
    const encoder = new TextEncoder();
    const size = encoder.encode(STORAGE_KEY + value).length;
    setStorageData({ key: STORAGE_KEY, value: exists ? value : "(not set)", size, exists });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`${storageData.key}=${storageData.value}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [storageData.key, storageData.value]);

  const handleReset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    refresh();
  }, [refresh]);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="h-3.5 w-3.5 text-white/25" />
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25">Storage Inspector</span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            onClick={refresh}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-white/50 hover:bg-white/[0.04] transition-colors"
            whileTap={{ scale: 0.9, rotate: 180 }}
            transition={spring.snappy}
            aria-label="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </motion.button>
          <motion.button
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-red-400/50 hover:bg-red-500/[0.04] transition-colors"
            whileTap={{ scale: 0.9 }}
            transition={spring.snappy}
            aria-label="Clear stored preference"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>

      <div className="px-5 pb-3 space-y-2">
        {[
          { label: "Location", value: "Browser localStorage", mono: false },
          { label: "Key", value: storageData.key, mono: true },
          { label: "Value", value: storageData.value, mono: true },
          { label: "Size", value: `${storageData.size} bytes`, mono: true },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between py-1.5">
            <span className="text-xs text-white/25">{row.label}</span>
            <span className={cn("text-xs text-white/45", row.mono && "font-mono")}>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="px-5 pb-4 flex items-center gap-2">
        <motion.button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-medium text-white/35 hover:text-white/55 transition-colors"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)" }}
          whileTap={{ scale: 0.97 }}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400/60" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy to Clipboard"}
        </motion.button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOW DIAGRAM COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function FlowDiagram() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-1">
        {flowSteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center flex-1">
              <motion.div
                className="flex flex-col items-center gap-2 flex-1 min-w-0"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.1, ease: ease.out }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <Icon className="h-4 w-4 text-white/40" />
                </div>
                <span className="text-[10px] text-white/30 text-center leading-tight whitespace-nowrap">{step.label}</span>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: FAST, delay: 0.15 + i * 0.1, ease: ease.out }}
                  className="origin-left shrink-0 -mx-1"
                >
                  <ArrowRight className="h-3 w-3 text-white/15" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CLIENT PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ClientPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbItems}
        label="Trust"
        title="Cookies & Local Storage"
        titleAccent="How browser preferences work"
        description="How this site uses browser storage for preference management. No advertising cookies, no tracking, privacy by default."
        icon={<Cookie className="h-4 w-4" />}
      />

      {/* ═══ PRIVACY DASHBOARD ═══ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-['Inter'] text-lg font-medium text-white">
              Privacy Dashboard
            </h2>
            <p className="mb-8 text-sm text-white/40 font-['Inter']">
              Real-time status of your privacy protections on this site.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {statusCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl px-4 py-4"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: FAST, delay: i * 0.08, ease: ease.out }}
                  whileHover={{ borderColor: "rgba(59,130,246,0.15)", backgroundColor: "rgba(59,130,246,0.03)" }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                    <Check className="h-4 w-4 text-emerald-400/70" />
                  </div>
                  <span className="text-xs font-medium text-white/50 leading-tight">{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS - FLOW DIAGRAM ═══ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-['Inter'] text-lg font-medium text-white">
              How It Works
            </h2>
            <p className="mb-8 text-sm text-white/40 font-['Inter']">
              Your preference flows directly from your browser to local storage — never leaving your device.
            </p>
          </motion.div>

          <FlowDiagram />
        </div>
      </section>

      {/* ═══ STORAGE INSPECTOR ═══ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-['Inter'] text-lg font-medium text-white">
              Storage Inspector
            </h2>
            <p className="mb-8 text-sm text-white/40 font-['Inter']">
              View and manage the single localStorage entry this site uses.
            </p>
          </motion.div>

          <StorageInspector />
        </div>
      </section>

      {/* ═══ COOKIES VS LOCALSTORAGE ═══ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-['Inter'] text-lg font-medium text-white">
              Cookies vs localStorage
            </h2>
            <p className="mb-8 text-sm text-white/40 font-['Inter']">
              Understanding the key differences between these two storage mechanisms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {comparisonItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-sm font-medium text-white/70 mb-4">{item.title}</h3>
                <div className="space-y-3">
                  {item.features.map((feature) => (
                    <div key={feature.label} className="flex items-center justify-between">
                      <span className="text-xs text-white/40">{feature.label}</span>
                      {feature.value ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400/60" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-white/15" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTENT SECTIONS ═══ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {[
              {
                icon: Cookie,
                title: "What Are Cookies?",
                description:
                  "Cookies are small text files that websites can set on your browser. They are commonly used for session management, personalization, and tracking. Cookies are sent to the server with every HTTP request, which is why they can be used for cross-site tracking. SP NET INC does not use cookies.",
              },
              {
                icon: Shield,
                title: "Does SP NET INC Use Cookies?",
                description:
                  "No. This site does not use advertising cookies, tracking cookies, or analytics cookies. There are no third-party cookies set by this site. The only browser storage mechanism in use is localStorage for the Website Preferences notice.",
              },
              {
                icon: HardDrive,
                title: "Browser localStorage",
                description:
                  "localStorage is a browser-native storage mechanism that lets websites save small amounts of data locally on your device. Unlike cookies, localStorage data is never sent to any server. SP NET INC uses localStorage to store a single preference: whether you accepted or declined the Website Preferences notice.",
              },
              {
                icon: Settings,
                title: "Why Preferences Are Stored Locally",
                description:
                  "The Website Preferences notice is stored in localStorage so you do not need to see it on every page load. Without localStorage, the notice would reappear every time you visit the site. The stored value is a simple string: 'accepted' or 'declined'. No personal information is stored.",
              },
              {
                icon: Globe,
                title: "Third-Party Services",
                description:
                  "SP NET INC uses Resend for email delivery and Vercel for hosting. Resend processes form submissions to deliver emails directly to the site operator. Vercel provides infrastructure hosting. Neither service sets tracking cookies through this site. For details, see the Privacy Policy.",
              },
              {
                icon: Activity,
                title: "Analytics",
                description:
                  "SP NET INC does not use any analytics service. There is no Google Analytics, no Plausible, no Hotjar, no tracking pixels, no session recording. The site operator does not monitor page views, session duration, or user behavior in any way.",
              },
              {
                icon: Settings,
                title: "Managing Browser Data",
                description:
                  "You can clear localStorage through your browser's developer tools (Application tab → Local Storage) or through your browser settings. Clearing it will cause the Website Preferences notice to reappear. You can also block localStorage entirely through your browser settings, though this may affect other websites.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  className="rounded-2xl border p-6 sm:p-8"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                      <item.icon className="h-5 w-5 text-white/50" />
                    </div>
                    <div>
                      <h3 className="text-white mb-2 font-['Inter']">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/40 font-['Inter']">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 font-['Inter'] text-lg font-medium text-white">
              Frequently Asked Questions
            </h2>
            <p className="mb-8 text-sm text-white/40 font-['Inter']">
              Common questions about browser storage and privacy.
            </p>
          </motion.div>

          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  className={cn(
                    "rounded-2xl border transition-all duration-200",
                    openFaqIndex === index
                      ? "border-white/[0.12] bg-white/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10] hover:bg-white/[0.03]"
                  )}
                >
                  <button
                    onClick={() =>
                      setOpenFaqIndex(openFaqIndex === index ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={openFaqIndex === index}
                  >
                    <span className="text-sm font-medium text-white/70 font-['Inter']">
                      {item.question}
                    </span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 shrink-0 text-white/30 transition-transform duration-200",
                        openFaqIndex === index && "rotate-90"
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="text-sm leading-relaxed text-white/40 font-['Inter']">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Questions about browser"
        titleAccent="storage?"
        description="Reach out through PCA for any questions about how data is stored on this site."
        primaryAction={{ label: "Contact via PCA", href: "https://t.me/SAVANPATELSP_BOT" }}
        secondaryAction={{ label: "Privacy Policy", href: "/trust/privacy" }}
      />

      <RelatedPages
        title="Related"
        pages={[
          { title: "Privacy Policy", description: "How this portfolio handles your data — no tracking, no ads.", href: "/trust/privacy" },
          { title: "Security", description: "How I protect data and handle vulnerabilities.", href: "/trust/security" },
          { title: "Trust Center", description: "Overview of all trust, privacy, and security practices.", href: "/trust" },
        ]}
      />
    </>
  );
}
