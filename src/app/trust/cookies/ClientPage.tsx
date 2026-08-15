"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
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
import { FAQ } from "@/components/ui/FAQ";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
} from "@/components/ui/AnimationPrimitives";
import { cn } from "@/lib/utils";
import { FAST, ease } from "@/lib/motion";

const STORAGE_KEY = "cookie-consent";

const statusCards = [
  { icon: Cookie, label: "No Advertising Cookies" },
  { icon: Globe, label: "No Cross-site Tracking" },
  { icon: Lock, label: "Browser-only Storage" },
  { icon: Eye, label: "User Controlled" },
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

const contentSections = [
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
      "SP NET INC uses a third-party email service for delivery and a global edge network for hosting. The email service processes form submissions to deliver emails directly to the site operator. The hosting provider provides infrastructure services. Neither service sets tracking cookies through this site. For details, see the Privacy Policy.",
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
];

const faqItems = [
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

type StorageSnapshot = { key: string; value: string; size: number; exists: boolean };

const EMPTY_STORAGE_SNAPSHOT: StorageSnapshot = Object.freeze({
  key: STORAGE_KEY,
  value: "(not set)",
  size: 0,
  exists: false,
});

let cachedStorageSnapshot: StorageSnapshot = EMPTY_STORAGE_SNAPSHOT;
let hasReadStorage = false;
const storageSubscribers = new Set<() => void>();

function readStorageSnapshot(): StorageSnapshot {
  try {
    const value = localStorage.getItem(STORAGE_KEY) ?? "";
    const exists = value.length > 0;
    const size = new TextEncoder().encode(STORAGE_KEY + value).length;
    return { key: STORAGE_KEY, value: exists ? value : "(not set)", size, exists };
  } catch {
    return EMPTY_STORAGE_SNAPSHOT;
  }
}

function refreshStorageSnapshot() {
  cachedStorageSnapshot = readStorageSnapshot();
  storageSubscribers.forEach((listener) => listener());
}

function subscribeToStorage(callback: () => void): () => void {
  if (!hasReadStorage) {
    hasReadStorage = true;
    cachedStorageSnapshot = readStorageSnapshot();
  }
  storageSubscribers.add(callback);
  const handleStorage = (event: StorageEvent) => {
    if (event.storageArea === localStorage) {
      refreshStorageSnapshot();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    storageSubscribers.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getStorageSnapshot(): StorageSnapshot {
  return cachedStorageSnapshot;
}

function getStorageServerSnapshot(): StorageSnapshot {
  return EMPTY_STORAGE_SNAPSHOT;
}

function StorageInspector() {
  const [copied, setCopied] = useState(false);

  const storageData = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    getStorageServerSnapshot,
  );

  const refresh = useCallback(() => {
    refreshStorageSnapshot();
  }, []);

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
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <HardDrive className="h-3.5 w-3.5 text-white/25" />
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25">Storage Inspector</span>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            onClick={refresh}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-white/50 hover:bg-white/[0.04] transition-colors"
            whileTap={{ scale: 0.9, rotate: 180 }}
            aria-label="Refresh"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </motion.button>
          <motion.button
            onClick={handleReset}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 hover:text-red-400/50 hover:bg-red-500/[0.04] transition-colors"
            whileTap={{ scale: 0.9 }}
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
          <div key={row.label} className="flex items-center justify-between gap-4 py-1.5">
            <span className="text-xs text-white/25 shrink-0">{row.label}</span>
            <span className={cn("text-xs text-white/45 truncate", row.mono && "font-mono")}>{row.value}</span>
          </div>
        ))}
      </div>

      <div className="px-5 pb-4">
        <motion.button
          onClick={handleCopy}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.04] bg-white/[0.03] py-2.5 text-xs font-medium text-white/35 hover:text-white/55 hover:border-white/[0.08] transition-colors"
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
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-5">
      <div className="flex items-center gap-1">
        {flowSteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center flex-1 min-w-0">
              <motion.div
                className="flex flex-col items-center gap-2 flex-1 min-w-0"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.1, ease: ease.out }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0 border border-white/[0.06] bg-white/[0.02]">
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
                  aria-hidden="true"
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

      <SectionContainer>
        <SectionTitle
          label="Dashboard"
          title="Privacy dashboard"
          subtitle="Real-time status of your privacy protections on this site."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl">
          {statusCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.01] px-4 py-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.08, ease: ease.out }}
                whileHover={{ borderColor: "rgba(59,130,246,0.15)", backgroundColor: "rgba(59,130,246,0.03)" }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                  <Check className="h-4 w-4 text-emerald-400/70" />
                </div>
                <span className="text-xs font-medium text-white/50 leading-tight">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="How It Works"
          title="Your preference stays on your device"
          subtitle="Your preference flows directly from your browser to local storage — never leaving your device."
        />

        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <FlowDiagram />
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Storage Inspector"
          title="Inspect what is stored"
          subtitle="View and manage the single localStorage entry this site uses."
        />

        <div className="max-w-4xl">
          <FadeIn delay={0.1}>
            <StorageInspector />
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Comparison"
          title="Cookies vs localStorage"
          subtitle="Understanding the key differences between these two storage mechanisms."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
          {comparisonItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: FAST, delay: i * 0.1, ease: ease.out }}
            >
              <h3 className="text-sm font-medium text-white/70 mb-4">{item.title}</h3>
              <div className="space-y-3">
                {item.features.map((feature) => (
                  <div key={feature.label} className="flex items-center justify-between gap-4">
                    <span className="text-xs text-white/40">{feature.label}</span>
                    {feature.value ? (
                      <Check className="h-3.5 w-3.5 text-emerald-400/60 shrink-0" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-white/15 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="The Details"
          title="Everything about browser storage"
          subtitle="What cookies are, what this site uses instead, and how you stay in control."
        />

        <div className="space-y-4 max-w-4xl">
          {contentSections.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: FAST, delay: i * 0.05, ease: ease.out }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  <item.icon className="h-5 w-5 text-white/50" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-white/70 mb-1.5">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/35">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages
        title="Related"
        pages={[
          { title: "Privacy Policy", description: "How this portfolio handles your data — no tracking, no ads.", href: "/trust/privacy" },
          { title: "Security", description: "How I protect data and handle vulnerabilities.", href: "/trust/security" },
          { title: "Trust Center", description: "Overview of all trust, privacy, and security practices.", href: "/trust" },
        ]}
      />

      <CTASection
        title="Questions about browser"
        titleAccent="storage?"
        description="Reach out through PCA for any questions about how data is stored on this site."
        primaryAction={{ label: "Contact via PCA", href: "https://t.me/SAVANPATELSP_BOT" }}
        secondaryAction={{ label: "Privacy Policy", href: "/trust/privacy" }}
      />
    </>
  );
}
