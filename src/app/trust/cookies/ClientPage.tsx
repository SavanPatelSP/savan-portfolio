"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  HardDrive,
  Cookie,
  Monitor,
  Database,
  Shield,
  Search,
  Globe,
  Settings,
  X,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { CTASection } from "@/components/ui/CTASection";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/data/faqs";

type LocalFAQItem = Omit<FAQItem, "category" | "links" | "related">;

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

      <section className="px-6 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6">
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
                icon: Database,
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
                icon: Search,
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
