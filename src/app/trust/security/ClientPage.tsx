"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  FileSearch,
  Bug,
  Server,
  CheckCircle,
  Code2,
  Send,
  AlertTriangle,
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

const securityPractices = [
  {
    title: "Secure by Default",
    description:
      "I start every project with security in mind, not as an afterthought. Input validation, authentication, authorization — these are baked in from the first commit, not bolted on before launch.",
    icon: Shield,
  },
  {
    title: "End-to-End Encryption",
    description:
      "In SP NET GRAM, messages and files are encrypted so that only the sender and recipient can read them. Even I, as the developer, cannot access the content of private conversations.",
    icon: Lock,
  },
  {
    title: "Dependency Auditing",
    description:
      "Before adding any library or package, I check it for known vulnerabilities. I regularly audit dependencies and keep them updated to avoid known attack vectors.",
    icon: FileSearch,
  },
  {
    title: "Minimal Attack Surface",
    description:
      "I expose only what is necessary. Every endpoint, every API route, every service has a clear purpose. If something does not need to be public, it is not.",
    icon: Eye,
  },
];

const devPractices = [
  {
    title: "Code Review",
    items: [
      "Every change goes through review before merging",
      "Security-focused review for authentication and data handling",
      "Static analysis tools catch common vulnerability patterns",
      "I question every new dependency before adding it",
    ],
  },
  {
    title: "Data Handling",
    items: [
      "Passwords are hashed with bcrypt, never stored in plain text",
      "Sensitive data is encrypted at rest and in transit",
      "User input is validated and sanitized on every endpoint",
      "Session tokens are rotated and have expiration policies",
    ],
  },
  {
    title: "Infrastructure",
    items: [
      "Environment variables for all secrets — never hardcoded",
      "HTTPS enforced on all endpoints, no exceptions",
      "Automated deployments reduce human error",
      "Logs are sanitized to prevent sensitive data leakage",
    ],
  },
];

const responseSteps = [
  {
    step: "01",
    title: "You Find Something",
    description:
      "If you discover a security vulnerability in any of my projects, I want to know about it. Seriously — I would rather hear from you than from someone with bad intentions.",
  },
  {
    step: "02",
    title: "You Tell Me",
    description:
      "Send me an email at savan@sp-net.in with details about what you found. Include steps to reproduce if possible. I will acknowledge your report within 48 hours.",
  },
  {
    step: "03",
    title: "I Fix It",
    description:
      "I will investigate, reproduce, and fix the issue. Depending on severity, this could take anywhere from a few hours to a few days. I will keep you updated on progress.",
  },
  {
    step: "04",
    title: "I Credit You",
    description:
      "With your permission, I will credit you in the fix announcement. Good-faith security research deserves recognition, not legal threats.",
  },
];

const faqItems = [
  {
    question: "How do I report a security vulnerability?",
    answer:
      "The recommended way is to reach out via PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT. You can also email me directly at savan@sp-net.in with details about the vulnerability. Include steps to reproduce and any relevant screenshots. I will acknowledge your report within 48 hours and work on a fix. I take every report seriously, no matter how small.",
  },
  {
    question: "Does SP NET GRAM use end-to-end encryption?",
    answer:
      "SP NET GRAM is currently in active development and not yet publicly available. It is being designed with end-to-end encryption for messages and files as a core principle. The encryption keys will be generated and stored on the user's device, meaning the server will never have access to the plaintext content of communications.",
  },
  {
    question: "How do you handle security in your personal projects?",
    answer:
      "I follow secure coding practices from the start — input validation, parameterized queries, proper authentication, and encrypted data storage. I audit dependencies regularly and keep everything updated. For projects like SP NET GRAM (currently in active development), security is the foundational design principle, not a feature.",
  },
  {
    question: "Will you pursue legal action for good-faith reporting?",
    answer:
      "Absolutely not. I appreciate security researchers who help me find and fix vulnerabilities responsibly. I will never pursue legal action against someone who reports a vulnerability in good faith and follows responsible disclosure practices.",
  },
  {
    question: "How often do you audit your code for security?",
    answer:
      "I review security practices whenever I add new features or dependencies. For active projects, I do a focused security pass before each major release. I also keep up with security advisories for all dependencies and patch promptly when issues are found.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trust", href: "/trust" },
          { label: "Security" },
        ]}
        label="Trust"
        title="Security"
        titleAccent="My engineering approach to security"
        description="Security is not something I think about only when things go wrong. I build with a security-first mindset from day one — because fixing vulnerabilities after launch is always harder than preventing them."
        icon={<Shield className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                My Mindset
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Security is not a feature
                <br />
                <span className="text-white/40">it is a habit</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  I approach security the way I approach code quality — it is not something
                  you add at the end. It is something you practice every day, in every
                  decision, from the very first line of code.
                </p>
                <p>
                  This page is about how I think about security, the practices I follow,
                  and how you can report issues if you find them. I share this because I
                  believe developers should be open about how they protect the people who
                  use their software.
                </p>
                <p>
                  Whether it is encrypting messages in SP NET GRAM or validating input on a
                  simple contact form, I treat every security decision as if it matters
                  — because it does.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Practices"
            title="Core security practices"
            subtitle="Four foundational habits that shape how I approach security in every project."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {securityPractices.map((practice, i) => (
              <StaggerItem key={practice.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <practice.icon className="h-4 w-4 text-white/25" />
                    <h3 className="text-base font-medium text-white/70">{practice.title}</h3>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">{practice.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="In Practice"
            title="What this looks like in code"
            subtitle="Concrete security measures I follow across code review, data handling, and infrastructure."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {devPractices.map((section, i) => (
              <motion.div
                key={section.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Code2 className="h-4 w-4 text-blue-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{section.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400/40 mt-0.5 shrink-0" />
                      <p className="text-xs text-white/35 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Responsible Disclosure"
            title="Found a vulnerability?"
            subtitle="I welcome security reports from anyone who finds an issue in good faith."
          />

          <div className="space-y-0">
            {responseSteps.map((step, i) => (
              <motion.div
                key={step.step}
                className="relative pl-12 border-l border-white/[0.06]"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.08, ease: ease.out }}
              >
                <span className="absolute left-0 top-5 -translate-x-[5px] text-xs font-mono text-white/20 bg-[#0a0a0b] px-1">
                  {step.step}
                </span>
                <div className="pb-10">
                  <h3 className="text-base font-medium text-white/70 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="SP NET GRAM"
            title="Encryption in SP NET GRAM"
            subtitle="How I am approaching security in the messaging platform I am building."
          />

          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Lock className="h-5 w-5 text-blue-400/60" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/60">End-to-End Encrypted</h3>
                  <p className="text-xs text-white/25">Messages only you can read</p>
                </div>
              </div>
              <p className="text-sm text-white/35 leading-relaxed mb-4">
                SP NET GRAM is built with end-to-end encryption as a core design principle.
                Your messages and files are encrypted on your device and only decrypted on the
                recipient&apos;s device. The server never sees the plaintext content.
              </p>
              <div className="space-y-2">
                {[
                  "Signal Protocol-inspired key exchange for secure session setup",
                  "Messages encrypted with AES-256-GCM before leaving your device",
                  "Keys stored locally — never transmitted to the server",
                  "Forward secrecy ensures past messages stay safe if a key is compromised",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400/40 shrink-0" />
                    <p className="text-xs text-white/35">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
      </SectionContainer>

      <FAQ title="Security FAQ" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Privacy",
            description: "How this portfolio handles your data — spoiler: it barely does.",
            href: "/trust/privacy",
          },
          {
            title: "Transparency",
            description: "How I build openly and share progress honestly.",
            href: "/trust/transparency",
          },
          {
            title: "Responsible AI",
            description: "How I approach AI ethically in my projects.",
            href: "/trust/responsible-ai",
          },
        ]}
      />

      <CTASection
        title="Found a security"
        titleAccent="issue?"
        description="If you have found a vulnerability or have a security concern about any of my projects, reach out. I take every report seriously."
        primaryAction={{ label: "Email me", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "View trust center", href: "/trust" }}
      />
    </>
  );
}
