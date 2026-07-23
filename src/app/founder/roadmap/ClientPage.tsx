"use client";

import {
  Map,
  Rocket,
  Target,
  GitBranch,
  Users,
  Calendar,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { Timeline, TimelineItem, TimelineNodeStatus } from "@/components/timeline";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const products = [
  {
    id: "sp-net-gram",
    name: "SP NET GRAM",
    tagline: "Messaging reimagined",
    color: "#3b82f6",
    status: "In development",
    milestones: [
      {
        quarter: "Q1 2026",
        title: "Core messaging infrastructure",
        done: true,
      },
      {
        quarter: "Q2 2026",
        title: "End-to-end encryption and channels",
        done: false,
        active: true,
      },
      {
        quarter: "Q3 2026",
        title: "Premium features and integrations",
        done: false,
      },
      {
        quarter: "Q4 2026",
        title: "Public beta launch",
        done: false,
      },
    ],
  },
  {
    id: "sp-net-admin-os",
    name: "SP NET ADMIN OS",
    tagline: "Enterprise administration",
    color: "#8b5cf6",
    status: "In development",
    milestones: [
      {
        quarter: "Q1 2026",
        title: "Organization management and roles",
        done: true,
      },
      {
        quarter: "Q2 2026",
        title: "Audit logs and compliance tooling",
        done: false,
        active: true,
      },
      {
        quarter: "Q3 2026",
        title: "API platform and webhooks",
        done: false,
      },
      {
        quarter: "Q4 2026",
        title: "Enterprise onboarding flows",
        done: false,
      },
    ],
  },
  {
    id: "sp-net-ai",
    name: "SP NET AI",
    tagline: "Intelligence for the ecosystem",
    color: "#10b981",
    status: "Research phase",
    milestones: [
      {
        quarter: "Q2 2026",
        title: "Research and model evaluation",
        done: false,
        active: true,
      },
      {
        quarter: "Q3 2026",
        title: "Internal AI features (search, suggestions)",
        done: false,
      },
      {
        quarter: "Q4 2026",
        title: "Developer API for AI capabilities",
        done: false,
      },
      {
        quarter: "Q1 2027",
        title: "Public AI platform",
        done: false,
      },
    ],
  },
];

const shortTermGoals = [
  {
    quarter: "Q2 2026",
    items: [
      "Ship SP NET GRAM core messaging with real-time sync",
      "Launch SP NET ADMIN OS audit logging and compliance module",
      "Begin AI research with focus on on-device inference",
      "Continue internal development of shared infrastructure for future open source release",
    ],
  },
  {
    quarter: "Q3 2026",
    items: [
      "SP NET GRAM end-to-end encryption and team channels",
      "SP NET ADMIN OS API platform for third-party integrations",
      "Internal AI features for search and content suggestions",
      "Community contributor program launch",
    ],
  },
  {
    quarter: "Q4 2026",
    items: [
      "SP NET GRAM public beta with premium tier",
      "SP NET ADMIN OS enterprise onboarding and SSO support",
      "AI developer API for ecosystem partners",
      "Full documentation site and developer portal",
    ],
  },
];

const faqItems = [
  {
    question: "When will SP NET GRAM be available to the public?",
    answer:
      "SP NET GRAM is on track for a public beta in Q4 2026. The core messaging infrastructure is built and we are currently focusing on encryption, channels, and the premium experience. We are prioritizing getting the fundamentals right before opening it to everyone.",
  },
  {
    question: "Why is the AI product on a slower timeline?",
    answer:
      "AI is a space where rushing leads to poor outcomes. We are taking a deliberate approach: evaluate models, understand the unique problems in our ecosystem, and build features that are genuinely useful rather than generically impressive. The research phase ensures we are solving real problems with AI, not just adding a chatbot to everything.",
  },
  {
    question: "Will SP NET ADMIN OS support third-party integrations?",
    answer:
      "Yes. The API platform is planned for Q3 2026, and we are designing it from the ground up to be extensible. Webhooks, a REST API, and eventually a plugin system are all on the roadmap. Enterprise administration tools need to work with existing systems, not replace them.",
  },
  {
    question: "How do you decide what to build next?",
    answer:
      "We prioritize based on three criteria: user impact (how many people benefit), strategic alignment (does it advance the ecosystem), and technical dependency (does it unblock other work). We also consider what can ship fastest with the highest confidence, so we maintain momentum while building toward bigger goals.",
  },
  {
    question: "Is this roadmap fixed or does it change?",
    answer:
      "It is a living document. We review and adjust quarterly based on what we have learned, what users are telling us, and what opportunities emerge. The vision stays stable — building infrastructure for modern communication and enterprise tools — but the specific milestones and timelines adapt as we learn more.",
  },
];

const relatedPages = [
  {
    title: "Engineering Philosophy",
    description: "The principles that guide every decision at SP NET INC.",
    href: "/founder/philosophy",
  },
  {
    title: "About Savan Patel",
    description: "Background, experience, and the person behind SP NET INC.",
    href: "/founder/about",
  },
  {
    title: "Journey",
    description: "From the first line of code to founding a company.",
    href: "/founder/journey",
  },
  {
    title: "SP NET GRAM",
    description: "Messaging reimagined for modern teams.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration built for the modern web.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET AI",
    description: "Intelligence powering the SP NET ecosystem.",
    href: "/products/sp-net-ai",
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Founder", href: "/founder" },
          { label: "Roadmap" },
        ]}
        label="Roadmap"
        title="Roadmap"
        titleAccent="What's next for SP NET INC"
        description="A transparent look at where we are, what we are building, and where the ecosystem is heading. Updated quarterly."
        icon={<Map className="h-4 w-4" />}
        badge="Last updated July 2026"
      />

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Vision"
            title="Where we are heading"
            subtitle="SP NET INC is building a unified ecosystem of products for communication and enterprise administration. The long-term vision is a platform where every tool feels connected, intuitive, and privacy-respecting."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-6 text-white/30 text-base leading-relaxed">
              <p>
                The world of software is fragmented. Teams use one tool for messaging, another for
                project management, another for administration, and yet another for analytics. Each
                tool comes with its own context, its own learning curve, and its own security
                surface. We believe this fragmentation is unnecessary.
              </p>
              <p>
                Our goal is not to build a Swiss Army knife — a single tool that does everything
                poorly. It is to build an ecosystem where each product excels at its core purpose
                while sharing a common foundation of design, security, and intelligence. When you use
                SP NET products, every interaction should feel like part of a cohesive whole.
              </p>
              <p>
                This roadmap reflects our current thinking. It is honest about what we know and
                transparent about what we do not. As we learn more from users and from building, the
                specifics will evolve. The direction will not.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="Right Now"
            title="Current focus"
            subtitle="These are the priorities driving development in the current quarter. Everything else is secondary."
          />

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Rocket className="h-5 w-5 text-blue-400/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/70">
                      SP NET GRAM
                    </h3>
                    <span className="text-[10px] font-mono text-blue-400/40 uppercase tracking-wider">
                      Active development
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white/30 leading-relaxed mb-4">
                  Building the core real-time messaging engine, encryption layer, and channel
                  architecture. The foundation that everything else in GRAM depends on. Priority is
                  getting the fundamentals rock-solid before adding features.
                </p>
                <div className="flex items-center gap-2 text-xs text-white/20">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Estimated completion: Q2 2026</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20">
                    <Target className="h-5 w-5 text-violet-400/60" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/70">
                      SP NET ADMIN OS
                    </h3>
                    <span className="text-[10px] font-mono text-violet-400/40 uppercase tracking-wider">
                      Active development
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white/30 leading-relaxed mb-4">
                  Implementing audit logging, compliance tracking, and role-based access control.
                  These are the features enterprise teams cannot live without, and they need to work
                  flawlessly from day one.
                </p>
                <div className="flex items-center gap-2 text-xs text-white/20">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Estimated completion: Q2 2026</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            label="Product Timelines"
            title="Product roadmap"
            subtitle="Detailed milestones for each product in the SP NET ecosystem. Milestones are reviewed and updated quarterly."
          />

          <div className="space-y-16">
            {products.map((product, productIdx) => (
              <FadeIn key={product.id} delay={productIdx * 0.1}>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: product.color + "40" }}
                      />
                      <h3 className="text-lg font-semibold text-white/70">
                        {product.name}
                      </h3>
                    </div>
                    <span className="text-xs text-white/25 border border-white/[0.06] rounded-full px-2.5 py-0.5 shrink-0">
                      {product.status}
                    </span>
                  </div>

                  <Timeline layout="left">
                    {product.milestones.map((milestone, i) => {
                      const nodeStatus: TimelineNodeStatus = milestone.done
                        ? "done"
                        : milestone.active
                        ? "active"
                        : "inactive";
                      return (
                        <TimelineItem
                          key={i}
                          index={i}
                          total={product.milestones.length}
                          isLast={i === product.milestones.length - 1}
                          layout="left"
                          status={nodeStatus}
                          accentColor={product.color}
                        >
                          <div className="pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">
                                {milestone.quarter}
                              </span>
                              {milestone.active && (
                                <span
                                  className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                  style={{
                                    color: product.color + "80",
                                    backgroundColor: product.color + "10",
                                  }}
                                >
                                  In progress
                                </span>
                              )}
                            </div>
                            <p
                              className={cn(
                                "text-sm",
                                milestone.done
                                  ? "text-white/25"
                                  : milestone.active
                                  ? "text-white/60"
                                  : "text-white/35"
                              )}
                            >
                              {milestone.title}
                            </p>
                          </div>
                        </TimelineItem>
                      );
                    })}
                  </Timeline>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="2026 Goals"
            title="Short-term goals"
            subtitle="Concrete, measurable outcomes we are targeting by the end of 2026."
          />

          <StaggerFade className="space-y-8">
            {shortTermGoals.map((goal, _goalIdx) => (
              <StaggerItem key={goal.quarter}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Calendar className="h-4 w-4 text-white/25" />
                    <h3 className="text-sm font-medium text-white/60">
                      {goal.quarter}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {goal.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-white/15 flex-shrink-0" />
                        <span className="text-sm text-white/30 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Long Term"
            title="Long-term vision"
            subtitle="Where SP NET INC is headed over the next 3-5 years. These are directional goals, not commitments."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-10">
              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-blue-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  A unified communication platform
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  SP NET GRAM evolves beyond messaging into a complete communication hub. Real-time
                  messaging, voice, video, file sharing, and workflow automation — all in one
                  cohesive experience with end-to-end encryption and zero compromise on privacy. The
                  goal is to make switching between communication tools feel as outdated as switching
                  between word processors.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-violet-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  Enterprise tools that actually work
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  SP NET ADMIN OS becomes the default administration layer for modern organizations.
                  Not just another dashboard — a system that learns from how organizations actually
                  operate and adapts to their needs. Automated compliance, intelligent resource
                  allocation, and proactive security monitoring built into the foundation.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  AI that amplifies, not replaces
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  SP NET AI powers intelligent features across the ecosystem — smart search that
                  understands context, automated summaries that save time, predictive suggestions
                  that anticipate needs. The focus is on amplifying human capability, not generating
                  noise. Every AI feature must be explainable, controllable, and genuinely useful.
                </p>
              </div>

              <div className="relative pl-6 border-l border-white/[0.06]">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-amber-500/50 -translate-x-[5px]" />
                <h3 className="text-base font-medium text-white/60 mb-2">
                  A thriving open source ecosystem
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  The shared infrastructure — design system, component libraries, utility packages —
                  becomes a well-maintained open source foundation that other teams adopt and
                  contribute to. A community of developers building on top of SP NET primitives,
                  creating an ecosystem that extends beyond what we could build alone.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-white/[0.01]">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            label="Open Source"
            title="Open source plans"
            subtitle="How we plan to contribute to and benefit from the open source community."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-6 text-white/30 text-base leading-relaxed">
              <p>
                Open source is not a marketing strategy — it is how we build. The design system,
                component primitives, and utility libraries that power SP NET products will continue
                to be released as standalone, well-documented packages. Our goal is for these tools
                to be genuinely useful outside of SP NET, not just open-source-washed internal code.
              </p>
              <p>
                In the second half of 2026, we are launching a contributor program that makes it easy
                for developers to get involved. Clear good-first-issue labels, a welcoming community
                Discord, and mentorship for first-time contributors. Great open source projects are
                built by communities, not just by companies.
              </p>
              <p>
                We are also committing to publishing technical blog posts and architecture decision
                records (ADRs) for major design choices. Understanding why a system was built a
                certain way is often more valuable than the code itself. These documents will be
                public and maintained alongside the code.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <GitBranch className="h-5 w-5 text-white/30 mb-3" />
                <h3 className="text-sm font-medium text-white/60 mb-2">
                  Shared libraries
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  Design tokens, UI primitives, animation utilities, and helper functions. The
                  building blocks that make SP NET products consistent and maintainable.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                <Users className="h-5 w-5 text-white/30 mb-3" />
                <h3 className="text-sm font-medium text-white/60 mb-2">
                  Contributor program
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  Structured onboarding, mentorship, and recognition for open source contributors.
                  Making it easy for anyone to get involved and feel valued.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <FAQ
        title="Frequently Asked Questions"
        items={faqItems}
      />

      <RelatedPages
        title="Explore More"
        pages={relatedPages}
      />

      <CTASection
        title="Want to influence the roadmap?"
        titleAccent="Your feedback shapes what I build next."
        description="If you have ideas, feature requests, or just want to share how you would use SP NET products — I am listening."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "Read my philosophy", href: "/founder/philosophy" }}
      />
    </>
  );
}
