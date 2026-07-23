"use client";

import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Globe,
  Calendar,
  ArrowUpRight,
  Route,
  Compass,
  Rocket,
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
    title: "About Savan",
    description: "Background, values, and what drives the founder",
    href: "/founder/about",
    icon: User,
  },
  {
    title: "Journey",
    description: "From first line of code to founding SP NET INC",
    href: "/founder/journey",
    icon: Route,
  },
  {
    title: "Philosophy",
    description: "How we build, what we believe, and why it matters",
    href: "/founder/philosophy",
    icon: Compass,
  },
  {
    title: "Roadmap",
    description: "The vision, milestones, and what comes next",
    href: "/founder/roadmap",
    icon: Rocket,
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Founder" }]}
        label="Founder"
        title="Savan Patel"
        titleAccent="Self-taught engineer and builder"
        description="Learn about Savan Patel — the self-taught software engineer and founder behind SP NET INC."
        icon={<User className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="The person behind SP NET INC"
          subtitle="A self-taught engineer from India who turned a single line of code into a technology company."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Based in", value: personal.location, icon: MapPin },
            { label: "First code", value: String(personal.firstCode), icon: Calendar },
            { label: "Company", value: personal.company, icon: Globe },
            { label: "Contact", value: personal.email, icon: User },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.06}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <item.icon className="h-4 w-4 text-white/20 mb-3" />
                <p className="text-xs text-white/25 mb-1">{item.label}</p>
                <p className="text-sm font-medium text-white/60">{item.value}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionTitle
          label="Explore"
          title="Learn more about the founder"
          subtitle="Dive into any aspect of Savan's story, philosophy, and vision."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
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
            title: "Leadership",
            description: "The leadership philosophy behind SP NET INC.",
            href: "/company/leadership",
          },
          {
            title: "About SP NET INC",
            description: "The company Savan founded.",
            href: "/company/about",
          },
          {
            title: "Mission",
            description: "The purpose driving everything forward.",
            href: "/company/mission",
          },
          {
            title: "Roadmap",
            description: "The vision and what comes next.",
            href: "/founder/roadmap",
          },
        ]}
      />

      <CTASection
        title="Want to connect"
        titleAccent="with Savan?"
        description="Always open to conversations about technology, product design, and building the future."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View products", href: "/products" }}
      />
    </>
  );
}
