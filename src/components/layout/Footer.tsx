"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Building2, ChevronDown, Code, Cpu, ExternalLink, Mail, MessageSquare, Rocket, Settings, Terminal, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon, InstagramIcon } from "@/components/ui/Icons";
import { SocialModal } from "@/components/ui/SocialModal";
import { personal } from "@/data/personal";
import { products, futureProducts } from "@/data/products";
import { cn } from "@/lib/utils";

/* ─── DATA ───────────────────────────────────────────────────── */

const navGroups = [
  {
    title: "Products",
    links: [
      ...products.map((p) => ({ label: p.name, href: "#products" })),
      ...futureProducts.slice(0, 1).map((p) => ({ label: `${p.name} (Soon)`, href: "#products" })),
    ],
  },
  {
    title: "Founder",
    links: [
      { label: "About", href: "#founder" },
      { label: "Journey", href: "#journey" },
      { label: "Engineering Philosophy", href: "#expertise" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Organization", href: "#organization" },
      { label: "Expertise", href: "#technologies" },
      { label: "Technologies", href: "#technologies" },
      { label: "Development", href: "#roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: personal.social.github },
      { label: "Open Source", href: personal.social.github },
      { label: "Blog (Coming Soon)", href: "#" },
      { label: "Media Kit (Coming Soon)", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: `mailto:${personal.email}` },
      { label: "Telegram", href: personal.social.telegram },
      { label: "Instagram", href: personal.social.instagram },
      { label: "LinkedIn", href: personal.social.linkedin, modal: true as const },
      { label: "GitHub", href: personal.social.github },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const journeyMilestones = [
  { year: "2018", label: "First Line of Code", description: "Curiosity became a passion.", status: "STARTED", icon: Terminal },
  { year: "2022", label: "SP NET INC Founded", description: "One idea became a vision.", status: "FOUNDED", icon: Building2 },
  { year: "2023", label: "SP NET GRAM", description: "Building a next-generation communication platform.", status: "BUILDING", icon: MessageSquare },
  { year: "2024", label: "SP NET ADMIN OS", description: "Creating enterprise tools for modern organizations.", status: "EXPANDING", icon: Settings },
  { year: "Present", label: "SP NET AI", description: "Exploring intelligent experiences powered by AI.", status: "INNOVATING", icon: Cpu },
  { year: "Future", label: "Beyond Limits", description: "Building technology that connects millions.", status: "BEYOND LIMITS", icon: Rocket },
];

const quickStats = [
  { value: "2018", label: "Coding Journey Started" },
  { value: "3+", label: "Products In Development" },
  { value: "1", label: "Technology Ecosystem" },
  { value: "∞", label: "Vision Beyond Limits" },
];

const techBadges = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Framer Motion", "Node.js", "PostgreSQL", "Prisma",
];

const socialCards = [
  { icon: TelegramIcon, label: "Telegram", href: personal.social.telegram, desc: "Direct messaging" },
  { icon: GithubIcon, label: "GitHub", href: personal.social.github, desc: "Open source & code" },
  { icon: InstagramIcon, label: "Instagram", href: personal.social.instagram, desc: "Visual updates" },
  { icon: LinkedinIcon, label: "LinkedIn", href: personal.social.linkedin, desc: "Professional network", modal: true as const },
  { icon: Mail, label: "Email", href: `mailto:${personal.email}`, desc: "Get in touch" },
];

/* ─── FADE IN ───────────────────────────────────────────────── */

function FadeSection({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={vis ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────── */

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#050505" }}>
      <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-96 opacity-[0.04] blur-[80px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }} />
      </div>
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══ TOP CTA ═══ */}
        <FadeSection className="pt-28 sm:pt-36 pb-20 sm:pb-24 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.92]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Ready to Build the
            <br />
            <span className="text-white/60">Future Together?</span>
          </motion.h2>
          <motion.p
            className="mt-6 mx-auto max-w-lg text-base text-white/20 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Building products that connect people, empower communities, and shape the future through SP NET INC.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-white/70 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300">
              Get In Touch
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <a href="#products" className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-white/30 hover:text-white/50 hover:border-white/12 transition-all duration-300">
              Explore My Work
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </motion.div>
        </FadeSection>

        {/* ═══ MAIN CONTENT GRID ═══ */}
        <div className="py-20 sm:py-24 flex flex-col lg:flex-row gap-16 lg:gap-20 border-t border-white/[0.04]">
          {/* ─── FOUNDER BRAND ─── */}
          <div className="lg:w-[420px] shrink-0">
            <FadeSection delay={0.1}>
              <div className="flex items-center gap-4 mb-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/[0.06] overflow-hidden shrink-0">
                  <img src="/logo.jpg" alt={personal.name} className="object-cover w-full h-full" />
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/90 leading-[1.1]">{personal.name}</h3>
                  <p className="text-xs text-white/30 mt-1.5">Founder &bull; Software Engineer &bull; Product Builder</p>
                </div>
              </div>
              <p className="text-base text-white/35 leading-relaxed">
                Building the next generation of digital experiences through thoughtful engineering, purposeful design, and ambitious ideas.
              </p>
              <p className="text-sm text-white/20 leading-relaxed mt-4">
                Founder of {personal.company}. Creating products that connect people, empower communities, and inspire what&apos;s next.
              </p>
              <div className="mt-8 border-l border-white/[0.06] pl-4">
                <p className="text-sm text-white/15 italic leading-relaxed">&ldquo;{personal.mission}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-white/20 font-medium">&mdash; {personal.name}</span>
                  <span className="text-[10px] text-white/10">Founder, {personal.company}</span>
                </div>
              </div>
              <div className="mt-6 flex gap-2.5">
                {socialCards.slice(0, 3).map((s) => {
                  const Icon = s.icon;
                  const isModal = "modal" in s;
                  return (
                    <a key={s.label} href={isModal ? "#" : s.href} target={isModal ? undefined : "_blank"} rel={isModal ? undefined : "noopener noreferrer"}
                      onClick={isModal ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] text-white/25 hover:text-white/60 hover:border-white/12 transition-all duration-200"
                      aria-label={s.label}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  );
                })}
              </div>
            </FadeSection>
          </div>

          {/* ─── NAVIGATION ─── */}
          <FadeSection delay={0.3} className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-4">{group.title}</h4>
                  <ul className="list-none p-0 m-0 space-y-2.5">
                    {group.links.map((link) => {
                      const navIsModal = "modal" in link;
                      return (
                      <li key={link.label}>
                        <a
                          href={navIsModal ? "#" : link.href}
                          target={navIsModal ? undefined : (link.href.startsWith("http") ? "_blank" : undefined)}
                          rel={navIsModal ? undefined : (link.href.startsWith("http") ? "noopener noreferrer" : undefined)}
                          onClick={navIsModal ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                          className="group/link inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors duration-200"
                        >
                          <span className="h-px w-0 group-hover/link:w-2 bg-white/30 transition-all duration-200" />
                          {link.label}
                          {link.href.startsWith("http") && !navIsModal && <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-60 transition-opacity duration-200" />}
                        </a>
                      </li>
                    );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>

        {/* ═══ CODING JOURNEY ═══ */}
        <FadeSection delay={0.1} className="py-20 sm:py-24 border-t border-white/[0.04]">
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">The Journey</span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">From Curiosity to Creation</h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <PremiumTimeline milestones={journeyMilestones} />
          </div>
        </FadeSection>

        {/* ═══ QUICK STATS + BADGES ═══ */}
        <FadeSection delay={0.15} className="py-20 sm:py-24 border-t border-white/[0.04]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {quickStats.map((s, i) => (
              <div key={s.label} className="text-center">
                <motion.span
                  className="block text-3xl sm:text-4xl font-semibold tracking-tight text-white/90"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {s.value}
                </motion.span>
                <span className="text-xs text-white/20 mt-1.5 block">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {techBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.04] text-[11px] text-white/15 font-mono">
                <Code className="h-2.5 w-2.5 text-white/15" />
                {badge}
              </span>
            ))}
          </div>
        </FadeSection>

        {/* ═══ NEWSLETTER + SOCIAL CARDS ═══ */}
        <div className="py-20 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-white/[0.04]">
          <FadeSection delay={0.1}>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-3" id="newsletter-heading">Future Updates</h4>
            <p className="text-sm text-white/30 mb-5">Launching Soon</p>
            <div className="flex items-center gap-2">
              <input type="email" placeholder="your@email.com" disabled aria-labelledby="newsletter-heading"
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-white/30 placeholder-white/10 focus:outline-none transition-all backdrop-blur-sm"
              />
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-white/20 backdrop-blur-sm">
                Notify Me
              </span>
            </div>
            <p className="text-[11px] text-white/10 mt-2 font-mono">Coming Soon</p>
          </FadeSection>

          <FadeSection delay={0.2}>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-4">Connect</h4>
            <div className="grid grid-cols-3 gap-3">
              {socialCards.map((s) => {
                const Icon = s.icon;
                const isModal = "modal" in s;
                return (
                  <a key={s.label} href={isModal ? "#" : s.href} target={isModal ? undefined : "_blank"} rel={isModal ? undefined : "noopener noreferrer"}
                    onClick={isModal ? (e) => { e.preventDefault(); setModalOpen(true); } : undefined}
                    className="group/social rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center transition-all duration-300 backdrop-blur-sm hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <Icon className="h-5 w-5 mx-auto text-white/20 group-hover/social:text-white/50 group-hover/social:scale-105 transition-all duration-300" />
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <p className="text-xs font-medium text-white/30 group-hover/social:text-white/50 transition-colors duration-300">{s.label}</p>
                    </div>
                    <p className="text-[9px] text-white/10 mt-0.5">{s.desc}</p>
                  </a>
                );
              })}
            </div>
          </FadeSection>
        </div>

        {/* ═══ FOUNDER SIGNATURE ═══ */}
        <FadeSection delay={0.1} className="py-16 sm:py-20 text-center border-t border-white/[0.04]">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-8 bg-white/[0.04]" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/10 uppercase">{personal.tagline}</span>
            <div className="h-px w-8 bg-white/[0.04]" />
          </div>

          <p className="text-xs text-white/15 mb-4">Designed and engineered by</p>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/80">
            {personal.name}
          </h3>
          <p className="text-sm text-white/25 mt-1">Founder of {personal.company}</p>

          <p className="text-sm text-white/20 mt-6 italic font-light max-w-sm mx-auto">
            &ldquo;Creating technology that empowers people, strengthens communities, and shapes tomorrow.&rdquo;
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[10px] text-white/12 font-mono tracking-wider">{personal.tagline}</span>
              <span className="text-[10px] text-white/6">·</span>
              <span className="text-[10px] text-white/12 font-mono tracking-wider">Made in {personal.madeIn}</span>
              <span className="text-[10px] text-white/6">·</span>
              <span className="text-[10px] text-white/12 font-mono tracking-wider">Since 2018</span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group/scroll inline-flex items-center gap-2 rounded-xl border border-white/[0.04] px-5 py-3 text-xs text-white/15 hover:text-white/30 hover:border-white/10 transition-all duration-300"
            >
              <Zap className="h-3 w-3" />
              Back to top
              <ChevronDown className="h-3 w-3 rotate-180 group-hover/scroll:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </div>
        </FadeSection>

        {/* ═══ COPYRIGHT BOTTOM BAR ═══ */}
        <FadeSection delay={0.15}>
          <div className="border-t border-white/[0.03] py-6 sm:py-8 mt-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <p className="text-xs text-white/12 hover:text-white/20 transition-colors duration-300">
                &copy; {new Date().getFullYear()} {personal.name}. All Rights Reserved.
              </p>
              <div className="flex items-center gap-3 text-[10px] text-white/10">
                <span>Designed and engineered by {personal.name}</span>
                <span className="hidden sm:inline text-white/6">·</span>
                <span className="hidden sm:inline">Founder of {personal.company}</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/8 uppercase">{personal.tagline}</span>
            </div>
          </div>
        </FadeSection>
      </div>
    </footer>
  );
}

/* ─── PREMIUM TIMELINE ──────────────────────────────────────── */

function PremiumTimeline({ milestones }: { milestones: typeof journeyMilestones }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="relative max-w-3xl mx-auto">
      <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-transparent -translate-x-1/2" aria-hidden="true" />

      <div className="relative z-[1]">
        {milestones.map((m, i) => {
          const Icon = m.icon;
          const isLeft = i % 2 === 0;
          return (
            <div key={m.year} className="relative pb-12 last:pb-0">
              <div className="flex items-start gap-5 sm:block">
                {/* Mobile: node + content side by side. Desktop: absolute centered node. */}
                <div className="shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0">
                  <motion.div
                    className="flex items-center justify-center h-8 w-8 rounded-full border border-white/[0.08] bg-white/[0.02]"
                    initial={{ scale: 0 }}
                    animate={vis ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, damping: 16, delay: i * 0.1 }}
                  >
                    <Icon className="h-3.5 w-3.5 text-white/30" />
                  </motion.div>
                </div>
                <motion.div
                  className={cn("min-w-0 flex-1 sm:w-1/2", isLeft ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8")}
                  initial={{ opacity: 0, y: 12 }}
                  animate={vis ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className={cn("rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 sm:p-5", isLeft ? "sm:text-right" : "sm:text-left", "text-left")}>
                    <div className={cn("flex items-center gap-3 mb-1.5", isLeft && "sm:justify-end")}>
                      <span className="text-[10px] font-mono tracking-wider text-white/25">{m.year}</span>
                      <span className="text-[8px] font-mono tracking-[0.15em] text-white/10 uppercase">{m.status}</span>
                    </div>
                    <h4 className="text-sm text-white/50 font-medium">{m.label}</h4>
                    <p className="text-xs text-white/20 mt-1 leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <motion.div
        className="mt-14 text-center"
        initial={{ opacity: 0 }}
        animate={vis ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="h-px max-w-xs mx-auto bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mb-6" />
        <p className="text-sm text-white/12 italic leading-relaxed max-w-md mx-auto">
          &ldquo;Lead with purpose. Build with passion. Connect beyond limits.&rdquo;
        </p>
        <div className="mt-3">
          <span className="text-xs text-white/15 font-medium">&mdash; {personal.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
