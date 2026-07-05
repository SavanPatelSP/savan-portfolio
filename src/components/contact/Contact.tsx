"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Calendar, Send, Sparkles, MapPin, RotateCcw, MessageCircle, Check, ShieldCheck, Award } from "lucide-react";
import { SectionContainer, FadeIn, SectionTitle, BlurReveal } from "@/components/ui/AnimationPrimitives";
import { Button } from "@/components/ui/Button";
import { GithubIcon, XIcon, LinkedinIcon, TelegramIcon, InstagramIcon } from "@/components/ui/Icons";
import { SocialModal } from "@/components/ui/SocialModal";
import { personal } from "@/data/personal";

const socials = [
  { icon: TelegramIcon, href: personal.social.telegram, label: "Telegram" },
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: InstagramIcon, href: personal.social.instagram, label: "Instagram" },
  { icon: XIcon, href: personal.social.x, label: "X", modal: true as const },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn", modal: true as const },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSending(true);
    setError(false);
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
      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 3000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
    setError(false);
  };

  return (
    <SectionContainer id="contact" className="bg-black relative">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />

      {/* Glass background elements */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/[0.02] blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/[0.02] blur-[100px]" aria-hidden="true" />

      <SectionTitle
        label="Contact"
        title="Let's build something"
        subtitle="Whether you have a project in mind or just want to say hello, I'd love to hear from you."
      />

      <div className="mb-8 lg:mb-10">
        <FadeIn delay={0.05}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
              <Sparkles className="h-3 w-3" />
              Recommended Contact Method
            </span>
            <h3 className="text-xl font-semibold tracking-tight text-white/80 flex items-center gap-3 flex-wrap">
              <MessageCircle className="h-5 w-5 text-white/40" />
              Personal Communication Assistant
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-amber-400/80 shadow-[0_0_12px_-4px_rgba(217,119,6,0.15)]">
                <Award className="h-3 w-3" />
                SP&apos;s Recommended
              </span>
            </h3>
            <div className="mt-4 space-y-3">
              <p className="text-sm text-white/30 leading-relaxed">
                Looking for the quickest and most convenient way to reach me?
              </p>
              <p className="text-sm text-white/30 leading-relaxed">
                My Personal Communication Assistant is designed to streamline communication while ensuring every genuine inquiry receives my personal attention.
              </p>
              <p className="text-sm text-white/30 leading-relaxed">
                Whether you&apos;re reaching out about collaborations, internships, software development, SP NET, business opportunities, open-source contributions, or simply want to connect, this is the recommended place to start.
              </p>
              <p className="text-sm text-white/30 leading-relaxed">
                The assistant helps organize conversations efficiently, allowing me to review and respond as quickly as possible while managing academic commitments and ongoing projects.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { title: "Direct message delivery", desc: "Your inquiry is delivered immediately through my dedicated communication channel." },
                { title: "Personally reviewed", desc: "Every genuine message is personally reviewed by me." },
                { title: "Professional conversations", desc: "Perfect for collaborations, internships, project discussions, business inquiries, and technical conversations." },
                { title: "Available anytime", desc: "You can start a conversation whenever it's convenient for you." },
              ].map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] mt-0.5">
                    <Check className="h-3 w-3 text-white/40" strokeWidth={2.5} />
                  </span>
                  <div>
                    <span className="text-sm text-white/60">{f.title}</span>
                    <p className="text-xs text-white/25 mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 mb-8 flex justify-center">
              <Button variant="primary" href="https://t.me/SAVANPATELSP_BOT" external>
                <span className="inline-flex items-center gap-1.5">
                  <TelegramIcon className="h-4 w-4" />
                  Open Personal Communication Assistant
                </span>
              </Button>
            </div>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/40">
                <ShieldCheck className="h-3.5 w-3.5" />
                Privacy &amp; Respect
              </span>
              <p className="mt-1.5 text-xs text-white/20 leading-relaxed">
                Your privacy matters. Messages sent through my Personal Communication Assistant are intended solely for communication regarding projects, collaborations, internships, professional opportunities, and general inquiries. Please avoid sending sensitive personal information.
              </p>
            </div>
            <div className="mt-8 text-center">
              <span className="text-sm text-white/15">— or —</span>
              <p className="mt-3 text-sm text-white/30">Prefer email instead? You can also reach me by completing the contact form below.</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <div ref={sectionRef} className="grid gap-6 lg:grid-cols-5 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
          <FadeIn delay={0.1}>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5 hover:bg-white/[0.05] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02]">
                  <Mail className="h-4 w-4 text-white/40" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-white/20 uppercase tracking-wider">Email</div>
                  <a href={`mailto:${personal.email}`} className="text-sm text-white/50 hover:text-white transition-colors">
                    {personal.email}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5 hover:bg-white/[0.05] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02]">
                  <Calendar className="h-4 w-4 text-white/40" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-white/20 uppercase tracking-wider">Calendar</div>
                  <a href={personal.calendar} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">
                    Schedule a call
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-5 hover:bg-white/[0.05] transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02]">
                  <Sparkles className="h-4 w-4 text-emerald-400/60" />
                </div>
                <div>
                  <div className="text-[11px] font-medium text-white/20 uppercase tracking-wider">Status</div>
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
                    Available for new projects
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                const isModal = "modal" in s;
                return (
                  <a
                    key={s.label}
                    href={isModal ? "#" : s.href}
                    target={isModal ? undefined : "_blank"}
                    rel={isModal ? undefined : "noopener noreferrer"}
                    onClick={isModal ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/25 hover:text-white/60 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
                    aria-label={s.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
              <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </div>
          </FadeIn>
        </div>

        <BlurReveal delay={0.1} className="lg:col-span-3">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
            <div className="mb-7">
              <h3 className="text-xl font-semibold tracking-tight text-white/80">
                Send a Message
              </h3>
              <p className="mt-2.5 text-sm text-white/30 leading-relaxed">
                Have a question, collaboration idea, internship opportunity, business inquiry, or just want to connect? Fill out the form below and I&apos;ll personally review your message as soon as possible.
              </p>
            </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
          >
              <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-white/25 mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? "form-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] focus:ring-1 focus:ring-white/10 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email-c" className="block text-xs font-medium text-white/25 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email-c"
                    name="email-c"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? "form-error" : undefined}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] focus:ring-1 focus:ring-white/10 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-white/25 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  aria-required="true"
                  aria-invalid={error ? "true" : undefined}
                  aria-describedby={error ? "form-error" : undefined}
                  rows={4}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] focus:ring-1 focus:ring-white/10 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button type="submit" variant="primary" disabled={sending || sent}>
                  <span className="inline-flex items-center gap-1.5">
                    {sending ? "Sending" : sent ? "Sent!" : "Send message"}
                    <Send className={`h-3.5 w-3.5 ${sending ? "animate-pulse-soft" : ""}`} />
                  </span>
                </Button>
                <Button type="button" variant="secondary" disabled={sending || sent} onClick={handleReset}>
                  <span className="inline-flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </span>
                </Button>
              </div>
              {error && (
                <p id="form-error" className="text-xs text-red-400/70" role="alert">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
              <div className="mt-14 text-center">
                <div className="relative max-w-lg mx-auto">
                  <div className="absolute -top-11 left-0 text-7xl text-white/[0.04] leading-none select-none pointer-events-none" aria-hidden="true">&ldquo;</div>
                  <div className="space-y-4 pt-5">
                    <p className="text-sm text-white/20 leading-relaxed">
                      Every conversation begins with a simple hello.
                    </p>
                    <p className="text-sm text-white/20 leading-relaxed">
                      Whether it&apos;s an exciting project, a collaboration, an internship opportunity, or simply sharing ideas, I&apos;m always happy to connect with people who are passionate about building great things.
                    </p>
                    <p className="text-sm text-white/20 leading-relaxed">
                      I personally review every genuine message and look forward to hearing from you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
          </div>
        </BlurReveal>
      </div>
    </SectionContainer>
  );
}
