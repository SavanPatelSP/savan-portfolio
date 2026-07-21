"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Rocket,
  MessageSquare,
  LayoutDashboard,
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  Zap,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SLOW, NORMAL, FAST, ease, spring } from "@/lib/motion";
import { PageHero } from "@/components/ui/PageHero";
import { FAQ } from "@/components/ui/FAQ";
import { CTASection } from "@/components/ui/CTASection";
import { RelatedPages } from "@/components/ui/RelatedPages";
import { SocialModal } from "@/components/ui/SocialModal";
import { Timeline, TimelineItem } from "@/components/timeline";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
  Reveal,
} from "@/components/ui/AnimationPrimitives";

const journeyData = [
  {
    year: "2018",
    title: "First Line of Code",
    description: "Wrote the first line of code that started a journey into software engineering. Self-taught, relentless, and curious.",
    icon: Sparkles,
  },
  {
    year: "2022",
    title: "Founded SP NET INC",
    description: "Launched the company with a vision to build infrastructure for modern communication and enterprise tools.",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "SP NET GRAM Development",
    description: "Architected a next-generation messaging platform focused on privacy, productivity, and premium experiences.",
    icon: MessageSquare,
  },
  {
    year: "2024",
    title: "SP NET ADMIN OS",
    description: "Developed a comprehensive enterprise administration platform with full organizational tooling and role-based access.",
    icon: LayoutDashboard,
  },
  {
    year: "2025",
    title: "SP NET AI Research",
    description: "Began research and development on AI systems to power intelligent experiences across the entire ecosystem.",
    icon: Brain,
  },
  {
    year: "2026",
    title: "Scaling the Vision",
    description: "Expanding the SP NET ecosystem with new products, a growing community, and open-source contributions.",
    icon: TrendingUp,
  },
];

const milestones = [
  {
    year: "2018",
    title: "The spark",
    description: "That first program wasn't impressive — but it changed everything. The realization that I could create something from nothing through code was the most powerful idea I'd ever encountered.",
  },
  {
    year: "2020",
    title: "Deepening expertise",
    description: "After two years of non-stop building, the fundamentals were solid. Full stack, systems thinking, and product design became second nature. The tools changed but the thinking got sharper.",
  },
  {
    year: "2022",
    title: "Taking the leap",
    description: "Founding SP NET INC wasn't a sudden decision — it was the inevitable conclusion of years of building. The company was formalized to give structure to a vision that had outgrown a personal project.",
  },
  {
    year: "2024",
    title: "The ecosystem takes shape",
    description: "With SP NET GRAM, SP NET ADMIN OS, and SP NET AI in various stages of development, the products stopped being separate projects and started becoming an interconnected ecosystem.",
  },
];

const keyMoments = [
  {
    title: "The persistence phase",
    description: "Between 2018 and 2022, there were countless moments of doubt. Projects that failed. Technologies that didn't click. Bugs that took days to solve. But every setback was a lesson, and every lesson made the next attempt stronger.",
  },
  {
    title: "The conviction moment",
    description: "There was a specific moment when the idea for SP NET INC crystallized — not as a business plan, but as a mission. A belief that the tools we use every day could be fundamentally better. That conviction hasn't wavered.",
  },
  {
    title: "Building in public",
    description: "Sharing the journey hasn't always been comfortable. But transparency builds trust, and trust builds communities. Every product decision, every technical tradeoff, every milestone — shared openly.",
  },
  {
    title: "The ecosystem vision",
    description: "The real breakthrough wasn't any single product — it was seeing how they all connect. Communication, administration, intelligence — three pillars that together form a complete operating system for modern organizations.",
  },
];

const lessonsLearned = [
  {
    icon: Target,
    title: "Start before you're ready",
    description: "Perfectionism is procrastination in disguise. The best way to learn is to build something real, ship it, and iterate based on actual feedback.",
  },
  {
    icon: Lightbulb,
    title: "Constraints breed creativity",
    description: "Limited resources aren't a limitation — they're a design constraint. Some of the best decisions in the SP NET ecosystem came from being forced to do more with less.",
  },
  {
    icon: Zap,
    title: "Speed compounds",
    description: "Moving fast doesn't mean cutting corners. It means making decisions quickly, learning from the outcomes, and adjusting course without looking back.",
  },
  {
    icon: BookOpen,
    title: "Teach what you learn",
    description: "Writing, sharing, and teaching forces you to understand at a deeper level. The act of explaining something is itself a form of mastery.",
  },
];

const faqItems = [
  {
    question: "When did Savan start coding?",
    answer: "Savan wrote his first line of code in 2018. He is entirely self-taught, learning through online resources, documentation, and relentless practice. What started as curiosity quickly became an obsession with building and creating through software.",
  },
  {
    question: "When was SP NET INC founded?",
    answer: "SP NET INC was founded in 2022. After years of building projects and deepening technical expertise, Savan launched the company with a clear vision: to build infrastructure for modern communication, enterprise administration, and intelligent automation.",
  },
  {
    question: "What has been built since founding SP NET INC?",
    answer: "Since 2022, SP NET INC has been developing SP NET GRAM (a next-generation messaging platform), SP NET ADMIN OS (an enterprise administration platform), and SP NET AI (an AI research initiative). All products are currently in active development and not yet publicly available. Each is designed to work as part of a larger interconnected ecosystem.",
  },
  {
    question: "What is the biggest challenge faced so far?",
    answer: "Building a product ecosystem solo — or near-solo — while maintaining quality across every layer. From architecture to UI design, from security to performance, every decision carries weight. The challenge isn't building one great product; it's building several that work together seamlessly.",
  },
  {
    question: "What is the next chapter for Savan Patel?",
    answer: "The focus in 2026 and beyond is scaling the SP NET ecosystem, growing the community, and pushing the boundaries of what AI can do for communication and enterprise tooling. Open source projects are currently private, with plans to contribute to the community as products mature. The vision is bigger than any single product.",
  },
];

export default function JourneyClientPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Founder", href: "/founder" },
          { label: "Journey" },
        ]}
        label="Journey"
        title="The Journey"
        titleAccent="From curiosity to creation"
        description="A timeline of decisions, milestones, and defining moments — from writing the first line of code to building a technology company."
        icon={<Sparkles className="h-4 w-4" />}
      />

      <SectionContainer id="timeline">
          <SectionTitle
            label="Timeline"
            title="The full story"
            subtitle="Every year has been a chapter. Here's how the story unfolded."
          />

          <div className="max-w-3xl mx-auto">
            <Timeline layout="left">
              {journeyData.map((item, i) => (
                <TimelineItem
                  key={item.year}
                  icon={item.icon}
                  index={i}
                  total={journeyData.length}
                  isLast={i === journeyData.length - 1}
                  layout="left"
                >
                  <div className="py-1 sm:py-2">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/20">
                      {item.year}
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-white/70 mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Milestones"
            title="Defining moments"
            subtitle="The inflection points that shaped the trajectory — from personal projects to a company with a vision."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {milestones.map((milestone, i) => (
              <StaggerItem key={milestone.year}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-white/70 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Key Moments"
            title="What shaped the path"
            subtitle="Beyond the milestones — the invisible forces, turning points, and realizations that influenced the direction."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {keyMoments.map((moment) => (
              <StaggerItem key={moment.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <h3 className="text-base font-medium text-white/60 mb-3">
                    {moment.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {moment.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Lessons Learned"
            title="What the journey taught"
            subtitle="Hard-won wisdom from years of building, failing, learning, and shipping — distilled into four principles."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.08}>
            {lessonsLearned.map((lesson) => (
              <StaggerItem key={lesson.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] mb-5">
                    <lesson.icon className="h-4 w-4 text-white/30" />
                  </div>
                  <h3 className="text-lg font-medium text-white/70 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <FAQ
        title="About the Journey"
        items={faqItems}
      />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "About",
            description: "Who Savan Patel is — background, expertise, values, and what drives him.",
            href: "/founder/about",
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

      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[0.92]">
              Every great journey
              <br />
              <span className="text-white/40">starts with a decision</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-5 mx-auto max-w-lg text-base text-white/30 leading-relaxed">
              The next chapter is being written right now. Whether you want to follow along, contribute, or build something together — the door is open.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="/get-in-touch"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.gentle}
              >
                Get in touch
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.a>
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.gentle}
              >
                Follow the journey
              </motion.button>
            </div>
          </FadeIn>
        </div>

        <div
          className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          aria-hidden="true"
        />
      </section>
      <SocialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
