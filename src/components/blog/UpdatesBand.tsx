"use client";

import Link from "next/link";
import { PenLine, Newspaper, ArrowRight, BadgeCheck } from "lucide-react";
import { FadeIn, SectionContainer, SectionTitle } from "@/components/ui/AnimationPrimitives";
import { getFeaturedBlogPost, getPublishedBlogPosts } from "@/data/blog";
import { formatDateShort } from "@/lib/content";
import { cn } from "@/lib/utils";

export function UpdatesBand() {
  const featured = getFeaturedBlogPost();
  const latest = getPublishedBlogPosts()[0];
  const latestPost = featured ?? latest;

  return (
    <SectionContainer id="updates">
      <SectionTitle
        label="Ideas & Updates"
        title="Writing, and official updates"
        subtitle="Personal writing on engineering, product-building, and technology — plus official announcements from SP NET INC."
      />

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <FadeIn delay={0.05}>
          <Link
            href={latestPost ? `/blog/${latestPost.slug}` : "/blog"}
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-2 text-white/25">
              <PenLine className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-[0.2em]">From the Blog</span>
            </div>

            {latestPost ? (
              <>
                <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">
                  {latestPost.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-white/35 leading-relaxed">
                  {latestPost.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-2 text-xs text-white/25">
                  <span>{formatDateShort(latestPost.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{latestPost.readingTime} min read</span>
                </div>
              </>
            ) : (
              <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">
                The first post is on its way
              </h3>
            )}

            <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-blue-400/90 transition-colors group-hover:text-blue-300">
              Read the blog
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Link
            href="/newsroom"
            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-2 text-white/25">
              <Newspaper className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-[0.2em]">The Newsroom</span>
            </div>

            <h3 className="mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">
              Official announcements
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/35 leading-relaxed">
              Product launches, milestones, and formal statements from SP NET INC — published here
              as they happen.
            </p>

            <div
              className={cn(
                "mt-5 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/30"
              )}
            >
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-white/20" />
              <span>Nothing here yet — the first announcement is in the works.</span>
            </div>

            <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-blue-400/90 transition-colors group-hover:text-blue-300">
              Visit the newsroom
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </FadeIn>
      </div>
    </SectionContainer>
  );
}
