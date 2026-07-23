"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Shield,
  Users,
  BarChart3,
  Coins,
  Building2,
  Lock,
  ChevronRight,
} from "lucide-react";
import { ease, spring, FAST } from "@/lib/motion";
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

const features = [
  {
    icon: Building2,
    title: "Organization Management",
    description:
      "Create and manage organizations with departments, teams, and hierarchies. Each organization gets its own workspace, settings, and configurable policies.",
  },
  {
    icon: Shield,
    title: "Permissions & Audit Logs",
    description:
      "Granular role-based access control with custom roles, permission sets, and comprehensive audit logging. Know exactly who did what and when.",
  },
  {
    icon: Coins,
    title: "Coins & Gems Economy",
    description:
      "A built-in virtual economy system for rewarding engagement, managing premium currency, processing transactions, and tracking balances across your platform.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Live dashboards with user growth, engagement metrics, revenue tracking, and custom reports. Filter by time range, department, or custom dimensions.",
  },
  {
    icon: Shield,
    title: "Moderation & Safety",
    description:
      "Automated content moderation, user reporting, trust & safety scoring, and escalation workflows. Keep your community safe without manual review bottlenecks.",
  },
  {
    icon: Users,
    title: "Team & Member Management",
    description:
      "Invite team members, assign roles, manage departments, and track activity. Bulk operations, CSV import, and API access for large-scale administration.",
  },
];

const modules = [
  {
    icon: Building2,
    title: "Organizations",
    items: [
      "Multi-tenant organization structure",
      "Department and team hierarchies",
      "Custom branding per organization",
      "Configurable policies and defaults",
      "Billing and subscription management",
    ],
  },
  {
    icon: Lock,
    title: "Permissions",
    items: [
      "Role-based access control (RBAC)",
      "Custom roles with granular permissions",
      "Resource-level access policies",
      "API key management and scoping",
      "Session management and revocation",
    ],
  },
  {
    icon: Coins,
    title: "Economy",
    items: [
      "Virtual coins and gems currency",
      "Transaction history and ledger",
      "Payout and redemption system",
      "Rate limiting and fraud detection",
      "Leaderboards and reward tiers",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics",
    items: [
      "Real-time usage dashboards",
      "User acquisition and retention funnels",
      "Revenue and transaction analytics",
      "Custom report builder",
      "Scheduled report exports",
    ],
  },
  {
    icon: Shield,
    title: "Moderation",
    items: [
      "Automated content classification",
      "User trust scoring system",
      "Escalation and review queues",
      "Ban, mute, and restriction tools",
      "Appeal and resolution workflows",
    ],
  },
];

const faqItems = [
  {
    question: "What is SP NET ADMIN OS and who is it for?",
    answer:
      "SP NET ADMIN OS is a complete enterprise administration platform designed for organizations that need comprehensive control over their digital infrastructure. It serves platform operators, community managers, and enterprise teams who need to manage users, permissions, economies, analytics, and moderation at scale — all from a single unified dashboard.",
  },
  {
    question: "How does the coins & gems economy system work?",
    answer:
      "The economy module provides a full virtual currency system. Coins serve as the base currency for transactions, while gems act as a premium tier. You can configure earning rules (sign-ups, referrals, achievements), spending mechanisms (purchases, upgrades, donations), and withdrawal or redemption policies. The system includes built-in fraud detection, rate limiting, and a complete transaction ledger for auditing.",
  },
  {
    question: "Can SP NET ADMIN OS handle multiple organizations?",
    answer:
      "Yes. SP NET ADMIN OS is built multi-tenant from the ground up. Each organization operates in its own isolated workspace with independent settings, members, departments, and policies. Platform administrators can manage all organizations from a central dashboard, while organization admins only see and control their own workspace.",
  },
  {
    question: "What kind of analytics and reporting are available?",
    answer:
      "The analytics module provides real-time dashboards covering user growth, engagement metrics, revenue tracking, and system health. You can filter by time range, department, user segment, or custom dimensions. Pre-built reports cover common use cases, and a custom report builder lets you create exactly the views you need. Reports can be exported as CSV or scheduled for automatic delivery.",
  },
  {
    question: "How does the moderation system prevent abuse?",
    answer:
      "SP NET ADMIN OS combines automated and human moderation. Automated systems use content classification, behavioral analysis, and trust scoring to flag or action suspicious activity in real time. Escalation workflows route complex cases to human moderators with full context. Ban, mute, and restriction tools give moderators precise control, and an appeal process ensures fair outcomes for users.",
  },
  {
    question: "When will SP NET ADMIN OS be available?",
    answer:
      "SP NET ADMIN OS is currently in active development. We are building out the core administration modules — organizations, permissions, economy, analytics, and moderation. Join the waitlist to get early access when we launch our beta program.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer:
      "For any inquiries about SP NET ADMIN OS, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET GRAM",
    description: "Next-generation messaging with privacy and premium experiences.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET AI",
    description: "Intelligent automation and AI-powered tools across the platform.",
    href: "/products/sp-net-ai",
  },
  {
    title: "SP NET SECURITY",
    description: "Threat detection, compliance, and security monitoring.",
    href: "/products/sp-net-security",
  },
  {
    title: "SP NET WORKPLACE",
    description: "Digital workspace with project management and collaboration.",
    href: "/products/sp-net-workplace",
  },
  {
    title: "SP NET Ecosystem",
    description: "The interconnected platform powering all SP NET products.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetAdminOSClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET ADMIN OS" }]}
        label="Enterprise Platform"
        badge="Building"
        title="SP NET ADMIN OS"
        titleAccent="Enterprise administration, redesigned"
        description="A complete enterprise administration platform featuring licensing, premium management, coins & gems economy, organizations, team members, departments, permissions, audit logs, analytics, moderation, security, and administration dashboard."
        icon={<LayoutDashboard className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="One platform to manage everything"
            subtitle="SP NET ADMIN OS brings together every aspect of enterprise administration — organizations, permissions, economies, analytics, and moderation — into a single, cohesive platform built for scale."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Enterprise administration is typically fragmented across dozens of disconnected tools.
                One system for user management, another for permissions, a third for analytics, and yet
                another for moderation. Each tool has its own interface, its own API, its own learning
                curve. SP NET ADMIN OS eliminates that fragmentation.
              </p>
              <p>
                Every module — from organization management to the virtual economy to real-time analytics
                — is designed as an integrated component of a unified system. Permissions cascade naturally
                across hierarchies. Analytics reflect the full picture across all modules. Moderation
                actions propagate instantly across the platform. Everything connects because everything
                was built together.
              </p>
              <p>
                The platform is engineered for organizations that operate at serious scale. Whether you
                are managing a community of thousands, running a marketplace with complex transaction
                flows, or administering an enterprise with strict compliance requirements, SP NET ADMIN
                OS provides the control, visibility, and automation you need.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="Built for serious administration"
          subtitle="Six core capabilities that cover the full spectrum of enterprise administration — each one designed to work seamlessly with the others."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/8 text-purple-400 border border-purple-500/10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Core Modules"
          title="Five systems, one platform"
          subtitle="Each module is a complete system on its own — and they all work together."
        />

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {modules.map((mod, i) => (
              <motion.div
                key={mod.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                    <mod.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">
                    {mod.title}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {mod.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-white/25 leading-relaxed"
                    >
                      <ChevronRight className="h-3 w-3 shrink-0 text-white/15 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Architecture"
          title="Designed for enterprise scale"
          subtitle="The technical foundation that makes comprehensive administration possible."
        />

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white/50 mb-4">
                Multi-Tenant Architecture
              </h3>
              <div className="space-y-3 text-xs text-white/25 leading-relaxed">
                <p>
                  SP NET ADMIN OS is built on a multi-tenant architecture where each organization
                  operates in an isolated workspace. Data separation is enforced at the database level,
                  not just the application layer, ensuring that no organization can ever access another
                  organization&apos;s data — even through API misconfigurations.
                </p>
                <p>
                  Permission evaluation happens through a policy engine that supports RBAC, ABAC, and
                  resource-level scoping. Policies are compiled at deployment time and evaluated in
                  microseconds, so permission checks never become a bottleneck even at millions of
                  requests per second.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8">
              <h3 className="text-sm font-medium text-white/50 mb-4">
                Real-Time Data Pipeline
              </h3>
              <div className="space-y-3 text-xs text-white/25 leading-relaxed">
                <p>
                  Analytics and moderation run on an event-driven data pipeline. Every action in the
                  system — from a permission change to a transaction to a content flag — generates a
                  structured event that flows through the pipeline in real time.
                </p>
                <p>
                  This architecture means analytics dashboards update live, moderation triggers fire
                  instantly, and audit logs are populated without any batch processing delays. The
                  pipeline handles backpressure automatically and guarantees at-least-once delivery,
                  so no event is ever lost.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
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
        title="Ready to unify your administration?"
        description="SP NET ADMIN OS brings every piece of enterprise administration into one place. Get started with the platform that scales with your organization."
        primaryAction={{ label: "Get Started", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
