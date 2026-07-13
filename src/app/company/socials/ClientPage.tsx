"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, XIcon, LinkedinIcon, InstagramIcon, TelegramIcon } from "@/components/ui/Icons";
import { SocialModal } from "@/components/ui/SocialModal";
import { personal } from "@/data/personal";
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

const socials = [
  {
    title: "GitHub",
    username: "savanpatelssp",
    description:
      "Open source projects, code repositories, and development activity. Follow to see what is being built next.",
    href: personal.social.github,
    icon: GithubIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
    stats: "Open Source & Code",
  },
  {
    title: "X",
    username: null,
    description:
      "Official profile launching soon. Follow for real-time updates, development insights, and announcements.",
    href: personal.social.x,
    icon: XIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
    stats: "Real-time Updates",
    modal: true as const,
  },
  {
    title: "LinkedIn",
    username: null,
    description:
      "Professional profile coming soon. Connect for partnership and collaboration opportunities.",
    href: personal.social.linkedin,
    icon: LinkedinIcon,
    color: "text-blue-400/70",
    borderColor: "border-blue-400/10",
    hoverBorder: "hover:border-blue-400/25",
    stats: "Professional Network",
    modal: true as const,
  },
  {
    title: "Instagram",
    username: "savanpatelssp",
    description:
      "Behind-the-scenes content, product visuals, and day-to-day updates from the founder.",
    href: personal.social.instagram,
    icon: InstagramIcon,
    color: "text-pink-400/70",
    borderColor: "border-pink-400/10",
    hoverBorder: "hover:border-pink-400/25",
    stats: "Visual Updates",
  },
  {
    title: "Telegram",
    username: "ABOUTME_SP",
    description:
      "Direct communication, community discussions, and real-time updates. Join the channel for the latest news.",
    href: personal.social.telegram,
    icon: TelegramIcon,
    color: "text-cyan-400/70",
    borderColor: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/25",
    stats: "Direct Messaging",
  },
];

export default function SocialsClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Socials" },
        ]}
        label="Company"
        title="Socials"
        titleAccent="Stay connected"
        description="Follow SP NET INC across your preferred platforms. Every platform serves a different purpose — choose the one that fits how you like to stay updated."
        icon={<ExternalLink className="h-4 w-4" />}
      />

      <SectionContainer id="platforms">
        <SectionContainer>
          <SectionTitle
            label="Platforms"
            title="Where to find us"
            subtitle="Each platform serves a different purpose. Follow the ones that match how you like to stay connected."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.08}
          >
            {socials.map((social) => (
              <StaggerItem key={social.title}>
                <motion.a
                  href={"modal" in social ? "#" : social.href}
                  target={"modal" in social ? undefined : "_blank"}
                  rel={"modal" in social ? undefined : "noopener noreferrer"}
                  onClick={"modal" in social ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                  className={`group block rounded-xl border ${social.borderColor} ${social.hoverBorder} bg-white/[0.01] p-6 sm:p-8 h-full transition-all duration-300 hover:bg-white/[0.02]`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]`}
                    >
                      <social.icon className={`h-5 w-5 ${social.color}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>

                  <h3 className="text-lg font-medium text-white/70 mb-1">
                    {social.title}
                  </h3>
                  {social.username ? (
                    <p className="text-sm text-blue-400/50 font-mono mb-3">
                      @{social.username}
                    </p>
                  ) : (
                    <p className="text-sm text-white/20 italic mb-3">
                      {social.description}
                    </p>
                  )}
                  <p className="text-sm text-white/30 leading-relaxed mb-4">
                    {social.username ? social.description : ""}
                  </p>

                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-1 text-[11px] text-white/25">
                    {social.stats}
                  </div>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerFade>
          <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Which platform?
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Choose your
                <br />
                <span className="text-white/40">preferred channel</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  GitHub is where code lives — repositories, contributions, and
                  development activity. LinkedIn is for professional updates,
                  company milestones, and industry conversations. Instagram
                  offers a visual, behind-the-scenes look at what is being
                  built.
                </p>
                <p>
                  Telegram is the fastest way to get in touch directly. For
                  formal inquiries, email remains the best channel — visit the
                  Contact page to find the right departmental address.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      <RelatedPages
        title="Related Pages"
        pages={[
          {
            title: "Contact",
            description:
              "Get in touch via email for formal inquiries and support.",
            href: "/get-in-touch",
          },
          {
            title: "About Savan Patel",
            description:
              "The founder and engineer behind SP NET INC.",
            href: "/founder/about",
          },
          {
            title: "Open Source",
            description:
              "The long-term vision for open source at SP NET INC.",
            href: "/resources/open-source",
          },
          {
            title: "Blog",
            description:
              "Engineering insights and technical deep dives.",
            href: "/resources/blog",
          },
          {
            title: "Newsroom",
            description:
              "Company announcements and product launches.",
            href: "/company/newsroom",
          },
          {
            title: "Support",
            description:
              "Help, FAQs, and resources.",
            href: "/company/support",
          },
        ]}
      />

      <CTASection
        title="Let us"
        titleAccent="connect"
        description="Choose your preferred platform and stay updated on everything SP NET INC — from product launches to engineering insights."
        primaryAction={{
          label: "Follow on GitHub",
          href: personal.social.github,
        }}
        secondaryAction={{ label: "Visit Contact", href: "/get-in-touch" }}
      />
    </>
  );
}
