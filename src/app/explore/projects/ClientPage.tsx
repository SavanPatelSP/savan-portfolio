"use client";

import { motion } from "framer-motion";
import {
  FolderGit2,
  Code2,
  Lock,
  GitBranch,
  Clock,
  Calendar,
  Target,
  Cpu,
  Server,
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

const activeProjects = [
  {
    icon: Code2,
    name: "SP NET Platform Core",
    description:
      "The monorepo that holds everything together — shared packages, the design system, authentication, and core utilities. This is the foundation every product sits on.",
    stack: ["TypeScript", "Next.js", "Prisma", "PostgreSQL"],
    status: "Active",
    progress: 65,
    color: "#3b82f6",
  },
  {
    icon: Cpu,
    name: "SP NET AI Engine",
    description:
      "The intelligence layer I am building to power smart features across all products. Natural language understanding, content generation, and predictive analytics — all packaged as a reusable service.",
    stack: ["Python", "FastAPI", "OpenAI", "pgvector"],
    status: "Active",
    progress: 40,
    color: "#10b981",
  },
  {
    icon: Server,
    name: "SP NET API Gateway",
    description:
      "A unified gateway that handles routing, authentication, and rate limiting across all backend services. Built for the edge with sub-millisecond overhead.",
    stack: ["Hono", "Cloudflare Workers", "Redis", "TypeScript"],
    status: "Active",
    progress: 55,
    color: "#8b5cf6",
  },
];

const privateProjects = [
  {
    title: "Internal Tooling",
    description:
      "Custom developer tools for code generation, deployment automation, and infrastructure management. Not glamorous, but critical for shipping fast.",
    icon: Lock,
  },
  {
    title: "Experimental AI Models",
    description:
      "Fine-tuned models for code completion, content summarization, and smart search. These experiments directly inform the production AI engine.",
    icon: Lock,
  },
  {
    title: "Design System Components",
    description:
      "A component library built on Radix and Tailwind that powers every SP NET product. Shared across the board for visual consistency.",
    icon: Lock,
  },
  {
    title: "Data Pipeline Infrastructure",
    description:
      "Event streaming, ETL processes, and analytics pipelines that turn raw usage data into insights for product decisions.",
    icon: Lock,
  },
];

const openSourceProjects = [
  {
    name: "SP NET UI Kit",
    description:
      "An open-source React component library I am planning to release. Built with Radix, Tailwind, and Framer Motion — accessible, composable, production-ready.",
    timeline: "Planned for 2027",
  },
  {
    name: "SP NET CLI",
    description:
      "Command-line tools for scaffolding, deployment, and project management. Designed to make the developer experience as smooth as possible.",
    timeline: "Planned for 2027",
  },
  {
    name: "TypeScript Utilities",
    description:
      "A collection of type-safe utility functions and runtime validators I use across the codebase. Will be extracted and open-sourced once stable.",
    timeline: "Planned for 2028",
  },
];

const faqItems = [
  {
    question: "What are you actively working on?",
    answer:
      "Three core projects are in active development: the Platform Core (the foundational monorepo), the AI Engine (intelligence layer), and the API Gateway (unified routing). These form the backbone that every SP NET product is built on, so getting them right is the top priority.",
  },
  {
    question: "Why keep some projects private?",
    answer:
      "Internal tooling, experimental models, and data pipelines are private because they are either not ready for external use or would create confusion if released before the products they support. I plan to open-source pieces of them as they mature.",
  },
  {
    question: "Will you open-source anything?",
    answer:
      "Absolutely. The UI Kit is planned for 2027, followed by the CLI and TypeScript utilities. I want to give back to the open-source community that has taught me so much — I just want to make sure what I release is actually useful and well-documented.",
  },
  {
    question: "How do you decide what to work on?",
    answer:
      "I work on whatever will unblock the most progress across all products. Right now that means the core infrastructure. Once that is stable, I can move faster on the individual products. It is a constant tradeoff between building new features and strengthening the foundation.",
  },
  {
    question: "How can someone follow along?",
    answer:
      "I share updates on the Telegram community and occasionally on social media. As the open-source projects launch, GitHub will be the best place to follow development in real time.",
  },
];

const relatedPages = [
  {
    title: "Products",
    description: "The products these projects power.",
    href: "/explore/products",
  },
  {
    title: "GitHub",
    description: "Where the code lives and evolves.",
    href: "https://github.com/aboutme-sp",
  },
  {
    title: "Innovation",
    description: "Experimental work that feeds into projects.",
    href: "/explore/innovation",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Projects" },
        ]}
        label="Explore"
        title="Projects"
        titleAccent="Active development"
        description="What I am coding right now — active projects, private experiments, and the open-source work I am planning to give back."
        icon={<FolderGit2 className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Building in public, one commit at a time"
            subtitle="I like to keep things honest. These are the projects I spend my days and nights on — what is working, what is not, and where it is all headed."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                I have been writing code since 2018, and the projects below represent
                where that experience has led me. Some are big and ambitious, others are
                small experiments. All of them teach me something.
              </p>
              <p>
                I keep this page updated with what I am actually working on — not a
                polished marketing version, but the real picture. Active projects get
                progress bars. Private projects are listed honestly. Open-source plans
                include timelines so I can be held accountable.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Active Projects"
          title="Currently in development"
          subtitle="Three projects forming the core infrastructure of everything I build."
        />

        <div className="space-y-5">
          {activeProjects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.08}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                whileHover={{ y: -3, scale: 1.005 }}
                transition={spring.gentle}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg border"
                        style={{
                          backgroundColor: `${project.color}0d`,
                          borderColor: `${project.color}1a`,
                          color: project.color,
                        }}
                      >
                        <project.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white/70">{project.name}</h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/60">
                          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-white/25 leading-relaxed mb-4 max-w-2xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/25"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1 rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: project.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${project.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: SLOW, delay: 0.3, ease: ease.out }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/20">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Private Development"
          title="Internal tools and experiments"
          subtitle="Things I work on behind the scenes — not ready for the world yet, but essential to the process."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {privateProjects.map((project) => (
            <StaggerItem key={project.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/25">
                    <project.icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-sm font-medium text-white/50">{project.title}</h3>
                </div>
                <p className="text-xs text-white/20 leading-relaxed">{project.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Open Source"
          title="Giving back to the community"
          subtitle="Planned open-source releases I am working toward."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {openSourceProjects.map((project) => (
            <StaggerItem key={project.name}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="h-3.5 w-3.5 text-white/25" />
                  <h3 className="text-sm font-medium text-white/60">{project.name}</h3>
                </div>
                <p className="text-xs text-white/25 leading-relaxed mb-3">{project.description}</p>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/10 bg-amber-500/5 px-2.5 py-1 text-[10px] font-mono text-amber-400/60">
                  <Clock className="h-2.5 w-2.5" />
                  {project.timeline}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ items={faqItems} />

      <RelatedPages pages={relatedPages} />

      <CTASection
        title="Want to follow along?"
        titleAccent="I share updates regularly."
        description="Join the community to get early access to betas, provide feedback, and watch projects evolve."
        primaryAction={{ label: "Join the Community", href: "https://t.me/ABOUTME_SP" }}
        secondaryAction={{ label: "View All Products", href: "/products" }}
      />
    </>
  );
}
