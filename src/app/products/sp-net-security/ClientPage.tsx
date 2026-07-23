"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Scan,
  LifeBuoy,
  FileCheck,
  Search,
  Lock,
  Zap,
  Globe,
  Eye,
  Bell,
  BarChart3,
} from "lucide-react";
import { spring } from "@/lib/motion";
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
    icon: Scan,
    title: "Threat Detection",
    description:
      "Real-time monitoring and analysis of network traffic, system behavior, and user activity. Machine learning models identify anomalies and potential threats before they become incidents.",
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description:
      "Automated scanning of infrastructure, applications, and dependencies for known vulnerabilities. Prioritized remediation guidance with risk scoring based on your specific environment.",
  },
  {
    icon: LifeBuoy,
    title: "Incident Response",
    description:
      "Automated playbooks for common security events — from account compromise to data breach. Orchestrate containment, investigation, and recovery workflows from a single console.",
  },
  {
    icon: FileCheck,
    title: "Compliance Monitoring",
    description:
      "Continuous compliance assessment against SOC 2, GDPR, HIPAA, and custom policies. Automated evidence collection and audit-ready reports generated on demand.",
  },
  {
    icon: Eye,
    title: "Security Auditing",
    description:
      "Comprehensive audit logs of every action across the SP NET ecosystem. Know who accessed what, when, and from where with immutable, tamper-proof logging.",
  },
  {
    icon: BarChart3,
    title: "Risk Dashboard",
    description:
      "A unified view of your security posture across all SP NET products. Risk scores, trend analysis, and actionable insights keep your security team focused on what matters.",
  },
];

const principles = [
  {
    icon: Lock,
    title: "Zero Trust Architecture",
    description: "Every request is authenticated and authorized regardless of source. No implicit trust based on network location or previous authentication.",
  },
  {
    icon: Zap,
    title: "Real-Time Response",
    description: "Threats are detected and responded to in milliseconds, not minutes. Automated playbooks handle common events while analysts focus on complex threats.",
  },
  {
    icon: Globe,
    title: "Ecosystem-Wide Visibility",
    description: "Security monitoring spans every SP NET product — GRAM, ADMIN OS, WORKPLACE, API, and Cloud. A single pane of glass for your entire security posture.",
  },
  {
    icon: Bell,
    title: "Intelligent Alerting",
    description: "Context-aware alerting reduces noise by correlating related events and suppressing false positives. Your team sees actionable alerts, not alert fatigue.",
  },
  {
    icon: Eye,
    title: "Transparent Operations",
    description: "Full visibility into detection logic, response actions, and audit trails. You always know what the security platform is doing and why.",
  },
];

const faqItems = [
  {
    question: "What is SP NET Security?",
    answer: "SP NET Security is a comprehensive security platform providing threat detection, vulnerability assessment, incident response, and compliance monitoring across the entire SP NET ecosystem. It is designed to give organizations a unified view of their security posture.",
  },
  {
    question: "What does it protect against?",
    answer: "SP NET Security monitors for a wide range of threats including unauthorized access, data exfiltration, account compromise, malware, DDoS attacks, insider threats, and configuration drift. Automated playbooks handle common events while complex incidents are escalated with full context.",
  },
  {
    question: "How does compliance monitoring work?",
    answer: "SP NET Security continuously evaluates your configuration and activity against compliance frameworks like SOC 2, GDPR, and HIPAA. It automatically collects evidence, generates audit-ready reports, and alerts you when drift is detected. Custom policies can be defined for organization-specific requirements.",
  },
  {
    question: "Is SP NET Security only for SP NET products?",
    answer: "While SP NET Security is optimized for monitoring SP NET products, it provides general-purpose security monitoring capabilities. The threat detection, vulnerability assessment, and compliance tools work across any infrastructure integrated with the SP NET platform.",
  },
  {
    question: "Is SP NET Security available now?",
    answer: "SP NET Security is currently a future initiative. Threat detection models, compliance frameworks, and incident response playbooks are in research and development. Join the waitlist for updates on our progress.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer: "For any inquiries about SP NET Security, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET Cloud",
    description: "Cloud infrastructure with security built into every layer.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "SP NET ADMIN OS",
    description: "Enterprise administration with security and audit tools.",
    href: "/products/sp-net-admin-os",
  },
  {
    title: "SP NET API",
    description: "Secure API platform with authentication and rate limiting.",
    href: "/products/sp-net-api",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform protected by SP NET Security.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "SP NET AI",
    description: "AI-powered threat detection and response automation.",
    href: "/products/sp-net-ai",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetSecurityClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET Security" }]}
        label="Innovation Lab"
        badge="Coming Soon"
        title="SP NET Security"
        titleAccent="Protection built into every layer"
        description="A security platform providing threat detection, vulnerability assessment, incident response, and compliance monitoring across the entire SP NET ecosystem."
        icon={<Shield className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Security as a platform, not an afterthought"
            subtitle="SP NET Security is being designed to provide comprehensive protection across every SP NET product — from threat detection to compliance, all from a unified security operations center."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                Security in most organizations is a patchwork of tools — one vendor for
                endpoint protection, another for network monitoring, a third for compliance,
                and yet another for incident response. Each tool has its own dashboard, its
                own alert format, and its own blind spots.
              </p>
              <p>
                SP NET Security is being designed as a unified security platform that covers
                the full spectrum — from real-time threat detection to vulnerability assessment
                to automated incident response to continuous compliance monitoring. Everything
                connects, everything correlates, and everything shares context.
              </p>
              <p>
                Built specifically for the SP NET ecosystem, it has deep visibility into every
                product — GRAM, ADMIN OS, WORKPLACE, API, and Cloud. This means it can detect
                cross-product attack patterns that siloed security tools would miss entirely.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Features"
          title="Complete security operations"
          subtitle="Six core capabilities covering the full security lifecycle — from detection to response to compliance."
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
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/8 text-amber-400 border border-amber-500/10">
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
          title="Security without compromise"
          subtitle="Five principles that guide the design of SP NET Security."
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
        title="Ready to secure your ecosystem?"
        description="SP NET Security is being built to provide unified protection across every SP NET product. Join the waitlist for early access."
        primaryAction={{ label: "Join the Waitlist", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
