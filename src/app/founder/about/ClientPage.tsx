"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  ExternalLink,
  Code2,
  Brain,
  Cloud,
  Shield,
  Palette,
  Crown,
  Mail,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SLOW, NORMAL, FAST, ease, spring } from "@/lib/motion";
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
  Reveal,
} from "@/components/ui/AnimationPrimitives";
import { GithubIcon, XIcon, LinkedinIcon, TelegramIcon, InstagramIcon } from "@/components/ui/Icons";
import { SocialModal } from "@/components/ui/SocialModal";

const expertiseCategories = [
  {
    name: "Software Development",
    icon: Code2,
    skills: ["Full Stack Development", "Web Development", "Mobile Development", "Desktop Development", "Backend Engineering", "API Design", "System Architecture"],
  },
  {
    name: "Artificial Intelligence",
    icon: Brain,
    skills: ["AI Integration", "AI Agents", "Prompt Engineering", "Automation", "LLM Applications", "Vector Databases"],
  },
  {
    name: "Cloud & Infrastructure",
    icon: Cloud,
    skills: ["Cloud Engineering", "Deployment & CI/CD", "Database Architecture", "Performance Optimization", "Containerization", "Edge Computing"],
  },
  {
    name: "Cyber Security",
    icon: Shield,
    skills: ["Authentication & Authorization", "Secure Architecture", "Privacy & Encryption", "Access Control", "Compliance & Audit", "Threat Modeling"],
  },
  {
    name: "UI / UX",
    icon: Palette,
    skills: ["Product Design", "UI Design", "UX Design", "Motion Design", "Responsive Design", "Design Systems"],
  },
  {
    name: "Leadership",
    icon: Crown,
    skills: ["Founder & CEO", "Product Strategy", "Technical Architecture", "Team Leadership", "Project Planning", "Problem Solving"],
  },
];

const principles = [
  { title: "Craft over scale", description: "Every detail matters. Build for the one, then the many." },
  { title: "Simplicity is the ultimate sophistication", description: "The best solutions feel obvious in hindsight. Remove until nothing else can be removed." },
  { title: "Ship to learn", description: "Done is better than perfect. Real feedback comes from real users." },
  { title: "Open by default", description: "Great software belongs to everyone. Transparency builds trust." },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/savanpatelssp", icon: GithubIcon },
  { label: "X", href: "https://x.com/savanpatel", icon: XIcon, modal: true as const },
  { label: "LinkedIn", href: "https://linkedin.com/in/savanpatel", icon: LinkedinIcon, modal: true as const },
  { label: "Telegram", href: "https://t.me/ABOUTME_SP", icon: TelegramIcon },
  { label: "Instagram", href: "https://instagram.com/savanpatelssp", icon: InstagramIcon },
];

const faqItems = [
  {
    question: "Who is Savan Patel?",
    answer: "Savan Patel is the Founder and Product Engineer of SP NET INC. He is a self-taught software engineer from India who began coding in 2018 and has since built a suite of products including SP NET GRAM, SP NET ADMIN OS, and SP NET AI — all focused on modern communication, enterprise tooling, and intelligent automation.",
  },
  {
    question: "What does SP NET INC do?",
    answer: "SP NET INC builds infrastructure for modern communication, enterprise administration, and intelligent automation. The ecosystem includes SP NET GRAM (a next-generation messaging platform), SP NET ADMIN OS (an enterprise administration platform), and SP NET AI (an AI research initiative powering intelligent experiences across the product suite).",
  },
  {
    question: "What technologies does Savan use?",
    answer: "Savan works across the full stack with expertise spanning TypeScript, React, Next.js, Node.js, Python, cloud infrastructure, AI/ML systems, and cybersecurity. His approach is technology-agnostic — he chooses the right tool for the problem rather than adhering to a single stack, though he has deep proficiency in modern web and AI technologies.",
  },
  {
    question: "What is Savan Patel's mission?",
    answer: "His mission is to build software that elevates human potential through thoughtful design and precision engineering. He envisions a world where technology feels invisible, intuitive, and delightful — where every interaction is intentional and every product serves a genuine purpose.",
  },
  {
    question: "How can I get in touch with Savan?",
    answer: "The recommended first point of contact is the PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT — it handles inquiries efficiently and connects you with the right channel. You can also email hello@sp-net.in (general), business@sp-net.in (partnerships), contact@sp-net.in (general inquiries), media@sp-net.in (press), or savan@sp-net.in (personal). For scheduling, visit cal.com/savanpatel. X and LinkedIn profiles are coming soon. Connect with him on GitHub (savanpatelssp), Telegram (@ABOUTME_SP), or Instagram (savanpatelssp).",
  },
];

export default function AboutClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Founder", href: "/founder" },
          { label: "About" },
        ]}
        label="Founder"
        title="Savan Patel"
        titleAccent="Founder & Product Engineer at SP NET INC"
        description="Building products that connect people, empower communities, and shape the future of technology. Self-taught engineer, relentless builder, and the mind behind SP NET INC."
        icon={<User className="h-4 w-4" />}
      />

      <SectionContainer id="about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                The person behind
                <br />
                <span className="text-white/40">the products</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  I&apos;m Savan Patel — a self-taught software engineer and the founder of SP NET INC.
                  I build products that sit at the intersection of communication, intelligence, and
                  design. Every line of code I write is in service of a single belief: technology should
                  feel invisible and work effortlessly.
                </p>
                <p>
                  From writing my first line of code in 2018 to founding a company that now ships
                  products used across the globe, the journey has been defined by relentless curiosity,
                  stubborn persistence, and an obsession with craft. I don&apos;t just build software —
                  I architect experiences.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Background"
            title="From curiosity to creation"
            subtitle="A self-taught developer from India who turned a single line of code into a technology company building the future."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Based in", value: "India", icon: MapPin },
              { label: "First code", value: "2018", icon: Code2 },
              { label: "Company", value: "SP NET INC", icon: Globe },
              { label: "Contact", value: "savan@sp-net.in", icon: Mail },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.06}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                  <item.icon className="h-4 w-4 text-white/20 mb-3" />
                  <p className="text-xs text-white/25 mb-1">{item.label}</p>
                  <p className="text-sm font-medium text-white/60">{item.value}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2} className="mt-10">
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                Growing up in India, I didn&apos;t have access to formal computer
                science education or expensive bootcamps. What I had was a
                curiosity that refused to sit still and an internet connection
                that opened doors to every resource I needed. In 2018, I wrote my
                first line of code — and something clicked.
              </p>
              <p>
                That first program wasn&apos;t impressive. It was basic, clunky, and
                probably riddled with bugs. But it proved something I&apos;d never
                felt before: that I could bring ideas to life through code. From
                that moment, I was hooked. I spent every spare hour learning,
                building, breaking things, and putting them back together
                stronger.
              </p>
              <p>
                By 2022, I had enough conviction and skill to launch SP NET
                INC — a company built to create infrastructure for modern
                communication and enterprise tools. It wasn&apos;t a decision I
                took lightly. It was the natural next step for someone who
                believed that software could do more than solve problems — it
                could elevate how people work, communicate, and connect.
              </p>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="What Drives Me"
            title="Obsessed with the details"
            subtitle="The best products are built by people who care more about the experience than the features."
          />

          <FadeIn>
            <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed max-w-3xl">
              <p>
                I&apos;m driven by the conviction that software can be beautiful,
                that interfaces can feel like conversations, and that the best
                technology is the kind you forget you&apos;re using. Most products
                are built to impress. I build products to disappear — into the
                workflow, into the moment, into the rhythm of daily life.
              </p>
              <p>
                Every product I create starts with a question:{" "}
                <em className="text-white/50">&quot;How do we make this feel
                effortless?&quot;</em> Not effortless in the sense of simple —
                effortless in the sense of inevitable. The right action at the
                right time, surfaced with the right context. That&apos;s what I
                chase.
              </p>
              <p>
                SP NET GRAM isn&apos;t just a messaging app — it&apos;s a workspace
                for communication. SP NET ADMIN OS isn&apos;t just a dashboard —
                it&apos;s the operating system for running an organization. SP NET
                AI isn&apos;t just a feature set — it&apos;s the intelligence layer
                that makes everything smarter. The naming isn&apos;t accidental.
                Every product is designed to be a net positive for the people who
                use it.
              </p>
            </div>
          </FadeIn>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Expertise"
            title="Built to build"
            subtitle="A broad technical foundation with deep expertise across the full product development lifecycle."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {expertiseCategories.map((category) => (
              <StaggerItem key={category.name}>
                <div className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <category.icon className="h-4 w-4 text-white/40" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/60">{category.name}</h3>
                      <p className="text-[11px] text-white/20">{category.skills.length} skills</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-0.5 text-[11px] text-white/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Values & Approach"
            title="How I think about building"
            subtitle="Four principles that guide every product, every line of code, and every decision at SP NET INC."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {principles.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-white/70 mb-2">{principle.title}</h3>
                  <p className="text-sm text-white/30 leading-relaxed">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Connect"
            title="Find me online"
            subtitle="Always open to conversations about technology, product design, and building the future."
          />

          <StaggerFade className="flex flex-wrap gap-3" staggerDelay={0.05}>
            {socialLinks.map((link) => (
              <StaggerItem key={link.label}>
                <motion.a
                  href={"modal" in link ? "#" : link.href}
                  target={"modal" in link ? undefined : "_blank"}
                  rel={"modal" in link ? undefined : "noopener noreferrer"}
                  onClick={"modal" in link ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring.gentle}
                >
                  <link.icon className="h-4 w-4 text-white/25 group-hover:text-white/40 transition-colors duration-200" />
                  {link.label}
                  {"modal" in link ? null : <ExternalLink className="h-3 w-3 text-white/15 group-hover:text-white/30 transition-colors duration-200" />}
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerFade>
          <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </SectionContainer>

      <FAQ
        title="About Savan Patel"
        items={faqItems}
      />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Journey",
            description: "From first line of code to founding a company — the full timeline.",
            href: "/founder/journey",
          },
          {
            title: "Philosophy",
            description: "The beliefs, principles, and approach behind every product decision.",
            href: "/founder/philosophy",
          },
          {
            title: "Roadmap",
            description: "Where SP NET INC is headed and what's coming next across the ecosystem.",
            href: "/founder/roadmap",
          },
          {
            title: "SP NET GRAM",
            description: "A next-generation messaging platform focused on privacy and productivity.",
            href: "/products/sp-net-gram",
          },
          {
            title: "SP NET ADMIN OS",
            description: "Comprehensive enterprise administration with role-based access and tooling.",
            href: "/products/sp-net-admin-os",
          },
          {
            title: "SP NET AI",
            description: "AI research and systems powering intelligent experiences across the ecosystem.",
            href: "/products/sp-net-ai",
          },
        ]}
      />

      <CTASection
        title="Let&apos;s build something"
        titleAccent="that matters"
        description="Whether it&apos;s a product, a partnership, or a conversation about the future of technology — I&apos;m all ears."
        primaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "View projects", href: "/products" }}
      />
    </>
  );
}
