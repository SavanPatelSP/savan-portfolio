"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Trash2,
  Lock,
  CheckCircle,
  User,
  MessageSquare,
} from "lucide-react";
import { ease, FAST } from "@/lib/motion";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const principles = [
  {
    title: "No Tracking",
    description:
      "This portfolio does not use Google Analytics, Plausible, or any tracking script. I have no interest in knowing where you clicked or how long you stayed.",
    icon: Eye,
  },
  {
    title: "No Ads",
    description:
      "There are no advertisements, no ad networks, and no sponsored content. This site exists to showcase my work, not to monetize your attention.",
    icon: CheckCircle,
  },
  {
    title: "No Cookies",
    description:
      "This site does not use advertising or tracking cookies. A one-time Website Preferences notice may appear to remember your choice using browser localStorage — a local-only preference store. No personal data is collected or transmitted.",
    icon: Trash2,
  },
  {
    title: "Minimal Data",
    description:
      "The only way I collect any data is through the contact form, and that is only so I can reply to you. That is it.",
    icon: User,
  },
];

const howItWorks = [
  {
    title: "Visitor Data",
    description:
      "When you visit this portfolio, your browser sends standard HTTP headers — IP address, user agent, and referrer. These are handled by the hosting provider for serving the page and are not stored or analyzed by me.",
  },
  {
    title: "Contact Form",
    description:
      "If you reach out through the contact form, I receive your name, email, and message. I use this solely to respond to you. I do not add you to any mailing list or share your information with anyone.",
  },
  {
    title: "Third-Party Services",
    description:
      "This site is hosted on Vercel and uses GitHub for source code. Both are privacy-respecting platforms. No third-party analytics, advertising, or data broker services are involved.",
  },
  {
    title: "Data Retention",
    description:
      "Contact form messages are kept only as long as needed to maintain our conversation. If you want your message deleted, just ask — I will remove it promptly.",
  },
];

const principles2 = [
  "I treat your visit as a guest in my digital home — no surveillance, no profiling.",
  "If I ever add a feature that changes how data is handled, I will update this page first.",
  "I believe the best privacy policy is one where there is almost nothing to policy.",
  "I read privacy policies before using services myself, so I know how annoying bad ones are.",
  "This portfolio is a personal project, not a data collection operation.",
];

const faqItems = [
  {
    question: "Does this site use cookies?",
    answer:
      "No. This site does not use advertising cookies, tracking cookies, or analytics cookies. A Website Preferences notice may appear once to remember whether you accepted or declined the notice. That preference is stored locally in your browser using localStorage — a browser-native storage mechanism that does not transmit data to any server. No third-party cookies are set. See the Cookies & Local Storage page at /trust/cookies for full details.",
  },
  {
    question: "Do you use Google Analytics or any analytics?",
    answer:
      "No. There is no analytics on this site — no Google Analytics, no Plausible, no Hotjar, no nothing. I do not track page views, session duration, or user behavior in any way.",
  },
  {
    question: "What happens when I submit the contact form?",
    answer:
      "When you submit the contact form, I receive your name, email, and message directly. I use this solely to reply to you. Your information is not stored in a database, not added to any list, and not shared with anyone. It is a simple, direct communication.",
  },
  {
    question: "Do you sell or share my data?",
    answer:
      "No. I have no data to sell and no interest in selling it. There are no advertising partners, no data brokers, and no third parties receiving your information. Your data stays between you and me.",
  },
  {
    question: "Can I request deletion of my data?",
    answer:
      "Absolutely. If you have contacted me and want your message deleted, reach out via PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT or email me at savan@sp-net.in. I will remove your data promptly and confirm when it is done.",
  },
  {
    question: "What if you add analytics in the future?",
    answer:
      "If I ever decide to add any form of tracking or analytics, I will update this page to explain what is being collected and why. I would also add a proper consent mechanism. But honestly, I have no plans to do that.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trust", href: "/trust" },
          { label: "Privacy" },
        ]}
        label="Trust"
        title="Privacy"
        titleAccent="How I respect your privacy"
        description="This portfolio is simple. It does not track you, it does not sell your data, and it does not use cookies. Here is everything you need to know about how this site handles your information."
        icon={<Shield className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                My Approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Privacy is not a policy
                <br />
                <span className="text-white/40">it is a default</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  I built this portfolio to share my work, not to collect your data.
                  There is no tracking script, no analytics dashboard, and no advertising
                  network watching what you do here.
                </p>
                <p>
                  The only time I even know you exist is if you choose to reach out through
                  the contact form. And even then, I only keep what I need to reply to you.
                </p>
                <p>
                  I care about privacy because I care about trust. If I want people to trust
                  me with their projects, I should start by respecting their privacy on my
                  own site.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Principles"
            title="How I think about privacy"
            subtitle="Four things I keep in mind when making decisions about data on this site."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {principles.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <principle.icon className="h-4 w-4 text-white/25" />
                    <h3 className="text-base font-medium text-white/70">{principle.title}</h3>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="The Details"
            title="What actually happens with your data"
            subtitle="No jargon, no fine print — just the plain truth about how this site works."
          />

          <div className="space-y-4 max-w-3xl">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <MessageSquare className="h-4 w-4 text-blue-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{item.title}</h3>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="My Promises"
            title="What I commit to"
            subtitle="Personal commitments that go beyond what is technically required."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-0 max-w-3xl">
              {principles2.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 py-4 border-b border-white/[0.04]"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: FAST, delay: i * 0.04, ease: ease.out }}
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400/50 mt-0.5 shrink-0" />
                  <p className="text-sm text-white/50 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="At a Glance"
            title="Privacy summary"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {[
              { value: "0", label: "Cookies", icon: Trash2 },
              { value: "0", label: "Trackers", icon: Eye },
              { value: "0", label: "Ads", icon: CheckCircle },
              { value: "E2E", label: "Encrypted", icon: Lock },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-white/60 mb-1">{stat.value}</p>
                  <p className="text-[11px] text-white/35">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <FAQ title="Privacy FAQ" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Security",
            description: "How I approach security in my development work.",
            href: "/trust/security",
          },
          {
            title: "Transparency",
            description: "How I build openly and share progress honestly.",
            href: "/trust/transparency",
          },
          {
            title: "Contact",
            description: "Get in touch — I actually read and respond to every message.",
            href: "/get-in-touch",
          },
        ]}
      />

      <CTASection
        title="Questions about"
        titleAccent="your privacy?"
        description="If you have any questions about how I handle data on this site, reach out. I am happy to talk about it."
        primaryAction={{ label: "Contact me", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "View trust center", href: "/trust" }}
      />
    </>
  );
}
