"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  Cloud,
  Wrench,
  Shield,
  Globe,
  BarChart3,
  Users,
  Target,
  Heart,
  Lightbulb,
  Zap,
  ArrowRight,
  Lock,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SLOW, NORMAL, FAST, ease, spring } from "@/lib/motion";
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

const technologyPartners = [
  {
    name: "Cloud Infrastructure",
    description:
      "Modern cloud platforms provide the backbone for SP NET products — enabling global scalability, edge deployment, and resilient infrastructure that powers millions of interactions.",
    icon: Cloud,
    tags: ["Scalability", "Edge Computing", "Reliability"],
  },
  {
    name: "Development Tools",
    description:
      "Industry-leading development tools and frameworks accelerate our engineering velocity. From version control to CI/CD, every tool is chosen for its ability to ship faster and build better.",
    icon: Wrench,
    tags: ["Developer Experience", "Automation", "Quality"],
  },
  {
    name: "Security & Compliance",
    description:
      "Security partners help us maintain the highest standards of data protection, privacy compliance, and threat mitigation across every product in the SP NET ecosystem.",
    icon: Shield,
    tags: ["Privacy", "Compliance", "Trust"],
  },
  {
    name: "Intelligence & AI",
    description:
      "AI research partnerships and tools enable SP NET AI to push the boundaries of what intelligent systems can do — from natural language to predictive automation.",
    icon: Lightbulb,
    tags: ["Research", "Innovation", "Intelligence"],
  },
];

const futurePartnerships = [
  {
    title: "Communication Platforms",
    description:
      "Integrations with existing communication tools to extend SP NET GRAM's reach and provide seamless interoperability for teams transitioning to modern messaging.",
  },
  {
    title: "Enterprise SaaS",
    description:
      "Strategic alliances with enterprise software providers to create unified workflows — connecting SP NET ADMIN OS with the tools organizations already use daily.",
  },
  {
    title: "AI Research Labs",
    description:
      "Collaborative research partnerships with academic and industry AI labs to advance the state of the art in language understanding, automation, and intelligent systems.",
  },
  {
    title: "Global Distribution",
    description:
      "Distribution partnerships to bring SP NET products to new markets and regions, ensuring accessibility and localization for users worldwide.",
  },
];

const philosophy = [
  {
    title: "Shared Vision",
    description:
      "We partner with organizations that share our belief that technology should feel invisible, intuitive, and delightful. Alignment on values is non-negotiable.",
    icon: Target,
  },
  {
    title: "Mutual Benefit",
    description:
      "Every partnership must create tangible value for both parties. We don't pursue vanity partnerships — only collaborations that drive real outcomes for users.",
    icon: Heart,
  },
  {
    title: "Long-Term Thinking",
    description:
      "We build partnerships for years, not quarters. The best collaborations compound over time, deepening trust and expanding what's possible together.",
    icon: Globe,
  },
];

const benefits = [
  {
    title: "Ecosystem Access",
    description:
      "Partners gain early access to SP NET products and APIs, enabling deep integration and co-development opportunities.",
    icon: Zap,
  },
  {
    title: "Technical Support",
    description:
      "Direct engineering support for integration, customization, and optimization. Our team works alongside partners to ensure successful deployment.",
    icon: Code2,
  },
  {
    title: "Co-Marketing",
    description:
      "Joint marketing opportunities including case studies, joint announcements, and featured partner spotlights across our channels.",
    icon: Globe,
  },
  {
    title: "Security Assurance",
    description:
      "Enterprise-grade security standards across all partnerships. Every integration undergoes rigorous security review and compliance validation.",
    icon: Lock,
  },
];

const stats = [
  { label: "Technology Partners", value: "Growing", icon: Cloud },
  { label: "Focus Areas", value: "4", icon: Target },
  { label: "Partner Satisfaction", value: "100%", icon: Heart },
  { label: "Integration Uptime", value: "99.9%", icon: BarChart3 },
];

const faqItems = [
  {
    question: "How can my company become a partner?",
    answer:
      "We evaluate potential partnerships based on alignment with our mission, technical complementarity, and mutual value creation. Reach out via PCA at https://t.me/SAVANPATELSP_BOT or email business@sp-net.in with your partnership proposal and we'll review it promptly.",
  },
  {
    question: "What types of partnerships does SP NET INC pursue?",
    answer:
      "SP NET INC pursues technology partnerships (cloud, tools, security), distribution partnerships (global reach and localization), and research partnerships (AI labs and academic institutions). Each must align with our core values and create measurable value.",
  },
  {
    question: "Is there a partner program or tier system?",
    answer:
      "We are building a formal partner program that will include tiered benefits, co-marketing opportunities, and dedicated support. Details will be announced through our newsroom as the program launches.",
  },
  {
    question: "Do you offer integration APIs for partners?",
    answer:
      "Yes. SP NET products are built with API-first architecture, making integration straightforward for partners. Technical documentation and SDK access are provided to all approved partners. Note that all SP NET products are currently in active development and not yet publicly available.",
  },
  {
    question: "What security requirements do partners need to meet?",
    answer:
      "All partners must meet our security standards including data encryption, access controls, and compliance with applicable privacy regulations. We conduct security reviews as part of the partnership onboarding process.",
  },
  {
    question: "How can I contact SP NET INC?",
    answer:
      "The recommended first point of contact is PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT. For specific needs, you can also email the appropriate department: hello@sp-net.in (general), business@sp-net.in (business), contact@sp-net.in (inquiries), media@sp-net.in (media), security@sp-net.in (security), or careers@sp-net.in (careers). You can also schedule a meeting at cal.com/savanpatel.",
  },
];

export default function PartnersClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Partners" },
        ]}
        label="Company"
        title="Partners"
        titleAccent="Strategic collaborations"
        description="Building the future of technology together with trusted partners who share our vision for seamless, intelligent, and user-centric products."
        icon={<Handshake className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Better together
                <br />
                <span className="text-white/40">than alone</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  At SP NET INC, we believe the best products are built through
                  collaboration. Our technology partnerships extend our
                  capabilities, deepen our integrations, and ultimately deliver
                  more value to the people who use our products every day.
                </p>
                <p>
                  We are selective about partnerships — not out of exclusivity,
                  but out of respect for the process. Every collaboration must
                  serve a clear purpose, create mutual value, and align with our
                  commitment to building technology that feels invisible and works
                  effortlessly.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Technology Partners"
            title="Powering the ecosystem"
            subtitle="Our technology partners provide the infrastructure, tools, and capabilities that enable SP NET products to deliver exceptional experiences."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.06}>
            {technologyPartners.map((partner) => (
              <StaggerItem key={partner.name}>
                <div className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mb-5">
                    <partner.icon className="h-5 w-5 text-white/40" />
                  </div>
                  <h3 className="text-base font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200 mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed mb-4">
                    {partner.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {partner.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[11px] text-white/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Future Partnerships"
            title="Where we're headed"
            subtitle="Expanding our partner ecosystem to deliver even more value across communication, enterprise, and intelligence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {futurePartnerships.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-6 h-full">
                  <h3 className="text-sm font-medium text-white/50 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/25 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Collaboration Philosophy"
            title="How we partner"
            subtitle="Three principles that guide every partnership decision at SP NET INC."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-5" staggerDelay={0.08}>
            {philosophy.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-medium text-white/60 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Partnership Benefits"
            title="What partners receive"
            subtitle="Tangible value for every organization that joins the SP NET partner ecosystem."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.06}>
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="flex gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <benefit.icon className="h-5 w-5 text-white/40" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/60 mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-white/25 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="By the Numbers"
            title="Partnership at a glance"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl sm:text-3xl font-semibold text-white/60 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/25">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <FAQ title="Partnership FAQ" items={faqItems} />

      <RelatedPages
        title="Related Pages"
        pages={[
          {
            title: "About SP NET INC",
            description:
              "Learn about the company, its mission, and the team behind the products.",
            href: "/company/about",
          },
          {
            title: "Products",
            description:
              "Explore SP NET GRAM, SP NET ADMIN OS, and SP NET AI.",
            href: "/products/sp-net-ecosystem",
          },
          {
            title: "Brand Guidelines",
            description:
              "Official brand assets, colors, typography, and usage guidelines.",
            href: "/company/brand",
          },
          {
            title: "Contact",
            description:
              "Get in touch with SP NET INC for inquiries and partnerships.",
            href: "/get-in-touch",
          },
          {
            title: "Newsroom",
            description:
              "Company announcements, product launches, and updates.",
            href: "/company/newsroom",
          },
          {
            title: "Technologies",
            description:
              "The technical foundation powering the SP NET ecosystem.",
            href: "/explore/technology",
          },
        ]}
      />

      <CTASection
        title="Let&apos;s build together"
        titleAccent="start a conversation"
        description="Interested in partnering with SP NET INC? We're always looking for organizations that share our vision for technology that works effortlessly."
        primaryAction={{ label: "Propose a partnership", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "Learn about us", href: "/company/about" }}
      />
    </>
  );
}
