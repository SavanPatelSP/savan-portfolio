"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Rocket,
  Shield,
  Users,
  Lightbulb,
  Code2,
  Globe,
  Target,
  Calendar,
  Sparkles,
  ArrowRight,
  History,
  Compass,
  Heart,
  Zap,
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

const values = [
  {
    title: "Innovation",
    description:
      "We challenge convention and explore uncharted territory. Every product is an opportunity to rethink how technology serves people — not the other way around.",
    icon: Lightbulb,
  },
  {
    title: "Quality",
    description:
      "Craft over scale, always. Every pixel, every line of code, every interaction is held to the highest standard. We build products we are proud to put our name on.",
    icon: Sparkles,
  },
  {
    title: "Privacy",
    description:
      "Trust is earned through architecture, not promises. Privacy is not a feature — it is a foundation. Every system is designed with security and data protection at its core.",
    icon: Shield,
  },
  {
    title: "Community",
    description:
      "Great technology is built with people, not just for them. We listen to our community, learn from their feedback, and build products that reflect their needs.",
    icon: Users,
  },
];

const timeline = [
  { year: "2018", title: "First Line of Code", description: "Savan Patel writes the first line of code, sparking a journey into software engineering." },
  { year: "2020", title: "Deepening Expertise", description: "Years of self-taught mastery across full-stack development, AI, cloud, and security." },
  { year: "2022", title: "SP NET INC Founded", description: "The company is launched with a vision to build infrastructure for modern communication and enterprise tools." },
  { year: "2023", title: "SP NET GRAM Begins", description: "Development starts on a next-generation messaging platform focused on privacy and productivity." },
  { year: "2024", title: "SP NET ADMIN OS", description: "Enterprise administration platform enters development with comprehensive organizational tooling." },
  { year: "2025", title: "SP NET AI Research", description: "AI research initiative begins, powering intelligent experiences across the entire ecosystem." },
  { year: "2026", title: "Scaling the Vision", description: "Expanding the ecosystem with new products, open-source contributions, and a growing community." },
];

const stats = [
  { value: "2022", label: "Founded", icon: Calendar },
  { value: "3+", label: "Products", icon: Rocket },
  { value: "1", label: "Ecosystem", icon: Globe },
  { value: "India", label: "Headquarters", icon: Target },
];

const faqItems = [
  {
    question: "When was SP NET INC founded?",
    answer: "SP NET INC was founded in 2022 by Savan Patel. The company was established with a clear vision: to build infrastructure for modern communication, enterprise administration, and intelligent automation. From day one, the focus has been on shipping exceptional products and creating a unified ecosystem.",
  },
  {
    question: "What products does SP NET INC build?",
    answer: "SP NET INC is building three core products: SP NET GRAM (a next-generation messaging platform), SP NET ADMIN OS (a comprehensive enterprise administration platform), and SP NET AI (an AI research initiative powering intelligent experiences across the ecosystem). All products are in active development and are not yet publicly available. They are designed to work together as part of the unified SP NET ecosystem.",
  },
  {
    question: "Who is the founder of SP NET INC?",
    answer: "SP NET INC was founded by Savan Patel, a self-taught software engineer from India. He began coding in 2018 and has since built deep expertise across full-stack development, artificial intelligence, cloud infrastructure, and cybersecurity. He serves as Founder and Product Engineer, leading all product strategy and engineering.",
  },
  {
    question: "What is SP NET INC's mission?",
    answer: "The mission of SP NET INC is to build software that elevates human potential through thoughtful design and precision engineering. Every product, every feature, and every decision is in service of creating technology that feels invisible, intuitive, and delightful — where every interaction is intentional.",
  },
  {
    question: "Where is SP NET INC based?",
    answer: "SP NET INC is based in India. The company operates as a lean, founder-led organization with a distributed-first approach. This enables access to global talent and ensures that great work can happen from anywhere, unconstrained by geography.",
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
          { label: "About SP NET INC" },
        ]}
        label="Company"
        title="About SP NET INC"
        titleAccent="Building the future of technology"
        description="A technology company building infrastructure for modern communication, enterprise administration, and intelligent automation."
        icon={<Building2 className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                What SP NET INC
                <br />
                <span className="text-white/40">stands for</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  SP NET INC is a technology company founded in 2022 with a singular
                  purpose: to build software that elevates human potential. We create
                  infrastructure for modern communication, enterprise administration, and
                  intelligent automation — products designed to work together as a unified
                  ecosystem.
                </p>
                <p>
                  Founded by Savan Patel, a self-taught software engineer from India, the
                  company operates at the intersection of engineering precision and product
                  vision. Every product we build is held to the same standard: it must feel
                  invisible, work effortlessly, and earn the trust of the people who use it.
                </p>
                <p>
                  Today, SP NET INC is a lean, founder-led operation shipping products that
                  serve a growing community. The ecosystem — connecting SP NET GRAM, SP NET
                  ADMIN OS, and SP NET AI — is designed to be greater than the sum of its
                  parts.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="History"
            title="From first line of code to a technology company"
            subtitle="A journey defined by relentless curiosity, stubborn persistence, and an obsession with craft."
          />

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative pl-8 border-l border-white/[0.06]"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
              >
                <div className="absolute left-0 top-6 w-2 h-2 rounded-full bg-blue-500/50 -translate-x-[5px]" />
                <div className="pb-10">
                  <span className="text-xs font-mono text-white/25">{item.year}</span>
                  <h3 className="text-base font-medium text-white/70 mt-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Mission"
            title="Why we exist"
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
                Every line of code, every design decision, and every product choice at SP NET
                INC is in service of this mission. We do not build for accolades — we build
                for impact. Technology should amplify human capability, not complicate it.
              </p>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Vision"
            title="Where we are headed"
            subtitle="A clear direction that guides every decision, every hire, and every product."
          />

          <FadeIn delay={0.05}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <Globe className="h-5 w-5 text-violet-400/60" />
                </div>
                <h3 className="text-sm font-medium text-white/60">Our Vision</h3>
              </div>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-4">
                {personal.vision}
              </p>
              <p className="text-sm text-white/30 leading-relaxed">
                A world where technology does not demand attention — it earns trust. Where
                every product serves a purpose, every interaction feels intentional, and
                every experience is crafted with care. This is the future SP NET INC is
                building toward.
              </p>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Values"
            title="What we believe in"
            subtitle="Four principles that guide every product, every line of code, and every decision at SP NET INC."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {values.map((value, i) => (
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
            label="Culture"
            title="Engineering-first"
            subtitle="A culture built on craftsmanship, autonomy, and the relentless pursuit of excellence."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                At SP NET INC, engineering is not just a function — it is the culture. Every
                decision starts with the question: &quot;What is the best technical
                solution?&quot; Not the fastest, not the cheapest — the best. The one that
                will still be right in five years.
              </p>
              <p>
                We believe in small, exceptional teams over large, average ones. Every person
                who joins SP NET INC must multiply the team&apos;s capability, not just add
                headcount. The bar is simple: would we be excited to work with this person
                every day for the next five years?
              </p>
              <p>
                Autonomy is not a perk — it is a requirement. We hire people we trust and
                give them the space to do their best work. No micromanagement, no unnecessary
                meetings, no bureaucracy. Just clear goals, high standards, and the freedom
                to figure out how to get there.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Approach", value: "Engineering-first", detail: "Technical excellence drives every decision" },
                { label: "Team", value: "Small & elite", detail: "Quality over quantity, always" },
                { label: "Work Style", value: "Autonomous", detail: "Clear goals, high standards, full ownership" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5"
                >
                  <p className="text-xs text-white/20 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-white/60 mb-0.5">{item.value}</p>
                  <p className="text-xs text-white/25">{item.detail}</p>
                </div>
              ))}
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Innovation"
            title="How we approach building"
            subtitle="Rethinking technology from first principles — every product, every feature, every interaction."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Innovation at SP NET INC is not about chasing trends — it is about solving
                real problems in ways that have not been attempted before. We approach every
                product from first principles: What does the user actually need? What is the
                simplest, most elegant solution? What would this look like if we started from
                scratch today?
              </p>
              <p>
                SP NET GRAM is not just another messaging app. SP NET ADMIN OS is not just
                another dashboard. SP NET AI is not just another AI wrapper. Each product
                reimagines its category from the ground up, informed by deep technical
                expertise and an obsession with user experience.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "First principles thinking",
                  description: "Question every assumption. The best solutions come from understanding the problem deeply, not copying what exists.",
                },
                {
                  title: "Craft as competitive advantage",
                  description: "In a world of fast followers, the only durable advantage is doing things better — with more care, more thought, and more precision.",
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
            label="By the Numbers"
            title="SP NET INC at a glance"
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

      <FAQ title="About SP NET INC" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Mission & Vision",
            description: "The purpose and direction driving every product at SP NET INC.",
            href: "/company/mission",
          },
          {
            title: "Leadership",
            description: "Meet the founder and leadership behind SP NET INC.",
            href: "/company/leadership",
          },
          {
            title: "About Savan Patel",
            description: "The founder and product engineer building SP NET INC.",
            href: "/founder/about",
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
        title="Part of the"
        titleAccent="SP NET INC story"
        description="Whether you are interested in our products, partnership opportunities, or want to learn more about the company — we would love to hear from you."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View products", href: "/products" }}
      />
    </>
  );
}
