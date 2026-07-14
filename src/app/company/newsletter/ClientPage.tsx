"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Newspaper,
  BookOpen,
  Rocket,
  ArrowLeft,
  Sparkles,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { personal } from "@/data/personal";
import { SLOW, NORMAL, ease, spring } from "@/lib/motion";
import {
  FadeIn,
  SectionContainer,
  SectionTitle,
  StaggerFade,
  StaggerItem,
} from "@/components/ui/AnimationPrimitives";

const plannedTopics = [
  {
    title: "Product Launches",
    description:
      "Be the first to know when new products, features, or major updates are released across the SP NET ecosystem.",
    icon: Rocket,
  },
  {
    title: "Engineering Insights",
    description:
      "Deep dives into architecture decisions, performance optimizations, and the technical choices behind SP NET products.",
    icon: BookOpen,
  },
  {
    title: "Company Milestones",
    description:
      "Behind-the-scenes updates on SP NET INC growth, partnerships, and the journey from idea to reality.",
    icon: Newspaper,
  },
];

export default function NewsletterClientPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 sm:pt-40 pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(59,130,246,0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-mono text-white/40">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 animate-pulse" />
              Coming Soon
            </span>
          </motion.div>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-white/[0.06]" />
              <Sparkles className="h-5 w-5 text-white/20" />
              <div className="h-px w-12 bg-white/[0.06]" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[0.92]">
              Newsletter
              <br />
              <span className="text-white/40">is on its way</span>
            </h1>
          </motion.div>

          <motion.p
            className="mx-auto max-w-lg text-base sm:text-lg text-white/30 leading-relaxed mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, delay: 0.2, ease: ease.out }}
          >
            A curated newsletter covering product updates, engineering
            insights, and the story behind SP NET INC. No spam, no fluff —
            just the things that matter.
          </motion.p>

          <motion.div
            className="mx-auto max-w-md mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, delay: 0.3, ease: ease.out }}
          >
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                disabled
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/30 placeholder-white/10 focus:outline-none focus:border-white/15 focus:ring-1 focus:ring-white/5 transition-all duration-300 backdrop-blur-sm"
              />
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-xs font-medium text-white/20 backdrop-blur-sm">
                <Mail className="h-3.5 w-3.5" />
                Notify Me
              </span>
            </div>
            <p className="text-[11px] text-white/10 mt-2 font-mono text-center">
              Launching soon — be the first to know
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, delay: 0.4, ease: ease.out }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to Home
            </Link>
          </motion.div>
        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
          aria-hidden="true"
        />
      </section>

      {/* ─── PLANNED TOPICS ───────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <SectionTitle
            label="What to expect"
            title="Planned newsletter topics"
            subtitle="The newsletter will cover three core areas — product updates, engineering deep dives, and company milestones."
          />

          <StaggerFade
            className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            staggerDelay={0.08}
          >
            {plannedTopics.map((topic) => (
              <StaggerItem key={topic.title}>
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] mb-5">
                    <topic.icon className="h-4 w-4 text-white/40" />
                  </div>
                  <h3 className="text-base font-medium text-white/60 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerFade>
      </SectionContainer>

      {/* ─── WHY SUBSCRIBE ────────────────────────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <FadeIn>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/20 mb-4">
                Why subscribe
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92]">
                Curated, not
                <br />
                <span className="text-white/40">automated</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="space-y-5 text-sm sm:text-base text-white/35 leading-relaxed">
                <p>
                  Most newsletters are automated summaries of blog posts. This
                  one will be different. Every issue will be written
                  personally, covering the things that matter — product
                  decisions, engineering trade-offs, and honest reflections on
                  what is being built.
                </p>
                <p>
                  The goal is not volume. It is quality. One well-crafted
                  newsletter per month, covering the most important updates
                  across SP NET INC — products, technology, and the long-term
                  vision.
                </p>
              </div>
            </FadeIn>
          </div>
      </SectionContainer>

      {/* ─── ALTERNATIVE WAYS TO STAY UPDATED ──────────────────── */}
      <SectionContainer className="border-t border-white/[0.04]">
          <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-12 lg:p-16 overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-mono text-white/30 mb-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-400/60 animate-pulse" />
                  While you wait
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[0.92] mb-6">
                  Other ways to
                  <br />
                  <span className="text-white/40">stay updated</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-base sm:text-lg text-white/35 leading-relaxed mb-10 max-w-2xl mx-auto">
                  The newsletter is not ready yet, but there are plenty of
                  other ways to follow the journey. Choose the platform that
                  fits how you like to stay informed.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <motion.a
                    href="/company/newsroom"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors duration-200"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring.gentle}
                  >
                    <Newspaper className="h-4 w-4" />
                    Visit Newsroom
                  </motion.a>
                  <motion.a
                    href="/resources/blog"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/40 hover:text-white/60 hover:border-white/15 transition-all duration-200"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={spring.gentle}
                  >
                    Read the Blog
                    <Clock className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </motion.a>
                </div>
              </FadeIn>
            </div>
          </div>
      </SectionContainer>
    </>
  );
}
