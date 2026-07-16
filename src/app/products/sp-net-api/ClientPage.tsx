"use client";

import { motion } from "framer-motion";
import {
  Code,
  Key,
  Gauge,
  CreditCard,
  Package,
  Webhook,
  LayoutDashboard,
  Shield,
  Zap,
  Globe,
  BookOpen,
  Terminal,
} from "lucide-react";
import { ease, spring, NORMAL } from "@/lib/motion";
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
    icon: Key,
    title: "Authentication & Authorization",
    description:
      "A complete auth platform with OAuth 2.0, API keys, session management, and multi-factor authentication. Secure your apps without building auth from scratch.",
  },
  {
    icon: Gauge,
    title: "Rate Limiting & Quotas",
    description:
      "Configurable rate limiting with token buckets, sliding windows, and per-endpoint quotas. Protect your infrastructure while giving developers predictable usage limits.",
  },
  {
    icon: CreditCard,
    title: "Billing & Usage Metering",
    description:
      "Usage-based billing with real-time metering, tiered pricing, invoicing, and payment processing. Developers pay for what they use with transparent pricing.",
  },
  {
    icon: Package,
    title: "SDKs & Client Libraries",
    description:
      "Official SDKs for JavaScript, Python, Go, Rust, and Swift. Type-safe, well-documented, and designed to make integration take minutes instead of hours.",
  },
  {
    icon: Webhook,
    title: "Webhooks & Events",
    description:
      "A reliable event delivery system with webhook registration, retry logic, signature verification, and event filtering. React to platform events in real time.",
  },
  {
    icon: LayoutDashboard,
    title: "Developer Dashboard",
    description:
      "A unified dashboard for API keys, usage analytics, billing, documentation, and support. Everything developers need in one place.",
  },
];

const architecture = [
  {
    icon: Shield,
    title: "Security First",
    description: "Every API request is authenticated, authorized, and encrypted. Built-in protections against injection, abuse, and unauthorized access.",
  },
  {
    icon: Zap,
    title: "Low Latency",
    description: "Global edge network ensures sub-50ms response times. Smart routing, connection pooling, and response caching keep APIs fast.",
  },
  {
    icon: Globe,
    title: "Versioned & Stable",
    description: "Semantic versioning with backward compatibility guarantees. Deprecation notices give developers time to migrate before changes take effect.",
  },
  {
    icon: Terminal,
    title: "Developer Experience",
    description: "Interactive API explorer, auto-generated documentation, code samples, and a CLI for managing resources directly from the terminal.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Docs",
    description: "Every endpoint, parameter, and response type is documented with examples. Interactive playgrounds let developers test calls before writing code.",
  },
];

const faqItems = [
  {
    question: "What is SP NET API?",
    answer: "SP NET API is a unified developer platform that provides authentication, rate limiting, billing, SDKs, and tooling for building on the SP NET ecosystem. It is the backbone that enables third-party developers and internal teams to build integrations, apps, and services on top of SP NET products.",
  },
  {
    question: "Who is SP NET API for?",
    answer: "SP NET API is designed for developers building on the SP NET platform — whether that is creating integrations with SP NET GRAM, extending SP NET ADMIN OS, or building entirely new applications that leverage SP NET infrastructure and services.",
  },
  {
    question: "What programming languages are supported?",
    answer: "Official SDKs will be available for JavaScript/TypeScript, Python, Go, Rust, and Swift. Community SDKs are welcome and will be supported through our developer program. All APIs work with any HTTP client regardless of language.",
  },
  {
    question: "How does billing work?",
    answer: "SP NET API uses usage-based billing. You pay for what you use — API calls, data transfer, and storage. A generous free tier covers most development and small-scale usage. Tiered pricing provides volume discounts for larger applications.",
  },
  {
    question: "Is SP NET API available now?",
    answer: "SP NET API is currently a future initiative. We are designing the API surface, authentication system, and developer experience. Join the waitlist to get early access when we launch our developer preview.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer: "For any inquiries about SP NET API, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET GRAM",
    description: "Messaging platform with a powerful developer API.",
    href: "/products/sp-net-gram",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration with API-driven workflows.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET AI",
    description: "AI capabilities accessible through the API layer.",
    href: "/products/sp-net-ai",
  },
  {
    title: "SP NET Cloud",
    description: "Cloud infrastructure powering the API platform.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform all APIs integrate with.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetApiClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET API" }]}
        label="Platform"
        badge="Coming Soon"
        title="SP NET API"
        titleAccent="Developer infrastructure at scale"
        description="A unified API platform providing authentication, rate limiting, billing, SDKs, and developer tools for building on the SP NET ecosystem."
        icon={<Code className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="The backbone for building on SP NET"
            subtitle="SP NET API provides the infrastructure every developer needs — authentication, rate limiting, billing, and tooling — so you can focus on building great experiences instead of plumbing."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Building on a platform requires more than just endpoints. Developers need reliable
                authentication, predictable rate limits, transparent billing, and tools that make
                integration fast and pleasant. SP NET API provides all of that as a unified layer.
              </p>
              <p>
                Every SP NET product — GRAM, ADMIN OS, WORKPLACE, and future platforms — exposes
                its capabilities through SP NET API. This means a single authentication flow, a
                consistent rate limiting model, and one dashboard for managing all your API access
                across the entire ecosystem.
              </p>
              <p>
                The platform is designed with developer experience as a first-class concern. Official
                SDKs, interactive documentation, auto-generated types, and a CLI mean you can go
                from zero to a working integration in minutes, not days.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="Everything developers need"
          subtitle="Six core capabilities that cover the full developer lifecycle — from authentication to billing."
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/8 text-cyan-400 border border-cyan-500/10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">{feature.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Architecture"
          title="Built for developers, by developers"
          subtitle="The design principles that make SPNET API reliable, fast, and pleasant to use."
        />

        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {architecture.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-white/20 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Ready to build on SP NET?"
        description="SP NET API is being built to give developers the best possible experience. Join the waitlist to get early access."
        primaryAction={{ label: "Join the Waitlist", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
