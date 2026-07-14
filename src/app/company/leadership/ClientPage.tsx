"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Users,
  Target,
  Globe,
  ArrowRight,
  Lightbulb,
  Sparkles,
  Code2,
  Heart,
  Shield,
  Brain,
  Compass,
  TrendingUp,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
import { personal } from "@/data/personal";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { SocialModal } from "@/components/ui/SocialModal";
import { RelatedPages } from "@/components/ui/RelatedPages";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const leadershipPrinciples = [
  {
    title: "Lead by building",
    description:
      "The best leaders do not just direct — they demonstrate. At SP NET INC, leadership means being in the trenches, writing code, making design decisions, and shipping products. Influence comes from competence, not title.",
    icon: Code2,
  },
  {
    title: "Clarity over consensus",
    description:
      "Speed matters. Clear direction matters more. The role of leadership is to set a clear vision, make decisive choices, and give the team the context to execute — not to wait for everyone to agree.",
    icon: Target,
  },
  {
    title: "People are the product",
    description:
      "Every great product is built by a great team. Leadership at SP NET INC is fundamentally about attracting, developing, and retaining exceptional people — then giving them the autonomy to do their best work.",
    icon: Users,
  },
  {
    title: "Culture is intentional",
    description:
      "Culture does not happen by accident. It is designed, reinforced, and protected. Every decision, every hire, every product choice either strengthens or weakens the culture. Leadership ensures it strengthens.",
    icon: Shield,
  },
];

const managementStyle = [
  {
    title: "Async-first communication",
    description: "Deep work requires uninterrupted time. We default to async communication — written, thoughtful, and documented. Meetings are rare, purposeful, and time-boxed.",
  },
  {
    title: "Radical ownership",
    description: "Every person owns their domain end-to-end. No passing the buck, no waiting for approval chains. Clear accountability with full authority to make decisions.",
  },
  {
    title: "High trust, high standards",
    description: "We hire people we trust and hold them to the highest standards. Autonomy is earned through excellence, and excellence is expected — not as pressure, but as a shared commitment to craft.",
  },
  {
    title: "Transparent by default",
    description: "Strategy, metrics, decisions, and mistakes are shared openly. Transparency is not a policy — it is how intelligent organizations operate.",
  },
];

const futureRoles = [
  {
    title: "VP of Engineering",
    description: "Lead the engineering organization, set technical standards, and build the team that ships the SP NET ecosystem.",
    icon: Code2,
    status: "Planned",
  },
  {
    title: "Head of Product",
    description: "Own the product strategy and roadmap, translating vision into features that delight users and drive growth.",
    icon: Compass,
    status: "Planned",
  },
  {
    title: "Head of Community",
    description: "Build and nurture the SP NET community, turning users into advocates and feedback into product improvements.",
    icon: Users,
    status: "Planned",
  },
  {
    title: "Head of Design",
    description: "Set the design standard across all SP NET products, ensuring every interaction is intentional and every interface is beautiful.",
    icon: Sparkles,
    status: "Planned",
  },
];

const stats = [
  { value: "1", label: "Founder", icon: Crown },
  { value: "2022", label: "Founded", icon: Globe },
  { value: "4", label: "Future Leaders Planned", icon: Target },
  { value: "100%", label: "Founder-Led", icon: TrendingUp },
];

const faqItems = [
  {
    question: "Who leads SP NET INC?",
    answer: "SP NET INC is led by Savan Patel, Founder and Product Engineer. He is a self-taught software engineer from India who began coding in 2018 and founded the company in 2022. He owns all product strategy, engineering, design, and operations as a founder-led organization.",
  },
  {
    question: "What is Savan Patel's leadership philosophy?",
    answer: "Savan's leadership philosophy is built on four principles: lead by building (demonstrate through action, not just direction), clarity over consensus (decisive direction beats slow agreement), people are the product (great teams build great products), and culture is intentional (every decision either strengthens or weakens culture).",
  },
  {
    question: "How is SP NET INC managed?",
    answer: "SP NET INC operates with an async-first, high-trust management style. Communication is written and documented, ownership is radical and end-to-end, standards are high but expectations are clear, and transparency is the default. This approach enables speed, depth, and consistency in a founder-led organization.",
  },
  {
    question: "Will SP NET INC hire leadership roles?",
    answer: "Yes. As the company scales, leadership will expand organically. Planned roles include VP of Engineering, Head of Product, Head of Community, and Head of Design. The approach is senior-first — hiring exceptional leaders who set the standard and mentor the next generation of team members.",
  },
  {
    question: "Will SP NET INC remain founder-led?",
    answer: "For the foreseeable future, yes. The founder-led approach ensures speed, consistency, and alignment with the long-term vision. As the company grows, leadership will expand to include exceptional people — but the founder will remain deeply involved in product vision, engineering culture, and strategic direction.",
  },
  {
    question: "How can I contact SP NET INC?",
    answer: "The recommended first point of contact is PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT. For specific needs, you can also email the appropriate department: hello@sp-net.in (general), business@sp-net.in (business), contact@sp-net.in (inquiries), media@sp-net.in (media), security@sp-net.in (security), or careers@sp-net.in (careers). You can also schedule a meeting at cal.com/savanpatel.",
  },
];

export default function ClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Company", href: "/company" },
          { label: "Leadership" },
        ]}
        label="Company"
        title="Leadership"
        titleAccent="Guiding the vision forward"
        description="The leadership, philosophy, and management approach driving SP NET INC toward its vision."
        icon={<Crown className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                One founder,
                <br />
                <span className="text-white/40">one vision</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  SP NET INC is a founder-led technology company. Savan Patel serves as
                  Founder and Product Engineer — owning product strategy, engineering,
                  design, and operations. This is not a limitation. It is a deliberate
                  choice that ensures speed, consistency, and deep alignment with the
                  company&apos;s long-term vision.
                </p>
                <p>
                  In the early stages, a single visionary founder can make decisions in
                  minutes that would take a committee days. The result is faster iteration,
                  stronger product coherence, and a culture that is built from day one
                  rather than retrofitted later.
                </p>
                <p>
                  As SP NET INC scales, leadership will expand — but it will always be
                  rooted in the same principles: lead by building, prioritize clarity, invest
                  in people, and protect the culture.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Founder"
            title="Savan Patel"
            subtitle="Founder & Product Engineer — the person building SP NET INC from the ground up."
          />

          <FadeIn delay={0.05}>
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-lg font-semibold text-white/50 shrink-0">
                    {personal.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white/70">{personal.name}</h3>
                    <p className="text-sm text-white/35">Founder & Product Engineer</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                      <span className="text-xs text-white/25">{personal.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-white/35 leading-relaxed mb-6">
                  Self-taught software engineer who began coding in 2018. Built deep
                  expertise across full-stack development, artificial intelligence, cloud
                  infrastructure, and cybersecurity. Founded SP NET INC in 2022 to build
                  infrastructure for modern communication, enterprise administration, and
                  intelligent automation.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["Founder", "Engineer", "Builder", "Visionary"].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/30"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/[0.04]">
                  <p className="text-xs text-white/20 mb-3">Connect</p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/founder/about"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/35 hover:text-white/50 hover:border-white/[0.10] transition-all duration-200"
                    >
                      About
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href={personal.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/35 hover:text-white/50 hover:border-white/[0.10] transition-all duration-200"
                    >
                      GitHub
                      <ArrowRight className="h-3 w-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/35 hover:text-white/50 hover:border-white/[0.10] transition-all duration-200"
                    >
                      LinkedIn
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/35 hover:text-white/50 hover:border-white/[0.10] transition-all duration-200"
                    >
                      X
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Leadership Philosophy"
            title="How we lead"
            subtitle="Four principles that define the leadership approach at SP NET INC."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {leadershipPrinciples.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <principle.icon className="h-4 w-4 text-white/25" />
                    <h3 className="text-base font-medium text-white/70">{principle.title}</h3>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Management Style"
            title="How we operate day to day"
            subtitle="The operational principles that keep SP NET INC fast, focused, and effective."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.06}>
            {managementStyle.map((item) => (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <h3 className="text-sm font-medium text-white/70 mb-2">{item.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Future Leadership"
            title="Building the leadership team"
            subtitle="As SP NET INC scales, exceptional leaders will join to own key functions and elevate the organization."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerDelay={0.08}>
            {futureRoles.map((role) => (
              <StaggerItem key={role.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <role.icon className="h-4 w-4 text-white/40" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/30">
                      {role.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">{role.title}</h3>
                  <p className="text-xs text-white/30 leading-relaxed">{role.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Organizational Growth"
            title="How we scale leadership"
            subtitle="The transition from founder-led to a world-class leadership team — intentional, deliberate, and culture-first."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Scaling leadership is not about adding management layers — it is about
                finding exceptional people who share the values and elevating them into
                roles where they can multiply the team&apos;s capability. Every leadership
                hire must make the organization fundamentally better, not just bigger.
              </p>
              <p>
                The approach is senior-first. The first hires in each department will be
                senior leaders who set the standard, define the processes, and mentor the
                next generation. This ensures the culture is carried forward, not diluted,
                as the company grows.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 space-y-4">
              {[
                {
                  phase: "Phase 1",
                  title: "Founder-Led",
                  description: "All functions owned by the founder. Speed, consistency, and deep product coherence.",
                  status: "Current",
                },
                {
                  phase: "Phase 2",
                  title: "Senior Hires",
                  description: "First department leads join — VP of Engineering, Head of Product, Head of Community.",
                  status: "Upcoming",
                },
                {
                  phase: "Phase 3",
                  title: "Full Leadership Team",
                  description: "Every department led by an exceptional leader. The founder shifts to vision and strategy.",
                  status: "Future",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.phase}
                  className="relative pl-6 border-l border-white/[0.06]"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: FAST, delay: i * 0.08, ease: ease.out }}
                >
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-500/50 -translate-x-[5px]" />
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-medium text-white/60">{item.title}</h3>
                    <span className="text-[10px] font-mono text-white/20 border border-white/[0.06] rounded-full px-2 py-0.5">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="By the Numbers"
            title="Leadership at a glance"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-white/60 mb-1">{stat.value}</p>
                  <p className="text-[11px] text-white/25">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <FAQ title="Leadership" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "About SP NET INC",
            description: "The company behind the SP NET ecosystem and its products.",
            href: "/company/about",
          },
          {
            title: "Mission & Vision",
            description: "The purpose and direction driving every product at SP NET INC.",
            href: "/company/mission",
          },
          {
            title: "About Savan Patel",
            description: "The founder and product engineer building SP NET INC.",
            href: "/founder/about",
          },
          {
            title: "Careers",
            description: "Join SP NET INC and help build the future of technology.",
            href: "/company/careers",
          },
          {
            title: "Mission & Values",
            description: "The purpose and direction driving every product at SP NET INC.",
            href: "/company/mission",
          },
        ]}
      />

      <CTASection
        title="Guided by"
        titleAccent="conviction and craft"
        description="Whether you want to join the team, partner with us, or learn more about the leadership behind SP NET INC — we would love to hear from you."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View careers", href: "/company/careers" }}
      />
    </>
  );
}
