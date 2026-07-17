"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Calendar,
  Send,
  ArrowUpRight,
  Clock,
  CheckCircle,
  RotateCcw,
  Sparkles,
  MapPin,
  Zap,
  Users,
  Globe,
  Bot,
  Shield,
  Rocket,
  Lightbulb,
  Briefcase,
  GraduationCap,
  BookOpen,
  LayoutGrid,
  Code2,
  HelpCircle,
  Handshake,
  MessageSquare,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, NORMAL, SLOW, FAST } from "@/lib/motion";
import { personal } from "@/data/personal";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { Button } from "@/components/ui/Button";
import { GithubIcon, XIcon, LinkedinIcon, InstagramIcon, TelegramIcon } from "@/components/ui/Icons";
import { SocialModal } from "@/components/ui/SocialModal";
import { SuccessModal } from "@/components/ui/SuccessModal";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

/* ─── DATA ───────────────────────────────────────────────────── */

const socialProfiles = [
  {
    title: "GitHub",
    username: "savanpatelssp",
    description:
      "Open source projects, repositories, and development activity. Follow to see what I am building.",
    href: personal.social.github,
    icon: GithubIcon,
    color: "text-white/70",
    borderColor: "border-white/[0.08]",
    hoverBorder: "hover:border-white/20",
  },
  {
    title: "X",
    username: null,
    description:
      "Official profile launching soon.",
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
    description:
      "Professional profile coming soon.",
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
    description:
      "Behind-the-scenes content, project visuals, and day-to-day updates from the journey.",
    href: personal.social.instagram,
    icon: InstagramIcon,
    color: "text-pink-400/70",
    borderColor: "border-pink-400/10",
    hoverBorder: "hover:border-pink-400/25",
  },
  {
    title: "Telegram",
    username: "ABOUTME_SP",
    description:
      "Direct communication, real-time updates, and community discussions. Join the channel.",
    href: personal.social.telegram,
    icon: TelegramIcon,
    color: "text-cyan-400/70",
    borderColor: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/25",
  },
];

const availabilityItems = [
  {
    label: "Collaborations",
    description: "Open to working on interesting projects together",
    available: true,
  },
  {
    label: "Networking",
    description: "Happy to connect with fellow builders and engineers",
    available: true,
  },
  {
    label: "Learning Opportunities",
    description: "Always open to sharing knowledge and learning from others",
    available: true,
  },
  {
    label: "Response Time",
    description: "Usually within 24–48 hours",
    available: true,
  },
];

const faqItems = [
  {
    question: "What is the best way to reach you?",
    answer:
      "The Personal Communication Assistant (PCA) via Telegram at https://t.me/SAVANPATELSP_BOT is the fastest way to get answers. For direct email, use savan@sp-net.in. The contact form above also goes straight to my inbox. The PCA provides instant responses 24/7.",
  },
  {
    question: "How quickly do you respond?",
    answer:
      "The PCA provides instant responses anytime. For email, I personally review every message and aim to respond within 24–48 hours. For urgent matters, the PCA or Telegram usually gets a faster response.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "I am primarily focused on building SP NET INC products. I am not available for freelance work at this time. For collaboration opportunities, reach out through the PCA or email with specifics.",
  },
  {
    question: "Can I suggest a feature or improvement?",
    answer:
      "Absolutely. I value feedback from users and fellow engineers. Send your suggestions through the PCA, via email, or the contact form — every idea is reviewed personally.",
  },
  {
    question: "Do you offer mentorship or guidance?",
    answer:
      "I am passionate about helping others learn and grow. If you have specific questions about software engineering, product building, or the technical journey, feel free to reach out through the PCA or email.",
  },
];

const pcaBenefits = [
  {
    title: "Faster Communication",
    description:
      "Start conversations instantly without waiting for long email exchanges. Get answers when you need them, in a format that feels natural.",
    icon: Zap,
  },
  {
    title: "Personally Reviewed",
    description:
      "Every genuine inquiry is personally reviewed by me. The assistant helps organize our communication — it never replaces personal interaction.",
    icon: MessageSquare,
  },
  {
    title: "Built for Meaningful Conversations",
    description:
      "Ideal for collaborations, software development, research, business opportunities, internships, portfolio discussions, technology, and general questions.",
    icon: Handshake,
    list: [
      "Collaborations",
      "Software Development",
      "Research",
      "Business Opportunities",
      "Internships",
      "Portfolio Discussions",
      "Technology",
      "General Questions",
    ],
  },
  {
    title: "Available Anytime",
    description:
      "Whether you are a student, developer, recruiter, founder, researcher, or technology enthusiast — you are always welcome to connect.",
    icon: Globe,
  },
];

const pcaTopics = [
  { label: "Software Engineering", icon: Zap },
  { label: "Artificial Intelligence", icon: Bot },
  { label: "Cloud Computing", icon: Globe },
  { label: "Cybersecurity", icon: Shield },
  { label: "Research", icon: Users },
  { label: "Innovation", icon: Lightbulb },
  { label: "SP NET Projects", icon: Rocket },
  { label: "Portfolio", icon: LayoutGrid },
  { label: "Business", icon: Briefcase },
  { label: "Collaborations", icon: Handshake },
  { label: "Internships", icon: GraduationCap },
  { label: "Career Guidance", icon: BookOpen },
  { label: "Open Source", icon: Code2 },
  { label: "Feedback", icon: MessageSquare },
  { label: "General Questions", icon: HelpCircle },
];

const flowSteps = [
  { label: "Start a conversation", description: "Open the assistant and say hello" },
  {
    label: "Share your question or idea",
    description: "Tell me what is on your mind — anything from a project idea to a quick question",
  },
  {
    label: "The assistant helps organize the conversation",
    description: "It structures our discussion so nothing gets lost or overlooked",
  },
  {
    label: "Personally reviewed by me",
    description: "Every genuine inquiry reaches me directly and gets my personal attention",
  },
  {
    label: "Continue the discussion naturally",
    description: "Dive deeper, ask follow-ups, or escalate to email if needed",
  },
];

/* ─── FORM ───────────────────────────────────────────────────── */

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email-c"),
          message: data.get("message"),
        }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.ok) {
        setSent(true);
        form.reset();
        setSuccessModalOpen(true);
      } else {
        setError(body?.error || "Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    const form = formRef.current;
    if (!form) return;
    const name = (form.querySelector<HTMLInputElement>("#name"))?.value;
    const email = (form.querySelector<HTMLInputElement>("#email-c"))?.value;
    const message = (form.querySelector<HTMLTextAreaElement>("#message"))?.value;
    if (name || email || message) {
      if (!window.confirm("Are you sure you want to clear the form?")) return;
    }
    form.reset();
    setError(null);
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 lg:p-8 shadow-2xl">
      <div className="mb-7">
        <h3 className="text-xl font-semibold tracking-tight text-white/80">
          Send a Message
        </h3>
        <p className="mt-2.5 text-sm text-white/30 leading-relaxed">
          Have a question, collaboration idea, or just want to connect? Fill out
          the form below and I will personally review your message.
        </p>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-white/25 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.03] focus:ring-1 focus:ring-blue-500/20 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] transition-all duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="email-c"
                className="block text-xs font-medium text-white/25 mb-1.5"
              >
                Email
              </label>
              <input
                id="email-c"
                name="email-c"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.03] focus:ring-1 focus:ring-blue-500/20 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] transition-all duration-300"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-white/25 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/30 focus:bg-white/[0.03] focus:ring-1 focus:ring-blue-500/20 focus:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] transition-all duration-300 resize-none"
            />
          </div>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Button
              type="submit"
              variant="primary"
              disabled={sending || sent}
            >
              <span className="inline-flex items-center gap-1.5">
                <AnimatePresence mode="wait">
                  {sending ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      Sending
                      <motion.span
                        className="inline-block h-3 w-3 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="inline-flex items-center gap-1.5"
                    >
                      Send message
                      <Send className="h-3.5 w-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={sending || sent}
              onClick={handleReset}
            >
              <span className="inline-flex items-center gap-1.5">
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </span>
            </Button>
          </div>
          {error && (
            <p className="text-xs text-red-400/70" role="alert">
              {error}
            </p>
          )}
          <div className="sr-only" role="status" aria-live="polite">
            {sent && "Message sent successfully. I will get back to you soon."}
          </div>
        </div>
      </form>
      <SuccessModal
        isOpen={successModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
          setSent(false);
        }}
        onSendAnother={() => {
          setSent(false);
        }}
      />
    </div>
  );
}

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

export default function ContactClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Connect", href: "/get-in-touch" },
          { label: "Contact" },
        ]}
        label="Connect"
        title="Contact"
        titleAccent="Get in touch"
        description="I am always happy to connect. Whether it is about technology, software engineering, collaborations, research, or simply a meaningful conversation — reach out anytime."
        icon={<Mail className="h-4 w-4" />}
      />

      {/* ─── PERSONAL COMMUNICATION ASSISTANT ─────────────────── */}
      <SectionContainer id="assistant" className="!pt-16 sm:!pt-20">
          {/* ─── HERO CARD ────────────────────────────────────── */}
          <FadeIn>
            <div className="relative rounded-2xl border border-emerald-500/10 bg-gradient-to-b from-emerald-500/[0.04] to-transparent p-8 sm:p-10 lg:p-14 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "radial-gradient(ellipse at center top, rgba(16,185,129,0.08) 0%, transparent 60%)",
                }}
              />
              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/[0.04] px-4 py-2 text-xs font-mono text-emerald-400/60 mb-8">
                  <Sparkles className="h-3.5 w-3.5" />
                  Recommended Contact Method
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
                  Personal Communication
                  <br />
                  <span className="text-white/40">Assistant</span>
                </h2>
                <p className="mx-auto max-w-2xl text-sm sm:text-base text-white/30 leading-relaxed mb-10">
                  The fastest, smartest, and preferred way to connect with me.
                  This is not a generic contact form — it is a dedicated
                  communication channel built to make our conversation
                  organized, focused, and personal. Every genuine inquiry is
                  reviewed by me directly.
                </p>
                <div className="flex items-center justify-center gap-3 text-white/20 mb-10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400/60" />
                  </div>
                  <span className="text-sm">Available now on Telegram</span>
                </div>
                <motion.a
                  href="https://t.me/SAVANPATELSP_BOT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium text-black hover:bg-white/90 transition-colors duration-200"
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring.gentle}
                >
                  <TelegramIcon className="h-5 w-5 shrink-0" />
                  <span className="hidden sm:inline">Open Personal Communication Assistant</span>
                  <span className="sm:hidden">Open Assistant</span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </motion.a>
                <p className="mt-5 text-xs text-white/15">
                  Free · Instant · Personal
                </p>
              </div>
            </div>
          </FadeIn>

          {/* ─── INTRODUCTION ─────────────────────────────────── */}
          <div className="mt-24 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-start">
              <FadeIn>
                <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                  Why this exists
                </span>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                  A better way to
                  <br />
                  <span className="text-white/40">start a conversation</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                  <p>
                    I built the Personal Communication Assistant because
                    traditional email often feels slow and unstructured. I
                    wanted a way for people to reach me that feels natural —
                    something faster than email, more personal than a form, and
                    organized enough that nothing important gets buried.
                  </p>
                  <p>
                    This is my preferred way to connect. Compared to email, it
                    offers a more immediate and engaging experience. You can
                    explore my projects, ask technical questions, discuss
                    collaborations, or simply say hello — all in a guided
                    conversation that keeps things focused.
                  </p>
                  <p>
                    Every message I receive is read and considered personally.
                    The assistant helps structure our communication so nothing
                    gets lost or overlooked, which lets me give each inquiry
                    the attention it deserves while balancing ongoing projects
                    and commitments.
                  </p>
                  <p>
                    If you are reaching out for the first time, this is the
                    best place to start. It helps me understand your intent
                    quickly and respond with the right context — whether that
                    is a detailed discussion, a quick answer, or an
                    introduction to the right resource.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* ─── WHY CHOOSE ──────────────────────────────────── */}
          <div className="mt-24 sm:mt-32 border-t border-white/[0.04] pt-24 sm:pt-32">
            <SectionTitle
              label="Benefits"
              title="Why choose the personal communication assistant?"
              subtitle="A better way to connect — faster, more personal, and built for meaningful conversations."
            />

            <StaggerFade
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              staggerDelay={0.08}
            >
              {pcaBenefits.map((benefit) => (
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
          </div>

          {/* ─── WHAT CAN WE TALK ABOUT ──────────────────────── */}
          <div className="mt-24 sm:mt-32 border-t border-white/[0.04] pt-24 sm:pt-32">
            <SectionTitle
              label="Topics"
              title="What can we talk about?"
              subtitle="From technical deep dives to career conversations — here are some of the things we can explore together."
            />

            <StaggerFade
              className="flex flex-wrap gap-3 justify-center"
              staggerDelay={0.04}
            >
              {pcaTopics.map((topic) => (
                <StaggerItem key={topic.label}>
                  <div className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-5 py-2.5 text-sm text-white/40 hover:text-white/60 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 cursor-default">
                    <topic.icon className="h-3.5 w-3.5 text-emerald-400/40 group-hover:text-emerald-400/60 transition-colors duration-300" />
                    {topic.label}
                  </div>
                </StaggerItem>
              ))}
            </StaggerFade>
          </div>

          {/* ─── WHAT HAPPENS NEXT ────────────────────────────── */}
          <div className="mt-24 sm:mt-32 border-t border-white/[0.04] pt-24 sm:pt-32">
            <SectionTitle
              label="Process"
              title="What happens next?"
              subtitle="A simple, guided process from your first message to a meaningful conversation."
            />

            <FlowTimeline />
          </div>
      </SectionContainer>

      {/* ─── ABOUT CONTACTING ME ──────────────────────────────── */}
      <SectionContainer id="about" className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Introduction
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                I&apos;d love to
                <br />
                <span className="text-white/40">hear from you</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  Every message I receive is read and considered personally. I
                  do not use automated responses or ticketing systems — you
                  get a real reply from me, the person building the products
                  and writing the code.
                </p>
                <p>
                  Whether you have a project idea, want to collaborate on
                  something interesting, are looking for guidance, or just
                  want to say hello — I am all ears. The easiest way to reach
                  me is through the form below or by sending an email directly.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      {/* ─── PRIMARY CONTACT ──────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Contact"
            title="Reach me directly"
            subtitle="My personal contact information. Every channel is monitored and responded to personally."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            staggerDelay={0.06}
          >
            <StaggerItem>
              <motion.a
                href={`mailto:${personal.email}`}
                className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 h-full"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="inline-flex items-center justify-center rounded-lg border border-blue-400/10 p-2.5">
                    <Mail className="h-5 w-5 text-blue-400/70" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Email
                </h3>
                <p className="text-sm text-blue-400/50 font-mono mb-3">
                  {personal.email}
                </p>
                <p className="text-sm text-white/30 leading-relaxed">
                  The best way to reach me directly. I respond to every email
                  personally within 24–48 hours.
                </p>
              </motion.a>
            </StaggerItem>

            <StaggerItem>
              <motion.a
                href={personal.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 h-full"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="inline-flex items-center justify-center rounded-lg border border-violet-400/10 p-2.5">
                    <Calendar className="h-5 w-5 text-violet-400/70" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Schedule a Call
                </h3>
                <p className="text-sm text-violet-400/50 font-mono mb-3">
                  cal.com/savanpatel
                </p>
                <p className="text-sm text-white/30 leading-relaxed">
                  Book a time slot that works for you. Perfect for deeper
                  conversations about projects or collaboration.
                </p>
              </motion.a>
            </StaggerItem>

            <StaggerItem>
              <motion.a
                href={personal.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 h-full"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="inline-flex items-center justify-center rounded-lg border border-cyan-400/10 p-2.5">
                    <TelegramIcon className="h-5 w-5 text-cyan-400/70" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Telegram
                </h3>
                <p className="text-sm text-cyan-400/50 font-mono mb-3">
                  @ABOUTME_SP
                </p>
                <p className="text-sm text-white/30 leading-relaxed">
                  For quick, direct communication. Great for real-time
                  conversations and faster responses.
                </p>
              </motion.a>
            </StaggerItem>
          </StaggerFade>
      </SectionContainer>

      {/* ─── PROFESSIONAL PROFILES ────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Profiles"
            title="Find me online"
            subtitle="Follow or connect on the platforms where I am most active."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            staggerDelay={0.08}
          >
            {socialProfiles.map((social) => (
              <StaggerItem key={social.title}>
                <motion.a
                  href={"modal" in social ? "#" : social.href}
                  target={"modal" in social ? undefined : "_blank"}
                  rel={"modal" in social ? undefined : "noopener noreferrer"}
                  onClick={"modal" in social ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                  className={`group block rounded-xl border ${social.borderColor} ${social.hoverBorder} bg-white/[0.01] p-6 sm:p-8 h-full transition-all duration-300 hover:bg-white/[0.02]`}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <social.icon className={`h-5 w-5 ${social.color}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>

                  <h3 className="text-lg font-medium text-white/70 mb-1">
                    {social.title}
                  </h3>
                  {social.username ? (
                    <p className="text-sm text-blue-400/50 font-mono mb-3">
                      @{social.username}
                    </p>
                  ) : (
                    <p className="text-sm text-white/20 italic mb-3">
                      {social.description}
                    </p>
                  )}
                  <p className="text-sm text-white/30 leading-relaxed">
                    {social.username ? social.description : ""}
                  </p>
                </motion.a>
              </StaggerItem>
            ))}
          </StaggerFade>
          <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </SectionContainer>

      {/* ─── CONTACT FORM ─────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Message
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Send me a
                <br />
                <span className="text-white/40">message</span>
              </h2>
              <div className="mt-6 space-y-4 text-sm text-white/30 leading-relaxed">
                <p>
                  Fill out the form and your message goes directly to my
                  inbox. No middlemen, no ticketing systems — just a
                  straightforward conversation between you and me.
                </p>
                <div className="flex items-center gap-3 text-white/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <span>India · {personal.madeIn}</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ContactForm />
            </FadeIn>
          </div>
      </SectionContainer>

      {/* ─── AVAILABILITY ─────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Availability"
            title="Current status"
            subtitle="A quick overview of what I am open to right now."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            staggerDelay={0.06}
          >
            {availabilityItems.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400/60" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white/60">
                      {item.label}
                    </h4>
                    <p className="text-xs text-white/25 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Questions"
            title="Frequently asked questions"
            subtitle="Common questions about reaching out and working together."
          />

          <div className="mx-auto max-w-2xl">
            <FAQ title="" items={faqItems} />
          </div>
      </SectionContainer>

      {/* ─── RELATED PAGES ────────────────────────────────────── */}
      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "About Savan Patel",
            description:
              "The person behind the code — background, journey, and vision.",
            href: "/founder/about",
          },
          {
            title: "Socials",
            description:
              "Follow on GitHub, LinkedIn, Instagram, and Telegram.",
            href: "/company/socials",
          },
          {
            title: "Open Source",
            description:
              "The long-term vision for open source at SP NET INC.",
            href: "/resources/open-source",
          },
          {
            title: "Blog",
            description:
              "Engineering insights and technical deep dives.",
            href: "/resources/blog",
          },
          {
            title: "Projects",
            description:
              "Explore the products and projects being built.",
            href: "/explore/projects",
          },
          {
            title: "Philosophy",
            description:
              "The principles and thinking behind the work.",
            href: "/founder/philosophy",
          },
        ]}
      />

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <CTASection
        title="Let us"
        titleAccent="connect"
        description="Every great conversation starts with a simple hello. I am looking forward to hearing from you."
        primaryAction={{
          label: "Send an email",
          href: `mailto:${personal.email}`,
        }}
        secondaryAction={{
          label: "Schedule a call",
          href: personal.calendar,
        }}
      />
    </>
  );
}
