"use client";

import { Cloud, Server, Globe, Container, Zap, Layers, Shield, Gauge } from "lucide-react";
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

const whatImExploring = [
  {
    icon: Container,
    title: "Docker & Containers",
    description:
      "I spent a weekend containerizing the entire SP NET stack and it changed how I think about deployment. Once you go container-first, going back feels archaic. Docker made my development environment reproducible and my deploys predictable.",
  },
  {
    icon: Layers,
    title: "Kubernetes Experiments",
    description:
      "I set up a small K3s cluster on old hardware just to learn orchestration. Managing pods, services, and ingress controllers taught me more about distributed systems than any textbook. It was messy, humbling, and incredibly rewarding.",
  },
  {
    icon: Globe,
    title: "Edge Computing",
    description:
      "Latency matters. I started exploring edge deployment after noticing GRAM felt slow for users far from my main server. Pushing compute closer to users — through CDN Workers and edge functions — is something I actively experiment with.",
  },
  {
    icon: Zap,
    title: "Serverless Functions",
    description:
      "I went through a serverless phase where I rewrote half my API routes as Cloudflare Workers. Some stayed, some didn't. The experience taught me when serverless makes sense and when a good old server is the better choice.",
  },
];

const lessonsLearned = [
  { name: "Container Orchestration", detail: "Hands-on K3s and Docker Swarm experience — understanding service mesh, load balancing, and rolling deployments" },
  { name: "Infrastructure as Code", detail: "Writing Terraform and Pulumi configs to make infrastructure reproducible instead of a one-man snowflake" },
  { name: "CI/CD Pipelines", detail: "Building GitHub Actions workflows that actually work — automated testing, building, and deploying with confidence" },
  { name: "Monitoring & Observability", detail: "Setting up Grafana dashboards and distributed tracing so I can actually see what's happening in production" },
  { name: "Edge Deployment", detail: "Deploying functions to Cloudflare Workers and edge runtimes for sub-50ms responses globally" },
  { name: "Cost Management", detail: "Learning the hard way that cloud bills can spiral — and building habits to monitor and optimize spending early" },
];

const designPrinciples = [
  {
    icon: Shield,
    title: "Design for Failure",
    description: "Everything breaks eventually. I build redundancy, graceful degradation, and automatic recovery into every service — because Murphy's Law is real.",
  },
  {
    icon: Gauge,
    title: "Measure Everything",
    description: "I can't optimize what I can't see. Structured logging, metrics, and alerting are the first things I set up in any new project, not the last.",
  },
  {
    icon: Server,
    title: "Simplicity First",
    description: "Kubernetes is powerful but a simple docker-compose setup might be all you need. I've learned to match the solution to the actual problem, not the imagined scale.",
  },
];

const faqItems = [
  {
    question: "How did you get into cloud infrastructure?",
    answer:
      "Honestly, out of necessity. When I first deployed SP NET GRAM, I was running everything on a single VPS. As users grew, things started breaking. I had to learn about containers, load balancing, and redundancy the hard way — by watching production systems go down at 3 AM.",
  },
  {
    question: "What cloud providers do you use?",
    answer:
      "I keep things provider-agnostic where possible. My main deployments use a mix of traditional VPS providers and edge platforms like Cloudflare. I prefer not to lock myself into any single ecosystem — it keeps costs honest and makes迁移 easier if needed.",
  },
  {
    question: "Do you actually use Kubernetes in production?",
    answer:
      "For my current scale, honestly, Docker Compose and a few well-placed scripts handle things fine. I use Kubernetes in my experimentation cluster and for learning, but I believe in using the right tool for the actual scale, not the imagined scale.",
  },
  {
    question: "What's your approach to server costs?",
    answer:
      "I monitor costs obsessively. Cloud bills are sneaky — a small misconfiguration can cost hundreds overnight. I set up billing alerts early, use spot instances where possible, and regularly audit what's actually being used versus what's just sitting there.",
  },
  {
    question: "What's your biggest cloud lesson so far?",
    answer:
      "Backups. I lost data once because I assumed a managed database was handling backups properly. It wasn't. Now I automate backups, test restores regularly, and never trust a provider's defaults without verifying.",
  },
];

const relatedPages = [
  {
    title: "Artificial Intelligence",
    description: "AI inference powered by scalable cloud infrastructure.",
    href: "/research/ai",
  },
  {
    title: "Cybersecurity",
    description: "Securing infrastructure at every layer.",
    href: "/research/cybersecurity",
  },
  {
    title: "Technologies",
    description: "The technical stack I work with daily.",
          href: "/explore/technology",
  },
];

export default function ClientPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: "Cloud Computing" },
        ]}
        label="Research"
        title="Cloud Computing"
        titleAccent="Scalable infrastructure exploration"
        description="How I learned cloud infrastructure the hard way — by breaking things in production and fixing them at 3 AM. Docker, Kubernetes, edge computing, and serverless experiments."
        icon={<Cloud className="h-4 w-4" />}
      />

      <SectionContainer>
        <SectionTitle
          label="Introduction"
          title="Learning by breaking things"
          subtitle="I didn't take a cloud computing course. I deployed a product, watched it buckle under load, and figured it out. Every lesson here was paid for in late nights and production incidents. That's how I learn best."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
            {[
              { label: "Approach", value: "Learn by doing (and failing)" },
              { label: "Stack", value: "Containers, edge, serverless" },
              { label: "Philosophy", value: "Match tool to actual scale" },
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
          label="What I've Been Exploring"
          title="Hands-on experiments"
          subtitle="These are the areas where I've actually spent time building, breaking, and learning. Not theoretical whitepapers — real weekend projects and production lessons."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whatImExploring.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <motion.div
                  className="group rounded-xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={spring.gentle}
                >
                  <div className="mb-5 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                    <Icon className="h-5 w-5 text-violet-400/70" />
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
          label="Technologies"
          title="What I actually work with"
          subtitle="Not a buzzword list — these are tools I've touched, configured, debugged, and occasionally sworn at while building real infrastructure."
        />
        <StaggerFade staggerDelay={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessonsLearned.map((tech) => (
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
          label="Principles"
          title="What I've learned the hard way"
          subtitle="These aren't best practices from a blog post. They're rules I follow because I've experienced the consequences of ignoring them."
        />
        <StaggerFade staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {designPrinciples.map((principle) => {
            const Icon = principle.icon;
            return (
              <StaggerItem key={principle.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 h-full">
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
                    <Icon className="h-4 w-4 text-violet-400/60" />
                  </div>
                  <h3 className="text-sm font-medium text-white/70 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerFade>
      </SectionContainer>

      <SectionContainer>
        <SectionTitle
          label="Future Goals"
          title="Where I'm heading next"
          subtitle="Things I want to learn and build as I continue growing my infrastructure skills."
        />
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Self-Healing Systems", description: "Building infrastructure that detects and recovers from failures automatically — no 3 AM wake-up calls required." },
              { title: "Predictive Scaling", description: "Using usage patterns to pre-scale infrastructure before traffic spikes, not after users start complaining." },
              { title: "Cost-Optimized Compute", description: "Automatically placing workloads on the most cost-effective compute option — spot instances, edge, or reserved, depending on the job." },
              { title: "Zero-Downtime Deploys", description: "Deploying confidently without users noticing. Blue-green and canary strategies that actually work at small-team scale." },
            ].map((goal, i) => (
              <motion.div
                key={goal.title}
                className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, delay: i * 0.06, ease: ease.out }}
              >
                <h3 className="text-sm font-medium text-white/70 mb-2">
                  {goal.title}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  {goal.description}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </SectionContainer>

      <FAQ title="Frequently Asked Questions" items={faqItems} />

      <RelatedPages title="Explore More" pages={relatedPages} />

      <CTASection
        title="Infrastructure that"
        titleAccent="works when you need it"
        description="Cloud computing is the unsexy foundation that makes everything else possible. I'm sharing what I've learned so you don't have to make the same 3 AM mistakes."
        primaryAction={{
          label: "Check Out My Tech Stack",
    href: "/explore/technology",
        }}
        secondaryAction={{
          label: "View All Research",
          href: "/research",
        }}
      />
    </>
  );
}
