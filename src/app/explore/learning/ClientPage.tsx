"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Braces,
  Layers,
  Database,
  Cloud,
  Cpu,
  Globe,
  Terminal,
  Rocket,
  Users,
  MessageCircle,
  FileText,
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

const currentlyLearning = [
  {
    icon: Terminal,
    title: "Rust",
    description:
      "For performance-critical services and WebAssembly. The ownership model forces a different way of thinking about memory — uncomfortable at first, powerful once it clicks.",
    difficulty: "Intermediate",
    color: "#ef4444",
  },
  {
    icon: Globe,
    title: "WebAssembly",
    description:
      "Portable, sandboxed code execution in the browser. The potential for running third-party plugins safely is what drew me in.",
    difficulty: "Intermediate",
    color: "#8b5cf6",
  },
  {
    icon: Rocket,
    title: "Local-First Architecture",
    description:
      "CRDTs, offline-first patterns, and conflict resolution. Building apps that work without connectivity and sync beautifully when it returns.",
    difficulty: "Advanced",
    color: "#10b981",
  },
];

const recommendations = [
  {
    icon: Braces,
    title: "TypeScript",
    description:
      "The language I use for everything. Strongly typed JavaScript that catches bugs at compile time. If you only learn one thing, make it this.",
    difficulty: "Beginner to Advanced",
    color: "#3b82f6",
  },
  {
    icon: Layers,
    title: "Next.js",
    description:
      "The React framework for production. Server components, edge middleware, API routes — it handles the hard parts so you can focus on building.",
    difficulty: "Intermediate",
    color: "#8b5cf6",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description:
      "The database I trust for everything. Complex queries, JSON support, full-text search, extensions — it handles the widest range of needs.",
    difficulty: "Intermediate",
    color: "#10b981",
  },
  {
    icon: Cloud,
    title: "Cloudflare Workers",
    description:
      "Edge computing with sub-millisecond cold starts. Authentication, rate limiting, API routing — deployed globally in seconds.",
    difficulty: "Intermediate to Advanced",
    color: "#f59e0b",
  },
  {
    icon: Cpu,
    title: "Python",
    description:
      "The language of AI and automation. Essential for anyone interested in machine learning, data pipelines, or scripting.",
    difficulty: "Beginner to Advanced",
    color: "#ef4444",
  },
  {
    icon: Terminal,
    title: "Git & GitHub",
    description:
      "Version control is non-negotiable. Master branches, pull requests, code review — these are the basics of professional development.",
    difficulty: "Beginner",
    color: "#6b7280",
  },
];

const myLearningApproach = [
  {
    title: "Build something real immediately",
    description:
      "I do not learn by reading documentation cover to cover. I pick a project I care about and figure out the technology along the way. Struggling with a real problem teaches faster than any tutorial.",
  },
  {
    title: "Go deep, not wide",
    description:
      "I would rather understand one technology thoroughly than know a hundred superficially. Deep knowledge lets you solve problems others cannot even diagnose.",
  },
  {
    title: "Teach what you learn",
    description:
      "Writing about a concept or explaining it to someone else forces you to truly understand it. If I cannot explain it simply, I do not understand it well enough yet.",
  },
  {
    title: "Embrace the discomfort",
    description:
      "The best learning happens when you feel out of your depth. I actively seek out problems that scare me a little — that is where the growth is.",
  },
];

const booksAndResources = [
  {
    title: "TypeScript in Depth",
    type: "Course",
    description: "Advanced TypeScript patterns, generics, conditional types, and type-safe API design.",
  },
  {
    title: "Designing Data-Intensive Applications",
    type: "Book",
    description: "The best resource for understanding distributed systems, databases, and data architecture.",
  },
  {
    title: "Next.js Documentation",
    type: "Docs",
    description: "The official docs are excellent. I return to them regularly as new features ship.",
  },
  {
    title: "The Rust Book",
    type: "Book",
    description: "The standard introduction to Rust. Clear, comprehensive, and well-written.",
  },
];

const areasOfGrowth = [
  {
    title: "System Design",
    description: "Getting better at designing distributed systems that scale gracefully and fail safely.",
  },
  {
    title: "AI/ML Engineering",
    description: "Moving beyond API calls to understanding models, fine-tuning, and building intelligent features from scratch.",
  },
  {
    title: "Security Engineering",
    description: "Deepening my understanding of encryption, authentication, and privacy-preserving computation.",
  },
  {
    title: "Technical Writing",
    description: "Improving how I communicate complex ideas clearly and concisely.",
  },
];

const faqItems = [
  {
    question: "How do you decide what to learn next?",
    answer:
      "I learn whatever will unblock the next thing I want to build. If I need distributed systems knowledge for a product feature, I go deep on distributed systems. Learning is never abstract for me — it is always tied to a concrete goal.",
  },
  {
    question: "Do I need to learn everything you recommend?",
    answer:
      "No. Start with what matters most for your goals. If you want to build web apps, TypeScript and Next.js are the highest-leverage starting points. If you are interested in AI, start with Python. The list reflects what I use — any subset is valuable.",
  },
  {
    question: "How much time do you spend learning?",
    answer:
      "Learning is woven into everything I do. When I build a product, I learn new patterns. When I debug a hard problem, I learn how the system actually works. Dedicated learning time is maybe an hour or two a day, but the real learning happens in the work itself.",
  },
  {
    question: "What is the most valuable skill for a developer?",
    answer:
      "The ability to learn quickly and independently. Technologies change constantly, but the skill of picking up new things fast — reading docs, experimenting, understanding abstractions — that compounds over an entire career.",
  },
  {
    question: "How do you stay motivated to keep learning?",
    answer:
      "Curiosity, mostly. I genuinely want to understand how things work and how to make them better. The problems I am solving with SP NET products are interesting enough that learning the tools to solve them never feels like a chore.",
  },
];

const relatedPages = [
  {
    title: "Technology",
    description: "The tools I use and why.",
    href: "/explore/technology",
  },
  {
    title: "Expertise",
    description: "Deep dives into specific technical domains.",
    href: "/founder/about",
  },
  {
    title: "Blog",
    description: "Insights and lessons from building in public.",
    href: "/resources/blog",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Learning Resources" },
        ]}
        label="Explore"
        title="Learning Resources"
        titleAccent="What I'm learning and recommend"
        description="Technologies I am currently learning, resources I recommend, and the approach I take to keep growing as a developer."
        icon={<BookOpen className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Learning never stops"
            subtitle="I have been coding since 2018 and I still feel like there is an enormous amount I do not know. That is not discouraging — it is exciting. Here is what I am exploring right now."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                The developers I admire most are the ones who never stop being students.
                Technology moves fast, and the moment you think you know enough is the
                moment you start falling behind. I try to stay curious, stay humble, and
                always be learning something that scares me a little.
              </p>
              <p>
                This page is part personal journal, part recommendation list. The
                technologies I am learning, the resources I trust, and the approach that
                has worked for me. If any of it helps you on your own journey, even better.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Currently Learning"
          title="What I am exploring right now"
          subtitle="Technologies I am actively studying because I believe they will shape what I build next."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {currentlyLearning.map((tech) => (
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
                  <div>
                    <h3 className="text-sm font-medium text-white/70">{tech.title}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/20">
                      {tech.difficulty}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{tech.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Recommendations"
          title="Technologies I recommend learning"
          subtitle="The tools I reach for daily, each one worth your investment."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {recommendations.map((tech) => (
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
                  <div>
                    <h3 className="text-sm font-medium text-white/70">{tech.title}</h3>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-white/20">
                      {tech.difficulty}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{tech.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="My Learning Approach"
          title="How I learn effectively"
          subtitle="The habits and mindset that make learning stick."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {myLearningApproach.map((approach) => (
            <StaggerItem key={approach.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7">
                <h3 className="text-sm font-medium text-white/60 mb-2">{approach.title}</h3>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{approach.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Resources I Trust"
          title="Books, courses, and docs I return to"
          subtitle="Not a comprehensive list — just the things that have genuinely helped me grow."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {booksAndResources.map((resource) => (
            <StaggerItem key={resource.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-white/60">{resource.title}</h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/20 px-2 py-0.5 rounded-full border border-white/[0.04] bg-white/[0.02]">
                    {resource.type}
                  </span>
                </div>
                <p className="text-xs text-white/20 leading-relaxed">{resource.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Areas of Growth"
          title="Where I am pushing myself"
          subtitle="Skills I am actively working to improve."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {areasOfGrowth.map((area) => (
            <StaggerItem key={area.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7">
                <h3 className="text-sm font-medium text-white/60 mb-2">{area.title}</h3>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{area.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ items={faqItems} />

      <RelatedPages pages={relatedPages} />

      <CTASection
        title="Ready to learn something new?"
        titleAccent="Every expert was once a beginner."
        description="Pick a technology, explore the resources, and start building. The best way to learn is by doing."
        primaryAction={{ label: "View Technology Stack", href: "/explore/technology" }}
        secondaryAction={{ label: "Join the Community", href: "https://t.me/ABOUTME_SP" }}
      />
    </>
  );
}
