"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Feather } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard } from "@/components/blog/BlogCards";
import { useSavedPosts } from "@/lib/saved";
import type { BlogPost } from "@/data/blog";
import { NORMAL, SLOW, ease } from "@/lib/motion";

export default function SavedPage({ posts }: { posts: BlogPost[] }) {
  const saved = useSavedPosts();
  const savedPosts = posts.filter((post) => saved.includes(post.slug));

  return (
    <>
      <header className="relative overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 h-96 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10 sm:pb-14">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Saved" },
            ]}
            className="mb-8 sm:mb-10"
          />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW, ease: ease.out }}
            className="max-w-2xl"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400/70">
              Your reading list
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.04]">
              Saved for later.
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/40 leading-relaxed">
              Posts you saved with the ♡ button live here — stored only in this browser,
              never uploaded. Saved from a different browser? They&apos;ll be here once
              you save them again.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {savedPosts.length > 0 ? (
          <>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                {savedPosts.length} {savedPosts.length === 1 ? "post" : "posts"} saved
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
            </div>
            <motion.div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: NORMAL, ease: ease.out }}
            >
              {savedPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.01] px-6 py-20 text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: NORMAL, ease: ease.out }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <Bookmark className="h-5 w-5 text-white/30" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-lg font-semibold text-white/80">Nothing saved yet</h2>
            <p className="mt-2 max-w-sm text-sm text-white/35 leading-relaxed">
              Tap the ♡ Save button on any story to keep it here for later. Your list stays
              on this device.
            </p>
            <Link
              href="/blog"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              Back to the Blog
            </Link>
            <p className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/20">
              <Feather className="h-3 w-3" aria-hidden="true" />
              Lead · Build · Connect
            </p>
          </motion.div>
        )}
      </section>
    </>
  );
}
