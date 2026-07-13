"use client";

import { Shield, Lock, Eye, Key, FileCheck, ShieldCheck, Fingerprint, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
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

const whatIDo = [
  {
    icon: Lock,
    title: "E2EE in SP NET GRAM",
    description:
      "End-to-end encryption was one of the hardest and most rewarding things I've built. Implementing proper key exchange, ensuring forward secrecy, and making sure even I can't read user messages — that's the standard I hold myself to. GRAM's encryption isn't a feature; it's a promise.",
  },
  {
    icon: Shield,
    title: "Zero-Trust Learning",
    description:
      "I've been deep-diving into zero-trust architecture — the idea that no request should be trusted by default, even from inside the network. It fundamentally changes how you think about service-to-service communication, and I'm applying these principles as I build out SP NET's infrastructure.",
  },
  {
    icon: AlertTriangle,
    title: "Responsible Disclosure",
    description:
      "I take security seriously enough to report issues when I find them. I've reported vulnerabilities in tools and services I use, and I believe that responsible disclosure makes the entire ecosystem safer for everyone.",
  },
  {
    icon: FileCheck,
    title: "Secure Coding Habits",
    description:
      "Security isn't a separate phase — it's woven into every line of code I write. Input validation, output encoding, proper authentication checks, secret management. These aren't afterthoughts; they're muscle memory.",
  },
];

const securityPractices = [
  { name: "End-to-End Encryption", detail: "Implementing Signal Protocol-style E2EE for GRAM with forward secrecy and post-compromise security" },
  { name: "Key Management", detail: "Secure key generation, rotation, and storage — because encryption is only as strong as your key management" },
  { name: "Secure Authentication", detail: "Multi-factor auth, session management, and secure password hashing across all SP NET products" },
  { name: "Audit Logging", detail: "Immutable, tamper-proof audit trails so every access and change is traceable and accountable" },
  { name: "Threat Awareness", detail: "Staying current on attack vectors — from social engineering to supply chain attacks — and building defenses accordingly" },
  { name: "Privacy by Default", detail: "Zero data retention by default. No tracking, no analytics, no sneaky data collection unless users explicitly opt in" },
];

const principles = [
  {
    icon: Eye,
    title: "Assume Compromise",
    description: "I design systems as if an attacker already has access to part of the network. Containment, blast radius reduction, and recovery are built into the architecture from day one.",
  },
  {
    icon: Fingerprint,
    title: "Least Privilege",
    description: "Every service, every API key, every user gets only the minimum access needed. Access is reviewed regularly and revoked automatically when no longer needed.",
  },
  {
    icon: Key,
    title: "Verify Everything",
    description: "No implicit trust. Every request is authenticated and authorized. This applies to service-to-service calls, user sessions, and even internal admin operations.",
  },
];

const faqItems = [
  {
    question: "Why is cybersecurity so important to you?",
    answer:
      "Because people trust GRAM with their private conversations. That trust is sacred. If someone tells me something in a private message, I need to know — and they need to know — that no one else can read it. Not me, not a government, not a hacker. Security isn't a feature I add; it's the reason the product exists.",
  },
  {
    question: "How did you learn about security?",
    answer:
      "A mix of hands-on building, reading security research, and making mistakes. I've had moments where I realized I shipped something insecure and had to fix it urgently. Those experiences taught me more than any certification. I also follow security researchers and read CVE reports for fun — it's humbling and educational.",
  },
  {
    question: "What's the hardest security problem you've solved?",
    answer:
      "Implementing end-to-end encryption in GRAM properly. Not just wrapping messages in encryption, but doing it right — key exchange, forward secrecy, handling device changes, key recovery without breaking E2EE guarantees. It took months of research, implementation, and testing.",
  },
  {
    question: "Do you do bug bounties?",
    answer:
      "I haven't run a formal bug bounty program yet, but I actively practice responsible disclosure. If you discover a security vulnerability, please report it to security@sp-net.in. If I find a vulnerability in a service I use, I report it to the vendor privately with details and give them time to fix it before saying anything public.",
  },
  {
    question: "How do you balance security and usability?",
    answer:
      "Security that users bypass isn't security at all. I constantly ask myself: is this security measure adding real protection, or is it just adding friction? The best security is invisible — it works in the background without requiring users to think about it.",
  },
  {
    question: "Is SP NET GRAM publicly available?",
    answer:
      "Not yet. SP NET GRAM, along with ADMIN OS and SP NET AI, is in active development. I'm building it with security as the foundation and won't release it until it meets rigorous standards.",
  },
  {
    question: "How can I report a security concern or get in touch?",
    answer:
      "For security-related concerns, email security@sp-net.in directly. For any other inquiry, PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT is the recommended first point of contact. You can also reach me at hello@sp-net.in or schedule a call at cal.com/savanpatel.",
  },
  {
    question: "Where can I follow your work on social media?",
    answer:
      "X (Twitter) and LinkedIn profiles are coming soon. For now, the best way to stay updated is through PCA at https://t.me/SAVANPATELSP_BOT or by reaching out via email.",
  },
];

const relatedPages = [
  {
    title: "Artificial Intelligence",
    description: "Privacy-preserving AI that respects user data.",
    href: "/research/ai",
  },
  {
    title: "Cloud Computing",
    description: "Securing infrastructure at every layer.",
    href: "/research/cloud",
  },
  {
    title: "SP NET GRAM",
    description: "End-to-end encrypted messaging built on secure foundations.",
    href: "/products/sp-net-gram",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "Cybersecurity" },
        ]}
        label="Research"
        title="Cybersecurity"
        titleAccent="Protecting what matters"
        description="My passion for security — from implementing E2EE in SP NET GRAM to learning zero-trust architecture. Security isn't a feature I add; it's the foundation everything is built on."
        icon={<Shield className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="Security is personal"
          subtitle="I care about cybersecurity because real people trust my products with their private conversations and sensitive data. That responsibility keeps me up at night — in the best possible way. Every security decision I make is driven by the question: what if someone's livelihood depends on this being right?"
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Philosophy", value: "Security by design, not by bolt-on" },
              { label: "Standard", value: "E2EE for all communication" },
              { label: "Commitment", value: "User data sovereignty always" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
              >
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/20 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="What I Work On"
          title="Security through building"
          subtitle="My security knowledge comes from implementing real protections in real products. Every item here is something I've built, tested, or learned the hard way."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatIDo.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-rose-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Security Skills"
          title="The security toolkit"
          subtitle="Techniques and practices I actively use when building and securing SP NET products."
        />
        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityPractices.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                <h3 className="text-sm font-medium text-white/70 mb-2">
                  {tech.name}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  {tech.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Principles"
          title="How I think about security"
          subtitle="These aren't corporate security policies. They're personal convictions about how to build software that people can trust."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {principles.map((principle) => {
            const Icon = principle.icon;
            return (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-rose-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Vision"
          title="Trust through transparency"
        />
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 shrink-0">
                <ShieldCheck className="h-6 w-6 text-rose-400/50" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Verifiable, Not Just Promised
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  I want to build a platform where users don't have to take my word for it. Open-source cryptographic implementations, auditable key management, transparent security practices — trust should be demonstrated, not demanded. That's the standard I hold myself to.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Security earned"
        titleAccent="through practice"
        description="Cybersecurity isn't about checking boxes — it's about genuinely caring whether your users' data is safe. That's what drives me."
        primaryAction={{
          label: "See SP NET GRAM",
          href: "/products/sp-net-gram",
        }}
        secondaryAction={{
          label: "View All Research",
          href: "/research",
        }}
      />
    </>
  );
}
