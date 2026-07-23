"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  FolderKanban,
  Users,
  Workflow,
  Calendar,
  Search,
  Shield,
  Zap,
  Globe,
  Settings,
  Bell,
} from "lucide-react";
import { spring } from "@/lib/motion";
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

const features = [
  {
    icon: FileText,
    title: "Documents & Wikis",
    description:
      "A real-time collaborative document editor with rich formatting, nested pages, inline databases, and template libraries. Build team wikis, meeting notes, and project specs in one place.",
  },
  {
    icon: FolderKanban,
    title: "Project Management",
    description:
      "Kanban boards, Gantt charts, sprints, and custom workflows. Track tasks, milestones, and dependencies with full visibility across teams and projects.",
  },
  {
    icon: Users,
    title: "Team Spaces",
    description:
      "Dedicated spaces for teams with shared documents, task boards, chat threads, and file storage. Every team gets a focused workspace that connects to the broader organization.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive processes with a visual builder. Trigger actions on events, schedule routines, and connect across documents, tasks, and communications without writing code.",
  },
  {
    icon: Calendar,
    title: "Calendar & Scheduling",
    description:
      "Integrated calendar with meeting scheduling, time blocking, and availability sharing. Connects to tasks and documents so your schedule reflects your actual work.",
  },
  {
    icon: Search,
    title: "Universal Search",
    description:
      "Search across every document, task, message, and file in your workspace. AI-powered ranking surfaces the most relevant results based on context and recency.",
  },
];

const capabilities = [
  {
    icon: Shield,
    title: "Privacy by Design",
    description: "End-to-end encryption for sensitive documents and team spaces. Your work data stays yours.",
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    description: "Multiple people editing the same document simultaneously with conflict-free resolution and instant sync.",
  },
  {
    icon: Globe,
    title: "Cross-Platform",
    description: "Native apps for web, desktop, and mobile. Your workspace follows you everywhere.",
  },
  {
    icon: Settings,
    title: "API & Integrations",
    description: "Connect to SP NET GRAM, ADMIN OS, and external tools through a unified API layer.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Context-aware notifications that surface what matters — task deadlines, document mentions, and team updates.",
  },
];

const faqItems = [
  {
    question: "What is SP NET WORKPLACE?",
    answer: "SP NET WORKPLACE is a unified digital workspace that brings together documents, project management, team collaboration, and communication into one seamless platform. It is designed to replace the fragmented stack of tools most teams use today.",
  },
  {
    question: "How does it differ from Notion or Confluence?",
    answer: "SP NET WORKPLACE is built as part of the SP NET ecosystem, meaning it integrates natively with SP NET GRAM for messaging, SP NET ADMIN OS for permissions, and SP NET AI for intelligent assistance. It also offers end-to-end encryption for sensitive content and workflow automation that connects across the entire platform.",
  },
  {
    question: "Can I migrate from other workspace tools?",
    answer: "Yes. SP NET WORKPLACE will support imports from Notion, Confluence, Google Docs, and other popular workspace tools. Document structure, formatting, and attachments transfer seamlessly.",
  },
  {
    question: "Is SP NET WORKPLACE available now?",
    answer: "SP NET WORKPLACE is currently in research and development. Core features are being designed and prototyped. Join the waitlist to get early access when we launch our beta program.",
  },
  {
    question: "How does pricing work?",
    answer: "SP NET WORKPLACE will offer a generous free tier for small teams, with premium plans for larger organizations that need advanced features like SSO, compliance tools, and dedicated support.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer: "For any inquiries about SP NET WORKPLACE, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET GRAM",
    description: "Next-generation messaging with privacy and premium experiences.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration, redesigned for modern organizations.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET AI",
    description: "Intelligent automation powering the entire SP NET ecosystem.",
    href: "/products/sp-net-ai",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform bringing all SP NET products together.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET Cloud",
    description: "Scalable cloud infrastructure for the SP NET platform.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetWorkplaceClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET WORKPLACE" }]}
        label="Core Product"
        badge="Research"
        title="SP NET WORKPLACE"
        titleAccent="Your complete digital workspace"
        description="A unified digital workplace bringing together documents, project management, team collaboration, and communication into one seamless platform."
        icon={<Briefcase className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="One workspace for everything your team does"
            subtitle="SP NET WORKPLACE replaces the fragmented stack of productivity tools with a single, cohesive platform. Documents, projects, communication, and workflows — all connected, all in sync."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Modern teams juggle a dozen disconnected tools — one for documents, another for
                project management, a third for communication, and yet another for scheduling. Every
                tool has its own interface, its own data model, and its own learning curve. The result
                is information silos, context switching, and wasted time.
              </p>
              <p>
                SP NET WORKPLACE eliminates that fragmentation. Every feature — from the document
                editor to the project board to the calendar — is designed as an integrated part of a
                unified system. Data flows naturally between tools. A task can link to a document, a
                document can embed a project timeline, and a meeting can pull context from both.
              </p>
              <p>
                Built as part of the SP NET ecosystem, WORKPLACE connects natively to SP NET GRAM
                for messaging, SP NET ADMIN OS for permissions and organization management, and
                SP NET AI for intelligent assistance across every feature.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="Everything your team needs"
          subtitle="Six core capabilities designed to cover the full spectrum of team productivity."
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/8 text-indigo-400 border border-indigo-500/10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">{feature.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Capabilities"
          title="Built for how teams actually work"
          subtitle="The design principles that shape every part of SP NET WORKPLACE."
        />

        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <StaggerItem key={cap.title}>
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                  <cap.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1.5">{cap.title}</h3>
                  <p className="text-xs text-white/20 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Ready to unify your workspace?"
        description="SP NET WORKPLACE is being built to transform how teams collaborate. Join the waitlist to get early access."
        primaryAction={{ label: "Join the Waitlist", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
