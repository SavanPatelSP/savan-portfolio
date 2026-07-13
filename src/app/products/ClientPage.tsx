"use client";

import { motion } from "framer-motion";
import {
  Layers,
  MessageCircle,
  Shield,
  BrainCircuit,
  Puzzle,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
import { personal } from "@/data/personal";
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

const products = [
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
    description: "Intelligence for the SP NET ecosystem",
    href: "/products/sp-net-ai",
    icon: BrainCircuit,
    color: "#10b981",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform bringing all SP NET products together",
    href: "/products/sp-net-ecosystem",
    icon: Puzzle,
    color: "#f59e0b",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
        label="Products"
        title="SP NET Products"
        titleAccent="Tools built for the future"
        description="Explore the SP NET product ecosystem — from messaging to administration to AI-powered intelligent automation."
        icon={<Layers className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Ecosystem"
          title="One ecosystem, four products"
          subtitle="Each product solves a specific problem. Together, they form a unified platform for communication, administration, and intelligence."
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
          label="Products"
          title="What we are building"
          subtitle="Four products, each born from a real need."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
          {products.map((product) => (
            <StaggerItem key={product.title}>
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
        primaryAction={{ label: "View all products", href: "/products" }}
        secondaryAction={{ label: "About SP NET INC", href: "/company" }}
      />
    </>
  );
}
