"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Feather, Newspaper, Rss } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { FeaturedCard, PostCard, NextStoryCard } from "@/components/blog/BlogCards";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import type { BlogPost } from "@/data/blog";
import type { BlogCategory } from "@/data/blog";
import { SLOW, NORMAL, ease } from "@/lib/motion";

function SectionRule({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
    </div>
  );
}

export default function BlogIndexPage({
  posts,
  pinned,
  categories,
  recommended,
}: {
  posts: BlogPost[];
  pinned?: BlogPost;
  categories: BlogCategory[];
  recommended: BlogPost[];
}) {
  const latest = posts.filter((post) => post.slug !== pinned?.slug);
  const fillCount = latest.length < 3 ? 3 - latest.length : 0;
  const storyCount = posts.length === 1 ? "1 story" : `${posts.length} stories`;

  return (
    <>
      {/* ─── Editorial masthead ─────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-white/[0.05]">
        {/* Ambient backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 100%)",
            }}
          />
          <div className="absolute -top-40 left-1/2 h-96 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10 sm:pb-14">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} className="mb-8 sm:mb-10" />

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: NORMAL, delay: 0.05, ease: ease.out }}
              >
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400/70">
                  The Blog · {storyCount}
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
                className="mt-4 text-3xl sm:text-4xl md:text-[2.85rem] font-semibold tracking-tight text-white leading-[1.04]"
              >
                Ideas, experiments
                <br className="hidden sm:block" />
                <span className="text-white/40">&amp; the things I&apos;m building.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: NORMAL, delay: 0.16, ease: ease.out }}
                className="mt-5 max-w-xl text-sm sm:text-base text-white/40 leading-relaxed"
              >
                Personal writing from Savan Patel — engineering lessons, founder thoughts,
                product-building, and the ideas shaping what comes next. Written in one voice,
                without a press office.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: NORMAL, delay: 0.24 }}
                className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/25"
              >
                Lead · Build · Connect
              </motion.p>
            </div>

            <motion.a
              href="/blog/rss.xml"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: NORMAL, delay: 0.2, ease: ease.out }}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs font-medium text-white/40 hover:text-white/70 hover:border-white/[0.15] transition-all duration-200"
              aria-label="Subscribe to the blog RSS feed"
            >
              <Rss className="h-3.5 w-3.5 group-hover:text-blue-400/70 transition-colors duration-200" aria-hidden="true" />
              RSS Feed
            </motion.a>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, delay: 0.28, ease: ease.out }}
            className="mt-8 max-w-2xl"
          >
            <BlogSearch posts={posts} />
          </motion.div>
        </div>
      </header>

      {/* ─── Current issue (pinned) ──────────────────────────────── */}
      {pinned && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="mb-6">
            <SectionRule>Current issue</SectionRule>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW, delay: 0.1, ease: ease.out }}
          >
            <FeaturedCard post={pinned} />
          </motion.div>
        </section>
      )}

      {/* ─── Latest stories + sidebar ────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="mb-6 flex items-center justify-between gap-4">
              <SectionRule>Latest stories</SectionRule>
              {latest.length > 0 && (
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                  {latest.length} {latest.length === 1 ? "story" : "stories"}
                </span>
              )}
            </div>

            <motion.div
              className="grid gap-5 sm:grid-cols-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: SLOW, ease: ease.out }}
            >
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
              {Array.from({ length: fillCount }).map((_, i) => (
                <NextStoryCard key={`next-${i}`} />
              ))}
            </motion.div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <BlogSidebar posts={posts} categories={categories} recommended={recommended} />
          </aside>
        </div>
      </section>

      {/* ─── Explore by topic ────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="border-t border-white/[0.05] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <SectionRule>Explore by topic</SectionRule>
            </div>
            <motion.div
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: SLOW, ease: ease.out }}
            >
              {categories.map((category) => {
                const count = posts.filter((post) => post.category === category.label).length;
                return (
                  <Link
                    key={category.slug}
                    href={`/blog/category/${category.slug}`}
                    className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 hover:border-white/[0.13] hover:bg-white/[0.02] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-semibold text-white/85 group-hover:text-white transition-colors duration-200">
                        {category.label}
                      </h3>
                      <span className="shrink-0 rounded-full border border-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-white/30">
                        {count} {count === 1 ? "story" : "stories"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-white/35 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400/70 group-hover:text-blue-300 transition-colors duration-200">
                      Browse {category.label}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── Blog vs Newsroom ────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Feather className="h-4 w-4 text-blue-400/70" aria-hidden="true" />
                </span>
                <h2 className="text-base font-semibold text-white/80">You are here — the Blog</h2>
              </div>
              <p className="text-sm text-white/35 leading-relaxed">
                Personal and editorial writing. Engineering lessons, founder thoughts,
                experiments, and ideas — written in my own voice, without a press office.
              </p>
              <span className="mt-4 inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400/50">
                Personal · Editorial · Ideas
              </span>
            </div>

            <Link
              href="/newsroom"
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-6 sm:p-8 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <Newspaper className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors duration-200" aria-hidden="true" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/20 group-hover:text-white/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" aria-hidden="true" />
              </div>
              <h2 className="text-base font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
                Newsroom
              </h2>
              <p className="mt-1 text-sm text-white/35 leading-relaxed">
                Official announcements from SP NET INC — launches, milestones, and official
                statements. Verified, considered, and published only when there is real news.
              </p>
              <span className="mt-4 inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors duration-200">
                Official · Announcements · Updates
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── More from Savan ─────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionRule>More from Savan</SectionRule>
          </div>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            {[
              {
                title: "The Founder",
                desc: "Who I am, what I believe, and why I build.",
                href: "/founder",
              },
              {
                title: "What I'm Building",
                desc: "SP NET products and projects in development.",
                href: "/explore",
              },
              {
                title: "Get in Touch",
                desc: "For work, ideas, or a real conversation.",
                href: "/contact",
              },
              {
                title: "All Socials",
                desc: "Profiles across every platform, in one place.",
                href: "/company/socials",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 hover:border-white/[0.13] hover:bg-white/[0.02] transition-all duration-300"
              >
                <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </p>
                <p className="mt-1.5 text-xs text-white/35 leading-relaxed">{item.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400/70 group-hover:text-blue-300 transition-colors duration-200">
                  Explore
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Editorial band ──────────────────────────────────────── */}
      <section className="border-t border-white/[0.05] py-20 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400/60">
              Join the journey
            </p>
            <h2 className="mt-5 text-3xl sm:text-5xl font-semibold tracking-tight text-white">
              Keep building.
            </h2>
            <p className="mt-5 mx-auto max-w-md text-sm sm:text-base text-white/40 leading-relaxed">
              More ideas, experiments, and announcements are coming. The first story is
              published — the rest are being written.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
              Lead · Build · Connect
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/blog/rss.xml"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                <Rss className="h-4 w-4" aria-hidden="true" />
                Subscribe via RSS
              </a>
              <Link
                href="/company/newsletter"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-5 py-3 text-sm font-medium text-white/50 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200"
              >
                Join the newsletter
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
