"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Building2, Newspaper, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import type { NewsroomPost } from "@/data/newsroom";
import { formatDate } from "@/lib/content";
import { SLOW, NORMAL, ease } from "@/lib/motion";

export default function NewsroomArticlePage({ post }: { post: NewsroomPost }) {
  return (
    <>
      <article className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-40 right-[-20%] h-[420px] w-[420px] rounded-full bg-blue-600/[0.06] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Newsroom", href: "/newsroom" },
              { label: post.title },
            ]}
            className="mb-8"
          />

          <motion.header
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <div className="flex flex-wrap items-center gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-400/[0.06] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-blue-300/80">
                <Building2 className="h-3 w-3" aria-hidden="true" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/30">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/60" aria-hidden="true" />
                Official announcement
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.06] break-words">
              {post.title}
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/45 leading-relaxed">
              {post.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/30">
              <time dateTime={post.date} className="font-mono uppercase tracking-wider">
                {formatDate(post.date)}
              </time>
              <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
              <span>
                <span className="text-white/50">{post.author}</span>
                <span className="text-white/25"> — {post.authorRole}</span>
              </span>
            </div>
          </motion.header>

          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: NORMAL, ease: ease.out }}
          >
            <ArticleRenderer blocks={post.content} className="mt-10" />
          </motion.div>

          <div className="mt-12 max-w-3xl">
            <Link
              href="/newsroom"
              className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/75 transition-colors duration-200 min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              Back to Newsroom
            </Link>
          </div>
        </div>
      </article>

      <div className="border-t border-white/[0.04] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/newsroom"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-6 py-3.5 text-sm font-medium text-white/50 hover:text-white/75 hover:border-white/[0.18] hover:bg-white/[0.03] transition-all duration-200 min-h-[48px]"
          >
            <Newspaper className="h-4 w-4" aria-hidden="true" />
            All announcements
          </Link>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.06] px-6 py-3.5 text-sm font-medium text-white/30 hover:text-white/55 hover:border-white/[0.12] transition-all duration-200 min-h-[48px]"
          >
            Read the Blog
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
