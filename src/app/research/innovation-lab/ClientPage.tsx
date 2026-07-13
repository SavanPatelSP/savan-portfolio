"use client";

import { FlaskConical, Lightbulb, Rocket, Sparkles, Atom, Telescope, TestTube, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ease, spring, NORMAL } from "@/lib/motion";
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

const playgrounds = [
  {
    icon: Sparkles,
    title: "Adaptive Interfaces",
    description:
      "I've been experimenting with interfaces that rearrange themselves based on how you use them. Not AI-generated layouts for the sake of it — but dashboards and views that surface the tools you actually use most, at the time you use them. The prototypes are rough, but the idea excites me.",
  },
  {
    icon: Atom,
    title: "Generative UI Experiments",
    description:
      "What if the UI wasn't fixed? What if it could morph based on context, user behavior, and task? I've been prototyping systems where the interface adapts in real time — moving buttons, restructuring layouts, even generating entirely new views based on what the user is trying to do.",
  },
  {
    icon: Telescope,
    title: "Local-First Software",
    description:
      "I'm fascinated by local-first architectures — software that works offline, syncs when possible, and doesn't depend on a central server. I've been experimenting with CRDTs for collaborative editing and thinking about what SP NET GRAM could look like if it truly worked without the cloud.",
  },
];

const currentExperiments = [
  {
    icon: TestTube,
    title: "Voice-First Workflows",
    description: "Testing whether voice input can actually replace keyboard for complex admin tasks in SP NET ADMIN OS. Turns out it's great for some things and terrible for others. Learning where the line is.",
  },
  {
    icon: Rocket,
    title: "Multi-Agent AI Systems",
    description: "Building prototypes where multiple specialized AI agents collaborate to solve problems — one researches, one codes, one reviews. With human oversight at every step. It's messy but fascinating.",
  },
  {
    icon: Zap,
    title: "Offline-Sync Engine",
    description: "Experimenting with conflict-free replicated data types (CRDTs) for seamless offline-to-online transitions in GRAM. The goal: write messages while offline and have them merge perfectly when connectivity returns.",
  },
  {
    icon: FlaskConical,
    title: "Ambient Notifications",
    description: "Playing with notification systems that understand context — time of day, user activity, urgency signals. Notifications that arrive at the right moment, not the moment they were sent.",
  },
];

const philosophy = [
  {
    icon: Lightbulb,
    title: "Hypothesis First",
    description: "Every experiment starts with a clear question: what do I believe, and how would I know if I'm wrong? This prevents me from going down rabbit holes that don't lead anywhere useful.",
  },
  {
    icon: Rocket,
    title: "Ship Fast, Learn Faster",
    description: "I prototype in hours, not weeks. A rough working version teaches me more than a polished design doc. If the idea has merit, I'll invest in making it right. If not, I've lost a weekend, not a quarter.",
  },
  {
    icon: Atom,
    title: "Embrace Dead Ends",
    description: "Not every experiment succeeds, and that's the point. The dead ends teach me what won't work, which is just as valuable as discovering what will. I document failures as rigorously as successes.",
  },
];

const faqItems = [
  {
    question: "What is the Innovation Lab?",
    answer:
      "It's my personal sandbox. Not a company department, not a research division — just me, a terminal, and whatever idea won't leave me alone. Some experiments turn into real features in GRAM or ADMIN OS. Most don't. All of them teach me something.",
  },
  {
    question: "How do you decide what to experiment with?",
    answer:
      "Usually it starts with a frustration or a curiosity. Either something in my existing products bugs me and I want to try a radically different approach, or I read something that sparks an idea. I don't have a formal selection process — just genuine interest and a time box.",
  },
  {
    question: "Do your experiments ever ship?",
    answer:
      "Sometimes. Smart compose in GRAM started as a weekend experiment. The adaptive dashboard prototypes haven't shipped yet but are influencing how I think about admin UIs. Not every experiment needs to ship — some are purely for learning.",
  },
  {
    question: "What's the most interesting thing you've built here?",
    answer:
      "The multi-agent AI system. Watching specialized agents collaborate — arguing, checking each other's work, building on each other's output — feels like peeking into a future that's arriving faster than expected. The human oversight layer is crucial though.",
  },
  {
    question: "How much time do you spend on experiments?",
    answer:
      "It varies. Some weeks it's zero — I'm heads-down on production work. Other weeks I'll lose an entire weekend to a voice interface prototype. I try to keep at least one active experiment running at all times, even if it's just a few hours a week.",
  },
];

const relatedPages = [
  {
    title: "Artificial Intelligence",
    description: "Where many of my experiments start and end.",
    href: "/research/ai",
  },
  {
    title: "Future Technologies",
    description: "The emerging tech that inspires my experiments.",
    href: "/research/future-tech",
  },
  {
    title: "SP NET Ecosystem",
    description: "Where experimental features might eventually land.",
    href: "/products/sp-net-ecosystem",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "Innovation Lab" },
        ]}
        label="Research"
        title="Innovation Lab"
        titleAccent="Personal experiments and explorations"
        description="My personal sandbox for ideas — side projects, experimental features, and the kind of rapid prototyping that happens when curiosity meets a free weekend."
        icon={<FlaskConical className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="Where curiosity meets code"
          subtitle="The Innovation Lab isn't a formal thing. It's just what happens when I can't stop thinking about a problem or an idea and need to build something to find out if it works. It's where my best learning happens."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Approach", value: "Prototype fast, learn fast" },
              { label: "Cost", value: "Weekends and curiosity" },
              { label: "Success Rate", value: "Maybe 20%" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
              >
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/20 mb-2">
                  {stat.label}
                </p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Active Playgrounds"
          title="Ideas I can't stop thinking about"
          subtitle="These are the areas where my brain keeps circling back. Some are inspired by products I use daily, others by conversations, articles, or just a 'what if' moment."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {playgrounds.map((area) => {
            const Icon = area.icon;
            return (
              <StaggerItem key={area.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-amber-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Current Experiments"
          title="What I'm building right now"
          subtitle="Active prototypes and experiments — each one testing a specific hypothesis about how technology can work better."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentExperiments.map((project) => {
            const Icon = project.icon;
            return (
              <StaggerItem key={project.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-amber-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Philosophy"
          title="How I approach experiments"
          subtitle="A few principles that keep my experiments productive instead of just being expensive hobbies."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {philosophy.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-amber-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Future Directions"
          title="What I want to try next"
          subtitle="Ideas in the backlog — things I'll explore when the right weekend arrives."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Spatial Computing Interfaces", description: "AR overlays for GRAM notifications and ADMIN dashboards. Early-stage thinking about how spatial interfaces could improve productivity tools." },
              { title: "Autonomous Agent Workflows", description: "AI agents that can independently handle multi-step tasks — booking, scheduling, research — with human oversight only when needed." },
              { title: "Context-Aware Experiences", description: "Systems that understand time, location, device state, and user activity to deliver experiences that feel naturally timed and relevant." },
              { title: "Community Innovation", description: "Building frameworks where other developers can propose and prototype experimental features for the SP NET ecosystem." },
            ].map((direction, i) => (
              <motion.div
                key={direction.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
              >
                <h3 className="text-sm font-medium text-white/70 mb-2">
                  {direction.title}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  {direction.description}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Curiosity is"
        titleAccent="the only requirement"
        description="The Innovation Lab runs on genuine interest and free time. If an idea excites me enough to give up a weekend, it's worth exploring."
        primaryAction={{
          label: "Explore Future Tech",
          href: "/research/future-tech",
        }}
        secondaryAction={{
          label: "View All Research",
          href: "/research",
        }}
      />
    </>
  );
}
