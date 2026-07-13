"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Brain,
  Cloud,
  Shield,
  FlaskConical,
  Rocket,
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

const childLinks = [
  {
    title: "Artificial Intelligence",
    description: "AI applications, LLMs, RAG pipelines, and intelligent systems",
    href: "/research/ai",
    icon: Brain,
  },
  {
    title: "Cloud Computing",
    description: "Docker, K3s, edge computing, and cloud-native architecture",
    href: "/research/cloud",
    icon: Cloud,
  },
  {
    title: "Cybersecurity",
    description: "E2EE, zero-trust, secure coding, and privacy by default",
    href: "/research/cybersecurity",
    icon: Shield,
  },
  {
    title: "Innovation Lab",
    description: "Experimental projects: CRDTs, voice-first workflows, generative UI",
    href: "/research/innovation-lab",
    icon: FlaskConical,
  },
  {
    title: "Future Technologies",
    description: "AR/VR, IoT, blockchain, neuromorphic computing, and beyond",
    href: "/research/future-tech",
    icon: Rocket,
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
        label="Research"
        title="Research Interests"
        titleAccent="Exploring the future of technology"
        description="Personal research and exploration in AI, cloud computing, cybersecurity, and emerging technologies."
        icon={<Lightbulb className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Focus Areas"
          title="Where curiosity leads"
          subtitle="Deep dives into the technologies shaping the next decade — explored through hands-on projects and continuous learning."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
            <p>
              Research for me is not abstract — it is the foundation every product
              is built on. Understanding AI deeply means building better intelligent
              features. Mastering cloud architecture means shipping with confidence.
              Studying security means protecting users by default.
            </p>
            <p>
              These are the areas I spend my time exploring, experimenting in, and
              building toward. Each area feeds directly into the SP NET ecosystem
              and the products I create.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Explore"
          title="Research areas"
          subtitle="Dive into any area of research."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
          {childLinks.map((link) => (
            <StaggerItem key={link.title}>
              <motion.a
                href={link.href}
                className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                whileHover={{ y: -3, scale: 1.005 }}
                transition={spring.gentle}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/30 group-hover:text-white/50 transition-colors duration-200">
                    <link.icon className="h-4 w-4" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/15 group-hover:text-white/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="text-sm font-medium text-white/60 mb-1.5 group-hover:text-white/75 transition-colors duration-200">
                  {link.title}
                </h3>
                <p className="text-xs text-white/25 leading-relaxed">
                  {link.description}
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
            title: "AI",
            description: "AI applications, LLMs, and intelligent systems.",
            href: "/research/ai",
          },
          {
            title: "Cloud",
            description: "Cloud-native architecture and infrastructure.",
            href: "/research/cloud",
          },
          {
            title: "Cybersecurity",
            description: "Security, privacy, and zero-trust principles.",
            href: "/research/cybersecurity",
          },
          {
            title: "Innovation Lab",
            description: "Experimental projects and cutting-edge exploration.",
            href: "/research/innovation-lab",
          },
        ]}
      />

      <CTASection
        title="Interested in"
        titleAccent="my research?"
        description="Every research area feeds into real products and projects. Explore the work in depth or get in touch to discuss."
        primaryAction={{ label: "View AI research", href: "/research/ai" }}
        secondaryAction={{ label: "Explore products", href: "/products" }}
      />
    </>
  );
}
