"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Rocket,
  Globe,
  Users,
  Shield,
  BrainCircuit,
  Sparkles,
  Target,
  Layers,
  Cpu,
  Zap,
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
} from "@/components/ui/AnimationPrimitives";

const shortTermGoals = [
  {
    icon: Rocket,
    title: "Launch the Betas",
    description:
      "Get SP NET GRAM and SP NET ADMIN OS into the hands of real users. Nothing teaches you more than watching people actually use what you built.",
  },
  {
    icon: Shield,
    title: "Privacy as a Foundation",
    description:
      "Establish end-to-end encryption, secure authentication, and privacy-by-default as the non-negotiable foundation for every product I ship.",
  },
  {
    icon: Users,
    title: "Build a Community",
    description:
      "Grow a small but passionate group of beta testers, fellow developers, and early adopters who genuinely care about where this is going.",
  },
  {
    icon: BrainCircuit,
    title: "Ship AI That Feels Natural",
    description:
      "Embed AI capabilities that actually improve the user experience — smart replies, content generation, predictive search — not gimmicks.",
  },
];

const mediumTermGoals = [
  {
    icon: Globe,
    title: "Go Global",
    description:
      "Scale the ecosystem to serve users worldwide with sub-50ms response times through edge computing, localized infrastructure, and smart caching.",
  },
  {
    icon: Layers,
    title: "Connect Everything",
    description:
      "Launch the unified ecosystem platform with single sign-on, shared data, cross-product APIs, and a plugin system for developers.",
  },
  {
    icon: Sparkles,
    title: "Open the Platform",
    description:
      "Release open-source tools, SDKs, and documentation that enable other developers to build on what I have created.",
  },
  {
    icon: Target,
    title: "Enterprise Ready",
    description:
      "Deliver compliance, advanced admin controls, audit logging, and SLA-backed infrastructure for organizations of any size.",
  },
];

const longTermDreams = [
  {
    title: "A Messaging App People Actually Love",
    description:
      "I want SP NET GRAM to be the messaging platform people choose not because they have to, but because it is genuinely the best experience — secure, fast, and delightful.",
  },
  {
    title: "An Intelligent Ecosystem",
    description:
      "A platform where AI anticipates your needs, automates routine tasks, and surfaces insights across every product. Where technology works for you, not the other way around.",
  },
  {
    title: "Open Infrastructure",
    description:
      "An open, auditable platform where developers can build and contribute. Where privacy and openness are not in conflict but reinforce each other.",
  },
  {
    title: "Meaningful Impact",
    description:
      "Technology that makes a measurable difference in how people communicate, collaborate, and organize. Accessible to everyone, regardless of income or location.",
  },
];

const whatIWantToBuild = [
  {
    icon: Cpu,
    title: "Sub-50ms Responses Everywhere",
    description:
      "Every API response under 50 milliseconds for the vast majority of users, globally.",
  },
  {
    icon: Shield,
    title: "Zero-Knowledge by Default",
    description:
      "Every product ships with end-to-end encryption — not as an option, but as the default setting.",
  },
  {
    icon: BrainCircuit,
    title: "On-Device AI",
    description:
      "Core AI features running locally for instant responses and complete privacy — no cloud dependency.",
  },
  {
    icon: Zap,
    title: "Instant Sync Across All Devices",
    description:
      "Real-time synchronization with conflict resolution, offline support, and sub-second propagation.",
  },
];

const faqItems = [
  {
    question: "What is your vision for the next five years?",
    answer:
      "Phase one (2026) is about launching core products and proving they work. Phase two (2027-2028) scales the ecosystem globally and opens the platform to developers. Phase three (2029+) envisions a world where SP NET products are the default choice for secure, intelligent communication. Every phase builds on the previous one.",
  },
  {
    question: "How realistic are these goals?",
    answer:
      "Every goal has a concrete technical path. The edge infrastructure is already architected for global scale. The monorepo enables rapid development. The AI integration layer makes intelligence a first-class capability. These are engineering targets, not wishes.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "I do not monetize user data. I build products people choose to pay for. This means every technical decision optimizes for user benefit rather than data extraction. Combined with a focused product scope, I can move faster and build more thoughtfully than companies with conflicting incentives.",
  },
  {
    question: "How do you handle setbacks?",
    answer:
      "The roadmap is a guide, not a contract. If something needs more time, it gets more time. Shipping quality matters more than hitting dates. I would rather delay a milestone than ship something I am not proud of.",
  },
  {
    question: "What drives you personally?",
    answer:
      "I want to prove that you can build technology that respects people and still succeeds commercially. Privacy and quality are not obstacles to growth — they are the foundation for trust, and trust is what makes people stay.",
  },
];

const relatedPages = [
  {
    title: "Roadmap",
    description: "Detailed timeline for every product.",
    href: "/founder/roadmap",
  },
  {
    title: "Innovation",
    description: "The research shaping this vision.",
    href: "/explore/innovation",
  },
  {
    title: "Learning",
    description: "The resources behind the growth.",
    href: "/explore/learning",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Future Vision" },
        ]}
        label="Explore"
        title="Future Vision"
        titleAccent="Where I'm headed"
        description="My personal vision for the future — what I want to build, the impact I want to make, and the kind of technology I want to be known for."
        icon={<Eye className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Vision backed by honest ambition"
            subtitle="I am not interested in vague promises. This is where I want to go, the concrete milestones I am aiming for, and my honest assessment of what it takes to get there."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                I started writing code in 2018, and somewhere along the way it stopped
                being a hobby and became a mission. I want to build technology that
                genuinely improves how people communicate and organize — technology that
                respects their privacy and earns their trust.
              </p>
              <p>
                This page is my honest roadmap. Short-term goals focus on launching core
                products. Medium-term goals scale the ecosystem globally. Long-term dreams
                paint the picture of what all this effort is building toward. I share this
                not to impress anyone but to hold myself accountable.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Short-Term Goals"
          title="2026 — Building the foundation"
          subtitle="The immediate priorities that will define whether this whole thing works."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {shortTermGoals.map((goal) => (
            <StaggerItem key={goal.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                whileHover={{ y: -3, scale: 1.005 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/8 text-blue-400 border border-blue-500/10">
                    <goal.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{goal.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{goal.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Medium-Term Goals"
          title="2027–2028 — Scaling up"
          subtitle="From individual products to a connected platform that serves people worldwide."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {mediumTermGoals.map((goal) => (
            <StaggerItem key={goal.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                whileHover={{ y: -3, scale: 1.005 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/8 text-violet-400 border border-violet-500/10">
                    <goal.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{goal.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{goal.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Long-Term Dreams"
          title="The future I'm building toward"
          subtitle="Big, ambitious destinations that guide every small decision I make today."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-4">
            {longTermDreams.map((dream, i) => (
              <motion.div
                key={dream.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/8 text-emerald-400 border border-emerald-500/10 mt-0.5">
                    <span className="text-xs font-mono">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/60 mb-2">{dream.title}</h3>
                    <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{dream.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="What I Want to Build"
          title="Technical targets"
          subtitle="Measurable engineering goals that make the vision achievable, not just aspirational."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {whatIWantToBuild.map((goal) => (
            <StaggerItem key={goal.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/8 text-amber-400 border border-amber-500/10">
                    <goal.icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-sm font-medium text-white/50">{goal.title}</h3>
                </div>
                <p className="text-xs text-white/20 leading-relaxed">{goal.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ items={faqItems} />

      <RelatedPages pages={relatedPages} />

      <CTASection
        title="Want to be part of this?"
        titleAccent="I am building this for people like you."
        description="Whether you are a user, developer, or someone who cares about privacy — there is a place for you in this journey."
        primaryAction={{ label: "Join the Community", href: "https://t.me/ABOUTME_SP" }}
        secondaryAction={{ label: "View Roadmap", href: "/founder/roadmap" }}
      />
    </>
  );
}
