"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Feather, Pin, RefreshCw } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleRenderer } from "@/components/blog/ArticleRenderer";
import { AshokaChakra } from "@/components/blog/AshokaChakra";
import { BlogAuthorCard } from "@/components/blog/BlogAuthorCard";
import { RelatedPostCard } from "@/components/blog/BlogCards";
import { Comments } from "@/components/blog/comments/Comments";
import { SaveForLaterButton } from "@/components/blog/SaveForLaterButton";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareTools } from "@/components/blog/ShareTools";
import { APP_CONFIG } from "@/config/app";
import type { BlogPost } from "@/data/blog";
import { getBlogCategoryByLabel, slugifyCategory } from "@/data/blog";
import { cn } from "@/lib/utils";
import {
  buildHeadingIds,
  formatDate,
  formatReadingTime,
  readingTimeMinutes,
} from "@/lib/content";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NORMAL, SLOW, ease } from "@/lib/motion";

export default function BlogArticlePage({
  post,
  prev,
  next,
  related,
}: {
  post: BlogPost;
  prev?: BlogPost;
  next?: BlogPost;
  related: BlogPost[];
}) {
  const special = post.specialEdition === true;
  const minutes = post.readingTime ?? readingTimeMinutes(post.content);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, restDelta: 0.001 });

  const category = getBlogCategoryByLabel(post.category);
  const categoryHref = category ? `/blog/category/${category.slug}` : "/blog";

  const headings = useMemo(() => {
    const list: { text: string; level: 2 | 3 }[] = post.content
      .filter((block) => block.type === "h2" || block.type === "h3")
      .map((block) => ({ text: block.text, level: block.type === "h2" ? 2 : 3 }));
    const ids = buildHeadingIds(list.map((h) => h.text));
    return list.map((h, i) => ({ ...h, id: ids[i] }));
  }, [post.content]);
  const showToc = headings.length >= 2;

  return (
    <>
      {/* Reading progress */}
      {!reducedMotion && (
        <motion.div
          className={cn(
            "fixed top-16 left-0 right-0 z-[105] h-[2px] origin-left",
            special ? "tricolor-bar" : "bg-gradient-to-r from-blue-500/70 via-blue-400/50 to-transparent"
          )}
          style={{ scaleX: progress }}
          aria-hidden="true"
        />
      )}

      <article
        className={cn(
          "relative overflow-hidden",
          special && "bg-gradient-to-b from-[#0a1120] via-black to-black"
        )}
      >
        {/* Special edition backdrop */}
        {special && (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[min(90vw,720px)] opacity-[0.05] text-blue-400">
              <AshokaChakra animated />
            </div>
            <div className="absolute -top-40 right-[-20%] h-[480px] w-[480px] rounded-full bg-blue-600/[0.07] blur-[120px]" />
            <div className="absolute top-[30%] left-[-15%] h-[360px] w-[360px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-8 sm:mb-10"
          />

          {/* ─── Header ─────────────────────────────────────────── */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SLOW, ease: ease.out }}
            className="max-w-3xl"
          >
            {special && (
              <motion.div
                className="mb-6 flex flex-wrap items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: NORMAL, delay: 0.05, ease: ease.out }}
              >
                <span className="inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.15em] text-black tricolor-bar">
                  {post.specialEditionLabel}
                </span>
                {post.editionLabel && (
                  <span className="inline-flex items-center rounded-full border border-white/[0.10] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.15em] text-white/40">
                    {post.editionLabel}
                  </span>
                )}
              </motion.div>
            )}

            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <Link
                href={categoryHref}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-wider transition-colors duration-200",
                  special
                    ? "border-blue-400/25 bg-blue-400/[0.06] text-blue-300/80 hover:bg-blue-400/[0.12]"
                    : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/[0.14]"
                )}
              >
                <Feather className="h-3 w-3" aria-hidden="true" />
                {post.category}
              </Link>
              {post.pinned && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white/40">
                  <Pin className="h-3 w-3 text-blue-400/70" aria-hidden="true" />
                  Pinned
                </span>
              )}
            </div>

            {/* Series banner */}
            {post.series && (
              <motion.div
                className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: NORMAL, delay: 0.08, ease: ease.out }}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">
                  Part {post.series.part}
                  {post.series.total ? ` of ${post.series.total}` : ""}
                </span>
                <span className="h-3 w-px bg-white/10" aria-hidden="true" />
                <span className="text-sm font-medium text-white/70">
                  {post.series.title}
                </span>
              </motion.div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-semibold tracking-tight text-white leading-[1.08] break-words">
              {post.title}
            </h1>

            {post.subtitle && (
              <p className="mt-5 text-base sm:text-lg text-white/40 leading-relaxed">
                {post.subtitle}
              </p>
            )}

            {/* Metadata row */}
            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/35">
              <span className="font-medium text-white/60">{post.author}</span>
              <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
              <time dateTime={post.date} className="font-mono uppercase tracking-wider">
                {formatDate(post.date)}
              </time>
              {post.updatedAt && (
                <>
                  <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
                  <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider">
                    <RefreshCw className="h-3 w-3" aria-hidden="true" />
                    Updated {formatDate(post.updatedAt)}
                  </span>
                </>
              )}
              <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider">
                <Clock className="h-3 w-3" aria-hidden="true" />
                {formatReadingTime(minutes)}
              </span>
            </div>
          </motion.header>

          {/* ─── Hero image ─────────────────────────────────────── */}
          {post.heroImage && (
            <motion.div
              className="mt-10 sm:mt-12 max-w-3xl"
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: SLOW, delay: 0.15, ease: ease.out }}
            >
              <figure>
                <div className="relative">
                  <div
                    className={cn(
                      "absolute -inset-2 rounded-3xl blur-2xl",
                      special
                        ? "bg-[radial-gradient(circle_at_50%_35%,rgba(255,153,51,0.15),rgba(255,255,255,0.05)_40%,rgba(19,136,8,0.10)_72%,transparent_90%)]"
                        : "bg-blue-500/[0.06]"
                    )}
                    aria-hidden="true"
                  />
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.02] shadow-2xl shadow-black/50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.heroImage}
                      alt={post.heroAlt || ""}
                      className="aspect-[4/5] sm:aspect-[16/10] w-full object-cover object-center"
                      fetchPriority="high"
                    />
                    {special && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" aria-hidden="true" />
                    )}
                  </div>
                </div>
                {post.heroCaption && (
                  <figcaption className="mt-3 text-center text-xs text-white/25">
                    {post.heroCaption}
                  </figcaption>
                )}
              </figure>
            </motion.div>
          )}

          {/* ─── Mobile TOC ─────────────────────────────────────── */}
          {showToc && (
            <motion.div
              className="mt-10 max-w-3xl lg:hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: NORMAL, delay: 0.2, ease: ease.out }}
            >
              <TableOfContents headings={headings} />
            </motion.div>
          )}

          {/* ─── Body + desktop TOC ─────────────────────────────── */}
          <div className="mt-12 lg:mt-14 grid lg:grid-cols-[200px_minmax(0,1fr)] gap-10 lg:gap-14">
            {showToc && (
              <aside className="hidden lg:block min-w-0">
                <div className="lg:sticky lg:top-24">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}

            <div className="min-w-0 max-w-[42rem]">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: NORMAL, ease: ease.out }}
              >
                <ArticleRenderer blocks={post.content} />
              </motion.div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/25">
                      Tags
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] text-white/35"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author + share */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, ease: ease.out }}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6">
                  <BlogAuthorCard author={post.author} role={post.authorRole} />
                  <div className="flex shrink-0 items-center gap-1">
                    <SaveForLaterButton slug={post.slug} />
                    <ShareTools title={post.title} />
                  </div>
                </div>
              </motion.div>

              {/* ─── Comments ─────────────────────────────────────── */}
              <motion.section
                className="mt-10"
                aria-labelledby="comments-heading"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: NORMAL, ease: ease.out }}
              >
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6">
                  <h2
                    id="comments-heading"
                    className="text-xl sm:text-2xl font-semibold tracking-tight text-white"
                  >
                    From the land of a billion voices — share yours.
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/40">
                    Join the conversation and share your perspective.
                  </p>
                  <div className="mt-5 border-t border-white/[0.06] pt-5">
                    <Comments
                      pageId={post.slug}
                      pageUrl={`${APP_CONFIG.url}/blog/${post.slug}`}
                      pageTitle={post.title}
                    />
                  </div>
                </div>
              </motion.section>
            </div>
          </div>

          {/* Special edition sign-off */}
          {special && (
            <div className="mt-16 max-w-3xl">
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0d1526] to-[#080b14] p-8 sm:p-10 text-center">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 opacity-[0.07] text-blue-400">
                    <AshokaChakra animated />
                  </div>
                </div>
                <p className="relative text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                  {post.editionLabel ?? "Special Edition"}
                </p>
                <p className="relative mt-4 text-lg sm:text-xl text-white/70 italic leading-relaxed">
                  &ldquo;Independence is not only something we remember.
                  <br className="hidden sm:block" /> It is something we continue to build.&rdquo;
                </p>
                <div className="relative mt-6 h-px w-24 mx-auto tricolor-bar" aria-hidden="true" />
                <p className="relative mt-6 text-sm font-medium text-white/60 tracking-[0.25em] uppercase">
                  Lead · Build · Connect
                </p>
                <p className="relative mt-3 text-sm text-white/35">Jai Hind</p>
              </div>
            </div>
          )}
        </div>
      </article>

      {/* ─── Related ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="relative border-t border-white/[0.05] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">
                Keep reading
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((relatedPost) => (
                <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Prev / next ────────────────────────────────────────── */}
      {(prev || next) && (
        <section className="relative border-t border-white/[0.05] py-10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/25">
                  <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                  Previous
                </span>
                <span className="mt-2 block text-sm font-medium text-white/65 group-hover:text-white leading-snug line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" aria-hidden="true" />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300 text-right"
              >
                <span className="inline-flex items-center justify-end gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white/25">
                  Next
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
                <span className="mt-2 block text-sm font-medium text-white/65 group-hover:text-white leading-snug line-clamp-2">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" aria-hidden="true" />
            )}
          </div>
        </section>
      )}

      {/* ─── Back to blog ───────────────────────────────────────── */}
      <section className="relative border-t border-white/[0.05] py-16 sm:py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: SLOW, ease: ease.out }}
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
              The Blog
            </p>
            <p className="mt-4 text-sm text-white/35 max-w-md mx-auto leading-relaxed">
              More stories are being written. Browse every essay, or filter by the topics that
              interest you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
              >
                Back to the Blog
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <Link
                href={`/blog/category/${slugifyCategory(post.category)}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.10] px-5 py-3 text-sm font-medium text-white/50 hover:text-white/70 hover:border-white/[0.18] transition-all duration-200"
              >
                More {post.category}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
