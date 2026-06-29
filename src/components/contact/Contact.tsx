"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Calendar, Send, Sparkles, MapPin } from "lucide-react";
import { SectionContainer, FadeIn, SectionTitle, BlurReveal } from "@/components/ui/AnimationPrimitives";
import { Button } from "@/components/ui/Button";
import { GithubIcon, XIcon, LinkedinIcon } from "@/components/ui/Icons";
import { personal } from "@/data/personal";

const socials = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: XIcon, href: personal.social.x, label: "X" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setSending(true);
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
        setTimeout(() => setSent(false), 2500);
      }
    } finally {
      setSending(false);
    }
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

      <div ref={ref} className="grid gap-6 lg:grid-cols-5 lg:gap-8">
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
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/25 hover:text-white/60 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-200"
                    aria-label={s.label}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </FadeIn>
        </div>

        <BlurReveal delay={0.1} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
          >
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-white/20 mb-1.5">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email-c" className="block text-xs font-medium text-white/20 mb-1.5">
                    Email
                  </label>
                  <input
                    id="email-c"
                    name="email-c"
                    type="email"
                    required
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-white/20 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder-white/15 focus:outline-none focus:border-white/20 focus:bg-white/[0.03] transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <div className="flex items-center gap-4">
                <Button type="submit" variant="primary" disabled={sending || sent}>
                  {sending ? "Sending..." : sent ? "Sent!" : "Send message"}
                  <Send className="h-3.5 w-3.5" />
                </Button>
                <span className="text-xs text-white/15">Typically responds within 24h</span>
              </div>
            </div>
          </form>
        </BlurReveal>
      </div>
    </SectionContainer>
  );
}
