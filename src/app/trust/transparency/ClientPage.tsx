"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Code2,
  CheckCircle,
  BookOpen,
  GitBranch,
  AlertCircle,
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
    title: "Building in Public",
    description:
      "I share what I am working on, how it is going, and what I have learned. Not every tweet, but enough so that people following along can see the real journey — not just the polished launch.",
    icon: Eye,
  },
  {
    title: "Honest Roadmap",
    description:
      "My roadmap shows what exists, what is in progress, and what is just an idea. I do not pretend things are further along than they are. If something is half-built, I will tell you.",
    icon: GitBranch,
  },
  {
    title: "Open Source Mindset",
    description:
      "I share code, tools, and lessons whenever I can. Not everything I build is open source, but the spirit of open-source — sharing, collaborating, improving — guides how I work.",
    icon: Code2,
  },
  {
    title: "Admitting What Is Not Done",
    description:
      "I would rather be honest about what I have not finished than pretend it is complete. Real progress beats perfect marketing every time.",
    icon: AlertCircle,
  },
];

const sharing = [
  {
    title: "Progress Updates",
    description:
      "I share development progress on GitHub and social platforms. Not just the wins — the failed experiments, the pivots, and the things I learned the hard way. Learning in public is more valuable than performing success.",
  },
  {
    title: "Technical Decisions",
    description:
      "When I make a significant technical choice — a new framework, a database, an architecture pattern — I try to explain why. The reasoning behind a decision is often more valuable than the decision itself.",
  },
  {
    title: "What I Am Learning",
    description:
      "I am always learning something new. Whether it is a new programming language, a security technique, or an AI research paper — I share what I find interesting and useful. No gatekeeping.",
  },
];

const commitments = [
  "If a project is in development, I will say so — not pretend it is launched.",
  "If I change direction, I will explain why instead of quietly erasing the old plan.",
  "If I make a mistake, I will own it and share what I learned.",
  "If I cannot share something for technical or legal reasons, I will say that too.",
  "My GitHub shows the real state of my projects — commits, issues, and all.",
];

const faqItems = [
  {
    question: "Are you really building everything in public?",
    answer:
      "Not every single detail, but I share enough for people to follow along honestly. I post updates on GitHub, share progress on social media, and write about technical decisions when they are interesting. I am not trying to be a full-time content creator — I am a developer who believes in building openly.",
  },
  {
    question: "What does your roadmap actually look like?",
    answer:
      "My roadmap is divided into three tiers: things that exist and work, things that are actively being built, and things that are just ideas or early experiments. I update it regularly and try to be honest about where each project actually stands.",
  },
  {
    question: "Do you open-source all your projects?",
    answer:
      "My open source projects are currently private. Not all projects will be open sourced, but I believe in the open-source spirit — sharing architecture, design decisions, and lessons learned publicly even when the code itself is not yet public.",
  },
  {
    question: "How do you handle criticism of your work?",
    answer:
      "I welcome it. If someone points out a flaw in my approach, a bug in my code, or a better way to do something, I listen. I have learned more from criticism than from praise. Public building means public feedback, and I am okay with that.",
  },
  {
    question: "What if you stop building something?",
    answer:
      "I will say so. Not every idea works out, and not every project deserves to continue. If I abandon something, I try to explain why and what I learned from the experience. Dead projects are not failures — they are lessons.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trust", href: "/trust" },
          { label: "Transparency" },
        ]}
        label="Trust"
        title="Transparency"
        titleAccent="Building openly"
        description="I believe in building openly — sharing progress, admitting what is not done yet, and keeping an honest roadmap. This is not a corporate transparency report. It is how I work as a person."
        icon={<Eye className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Why This Page Exists
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Transparency is not a brand
                <br />
                <span className="text-white/40">it is how I work</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  I do not have a PR team or a marketing department. When I share something,
                  it is because I genuinely want people to know how things are going —
                  the good parts and the messy parts.
                </p>
                <p>
                  This page is not about looking transparent. It is about actually being
                  transparent. If a project is half-done, I will say so. If I changed my
                  mind about something, I will explain why. If I do not know something,
                  I will admit it.
                </p>
                <p>
                  I think the tech world needs more honesty about the development process
                  and less polished demo videos of things that barely work. So that is
                  what I try to do.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Principles"
            title="How I practice transparency"
            subtitle="Four commitments that guide how I share my work with others."
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
            label="In Practice"
            title="What I actually share"
            subtitle="Real things I do to keep an open and honest development process."
          />

          <div className="space-y-4 max-w-3xl">
            {sharing.map((item, i) => (
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
                    <BookOpen className="h-4 w-4 text-blue-400/60" />
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
            label="Promises"
            title="What I commit to"
            subtitle="Personal promises about how I handle transparency in my work."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-0 max-w-3xl">
              {commitments.map((item, i) => (
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
            label="Open Source"
            title="My open-source mindset"
            subtitle="How I contribute to and benefit from the open-source community."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Code2 className="h-5 w-5 text-blue-400/60" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">Open Source First</h3>
                  <p className="text-xs text-white/25">When I can, I share</p>
                </div>
              </div>
              <p className="text-sm text-white/35 leading-relaxed mb-4">
                I believe in the open-source philosophy. Not every project I build is open
                source, but I contribute when I can and share the thinking behind my work
                regardless. My GitHub is public, and it shows the real state of what I am
                building.
              </p>
              <div className="space-y-2">
                {[
                  "Public GitHub repositories showing real development progress",
                  "Shared tools, utilities, and libraries when they could help others",
                  "Technical blog posts about problems I have solved",
                  "Honest commit history — including the messy parts",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400/40 shrink-0" />
                    <p className="text-xs text-white/35">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
      </SectionContainer>

      <FAQ title="Transparency FAQ" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Privacy",
            description: "How this portfolio handles your data — spoiler: it barely does.",
            href: "/trust/privacy",
          },
          {
            title: "Security",
            description: "How I approach security in my development work.",
            href: "/trust/security",
          },
          {
            title: "Open Source",
            description: "My public repositories and contributions.",
            href: "https://github.com/savanpatelssp",
          },
        ]}
      />

      <CTASection
        title="Want to know"
        titleAccent="more?"
        description="If you have questions about how I work, what I am building, or anything else — reach out. I am happy to talk."
        primaryAction={{ label: "Contact me", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "View trust center", href: "/trust" }}
      />
    </>
  );
}
