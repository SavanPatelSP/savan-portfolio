"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Target, Compass, Zap, Globe, Code, Building2, Layers, Infinity, Heart, Sparkles } from "lucide-react";
import { SectionContainer, FadeIn, Reveal, BlurReveal, StaggerFade, StaggerItem, SectionTitle, ParallaxContainer } from "@/components/ui/AnimationPrimitives";
import { ParticleField } from "@/components/ui/ParticleField";
import { personal, founderMetrics, principles } from "@/data/personal";
import { ease, spring, NORMAL } from "@/lib/motion";

const metricIcons: Record<string, React.ElementType> = {
  code: Code,
  building: Building2,
  layers: Layers,
  infinity: Infinity,
  heart: Heart,
};

const principleIcons: Record<string, React.ElementType> = {
  "Craft over scale": Target,
  "Simplicity is the ultimate sophistication": Compass,
  "Ship to learn": Zap,
  "Open by default": Globe,
};

function CircuitPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.015]" aria-hidden="true">
      <defs>
        <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0v30M0 30h30M30 30v30M30 30h30" stroke="#3b82f6" strokeWidth="0.5" fill="none" />
          <circle cx="30" cy="0" r="1" fill="#3b82f6" opacity="0.5" />
          <circle cx="0" cy="30" r="1" fill="#3b82f6" opacity="0.5" />
          <circle cx="30" cy="30" r="1.5" fill="#3b82f6" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

function FounderCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-blue-500/15 bg-gradient-to-br from-blue-500/[0.04] via-black to-blue-500/[0.02] p-8 sm:p-12 lg:p-16 shadow-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Circuit pattern background */}
        <CircuitPattern />

        {/* Constellation particles */}
        <ParticleField count={30} connectionDistance={100} speed={0.1} />

        {/* Glowing border effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "inset 0 0 80px rgba(59,130,246,0.05), 0 0 60px rgba(59,130,246,0.03)",
          }}
          aria-hidden="true"
        />

        {/* Animated glow */}
        <motion.div
          className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)",
            y: glowY,
          }}
          aria-hidden="true"
        />

        {/* Spotlight */}
        <div
          className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-[2]">
          {/* Founder identity */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/20">
              <span className="text-sm font-bold text-white tracking-tight">{personal.initials}</span>
            </div>
            <div>
              <div className="text-xs font-semibold text-white tracking-wider">{personal.name}</div>
              <div className="text-[10px] text-blue-400/60 font-mono">{personal.title}</div>
            </div>
          </motion.div>

          {/* Title and tagline */}
          <BlurReveal delay={0.3}>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Founder
            </h3>
            <p className="mt-2 text-lg text-white/30 font-light tracking-wide">
              Lead • Build • Connect
            </p>
          </BlurReveal>

          {/* Mission statement */}
          <BlurReveal delay={0.4}>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-white/40 leading-relaxed">
              {personal.mission}
            </p>
          </BlurReveal>

          <BlurReveal delay={0.5}>
            <p className="mt-4 max-w-2xl text-base text-white/30 leading-relaxed">
              {personal.vision}
            </p>
          </BlurReveal>

          {/* Tech-inspired metadata */}
          <motion.div
            className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center gap-2 text-xs text-blue-400/40 font-mono">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400/60" />
              {personal.madeIn}
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-400/40 font-mono">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400/60" />
              Self-taught engineer
            </div>
            <div className="flex items-center gap-2 text-xs text-blue-400/40 font-mono">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
              Building SP NET INC
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Glow under card */}
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-40 w-[80%] bg-gradient-to-r from-transparent via-blue-500/[0.04] to-transparent blur-3xl"
        aria-hidden="true"
      />
    </div>
  );
}

export function AboutSection() {
  return (
    <SectionContainer id="founder" className="bg-black relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Founder"
        title="Who I am"
        subtitle="Engineer. Entrepreneur. Visionary. Building the future of technology through SP NET INC."
      />

      {/* Premium Founder Card */}
      <FounderCard />

      {/* Founder Metrics */}
      <div className="mt-16 sm:mt-20 lg:mt-24">
        <Reveal delay={0.1}>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white/20 mb-6 sm:mb-8 text-center">
            The Journey in Numbers
          </h3>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {founderMetrics.map((m, i) => {
            const Icon = metricIcons[m.icon] || Code;
            return (
              <FadeIn key={m.label} delay={0.1 + i * 0.06}>
                <div className="group rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 text-center hover:border-blue-500/15 hover:bg-blue-500/[0.03] transition-all duration-300">
                  <motion.div
                    className="mx-auto h-4 w-4 text-white/15 group-hover:text-blue-400/40 transition-colors"
                    whileHover={{ rotate: 12, y: -2 }}
                    transition={spring.gentle}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  <div className="mt-3 text-xl sm:text-2xl font-semibold text-white tracking-tight">{m.value}</div>
                  <div className="mt-1 text-xs text-white/25 leading-relaxed">{m.label}</div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Principles */}
      <div className="mt-16 sm:mt-28">
        <Reveal delay={0.1}>
          <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-white/20 mb-6 sm:mb-8 text-center lg:text-left">Engineering Principles</h3>
        </Reveal>
        <StaggerFade staggerDelay={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => {
            const Icon = principleIcons[p.title] || Target;
            return (
              <StaggerItem key={p.title}>
                <div className="group rounded-xl border border-white/[0.04] bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
                  <motion.div
                    className="h-4 w-4 text-white/20 group-hover:text-white/50 transition-colors duration-300"
                    whileHover={{ rotate: 8, y: -2 }}
                    transition={spring.gentle}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  <h4 className="mt-4 text-sm font-medium text-white">{p.title}</h4>
                  <p className="mt-2 text-sm text-white/35 leading-relaxed">{p.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </div>
    </SectionContainer>
  );
}
