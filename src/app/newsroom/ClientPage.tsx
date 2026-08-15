"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Check,
  Feather,
  Megaphone,
  Newspaper,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/ui/CTASection";
import type { NewsroomPost } from "@/data/newsroom";
import { SLOW, NORMAL, ease } from "@/lib/motion";

const expectedContent = [
  {
    icon: Rocket,
    title: "Product launches",
    description: "When a product ships, opens to beta, or reaches a major milestone — the announcement lands here.",
  },
  {
    icon: Building2,
    title: "Company milestones",
    description: "Official updates on SP NET INC — founding decisions, growth, and structural changes.",
  },
  {
    icon: ShieldCheck,
    title: "Official statements",
    description: "Anything that needs to be said in SP NET INC's voice, in full, without noise.",
  },
  {
    icon: Megaphone,
    title: "Release news",
    description: "Significant releases across the ecosystem, with dates and details verified.",
  },
];

const statusSlots = [
  { label: "Launch", code: "LAUNCH", tone: "text-emerald-400/70 border-emerald-400/20" },
  { label: "Milestone", code: "MILESTONE", tone: "text-blue-400/70 border-blue-400/20" },
  { label: "Statement", code: "STATEMENT", tone: "text-amber-400/70 border-amber-400/20" },
];

export default function NewsroomIndexPage({ posts }: { posts: NewsroomPost[] }) {
  const hasPosts = posts.length > 0;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Newsroom" }]}
        label="Newsroom"
        title="Newsroom"
        titleAccent="Official updates from Savan Patel & SP NET INC."
        description="Product announcements, launches, milestones, and official statements — published only when there is real, confirmed news. No noise, no placeholder announcements."
        icon={<Newspaper className="h-4 w-4" />}
      />

      {hasPosts ? (
        /* ─── Announcements timeline ─── */
        <section className="relative py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30">
                Announcements
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
            </div>
            <ol className="relative border-l border-white/[0.08] space-y-8">
              {posts.map((post, i) => (
                <motion.li
                  key={post.slug}
                  className="relative pl-6 sm:pl-8"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: NORMAL, delay: i * 0.05, ease: ease.out }}
                >
                  <span
                    className="absolute left-0 top-1.5 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-blue-400/60 ring-4 ring-blue-400/10"
                    aria-hidden="true"
                  />
                  <Link
                    href={`/newsroom/${post.slug}`}
                    className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <time dateTime={post.date} className="text-[11px] font-mono uppercase tracking-wider text-white/30">
                        {post.date}
                      </time>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/[0.02] text-white/35">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-white/85 group-hover:text-white transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-white/35 leading-relaxed">{post.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-300/60 group-hover:text-blue-300/90 transition-colors duration-200">
                      Read announcement
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      ) : (
        /* ─── Official empty state ─── */
        <section className="relative py-8 sm:py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0b0f1a] to-[#07080d]"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: SLOW, ease: ease.out }}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-blue-500/[0.06] blur-[80px]" />
              </div>

              <div className="relative p-6 sm:p-10 lg:p-12">
                {/* Status header */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-white/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70 animate-pulse-soft" aria-hidden="true" />
                    Awaiting first announcement
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/25">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/60" aria-hidden="true" />
                    Verified only
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-tight">
                  No announcements published
                  <br />
                  <span className="text-white/40">yet. That is intentional.</span>
                </h2>

                <p className="mt-5 max-w-xl text-sm sm:text-base text-white/40 leading-relaxed">
                  This Newsroom publishes only official, confirmed announcements from SP NET INC.
                  Right now there is nothing real to announce — and we will not fabricate news to
                  fill the space. When a product launches, a milestone is reached, or an official
                  statement needs to be made, it will appear here first.
                </p>

                {/* Timeline structure preview */}
                <div className="mt-10">
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/25 mb-5">
                    Announcement stream
                  </p>
                  <div className="space-y-0">
                    {statusSlots.map((slot, i) => (
                      <div key={slot.code} className="flex items-center gap-4">
                        <div className="flex flex-col items-center self-stretch">
                          <span
                            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border ${slot.tone}`}
                            aria-hidden="true"
                          />
                          {i < statusSlots.length - 1 && (
                            <span className="w-px flex-1 bg-white/[0.06]" aria-hidden="true" />
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-4 py-3 flex-1 min-w-0">
                          <span className="text-sm text-white/45">{slot.label}</span>
                          <span className="text-[10px] font-mono tracking-[0.2em] text-white/20">
                            {slot.code}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 transition-all duration-200 min-h-[48px]"
                  >
                    <Feather className="h-4 w-4" aria-hidden="true" />
                    Read the Blog instead
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-5 py-3 text-sm font-medium text-white/45 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200 min-h-[48px]"
                  >
                    Explore products in development
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* What appears here */}
      <section className="relative py-16 sm:py-20 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/30">
              What appears here
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            {expectedContent.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 hover:border-white/[0.10] hover:bg-white/[0.02] transition-all duration-300"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] mb-4">
                  <item.icon className="h-4 w-4 text-white/40" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-medium text-white/70">{item.title}</h3>
                <p className="mt-2 text-xs text-white/35 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: NORMAL, ease: ease.out }}
          >
            <div className="flex items-start gap-3">
              <Sparkles className="h-4 w-4 text-blue-400/70 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-white/70">Not official — just personal writing?</p>
                <p className="text-xs text-white/35 mt-1">
                  Founder thoughts, engineering lessons, and ideas live on the Blog.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/25">
                <Check className="h-3.5 w-3.5 text-emerald-400/60" aria-hidden="true" />
                Newsroom = official
              </span>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-4 py-2 text-xs font-medium text-white/45 hover:text-white/75 hover:border-white/[0.16] transition-all duration-200 min-h-[44px]"
              >
                Visit Blog
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        title="When there is real news,"
        titleAccent="it will start here."
        description="Subscribe to the RSS feed or follow the Blog for what is being built. The Newsroom will remain empty until there is something official to say."
        primaryAction={{ label: "Read the Blog", href: "/blog" }}
        secondaryAction={{ label: "Get in touch", href: "/get-in-touch" }}
      />
    </>
  );
}
