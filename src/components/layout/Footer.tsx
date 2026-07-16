"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Building2, ChevronDown, Code, Cpu, ExternalLink, MessageSquare, Rocket, Settings, Terminal, Zap } from "lucide-react";
import Image from "next/image";
import { personal } from "@/data/personal";

import { cn } from "@/lib/utils";
import { ease, spring, SLOW, NORMAL, FAST } from "@/lib/motion";

/* ─── DATA ───────────────────────────────────────────────────── */

const navGroups = [
  {
    title: "Company",
    links: [
      { label: "About SP NET INC", href: "/company/about" },
      { label: "Mission & Vision", href: "/company/mission" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Partners", href: "/company/partners" },
      { label: "Careers", href: "/company/careers" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "SP NET GRAM", href: "/products/sp-net-gram" },
      { label: "SP NET ADMIN OS", href: "/products/sp-net-admin-os" },
      { label: "SP NET AI", href: "/products/sp-net-ai" },
      { label: "Savan's Portfolio", href: "/" },
      { label: "SP NET API", href: "/products/sp-net-api" },
      { label: "View All Products →", href: "/products" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Artificial Intelligence", href: "/research/ai" },
      { label: "Cloud Computing", href: "/research/cloud" },
      { label: "Cybersecurity", href: "/research/cybersecurity" },
      { label: "Innovation Lab", href: "/research/innovation-lab" },
      { label: "Future Technologies", href: "/research/future-tech" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Privacy", href: "/trust/privacy" },
      { label: "Security", href: "/trust/security" },
      { label: "Transparency", href: "/trust/transparency" },
      { label: "Responsible AI", href: "/trust/responsible-ai" },
      { label: "System Status", href: "/trust/status" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Products", href: "/explore/products" },
      { label: "Innovation", href: "/explore/innovation" },
      { label: "Technology", href: "/explore/technology" },
      { label: "Future Vision", href: "/explore/vision" },
      { label: "Learning Resources", href: "/explore/learning" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/resources/documentation" },
      { label: "FAQs", href: "/resources/faqs" },
      { label: "Blog", href: "/resources/blog" },
      { label: "Open Source", href: "/resources/open-source" },
      { label: "Media Kit", href: "/resources/media-kit" },
      { label: "Press Releases", href: "/resources/press-releases" },
      { label: "Press Contact", href: "/resources/press-contact" },
    ],
  },
  {
    title: "Founder",
    links: [
      { label: "About Savan", href: "/founder/about" },
      { label: "Journey", href: "/founder/journey" },
      { label: "Philosophy", href: "/founder/philosophy" },
      { label: "Roadmap", href: "/founder/roadmap" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Get in Touch", href: "/get-in-touch" },
      { label: "Contact", href: "/contact" },
      { label: "Socials", href: "/company/socials" },
      { label: "Support", href: "/company/support" },
      { label: "Updates", href: "/company/updates" },
      { label: "Newsletter", href: "/company/newsletter" },
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

/* ─── FADE IN ───────────────────────────────────────────────── */

function FadeSection({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const vis = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={vis ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: SLOW, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────── */

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#050505" }}>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-48 w-96 opacity-[0.04] blur-[80px]" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }} />
      </div>
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" aria-hidden="true" />

      <div className="relative z-[2] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══ TOP CTA ═══ */}
        <FadeSection className="pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 text-center">
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.92]"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            Ready to Build the
            <br />
            <span className="text-white/60">Future Together?</span>
          </motion.h2>
          <motion.p
            className="mt-6 mx-auto max-w-lg text-base text-white/35 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: NORMAL, delay: 0.15, ease: ease.out }}
          >
            Building products that connect people, empower communities, and shape the future through SP NET INC.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
          >
            <motion.a href="/get-in-touch" className="group inline-flex items-center gap-2 rounded-xl bg-white/[0.08] border border-white/[0.10] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-white/80 hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              transition={spring.gentle}
            >
              Get In Touch
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
            <motion.a href="/products/sp-net-ecosystem" className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-white/45 hover:text-white/65 hover:border-white/[0.14] transition-all duration-300"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              transition={spring.gentle}
            >
              Explore My Work
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
          </motion.div>
        </FadeSection>

        {/* ═══ MAIN CONTENT GRID ═══ */}
        <div className="py-16 sm:py-20 lg:py-24 flex flex-col lg:flex-row gap-12 lg:gap-20 border-t border-white/[0.04]">
          {/* ─── FOUNDER BRAND ─── */}
          <div className="lg:w-[420px] shrink-0 text-center sm:text-left">
            <FadeSection delay={0.1}>
              <div className="flex items-center gap-4 mb-6 sm:mb-8 justify-center sm:justify-start">
                <motion.span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/[0.06] overflow-hidden shrink-0"
                  whileHover={{ boxShadow: "0 0 20px rgba(59,130,246,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Image src="/logo.jpg" alt={personal.name} width={56} height={56} className="object-cover w-full h-full" />
                </motion.span>
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
              <div className="mt-6 sm:mt-8 border-l border-white/[0.06] pl-4 text-left">
                <p className="text-sm text-white/20 italic leading-relaxed">&ldquo;{personal.mission}&rdquo;</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-white/20 font-medium">&mdash; {personal.name}</span>
                  <span className="text-[10px] text-white/10">Founder, {personal.company}</span>
                </div>
              </div>
            </FadeSection>
          </div>

          {/* ─── NAVIGATION ─── */}
          <FadeSection delay={0.3} className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 text-center sm:text-left">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-4">{group.title}</h4>
                  <ul className="list-none p-0 m-0 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="group/link inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors duration-200"
                        >
                          <span className="h-px w-0 group-hover/link:w-2 bg-white/30 transition-all duration-300" />
                          {link.label}
                          {link.href.startsWith("http") && <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-60 transition-opacity duration-200" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </FadeSection>
        </div>

        {/* ═══ CODING JOURNEY ═══ */}
        <FadeSection delay={0.1} className="py-16 sm:py-20 lg:py-24 border-t border-white/[0.04]">
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15">The Journey</span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white/70 mt-3 tracking-tight">From Curiosity to Creation</h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <PremiumTimeline milestones={journeyMilestones} />
          </div>
        </FadeSection>

        {/* ═══ QUICK STATS + BADGES ═══ */}
        <FadeSection delay={0.15} className="py-16 sm:py-20 lg:py-24 border-t border-white/[0.04]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {quickStats.map((s, i) => (
              <div key={s.label} className="text-center">
                <motion.span
                  className="block text-3xl sm:text-4xl font-semibold tracking-tight text-white/90"
                  initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: NORMAL, delay: i * 0.08, ease: ease.out }}
                >
                  {s.value}
                </motion.span>
                <span className="text-xs text-white/20 mt-1.5 block">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {techBadges.map((badge, i) => (
              <motion.span
                key={badge}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] text-[11px] text-white/25 font-mono"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: FAST }}
                whileHover={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.3)" }}
              >
                <Code className="h-2.5 w-2.5 text-white/20" />
                {badge}
              </motion.span>
            ))}
          </div>
        </FadeSection>

        {/* ═══ CONNECT LINKS ═══ */}
        <div className="py-16 sm:py-20 lg:py-24 border-t border-white/[0.04]">
          <FadeSection delay={0.1}>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 mb-6">Connect</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Get in Touch", description: "Choose how to connect", href: "/get-in-touch" },
                { label: "Contact", description: "Direct contact form", href: "/contact" },
                { label: "Socials", description: "Follow on social platforms", href: "/company/socials" },
                { label: "Support", description: "Help and resources", href: "/company/support" },
                { label: "Updates", description: "News and announcements", href: "/company/updates" },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 text-center hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={spring.gentle}
                >
                  <p className="text-sm font-medium text-white/50 group-hover:text-white/70 transition-colors duration-200">{item.label}</p>
                  <p className="text-[11px] text-white/15 mt-1">{item.description}</p>
                </motion.a>
              ))}
            </div>
          </FadeSection>
        </div>

        {/* ═══ FOUNDER SIGNATURE ═══ */}
        <FadeSection delay={0.1} className="py-12 sm:py-16 lg:py-20 text-center border-t border-white/[0.04]">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-8 bg-white/[0.04]" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-white/15 uppercase">{personal.tagline}</span>
            <div className="h-px w-8 bg-white/[0.04]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/80">
            {personal.name}
          </h3>
          <p className="text-sm text-white/25 mt-1">Founder of {personal.company}</p>

          <div className="mt-8 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[10px] text-white/18 font-mono tracking-wider">{personal.tagline}</span>
              <span className="text-[10px] text-white/10">·</span>
              <span className="text-[10px] text-white/18 font-mono tracking-wider">Made in {personal.madeIn}</span>
              <span className="text-[10px] text-white/10">·</span>
              <span className="text-[10px] text-white/18 font-mono tracking-wider">Since 2018</span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group/scroll inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-5 py-3 text-xs text-white/25 hover:text-white/40 hover:border-white/10 transition-all duration-300"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring.gentle}
            >
              <Zap className="h-3 w-3" />
              Back to top
              <ChevronDown className="h-3 w-3 rotate-180 group-hover/scroll:-translate-y-0.5 transition-transform duration-200" />
            </motion.button>
          </div>
        </FadeSection>

        {/* ═══ COPYRIGHT BOTTOM BAR ═══ */}
        <FadeSection delay={0.15}>
          <div className="border-t border-white/[0.03] py-5 sm:py-6 lg:py-8 mt-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <p className="text-xs text-white/12 hover:text-white/20 transition-colors duration-300">
                &copy; {new Date().getFullYear()} {personal.name}. All Rights Reserved.
              </p>
              <div className="flex items-center gap-3 text-[10px] text-white/15">
                <span>{personal.name}</span>
                <span className="hidden sm:inline text-white/8">·</span>
                <span className="hidden sm:inline">{personal.company}</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-[9px] font-mono tracking-[0.2em] text-white/12 uppercase">{personal.tagline}</span>
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
      {/* Timeline line with progressive fill */}
      <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.03] to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-white/[0.06] to-transparent origin-top"
          initial={{ scaleY: 0 }}
          animate={vis ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.2, ease: ease.out }}
        />
      </div>

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
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={vis ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: NORMAL, delay: i * 0.1, ease: ease.out }}
                >
                  <div className={cn("rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 sm:p-5 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03]", isLeft ? "sm:text-right" : "sm:text-left", "text-left")}>
                    <div className={cn("flex items-center gap-3 mb-1.5", isLeft && "sm:justify-end")}>
                      <span className="text-[10px] font-mono tracking-wider text-white/25">{m.year}</span>
                      <span className="text-[8px] font-mono tracking-[0.15em] text-white/20 uppercase">{m.status}</span>
                    </div>
                    <h4 className="text-sm text-white/50 font-medium">{m.label}</h4>
                    <p className="text-xs text-white/25 mt-1 leading-relaxed">{m.description}</p>
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
        <p className="text-sm text-white/15 italic leading-relaxed max-w-md mx-auto">
          &ldquo;Lead with purpose. Build with passion. Connect beyond limits.&rdquo;
        </p>
        <div className="mt-3">
          <span className="text-xs text-white/15 font-medium">&mdash; {personal.name}</span>
        </div>
      </motion.div>
    </div>
  );
}
