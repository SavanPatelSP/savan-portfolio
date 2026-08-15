"use client";

import { Coins, Building2, Shield, Globe, Layers, Sparkles, Wallet } from "lucide-react";
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

const tokenDetails = [
  {
    icon: Coins,
    title: "Official Token",
    description:
      "SavaroX is the official digital token of the SP NET BLOCKCHAIN platform. It is designed as a utility token within a secure, enterprise-grade blockchain infrastructure developed by SP NET INC.",
  },
  {
    icon: Building2,
    title: "Ecosystem Role",
    description:
      "SavaroX powers participation within the SP NET BLOCKCHAIN ecosystem — enabling transactions, governance, and access to future blockchain-powered products and services.",
  },
  {
    icon: Shield,
    title: "Secure Foundation",
    description:
      "Built on SP NET BLOCKCHAIN, a private blockchain platform developed entirely by SP NET INC. The platform provides the security and reliability required for digital asset infrastructure.",
  },
  {
    icon: Globe,
    title: "Future-Ready Design",
    description:
      "SavaroX is the first official token on SP NET BLOCKCHAIN. The platform is designed to support additional tokens and digital assets as the ecosystem expands.",
  },
];

const ecosystemCategories = [
  {
    icon: Coins,
    title: "Official Tokens",
    items: [
      "SavaroX — the first official token",
      "Additional tokens planned as ecosystem grows",
    ],
  },
  {
    icon: Wallet,
    title: "Digital Assets & Wallet",
    items: [
      "Digital asset infrastructure on SP NET BLOCKCHAIN",
      "Secure wallet for storing and transacting tokens",
    ],
  },
  {
    icon: Layers,
    title: "Blockchain Services",
    items: [
      "Explorer for transparent transaction tracking",
      "Developer APIs for integration",
      "Enterprise solutions for organizations",
    ],
  },
];

const principles = [
  {
    title: "Utility Over Speculation",
    description:
      "Token design prioritizes real utility within the ecosystem — governance, participation, and access — over short-term market dynamics.",
  },
  {
    title: "Ecosystem Alignment",
    description:
      "SavaroX is designed to align incentives across the SP NET BLOCKCHAIN ecosystem, rewarding participation and contribution.",
  },
  {
    title: "Long-Term Sustainability",
    description:
      "Economic design focused on sustainable growth, with mechanisms that support the token's role in a lasting digital ecosystem.",
  },
  {
    title: "Transparency & Trust",
    description:
      "Built on principles of transparency. The SP NET BLOCKCHAIN platform provides the foundation for verifiable and trustworthy digital asset operations.",
  },
];

const faqItems = [
  {
    question: "What is SavaroX?",
    answer:
      "SavaroX is the official digital token of the SP NET BLOCKCHAIN platform. It is designed for utility, governance, and ecosystem participation within the SP NET BLOCKCHAIN ecosystem. SavaroX is not a blockchain itself — it is a token hosted on the SP NET BLOCKCHAIN platform.",
  },
  {
    question: "How does SavaroX relate to SP NET BLOCKCHAIN?",
    answer:
      "SP NET BLOCKCHAIN is the private blockchain platform developed by SP NET INC. SavaroX is one of the official tokens within this ecosystem. The platform provides the infrastructure that powers SavaroX and future digital assets.",
  },
  {
    question: "What is the purpose of SavaroX?",
    answer:
      "SavaroX is designed as a utility token within the SP NET BLOCKCHAIN ecosystem. Its purpose includes powering transactions, enabling ecosystem governance, facilitating participation in blockchain services, and supporting the growth of the broader SP NET ecosystem.",
  },
  {
    question: "Will there be additional tokens?",
    answer:
      "Yes. SP NET BLOCKCHAIN is designed to support multiple official tokens and digital assets. SavaroX is the first official token, and additional tokens and blockchain-powered services may be introduced as the ecosystem expands.",
  },
  {
    question: "When will SavaroX be available?",
    answer:
      "SavaroX is in early development as part of the SP NET BLOCKCHAIN platform. The platform infrastructure and token design are being architected. Public-facing features will be announced as development progresses. Follow SP NET updates for announcements.",
  },
  {
    question: "How can I learn more?",
    answer:
      "For inquiries about SavaroX and SP NET BLOCKCHAIN, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact. You can also email hello@sp-net.in or business@sp-net.in.",
  },
];

const relatedPages = [
  {
    title: "SP NET BLOCKCHAIN",
    description: "The private blockchain platform powering SavaroX and the ecosystem.",
    href: "/products/sp-net-blockchain",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform bringing all SP NET products together.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET API",
    description: "Developer infrastructure for building on the SP NET platform.",
    href: "/products/sp-net-api",
  },
  {
    title: "Research",
    description: "Ongoing exploration of emerging technologies.",
    href: "/research",
  },
  {
    title: "About SP NET INC",
    description: "The company building SP NET BLOCKCHAIN and the broader ecosystem.",
    href: "/company/about",
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
        label="Official Token"
        badge="In Development"
        title="SavaroX"
        titleAccent="Official token of SP NET BLOCKCHAIN"
        description="The official digital token of the SP NET BLOCKCHAIN platform. SavaroX is designed for utility, governance, and ecosystem participation within a secure blockchain infrastructure developed by SP NET INC."
        icon={<Coins className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Overview"
          title="A token within a larger platform"
          subtitle="SavaroX is not the blockchain. It is the official token of the SP NET BLOCKCHAIN — a private blockchain platform built by SP NET INC."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Type", value: "Official Token" },
              { label: "Platform", value: "SP NET BLOCKCHAIN" },
              { label: "Purpose", value: "Utility & Governance" },
              { label: "Developer", value: "SP NET INC" },
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
          label="Token Details"
          title="Designed for the SP NET BLOCKCHAIN ecosystem"
          subtitle="SavaroX is purpose-built as the official token of SP NET BLOCKCHAIN — one component of a larger blockchain platform vision."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tokenDetails.map((detail) => {
            const Icon = detail.icon;
            return (
              <StaggerItem key={detail.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-purple-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {detail.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {detail.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Ecosystem"
          title="Part of something bigger"
          subtitle="SavaroX is one element of the SP NET BLOCKCHAIN platform. The ecosystem includes official tokens, digital assets, and future blockchain services."
        />
        <div className="space-y-4 mt-12">
          {ecosystemCategories.map((category) => {
            const Icon = category.icon;
            return (
              <FadeIn key={category.title} delay={0.1}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                      <Icon className="h-4 w-4 text-purple-400/60" />
                    </div>
                    <h3 className="text-sm font-medium text-white/70">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/35">
                        <span className="h-1 w-1 rounded-full bg-purple-400/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Principles"
          title="Guiding the token design"
          subtitle="The principles that shape SavaroX as a responsible digital asset within the SP NET BLOCKCHAIN ecosystem."
        />
        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((item) => (
            <StaggerItem key={item.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-4 w-4 text-purple-400/50" />
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
        title="The official token of"
        titleAccent="SP NET BLOCKCHAIN"
        description="SavaroX is one component of the SP NET BLOCKCHAIN platform — a private blockchain infrastructure developed by SP NET INC. Explore the platform and the broader ecosystem."
        primaryAction={{
          label: "Explore SP NET BLOCKCHAIN",
          href: "/products/sp-net-blockchain",
        }}
        secondaryAction={{
          label: "View All Products",
          href: "/products",
        }}
      />
    </>
  );
}
