"use client";

import { Brain, Lightbulb, Database, Sparkles, Rocket, MessageSquare, Code2 } from "lucide-react";
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

const journeyHighlights = [
  {
    icon: MessageSquare,
    title: "Smart Features in GRAM",
    description:
      "I started experimenting with AI inside SP NET GRAM — things like smart compose suggestions, message summarization, and tone adjustment. It began as a late-night curiosity and turned into one of my favorite parts of building GRAM.",
  },
  {
    icon: Code2,
    title: "AI in ADMIN OS",
    description:
      "Bringing AI into SP NET ADMIN OS was a different challenge. I wanted automated anomaly detection, predictive resource allocation, and approval workflows that learn from patterns — not just hardcoded rules.",
  },
  {
    icon: Database,
    title: "Vector Databases",
    description:
      "I fell into the rabbit hole of vector embeddings and semantic search. Building retrieval-augmented generation pipelines for GRAM's knowledge base taught me more about practical AI than any course ever could.",
  },
];

const thingsILearned = [
  { name: "Large Language Models", detail: "Working with open-source and proprietary LLMs to understand what works best for different tasks" },
  { name: "Prompt Engineering", detail: "Spending way too many hours crafting prompts that actually produce consistent, useful output" },
  { name: "Vector Databases", detail: "Building semantic search and RAG pipelines — embedding data and querying it by meaning, not keywords" },
  { name: "AI Agents", detail: "Experimenting with autonomous agents that can plan, reason, and execute multi-step tasks" },
  { name: "On-Device Inference", detail: "Exploring edge-deployed models for low-latency AI that respects user privacy" },
  { name: "Fine-Tuning", detail: "Learning how to adapt base models to specific domains without destroying their general capabilities" },
];

const futureGoals = [
  {
    icon: Sparkles,
    title: "Multi-Modal AI",
    description: "I want GRAM to understand text, images, voice, and structured data together — not in silos. Building unified pipelines that handle all of these is the next big thing I want to crack.",
  },
  {
    icon: Rocket,
    title: "Proactive Intelligence",
    description: "The dream is AI that acts before you ask. Analyzing usage patterns, time signals, and context to automate routine decisions without being prompted.",
  },
  {
    icon: Lightbulb,
    title: "Federated Learning",
    description: "Improving models across the ecosystem without centralizing user data. Privacy and performance shouldn't be trade-offs — they should reinforce each other.",
  },
  {
    icon: Brain,
    title: "Cross-Product Reasoning",
    description: "Enabling AI to reason across data from GRAM, ADMIN OS, and every future product — pulling together insights that no single product could surface alone.",
  },
];

const faqItems = [
  {
    question: "How did you get into AI?",
    answer:
      "It started around 2021 when I was building features for SP NET GRAM and realized that rule-based systems weren't going to cut it for things like smart compose. I started reading about LLMs, built some prototypes, and got completely hooked. AI went from a tool I used to a fundamental part of how I think about building products.",
  },
  {
    question: "What AI tools do you use day-to-day?",
    answer:
      "I work with a mix of open-source models (Llama, Mistral) and API-based models depending on the task. For vector databases I have experimented with Pinecone and pgvector. For prompt engineering, I just use a lot of trial and error and patience.",
  },
  {
    question: "Is SP NET GRAM's AI all self-built?",
    answer:
      "Not entirely. I use a combination of third-party APIs, open-source models, and custom fine-tuned pipelines. The architecture is designed to be modular — I can swap models and providers without rewriting the entire AI layer.",
  },
  {
    question: "What excites you most about AI right now?",
    answer:
      "AI agents that can actually reason and plan. Not just chatbots that regurgitate training data, but systems that can break down complex problems, execute multi-step workflows, and learn from outcomes. That's where things get really interesting for products like GRAM and ADMIN OS.",
  },
  {
    question: "How do you approach AI privacy?",
    answer:
      "Privacy is non-negotiable. I default to on-device inference for anything sensitive, and I never store raw user data beyond active sessions. The architecture supports zero data retention by default — users have to explicitly opt into cloud-enhanced features.",
  },
  {
    question: "Is SP NET GRAM or ADMIN OS publicly available?",
    answer:
      "Not yet. GRAM, ADMIN OS, and SP NET AI are all in active development. I'm building them carefully and won't release them until they meet the quality and security standards I hold myself to.",
  },
  {
    question: "Are your open source projects available to the public?",
    answer:
      "My open source projects are currently private. I plan to open-source selected projects at the right time, but for now they remain internal as they're still evolving rapidly.",
  },
  {
    question: "How can I get involved or contribute?",
    answer:
      "For any inquiry — collaboration, questions, or just connecting — PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT is the recommended first point of contact. You can also reach me by email at hello@sp-net.in or schedule a call at cal.com/savanpatel.",
  },
  {
    question: "Where can I follow your work on social media?",
    answer:
      "X (Twitter) and LinkedIn profiles are coming soon. For now, the best way to stay updated is through PCA at https://t.me/SAVANPATELSP_BOT or by reaching out via email.",
  },
];

const relatedPages = [
  {
    title: "Cloud Computing",
    description: "The infrastructure that powers distributed AI inference and data processing.",
    href: "/research/cloud",
  },
  {
    title: "Cybersecurity",
    description: "Protecting AI systems and user data with security-first design.",
    href: "/research/cybersecurity",
  },
  {
    title: "Innovation Lab",
    description: "Where experimental AI ideas get tested and prototyped.",
    href: "/research/innovation-lab",
  },
  {
    title: "SP NET AI",
    description: "The AI platform powering intelligent features across the ecosystem.",
    href: "/products/sp-net-ai",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "Artificial Intelligence" },
        ]}
        label="Research"
        title="Artificial Intelligence"
        titleAccent="Exploring intelligent systems"
        description="My personal journey into AI — from learning what LLMs are to building real AI features in SP NET GRAM and ADMIN OS. This is genuine exploration, not corporate research."
        icon={<Brain className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="How I got into AI"
          subtitle="I didn't start with a grand AI strategy. I started with a problem in SP NET GRAM that rule-based logic couldn't solve, and I went down the rabbit hole. What began as late-night experimentation turned into one of the most defining parts of my engineering journey."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Started", value: "Around 2021" },
              { label: "Motivation", value: "Solving real problems" },
              { label: "Philosophy", value: "Build first, theorize later" },
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
          label="What I've Been Working On"
          title="Building AI into real products"
          subtitle="Most of my AI learning has happened through building. I don't read papers for fun — I read them when I'm stuck on a problem in GRAM or ADMIN OS and need a better approach."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {journeyHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-blue-400/70" />
                  </div>
                  <h3 className="text-base font-medium text-white/80 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Technologies I Work With"
          title="The technical foundation"
          subtitle="These aren't things I listed on a resume — they're things I've actually used while building AI features for my own products."
        />
        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {thingsILearned.map((tech) => (
            <StaggerItem key={tech.name}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                <h3 className="text-sm font-medium text-white/70 mb-2">
                  {tech.name}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  {tech.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Vision"
          title="What I want to build next"
          subtitle="These aren't research roadmaps from a strategy deck. They're the things I personally want to figure out — the problems I can't stop thinking about."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futureGoals.map((goal) => {
            const Icon = goal.icon;
            return (
              <StaggerItem key={goal.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-blue-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Perspective"
          title="AI should amplify, not replace"
        />
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 shrink-0">
                <Lightbulb className="h-6 w-6 text-blue-400/50" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white/70 mb-1">
                  Human-Centered Approach
                </h3>
                <p className="text-sm text-white/30 leading-relaxed">
                  Every AI feature I build has to pass one test: does it make the user more capable? I&apos;m not interested in AI for the sake of buzzwords. If it doesn&apos;t genuinely help someone do their work better, faster, or more comfortably — it doesn&apos;t ship. Transparency over black-box optimization, always.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Always learning,"
        titleAccent="always building"
        description="AI is one of those fields where the more you learn, the more you realize how much you don't know. I'm sharing my journey honestly — the breakthroughs and the dead ends."
        primaryAction={{
          label: "See What I've Built",
          href: "/products/sp-net-ai",
        }}
        secondaryAction={{
          label: "View All Research",
          href: "/research",
        }}
      />
    </>
  );
}
