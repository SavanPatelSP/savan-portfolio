"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Scale,
  Eye,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  Lock,
  Lightbulb,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ease, spring, FAST, NORMAL, SLOW } from "@/lib/motion";
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

const principles = [
  {
    title: "Human First",
    description:
      "AI is a tool that should help people, not replace their judgment. When I build with AI, I make sure a human can always review, override, or understand what the AI is doing.",
    icon: Users,
  },
  {
    title: "No Deception",
    description:
      "I do not use AI to generate misleading content, fake personas, or deceptive experiences. If AI is involved in something I build, I am open about it.",
    icon: Eye,
  },
  {
    title: "Ethical Boundaries",
    description:
      "There are things AI should not be used for — manipulating people, generating harmful content, or bypassing consent. I draw clear lines and stick to them.",
    icon: Shield,
  },
  {
    title: "Transparent Usage",
    description:
      "When AI generates, recommends, or influences something, I label it. Users deserve to know when they are interacting with AI versus human-created content.",
    icon: Lightbulb,
  },
];

const howIUseAI = [
  {
    title: "As a Development Assistant",
    description:
      "I use AI tools to help write boilerplate code, debug complex issues, and explore solutions faster. But every line of code I ship is reviewed and understood by me. AI speeds up the process — it does not replace my thinking.",
  },
  {
    title: "For Research and Learning",
    description:
      "AI helps me quickly understand new concepts, explore different approaches, and stay current with rapidly evolving technology. It is like having a knowledgeable study partner — but I always verify what it tells me.",
  },
  {
    title: "In Product Features",
    description:
      "When I build AI-powered features in my projects, I think carefully about what the AI should and should not do. I add human oversight, clear labels, and easy ways for users to provide feedback or opt out.",
  },
  {
    title: "What I Avoid",
    description:
      "I do not use AI to generate content that pretends to be human-written when it is not. I do not use it to create fake social proof, manipulate user behavior, or generate harmful material.",
  },
];

const commitments = [
  "AI-generated content is labeled as such in my projects",
  "Users can always opt out of AI-powered features",
  "I never use AI to deceive or manipulate people",
  "I review all AI outputs before they affect users",
  "I stay informed about AI ethics and update my practices",
];

const faqItems = [
  {
    question: "Do you use AI in your projects?",
    answer:
      "Yes, I use AI as a development tool — for code assistance, research, and learning. I also build AI-powered features in projects like SP NET AI. But I always maintain human oversight and am transparent about where AI is involved.",
  },
  {
    question: "How do you ensure AI is used ethically?",
    answer:
      "I follow a simple rule: if I would not be comfortable explaining how the AI works to the people affected by it, I should not be using it that way. I add human oversight, clear labels, and opt-out mechanisms wherever AI is involved.",
  },
  {
    question: "Will AI replace your work?",
    answer:
      "AI helps me work faster and explore more ideas, but it does not replace my judgment, creativity, or responsibility. I am the one who decides what ships, reviews the code, and takes responsibility for the outcome. AI is a powerful tool, not a replacement for thinking.",
  },
  {
    question: "Do you use AI to generate content for this portfolio?",
    answer:
      "No. The writing on this site is mine — my words, my thoughts, my personality. I might use AI to help me draft or edit something technical, but the voice and perspective are always human. This page, for example, is entirely my own thinking about how I approach AI ethics.",
  },
  {
    question: "What about AI bias?",
    answer:
      "AI bias is a real concern. When I use AI tools, I am aware that they can reflect biases from their training data. I do my best to identify and correct biased outputs, and I think critically about whether AI recommendations are actually fair or just statistically common.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trust", href: "/trust" },
          { label: "Responsible AI" },
        ]}
        label="Trust"
        title="Responsible AI"
        titleAccent="How I approach AI ethically"
        description="AI is a powerful tool that I use carefully and build with intentionally. This page is about my personal approach to AI ethics — the lines I draw, the principles I follow, and how I make sure AI serves people."
        icon={<Brain className="h-4 w-4" />}
      />

      <SectionContainer id="introduction">
        <SectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                My Perspective
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                AI is a tool
                <br />
                <span className="text-white/40">not a replacement for thinking</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  I am excited about what AI can do. It makes me a faster developer, helps
                  me learn new things quickly, and opens up possibilities that were not
                  practical before. But excitement is not a substitute for responsibility.
                </p>
                <p>
                  This page is about how I personally approach AI — in my development work,
                  in the products I build, and in the content I create. I think every
                  developer who uses or builds with AI should be able to explain their
                  approach clearly.
                </p>
                <p>
                  My approach is simple: AI should help people, not deceive them. It should
                  augment human judgment, not replace it. And when it is involved, people
                  should know.
                </p>
              </div>
            </FadeIn>
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Principles"
            title="My AI principles"
            subtitle="Four beliefs that guide how I use and build with AI."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {principles.map((principle, i) => (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs font-mono text-white/30 mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-3 mb-3">
                    <principle.icon className="h-4 w-4 text-white/25" />
                    <h3 className="text-base font-medium text-white/70">{principle.title}</h3>
                  </div>
                  <p className="text-sm text-white/30 leading-relaxed">{principle.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="In Practice"
            title="How I actually use AI"
            subtitle="Real, honest ways AI fits into my workflow and the lines I draw."
          />

          <div className="space-y-4 max-w-3xl">
            {howIUseAI.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Brain className="h-4 w-4 text-blue-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{item.title}</h3>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="Commitments"
            title="What I promise"
            subtitle="Personal commitments about how I handle AI in my work."
          />

          <FadeIn delay={0.1}>
            <div className="space-y-0 max-w-3xl">
              {commitments.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 py-4 border-b border-white/[0.04]"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: FAST, delay: i * 0.04, ease: ease.out }}
                >
                  <CheckCircle className="h-4 w-4 text-emerald-400/50 mt-0.5 shrink-0" />
                  <p className="text-sm text-white/50 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
        <SectionContainer>
          <SectionTitle
            label="At a Glance"
            title="My AI approach summary"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {[
              { value: "Yes", label: "Human Reviewed", icon: Users },
              { value: "0", label: "Deceptive Uses", icon: Eye },
              { value: "Labeled", label: "AI Content", icon: AlertTriangle },
              { value: "Always", label: "Opt-Out Available", icon: Shield },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-white/60 mb-1">{stat.value}</p>
                  <p className="text-[11px] text-white/25">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
        </SectionContainer>
      </SectionContainer>

      <FAQ title="AI Ethics FAQ" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "AI Research",
            description: "My exploration of AI capabilities and applications.",
            href: "/research/ai",
          },
          {
            title: "Transparency",
            description: "How I build openly and share progress honestly.",
            href: "/trust/transparency",
          },
          {
            title: "Security",
            description: "How I approach security in my development work.",
            href: "/trust/security",
          },
        ]}
      />

      <CTASection
        title="Questions about"
        titleAccent="AI ethics?"
        description="If you have questions about how I approach AI ethically or want to discuss AI ethics in general, reach out. I enjoy these conversations."
        primaryAction={{ label: "Contact me", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "View trust center", href: "/trust" }}
      />
    </>
  );
}
