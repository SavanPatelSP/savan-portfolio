"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Bot,

  Zap,
  Users,
  Globe,
  ArrowDown,
  Sparkles,
  MessageSquare,
  Handshake,
  Shield,
  Rocket,
  Lightbulb,
  Briefcase,
  GraduationCap,
  BookOpen,
  LayoutGrid,
  Code2,
  HelpCircle,
} from "lucide-react";
import { FAST, ease, spring } from "@/lib/motion";
import { personal } from "@/data/personal";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { GithubIcon, XIcon, LinkedinIcon, InstagramIcon, TelegramIcon } from "@/components/ui/Icons";
import { SocialModal } from "@/components/ui/SocialModal";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

/* ─── DATA ───────────────────────────────────────────────────── */

const whyBenefits = [
  {
    title: "Faster Communication",
    description:
      "Start conversations quickly without relying on traditional email. Get answers when you need them.",
    icon: Zap,
  },
  {
    title: "Personally Reviewed",
    description:
      "Every genuine inquiry is personally reviewed by me. The assistant helps organize communication\u2014it does not replace personal interaction.",
    icon: MessageSquare,
  },
  {
    title: "Built for Meaningful Conversations",
    description:
      "Perfect for collaborations, software development, research, business opportunities, internships, technical discussions, and general questions.",
    icon: Handshake,
    list: [
      "Collaborations",
      "Software Development",
      "Research",
      "Business Opportunities",
      "Internships",
      "Technical Discussions",
      "General Questions",
    ],
  },
  {
    title: "Available Anytime",
    description:
      "Start a conversation whenever it is convenient. Whether you are a student, developer, recruiter, founder, researcher, or technology enthusiast, you are always welcome.",
    icon: Globe,
  },
];

const topics = [
  { label: "Software Engineering", icon: Zap },
  { label: "SP NET Projects", icon: Sparkles },
  { label: "Artificial Intelligence", icon: Bot },
  { label: "Cybersecurity", icon: Shield },
  { label: "Cloud Computing", icon: Globe },
  { label: "Research", icon: Users },
  { label: "Technology", icon: Rocket },
  { label: "Innovation", icon: Lightbulb },
  { label: "Collaborations", icon: Handshake },
  { label: "Business", icon: Briefcase },
  { label: "Internships", icon: GraduationCap },
  { label: "Career Advice", icon: BookOpen },
  { label: "Portfolio", icon: LayoutGrid },
  { label: "Open Source", icon: Code2 },
  { label: "General Questions", icon: HelpCircle },
];

const flowSteps = [
  { label: "Choose a Topic", description: "Decide what you want to discuss" },
  {
    label: "Start a Conversation",
    description: "Open the assistant and begin chatting",
  },
  {
    label: "Receive Instant Guidance",
    description: "Get immediate, relevant responses",
  },
  {
    label: "Continue the Discussion",
    description: "Dive deeper into your topic of interest",
  },
  {
    label: "Connect Directly When Needed",
    description: "Escalate to email or form if necessary",
  },
];

const socialProfiles = [
  {
    title: "GitHub",
    username: "savanpatelssp",
    description: "Best for: code, repositories, and open source.",
    href: personal.social.github,
    icon: GithubIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
  },
  {
    title: "X",
    username: null,
    description: "Official profile launching soon.",
    href: personal.social.x,
    icon: XIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
    modal: true as const,
  },
  {
    title: "LinkedIn",
    username: null,
    description: "Professional profile coming soon.",
    href: personal.social.linkedin,
    icon: LinkedinIcon,
    color: "text-blue-400/70",
    borderColor: "border-blue-400/10",
    hoverBorder: "hover:border-blue-400/25",
    modal: true as const,
  },
  {
    title: "Instagram",
    username: "savanpatelssp",
    description: "Best for: behind-the-scenes and visual updates.",
    href: personal.social.instagram,
    icon: InstagramIcon,
    color: "text-pink-400/70",
    borderColor: "border-pink-400/10",
    hoverBorder: "hover:border-pink-400/25",
  },
  {
    title: "Telegram",
    username: "ABOUTME_SP",
    description: "Best for: direct messaging and quick responses.",
    href: personal.social.telegram,
    icon: TelegramIcon,
    color: "text-cyan-400/70",
    borderColor: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/25",
  },
];

/* ─── FLOW TIMELINE ──────────────────────────────────────────── */

function FlowTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent hidden sm:block" />

      <div className="space-y-0">
        {flowSteps.map((step, i) => (
          <motion.div
            key={step.label}
            className="relative pl-14 sm:pl-16 pb-10 last:pb-0"
            initial={{ opacity: 0, x: -12 }}
            animate={vis ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: FAST,
              delay: i * 0.1,
              ease: ease.out,
            }}
          >
            <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] z-10">
              <span className="text-sm font-mono text-emerald-400/70">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-white/60 mb-1">
                {step.label}
              </h4>
              <p className="text-xs text-white/25 leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────── */

export default function GetInTouchClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ═══ CUSTOM HERO ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(16,185,129,0.06) 0%, transparent 60%)",
            }}
          />
        </div>
        <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.04] px-4 py-2 text-xs font-mono text-emerald-400/60 mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              Recommended Contact Method
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
              Personal Communication
              <br />
              <span className="text-white/40">Assistant</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-white/30 leading-relaxed mb-8">
              The fastest, smartest, and preferred way to connect with Savan
              Patel.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-2 text-xs font-medium text-emerald-400/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400/60 animate-pulse" />
              Available Now
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <motion.div
              className="mt-12"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-5 w-5 text-white/15 mx-auto" />
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ INTRODUCTION ════════════════════════════════════════ */}
      <SectionContainer id="assistant" className="pt-0 sm:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Why this assistant
                <br />
                <span className="text-white/40">exists</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  This is my preferred way to connect. It is designed to make
                  our conversation organized, focused, and personal.
                </p>
                <p>
                  Every genuine inquiry is personally reviewed by me. The
                  assistant helps structure our communication so nothing gets
                  lost or overlooked.
                </p>
                <p>
                  Compared to traditional email, it offers a faster and more
                  engaging experience. You can explore my projects, ask
                  technical questions, discuss collaborations, or simply say
                  hello.
                </p>
                <p>
                  If you are reaching out for the first time, this is the
                  best place to start.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      {/* ═══ WHY CHOOSE ══════════════════════════════════════════ */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Benefits"
            title="Why choose the personal communication assistant?"
            subtitle="A better way to connect — faster, more personal, and built for meaningful conversations."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.08}
          >
            {whyBenefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/[0.06] border border-emerald-500/10 mb-5">
                    <benefit.icon className="h-4 w-4 text-emerald-400/60" />
                  </div>
                  <h3 className="text-base font-medium text-white/60 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                  {benefit.list && (
                    <ul className="space-y-1.5">
                      {benefit.list.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs text-white/25"
                        >
                          <span className="h-1 w-1 rounded-full bg-emerald-400/40 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ═══ WHAT CAN WE TALK ABOUT ══════════════════════════════ */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Topics"
            title="What can we talk about?"
            subtitle="From technical deep dives to career conversations — here are some of the things we can explore together."
          />

          <StaggerFade
            className="flex flex-wrap gap-3 justify-center"
            staggerDelay={0.04}
          >
            {topics.map((topic) => (
              <StaggerItem key={topic.label}>
                <div className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-default">
                  <topic.icon className="h-3.5 w-3.5 text-emerald-400/40 group-hover:text-emerald-400/60 transition-colors duration-300" />
                  {topic.label}
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ═══ PRIMARY CTA ═════════════════════════════════════════ */}
      <SectionContainer className="border-t border-white/[0.04]">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="relative rounded-2xl border border-emerald-500/10 bg-gradient-to-b from-emerald-500/[0.04] to-transparent p-10 sm:p-14 overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 60%)",
                  }}
                />
                <div className="relative z-10">
                  <motion.a
                    href="https://t.me/SAVANPATELSP_BOT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl bg-white px-10 py-5 text-base font-medium text-black hover:bg-white/90 transition-colors duration-200"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring.gentle}
                  >
                    <TelegramIcon className="h-5 w-5" />
                    Open Personal Communication Assistant
                    <ArrowUpRight className="h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </motion.a>
                  <p className="mt-6 text-sm text-white/20">
                    Free · Instant · Personal
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
      </SectionContainer>

      {/* ═══ COMMUNICATION FLOW ══════════════════════════════════ */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="How it works"
            title="Communication flow"
            subtitle="A simple, guided process from your first question to a meaningful conversation."
          />

          <FlowTimeline />
      </SectionContainer>

      {/* ═══ OTHER WAYS TO REACH ME ══════════════════════════════ */}
      <SectionContainer className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-16">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Alternatives
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Other ways to
                <br />
                <span className="text-white/40">reach me</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  The assistant is the recommended starting point. If you
                  prefer a more traditional approach, the methods below are
                  equally available.
                </p>
                <p>
                  The contact form sends a direct message to my inbox, and I
                  personally review every message. Email is always an option
                  but is the slowest method.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <FadeIn className="mb-10">
            <div className="max-w-2xl mx-auto">
              <motion.a
                href="/contact#contact"
                className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 text-center"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mb-5">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <h3 className="text-lg font-medium text-white/70 mb-2">
                  Contact Form
                </h3>
                <p className="text-sm text-white/30 leading-relaxed mb-4">
                  Name, email, and message. Simple, direct, and personal.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                  Open contact form
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </motion.a>
            </div>
          </FadeIn>

          {/* Social Profiles */}
          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
            staggerDelay={0.08}
          >
            {socialProfiles.map((social) => (
              <StaggerItem key={social.title}>
                <motion.a
                  href={"modal" in social ? "#" : social.href}
                  target={"modal" in social ? undefined : "_blank"}
                  rel={"modal" in social ? undefined : "noopener noreferrer"}
                  onClick={"modal" in social ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                  className={`group block rounded-xl border ${social.borderColor} ${social.hoverBorder} bg-white/[0.01] p-6 h-full transition-all duration-300 hover:bg-white/[0.02]`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <social.icon className={`h-4 w-4 ${social.color}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                  <h3 className="text-base font-medium text-white/70 mb-1">
                    {social.title}
                  </h3>
                  {social.username ? (
                    <p className="text-xs text-blue-400/50 font-mono mb-2">
                      @{social.username}
                    </p>
                  ) : (
                    <p className="text-xs text-white/20 italic mb-2">
                      {social.description}
                    </p>
                  )}
                  {social.username && (
                    <p className="text-sm text-white/30">{social.description}</p>
                  )}
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerFade>
          <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

          {/* Email */}
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Also available
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white leading-[0.92] mb-4">
                Email
              </h3>
              <p className="text-sm text-white/30 leading-relaxed mb-6">
                Email is always an option. It is not the fastest method, but
                every email is read and responded to personally.
              </p>
              <motion.a
                href={`mailto:${personal.email}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.gentle}
              >
                <Mail className="h-4 w-4" />
                {personal.email}
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </motion.a>
            </div>
          </FadeIn>
      </SectionContainer>

      {/* ═══ RELATED PAGES ═══════════════════════════════════════ */}
      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Contact",
            description: "The full contact page with form and details.",
            href: "/contact",
          },
          {
            title: "Socials",
            description: "Follow on GitHub, LinkedIn, Instagram, and Telegram.",
            href: "/company/socials",
          },
          {
            title: "About Savan Patel",
            description: "The person behind the code.",
            href: "/founder/about",
          },
          {
            title: "FAQs",
            description: "Answers to the most common questions.",
            href: "/resources/faqs",
          },
          {
            title: "Support",
            description: "Help, resources, and bug reports.",
            href: "/company/support",
          },
          {
            title: "Newsletter",
            description: "Subscribe for curated updates.",
            href: "/company/newsletter",
          },
        ]}
      />
    </>
  );
}
