"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Globe,
  Rocket,
  Shield,
  Users,
  Lightbulb,
  Target,
  Zap,
  Eye,
  Brain,
  Code2,
  Heart,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
import { personal } from "@/data/personal";
import { principles } from "@/data/personal";
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

const technologyGoals = [
  {
    title: "Unified Communication",
    description: "Build messaging infrastructure that is private by default, productive by design, and delightful to use — setting a new standard for how people communicate.",
    icon: Globe,
  },
  {
    title: "Intelligent Enterprise",
    description: "Create enterprise tools that anticipate organizational needs, automate routine decisions, and give leaders the clarity to make better decisions faster.",
    icon: Brain,
  },
  {
    title: "Privacy-First AI",
    description: "Develop artificial intelligence that respects user privacy while delivering intelligent experiences across every product in the ecosystem.",
    icon: Shield,
  },
  {
    title: "Open Ecosystem",
    description: "Build a platform that others can extend — with open APIs, developer tools, and a community-driven approach to innovation.",
    icon: Code2,
  },
];

const futureDirection = [
  {
    title: "Developer Platform",
    description: "Open APIs and SDKs that let developers build on top of the SP NET ecosystem, creating integrations and extensions that benefit the entire community.",
  },
  {
    title: "Global Scale",
    description: "Expanding the reach of SP NET products to serve users and organizations across the world, with infrastructure designed for global performance and reliability.",
  },
  {
    title: "Community-Driven",
    description: "Building tools and platforms that grow stronger with community input — where user feedback directly shapes the roadmap and priorities.",
  },
];

const stats = [
  { value: "1", label: "Mission", icon: Target },
  { value: "1", label: "Vision", icon: Eye },
  { value: "4", label: "Core Principles", icon: Sparkles },
  { value: "∞", label: "Commitment", icon: Heart },
];

const faqItems = [
  {
    question: "What is SP NET INC's mission?",
    answer: "The mission of SP NET INC is to build software that elevates human potential through thoughtful design and precision engineering. Every product we create is designed to make technology feel invisible, intuitive, and delightful — where every interaction is intentional and serves a genuine purpose.",
  },
  {
    question: "What is SP NET INC's vision?",
    answer: "SP NET INC envisions a world where technology feels invisible, intuitive, and delightful — where every interaction is intentional. We are building toward a future where software amplifies human capability without demanding attention, and where every product earns the trust of the people who use it.",
  },
  {
    question: "What are the core principles of SP NET INC?",
    answer: "SP NET INC operates on four core principles: Craft over scale (every detail matters), Simplicity is the ultimate sophistication (remove until nothing else can be removed), Ship to learn (real feedback comes from real users), and Open by default (transparency builds trust). These principles guide every decision, every product, and every line of code.",
  },
  {
    question: "How does SP NET INC approach technology?",
    answer: "SP NET INC approaches technology from first principles. Instead of following trends, we ask: what does the user actually need? What is the simplest, most elegant solution? What would this look like if we started from scratch today? This approach results in products that reimagine their categories rather than iterate on what exists.",
  },
  {
    question: "What are SP NET INC's technology goals?",
    answer: "SP NET INC has four primary technology goals: unified communication (private, productive messaging), intelligent enterprise (tools that anticipate needs), privacy-first AI (intelligent experiences that respect privacy), and an open ecosystem (a platform others can extend). These goals guide the product roadmap and engineering priorities. Note that all SP NET products are currently in active development and not yet publicly available.",
  },
  {
    question: "How can I contact SP NET INC?",
    answer: "The recommended first point of contact is PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT. For specific needs, you can also email the appropriate department: hello@sp-net.in (general), business@sp-net.in (business), contact@sp-net.in (inquiries), media@sp-net.in (media), security@sp-net.in (security), or careers@sp-net.in (careers). You can also schedule a meeting at cal.com/savanpatel.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Company", href: "/company" },
          { label: "Mission & Vision" },
        ]}
        label="Company"
        title="Mission & Vision"
        titleAccent="Purpose and direction"
        description="The purpose and direction driving every product, every decision, and every line of code at SP NET INC."
        icon={<Compass className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Purpose drives
                <br />
                <span className="text-white/40">everything we build</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  At SP NET INC, mission and vision are not abstract concepts on a wall —
                  they are the operating system for every decision we make. From the
                  architecture of our products to the culture of our team, everything flows
                  from a clear understanding of why we exist and where we are going.
                </p>
                <p>
                  We build software that elevates human potential. Not software that
                  distracts, not software that complicates — software that amplifies. Every
                  product in the SP NET ecosystem is designed with this purpose at its core.
                </p>
                <p>
                  The vision is ambitious: a world where technology feels invisible,
                  intuitive, and delightful. Where every interaction is intentional. This is
                  not a distant dream — it is the direction we are building toward, one
                  product at a time.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Mission"
            title="What we are building toward"
            subtitle="To build software that elevates human potential through thoughtful design and precision engineering."
          />

          <FadeIn delay={0.05}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Compass className="h-5 w-5 text-blue-400/60" />
                </div>
                <h3 className="text-sm font-medium text-white/60">Our Mission</h3>
              </div>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4">
                {personal.mission}
              </p>
              <p className="text-sm text-white/30 leading-relaxed">
                This mission is not aspirational — it is operational. Every product
                decision, every engineering choice, every design detail is evaluated against
                one question: does this elevate human potential? If the answer is not
                clearly yes, we rethink it.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Elevation means making people better at what they do. A messaging platform
                that does not get in the way of conversation. An enterprise tool that
                surfaces the right information at the right time. An AI system that
                amplifies judgment rather than replacing it. These are the standards we hold
                ourselves to.
              </p>
              <p>
                Thoughtful design means every interaction is intentional. No accidental
                features, no vestigial complexity, no interfaces that require a manual.
                When technology is designed thoughtfully, it feels like an extension of the
                person using it — not a barrier between them and their work.
              </p>
              <p>
                Precision engineering means building things that last. Not quick hacks that
                break under pressure, but systems designed with care, tested with rigor,
                and built to evolve gracefully over time. The difference between good and
                great software is often invisible — it lives in the details that most people
                never notice but always feel.
              </p>
            </div>
          </FadeIn>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Vision"
            title="The world we are building"
            subtitle="A world where technology feels invisible, intuitive, and delightful — where every interaction is intentional."
          />

          <FadeIn delay={0.05}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Eye className="h-5 w-5 text-violet-400/60" />
                </div>
                <h3 className="text-sm font-medium text-white/60">Our Vision</h3>
              </div>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4">
                {personal.vision}
              </p>
              <p className="text-sm text-white/30 leading-relaxed">
                This vision is the north star for every product in the SP NET ecosystem.
                We are building toward a future where technology does not demand attention —
                it earns trust. Where software adapts to people, not the other way around.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-8 space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Invisible technology does not mean hidden technology. It means technology
                that is so well-designed, so thoughtfully integrated, that it disappears
                into the workflow. You do not think about the messaging app when you are
                having a great conversation. You do not think about the enterprise tool when
                your team is running smoothly. That is the experience we are building
                toward.
              </p>
              <p>
                Intuitive technology respects the user&apos;s intelligence while removing
                friction. It does not require training manuals or onboarding wizards. The
                right action is always obvious, the next step is always clear, and the
                experience always feels natural.
              </p>
              <p>
                Delightful technology creates moments of satisfaction — small, unexpected
                touches that make using the product feel like a pleasure, not a chore. Not
                gimmicks, not animations for their own sake, but genuine moments of craft
                that signal someone cared about this experience.
              </p>
            </div>
          </FadeIn>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Core Principles"
            title="How we operate"
            subtitle="Four principles that guide every product, every line of code, and every decision at SP NET INC."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {principles.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-white/70 mb-2">{principle.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Future Direction"
            title="Where we are headed"
            subtitle="Three directions that will define the next chapter of SP NET INC."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-4" staggerDelay={0.06}>
            {futureDirection.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <Rocket className="h-4 w-4 text-amber-400/50 mb-3" />
                  <h3 className="text-sm font-medium text-white/70 mb-2">{item.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Technology Goals"
            title="What we are building"
            subtitle="Four technology goals that guide engineering priorities and product development across the SP NET ecosystem."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {technologyGoals.map((goal) => (
              <StaggerItem key={goal.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <goal.icon className="h-4 w-4 text-white/40" />
                    </div>
                    <h3 className="text-sm font-medium text-white/70">{goal.title}</h3>
                  </div>
                  <p className="text-xs text-white/30 leading-relaxed">{goal.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Global Ambition"
            title="Built for the world"
            subtitle="SP NET INC is building products that serve people and organizations everywhere."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Though based in India, SP NET INC builds for a global audience. The
                products being developed — SP NET GRAM, SP NET ADMIN OS, and SP NET AI —
                are designed to serve users and organizations across the world, regardless
                of geography, language, or scale.
              </p>
              <p>
                Great technology knows no borders. The problems we are solving —
                communication, administration, intelligence — are universal. Our approach is
                to build products that work beautifully at any scale, from a two-person
                startup to a global enterprise.
              </p>
            </div>
          </FadeIn>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="By the Numbers"
            title="Mission at a glance"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-white/60 mb-1">{stat.value}</p>
                  <p className="text-[11px] text-white/25">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <FAQ title="Mission & Vision" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "About SP NET INC",
            description: "The company behind the SP NET ecosystem and its products.",
            href: "/company/about",
          },
          {
            title: "Leadership",
            description: "Meet the founder and leadership guiding the vision forward.",
            href: "/company/leadership",
          },
          {
            title: "Philosophy",
            description: "The beliefs, principles, and approach behind every product decision.",
            href: "/founder/philosophy",
          },
          {
            title: "Roadmap",
            description: "Where SP NET INC is headed and what's coming next.",
            href: "/founder/roadmap",
          },
          {
            title: "SP NET Ecosystem",
            description: "The unified platform connecting all SP NET products.",
            href: "/products/sp-net-ecosystem",
          },
        ]}
      />

      <CTASection
        title="Driven by"
        titleAccent="purpose and conviction"
        description="If our mission resonates with you — whether as a user, partner, or future team member — we would love to connect."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View roadmap", href: "/founder/roadmap" }}
      />
    </>
  );
}
