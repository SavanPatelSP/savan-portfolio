"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  BrainCircuit,
  Shield,
  Sparkles,
  Cpu,
  Eye,
  Globe,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
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

const innovationAreas = [
  {
    icon: BrainCircuit,
    title: "Applied AI",
    color: "#10b981",
    description:
      "I am obsessed with making AI feel personal, not generic. Fine-tuning models for specific use cases, building context-aware systems that learn from how people actually interact with products.",
    capabilities: [
      "Custom model fine-tuning",
      "Context-aware generation",
      "Predictive user assistance",
      "Multi-modal understanding",
    ],
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    color: "#3b82f6",
    description:
      "Privacy is not a feature — it is a principle. I spend real time figuring out how to deliver powerful functionality without compromising what users trust me with.",
    capabilities: [
      "Zero-knowledge authentication",
      "On-device processing",
      "Secure computation",
      "Differential privacy",
    ],
  },
  {
    icon: Sparkles,
    title: "Interface Design",
    color: "#8b5cf6",
    description:
      "I believe software should feel good to use. Adaptive layouts, meaningful motion, interfaces that respond to how you actually work — not how a designer assumed you would.",
    capabilities: [
      "Adaptive interfaces",
      "Motion semantics",
      "Gesture navigation",
      "Spatial computing",
    ],
  },
  {
    icon: Cpu,
    title: "Edge Computing",
    color: "#f59e0b",
    description:
      "Speed matters. I push computation to the edge wherever possible — running AI inference locally, processing data before it leaves the device, building systems that work offline.",
    capabilities: [
      "Edge AI inference",
      "Local data processing",
      "Offline-first systems",
      "Distributed caching",
    ],
  },
];

const currentExperiments = [
  {
    title: "On-Device AI Processing",
    description:
      "Running lightweight models directly on user devices for instant text suggestions and smart replies — no server roundtrip, no privacy compromise.",
    status: "Active",
    area: "Applied AI",
  },
  {
    title: "Encrypted Search",
    description:
      "Search that works on encrypted data. Users can find messages and documents without ever exposing content to the server.",
    status: "Active",
    area: "Privacy Architecture",
  },
  {
    title: "Adaptive Notifications",
    description:
      "A system that learns when you actually want to be notified — reducing noise while making sure important things never slip through.",
    status: "Research",
    area: "Applied AI",
  },
  {
    title: "WebAssembly Plugin Runtime",
    description:
      "A sandboxed environment for running third-party plugins safely inside SP NET products. Extensibility without the security risk.",
    status: "Research",
    area: "Edge Computing",
  },
];

const futureVision = [
  {
    icon: Eye,
    title: "Ambient Intelligence",
    description:
      "Software that anticipates what you need before you ask — understanding context like time, activity, and relationships to surface the right thing at the right moment.",
    timeline: "2028+",
  },
  {
    icon: Globe,
    title: "Decentralized Identity",
    description:
      "A world where you own your social graph and identity. Switch products without losing your network — your connections travel with you.",
    timeline: "2029+",
  },
  {
    icon: Layers,
    title: "Universal Computing Layer",
    description:
      "Code that runs anywhere — edge, cloud, device, or peer. Applications become location-independent, executing wherever resources are available.",
    timeline: "2030+",
  },
];

const philosophyPrinciples = [
  {
    title: "Solve real problems first",
    description:
      "I never start with a technology and look for a problem. I start with a frustration, a gap, something that does not work the way it should — and then I find the right technology to fix it.",
  },
  {
    title: "Prototype fast, kill faster",
    description:
      "Most ideas fail. That is fine. I build the smallest version of an idea, test it against reality, and if it does not hold up, I move on. The ones that survive get everything I have.",
  },
  {
    title: "Privacy is non-negotiable",
    description:
      "If a feature cannot be built without compromising user trust, it does not get built. Period. I would rather ship a simpler version that respects privacy than a powerful version that does not.",
  },
  {
    title: "Share what you learn",
    description:
      "Failed experiments, hard-won insights, technical discoveries — I try to share them openly. Innovation moves faster when knowledge flows freely.",
  },
];

const faqItems = [
  {
    question: "What does innovation mean to you personally?",
    answer:
      "Innovation is not about using the newest tool or the trendiest framework. For me, it is about finding genuinely better solutions to problems people actually have. Some of my most innovative work has been figuring out how to do something simpler, not more complex.",
  },
  {
    question: "How do you balance innovation with shipping products?",
    answer:
      "I keep about 70% of my effort on production work and 30% on experiments. As the core products stabilize, that ratio shifts — more time for exploration. The key is that experiments must connect to a real use case, even if the immediate application is not obvious.",
  },
  {
    question: "Can I participate in your experiments?",
    answer:
      "As experiments move from internal research to user-facing features, I invite beta testers and community members to provide feedback. The recommended first point of contact is PCA at https://t.me/SAVANPATELSP_BOT — reach out to hear about upcoming opportunities.",
  },
  {
    question: "How do you keep AI innovation ethical?",
    answer:
      "Every AI experiment starts with a privacy review. I prioritize on-device processing and anonymization. When server-side processing is necessary, data is encrypted and minimized. If an AI feature cannot meet my privacy standards, it does not ship.",
  },
  {
    question: "What is the relationship between innovation and products?",
    answer:
      "Innovation feeds products through a pipeline. Successful experiments become product features. Failed experiments generate knowledge that informs future work. Nothing is wasted — every experiment teaches me something valuable.",
  },
];

const relatedPages = [
  {
    title: "Technology",
    description: "The tech stack enabling innovation.",
    href: "/explore/technology",
  },
  {
    title: "Future Vision",
    description: "Where I see things heading long term.",
    href: "/explore/vision",
  },
  {
    title: "Projects",
    description: "Current development efforts across all areas.",
    href: "/explore/projects",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Innovation" },
        ]}
        label="Explore"
        title="Innovation"
        titleAccent="Pushing boundaries"
        description="The ideas, experiments, and creative engineering that keep pushing me to build something better than what exists today."
        icon={<Lightbulb className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="My approach"
            title="Innovation with intention"
            subtitle="I am not interested in innovation for its own sake. Every experiment I run connects to a real problem, and every prototype has to prove its worth before I invest further."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                The tech world is full of impressive demos that solve no real problem.
                I have learned to be skeptical of novelty for novelty&apos;s sake. Instead, I
                focus my experimental energy on things that could genuinely change how
                people interact with software — better privacy, smarter interfaces, faster
                responses, more personal experiences.
              </p>
              <p>
                This page is a window into how I think about innovation. The areas I am
                researching, the experiments I am running, the long-term ideas that excite
                me, and the principles that keep me grounded. Innovation should serve people,
                not the other way around.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Innovation Areas"
          title="Where I am pushing"
          subtitle="Four domains where focused research can meaningfully change the products I build."
        />

        <div className="space-y-5">
          {innovationAreas.map((area, i) => (
            <FadeIn key={area.title} delay={i * 0.08}>
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
                          backgroundColor: `${area.color}0d`,
                          borderColor: `${area.color}1a`,
                          color: area.color,
                        }}
                      >
                        <area.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-medium text-white/70">{area.title}</h3>
                    </div>
                    <p className="text-sm text-white/25 leading-relaxed mb-4 max-w-2xl">
                      {area.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {area.capabilities.map((cap) => (
                        <span
                          key={cap}
                          className="inline-flex items-center rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/25"
                        >
                          {cap}
                        </span>
                      ))}
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
          label="Current Experiments"
          title="Running right now"
          subtitle="Active experiments being tested, validated, or prepared for integration into products."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {currentExperiments.map((exp) => (
            <StaggerItem key={exp.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/20">
                    {exp.area}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono",
                      exp.status === "Active"
                        ? "text-emerald-400/60 bg-emerald-500/5 border border-emerald-500/10"
                        : "text-amber-400/60 bg-amber-500/5 border border-amber-500/10"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full animate-pulse",
                        exp.status === "Active" ? "bg-emerald-400" : "bg-amber-400"
                      )}
                    />
                    {exp.status}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-white/60 mb-2">{exp.title}</h3>
                <p className="text-xs text-white/20 leading-relaxed">{exp.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Future Vision"
          title="Ideas that excite me"
          subtitle="Long-term research directions I find genuinely fascinating and worth pursuing."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {futureVision.map((vision) => (
            <StaggerItem key={vision.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                    <vision.icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-white/20">{vision.timeline}</span>
                </div>
                <h3 className="text-sm font-medium text-white/60 mb-2">{vision.title}</h3>
                <p className="text-xs text-white/25 leading-relaxed">{vision.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Philosophy"
          title="How I think about innovation"
          subtitle="Principles that keep me honest about what actually matters."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {philosophyPrinciples.map((p) => (
            <StaggerItem key={p.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7">
                <h3 className="text-sm font-medium text-white/60 mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{p.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ items={faqItems} />

      <RelatedPages pages={relatedPages} />

      <CTASection
        title="Want to see what's next?"
        titleAccent="I share updates as things develop."
        description="Join the community to get early access to experiments, provide feedback on prototypes, and shape what gets built."
        primaryAction={{ label: "Join the Community", href: "https://t.me/ABOUTME_SP" }}
        secondaryAction={{ label: "Back to Explore", href: "/explore" }}
      />
    </>
  );
}
