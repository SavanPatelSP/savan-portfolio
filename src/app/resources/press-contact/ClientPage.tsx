"use client";

import { motion } from "framer-motion";
import {
  Newspaper,
  Mail,
  Clock,
  ArrowRight,
  FileText,
  Users,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
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

const pressContacts = [
  {
    title: "Media Inquiries",
    description:
      "Interview requests, press inquiries, and media coverage. Include your publication name, deadline, and the nature of your inquiry.",
    email: "media@sp-net.in",
    icon: Newspaper,
    responseTime: "24–48 hours",
  },
  {
    title: "General Press Contact",
    description:
      "For all other press-related questions, including speaking engagements, panel invitations, and event participation requests.",
    email: "savan@sp-net.in",
    icon: Mail,
    responseTime: "24–48 hours",
  },
];

const responseTimes = [
  {
    category: "Breaking News / Deadlines",
    time: "12–24 hours",
    priority: "High",
    description:
      "Time-sensitive press requests with confirmed deadlines receive priority attention.",
  },
  {
    category: "Interview Requests",
    time: "24–48 hours",
    priority: "Standard",
    description:
      "We accommodate interview schedules whenever possible and coordinate across time zones.",
  },
  {
    category: "General Press Inquiries",
    time: "24–48 hours",
    priority: "Standard",
    description:
      "All press inquiries are responded to within two business days.",
  },
];

const relatedPages = [
  {
    title: "Newsroom",
    description:
      "Company announcements, product launches, and milestones.",
    href: "/company/newsroom",
  },
  {
    title: "Press Releases",
    description:
      "Official press releases and product announcements.",
    href: "/resources/press-releases",
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
      "Get in touch with SP NET INC for any inquiry.",
    href: "/get-in-touch",
  },
];

export default function PressContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Press Contact" },
        ]}
        label="Resources"
        title="Press Contact"
        titleAccent="Media inquiries"
        description="For media inquiries, interview requests, and press coverage. We respond to all press requests promptly."
        icon={<Newspaper className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Working with
                <br />
                <span className="text-white/40">the press</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  SP NET INC welcomes press inquiries and media engagement.
                  Whether you are writing a story, preparing a segment, or
                  researching the technology landscape, we are here to provide
                  accurate information and expert commentary.
                </p>
                <p>
                  Every press request is handled personally by the team. We
                  respect publication deadlines and do our best to accommodate
                  interview schedules across time zones. Include your deadline
                  in every inquiry so we can prioritize accordingly.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Press Contacts"
            title="Reach our press team"
            subtitle="Use the appropriate contact for your inquiry. All emails are monitored and responses are timely."
          />

          <div className="space-y-4">
            {pressContacts.map((contact, i) => (
              <FadeIn key={contact.title} delay={i * 0.06}>
                <div className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <contact.icon className="h-5 w-5 text-white/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-white/60 mb-2">
                        {contact.title}
                      </h3>
                      <p className="text-sm text-white/30 leading-relaxed mb-4">
                        {contact.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <motion.a
                          href={`mailto:${contact.email}`}
                          className="group/link inline-flex items-center gap-2 text-sm text-blue-400/60 hover:text-blue-400/80 transition-colors duration-200"
                          whileHover={{ x: 2 }}
                          transition={spring.gentle}
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {contact.email}
                          <ArrowRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                        </motion.a>
                        <span className="text-xs text-white/20">
                          Response: {contact.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Response Times"
            title="What to expect"
            subtitle="We prioritize press requests and accommodate deadlines whenever possible."
          />

          <div className="rounded-xl border border-white/[0.04] overflow-hidden">
            <div className="hidden sm:grid grid-cols-[1fr_120px_100px_1fr] gap-4 px-6 py-3 border-b border-white/[0.04] bg-white/[0.01]">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/25">
                Category
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/25">
                Response
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/25">
                Priority
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/25">
                Details
              </span>
            </div>

            {responseTimes.map((item, i) => (
              <FadeIn key={item.category} delay={i * 0.04}>
                <div
                  className={cn(
                    "grid grid-cols-1 sm:grid-cols-[1fr_120px_100px_1fr] gap-3 sm:gap-4 px-6 py-4",
                    i < responseTimes.length - 1 &&
                      "border-b border-white/[0.04]"
                  )}
                >
                  <div>
                    <p className="text-sm font-medium text-white/60 sm:hidden mb-1">
                      {item.category}
                    </p>
                    <p className="text-sm text-white/50 hidden sm:block">
                      {item.category}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-xs font-mono text-white/40">
                      {item.time}
                    </span>
                  </div>
                  <div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                        item.priority === "High"
                          ? "border border-amber-500/10 bg-amber-500/[0.05] text-amber-400/60"
                          : "border border-white/[0.04] bg-white/[0.02] text-white/30"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          item.priority === "High"
                            ? "bg-amber-400/60"
                            : "bg-white/20"
                        )}
                      />
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white/25 leading-relaxed sm:col-span-1">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Media Kit"
            title="Brand assets"
            subtitle="Official logos, brand colors, typography, and usage guidelines for media coverage."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-dashed border-white/[0.06] bg-white/[0.01] p-8 sm:p-12 text-center">
              <FileText className="h-8 w-8 text-white/15 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white/50 mb-2">
                Media kit
              </h3>
              <p className="text-sm text-white/25 max-w-md mx-auto leading-relaxed mb-6">
                Get official SP NET INC brand assets including logos,
                colors, typography guidelines, and usage rules. Available
                in multiple formats for print and digital use.
              </p>
              <Link
                href="/company/brand"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
              >
                View Brand Guidelines
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="By the Numbers"
            title="Press coverage at a glance"
          />

          <StaggerFade
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            staggerDelay={0.06}
          >
            {[
              { icon: Clock, label: "Response Time", value: "<48h" },
              { icon: Mail, label: "Press Emails", value: "2" },
              { icon: Users, label: "Languages", value: "EN" },
              { icon: Newspaper, label: "Availability", value: "24/7" },
            ].map((stat) => (
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

      <RelatedPages title="Related Pages" pages={relatedPages} />

      <CTASection
        title="Ready to cover SP NET?"
        titleAccent="we are ready to help"
        description="Reach out with your inquiry and we will provide the information, access, and quotes you need for your story."
        primaryAction={{ label: "Email media team", href: "mailto:media@sp-net.in" }}
        secondaryAction={{ label: "View newsroom", href: "/company/newsroom" }}
      />
    </>
  );
}
