"use client";

import { motion } from "framer-motion";
import {
  Building2,
  ArrowUpRight,
  Rocket,
  Target,
  Users,
  Briefcase,
  Newspaper,
  Mail,
  Handshake,
} from "lucide-react";
import { spring } from "@/lib/motion";
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
    title: "About SP NET INC",
    description: "The story behind SP NET INC and what drives us forward",
    href: "/company/about",
    icon: Building2,
  },
  {
    title: "Mission & Vision",
    description: "Our purpose, principles, and the future we are building",
    href: "/company/mission",
    icon: Target,
  },
  {
    title: "Leadership",
    description: "The founder and leadership philosophy behind SP NET INC",
    href: "/company/leadership",
    icon: Users,
  },
  {
    title: "Partners",
    description: "Technology partners and strategic collaborations",
    href: "/company/partners",
    icon: Handshake,
  },
  {
    title: "Careers",
    description: "Join SP NET INC and help build the future of technology",
    href: "/company/careers",
    icon: Briefcase,
  },
  {
    title: "Newsroom",
    description: "The latest news, product launches, and company milestones",
    href: "/company/newsroom",
    icon: Newspaper,
  },
  {
    title: "Contact",
    description: "Get in touch with the SP NET INC team",
    href: "/get-in-touch",
    icon: Mail,
  },
  {
    title: "Socials",
    description: "Follow SP NET INC across social platforms",
    href: "/company/socials",
    icon: Users,
  },
  {
    title: "Support",
    description: "Help, FAQs, and resources",
    href: "/company/support",
    icon: Handshake,
  },
  {
    title: "Updates",
    description: "News, announcements, and changelogs",
    href: "/company/updates",
    icon: Newspaper,
  },
  {
    title: "Newsletter",
    description: "Subscribe for curated updates",
    href: "/company/newsletter",
    icon: Rocket,
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Company" }]}
        label="Company"
        title="SP NET INC"
        titleAccent="Building the future of technology"
        description="Everything about SP NET INC — the company building infrastructure for modern communication, enterprise administration, and intelligent automation."
        icon={<Building2 className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Overview"
          title="What SP NET INC is building"
          subtitle="A technology company on a mission to create infrastructure for modern communication, enterprise administration, and intelligent automation."
        />

        <FadeIn delay={0.1}>
          <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
            <p>
              SP NET INC is a founder-led technology company built around a single
              belief: software should elevate human potential. From messaging to
              enterprise tooling to AI, every product in the ecosystem is designed
              to work together seamlessly and earn the trust of the people who use it.
            </p>
            <p>
              Founded in {personal.mission ? "2022" : "2022"} by {personal.name}, the company
              operates at the intersection of engineering precision and product vision — building
              tools that feel invisible, work effortlessly, and serve a genuine purpose.
            </p>
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Explore"
          title="Everything about SP NET INC"
          subtitle="Dive into any area of the company."
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
            title: "About Savan",
            description: "The founder behind SP NET INC.",
            href: "/founder/about",
          },
          {
            title: "Mission",
            description: "The purpose driving every product.",
            href: "/company/mission",
          },
          {
            title: "Products",
            description: "The SP NET product ecosystem.",
            href: "/products",
          },
          {
            title: "Leadership",
            description: "The founder and leadership philosophy.",
            href: "/company/leadership",
          },
        ]}
      />

      <CTASection
        title="Part of the"
        titleAccent="SP NET INC story"
        description="Whether you are interested in our products, partnership opportunities, or want to learn more about the company — we would love to hear from you."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View products", href: "/products" }}
      />
    </>
  );
}
