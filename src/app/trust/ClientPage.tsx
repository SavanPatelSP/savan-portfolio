"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  ShieldCheck,
  Eye,
  Bot,
  Activity,
  ArrowUpRight,
  HardDrive,
} from "lucide-react";
import { spring } from "@/lib/motion";
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
    title: "Privacy",
    description: "No tracking, no ads, no advertising cookies — privacy by default",
    href: "/trust/privacy",
    icon: Eye,
  },
  {
    title: "Security",
    description: "Secure by default, responsible disclosure, and security mindset",
    href: "/trust/security",
    icon: ShieldCheck,
  },
  {
    title: "Transparency",
    description: "Building in public, honest communication, and open development",
    href: "/trust/transparency",
    icon: Lock,
  },
  {
    title: "Responsible AI",
    description: "Human-first AI principles, ethical boundaries, and transparency",
    href: "/trust/responsible-ai",
    icon: Bot,
  },
  {
    title: "Cookies & Local Storage",
    description: "How browser preferences are stored and what data is used",
    href: "/trust/cookies",
    icon: HardDrive,
  },
  {
    title: "System Status",
    description: "Current projects, focus areas, and availability",
    href: "/trust/status",
    icon: Activity,
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Trust" }]}
        label="Trust"
        title="Trust & Principles"
        titleAccent="How I build with integrity"
        description="My principles on privacy, security, transparency, and responsible technology development."
        icon={<Shield className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Principles"
          title="Built on trust"
          subtitle="Technology should earn the trust of the people who use it. Here is how I approach privacy, security, and transparency."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
            <p>
              Trust is not a feature — it is a foundation. Every product I build
              starts with the question: &quot;Would I trust this with my own data?&quot;
              If the answer is not an immediate yes, the design goes back to the
              drawing board.
            </p>
            <p>
              From privacy-by-default architecture to responsible AI principles,
              these are the values that guide every technical and product decision
              across the SP NET ecosystem.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Explore"
          title="Trust areas"
          subtitle="Dive into any area of trust and principles."
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
            title: "Privacy",
            description: "No tracking, no ads, no cookies.",
            href: "/trust/privacy",
          },
          {
            title: "Security",
            description: "Secure by default, always.",
            href: "/trust/security",
          },
          {
            title: "Transparency",
            description: "Building in public with honesty.",
            href: "/trust/transparency",
          },
          {
            title: "Contact",
            description: "Get in touch with questions or concerns.",
            href: "/get-in-touch",
          },
        ]}
      />

      <CTASection
        title="Questions about"
        titleAccent="trust and privacy?"
        description="Transparency is a core value. If you have questions about how I handle privacy, security, or responsible AI — reach out."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "Privacy policy", href: "/trust/privacy" }}
      />
    </>
  );
}
