"use client";

import { Bot, Shield, Workflow, Brain, Lock, Zap, Cpu, Database } from "lucide-react";
import { motion } from "framer-motion";
import { ease, spring, NORMAL } from "@/lib/motion";
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
    icon: Bot,
    title: "Intelligent Messaging",
    description:
      "AI-powered message assistance that helps you compose, summarize, and manage conversations across SP NET GRAM. Smart replies, tone adjustment, and real-time translation built directly into the messaging experience.",
  },
  {
    icon: Workflow,
    title: "Automated Workflows",
    description:
      "Streamline repetitive tasks with intelligent automation across the SP NET ecosystem. From onboarding sequences to approval pipelines, SP NET AI handles the routine so you can focus on what matters.",
  },
  {
    icon: Brain,
    title: "Ecosystem Integration",
    description:
      "A unified intelligence layer that connects SP NET GRAM, ADMIN OS, and every future product. Context flows seamlessly across tools, giving you an assistant that truly understands your entire workflow.",
  },
  {
    icon: Lock,
    title: "Privacy-First Architecture",
    description:
      "Built with privacy as a foundational principle. All AI processing respects your data boundaries with on-device inference options, zero data retention by default, and transparent model behavior.",
  },
];

const ecosystemCapabilities = [
  {
    icon: Zap,
    title: "Smart Compose",
    description:
      "Draft emails, messages, and documents in seconds. SP NET AI learns your communication style and adapts to your preferences across every SP NET product.",
  },
  {
    icon: Database,
    title: "Knowledge Retrieval",
    description:
      "Search and surface information across your entire SP NET workspace. Find messages, documents, and admin records with natural language queries.",
  },
  {
    icon: Cpu,
    title: "Contextual Awareness",
    description:
      "SP NET AI understands the full context of your work — from recent conversations in GRAM to pending approvals in ADMIN OS — and surfaces the right information at the right time.",
  },
];

const privacyFeatures = [
  {
    title: "On-Device Processing",
    description:
      "Sensitive operations run directly on your device. No raw data leaves your environment unless you explicitly choose to share it for enhanced cloud-powered features.",
  },
  {
    title: "Zero Data Retention",
    description:
      "By default, SP NET AI does not store conversation history or personal data beyond the active session. Your interactions remain yours — always.",
  },
  {
    title: "Transparent Model Behavior",
    description:
      "Every AI-generated response includes clear reasoning and source attribution. You always know why a suggestion was made and where the information came from.",
  },
  {
    title: "User-Controlled Permissions",
    description:
      "Fine-grained controls let you decide exactly what SP NET AI can access. Enable or disable specific capabilities per product, per team, or per individual request.",
  },
];

const faqItems = [
  {
    question: "What is SP NET AI and how does it fit into the ecosystem?",
    answer:
      "SP NET AI is the intelligence layer being built to power experiences across every SP NET product. It provides smart assistance in SP NET GRAM for messaging, automated workflows in SP NET ADMIN OS, and will extend to every future product in the ecosystem. Think of it as the brain that connects and enhances all SP NET tools.",
  },
  {
    question: "Is my data safe when using SP NET AI features?",
    answer:
      "Privacy is a foundational principle of SP NET AI. The architecture is designed with on-device processing options, zero data retention by default, and user-controlled permissions. Your data boundaries are respected at every level, and no raw data is stored beyond active sessions unless you opt into cloud-enhanced features.",
  },
  {
    question: "When will SP NET AI be available?",
    answer:
      "SP NET AI is currently being built. Core AI capabilities will roll out incrementally as each SP NET product matures. The first features are expected to appear within SP NET GRAM and SP NET ADMIN OS as those products reach their respective launch milestones.",
  },
  {
    question: "Can I use SP NET AI features independently of other SP NET products?",
    answer:
      "While SP NET AI is designed to work best as an integrated layer across the ecosystem, standalone features like smart compose and knowledge retrieval will also be available. The AI platform is being built to be useful both within and beyond the SP NET ecosystem.",
  },
  {
    question: "What AI models power SP NET AI?",
    answer:
      "SP NET AI is being built with a hybrid approach — leveraging both carefully fine-tuned open-source models and purpose-built inference pipelines. The goal is to balance performance, cost efficiency, and privacy, with the flexibility to run models locally or in the cloud depending on the task.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer:
      "For any inquiries about SP NET AI, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET GRAM",
    description: "Next-generation messaging with AI-powered assistance built in.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration with automated AI workflows.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET Robotics",
    description: "Robotics research powered by the SP NET AI platform.",
    href: "/products/sp-net-robotics",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform bringing all SP NET products together.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET Cloud",
    description: "Cloud infrastructure for AI inference and model hosting.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "About Savan Patel",
    description: "Founder & Product Engineer building the SP NET ecosystem.",
    href: "/founder/about",
  },
];

export default function SPNetAIPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "SP NET AI" },
        ]}
        label="AI Platform"
        badge="Building"
        title="SP NET AI"
        titleAccent="Intelligence for the SP NET ecosystem"
        description="An AI platform being built to power intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration."
        icon={<Bot className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="AI that understands your entire workflow"
          subtitle="SP NET AI is being designed as the intelligence backbone of the SP NET ecosystem. Rather than adding AI as a bolt-on feature, it is being woven into the fabric of every product — understanding context across messaging, administration, and collaboration to deliver truly useful assistance."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Ecosystem-Wide", value: "Unified AI layer across all products" },
              { label: "Privacy-First", value: "On-device processing and zero retention" },
              { label: "Context-Aware", value: "Understands your full work context" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
              >
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/20 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Features"
          title="Built for intelligent productivity"
          subtitle="Every feature is designed to reduce friction and amplify your capabilities across the SP NET ecosystem."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={feature.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-emerald-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="How It Works"
          title="Powering the entire ecosystem"
          subtitle="SP NET AI connects context and intelligence across every product in the SP NET ecosystem, creating a seamless experience that adapts to how you work."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {ecosystemCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <StaggerItem key={cap.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-emerald-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
        <FadeIn delay={0.15}>
          <div className="mt-12 rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 shrink-0">
                <Brain className="h-6 w-6 text-emerald-400/50" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Unified Intelligence Layer
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  Instead of isolated AI features in each product, SP NET AI operates as a single unified intelligence layer. Context, preferences, and learned behaviors carry across every interaction — whether you are messaging in GRAM, managing teams in ADMIN OS, or using future SP NET products.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Privacy & Security"
          title="Your data, your rules"
          subtitle="SP NET AI is built with a privacy-first architecture. Every design decision prioritizes data sovereignty, transparency, and user control."
        />
        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {privacyFeatures.map((item) => (
            <StaggerItem key={item.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-4 w-4 text-emerald-400/50" />
                  <h3 className="text-sm font-medium text-white/70">
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

      <FAQ
        title="Frequently Asked Questions"
        items={faqItems}
      />

      <RelatedPages
        title="Explore More"
        pages={relatedPages}
      />

      <CTASection
        title="Intelligence that scales"
        titleAccent="with your ecosystem"
        description="SP NET AI is being built to transform how you work across every SP NET product. Stay updated on the latest developments."
        primaryAction={{
          label: "Learn About SP NET INC",
          href: "/company/about",
        }}
        secondaryAction={{
          label: "View All Products",
          href: "/products",
        }}
      />
    </>
  );
}
