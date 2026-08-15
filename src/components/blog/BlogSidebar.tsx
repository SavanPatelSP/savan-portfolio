"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight, Newspaper } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { personal } from "@/data/personal";
import { socialLinks } from "@/data/social-links";
import { CompactPostCard } from "./BlogCards";
import { cn } from "@/lib/utils";

function ModuleHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30">{children}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" aria-hidden="true" />
    </div>
  );
}

export function BlogSidebar({
  posts,
  categories,
  recommended,
}: {
  posts: BlogPost[];
  categories: { slug: string; label: string; description: string }[];
  recommended: BlogPost[];
}) {
  const countByCategory = new Map<string, number>();
  for (const post of posts) {
    countByCategory.set(post.category, (countByCategory.get(post.category) ?? 0) + 1);
  }

  const liveSocials = socialLinks.filter((social) => !social.modal && Boolean(social.href));
  const hasEnoughPosts = posts.length >= 2;
  const recentPosts = hasEnoughPosts
    ? posts.filter((post) => !recommended.some((r) => r.slug === post.slug)).slice(0, 3)
    : [];

  return (
    <div className="flex flex-col gap-9">
      {/* About */}
      <section className="order-3 lg:order-1" aria-label="About Savan Patel">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 ring-1 ring-blue-500/25">
              <span className="text-sm font-semibold text-white/85">{personal.initials}</span>
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white/90">{personal.name}</p>
              <p className="mt-0.5 text-xs text-white/35">{personal.title} · {personal.company}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/40 leading-relaxed">
            Founder and builder working across software, infrastructure, and emerging
            technology. Writing in the open about what it takes to build.
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Lead · Build · Connect
          </p>
          <Link
            href="/founder"
            className="group mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400/80 hover:text-blue-300 transition-colors duration-200"
          >
            More about Savan
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Topics */}
      <section className="order-1 lg:order-2" aria-label="Browse topics">
        <ModuleHeader>Browse topics</ModuleHeader>
        <ul className="mt-4 space-y-0.5">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl px-2 py-2 -mx-2 hover:bg-white/[0.03] transition-colors duration-200"
              >
                <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-200">
                  {category.label}
                </span>
                <span className="rounded-full border border-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-white/30">
                  {countByCategory.get(category.label) ?? 0}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="mt-2 inline-flex items-center gap-1.5 px-2 text-xs font-medium text-blue-400/70 hover:text-blue-300 transition-colors duration-200"
        >
          All stories
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </section>

      {/* Recommended Reading */}
      {hasEnoughPosts && recommended.length > 0 && (
        <section className="order-2 lg:order-3" aria-label="Recommended reading">
          <ModuleHeader>Recommended reading</ModuleHeader>
          <div className="mt-4 space-y-1">
            {recommended.map((post) => (
              <CompactPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="order-5 lg:order-4" aria-label="Recent posts">
          <ModuleHeader>Recent posts</ModuleHeader>
          <div className="mt-4 space-y-1">
            {recentPosts.map((post) => (
              <CompactPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Follow */}
      <section className="order-4 lg:order-5" aria-label="Follow Savan Patel">
        <ModuleHeader>Follow</ModuleHeader>
        <ul className="mt-4 space-y-1">
          {liveSocials.map((social) => {
            const Icon = social.icon;
            return (
              <li key={social.title}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl px-2 py-2 -mx-2 hover:bg-white/[0.03] transition-colors duration-200"
                >
                  <Icon className={cn("h-4 w-4 shrink-0", social.color)} />
                  <span className="flex-1 min-w-0 text-sm text-white/60 group-hover:text-white transition-colors duration-200">
                    {social.title}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
        <Link
          href="/company/socials"
          className="mt-2 inline-flex items-center gap-1.5 px-2 text-xs font-medium text-blue-400/70 hover:text-blue-300 transition-colors duration-200"
        >
          All profiles
          <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </section>

      {/* Newsroom cross-link */}
      <section className="order-6 lg:order-6" aria-label="Newsroom">
        <Link
          href="/newsroom"
          className="group block rounded-2xl border border-white/[0.06] bg-white/[0.01] p-5 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02]">
            <Newspaper className="h-4 w-4 text-white/35 group-hover:text-white/60 transition-colors duration-200" aria-hidden="true" />
          </span>
          <p className="mt-3 text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
            The Newsroom
          </p>
          <p className="mt-1 text-xs text-white/35 leading-relaxed">
            Official announcements from SP NET INC — launches, milestones, and statements.
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-blue-400/70 group-hover:text-blue-300 transition-colors duration-200">
            Visit the newsroom
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
        </Link>
      </section>
    </div>
  );
}
