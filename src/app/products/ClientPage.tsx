"use client";

import { motion } from "framer-motion";
import {
  Layers,
  MessageCircle,
  Shield,
  BrainCircuit,
  Globe,
  Puzzle,
  Code,
  Gamepad2,
  Cloud,
  Lock,
  Cog,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const coreProducts = [
  {
    title: "SP NET GRAM",
    description: "Next-generation messaging with privacy and productivity built in",
    href: "/products/sp-net-gram",
    icon: MessageCircle,
    color: "#3b82f6",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration with full organizational tooling",
    href: "/products/sp-net-admin-os",
    icon: Shield,
    color: "#8b5cf6",
  },
  {
    title: "SP NET AI",
    description: "Intelligence powering the entire SP NET ecosystem",
    href: "/products/sp-net-ai",
    icon: BrainCircuit,
    color: "#10b981",
  },
  {
    title: "Savan's Portfolio",
    description: "Official portfolio showcasing products, engineering, and the SP NET journey",
    href: "/",
    icon: Globe,
    color: "#f59e0b",
  },
  {
    title: "SP NET API",
    description: "Developer infrastructure for building on the SP NET platform",
    href: "/products/sp-net-api",
    icon: Code,
    color: "#06b6d4",
  },
];

const platforms = [
  {
    title: "SP NET Ecosystem",
    description: "The connected platform bringing all SP NET products together",
    href: "/products/sp-net-ecosystem",
    icon: Puzzle,
    color: "#f59e0b",
  },
];

const innovationLabs = [
  {
    title: "SP NET WORKPLACE",
    description: "Your complete digital workspace for documents and collaboration",
    href: "/products/sp-net-workplace",
    icon: Briefcase,
    color: "#6366f1",
  },
  {
    title: "SP NET GAME",
    description: "Cloud-native gaming, cross-device play, and creator tools",
    href: "/products/sp-net-game",
    icon: Gamepad2,
    color: "#f43f5e",
  },
  {
    title: "SP NET Cloud",
    description: "Scalable infrastructure built for privacy and performance",
    href: "/products/sp-net-cloud",
    icon: Cloud,
    color: "#0ea5e9",
  },
  {
    title: "SP NET Security",
    description: "Threat detection, compliance, and incident response",
    href: "/products/sp-net-security",
    icon: Lock,
    color: "#f59e0b",
  },
  {
    title: "SP NET Robotics",
    description: "Bridging digital intelligence and physical-world automation",
    href: "/products/sp-net-robotics",
    icon: Cog,
    color: "#10b981",
  },
];

function ProductCard({ product }: { product: typeof coreProducts[number] }) {
  return (
    <motion.a
      href={product.href}
      className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
      whileHover={{ y: -3, scale: 1.005 }}
      transition={spring.gentle}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg border"
          style={{
            backgroundColor: `${product.color}0d`,
            borderColor: `${product.color}1a`,
            color: product.color,
          }}
        >
          <product.icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 className="text-base font-medium text-white/70 mb-2 group-hover:text-white/85 transition-colors duration-200">
        {product.title}
      </h3>
      <p className="text-sm text-white/30 leading-relaxed">
        {product.description}
      </p>
    </motion.a>
  );
}

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        label="Products"
        title="SP NET Products"
        titleAccent="Tools built for the future"
        description="Explore the full SP NET product ecosystem — core products, platforms, and research initiatives."
        icon={<Layers className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Ecosystem"
          title="One ecosystem, eleven products"
          subtitle="Each product solves a specific problem. Together, they form a unified platform for communication, administration, intelligence, and beyond."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
            <p>
              The SP NET product suite is built around a simple idea: every tool should
              feel like it belongs to the same family. One account, one data layer, one
              experience — whether you are messaging your team, managing an organization,
              or leveraging AI to work smarter.
            </p>
            <p>
              Each product stands on its own but delivers far more when plugged into the
              ecosystem. Privacy, performance, and craft are non-negotiable across every
              surface.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Core Products"
          title="What we are building"
          subtitle="Five products, each born from a real need."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
          {coreProducts.map((product) => (
            <StaggerItem key={product.title}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Platforms"
          title="Infrastructure & connectivity"
          subtitle="The platforms that connect and extend the core products."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
          {platforms.map((product) => (
            <StaggerItem key={product.title}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Innovation Labs"
          title="Research & exploration"
          subtitle="Long-term initiatives exploring what is possible."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
          {innovationLabs.map((product) => (
            <StaggerItem key={product.title}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <RelatedPages
        title="Related"
        pages={[
          {
            title: "About SP NET INC",
            description: "The company behind the products.",
            href: "/company/about",
          },
          {
            title: "Innovation",
            description: "Applied research and cutting-edge exploration.",
            href: "/explore/innovation",
          },
          {
            title: "Technology",
            description: "The tech stack powering every product.",
            href: "/explore/technology",
          },
          {
            title: "Roadmap",
            description: "Where the products are headed next.",
            href: "/founder/roadmap",
          },
        ]}
      />

      <CTASection
        title="Curious about"
        titleAccent="our products?"
        description="Each product has its own page with details on features, status, and the story behind why it exists."
        primaryAction={{ label: "About SP NET INC", href: "/company/about" }}
        secondaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
      />
    </>
  );
}
