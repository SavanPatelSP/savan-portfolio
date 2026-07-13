"use client";

import { motion } from "framer-motion";
import {
  HelpCircle,
  Bug,
  Lightbulb,
  Mail,
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

const supportChannels = [
  {
    title: "FAQs",
    description:
      "Browse frequently asked questions about SP NET INC products, company policies, and technical details. Most common questions are answered here.",
    href: "/resources/faqs",
    icon: HelpCircle,
    color: "text-blue-400/70",
    borderColor: "border-blue-400/10",
    hoverBorder: "hover:border-blue-400/25",
  },
  {
    title: "Report a Bug",
    description:
      "Found something that is not working correctly? Send an email to security@sp-net.in with details about the issue, steps to reproduce, and your environment.",
    href: "mailto:security@sp-net.in?subject=Bug Report",
    icon: Bug,
    color: "text-amber-400/70",
    borderColor: "border-amber-400/10",
    hoverBorder: "hover:border-amber-400/25",
  },
  {
    title: "Feature Requests",
    description:
      "Have an idea for a new feature or improvement? Email hello@sp-net.in with your suggestion. Every idea is reviewed by the team.",
    href: "mailto:hello@sp-net.in?subject=Feature Request",
    icon: Lightbulb,
    color: "text-violet-400/70",
    borderColor: "border-violet-400/10",
    hoverBorder: "hover:border-violet-400/25",
  },
  {
    title: "Contact Support",
    description:
      "Need direct help? Reach out to the team via email. We respond to all inquiries within 48 hours — sooner for urgent matters.",
    href: "/get-in-touch",
    icon: Mail,
    color: "text-emerald-400/70",
    borderColor: "border-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/25",
  },
];

export default function SupportClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Support" },
        ]}
        label="Company"
        title="Support"
        titleAccent="We are here to help"
        description="Everything you need to get help, report issues, or share feedback. Choose the channel that best fits your needs."
        icon={<HelpCircle className="h-4 w-4" />}
      />

      <SectionContainer id="channels">
        <SectionContainer>
          <SectionTitle
            label="Support Channels"
            title="How to get help"
            subtitle="Pick the option that best matches what you need. Every channel is monitored and responded to promptly."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.08}
          >
            {supportChannels.map((channel) => {
              const isExternal = channel.href.startsWith("mailto:");
              return (
                <StaggerItem key={channel.title}>
                  <motion.a
                    href={channel.href}
                    target={isExternal ? undefined : "_blank"}
                    rel={isExternal ? undefined : "noopener noreferrer"}
                    className={`group block rounded-xl border ${channel.borderColor} ${channel.hoverBorder} bg-white/[0.01] p-6 sm:p-8 h-full transition-all duration-300 hover:bg-white/[0.02]`}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={spring.gentle}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                        <channel.icon
                          className={`h-5 w-5 ${channel.color}`}
                        />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>

                    <h3 className="text-lg font-medium text-white/70 mb-2">
                      {channel.title}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed">
                      {channel.description}
                    </p>
                  </motion.a>
                </StaggerItem>
              );
            })}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Response times
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                What to
                <br />
                <span className="text-white/40">expect</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  Security reports are addressed within 12–24 hours. All other
                  inquiries receive a response within 24–48 hours. Every email is
                  read and responded to personally — no automated replies or
                  ticketing systems.
                </p>
                <p>
                  For the fastest resolution, include as much detail as possible
                  in your initial message: steps to reproduce, expected vs.
                  actual behavior, screenshots, and your environment details.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      <RelatedPages
        title="Helpful Resources"
        pages={[
          {
            title: "FAQs",
            description:
              "Answers to the most common questions about SP NET INC.",
            href: "/resources/faqs",
          },
          {
            title: "Contact",
            description:
              "Departmental email addresses for every type of inquiry.",
            href: "/get-in-touch",
          },
          {
            title: "System Status",
            description:
              "Current status and uptime of all SP NET INC services.",
            href: "/trust/status",
          },
          {
            title: "Documentation",
            description:
              "Technical guides and API references.",
            href: "/resources/documentation",
          },
          {
            title: "Security",
            description:
              "How we protect data and handle vulnerabilities.",
            href: "/trust/security",
          },
          {
            title: "Blog",
            description:
              "Engineering insights and product updates.",
            href: "/resources/blog",
          },
        ]}
      />

      <CTASection
        title="Still need"
        titleAccent="help?"
        description="Reach out directly and we will get back to you within 48 hours. For security issues, expect a response within 12–24 hours."
        primaryAction={{ label: "Contact us", href: "/get-in-touch" }}
        secondaryAction={{
          label: "Browse FAQs",
          href: "/resources/faqs",
        }}
      />
    </>
  );
}
