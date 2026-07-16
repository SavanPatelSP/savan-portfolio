"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle,
  Clock,
  Code2,
  MessageSquare,
  Server,
  Zap,
  Globe,
  AlertCircle,
  Brain,
  Briefcase,
  Users,
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

const projects = [
  {
    name: "Portfolio Website",
    description: "This site you are looking at right now",
    status: "Operational",
    statusColor: "emerald",
    icon: Globe,
  },
  {
    name: "SP NET GRAM",
    description: "End-to-end encrypted messaging platform",
    status: "In Development",
    statusColor: "amber",
    icon: MessageSquare,
  },
  {
    name: "SP NET ADMIN OS",
    description: "Administration and management system",
    status: "In Development",
    statusColor: "amber",
    icon: Server,
  },
  {
    name: "SP NET AI",
    description: "AI research and application platform",
    status: "In Development",
    statusColor: "amber",
    icon: Brain,
  },
  {
    name: "Open Source",
    description: "Public tools, libraries, and contributions",
    status: "Active",
    statusColor: "emerald",
    icon: Code2,
  },
];

const availability = [
  {
    title: "Open for Collaboration",
    description:
      "I am always interested in hearing about interesting projects, especially those involving security, messaging, or AI. If you think we could build something cool together, reach out.",
  },
  {
    title: "Freelance Work",
    description:
      "I am available for freelance projects that align with my expertise — full-stack development, security consulting, and AI integration. I am selective about projects because I want to do my best work.",
  },
  {
    title: "Speaking and Writing",
    description:
      "I am open to writing technical articles, giving talks about my projects, or participating in panel discussions about development, security, or AI ethics.",
  },
];

const focusAreas = [
  {
    title: "SP NET GRAM",
    description:
      "Building a secure, encrypted messaging platform. This is my primary focus right now — getting the encryption layer right and making the experience smooth.",
    icon: MessageSquare,
  },
  {
    title: "SP NET AI",
    description:
      "Exploring AI applications and building tools that are both powerful and responsible. Currently researching how to integrate AI into products without compromising privacy.",
    icon: Brain,
  },
  {
    title: "Research",
    description:
      "Staying current with developments in cryptography, AI safety, and secure systems design. Reading papers, experimenting with new approaches, and applying what I learn.",
    icon: Zap,
  },
];

const faqItems = [
  {
    question: "Are you available for new projects?",
    answer:
      "Yes, I am open to collaboration. I am selective about projects because I want to give each one the attention it deserves. If you have an interesting project, especially in security, messaging, or AI, reach out and let us talk about it.",
  },
  {
    question: "What are you working on right now?",
    answer:
      "My current focus is on SP NET GRAM (the encrypted messaging platform), SP NET AI (AI research and applications), and staying current with research in cryptography and AI safety. This portfolio site is live and maintained, but most of my development energy goes to these projects.",
  },
  {
    question: "Can I contribute to your open source projects?",
    answer:
      "My open source projects are currently private and not yet publicly available. I plan to share them when they are ready. In the meantime, you can follow progress on my GitHub at github.com/savanpatelssp.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "The recommended first point of contact is PCA (Personal Communication Assistant) at https://t.me/SAVANPATELSP_BOT. You can also reach me via email at hello@sp-net.in or savan@sp-net.in. I try to respond to messages within a day or two.",
  },
  {
    question: "What is the status of SP NET GRAM?",
    answer:
      "SP NET GRAM is in active development. The core messaging and encryption architecture is being built out. It is not publicly available yet, but I share progress updates on GitHub and social platforms. The project is a priority and is moving forward steadily.",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Trust", href: "/trust" },
          { label: "Status" },
        ]}
        label="Trust"
        title="Status"
        titleAccent="Personal availability dashboard"
        description="Not a corporate system status page. This is my personal dashboard showing what I am working on, what is available, and whether I am open for new things."
        icon={<Activity className="h-4 w-4" />}
        badge="Open for collaboration"
      />

      <SectionContainer id="introduction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                What This Is
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Not a system status
                <br />
                <span className="text-white/40">a personal dashboard</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  This is not a page with uptime percentages and incident reports. This
                  is a personal dashboard that shows what I am working on, what exists,
                  and whether I have time for new things.
                </p>
                <p>
                  I believe in being honest about where my time goes. Instead of making
                  it look like everything is perfectly operational when some projects are
                  still in early stages, I would rather show you the real picture.
                </p>
                <p>
                  Updated as things change. Last refreshed today.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Project Status"
            title="What exists and what is being built"
            subtitle="Honest status of every project — from fully operational to early development."
          />

          <StaggerFade className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
            {projects.map((project) => (
              <StaggerItem key={project.name}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      <project.icon className="h-4 w-4 text-white/25" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white/60">{project.name}</h3>
                      <p className="text-xs text-white/25">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 pt-4 border-t border-white/[0.04]">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        project.statusColor === "emerald" && "bg-emerald-400/60",
                        project.statusColor === "amber" && "bg-amber-400/60",
                        project.statusColor === "red" && "bg-red-400/60"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium",
                        project.statusColor === "emerald" && "text-emerald-400/60",
                        project.statusColor === "amber" && "text-amber-400/60",
                        project.statusColor === "red" && "text-red-400/60"
                      )}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Current Focus"
            title="Where my energy goes"
            subtitle="The projects and areas I am actively investing time in right now."
          />

          <div className="space-y-4 max-w-3xl">
            {focusAreas.map((item, i) => (
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
                    <item.icon className="h-4 w-4 text-blue-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{item.title}</h3>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Availability"
            title="Am I available?"
            subtitle="What I am open to and how to reach me."
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {availability.map((item, i) => (
              <motion.div
                key={item.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: FAST, delay: i * 0.06, ease: ease.out }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <Briefcase className="h-4 w-4 text-white/25" />
                  </div>
                  <h3 className="text-sm font-medium text-white/60">{item.title}</h3>
                </div>
                <p className="text-sm text-white/35 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
      </SectionContainer>

      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="Quick Info"
            title="At a glance"
          />

          <StaggerFade className="grid grid-cols-2 sm:grid-cols-4 gap-4" staggerDelay={0.06}>
            {[
              { value: "5", label: "Projects", icon: Briefcase },
              { value: "3", label: "In Development", icon: Clock },
              { value: "Active", label: "Open Source", icon: Code2 },
              { value: "Open", label: "For Collaboration", icon: Users },
            ].map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 text-center">
                  <stat.icon className="h-4 w-4 text-white/20 mx-auto mb-3" />
                  <p className="text-2xl font-semibold text-white/60 mb-1">{stat.value}</p>
                  <p className="text-[11px] text-white/35">{stat.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      <FAQ title="Availability FAQ" items={faqItems} />

      <RelatedPages
        title="Explore More"
        pages={[
          {
            title: "Contact",
            description: "Get in touch — I actually read and respond to every message.",
            href: "/get-in-touch",
          },
          {
            title: "Roadmap",
            description: "What is planned and where projects are headed.",
            href: "/founder/roadmap",
          },
          {
            title: "GitHub",
            description: "My public repositories and development activity.",
            href: "https://github.com/savanpatelssp",
          },
        ]}
      />

      <CTASection
        title="Want to"
        titleAccent="work together?"
        description="I am open to interesting collaborations, freelance projects, and conversations about technology. Reach out and let us talk."
        primaryAction={{ label: "Contact me", href: "mailto:savan@sp-net.in" }}
        secondaryAction={{ label: "View trust center", href: "/trust" }}
      />
    </>
  );
}
