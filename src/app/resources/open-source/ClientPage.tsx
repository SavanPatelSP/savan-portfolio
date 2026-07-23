"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Globe,
  Lock,
  Rocket,
  BookOpen,
  Lightbulb,
  CheckCircle,
  Bell,
  Mail,
  Clock,
  Shield,
  Code2,
  Scale,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FAST, ease, spring } from "@/lib/motion";
import { personal } from "@/data/personal";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { SocialModal } from "@/components/ui/SocialModal";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const philosophyPoints = [
  {
    title: "Quality before visibility",
    description:
      "Releasing code prematurely does more harm than good. Every repository must meet strict standards for code quality, documentation, testing, and security before it goes public. The goal is not to release fast — it is to release something the community can truly rely on.",
    icon: CheckCircle,
  },
  {
    title: "Giving back is non-negotiable",
    description:
      "Every product built on open source foundations owes a debt to the community. React, Next.js, TypeScript, Node.js — none of these would exist without developers who gave their work away. Contributing back is not charity. It is how the cycle continues.",
    icon: Heart,
  },
  {
    title: "Transparency builds trust",
    description:
      "When code is open, decisions are visible, and progress is public — trust follows naturally. The long-term plan is to build that trust by releasing tools, libraries, and documentation that the community can inspect, use, and improve.",
    icon: Globe,
  },
];

const whyPrivate = [
  {
    title: "Rapid iteration",
    description:
      "Products in active development change fast. APIs shift, architecture evolves, and entire features get rewritten. Releasing too early means either maintaining confusing versioned branches or breaking things for early adopters. Keeping repositories private during this phase allows the team to iterate without constraints.",
    icon: Rocket,
  },
  {
    title: "Security first",
    description:
      "SP NET products handle sensitive data — messages, organizational information, user identities. Before any code becomes public, it must undergo thorough security audits, penetration testing, and review. A vulnerability in a private repository affects one team. A vulnerability in a public repository affects everyone who adopts it.",
    icon: Shield,
  },
  {
    title: "Documentation standards",
    description:
      "Open source code without proper documentation is a liability, not an asset. Every public repository needs a comprehensive README, clear contributing guidelines, well-structured code comments, API documentation, and setup instructions. This takes time, and it must be done right before release.",
    icon: BookOpen,
  },
  {
    title: "Stability guarantees",
    description:
      "Developers who adopt open source libraries depend on stable APIs and predictable behavior. Releasing a library with breaking changes every week erodes trust. The approach is to stabilize the core, establish versioning discipline, and only then make the code available publicly.",
    icon: Lock,
  },
];

const whatWillBeReleased = [
  {
    title: "Developer Toolkit",
    description:
      "Shared utilities, ESLint configurations, TypeScript presets, and starter templates. Everything needed to bootstrap a new project using the SP NET stack — typed, tested, and documented.",
    timeline: "After core product stability",
    icon: Code2,
  },
  {
    title: "Design System",
    description:
      "A complete component library and design system built from the components used across SP NET products. Every token, every pattern, every interaction — available for anyone to use and extend.",
    timeline: "After design maturity",
    icon: CheckCircle,
  },
  {
    title: "Educational Content",
    description:
      "Technical blog posts, tutorials, and walkthroughs explaining how SP NET products are built. Architecture decisions, performance optimizations, and engineering patterns — open to everyone.",
    timeline: "Ongoing, starting 2026",
    icon: BookOpen,
  },
  {
    title: "API Documentation",
    description:
      "Comprehensive, interactive API documentation for every public SP NET endpoint. OpenAPI specifications, code examples, and SDKs for popular languages.",
    timeline: "After API stabilization",
    icon: Lightbulb,
  },
  {
    title: "Research Experiments",
    description:
      "Select AI experiments, prompt engineering patterns, and research prototypes. These are learning resources for the community — not production-ready, but valuable for understanding the exploration process.",
    timeline: "As research matures",
    icon: Scale,
  },
  {
    title: "This Portfolio",
    description:
      "The source code for this very website. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Designed to serve as a reference for modern, performant web development.",
    timeline: "When ready for public scrutiny",
    icon: Globe,
  },
];

const releasePrerequisites = [
  {
    title: "Code Quality",
    description:
      "Consistent style, clean architecture, no shortcuts. Every public repository must reflect the engineering standards that define SP NET products.",
    icon: CheckCircle,
  },
  {
    title: "Security Audit",
    description:
      "Thorough review for vulnerabilities, dependency risks, and attack surfaces. No known security issues before public release.",
    icon: Shield,
  },
  {
    title: "Documentation",
    description:
      "README, contributing guidelines, API docs, setup instructions, and code comments. A developer should be able to clone, understand, and use the project without external help.",
    icon: BookOpen,
  },
  {
    title: "Test Coverage",
    description:
      "Comprehensive test suites covering core functionality, edge cases, and integration points. Automated CI/CD pipelines that enforce quality on every commit.",
    icon: CheckCircle,
  },
];

const releasePhases = [
  {
    phase: "Phase 1",
    title: "Private Development",
    status: "Current",
    description:
      "All repositories are private. Active development, rapid iteration, and architectural decisions happen without external constraints. The focus is on building products that work, not showcasing code.",
  },
  {
    phase: "Phase 2",
    title: "Quality Hardening",
    status: "Upcoming",
    description:
      "Code is stabilized, documentation is written, tests are comprehensive, and security audits are completed. This phase bridges the gap between private development and public release.",
  },
  {
    phase: "Phase 3",
    title: "Selective Release",
    status: "Planned",
    description:
      "Selected libraries, tools, and documentation are released under MIT or Apache 2.0 licenses. Community feedback is gathered, issues are addressed, and the release process is refined.",
  },
  {
    phase: "Phase 4",
    title: "Ecosystem Release",
    status: "Future",
    description:
      "Broader components of the SP NET ecosystem become available. Design systems, developer toolkits, and educational content are released for the community to use and contribute to.",
  },
];

const faqItems = [
  {
    question: "Why are the SP NET repositories currently private?",
    answer:
      "The products are in active development. APIs change, architecture evolves, and features get rewritten frequently. Releasing code during this phase would mean either breaking things for early adopters or maintaining confusing versioned branches. The approach is to stabilize, document, and audit before making anything public.",
  },
  {
    question: "Will SP NET projects ever be open source?",
    answer:
      "Yes. Open source is a core part of the long-term vision. Selected projects, libraries, tools, documentation, and research will be released publicly once they meet the quality, security, documentation, and maintenance standards required. The timeline depends on product maturity.",
  },
  {
    question: "When will the first repositories be released?",
    answer:
      "There is no fixed date. The first releases will likely be developer tools and utility libraries that are already stable internally. The trigger is not a calendar date — it is when the code meets the standards for public consumption.",
  },
  {
    question: "Can I contribute to SP NET projects right now?",
    answer:
      "Not yet. The repositories are private and contributions cannot be accepted at this time. Once public repositories are available, contribution guidelines will be published alongside them. For now, the best way to stay involved is to follow the journey on social media and the blog.",
  },
  {
    question: "What licenses will SP NET projects use?",
    answer:
      "The default will be MIT — the most permissive and widely used open source license. Some projects may use Apache 2.0 or other licenses depending on their scope and intellectual property considerations. Every public repository will have a clear LICENSE file.",
  },
  {
    question: "What if I need access to SP NET code now?",
    answer:
      "If you have a legitimate need to integrate with or build on SP NET technology, reach out to business@sp-net.in with a specific proposal. Selective partnerships and early access arrangements may be possible on a case-by-case basis.",
  },
  {
    question: "How can I stay updated on open source releases?",
    answer:
      "Follow Savan on GitHub (github.com/savanpatelssp) or Telegram (t.me/ABOUTME_SP). X profile is coming soon. The Blog and Newsroom sections will also announce significant releases. Email hello@sp-net.in to be added to the notification list.",
  },
];

const relatedPages = [
  {
    title: "About Savan Patel",
    description:
      "The founder and engineer behind SP NET INC and its long-term vision.",
    href: "/founder/about",
  },
  {
    title: "Technology Stack",
    description:
      "The tools, frameworks, and languages powering SP NET products.",
    href: "/explore/technology",
  },
  {
    title: "Roadmap",
    description:
      "The vision, milestones, and what comes next for SP NET INC.",
    href: "/founder/roadmap",
  },
  {
    title: "Trust & Privacy",
    description:
      "How security, privacy, and transparency guide every decision.",
    href: "/trust",
  },
  {
    title: "Blog",
    description:
      "Engineering insights, architecture decisions, and technical deep dives.",
    href: "/resources/blog",
  },
  {
    title: "Contact",
    description:
      "Get in touch for partnerships, early access, or collaboration.",
    href: "/get-in-touch",
  },
];

export default function OpenSourceClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Open Source" },
        ]}
        label="Resources"
        title="Open Source"
        titleAccent="A long-term vision"
        description="Great software is built on shared foundations. Open source is part of the long-term vision for SP NET INC — and when the code is ready, it will be released for the community to use, improve, and build upon."
        icon={<Heart className="h-4 w-4" />}
      />

      {/* ─── Status Indicator ───────────────────────────────── */}
        <SectionContainer>
          <FadeIn>
            <div className="max-w-2xl">
              <div className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.03] p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Lock className="h-5 w-5 text-amber-400/70" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/40 mb-1">
                      Project Visibility
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400/60 animate-pulse" />
                      <span className="text-sm font-medium text-amber-400/70">
                        Private Development
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">
                  All SP NET repositories are currently private. Development is
                  being carried out in private while the products mature, stabilize,
                  and meet the quality, security, documentation, and maintenance
                  standards required for public release. Selected projects will
                  become available as open source when they are ready.
                </p>
              </div>
            </div>
          </FadeIn>
        </SectionContainer>

      {/* ─── Why the Projects Are Private ───────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Why Private
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Why the projects
                <br />
                <span className="text-white/40">are currently private</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  The instinct to share code publicly is strong. Open source is a
                  core value, and contributing back to the community is a
                  long-standing commitment. But releasing code before it is ready
                  does more harm than good.
                </p>
                <p>
                  SP NET products are in active development. APIs shift, entire
                  features get rewritten, and architecture decisions are still
                  being validated. Sharing code at this stage would mean either
                  breaking things for early adopters or maintaining confusing
                  parallel versions.
                </p>
                <p>
                  The approach is simple: build in private, get it right, then
                  share it with the world. Every repository that eventually goes
                  public will have been thoroughly documented, tested, audited,
                  and stabilized.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Reasons"
            title="The principles behind the decision"
            subtitle="Four reasons why the code stays private until it meets the standard."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.08}
          >
            {whyPrivate.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] mb-4">
                    <item.icon className="h-4 w-4 text-white/40" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ─── Open Source Philosophy ──────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                My open source
                <br />
                <span className="text-white/40">philosophy</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  Open source is not a marketing strategy or a business model.
                  It is a philosophy — the belief that software is better when it
                  is built with integrity, shared freely, and improved
                  collectively. Every line of code I write exists because someone
                  else shared their work first.
                </p>
                <p>
                  SP NET INC is built on a foundation of open source
                  technologies. React, Next.js, TypeScript, Node.js — none of
                  these would exist without communities of developers who gave
                  their work away. The long-term plan is to give back the same
                  way.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Core Beliefs"
            title="What drives the commitment"
            subtitle="Three principles that guide how open source fits into the SP NET vision."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.06}
          >
            {philosophyPoints.map((point) => (
              <StaggerItem key={point.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] mb-4">
                    <point.icon className="h-4 w-4 text-white/40" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">
                    {point.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ─── What Will Become Open Source ────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Future Releases"
            title="What will become open source"
            subtitle="Selected projects, tools, and content that are planned for public release once they meet the required standards."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.06}
          >
            {whatWillBeReleased.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <item.icon className="h-4 w-4 text-white/40" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/25">
                      <Clock className="h-2.5 w-2.5" />
                      {item.timeline}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white/60 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ─── Release Prerequisites ───────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Standards"
            title="Prerequisites before public release"
            subtitle="Every repository must meet these four standards before it becomes publicly available."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.06}
          >
            {releasePrerequisites.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <item.icon className="h-4 w-4 text-white/40" />
                    </div>
                    <h3 className="text-sm font-medium text-white/60">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ─── Future Release Roadmap ──────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Roadmap"
            title="Future release roadmap"
            subtitle="The path from private development to public release — phased, deliberate, and quality-driven."
          />

          <div className="space-y-0">
            {releasePhases.map((item, i) => (
              <motion.div
                key={item.phase}
                className="relative pl-8 border-l border-white/[0.06]"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: FAST,
                  delay: i * 0.08,
                  ease: ease.out,
                }}
              >
                <div
                  className={cn(
                    "absolute left-0 top-6 w-2 h-2 rounded-full -translate-x-[5px]",
                    item.status === "Current"
                      ? "bg-amber-400/60"
                      : "bg-blue-500/50"
                  )}
                />
                <div className="pb-10">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-medium text-white/60">
                      {item.title}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] font-mono border rounded-full px-2 py-0.5",
                        item.status === "Current"
                          ? "text-amber-400/50 border-amber-400/20 bg-amber-400/5"
                          : "text-white/20 border-white/[0.06]"
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      {/* ─── How to Stay Updated ─────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Stay Updated"
            title="How to stay updated"
            subtitle="Be the first to know when repositories become publicly available."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            staggerDelay={0.06}
          >
            {[
              {
                title: "Follow on GitHub",
                description:
                  "Watch the GitHub profile at github.com/savanpatelssp to receive notifications when new repositories are created or made public.",
                icon: ExternalLink,
                href: personal.social.github,
              },
              {
                title: "Follow on X",
                description:
                  "X profile coming soon. Real-time updates, development insights, and announcements about open source releases will be shared there.",
                icon: ExternalLink,
                href: personal.social.x,
                modal: true as const,
              },
              {
                title: "Join on Telegram",
                description:
                  "Direct communication, early previews, and community discussions happen on Telegram at t.me/ABOUTME_SP.",
                icon: ExternalLink,
                href: personal.social.telegram,
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                {"modal" in item && item.modal ? (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 text-left w-full"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        <item.icon className="h-4 w-4 text-white/40" />
                      </div>
                      <h3 className="text-sm font-medium text-white/60 group-hover:text-white/70 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-white/30 leading-relaxed">
                      {item.description}
                    </p>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        <item.icon className="h-4 w-4 text-white/40" />
                      </div>
                      <h3 className="text-sm font-medium text-white/60 group-hover:text-white/70 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-white/30 leading-relaxed">
                      {item.description}
                    </p>
                  </a>
                )}
              </StaggerItem>
            ))}
          </StaggerFade>
          <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

          <FadeIn delay={0.2}>
            <div className="mt-10 rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mx-auto mb-6">
                <Bell className="h-6 w-6 text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-white/70 mb-2">
                Get notified directly
              </h3>
              <p className="text-sm text-white/30 leading-relaxed max-w-md mx-auto mb-6">
                Send an email to{" "}
                <span className="text-blue-400/60">hello@sp-net.in</span> with
                &ldquo;Open Source Updates&rdquo; in the subject line to receive a
                notification when repositories are ready for public release.
              </p>
              <motion.a
                href="mailto:hello@sp-net.in?subject=Open Source Updates"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <Mail className="h-4 w-4" />
                Subscribe to updates
              </motion.a>
            </div>
          </FadeIn>
      </SectionContainer>

      {/* ─── Coming in the Future ────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12 lg:p-16 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-mono text-white/30 mb-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400/60 animate-pulse" />
                  Coming in the Future
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
                  Open source is part
                  <br />
                  <span className="text-white/40">of the long-term vision</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg text-white/35 leading-relaxed mb-10 max-w-2xl mx-auto">
                  The SP NET ecosystem is being built with the intention of
                  sharing it with the developer community. When repositories meet
                  the standards for quality, security, documentation, and
                  maintenance — they will be made publicly available. The
                  community will be notified as soon as that day comes.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <motion.a
                    href="mailto:hello@sp-net.in?subject=Open Source Updates"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring.gentle}
                  >
                    <Bell className="h-4 w-4" />
                    Get notified when ready
                  </motion.a>
                  <motion.a
                    href={personal.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring.gentle}
                  >
                    Follow on GitHub
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </motion.a>
                </div>
              </FadeIn>
            </div>
          </div>
      </SectionContainer>

      {/* ─── FAQ ─────────────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Questions"
            title="Frequently asked questions"
            subtitle="Common questions about the open source timeline and approach."
          />

          <div className="mx-auto max-w-2xl">
            <FAQ title="" items={faqItems} />
          </div>
      </SectionContainer>

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Part of the"
        titleAccent="open source journey"
        description="Open source is a long-term commitment. Follow the journey and be the first to know when repositories become available."
        primaryAction={{
          label: "Get notified",
          href: "mailto:hello@sp-net.in?subject=Open Source Updates",
        }}
        secondaryAction={{
          label: "Follow on GitHub",
          href: personal.social.github,
        }}
      />
    </>
  );
}
