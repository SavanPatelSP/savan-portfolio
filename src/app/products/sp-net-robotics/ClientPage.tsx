"use client";

import { motion } from "framer-motion";
import {
  Cog,
  Navigation,
  Eye,
  ListTodo,
  Hand,
  Boxes,
  Brain,
  Shield,
  Zap,
  Globe,
  Radio,
  Workflow,
} from "lucide-react";
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

const features = [
  {
    icon: Navigation,
    title: "Autonomous Navigation",
    description:
      "Path planning and obstacle avoidance using computer vision and sensor fusion. Robots navigate complex environments without human intervention.",
  },
  {
    icon: Eye,
    title: "Object Recognition",
    description:
      "Real-time identification and tracking of objects, people, and environments. Visual understanding that bridges digital intelligence and physical spaces.",
  },
  {
    icon: ListTodo,
    title: "Task Planning",
    description:
      "High-level task decomposition and sequencing. Describe what you want done in natural language, and the system breaks it into executable robotic actions.",
  },
  {
    icon: Hand,
    title: "Human-Robot Interaction",
    description:
      "Natural language commands, gesture recognition, and intuitive interfaces for controlling and collaborating with robotic systems.",
  },
  {
    icon: Boxes,
    title: "Simulation Environment",
    description:
      "A physics-accurate simulation platform for testing robotic behaviors before deploying to physical hardware. Safe, fast, and repeatable testing.",
  },
  {
    icon: Radio,
    title: "Fleet Management",
    description:
      "Monitor and coordinate multiple robots from a central dashboard. Task assignment, health monitoring, and over-the-air updates at scale.",
  },
];

const principles = [
  {
    icon: Brain,
    title: "AI-First Intelligence",
    description: "SP NET AI provides the reasoning backbone — robots understand context, adapt to new situations, and improve through experience.",
  },
  {
    icon: Shield,
    title: "Safety by Design",
    description: "Hardware and software safety mechanisms ensure robots operate within defined boundaries. Emergency stop, collision avoidance, and human oversight at every level.",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "On-device inference for latency-critical decisions. Navigation, object recognition, and safety checks happen in milliseconds — not dependent on cloud connectivity.",
  },
  {
    icon: Globe,
    title: "Open Research",
    description: "Research findings, simulation tools, and select algorithms published openly to advance the robotics community and invite collaboration.",
  },
  {
    icon: Workflow,
    title: "Ecosystem Integration",
    description: "Robots connect to the SP NET ecosystem — receiving tasks from WORKPLACE, reporting to ADMIN OS, and leveraging AI capabilities across the platform.",
  },
];

const faqItems = [
  {
    question: "What is SP NET Robotics?",
    answer: "SP NET Robotics is a research initiative exploring how the SP NET AI platform can bridge the gap between digital intelligence and physical-world automation. It focuses on autonomous navigation, object recognition, task planning, and human-robot interaction.",
  },
  {
    question: "What types of robots will it support?",
    answer: "SP NET Robotics is being designed as a software platform that works with a variety of robotic form factors — from stationary industrial arms to mobile warehouse robots to humanoid research platforms. The focus is on the intelligence layer, not specific hardware.",
  },
  {
    question: "How does SP NET AI power the robots?",
    answer: "SP NET AI provides the reasoning and decision-making capabilities. It handles natural language task understanding, context awareness, and learning from experience. On-device inference runs lightweight models for real-time decisions, while more complex reasoning can leverage cloud compute.",
  },
  {
    question: "Is this commercial or academic research?",
    answer: "SP NET Robotics is exploratory research at this stage. The goal is to understand how the SP NET AI platform can extend into physical-world automation. Select findings and tools will be published openly to contribute to the broader robotics research community.",
  },
  {
    question: "When will SP NET Robotics have working prototypes?",
    answer: "SP NET Robotics is a long-term initiative in early exploration. Simulation environments and software prototypes are being developed first, with physical hardware integration planned as the software platform matures.",
  },
  {
    question: "How can I get in touch or learn more?",
    answer: "For any inquiries about SP NET Robotics, reach out to our Personal Communication Assistant (PCA) at https://t.me/SAVANPATELSP_BOT — it is the recommended first point of contact for questions, feedback, and support. You can also email us at hello@sp-net.in or business@sp-net.in. For scheduling a meeting, visit cal.com/savanpatel.",
  },
];

const relatedPages = [
  {
    title: "SP NET AI",
    description: "The AI platform providing intelligence for robotic systems.",
    href: "/products/sp-net-ai",
  },
  {
    title: "SP NET Cloud",
    description: "Cloud infrastructure for simulation and fleet management.",
    href: "/products/sp-net-cloud",
  },
  {
    title: "SP NET Security",
    description: "Safety and security monitoring for robotic operations.",
    href: "/products/sp-net-security",
  },
  {
    title: "SP NET WORKPLACE",
    description: "Task management and coordination for robotic workflows.",
    href: "/products/sp-net-workplace",
  },
  {
    title: "SP NET Ecosystem",
    description: "The connected platform all robotic systems integrate with.",
    href: "/products/sp-net-ecosystem",
  },
  {
    title: "About Savan Patel",
    description: "The founder and product engineer behind SP NET INC.",
    href: "/founder/about",
  },
];

export default function SPNetRoboticsClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Products", href: "/products" }, { label: "SP NET Robotics" }]}
        label="Innovation Lab"
        badge="Coming Soon"
        title="SP NET Robotics"
        titleAccent="Intelligence meets the physical world"
        description="A robotics research initiative exploring how the SP NET AI platform can bridge the gap between digital intelligence and physical-world automation."
        icon={<Cog className="h-3.5 w-3.5" />}
      />

      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          <SectionTitle
            label="Introduction"
            title="Bringing AI into the physical world"
            subtitle="SP NET Robotics explores how the intelligence capabilities built for the SP NET ecosystem can extend beyond screens and into physical-world automation."
          />

          <FadeIn delay={0.15}>
            <div className="space-y-6 text-sm sm:text-base text-white/30 leading-relaxed max-w-3xl">
              <p>
                The most profound impact of AI will not be in software — it will be in the
                physical world. Robots that can navigate complex environments, understand
                human intent, and adapt to unexpected situations represent the next frontier
                of intelligent automation.
              </p>
              <p>
                SP NET Robotics is an exploratory research initiative investigating how the
                SP NET AI platform — already designed for context awareness, reasoning, and
                adaptive behavior — can extend to physical robotic systems. The same intelligence
                that helps you compose a message or manage a team could help a robot navigate
                a warehouse or assist in a surgical procedure.
              </p>
              <p>
                This research is early-stage and long-term. We are building simulation
                environments, developing software prototypes, and exploring how the SP NET
                ecosystem's existing capabilities — AI, cloud infrastructure, security, and
                workspace tools — can provide a foundation for robotic intelligence.
              </p>
            </div>
          </FadeIn>
        </div>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Research Areas"
          title="Six directions of exploration"
          subtitle="Core research areas that define how SP NET approaches robotic intelligence."
        />

        <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="group relative rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-7 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={spring.gentle}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/8 text-emerald-400 border border-emerald-500/10">
                    <feature.icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70">{feature.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-white/25 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer className="pt-0">
        <SectionTitle
          label="Principles"
          title="Guiding the research"
          subtitle="Five principles that shape how SP NET approaches robotics."
        />

        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {principles.map((item) => (
            <StaggerItem key={item.title}>
              <div className="flex items-start gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-5 sm:p-6">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30">
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/50 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-white/20 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerFade>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Interested in the future of robotics?"
        description="SP NET Robotics is exploring how AI can extend into the physical world. Follow our research for updates."
        primaryAction={{ label: "Get in Touch", href: "/get-in-touch" }}
        secondaryAction={{ label: "Back to Products", href: "/products" }}
      />
    </>
  );
}
