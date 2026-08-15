"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PostCard, NextStoryCard } from "@/components/blog/BlogCards";
import { BlogSearch } from "@/components/blog/BlogSearch";
import type { BlogCategory } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import { getBlogCategories } from "@/data/blog";
import { SLOW, ease } from "@/lib/motion";

export default function BlogCategoryPage({
  category,
  posts,
}: {
  category: BlogCategory;
  posts: BlogPost[];
}) {
  const categories = getBlogCategories();
  const fillCount = posts.length < 3 ? 3 - posts.length : 0;
  const count = posts.length === 1 ? "1 story" : `${posts.length} stories`;

  return (
    <>
      <header className="relative overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 h-80 w-[min(90vw,680px)] -translate-x-1/2 rounded-full bg-blue-500/[0.06] blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10 sm:pb-12">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: category.label }]}
            className="mb-8 sm:mb-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400/70">
              Topic
            </p>
            <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.04]">
              {category.label}
            </h1>
            <p className="mt-4 max-w-xl text-sm sm:text-base text-white/40 leading-relaxed">
              {category.description}
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              {count}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW, delay: 0.08, ease: ease.out }}
            className="mt-8 max-w-2xl"
          >
            <BlogSearch posts={posts} />
          </motion.div>
        </div>
      </header>

      {/* Category filter chips */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <nav aria-label="Category filter" className="flex flex-wrap items-center gap-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-white/40 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200"
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}`}
              aria-current={c.slug === category.slug ? "page" : undefined}
              className={
                c.slug === category.slug
                  ? "inline-flex items-center rounded-full bg-white px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-black"
                  : "inline-flex items-center rounded-full border border-white/[0.08] px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-white/40 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200"
              }
            >
              {c.label}
            </Link>
          ))}
        </nav>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <motion.div
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: SLOW, ease: ease.out }}
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          {fillCount > 0 && Array.from({ length: fillCount }).map((_, i) => (
            <NextStoryCard key={`next-${i}`} />
          ))}
        </motion.div>

        <div className="mt-12">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/75 transition-colors duration-200 min-h-[44px]"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
            Back to the Blog
          </Link>
        </div>
      </section>

      {/* Other topics */}
      <section className="border-t border-white/[0.05] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
              More topics
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/blog/category/${c.slug}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] px-3.5 py-2 text-xs font-medium text-white/40 hover:text-white/75 hover:border-white/[0.18] transition-all duration-200"
                >
                  {c.label}
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
