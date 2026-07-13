"use client";

import { Orbit, Glasses, Wifi, Link2, Brain, Rocket, Compass, Cpu, Globe, Lightbulb } from "lucide-react";
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

const emergingTech = [
  {
    icon: Glasses,
    title: "AR/VR & Spatial Computing",
    description:
      "I'm genuinely excited about what spatial computing could mean for productivity tools. Imagine navigating GRAM notifications in 3D space, or having an ADMIN OS dashboard that wraps around you. I've been reading about WebXR and experimenting with simple AR overlays. It's early, but the potential is real.",
  },
  {
    icon: Wifi,
    title: "Internet of Things",
    description:
      "I've been tinkering with Raspberry Pi sensors and thinking about how IoT could make SP NET products more context-aware. Notifications triggered by physical location, environmental data influencing scheduling, devices that coordinate without human intervention. The hardware side is new to me, which makes it extra fun.",
  },
  {
    icon: Link2,
    title: "Blockchain & Decentralization",
    description:
      "I'm not a crypto evangelist, but I think blockchain has genuine utility in specific areas — verifiable credentials, decentralized identity, transparent audit trails. I've been experimenting with these use cases pragmatically, not ideologically. If a decentralized approach solves a real problem, I'll use it.",
  },
];

const deeperExplorations = [
  {
    icon: Brain,
    title: "Neuromorphic Computing",
    description: "Brain-inspired computing architectures that could enable ultra-low-power AI at the edge. I'm still early in understanding this, but the idea of AI that sips power instead of gulping it is fascinating.",
  },
  {
    icon: Globe,
    title: "Digital Twins",
    description: "Virtual replicas of systems that let you simulate before you deploy. I'm thinking about digital twins for SP NET infrastructure — test changes in a virtual environment before pushing to production.",
  },
  {
    icon: Cpu,
    title: "Quantum-Ready Security",
    description: "Quantum computers will eventually break current encryption. I'm researching post-quantum cryptography now so SP NET's security doesn't become obsolete overnight. It's the kind of problem you want to solve before it becomes urgent.",
  },
];

const roadmap = [
  { phase: "Currently Exploring", timeframe: "Now", items: ["WebXR prototypes for GRAM", "IoT sensor experiments with Raspberry Pi", "Post-quantum cryptography research", "Decentralized identity pilots"] },
  { phase: "Next 1-2 Years", timeframe: "Soon", items: ["Spatial computing workspaces", "Context-aware IoT automation", "Blockchain-verified credentials", "Edge AI inference"] },
  { phase: "Long-Term Vision", timeframe: "Someday", items: ["Full immersive collaboration", "Ambient intelligence", "Quantum-resistant infrastructure", "Open innovation platform"] },
];

const vision = [
  {
    icon: Compass,
    title: "Technology Should Disappear",
    description: "The best technology is the kind you don't notice. It works so seamlessly, so naturally, that it becomes invisible. That's the future I want to build — products that adapt to people, not the other way around.",
  },
  {
    icon: Lightbulb,
    title: "Solve Real Problems First",
    description: "I don't chase technology trends for their own sake. Every emerging tech I explore has to pass one test: does it solve a problem I actually have, or a problem my users actually face? If not, it's interesting but not urgent.",
  },
  {
    icon: Rocket,
    title: "Build for the Long Term",
    description: "I'm in this for the long haul. SP NET isn't a quick project — it's a decades-long endeavor. The technology choices I make today need to hold up five, ten, twenty years from now. That shapes everything.",
  },
];

const faqItems = [
  {
    question: "How do you decide which emerging technologies to explore?",
    answer:
      "Three questions: Does it solve a real problem I have? Is it mature enough to be useful, or still just a research paper? And can it integrate with what I've already built? If the answer to all three is yes, it moves from 'interesting read' to 'weekend project.'",
  },
  {
    question: "Are you actually building with blockchain?",
    answer:
      "Not in production, but I've prototyped decentralized identity concepts and experimented with verifiable credentials. Blockchain is a tool, not a religion. For the specific problems of identity verification and audit trails, decentralized approaches make genuine sense. For everything else, a database is fine.",
  },
  {
    question: "What excites you most about the future?",
    answer:
      "Honestly, the convergence. When AI meets spatial computing meets IoT meets secure infrastructure — that's when things get really interesting. Not any single technology, but the combination of all of them creating experiences we can't imagine today.",
  },
  {
    question: "How do you stay current on emerging tech?",
    answer:
      "I follow researchers and engineers on social media, read technical blogs and papers when a specific problem demands it, attend virtual conferences occasionally, and most importantly — I build things. Nothing teaches you about a technology faster than trying to use it for something real.",
  },
  {
    question: "Do you think SP NET will use all these technologies?",
    answer:
      "Probably not. Some will turn out to be hype. Some will mature at the wrong time. Some will be brilliant but impractical for my use case. The point of exploring now is to be ready when the right technology meets the right moment. I'd rather be early and informed than late and scrambling.",
  },
];

const relatedPages = [
  {
    title: "Innovation Lab",
    description: "Where these future technologies get prototyped and tested.",
    href: "/research/innovation-lab",
  },
  {
    title: "Artificial Intelligence",
    description: "AI as the connective tissue across future technologies.",
    href: "/research/ai",
  },
  {
    title: "SP NET Vision",
    description: "The long-term vision that guides technology choices.",
    href: "/explore/vision",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "Future Technologies" },
        ]}
        label="Research"
        title="Future Technologies"
        titleAccent="What excites me next"
        description="The emerging technologies I'm curious about — AR/VR, IoT, blockchain, and the long-term vision that guides how I think about building SP NET."
        icon={<Orbit className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="Looking ahead, building today"
          subtitle="I don't research future technology to write whitepapers. I explore it because I want to be ready when the right moment arrives. Every technology I investigate is tied to a real question: could this make SP NET better for the people who use it?"
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Approach", value: "Curious but pragmatic" },
              { label: "Filter", value: "Does it solve a real problem?" },
              { label: "Timeline", value: "Ready when the moment arrives" },
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
          label="Technologies I'm Watching"
          title="What's caught my attention"
          subtitle="These aren't trend reports — they're technologies I've personally spent time learning about, experimenting with, or building prototypes for."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergingTech.map((tech) => {
            const Icon = tech.icon;
            return (
              <StaggerItem key={tech.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-cyan-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {tech.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Deeper Explorations"
          title="Things I'm still learning about"
          subtitle="Technologies where I'm earlier in my journey — reading, experimenting, and building understanding."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deeperExplorations.map((area) => {
            const Icon = area.icon;
            return (
              <StaggerItem key={area.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-cyan-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Long-Term Vision"
          title="The future I'm building toward"
          subtitle="These aren't corporate strategy points — they're personal beliefs about where technology should go and what role I want to play."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vision.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-cyan-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Roadmap"
          title="Where my exploration is heading"
          subtitle="A rough timeline of what I'm working on now and what I plan to explore next. Treat this as intentions, not commitments."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roadmap.map((phase, i) => (
              <motion.div
                key={phase.phase}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.08, ease: ease.out }}
              >
                <div className="mb-4">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/20 mb-1">
                    {phase.timeframe}
                  </p>
                  <p className="text-sm font-medium text-white/60">
                    {phase.phase}
                  </p>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-white/30 leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-cyan-400/40 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Building for"
        titleAccent="what comes next"
        description="The future isn't something that happens to you — it's something you build. I'm exploring these technologies so I can shape the future of SP NET, not just react to it."
        primaryAction={{
          label: "Explore the Innovation Lab",
          href: "/research/innovation-lab",
        }}
        secondaryAction={{
          label: "View All Research",
          href: "/research",
        }}
      />
    </>
  );
}
