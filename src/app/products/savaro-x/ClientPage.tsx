"use client";

import { Link2, Shield, Database, Globe, Lock, Zap, Server, Coins } from "lucide-react";
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
    icon: Link2,
    title: "Decentralized Networking",
    description:
      "Peer-to-peer infrastructure that removes single points of failure. Nodes communicate directly, ensuring resilience, censorship resistance, and uptime without relying on centralized servers.",
  },
  {
    icon: Coins,
    title: "Tokenized Economies",
    description:
      "Native token mechanics designed to incentivize participation, reward contributors, and power governance across the SavaroX network. Economic alignment drives ecosystem growth.",
  },
  {
    icon: Globe,
    title: "Web3-Native Experiences",
    description:
      "Wallet-based authentication, on-chain transactions, and decentralized identity — all woven into SP NET products so users interact with blockchain without the friction of traditional Web3 UX.",
  },
  {
    icon: Shield,
    title: "Trustless Security",
    description:
      "Cryptographic guarantees replace trust assumptions. Smart contracts enforce rules transparently, and data integrity is verifiable by anyone on the network.",
  },
];

const infrastructureCapabilities = [
  {
    icon: Server,
    title: "Distributed Storage",
    description:
      "Distributed storage across a decentralized network, with built-in replication and tamper resistance.",
  },
  {
    icon: Database,
    title: "On-Chain State",
    description:
      "Critical state and attestations recorded on-chain for transparency and auditability. Every important transition is verifiable and permanent.",
  },
  {
    icon: Zap,
    title: "Fast Finality",
    description:
      "Fast transaction confirmation without compromising decentralization or security.",
  },
];

const principles = [
  {
    title: "Open by Default",
    description:
      "Protocols, standards, and interfaces are designed to be open and interoperable. SavaroX avoids proprietary lock-in and embraces the composable nature of Web3.",
  },
  {
    title: "User Sovereignty",
    description:
      "Users own their data, identities, and assets. No platform lock-in, no extraction — just tools that respect individual ownership and control.",
  },
  {
    title: "Progressive Decentralization",
    description:
      "Designed with a pragmatic approach to decentralization that prioritizes usability and security.",
  },
  {
    title: "Sustainable Economics",
    description:
      "Token design prioritizes long-term sustainability over short-term speculation. Utility-driven demand, controlled supply, and governance aligned with real usage.",
  },
];

const faqItems = [
  {
    question: "What is SavaroX?",
    answer:
      "SavaroX is SP NET's blockchain and Web3 initiative. It focuses on building decentralized infrastructure, tokenized economies, and Web3-native experiences that integrate with the broader SP NET ecosystem. The goal is to make blockchain useful — not just speculative.",
  },
  {
    question: "How does SavaroX relate to other SP NET products?",
    answer:
      "SavaroX provides the decentralized layer that other SP NET products can tap into. For example, SP NET GRAM could use SavaroX for decentralized identity, SP NET Cloud could integrate distributed storage, and SP NET ADMIN OS could leverage on-chain attestations for transparency.",
  },
  {
    question: "Is there a token?",
    answer:
      "Any future token will prioritize utility and governance within the ecosystem.",
  },
  {
    question: "What blockchain is SavaroX built on?",
    answer:
      "SavaroX is designed to be flexible and interoperable across blockchain networks.",
  },
  {
    question: "When will SavaroX be available?",
    answer:
      "SavaroX is in early development. Infrastructure components and testnet experiments are ongoing. Public-facing features will roll out incrementally as the architecture matures. Follow SP NET updates for announcements.",
  },
  {
    question: "How can I get involved?",
    answer:
      "For any inquiries about SavaroX, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET Ecosystem",
    description: "The connected platform bringing all SP NET products together.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET Cloud",
    description: "Cloud infrastructure complementing decentralized storage.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "SP NET Security",
    description: "Security primitives that complement trustless architecture.",
    href: "/products/sp-net-security",
  },
  {
    title: "SP NET AI",
    description: "AI platform that can leverage on-chain data and state.",
    href: "/products/sp-net-ai",
  },
  {
    title: "Research",
    description: "Ongoing exploration of emerging technologies.",
    href: "/research",
  },
  {
    title: "About Savan Patel",
    description: "Founder & Product Engineer building the SP NET ecosystem.",
    href: "/founder/about",
  },
];

export default function SavaroXPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: "SavaroX" },
        ]}
        label="Blockchain & Web3"
        badge="Exploring"
        title="SavaroX"
        titleAccent="Decentralized infrastructure for the next internet"
        description="A blockchain initiative building decentralized infrastructure, tokenized economies, and Web3-native experiences across the SP NET ecosystem."
        icon={<Link2 className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="Blockchain without the friction"
          subtitle="SavaroX exists to make decentralized technology genuinely useful. Rather than bolting blockchain onto existing products, it is being designed as a foundational layer — enabling trustless interactions, user sovereignty, and open economies across the SP NET ecosystem."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Approach", value: "Chain-agnostic, modular architecture" },
              { label: "Focus", value: "Utility over speculation" },
              { label: "Design", value: "User sovereignty by default" },
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
          title="Built for real-world decentralization"
          subtitle="Every feature prioritizes practical utility — making blockchain useful for developers and end users alike."
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
                    <Icon className="h-5 w-5 text-violet-400/70" />
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
          label="Infrastructure"
          title="The decentralized backbone"
          subtitle="Core infrastructure components designed to support the next generation of SP NET products."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {infrastructureCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <StaggerItem key={cap.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-violet-400/60" />
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
                <Link2 className="h-6 w-6 text-violet-400/50" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Composable by Design
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  SavaroX is not a walled garden. Every component is designed to be composable — usable independently or combined with other SP NET products and external Web3 protocols. The goal is to maximize interoperability and minimize vendor lock-in.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Principles"
          title="Guided by Web3 values"
          subtitle="SavaroX is built on principles that align with the original vision of a decentralized, user-owned internet."
        />
        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((item) => (
            <StaggerItem key={item.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="h-4 w-4 text-violet-400/50" />
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
        title="Building the decentralized layer"
        titleAccent="for SP NET"
        description="SavaroX is exploring how blockchain can make SP NET products more resilient, transparent, and user-owned. Stay updated on the latest developments."
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
