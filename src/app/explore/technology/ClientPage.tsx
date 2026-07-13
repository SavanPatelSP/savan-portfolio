"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Layers,
  Database,
  Cloud,
  Shield,
  Cpu,
  Braces,
  Globe,
  Terminal,
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

const dailyStack = [
  {
    icon: Braces,
    title: "TypeScript",
    why: "I write TypeScript every single day. The type system catches mistakes before they reach production, and in a codebase this size, that safety net is everything.",
    color: "#3b82f6",
  },
  {
    icon: Layers,
    title: "Next.js",
    why: "Server components, edge middleware, and the App Router give me the most complete toolkit for building real applications. It handles the hard parts so I can focus on the product.",
    color: "#8b5cf6",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    why: "Reliable, powerful, and extensible. From relational data to full-text search to JSON — PostgreSQL handles everything I throw at it without making me reach for a second database.",
    color: "#10b981",
  },
  {
    icon: Cloud,
    title: "Cloudflare",
    why: "Edge computing with sub-millisecond cold starts. I deploy authentication, rate limiting, and API routing to the edge so users get instant responses regardless of location.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Prisma",
    why: "Type-safe database access that eliminates raw SQL while keeping full power. Auto-generated clients mean my frontend and backend share the same type definitions.",
    color: "#3b82f6",
  },
  {
    icon: Cpu,
    title: "Redis",
    why: "Caching, sessions, rate limiting, pub/sub — Redis absorbs traffic spikes and keeps response times in the sub-millisecond range.",
    color: "#ef4444",
  },
];

const learningNow = [
  {
    icon: Terminal,
    title: "Rust",
    description:
      "Learning Rust for performance-critical services and WebAssembly compilation. The ownership model forces me to think differently about memory and concurrency.",
  },
  {
    icon: Globe,
    title: "WebAssembly",
    description:
      "Exploring Wasm for running sandboxed plugins and compute-intensive tasks in the browser. The potential for portable, secure code execution is huge.",
  },
  {
    icon: Zap,
    title: "Local-First Software",
    description:
      "Studying CRDTs and local-first architectures for building applications that work offline and sync seamlessly when connectivity returns.",
  },
];

const toolsExcitingMe = [
  {
    title: "Bun",
    description: "A faster JavaScript runtime that might replace Node.js for my workflows.",
  },
  {
    title: "Drizzle ORM",
    description: "A lightweight, type-safe ORM that feels closer to writing SQL.",
  },
  {
    title: "Turborepo",
    description: "Monorepo tooling that makes shared codebases actually manageable.",
  },
  {
    title: "Vercel AI SDK",
    description: "Streaming AI responses with React hooks — makes building AI features feel natural.",
  },
];

const faqItems = [
  {
    question: "Why TypeScript over everything else?",
    answer:
      "I have tried a lot of languages, and TypeScript gives me the best balance of productivity and safety. The type system catches entire categories of bugs at compile time. In a complex ecosystem where multiple products share code, that safety is not a nice-to-have — it is essential.",
  },
  {
    question: "Why did you choose Next.js specifically?",
    answer:
      "I evaluated a lot of frameworks. Next.js gave me the most complete package: server components for performance, edge middleware for personalization, the App Router for clean architecture, and a massive ecosystem. It handles the hard infrastructure problems so I can focus on building features.",
  },
  {
    question: "What is your philosophy on choosing technologies?",
    answer:
      "I choose technologies that solve real problems I am facing, not ones that look impressive on a resume. Every tool earns its place through demonstrated value in production. I am skeptical of hype and patient with boring technology that works reliably.",
  },
  {
    question: "Are you learning anything new right now?",
    answer:
      "Rust, WebAssembly, and local-first architecture are my current learning focus. Rust for performance-critical services, Wasm for portable code execution, and local-first for building applications that work offline and sync beautifully.",
  },
  {
    question: "What tools are you most excited about?",
    answer:
      "Bun is rethinking the JavaScript runtime from scratch. Drizzle makes database access feel natural. Turborepo makes monorepos manageable. Vercel AI SDK makes building AI features feel like an afterthought. These are tools that genuinely improve how I work.",
  },
];

const relatedPages = [
  {
    title: "Products",
    description: "The products built with this stack.",
    href: "/explore/products",
  },
  {
    title: "Expertise",
    description: "Deep dives into technical domains.",
    href: "/founder/about",
  },
  {
    title: "Learning",
    description: "Resources and recommendations for growth.",
    href: "/explore/learning",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Technology" },
        ]}
        label="Explore"
        title="Technology"
        titleAccent="Technologies I love"
        description="The tools and technologies I reach for daily — why each one earned its place, and what I am learning next."
        icon={<Code2 className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="My stack"
            title="Tools I trust with my products"
            subtitle="A technology stack is more than a list of tools — it is a set of opinions about how software should be built. These are mine."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                I have been coding since 2018, and over the years I have developed strong
                opinions about what works and what does not. The technologies on this page
                are not here because they are trendy — they are here because they have
                proven themselves in real production use, day after day.
              </p>
              <p>
                I value type safety, developer experience, and production reliability above
                all else. Every choice below optimizes for shipping quality software
                consistently, not for looking cutting-edge in a blog post.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Daily Stack"
          title="What I use every day"
          subtitle="The technologies I reach for without thinking — they have earned my trust through real production use."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {dailyStack.map((tech) => (
            <StaggerItem key={tech.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: `${tech.color}0d`,
                      borderColor: `${tech.color}1a`,
                      color: tech.color,
                    }}
                  >
                    <tech.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">{tech.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{tech.why}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Learning Now"
          title="Technologies I am exploring"
          subtitle="Things I am actively learning because I believe they will matter for what I build next."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {learningNow.map((item) => (
            <StaggerItem key={item.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{item.title}</h3>
                </div>
                <p className="text-xs text-white/25 leading-relaxed">{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Tools I'm Excited About"
          title="Worth keeping an eye on"
          subtitle="Tools and frameworks that are genuinely improving how I work."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {toolsExcitingMe.map((tool) => (
            <StaggerItem key={tool.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7">
                <h3 className="text-sm font-medium text-white/60 mb-2">{tool.title}</h3>
                <p className="text-xs text-white/25 leading-relaxed">{tool.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ items={faqItems} />

      <RelatedPages pages={relatedPages} />

      <CTASection
        title="Want the full technical breakdown?"
        titleAccent="Every technology has a story."
        description="See the complete list of languages, frameworks, databases, and infrastructure powering every product I build."
        primaryAction={{ label: "View Full Tech Stack", href: "/founder/about" }}
        secondaryAction={{ label: "Back to Explore", href: "/explore" }}
      />
    </>
  );
}
