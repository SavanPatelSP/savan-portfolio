import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Feather, Pin, Rss } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { slugifyCategory } from "@/data/blog";
import { cn } from "@/lib/utils";
import {
  formatDateShort,
  formatReadingTime,
  readingTimeMinutes,
} from "@/lib/content";
import { AshokaChakra } from "./AshokaChakra";
import { SaveForLaterButton } from "./SaveForLaterButton";

function minutesFor(post: BlogPost): number {
  return post.readingTime ?? readingTimeMinutes(post.content);
}

/* ─── Shared primitives ────────────────────────────────────────── */

function CategoryChip({
  category,
  as = "link",
  className,
}: {
  category: string;
  as?: "link" | "span";
  className?: string;
}) {
  const slug = slugifyCategory(category);
  const classes = cn(
    "inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white/35",
    as === "link"
      ? "hover:text-blue-300/90 hover:border-blue-400/25 hover:bg-blue-400/[0.04] transition-colors duration-200"
      : "pointer-events-none",
    className
  );
  const inner = (
    <>
      <Feather className="h-2.5 w-2.5" aria-hidden="true" />
      {category}
    </>
  );
  if (as === "span") return <span className={classes}>{inner}</span>;
  return (
    <Link href={`/blog/category/${slug}`} className={classes}>
      {inner}
    </Link>
  );
}

function SpecialBadge({ post }: { post: BlogPost }) {
  if (!post.specialEdition || !post.specialEditionLabel) return null;
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-black tricolor-bar">
      {post.specialEditionLabel}
    </span>
  );
}

function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-white/25", className)}>
      <time dateTime={post.date} className="uppercase tracking-wider">
        {formatDateShort(post.date)}
      </time>
      <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" aria-hidden="true" />
        {formatReadingTime(minutesFor(post))}
      </span>
    </span>
  );
}

function PostImage({ post, ratio, eager }: { post: BlogPost; ratio: string; eager?: boolean }) {
  if (!post.heroImage) return null;
  return (
    <div className={cn("relative overflow-hidden", ratio)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.heroImage}
        alt={post.heroAlt || ""}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      {post.specialEdition && (
        <div className="tricolor-bar absolute top-0 inset-x-0 h-[2px]" aria-hidden="true" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" aria-hidden="true" />
    </div>
  );
}

/* ─── PostCard — standard editorial card (latest feed) ─────────── */

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/[0.01] transition-colors duration-300",
        post.specialEdition
          ? "border-white/[0.09]"
          : "border-white/[0.05] hover:border-white/[0.13] hover:bg-white/[0.02]"
      )}
    >
      {post.specialEdition && (
        <div className="tricolor-bar absolute top-0 inset-x-0 z-10 h-[3px]" aria-hidden="true" />
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded-2xl"
      >
        <PostImage post={post} ratio="aspect-[16/10]" />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryChip category={post.category} as="span" />
            <SpecialBadge post={post} />
          </div>

          <h3 className="mt-3.5 text-base sm:text-lg font-semibold tracking-tight leading-snug text-white/85 group-hover:text-white transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2.5 text-sm text-white/35 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.06] bg-white/[0.01] px-2 py-0.5 text-[10px] text-white/25"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            <PostMeta post={post} />
            <span
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-white/30 transition-all duration-200 group-hover:border-white/20 group-hover:text-white/70"
              aria-hidden="true"
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 z-10">
        <SaveForLaterButton slug={post.slug} variant="card" />
      </div>
    </article>
  );
}

/* ─── FeaturedCard — the pinned cover story ────────────────────── */

export function FeaturedCard({ post }: { post: BlogPost }) {
  const special = post.specialEdition;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-gradient-to-b",
        special
          ? "border-white/[0.10] from-[#0c1424] to-[#080b14]"
          : "border-white/[0.08] from-[#0b0e14] to-[#08090d]"
      )}
    >
      {special && <div className="tricolor-bar absolute top-0 inset-x-0 z-10 h-[3px]" aria-hidden="true" />}

      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className={cn(
            "absolute -top-24 -right-24 h-80 w-80 rounded-full blur-[110px]",
            special ? "bg-[radial-gradient(circle,rgba(255,153,51,0.12),rgba(59,130,246,0.06)_45%,transparent_70%)]" : "bg-blue-500/[0.06]"
          )}
        />
        <div className="absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-blue-600/[0.05] blur-[100px]" />
        <div className="absolute top-1/3 right-[8%] h-72 w-72 opacity-[0.06] text-blue-300">
          <AshokaChakra animated />
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20">
        <SaveForLaterButton slug={post.slug} variant="card" />
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
        {/* Image — above content on mobile, right column on desktop */}
        {post.heroImage && (
          <div className="relative order-first md:order-last min-w-0">
            <div className="relative m-4 sm:m-6 md:my-8 md:mr-8 md:ml-0 lg:my-10 lg:mr-10">
              <div
                className={cn(
                  "absolute -inset-3 rounded-3xl blur-2xl",
                  special
                    ? "bg-[radial-gradient(circle_at_50%_40%,rgba(255,153,51,0.18),rgba(255,255,255,0.06)_40%,rgba(19,136,8,0.12)_75%,transparent_90%)]"
                    : "bg-blue-500/10"
                )}
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] shadow-2xl shadow-black/50">
                <img
                  src={post.heroImage}
                  alt={post.heroAlt || ""}
                  className="aspect-[16/10] md:aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="eager"
                  fetchPriority="high"
                />
                {special && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden="true" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-white/40">
              <Pin className="h-3 w-3 text-blue-400/70" aria-hidden="true" />
              Pinned · Current Issue
            </span>
            {post.editionLabel && special && (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-[0.15em] text-black tricolor-bar">
                {post.editionLabel}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <CategoryChip category={post.category} />
            <SpecialBadge post={post} />
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.5rem] font-semibold tracking-tight text-white leading-[1.1]">
            {post.title}
          </h2>

          <p className="mt-4 text-sm sm:text-base text-white/40 leading-relaxed max-w-xl line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/30">
            <span className="font-medium text-white/55">{post.author}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-white/25" aria-hidden="true" />
            <PostMeta post={post} />
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="group/cta mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-white/90 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 min-h-[48px]"
            aria-label={`Read ${post.title}`}
          >
            Read the essay
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ─── CompactPostCard — sidebar (recommended / recent) ─────────── */

export function CompactPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-3 rounded-xl p-2 -m-2 transition-colors duration-200 hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02]">
        {post.heroImage ? (
          <img
            src={post.heroImage}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center">
            <Feather className="h-4 w-4 text-white/20" aria-hidden="true" />
          </span>
        )}
        {post.specialEdition && (
          <div className="tricolor-bar absolute top-0 inset-x-0 h-[2px]" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white/70 leading-snug line-clamp-2 group-hover:text-white transition-colors duration-200">
          {post.title}
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 text-[11px] font-mono text-white/25">
          <time dateTime={post.date} className="uppercase tracking-wider">
            {formatDateShort(post.date)}
          </time>
          <span className="h-0.5 w-0.5 rounded-full bg-white/20" aria-hidden="true" />
          <span>{formatReadingTime(minutesFor(post))}</span>
        </p>
      </div>
    </Link>
  );
}

/* ─── RelatedPostCard — compact card for article pages ─────────── */

export function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.01] transition-colors duration-300 hover:border-white/[0.13] hover:bg-white/[0.02]">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded-2xl">
        <PostImage post={post} ratio="aspect-[16/9]" />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryChip category={post.category} as="span" />
            <SpecialBadge post={post} />
          </div>
          <h3 className="mt-3 text-base font-semibold tracking-tight leading-snug text-white/85 group-hover:text-white transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <PostMeta post={post} />
            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400/70 group-hover:text-blue-300 transition-colors duration-200">
              Read
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 z-10">
        <SaveForLaterButton slug={post.slug} variant="card" />
      </div>
    </article>
  );
}

/* ─── NextStoryCard — intentional empty-state fill for the feed ── */

export function NextStoryCard({ rssHref = "/blog/rss.xml" }: { rssHref?: string }) {
  return (
    <article className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.01] p-8 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
        <Feather className="h-4 w-4 text-white/30" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-white/70">The next story is being written</h3>
      <p className="mt-2 max-w-xs text-sm text-white/35 leading-relaxed">
        New essays, experiments, and updates are on the way. Follow the feed to know when they land.
      </p>
      <a
        href={rssHref}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/[0.10] px-4 py-2 text-xs font-medium text-white/45 hover:text-white/75 hover:border-white/[0.18] transition-all duration-200"
      >
        <Rss className="h-3.5 w-3.5" aria-hidden="true" />
        Subscribe via RSS
      </a>
    </article>
  );
}
