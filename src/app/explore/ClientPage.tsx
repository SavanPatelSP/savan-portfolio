"use client";

import { motion } from "framer-motion";
import {
  Compass,
  Layers,
  FolderGit2,
  FlaskConical,
  Code2,
  Rocket,
  BookOpen,
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
    title: "Products",
    description: "The SP NET product ecosystem and what each product does",
    href: "/explore/products",
    icon: Layers,
  },
  {
    title: "Projects",
    description: "Active projects, open-source contributions, and development progress",
    href: "/explore/projects",
    icon: FolderGit2,
  },
  {
    title: "Innovation",
    description: "Applied research, experiments, and cutting-edge exploration",
    href: "/explore/innovation",
    icon: FlaskConical,
  },
  {
    title: "Technology",
    description: "Daily tech stack, tools I'm learning, and technologies that excite me",
    href: "/explore/technology",
    icon: Code2,
  },
  {
    title: "Future Vision",
    description: "Short-term goals, long-term dreams, and technical targets",
    href: "/explore/vision",
    icon: Rocket,
  },
  {
    title: "Learning Resources",
    description: "Recommended resources, books, and courses for developers",
    href: "/explore/learning",
    icon: BookOpen,
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Explore" }]}
        label="Explore"
        title="Explore"
        titleAccent="Products, projects, and possibilities"
        description="Discover products, innovation projects, technology stack, future vision, and learning resources."
        icon={<Compass className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Overview"
          title="Everything I am working on"
          subtitle="Products, experiments, the tech stack, where it all is headed, and the resources that help along the way."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
            <p>
              This is a collection of everything I am building, exploring, and
              thinking about. From the products under SP NET INC to experimental
              projects in the innovation lab — it all lives here.
            </p>
            <p>
              Use this as a starting point to explore what matters to you. Every
              link leads to a deeper dive with more context, details, and stories
              behind the work.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Explore"
          title="Where to start"
          subtitle="Pick a path and start exploring."
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
            title: "Products",
            description: "The SP NET product ecosystem.",
            href: "/products",
          },
          {
            title: "Innovation",
            description: "Applied research and experiments.",
            href: "/explore/innovation",
          },
          {
            title: "Technology",
            description: "The tech stack and daily tools.",
            href: "/explore/technology",
          },
          {
            title: "Vision",
            description: "Short-term goals and long-term dreams.",
            href: "/explore/vision",
          },
        ]}
      />

      <CTASection
        title="Want to dive"
        titleAccent="deeper?"
        description="Every area has its own page with detailed context. Explore freely or reach out to discuss any topic."
        primaryAction={{ label: "View products", href: "/products" }}
        secondaryAction={{ label: "About Savan", href: "/founder/about" }}
      />
    </>
  );
}
