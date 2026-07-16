"use client";

import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  HardDrive,
  FunctionSquare,
  Settings,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Clock,
  Lock,
  Activity,
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
    icon: Server,
    title: "Compute",
    description:
      "Virtual machines, containers, and serverless functions. Deploy any workload with automatic scaling, load balancing, and health monitoring built in.",
  },
  {
    icon: HardDrive,
    title: "Storage",
    description:
      "Object storage, block storage, and managed databases. Data is encrypted at rest and in replication across multiple regions for durability and availability.",
  },
  {
    icon: FunctionSquare,
    title: "Edge Functions",
    description:
      "Deploy code to edge nodes worldwide for sub-10ms execution. Perfect for API routing, authentication, image transformation, and real-time data processing.",
  },
  {
    icon: Settings,
    title: "Managed Services",
    description:
      "Managed queues, caches, search engines, and message brokers. Run complex architectures without managing the underlying infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Monitoring & Observability",
    description:
      "Application performance monitoring, distributed tracing, log aggregation, and custom metrics. Know exactly what is happening across your infrastructure.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description:
      "A content delivery network spanning 200+ edge locations. Static assets, media files, and API responses are cached and served from the nearest edge.",
  },
];

const principles = [
  {
    icon: Shield,
    title: "Privacy by Architecture",
    description: "Data is encrypted at rest and in transit. Multi-region replication with customer-controlled encryption keys. No access to your data by platform operators.",
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "NVMe storage, modern CPU architectures, and 10Gbps networking. Every component is chosen for speed and reliability.",
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "SOC 2 Type II, GDPR, and HIPAA compliance frameworks. Audit logs, data residency controls, and retention policies built into the platform.",
  },
  {
    icon: Activity,
    title: "99.99% Uptime SLA",
    description: "Multi-az redundancy, automatic failover, and zero-downtime deployments. Infrastructure that stays up when you need it.",
  },
  {
    icon: Clock,
    title: "Pay As You Go",
    description: "No upfront commitments. Pay only for the compute, storage, and bandwidth you use with transparent, predictable pricing.",
  },
];

const faqItems = [
  {
    question: "What is SP NET Cloud?",
    answer: "SP NET Cloud is a cloud infrastructure platform designed for the SP NET ecosystem. It provides compute, storage, edge functions, and managed services built with privacy and performance as core principles.",
  },
  {
    question: "How does it differ from AWS or Google Cloud?",
    answer: "SP NET Cloud is purpose-built for the SP NET ecosystem. While major cloud providers offer breadth, SP NET Cloud focuses on depth — tight integration with SP NET products, privacy-first architecture, and a simplified developer experience. It is designed to be the default infrastructure choice for anyone building on SP NET.",
  },
  {
    question: "Can I use SP NET Cloud for non-SP NET projects?",
    answer: "Yes. While SP NET Cloud is optimized for SP NET ecosystem workloads, it provides general-purpose compute, storage, and edge computing that works for any project. The privacy-first architecture benefits all types of applications.",
  },
  {
    question: "What managed services are available?",
    answer: "SP NET Cloud will launch with managed databases (PostgreSQL, Redis), message queues, search engines, and object storage. Additional services like managed Kubernetes, ML inference, and workflow engines are planned for future releases.",
  },
  {
    question: "Is SP NET Cloud available now?",
    answer: "SP NET Cloud is currently a future initiative. Core infrastructure design and capacity planning are in progress. Join the waitlist to get early access when we launch our developer preview.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer: "For any inquiries about SP NET Cloud, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET API",
    description: "Developer platform built on top of SP NET Cloud.",
    href: "/products/sp-net-api",
  },
  {
    title: "SP NET GAME",
    description: "Cloud game streaming powered by SP NET Cloud.",
    href: "/products/sp-net-game",
  },
  {
    title: "SP NET Security",
    description: "Security monitoring across the cloud infrastructure.",
    href: "/products/sp-net-security",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform all infrastructure supports.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET AI",
    description: "AI inference running on SP NET Cloud infrastructure.",
    href: "/products/sp-net-ai",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetCloudClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET Cloud" }]}
        label="Innovation Lab"
        badge="Coming Soon"
        title="SP NET Cloud"
        titleAccent="Scalable infrastructure for everything"
        description="A cloud infrastructure platform designed for the SP NET ecosystem — compute, storage, edge functions, and managed services built for privacy and performance."
        icon={<Cloud className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Cloud infrastructure with purpose"
            subtitle="SP NET Cloud is being designed as the infrastructure backbone of the SP NET ecosystem — providing compute, storage, and edge computing with privacy and performance as non-negotiable requirements."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Cloud infrastructure today is powerful but complex. Developers spend weeks
                configuring networking, security groups, IAM policies, and monitoring before
                deploying a single line of code. The major providers offer breadth but demand
                expertise to navigate.
              </p>
              <p>
                SP NET Cloud explores a different approach — infrastructure that is opinionated
                about security, optimized for the SP NET ecosystem, and designed to get
                developers from idea to production with minimal friction. Sensible defaults,
                built-in encryption, and integrated monitoring mean you spend less time on
                plumbing and more time on your product.
              </p>
              <p>
                Every SP NET product will run on SP NET Cloud. This means the infrastructure
                is battle-tested by the same workloads it is designed to support, and every
                improvement benefits the entire ecosystem.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="Complete cloud infrastructure"
          subtitle="Six core services that cover the full infrastructure stack."
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/8 text-sky-400 border border-sky-500/10">
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
          label="Principles"
          title="Built on non-negotiables"
          subtitle="Five principles that guide every infrastructure decision."
        />

        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((item) => (
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
        title="Ready to build on better infrastructure?"
        description="SP NET Cloud is being designed for developers who want performance without complexity. Join the waitlist for early access."
        primaryAction={{ label: "Join the Waitlist", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
