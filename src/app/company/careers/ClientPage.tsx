"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Heart,
  Globe,
  Shield,
  Sparkles,
  Users,
  Code2,
  Palette,
  GraduationCap,
  Rocket,
  Target,
  Clock,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Zap,
  Lock,
  Coffee,
  Compass,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
import { personal } from "@/data/personal";
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

const cultureValues = [
  {
    title: "Craft over scale",
    description:
      "Every detail matters. We build for the one, then the many. Quality is not negotiable, even at the cost of speed. The best products are built by people who care deeply about the work.",
    icon: Sparkles,
  },
  {
    title: "Simplicity wins",
    description:
      "The best solutions feel obvious in hindsight. We remove until nothing else can be removed. Complexity is a bug, not a feature — and every team member is empowered to challenge unnecessary complexity.",
    icon: Lightbulb,
  },
  {
    title: "Ship to learn",
    description:
      "Done is better than perfect. Real feedback comes from real users. We iterate relentlessly, learn from every release, and celebrate progress over perfection.",
    icon: TrendingUp,
  },
  {
    title: "People first",
    description:
      "Technology is built by people, for people. We invest in our team, our community, and the humans who use our products. Every decision considers the human impact.",
    icon: Heart,
  },
];

const benefits = [
  {
    title: "Autonomy & Ownership",
    description:
      "Full ownership of your domain with the freedom to make decisions. No micromanagement, no unnecessary approval chains — just clear goals and the trust to figure out how to get there.",
    icon: Target,
  },
  {
    title: "Remote-First",
    description:
      "Work from anywhere in the world. Great talent exists everywhere, and geography should never be a barrier to doing exceptional work. Async-first communication keeps everyone connected.",
    icon: Globe,
  },
  {
    title: "Learning Budget",
    description:
      "Annual budget for courses, books, conferences, and tools. We invest in your growth because a team that learns together builds better products together.",
    icon: GraduationCap,
  },
  {
    title: "Competitive Compensation",
    description:
      "Fair, transparent, and competitive compensation that reflects the value of your work. We believe in paying well because exceptional work deserves exceptional recognition.",
    icon: TrendingUp,
  },
  {
    title: "Flexible Schedule",
    description:
      "Work when you are most productive. We care about output and impact, not hours logged. Design your schedule around your life, not the other way around.",
    icon: Clock,
  },
  {
    title: "Health & Wellness",
    description:
      "Comprehensive health benefits because taking care of yourself is not optional — it is essential. We support physical and mental wellness as foundations for great work.",
    icon: Heart,
  },
];

const engineeringRoles = [
  {
    title: "Senior Full-Stack Engineer",
    description: "Build and own entire features end-to-end across the SP NET ecosystem. TypeScript, React, Node.js, and cloud infrastructure.",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL"],
  },
  {
    title: "Senior Backend Engineer",
    description: "Design and build the infrastructure powering SP NET GRAM, ADMIN OS, and AI systems. Focus on performance, reliability, and scale.",
    skills: ["Node.js", "Python", "Databases", "APIs", "Cloud"],
  },
  {
    title: "AI/ML Engineer",
    description: "Research and develop AI systems that power intelligent experiences across the SP NET ecosystem. Privacy-first, production-ready.",
    skills: ["Python", "LLMs", "RAG", "Vector DBs", "ML Ops"],
  },
  {
    title: "DevOps / Platform Engineer",
    description: "Build and maintain the infrastructure, CI/CD pipelines, and deployment systems that keep SP NET products running smoothly.",
    skills: ["Docker", "CI/CD", "Cloud", "Monitoring", "Security"],
  },
];

const designRoles = [
  {
    title: "Senior Product Designer",
    description: "Design intuitive, beautiful interfaces for the SP NET ecosystem. Own the design process from research to high-fidelity prototypes.",
    skills: ["UI Design", "UX Research", "Prototyping", "Design Systems"],
  },
  {
    title: "Brand Designer",
    description: "Shape the visual identity of SP NET INC across all touchpoints — from product interfaces to marketing materials to the developer experience.",
    skills: ["Brand Identity", "Visual Design", "Typography", "Motion"],
  },
];

const internshipRoles = [
  {
    title: "Software Engineering Intern",
    description: "Work on real product features alongside the founding team. Learn from production code, ship to real users, and grow your skills in a high-bar environment.",
    duration: "3-6 months",
  },
  {
    title: "Design Intern",
    description: "Contribute to the SP NET design system and product interfaces. Learn the craft of product design from someone who obsesses over every pixel.",
    duration: "3-6 months",
  },
];

const stats = [
  { value: "100%", label: "Remote", icon: Globe },
  { value: "4", label: "Culture Values", icon: Heart },
  { value: "6", label: "Benefits", icon: Sparkles },
  { value: "∞", label: "Growth Potential", icon: TrendingUp },
];

const faqItems = [
  {
    question: "Is SP NET INC hiring right now?",
    answer: "SP NET INC is currently in its building phase — focused on shipping products and establishing the ecosystem. We are not actively hiring for full-time roles at this moment, but we are building toward it. The roles listed on this page represent the positions that will open as the company scales.",
  },
  {
    question: "What is the culture like at SP NET INC?",
    answer: "The culture is built on four pillars: craft over scale, simplicity wins, ship to learn, and people first. We believe in obsessive attention to detail, removing unnecessary complexity, learning from real users, and investing in the humans behind the technology. It is an engineering-first culture with high standards and full autonomy.",
  },
  {
    question: "Does SP NET INC offer remote work?",
    answer: "Yes. SP NET INC is remote-first by design. Great talent exists everywhere, and geography should never be a barrier to doing exceptional work. The company operates with async-first communication, documentation-heavy processes, and timezone-agnostic scheduling to support a distributed team.",
  },
  {
    question: "What benefits does SP NET INC offer?",
    answer: "SP NET INC offers six core benefits: autonomy and ownership over your work, remote-first flexibility, annual learning budgets, competitive compensation, flexible scheduling, and comprehensive health and wellness support. As the company scales, the benefits package will continue to grow.",
  },
  {
    question: "How do I apply to work at SP NET INC?",
    answer: "When roles open, they will be posted on this page and shared across SP NET INC channels. In the meantime, the best way to get on our radar is to build things, share your work, and engage with the SP NET community. We value craft over credentials — show us what you can build.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Company", href: "/company" },
          { label: "Careers" },
        ]}
        label="Company"
        title="Careers"
        titleAccent="Build the future with us"
        description="Join SP NET INC and help build the future of communication, enterprise administration, and intelligent automation."
        icon={<Briefcase className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Build products
                <br />
                <span className="text-white/40">that matter</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  SP NET INC is building the infrastructure for modern communication,
                  enterprise administration, and intelligent automation. We are creating
                  products that reimagine their categories — and we need exceptional people
                  to help us do it.
                </p>
                <p>
                  This is not a place for coasting. We are a small, high-performance team
                  building products that serve a growing community. Every person who joins
                  must multiply the team&apos;s capability. The bar is high, the work is
                  meaningful, and the impact is real.
                </p>
                <p>
                  We are building toward something ambitious — a unified ecosystem where
                  communication, administration, and intelligence work together seamlessly.
                  If that excites you, we would love to talk.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Working at SP NET INC"
            title="What it is like"
            subtitle="High standards, full autonomy, and the satisfaction of building products that make a real difference."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Working at SP NET INC means being part of a small team with outsized
                impact. Every person here owns their work end-to-end. There are no
                spectators, no passengers, and no busywork. You will work on products that
                ship to real users, solve real problems, and push the boundaries of what
                small teams can accomplish.
              </p>
              <p>
                We value depth over breadth. Instead of spreading yourself thin across a
                dozen shallow tasks, we encourage deep focus on a few high-impact
                initiatives. The best work happens when smart people are given the space to
                think deeply, iterate quickly, and ship with confidence.
              </p>
              <p>
                The environment is intense but supportive. We push each other to do our
                best work, celebrate wins together, and learn from failures without blame.
                This is a place where you will grow faster than you thought possible — if
                you are willing to put in the work.
              </p>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Culture"
            title="What we stand for"
            subtitle="Four values that guide how we work, how we build, and how we treat each other."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {cultureValues.map((value, i) => (
              <StaggerItem key={value.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <value.icon className="h-4 w-4 text-white/25" />
                    <h3 className="text-base font-medium text-white/70">{value.title}</h3>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Benefits"
            title="What we offer"
            subtitle="Six core benefits designed to support your best work and your best life."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] mb-4">
                    <benefit.icon className="h-4 w-4 text-white/40" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">{benefit.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{benefit.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Engineering Roles"
            title="Build the infrastructure"
            subtitle="Core engineering positions that will power the SP NET ecosystem as the company scales."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {engineeringRoles.map((role) => (
              <StaggerItem key={role.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Code2 className="h-4 w-4 text-blue-400/60" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/30">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">{role.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed mb-4">{role.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/25"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Design Roles"
            title="Shape the experience"
            subtitle="Design positions that define how millions of people interact with the SP NET ecosystem."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {designRoles.map((role) => (
              <StaggerItem key={role.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                      <Palette className="h-4 w-4 text-violet-400/60" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/30">
                      Coming Soon
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">{role.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed mb-4">{role.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[10px] text-white/25"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Internships"
            title="Start your journey"
            subtitle="Learn from production code, ship to real users, and grow your skills in a high-bar environment."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {internshipRoles.map((role) => (
              <StaggerItem key={role.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <GraduationCap className="h-4 w-4 text-emerald-400/60" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/30">
                      {role.duration}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">{role.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{role.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Future Openings"
            title="What is coming"
            subtitle="Roles that will open as SP NET INC scales and the ecosystem matures."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                SP NET INC is in its building phase. The roles listed on this page represent
                positions that will open as the company grows and products reach maturity.
                We are building toward a team of exceptional people — each hired
                deliberately, each expected to multiply the team&apos;s capability.
              </p>
              <p>
                The hiring philosophy is simple: quality over quantity, culture as the
                filter, senior-first approach, and remote by design. We will hire when the
                work demands it and when we find someone who would genuinely elevate the
                team.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Senior-first approach",
                  description:
                    "The first hires in each department will be senior leaders who set the standard. Junior hires come later, mentored by people who embody the culture.",
                },
                {
                  title: "Culture is the filter",
                  description:
                    "Every candidate is evaluated against the company values: craft, simplicity, shipping, and people-first. Skills can be taught; character cannot.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                >
                  <h3 className="text-sm font-medium text-white/60 mb-2">{item.title}</h3>
                  <p className="text-xs text-white/25 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Hiring Philosophy"
            title="How we hire"
            subtitle="Selective, intentional, and culture-first. Every hire must multiply the team's capability."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                SP NET INC does not hire to fill seats. We hire when the work demands it
                and when we find someone who would genuinely elevate the team. The bar is
                simple: would we be excited to work with this person every day for the next
                five years?
              </p>
              <p>
                We value craft over credentials, curiosity over experience, and character
                over polish. The best teams are built by people who care deeply about the
                work and the people they do it with. That is the standard we hold ourselves
                to.
              </p>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="By the Numbers"
            title="Careers at a glance"
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

      <FAQ title="Careers" items={faqItems} />

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
            title: "Brand & Identity",
            description: "The visual identity, brand colors, and voice guidelines of SP NET INC.",
            href: "/company/brand",
          },
          {
            title: "Mission & Vision",
            description: "The purpose and direction driving every product at SP NET INC.",
            href: "/company/mission",
          },
          {
            title: "SP NET Ecosystem",
            description: "The unified platform connecting all SP NET products.",
            href: "/products/sp-net-ecosystem",
          },
        ]}
      />

      <CTASection
        title="Ready to"
        titleAccent="build the future?"
        description="If you are passionate about craft, obsessed with quality, and ready to build products that matter — we want to hear from you."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View organization", href: "/company/about" }}
      />
    </>
  );
}
