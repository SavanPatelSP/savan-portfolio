"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  BookOpen,
  FileText,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { spring } from "@/lib/motion";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const updateChannels = [
  {
    title: "Newsroom",
    description:
      "Company announcements, product launches, partnerships, and major milestones. The official source for SP NET INC news.",
    href: "/company/newsroom",
    icon: Newspaper,
    color: "text-blue-400/70",
    borderColor: "border-blue-400/10",
    hoverBorder: "hover:border-blue-400/25",
    badge: "Official",
  },
  {
    title: "Blog",
    description:
      "Engineering deep dives, architecture decisions, product insights, and technical walkthroughs from the team.",
    href: "/resources/blog",
    icon: BookOpen,
    color: "text-violet-400/70",
    borderColor: "border-violet-400/10",
    hoverBorder: "hover:border-violet-400/25",
    badge: "Technical",
  },
  {
    title: "Press Releases",
    description:
      "Official press releases, media coverage, and journalist resources for reporting on SP NET INC.",
    href: "/resources/press-releases",
    icon: FileText,
    color: "text-amber-400/70",
    borderColor: "border-amber-400/10",
    hoverBorder: "hover:border-amber-400/25",
    badge: "Media",
  },
  {
    title: "Changelog",
    description:
      "Detailed record of product updates, feature releases, and improvements across the SP NET ecosystem.",
    href: "/resources/documentation",
    icon: Clock,
    color: "text-emerald-400/70",
    borderColor: "border-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/25",
    badge: "Coming Soon",
  },
];

export default function UpdatesClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Updates" },
        ]}
        label="Company"
        title="Updates"
        titleAccent="Stay in the loop"
        description="Company news, technical insights, press coverage, and product changelogs — everything happening at SP NET INC, organized in one place."
        icon={<Newspaper className="h-4 w-4" />}
      />

      <SectionContainer id="channels">
          <SectionTitle
            label="Channels"
            title="How we share updates"
            subtitle="Each channel serves a different purpose. Subscribe to the ones that match what you care about."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.08}
          >
            {updateChannels.map((channel) => (
              <StaggerItem key={channel.title}>
                <motion.a
                  href={channel.href}
                  className={`group block rounded-xl border ${channel.borderColor} ${channel.hoverBorder} bg-white/[0.01] p-6 sm:p-8 h-full transition-all duration-300 hover:bg-white/[0.02]`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <channel.icon className={`h-5 w-5 ${channel.color}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/25">
                        {channel.badge}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-white/70 mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {channel.description}
                  </p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Stay updated
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Never miss
                <br />
                <span className="text-white/40">an update</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  The Newsroom is the primary channel for company-level
                  announcements and product launches. The Blog covers technical
                  topics in depth — architecture decisions, engineering
                  patterns, and behind-the-scenes looks at how products are
                  built.
                </p>
                <p>
                  Press Releases serve journalists and media professionals
                  covering SP NET INC. The Changelog is being prepared and
                  will provide detailed records of every product update across
                  the ecosystem.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <RelatedPages
        title="Quick Links"
        pages={[
          {
            title: "Newsroom",
            description: "Official company announcements and milestones.",
            href: "/company/newsroom",
          },
          {
            title: "Blog",
            description: "Engineering insights and technical deep dives.",
            href: "/resources/blog",
          },
          {
            title: "Press Releases",
            description: "Official press releases and media resources.",
            href: "/resources/press-releases",
          },
          {
            title: "Contact",
            description: "Get in touch for media or general inquiries.",
            href: "/get-in-touch",
          },
          {
            title: "Socials",
            description: "Follow us on social platforms for real-time updates.",
            href: "/company/socials",
          },
          {
            title: "Newsletter",
            description: "Subscribe for curated updates delivered to your inbox.",
            href: "/company/newsletter",
          },
        ]}
      />

      <CTASection
        title="Want to"
        titleAccent="stay updated?"
        description="Follow the Newsroom, subscribe to the Blog, or reach out to be added to the notification list for important announcements."
        primaryAction={{ label: "Visit Newsroom", href: "/company/newsroom" }}
        secondaryAction={{ label: "Read the Blog", href: "/resources/blog" }}
      />
    </>
  );
}
