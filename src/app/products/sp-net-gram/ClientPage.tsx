"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Shield,
  Users,
  Palette,
  Cloud,
  Code,
  Lock,
  Zap,
  Globe,
  Settings,
  Bell,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
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
  Reveal,
} from "@/components/ui/AnimationPrimitives";
import { Badge } from "@/components/ui/Badge";

const features = [
  {
    icon: Shield,
    title: "End-to-End Encryption",
    description:
      "Every message, call, and media file is protected with state-of-the-art end-to-end encryption. Your conversations stay between you and the people you trust.",
  },
  {
    icon: MessageCircle,
    title: "Premium Communication",
    description:
      "Rich messaging with reactions, replies, threads, voice notes, video calls, and screen sharing. Built for people who expect more from their messaging app.",
  },
  {
    icon: Palette,
    title: "Deep Customization",
    description:
      "Themes, chat wallpapers, notification sounds, font sizes, and layout preferences. SP NET GRAM adapts to your style, not the other way around.",
  },
  {
    icon: Users,
    title: "Communities & Groups",
    description:
      "Create communities with channels, roles, pinned messages, and admin tools. Built for teams, friend groups, and communities of any size.",
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description:
      "Seamlessly sync your messages, media, and settings across all your devices. Pick up any conversation exactly where you left off.",
  },
  {
    icon: Code,
    title: "Developer API",
    description:
      "A powerful API and bot framework lets developers build integrations, automate workflows, and extend the platform to fit specialized needs.",
  },
];

const highlights = [
  {
    icon: Lock,
    label: "Privacy Focused",
    description:
      "Zero-access encryption, no ads, no tracking. Your data belongs to you — period.",
  },
  {
    icon: Zap,
    label: "Lightning Fast",
    description:
      "Optimized protocol delivers messages in milliseconds. Typing indicators, read receipts, and delivery confirmations happen in real time.",
  },
  {
    icon: Globe,
    label: "Cross-Platform",
    description:
      "Native apps for iOS, Android, macOS, Windows, Linux, and a full-featured web client. One account, every screen.",
  },
  {
    icon: Settings,
    title: "Productivity Tools",
    label: "Productivity Tools",
    description:
      "Pinned messages, saved items, search across all conversations, message scheduling, and reminders keep your communication organized.",
  },
  {
    icon: Bell,
    label: "Smart Notifications",
    description:
      "Per-chat notification settings, quiet hours, mention-only mode, and smart summaries ensure you see what matters without the noise.",
  },
  {
    icon: Layers,
    label: "Media-Rich",
    description:
      "Send photos, videos, documents, polls, locations, contacts, and voice messages. A built-in media editor lets you crop, annotate, and compress before sending.",
  },
];

const faqItems = [
  {
    question: "What makes SP NET GRAM different from other messaging apps?",
    answer:
      "SP NET GRAM combines end-to-end encryption with a premium user experience. Most secure messaging apps sacrifice design and features for privacy. We refuse to make that trade-off — you get military-grade encryption alongside rich media support, deep customization, community tools, and a fluid interface that feels genuinely modern.",
  },
  {
    question: "Is SP NET GRAM really free to use?",
    answer:
      "Core messaging is completely free with no ads and no data mining. SP NET GRAM offers optional premium features — like custom themes, increased cloud storage, advanced analytics for communities, and priority support — through a subscription model that keeps the platform sustainable without compromising your privacy.",
  },
  {
    question: "How does the cloud sync work without compromising privacy?",
    answer:
      "Messages are encrypted on your device before being synced to the cloud. The server only ever sees encrypted blobs — it cannot read your messages, access your media, or analyze your communication patterns. Decryption happens exclusively on your trusted devices using keys that never leave them.",
  },
  {
    question: "Can I migrate my existing chats from other platforms?",
    answer:
      "Yes. SP NET GRAM includes import tools for migrating chat history from WhatsApp, Telegram, and Signal. Media, group memberships, and contact associations transfer seamlessly so you can switch without losing your conversations.",
  },
  {
    question: "When will SP NET GRAM be available?",
    answer:
      "SP NET GRAM is currently in active development. We are building the core messaging infrastructure, encryption protocol, and cross-platform clients. Join the waitlist to get early access when we launch our beta program.",
  },
];

const relatedPages = [
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration, redesigned for modern organizations.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET Ecosystem",
    description: "The interconnected platform powering all SP NET products.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET AI",
    description: "Intelligent automation and AI-powered tools across the platform.",
    href: "/products/sp-net-ai",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
  {
    title: "Founder's Journey",
    description: "From early experiments to building SP NET — the full story.",
    href: "/founder/journey",
  },
  {
    title: "Product Roadmap",
    description: "What we are building next and where SP NET is headed.",
    href: "/founder/roadmap",
  },
];

export default function SPNetGramClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET GRAM" }]}
        label="Messaging Platform"
        badge="Building"
        title="SP NET GRAM"
        titleAccent="Messaging reimagined for the modern world"
        description="A next-generation messaging platform focused on privacy, productivity, premium experiences, modern communication, customization, and powerful user tools."
        icon={<MessageCircle className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Built for how people actually communicate"
            subtitle="SP NET GRAM rethinks what a messaging platform should be. Not just another chat app — a comprehensive communication system that respects your privacy, adapts to your workflow, and delivers the premium experience people deserve."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Modern messaging is broken. Apps that claim to be free monetize your data. Secure options
                feel stripped down and utilitarian. Feature-rich platforms bombard you with notifications and
                clutter. SP NET GRAM takes a different approach — building a messaging experience where
                privacy is foundational, not optional, and where every feature is designed with intention.
              </p>
              <p>
                From the ground up, SP NET GRAM is engineered for people who take their communication
                seriously. Whether you are coordinating with a distributed team, staying close with family
                across time zones, or building a community around shared interests, SP NET GRAM provides
                the tools — without the compromises.
              </p>
              <p>
                The platform is built on a custom encryption protocol that ensures zero-access privacy while
                maintaining the speed and reliability people expect from a modern messaging app. Your
                messages, calls, and media are encrypted on your device before they ever leave — and
                only your trusted devices hold the keys.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="Everything you need, nothing you don't"
          subtitle="Six core pillars that define the SP NET GRAM experience — each one built from scratch with a focus on reliability, speed, and delight."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/8 text-blue-400 border border-blue-500/10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Highlights"
          title="Designed around what matters"
          subtitle="The details that make SP NET GRAM stand apart — from encryption architecture to notification intelligence."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {highlights.map((item) => (
            <StaggerItem key={item.label}>
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1.5">
                    {item.label}
                  </h3>
                  <p className="text-xs text-white/20 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Architecture"
          title="Engineered for scale and privacy"
          subtitle="The technical foundation that makes SP NET GRAM possible."
        />

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white/50 mb-4">
                Encryption & Security
              </h3>
              <div className="space-y-3 text-xs text-white/25 leading-relaxed">
                <p>
                  SP NET GRAM uses a double-ratchet protocol with X3DH key agreement for
                  end-to-end encryption. Each device maintains its own key pairs, and forward secrecy
                  ensures that compromising one message never reveals past or future conversations.
                </p>
                <p>
                  Group conversations use Sender Keys with periodic re-keying, so adding or removing
                  members never exposes previous message history. Key verification through QR codes and
                  safety numbers gives users cryptographic proof of identity.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white/50 mb-4">
                Infrastructure & Performance
              </h3>
              <div className="space-y-3 text-xs text-white/25 leading-relaxed">
                <p>
                  A globally distributed edge network delivers messages with sub-100ms latency. Messages
                  are routed through the nearest relay node, and a smart queueing system handles
                  offline delivery, retry logic, and bandwidth optimization automatically.
                </p>
                <p>
                  Media uploads use chunked streaming with adaptive compression, so large files send
                  quickly even on slow connections. A peer-to-peer fallback for nearby devices reduces
                  server load and improves delivery speed for local conversations.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      <FAQ
        title="Frequently Asked Questions"
        items={faqItems}
      />

      <RelatedPages
        title="Explore More"
        pages={relatedPages}
      />

      <CTASection
        title="Ready to reimagine messaging?"
        description="SP NET GRAM is building the future of private, premium communication. Join the waitlist to get early access."
        primaryAction={{ label: "Join the Waitlist", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
