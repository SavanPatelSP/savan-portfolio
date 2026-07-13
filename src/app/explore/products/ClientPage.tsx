"use client";

import { motion } from "framer-motion";
import {
  Package,
  MessageCircle,
  Shield,
  BrainCircuit,
  Puzzle,
  ArrowUpRight,
  Globe,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
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

const products = [
  {
    icon: MessageCircle,
    name: "SP NET GRAM",
    tagline: "Next-generation messaging",
    color: "#3b82f6",
    description:
      "I started GRAM because every messaging app I tried either compromised on privacy or buried the features I actually needed. I wanted something secure, fast, and genuinely pleasant to use — so I built it.",
    features: [
      "End-to-end encryption",
      "Communities & groups",
      "Cloud sync",
      "Developer API",
      "Cross-platform",
    ],
    href: "/products/sp-net-gram",
    status: "Building",
  },
  {
    icon: Shield,
    name: "SP NET ADMIN OS",
    tagline: "Enterprise administration",
    color: "#8b5cf6",
    description:
      "ADMIN OS came from watching teams struggle with clunky, outdated admin dashboards. I wanted to build something that felt modern and actually made managing users, analytics, and workflows enjoyable.",
    features: [
      "User management",
      "Analytics dashboards",
      "Role-based access",
      "Audit logging",
      "Workflow automation",
    ],
    href: "/products/sp-net-admin-os",
    status: "Building",
  },
  {
    icon: BrainCircuit,
    name: "SP NET AI",
    tagline: "Intelligence layer",
    color: "#10b981",
    description:
      "AI is the connective tissue across everything I build. SP NET AI is my attempt to make intelligence a first-class feature — not a bolt-on — so every product gets smarter the moment it plugs in.",
    features: [
      "Natural language processing",
      "Smart automation",
      "Content generation",
      "Predictive analytics",
      "Custom model training",
    ],
    href: "/products/sp-net-ai",
    status: "Building",
  },
  {
    icon: Puzzle,
    name: "SP NET Ecosystem",
    tagline: "Connected platform",
    color: "#f59e0b",
    description:
      "The Ecosystem is the long game. I want one account, one data layer, one API surface — so every SP NET product feels like a seamless part of something bigger, not a siloed tool.",
    features: [
      "Single sign-on",
      "Shared data layer",
      "Cross-product APIs",
      "Unified dashboard",
      "Plugin system",
    ],
    href: "/products/sp-net-ecosystem",
    status: "Planning",
  },
];

const upcomingProducts = [
  {
    icon: Globe,
    title: "SP NET Cloud",
    description: "Cloud storage and computing integrated across the ecosystem.",
    timeline: "2027",
  },
  {
    icon: Users,
    title: "SP NET Teams",
    description: "Real-time collaboration tools for distributed teams.",
    timeline: "2027",
  },
  {
    icon: Zap,
    title: "SP NET Automate",
    description: "No-code automation connecting all SP NET products and third-party services.",
    timeline: "2028",
  },
];

const faqItems = [
  {
    question: "Why are you building so many products?",
    answer:
      "I am not trying to build everything — I am trying to build a small number of things exceptionally well. Each product solves a problem I personally care about. GRAM is the messaging app I always wanted. ADMIN OS is the admin tool I wished existed. AI is the intelligence layer that makes everything else smarter. The Ecosystem ties it all together.",
  },
  {
    question: "Which product should I try first?",
    answer:
      "All SP NET products — GRAM, ADMIN OS, and AI — are currently in active development and not yet publicly available. Once betas launch, start with whatever solves your current pain point. For the latest status on availability, reach out to PCA at https://t.me/SAVANPATELSP_BOT.",
  },
  {
    question: "Are these products free?",
    answer:
      "The products are still in active development. When launched, core features will always be free. Premium features — more storage, advanced analytics, enterprise controls — will have paid tiers. For early access opportunities, contact PCA at https://t.me/SAVANPATELSP_BOT.",
  },
  {
    question: "How do you decide what to build next?",
    answer:
      "I listen to what I and other people actually need, then I build the thing that would make the biggest difference. Technical feasibility matters, but user impact matters more. If a feature does not make someone's day meaningfully better, it does not get prioritized.",
  },
  {
    question: "When will everything be available?",
    answer:
      "All SP NET products are in active development and not yet publicly available. GRAM and ADMIN OS have beta access planned for 2026. AI powers features across both products internally. The Ecosystem platform will launch as the integration layer once the core products are stable. Cloud, Teams, and Automate are on the horizon for 2027-2028. For the latest updates, reach out to PCA at https://t.me/SAVANPATELSP_BOT.",
  },
];

const relatedPages = [
  {
    title: "Innovation",
    description: "The experimental work behind new product ideas.",
    href: "/explore/innovation",
  },
  {
    title: "Technology",
    description: "The tech stack powering every product.",
    href: "/explore/technology",
  },
  {
    title: "Future Vision",
    description: "Where I see these products headed long term.",
    href: "/explore/vision",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Explore", href: "/explore" },
          { label: "Products" },
        ]}
        label="Explore"
        title="Products"
        titleAccent="What I'm building"
        description="The products I pour my time, energy, and ideas into — each one solving a problem I genuinely care about, built under SP NET INC."
        icon={<Package className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Why I build"
            title="Products built from real frustration"
            subtitle="Every product started with a moment where I thought — there has to be a better way. These are not ideas I had in a boardroom. They are tools I needed and decided to build myself."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                I have been writing code since 2018, and somewhere along the way I stopped
                just learning frameworks and started building things I actually wanted to use.
                SP NET is the umbrella for all of that — a small, focused set of products
                that each solve a specific problem in my own workflow and life.
              </p>
              <p>
                I am not trying to compete with Google or Microsoft. I am trying to build
                the tools I wish existed — ones that respect privacy, feel delightful, and
                work seamlessly together. Each product stands on its own but delivers far
                more when plugged into the ecosystem.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Products"
          title="What I'm building right now"
          subtitle="Four products, each born from a real need, each designed to work beautifully alone and even better together."
        />

        <div className="space-y-5">
          {products.map((product, i) => (
            <FadeIn key={product.name} delay={i * 0.08}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                whileHover={{ y: -3, scale: 1.005 }}
                transition={spring.gentle}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg border"
                        style={{
                          backgroundColor: `${product.color}0d`,
                          borderColor: `${product.color}1a`,
                          color: product.color,
                        }}
                      >
                        <product.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white/70">
                          {product.name}
                        </h3>
                        <p className="text-[11px] font-mono uppercase tracking-wider text-white/20">
                          {product.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-white/25 leading-relaxed mb-4 max-w-2xl">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1 rounded-full border border-white/[0.04] bg-white/[0.02] px-2.5 py-1 text-[10px] font-mono text-white/25"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider"
                      style={{
                        color: product.status === "Building" ? "#10b981" : "#f59e0b",
                        backgroundColor:
                          product.status === "Building" ? "#10b9810d" : "#f59e0b0d",
                        border: `1px solid ${product.status === "Building" ? "#10b9811a" : "#f59e0b1a"}`,
                      }}
                    >
                      <span
                        className="h-1 w-1 rounded-full animate-pulse"
                        style={{
                          backgroundColor:
                            product.status === "Building" ? "#10b981" : "#f59e0b",
                        }}
                      />
                      {product.status}
                    </span>
                    <a
                      href={product.href}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-white/40 hover:text-white/60 hover:border-white/[0.1] transition-all duration-200"
                    >
                      Learn more
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Upcoming"
          title="Products on the horizon"
          subtitle="Ideas I am actively thinking about for the future."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {upcomingProducts.map((product) => (
            <StaggerItem key={product.title}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                    <product.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/60">{product.title}</h3>
                    <span className="text-[10px] font-mono text-white/20">
                      {product.timeline}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/25 leading-relaxed">{product.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ items={faqItems} />

      <RelatedPages pages={relatedPages} />

      <CTASection
        title="Curious about a product?"
        titleAccent="Take a closer look."
        description="Each product has its own page with details on features, status, and the story behind why it exists."
        primaryAction={{ label: "View All Products", href: "/products" }}
        secondaryAction={{ label: "Back to Explore", href: "/explore" }}
      />
    </>
  );
}
