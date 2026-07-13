"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionContainer, SectionTitle, StaggerFade, StaggerItem, FadeIn, Reveal, BlurReveal } from "@/components/ui/AnimationPrimitives";
import { Badge } from "@/components/ui/Badge";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { personal } from "@/data/personal";
import { Sparkles, Code, Rocket } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { ease, spring, NORMAL, SLOW } from "@/lib/motion";

const statusStyles: Record<string, string> = {
  private: "border-yellow-500/20 text-yellow-400/60 bg-yellow-500/5",
  future: "border-blue-500/20 text-blue-400/60 bg-blue-500/5",
};

const phaseIcons: Record<string, React.ElementType> = {
  "2022": Rocket,
  "3+": Layers,
  "Full Stack": Code,
  "1": Sparkles,
};

function Layers(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={props.className}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

function RoadmapPhase({ achievement, index, isInView }: { achievement: typeof achievements[number]; index: number; isInView: boolean }) {
  return (
    <motion.div
      className="group relative rounded-xl border border-white/[0.04] bg-white/[0.02] p-5 overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: NORMAL, ease: ease.out }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
        whileHover={{ boxShadow: "inset 0 0 0 1px rgba(59,130,246,0.15), 0 8px 30px -10px rgba(59,130,246,0.1)" }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-[1]">
        <div className="text-lg sm:text-xl font-semibold text-white tracking-tight">{achievement.metric}</div>
        <div className="mt-1 text-xs font-medium text-white/50">{achievement.label}</div>
        <p className="mt-2 text-xs text-white/25 leading-relaxed">{achievement.description}</p>
      </div>
    </motion.div>
  );
}

function DevelopmentCard({ project, index, isInView }: { project: typeof projects[number]; index: number; isInView: boolean }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: NORMAL, ease: ease.out }}
    >
      <motion.div className="relative h-full rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 overflow-hidden transition-colors duration-300 hover:bg-white/[0.03]"
        whileHover={{ y: -4, scale: 1.01 }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)" }}
          whileHover={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.10), 0 12px 40px -10px rgba(0,0,0,0.3)" }}
          transition={{ duration: 0.3 }}
        />
        <div className="relative z-[1]">
          <div className="flex items-center justify-between gap-3 mb-4">
            <motion.div
              className={cn(
                "h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center text-sm font-semibold text-white",
                project.gradient
              )}
              whileHover={{ rotate: 5, y: -2 }}
              transition={spring.gentle}
            >
              {project.title[0]}
            </motion.div>
            <span className={cn("px-2.5 py-0.5 rounded-md text-[10px] font-medium uppercase tracking-wider border", statusStyles[project.status])}>
              {project.status === "private" ? "In Development" : "Planned"}
            </span>
          </div>

          <h3 className="text-sm font-medium text-white group-hover:text-white/90 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-white/30 mt-1">{project.tagline}</p>

          <p className="mt-3 text-sm text-white/25 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          <StaggerFade staggerDelay={0.05} className="mt-4 flex flex-wrap gap-1.5">
            {project.highlights.slice(0, 3).map((h) => (
              <StaggerItem key={h}>
                <div className="flex items-center gap-1.5 text-xs text-white/30">
                  <span className="h-1 w-1 rounded-full bg-white/15 shrink-0" />
                  {h}
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>

          <div className="mt-4 pt-4 border-t border-white/[0.04]">
            <div className="flex flex-wrap gap-1.5">
              {project.highlights.slice(0, 3).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const achRef = useRef<HTMLDivElement>(null);
  const achInView = useInView(achRef, { once: true, amount: 0.1 });

  return (
    <SectionContainer id="roadmap" className="bg-black relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.01] to-transparent" aria-hidden="true" />

      <SectionTitle
        label="Roadmap"
        title="What's next"
        subtitle="The SP NET ecosystem is evolving. Here's where I've been and where I'm headed."
      />

      {/* Achievements as roadmap milestones */}
      <div ref={achRef}>
        <Reveal delay={0.1}>
          <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-white/20 mb-5 text-center sm:text-left">Milestones</h3>
        </Reveal>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12 sm:mb-16">
          {achievements.map((a, i) => (
            <RoadmapPhase key={a.label} achievement={a} index={i} isInView={achInView} />
          ))}
        </div>
      </div>

      {/* Current development projects */}
      <Reveal delay={0.1}>
        <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-white/20 mb-5 text-center sm:text-left">Active Development</h3>
      </Reveal>

      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 mb-12 sm:mb-16">
        {projects.map((project, i) => (
          <DevelopmentCard key={project.id} project={project} index={i} isInView={achInView} />
        ))}
      </div>

      {/* Open Source Journey */}
      <Reveal delay={0.1}>
        <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-white/20 mb-5 text-center sm:text-left">Open Source</h3>
      </Reveal>

      <FadeIn delay={0.2}>
        <motion.div
          className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6 sm:p-8 transition-all duration-300"
          whileHover={{ borderColor: "rgba(255,255,255,0.10)" }}
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-white/15 mb-3">
                <GithubIcon className="h-3.5 w-3.5" />
                <span>Open Source Journey</span>
              </div>
              <h3 className="text-base font-medium text-white">Building in Public</h3>
              <p className="mt-2 text-sm text-white/30 leading-relaxed max-w-xl">
                Core SP NET products are being built in private to ensure quality and security before public release. 
                Planning to open-source infrastructure components to give back to the developer community.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Private Development</Badge>
                <Badge variant="beta">Future Open Source</Badge>
              </div>
            </div>
            <motion.a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/50 hover:text-white hover:border-white/20 transition-all duration-300 shrink-0"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              transition={spring.gentle}
            >
              <GithubIcon className="h-4 w-4" />
              Follow on GitHub
            </motion.a>
          </div>
        </motion.div>
      </FadeIn>
    </SectionContainer>
  );
}
