"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Building2,
  Briefcase,
  Shield,
  Users,
  MessageSquare,
  Globe,
  ArrowUpRight,
  Newspaper,
  Handshake,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, NORMAL } from "@/lib/motion";
import { personal } from "@/data/personal";
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

/* ─── DATA ───────────────────────────────────────────────────── */

const departments = [
  {
    title: "General Inquiries",
    email: "contact@sp-net.in",
    description:
      "For general questions about SP NET INC, our products, or our mission. We respond to all inquiries promptly.",
    icon: Mail,
    color: "text-blue-400/70",
    borderColor: "border-blue-400/10",
  },
  {
    title: "Business & Partnerships",
    email: "business@sp-net.in",
    description:
      "For partnership proposals, business development, and collaboration opportunities with SP NET INC.",
    icon: Handshake,
    color: "text-violet-400/70",
    borderColor: "border-violet-400/10",
  },
  {
    title: "Media & Press",
    email: "press@sp-net.in",
    description:
      "For press inquiries, interview requests, media kit access, and coverage related to SP NET INC.",
    icon: Newspaper,
    color: "text-amber-400/70",
    borderColor: "border-amber-400/10",
  },
  {
    title: "Careers",
    email: "careers@sp-net.in",
    description:
      "Interested in joining the team? Reach out about open positions, internships, and career opportunities.",
    icon: Briefcase,
    color: "text-emerald-400/70",
    borderColor: "border-emerald-400/10",
  },
  {
    title: "Security",
    email: "security@sp-net.in",
    description:
      "For reporting security vulnerabilities, responsible disclosure, and security-related concerns.",
    icon: Shield,
    color: "text-red-400/70",
    borderColor: "border-red-400/10",
  },
  {
    title: "Support",
    email: "support@sp-net.in",
    description:
      "For product support, technical issues, bug reports, and general help with SP NET INC products.",
    icon: HelpCircle,
    color: "text-cyan-400/70",
    borderColor: "border-cyan-400/10",
  },
  {
    title: "Hello",
    email: "hello@sp-net.in",
    description:
      "A friendly greeting for general questions, introductions, or anything else on your mind. We would love to hear from you.",
    icon: Users,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
  },
];

const officeInfo = [
  {
    label: "Headquarters",
    value: "India",
    icon: Building2,
  },
  {
    label: "Founded",
    value: "2022",
    icon: Globe,
  },
  {
    label: "Response Time",
    value: "Within 48 hours",
    icon: MessageSquare,
  },
];

const faqItems = [
  {
    question: "How can I contact SP NET INC?",
    answer:
      "You can reach us by emailing the appropriate department above. For general inquiries, use contact@sp-net.in. For specific needs, use the relevant department email. We aim to respond within 48 hours.",
  },
  {
    question: "Where is SP NET INC based?",
    answer:
      "SP NET INC is headquartered in India. We are a remote-first company with team members working across different time zones.",
  },
  {
    question: "Does SP NET INC offer internships?",
    answer:
      "Yes, we offer internships for motivated individuals who are passionate about technology and building great products. Reach out to careers@sp-net.in with your resume and a brief introduction.",
  },
  {
    question: "How do I report a security vulnerability?",
    answer:
      "We take security seriously. If you have found a vulnerability, please report it by emailing security@sp-net.in. We will review your report promptly and get back to you.",
  },
  {
    question: "Can I partner with SP NET INC?",
    answer:
      "We are always open to exploring meaningful partnerships. Email business@sp-net.in with details about your proposal and we will review it.",
  },
];

/* ─── MAIN ───────────────────────────────────────────────────── */

export default function CompanyContactClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company", href: "/company" },
          { label: "Contact" },
        ]}
        label="Company"
        title="Contact"
        titleAccent="SP NET INC"
        description="Get in touch with SP NET INC. Whether it is a business inquiry, media request, partnership proposal, or a general question — we are here to help."
        icon={<Building2 className="h-4 w-4" />}
      />

      {/* ─── OFFICE INFO ──────────────────────────────────────── */}
      <SectionContainer id="info">
        <SectionContainer>
          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            staggerDelay={0.06}
          >
            {officeInfo.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <item.icon className="h-4 w-4 text-white/40" />
                  </div>
                  <div>
                    <p className="text-xs text-white/25 uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-white/60 mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      {/* ─── ABOUT CONTACTING ─────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                We&apos;d love to
                <br />
                <span className="text-white/40">hear from you</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  SP NET INC is committed to building technology that connects
                  people, empowers communities, and shapes the future. Whether
                  you are a potential partner, member of the press, prospective
                  team member, or simply have a question — we welcome your
                  outreach.
                </p>
                <p>
                  Please use the appropriate department email below to ensure
                  your message reaches the right team. We aim to respond to all
                  inquiries within 48 hours.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      {/* ─── DEPARTMENTS ──────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]" id="departments">
        <SectionContainer>
          <SectionTitle
            label="Departments"
            title="Reach the right team"
            subtitle="Choose the department that best matches your inquiry for a faster response."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            staggerDelay={0.06}
          >
            {departments.map((dept) => (
              <StaggerItem key={dept.title}>
                <motion.a
                  href={`mailto:${dept.email}`}
                  className={cn(
                    "group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 h-full"
                  )}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={cn(
                        "inline-flex items-center justify-center rounded-lg border p-2.5",
                        dept.borderColor
                      )}
                    >
                      <dept.icon className={cn("h-5 w-5", dept.color)} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                  <h3 className="text-base font-medium text-white/70 mb-1">
                    {dept.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm font-mono mb-3",
                      dept.color.replace("/70", "/50")
                    )}
                  >
                    {dept.email}
                  </p>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {dept.description}
                  </p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      {/* ─── FOR MEDIA ────────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Media
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Press &amp;
                <br />
                <span className="text-white/40">media resources</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  Members of the press can reach us at press@sp-net.in for
                  interview requests, media kit access, and coverage inquiries.
                  We respond to all press requests promptly.
                </p>
                <p>
                  For detailed press resources, visit our{" "}
                  <a
                    href="/resources/press-contact"
                    className="text-white/50 hover:text-white/70 underline underline-offset-4 decoration-white/10 hover:decoration-white/20 transition-colors"
                  >
                    press contact page
                  </a>
                  .
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Questions"
            title="Frequently asked questions"
            subtitle="Common questions about contacting SP NET INC."
          />

          <div className="mx-auto max-w-2xl">
            <FAQ title="" items={faqItems} />
          </div>
        </SectionContainer>
      </SectionContainer>

      {/* ─── RELATED PAGES ────────────────────────────────────── */}
      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "About SP NET INC",
            description:
              "Our mission, values, and the vision behind the company.",
            href: "/company/about",
          },
          {
            title: "Careers",
            description:
              "Join the team and help build the future of technology.",
            href: "/company/careers",
          },
          {
            title: "Leadership",
            description:
              "Meet the people driving SP NET INC forward.",
            href: "/company/leadership",
          },
          {
            title: "Press Contact",
            description:
              "Media inquiries, press kit, and interview requests.",
            href: "/resources/press-contact",
          },
          {
            title: "Partners",
            description:
              "Our partners and collaboration opportunities.",
            href: "/company/partners",
          },
          {
            title: "Security",
            description:
              "Our commitment to security and responsible disclosure.",
            href: "/trust/security",
          },
        ]}
      />

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <CTASection
        title="Let&apos;s"
        titleAccent="connect"
        description="Whether you have a business proposal, media inquiry, or just a question — we are here to listen and respond."
        primaryAction={{
          label: "Send an email",
          href: "mailto:contact@sp-net.in",
        }}
        secondaryAction={{
          label: "View careers",
          href: "/company/careers",
        }}
      />
    </>
  );
}
