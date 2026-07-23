"use client";

import { motion } from "framer-motion";
import {
  HelpCircle,
  Rocket,
  Code2,
  Users,
  MessageSquare,
} from "lucide-react";

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
import { FAQPage } from "@/components/faq/FAQPage";
import { faqCategories, faqItems } from "@/data/faqs";

const relatedPages = [
  {
    title: "Contact",
    description:
      "Get in touch with Savan Patel and SP NET INC for inquiries, partnerships, or support.",
    href: "/get-in-touch",
  },
  {
    title: "About SP NET INC",
    description:
      "Learn about the company, its mission, and the vision behind the products.",
    href: "/company/about",
  },
  {
    title: "Products",
    description:
      "Explore SP NET GRAM, SP NET ADMIN OS, and SP NET AI.",
    href: "/products",
  },
  {
    title: "Roadmap",
    description:
      "What is next for SP NET INC and the products being built.",
    href: "/founder/roadmap",
  },
  {
    title: "Trust & Privacy",
    description:
      "How privacy, security, and transparency guide every decision.",
    href: "/trust",
  },
  {
    title: "Open Source",
    description:
      "Contributing to open source and giving back to the developer community.",
    href: "/resources/open-source",
  },
];

const stats = [
  { icon: Rocket, label: "Products", value: "3" },
  { icon: Users, label: "Team", value: "1" },
  { icon: Code2, label: "Stack", value: "TS/React" },
  { icon: MessageSquare, label: "Support", value: "<48h" },
];

export default function FAQsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "FAQs" },
        ]}
        label="Resources"
        title="FAQs"
        titleAccent="Frequently asked questions"
        description="The complete knowledge base for everything about Savan Patel, SP NET INC, products, research, privacy, communication, and career opportunities."
        icon={<HelpCircle className="h-4 w-4" />}
      />

        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Quick answers
                <br />
                <span className="text-white/40">to common questions</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  This page is the complete knowledge base for Savan Patel and
                  SP NET INC. It covers everything from products and research to
                  privacy practices, communication channels, and career
                  opportunities.
                </p>
                <p>
                  Browse by category, search for specific topics, or expand all
                  questions to explore everything at once. The Personal
                  Communication Assistant (PCA) is also available via Telegram
                  for instant answers to any question not covered here.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="FAQ"
            title="Frequently asked questions"
            subtitle="Browse by category or search for specific topics. The complete knowledge base covering all aspects of Savan Patel, SP NET INC, and the products being built."
          />

          <FAQPage categories={faqCategories} items={faqItems} />
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="By the Numbers"
            title="SP NET INC at a glance"
          />

          <StaggerFade
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            staggerDelay={0.06}
          >
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

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Still have questions?"
            title="Reach out"
            subtitle="Use the PCA for instant answers, or email us for formal inquiries. We respond to every inquiry personally."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mx-auto mb-6">
                <MessageSquare className="h-6 w-6 text-white/30" />
              </div>
              <h3 className="text-lg font-semibold text-white/70 mb-2">
                Use the Personal Communication Assistant
              </h3>
              <p className="text-sm text-white/30 leading-relaxed max-w-md mx-auto mb-6">
                Get instant answers to any question via Telegram. The PCA is
                available 24/7 and can help with anything not covered in these FAQs.
              </p>
              <motion.a
                href="https://t.me/SAVANPATELSP_BOT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <MessageSquare className="h-4 w-4" />
                Open PCA on Telegram
              </motion.a>
            </div>
          </FadeIn>
      </SectionContainer>

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Still curious?"
        titleAccent="I'm happy to help"
        description="Every question matters. Reach out and I'll give you a thoughtful, personal response."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "About me", href: "/founder/about" }}
      />
    </>
  );
}
