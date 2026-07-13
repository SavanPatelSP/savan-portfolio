"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Rss,
  GitFork,
  Image,
  Megaphone,
  Mail,
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
    title: "Documentation",
    description: "Technical documentation and API references",
    href: "/resources/documentation",
    icon: FileText,
  },
  {
    title: "FAQs",
    description: "Frequently asked questions about SP NET INC and products",
    href: "/resources/faqs",
    icon: HelpCircle,
  },
  {
    title: "Blog",
    description: "Engineering insights, product updates, and technical deep dives",
    href: "/resources/blog",
    icon: Rss,
  },
  {
    title: "Open Source",
    description: "Contributing to open source and giving back to the community",
    href: "/resources/open-source",
    icon: GitFork,
  },
  {
    title: "Media Kit",
    description: "Brand assets, press information, and media guidelines",
    href: "/resources/media-kit",
    icon: Image,
  },
  {
    title: "Press Releases",
    description: "Official announcements and product launch news",
    href: "/resources/press-releases",
    icon: Megaphone,
  },
  {
    title: "Press Contact",
    description: "Media inquiries and press-related questions",
    href: "/resources/press-contact",
    icon: Mail,
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Resources" }]}
        label="Resources"
        title="Resources"
        titleAccent="Tools, docs, and knowledge"
        description="Documentation, FAQs, blog, open-source projects, media kit, and press resources."
        icon={<BookOpen className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Overview"
          title="Everything you need"
          subtitle="Technical docs, frequently asked questions, blog posts, open-source projects, and press resources — all in one place."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
            <p>
              Whether you are a developer looking for API docs, a journalist writing
              about SP NET INC, or someone with a question — this is where you will
              find the answers. Everything is organized and easy to find.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Explore"
          title="Browse resources"
          subtitle="Find what you are looking for."
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
            title: "FAQs",
            description: "Answers to common questions.",
            href: "/resources/faqs",
          },
          {
            title: "Open Source",
            description: "Contributions to the community.",
            href: "/resources/open-source",
          },
          {
            title: "Media Kit",
            description: "Brand assets and press guidelines.",
            href: "/resources/media-kit",
          },
          {
            title: "Blog",
            description: "Engineering insights and updates.",
            href: "/resources/blog",
          },
        ]}
      />

      <CTASection
        title="Can't find"
        titleAccent="what you need?"
        description="If you have a question that is not covered in the resources, reach out directly."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View FAQs", href: "/resources/faqs" }}
      />
    </>
  );
}
