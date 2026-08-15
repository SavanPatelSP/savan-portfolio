"use client";

import {
  Link2,
  Coins,
  Shield,
  Globe,
  Layers,
  Building2,
  Wallet,
  Lock,
  ArrowUpRight,
  Scan,
  Code2,
  Infinity,
  Lightbulb,
  Mountain,
  Eye,
  TrendingUp,
  Timer,
  Anchor,
} from "lucide-react";
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
  BlurReveal,
} from "@/components/ui/AnimationPrimitives";

const platformFacts = [
  { label: "Platform Type", value: "Private Blockchain" },
  { label: "Developer", value: "SP NET INC" },
  { label: "First Token", value: "SavaroX" },
  { label: "Status", value: "In Development" },
];

const ecosystemItems = [
  { icon: Coins, title: "SavaroX", status: "In Development" as const, description: "The first official token on SP NET BLOCKCHAIN. Designed for utility and governance within the ecosystem." },
  { icon: Coins, title: "Future Official Tokens", status: "Planned" as const, description: "The platform supports multiple official tokens as the ecosystem expands." },
  { icon: Wallet, title: "Digital Asset Wallet", status: "Planned" as const, description: "Infrastructure for storing, managing, and transacting digital assets on the platform." },
  { icon: Scan, title: "Blockchain Explorer", status: "Planned" as const, description: "A transparent explorer for verifying transactions and platform activity." },
  { icon: Code2, title: "Developer API", status: "Future Vision" as const, description: "APIs enabling developers to build on and integrate with the platform." },
  { icon: Layers, title: "Developer Platform", status: "Future Vision" as const, description: "A comprehensive platform for building blockchain-powered applications." },
  { icon: Building2, title: "Enterprise Solutions", status: "Future Vision" as const, description: "Enterprise-grade blockchain infrastructure for organizations." },
  { icon: Globe, title: "Ecosystem Expansion", status: "Future Vision" as const, description: "A growing ecosystem of blockchain-powered products and services." },
];

const statusStyles = {
  "In Development": "border-amber-500/20 bg-amber-500/8 text-amber-400/70",
  "Planned": "border-blue-500/20 bg-blue-500/8 text-blue-400/70",
  "Future Vision": "border-white/[0.06] bg-white/[0.02] text-white/30",
};

const principlesData = [
  { icon: Lock, title: "Security", description: "Security is the foundation. Every layer of the platform is designed with protection of digital assets and data as the primary requirement." },
  { icon: TrendingUp, title: "Scalability", description: "Architected for growth. The platform is designed to scale alongside the ecosystem, supporting expansion in users, tokens, and services." },
  { icon: Shield, title: "Reliability", description: "Built for uninterrupted operation. Platform infrastructure emphasizes stability and consistent performance for mission-critical use cases." },
  { icon: Eye, title: "Transparency", description: "Verifiable operations are a core principle. Future explorer functionality will provide clear visibility into platform activity." },
  { icon: Lightbulb, title: "Innovation", description: "Designed with a long-term view. The platform evolves through deliberate research and development, not market cycles." },
  { icon: Timer, title: "Long-Term Sustainability", description: "Built to last. Every decision prioritizes the platform's viability over years and decades, not short-term trends." },
];

const whyItems = [
  { icon: Globe, title: "Unified Ecosystem", description: "SP NET BLOCKCHAIN connects digital assets, tokens, and services under one platform — creating a coherent ecosystem rather than isolated products." },
  { icon: Anchor, title: "Digital Ownership", description: "The platform provides the infrastructure for true digital asset ownership within a private, auditable environment." },
  { icon: Mountain, title: "Platform-First Architecture", description: "Rather than building individual blockchain products, SP NET BLOCKCHAIN is designed as a platform that powers an entire ecosystem of products and services." },
  { icon: Infinity, title: "Expandability", description: "The platform is built for expansion — new tokens, services, and capabilities can be added as the ecosystem grows and new opportunities emerge." },
];

const timelineStages = [
  { phase: "Phase 1", title: "Foundation", description: "Platform conceptualization, architecture design, and infrastructure planning. Long-term research." },
  { phase: "Phase 2", title: "Core Platform", description: "Core blockchain infrastructure development. Private platform architecture and foundational systems." },
  { phase: "Phase 3", title: "Official Token", description: "SavaroX — the first official token on SP NET BLOCKCHAIN. Token infrastructure and ecosystem alignment." },
  { phase: "Phase 4", title: "Wallet", description: "Digital asset wallet infrastructure for storing and transacting official tokens." },
  { phase: "Phase 5", title: "Explorer", description: "Blockchain explorer for transparent transaction verification and platform activity monitoring." },
  { phase: "Phase 6", title: "Developer Platform", description: "APIs and developer tools enabling third-party integration and application building." },
  { phase: "Phase 7", title: "Enterprise Services", description: "Enterprise-grade solutions for organizations requiring private blockchain infrastructure." },
  { phase: "Phase 8", title: "Ecosystem Expansion", description: "Continued growth of the ecosystem with new tokens, services, and capabilities." },
];

const productCategories = [
  {
    title: "Available",
    items: [{ icon: Coins, name: "SavaroX", description: "Official token of SP NET BLOCKCHAIN." }],
  },
  {
    title: "Planned",
    items: [
      { icon: Wallet, name: "Digital Asset Wallet", description: "Wallet infrastructure for official tokens." },
      { icon: Scan, name: "Blockchain Explorer", description: "Transparent transaction verification." },
      { icon: Coins, name: "Additional Official Tokens", description: "New tokens as the ecosystem expands." },
    ],
  },
  {
    title: "Future Vision",
    items: [
      { icon: Code2, name: "Developer APIs", description: "APIs for third-party integration." },
      { icon: Layers, name: "Developer Platform", description: "Platform for blockchain application development." },
      { icon: Building2, name: "Enterprise Solutions", description: "Enterprise-grade blockchain infrastructure." },
      { icon: Globe, name: "Full Ecosystem", description: "A comprehensive ecosystem of services and products." },
    ],
  },
];

interface StatusBadgeProps {
  status: "In Development" | "Planned" | "Future Vision";
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${statusStyles[status]}`}>
      <span className={`h-1 w-1 rounded-full ${
        status === "In Development" ? "bg-amber-400/60" :
        status === "Planned" ? "bg-blue-400/60" :
        "bg-white/20"
      }`} />
      {status}
    </span>
  );
}

const faqItems = [
  {
    question: "What is SP NET BLOCKCHAIN?",
    answer: "SP NET BLOCKCHAIN is a private blockchain platform developed by SP NET INC. It is the long-term infrastructure for official digital tokens, digital asset management, and blockchain-powered services across the SP NET ecosystem. The platform is designed for security, scalability, and long-term sustainability.",
  },
  {
    question: "Who develops SP NET BLOCKCHAIN?",
    answer: "SP NET BLOCKCHAIN is developed entirely in-house by SP NET INC. The company invests in research, design, and development of the platform as a strategic initiative — not a short-term project. SP NET INC controls the full development lifecycle.",
  },
  {
    question: "Is SP NET BLOCKCHAIN a public or private blockchain?",
    answer: "SP NET BLOCKCHAIN is a private blockchain platform. It is developed and maintained by SP NET INC, allowing for controlled, auditable operations. This approach enables the platform to be tailored for specific ecosystem requirements and enterprise use cases.",
  },
  {
    question: "Is SavaroX the same as SP NET BLOCKCHAIN?",
    answer: "No. SavaroX is the official token of the SP NET BLOCKCHAIN platform. SP NET BLOCKCHAIN is the underlying infrastructure — the platform that powers SavaroX and will support additional tokens and services as the ecosystem grows.",
  },
  {
    question: "Can multiple official tokens exist on SP NET BLOCKCHAIN?",
    answer: "Yes. SP NET BLOCKCHAIN is designed to support multiple official tokens. SavaroX is the first official token, and additional tokens may be introduced as the ecosystem expands and new use cases emerge.",
  },
  {
    question: "What is the purpose of SP NET BLOCKCHAIN?",
    answer: "The platform exists to provide a secure, scalable, and sustainable blockchain infrastructure for the SP NET ecosystem. Its purpose is to power digital assets, enable token-based services, and provide the foundation for a growing ecosystem of blockchain-powered products.",
  },
  {
    question: "What products and services are planned for SP NET BLOCKCHAIN?",
    answer: "Planned components include: official tokens (starting with SavaroX), digital asset wallet infrastructure, a blockchain explorer for transaction transparency, developer APIs for integration, a developer platform for building applications, and enterprise-grade solutions for organizations.",
  },
  {
    question: "How does SP NET BLOCKCHAIN fit into SP NET INC?",
    answer: "SP NET BLOCKCHAIN is a strategic platform initiative by SP NET INC. It represents the company's long-term investment in blockchain infrastructure. The platform is designed to integrate with and enhance the broader SP NET product ecosystem, while also powering new categories of blockchain-based services.",
  },
  {
    question: "Can developers build on SP NET BLOCKCHAIN in the future?",
    answer: "Yes, developer access is part of the long-term platform vision. Future plans include developer APIs and a developer platform that would enable third-party integration and application development on SP NET BLOCKCHAIN.",
  },
  {
    question: "Is SP NET BLOCKCHAIN related to cryptocurrency?",
    answer: "SP NET BLOCKCHAIN is a blockchain platform, not a cryptocurrency. While the platform supports official digital tokens like SavaroX, its purpose extends beyond digital currency to include tokenized services, digital asset infrastructure, and enterprise blockchain solutions.",
  },
  {
    question: "When will SP NET BLOCKCHAIN be available?",
    answer: "SP NET BLOCKCHAIN is in early development. The platform infrastructure and token architecture are being designed and built. Specific timelines will be announced as development progresses. Follow SP NET updates for official announcements.",
  },
  {
    question: "How does SP NET BLOCKCHAIN ensure security?",
    answer: "Security is a foundational principle of the platform. SP NET BLOCKCHAIN is being designed with security as the primary requirement — not an afterthought. The private nature of the platform enables controlled, auditable operations that prioritize protection of digital assets and data.",
  },
  {
    question: "What makes SP NET BLOCKCHAIN different from other blockchain platforms?",
    answer: "SP NET BLOCKCHAIN is not competing with public blockchain platforms. It is a private platform developed specifically for the SP NET ecosystem. This focused approach allows for deliberate design decisions, a controlled development roadmap, and alignment with the broader SP NET product vision.",
  },
  {
    question: "Will SP NET BLOCKCHAIN support smart contracts?",
    answer: "The platform's capabilities are still being defined through research and development. The focus is on building a solid foundation for official tokens and digital asset infrastructure before expanding into additional capabilities.",
  },
  {
    question: "How can I learn more about SP NET BLOCKCHAIN?",
    answer: "For inquiries about SP NET BLOCKCHAIN and its ecosystem, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact. You can also email hello@sp-net.in or business@sp-net.in.",
  },
];

const relatedPages = [
  {
    title: "SavaroX",
    description: "Official token of SP NET BLOCKCHAIN.",
    href: "/products/savaro-x",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform for all SP NET products and services.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET API",
    description: "Developer infrastructure for building on the SP NET platform.",
    href: "/products/sp-net-api",
  },
  {
    title: "About SP NET INC",
    description: "The company behind SP NET BLOCKCHAIN and the broader ecosystem.",
    href: "/company/about",
  },
  {
    title: "Founder",
    description: "The vision behind SP NET BLOCKCHAIN and the SP NET ecosystem.",
    href: "/founder",
  },
];

function TimelineSection() {
  return (
    <SectionContainer>
      <SectionTitle
        label="Ecosystem Timeline"
        title="The platform roadmap"
        subtitle="SP NET BLOCKCHAIN is being built in deliberate phases. Each stage builds on the previous, creating a solid foundation for long-term ecosystem growth."
      />
      <div className="relative mt-12 sm:mt-16 lg:mt-20">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent sm:-translate-x-px" />
        {timelineStages.map((stage, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={stage.phase}
              className={`relative flex items-start gap-6 sm:gap-0 sm:items-center mb-8 sm:mb-12 last:mb-0 ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: NORMAL, delay: index * 0.08, ease: ease.out }}
            >
              <div className="hidden sm:flex sm:w-1/2 items-center">
                {isLeft ? (
                  <div className="ml-auto pr-8 text-right">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400/50 mb-2">
                      {stage.phase}
                    </p>
                    <h3 className="text-sm font-medium text-white/70 mb-1.5">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-white/25 leading-relaxed max-w-xs ml-auto">
                      {stage.description}
                    </p>
                  </div>
                ) : (
                  <div className="pl-8">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400/50 mb-2">
                      {stage.phase}
                    </p>
                    <h3 className="text-sm font-medium text-white/70 mb-1.5">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-white/25 leading-relaxed max-w-xs">
                      {stage.description}
                    </p>
                  </div>
                )}
              </div>
              <div className="relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                <div className="h-8 w-8 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-purple-400/60" />
                </div>
              </div>
              <div className="sm:hidden flex-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-purple-400/50 mb-1.5">
                  {stage.phase}
                </p>
                <h3 className="text-sm font-medium text-white/70 mb-1">
                  {stage.title}
                </h3>
                <p className="text-xs text-white/25 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}

export default function SPNetBlockchainPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "SP NET BLOCKCHAIN" },
        ]}
        label="Blockchain Platform"
        badge="In Development"
        title="SP NET"
        titleAccent="BLOCKCHAIN"
        description="A private blockchain platform developed entirely by SP NET INC. Building the long-term infrastructure for official digital tokens, digital assets, wallet services, and enterprise blockchain solutions — designed to power an entire ecosystem."
        icon={<Link2 className="h-4 w-4" />}
        actions={
          <div className="flex flex-wrap gap-3">
            <motion.a
              href="/products/savaro-x"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white/60 hover:bg-white/[0.04] hover:text-white/80 transition-all duration-300"
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={spring.gentle}
            >
              <Coins className="h-3.5 w-3.5" />
              Explore SavaroX
              <ArrowUpRight className="h-3 w-3 text-white/30" />
            </motion.a>
            <motion.a
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.04] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white/30 hover:text-white/50 transition-all duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              View All Products
            </motion.a>
          </div>
        }
      />

      <div className="border-t border-white/[0.04]">
        <SectionContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border border-white/[0.04] bg-white/[0.04]">
            {platformFacts.map((fact) => (
              <div key={fact.label} className="bg-black p-5 sm:p-6 lg:p-8">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-2">
                  {fact.label}
                </p>
                <p className="text-sm sm:text-base text-white/60">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </div>

      <SectionContainer>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3">
            <BlurReveal>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 mb-4">
                About the Platform
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[0.92] sm:leading-[0.88] mb-6">
                A private blockchain platform
                <br />
                <span className="text-white/40">built for the long term</span>
              </h2>
            </BlurReveal>
            <div className="space-y-4">
              <FadeIn delay={0.15}>
                <p className="text-sm sm:text-base text-white/35 leading-relaxed">
                  SP NET BLOCKCHAIN is a private blockchain platform developed entirely by SP NET INC. It is the long-term infrastructure for official digital tokens, digital asset management, and blockchain-powered services across the SP NET ecosystem.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-sm sm:text-base text-white/25 leading-relaxed">
                  The platform exists because the SP NET ecosystem needs a secure, scalable, and sustainable foundation for blockchain capabilities — one that is built deliberately, not borrowed from external networks. SP NET BLOCKCHAIN is designed to evolve over years and decades, supporting the ecosystem as it grows.
                </p>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="text-sm sm:text-base text-white/25 leading-relaxed">
                  Developed in-house by SP NET INC, the platform represents a strategic investment in infrastructure that enables digital ownership, tokenized services, and a new generation of blockchain-powered products.
                </p>
              </FadeIn>
            </div>
          </div>
          <div className="lg:col-span-2 lg:pt-20">
            <FadeIn delay={0.3}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Mountain className="h-4 w-4 text-purple-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">
                    Long-Term Mission
                  </h3>
                </div>
                <p className="text-sm text-white/30 leading-relaxed">
                  To build the digital infrastructure that powers the SP NET ecosystem for the long term — enabling secure digital assets, token-based services, and a growing ecosystem of blockchain-powered products, all on a platform developed with purpose and precision.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Vision"
          title="Infrastructure for a digital ecosystem"
          subtitle="SP NET BLOCKCHAIN is more than a technology platform. It is the foundation for how digital assets, tokens, and blockchain services come together in the SP NET ecosystem."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-12">
          {[
            { label: "Long-Term Ecosystem", description: "The platform is architected to support the SP NET ecosystem for years. Every component is designed with the future in mind." },
            { label: "Secure Infrastructure", description: "Digital assets and tokens require infrastructure built on security. SP NET BLOCKCHAIN is designed with security as a foundational requirement." },
            { label: "Future-Ready Platform", description: "The platform is built to evolve. As new opportunities emerge, the ecosystem can expand without rebuilding the foundation." },
            { label: "Enterprise Philosophy", description: "SP NET BLOCKCHAIN approaches blockchain with an enterprise mindset — deliberate, secure, and built for mission-critical use cases." },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: NORMAL, delay: i * 0.08, ease: ease.out }}
            >
              <h3 className="text-sm font-medium text-white/70 mb-3">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-white/25 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 lg:p-10">
          <SectionTitle
            label="Ecosystem"
            title="What the platform includes"
            subtitle="SP NET BLOCKCHAIN is being built as a complete ecosystem of components — from official tokens to enterprise infrastructure."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:mt-10 lg:mt-12">
            {ecosystemItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group rounded-xl border border-white/[0.04] bg-black p-5 sm:p-6 hover:border-white/[0.08] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                      <Icon className="h-4 w-4 text-purple-400/60" />
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/25 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Platform Principles"
          title="The foundation beneath the platform"
          subtitle="Six core principles guide every decision across SP NET BLOCKCHAIN — from architecture to ecosystem strategy."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-12">
          {principlesData.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                  whileHover={{ y: -4, scale: 1.005 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-purple-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Why SP NET BLOCKCHAIN"
          title="Built with purpose"
          subtitle="SP NET BLOCKCHAIN exists to solve specific challenges — providing a secure, scalable foundation for the SP NET ecosystem's blockchain future."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-12">
          {whyItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6 hover:border-white/[0.08] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.08, ease: ease.out }}
                whileHover={{ y: -2 }}
              >
                <div className="h-9 w-9 shrink-0 rounded-lg border border-white/[0.06] bg-white/[0.03] flex items-center justify-center">
                  <Icon className="h-4 w-4 text-purple-400/50" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-white/60 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/25 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>

      <TimelineSection />

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Blockchain Products"
          title="From token to ecosystem"
          subtitle="SP NET BLOCKCHAIN powers a growing suite of products and services. From the first official token to enterprise solutions, each component builds toward the full ecosystem vision."
        />
        <div className="space-y-6 sm:space-y-8 mt-12">
          {productCategories.map((category) => (
            <FadeIn key={category.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${
                    category.title === "Available" ? "text-emerald-400/60" :
                    category.title === "Planned" ? "text-blue-400/60" :
                    "text-white/30"
                  }`}>
                    {category.title}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.name} className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.01] p-3.5 sm:p-4">
                        <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-1.5 shrink-0">
                          <Icon className="h-3.5 w-3.5 text-purple-400/50" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white/60 mb-0.5">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-white/25 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Founder Perspective"
          title="Why this platform exists"
          subtitle="SP NET BLOCKCHAIN was created with a simple conviction: the SP NET ecosystem needs its own infrastructure — built deliberately, maintained responsibly, and designed for the long term."
        />
        <FadeIn delay={0.1}>
          <div className="relative mt-8 sm:mt-10 lg:mt-12 rounded-xl border border-white/[0.04] bg-gradient-to-b from-white/[0.02] to-transparent p-6 sm:p-8 lg:p-10">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            <div className="max-w-3xl">
              <p className="text-sm sm:text-base lg:text-lg text-white/40 leading-relaxed mb-6 sm:mb-8 italic">
                &ldquo;SP NET BLOCKCHAIN is not a response to a trend. It is a deliberate investment in infrastructure that the SP NET ecosystem will need for years to come. We are building it because the ecosystem deserves a foundation that is secure, sustainable, and fully aligned with the long-term vision of SP NET INC.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full border border-white/[0.06] bg-white/[0.02] flex items-center justify-center">
                  <span className="text-[10px] font-mono text-white/40">SP</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-white/60">
                    Savan Patel
                  </p>
                  <p className="text-[10px] text-white/25 font-mono">
                    Founder, SP NET INC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
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
        title="The blockchain platform for"
        titleAccent="the SP NET ecosystem"
        description="A private blockchain platform built by SP NET INC. Powering official tokens, digital assets, and the future of blockchain-powered products and services."
        primaryAction={{
          label: "Explore SavaroX",
          href: "/products/savaro-x",
        }}
        secondaryAction={{
          label: "View All Products",
          href: "/products",
        }}
      />
    </>
  );
}
