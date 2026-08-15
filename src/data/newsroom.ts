import type { ContentBlock } from "@/lib/content";

/* ─── Newsroom types ───────────────────────────────────────────── */

export type AnnouncementStatus = "announcement" | "launch" | "milestone" | "statement";

export interface NewsroomPost {
  slug: string;
  title: string;
  summary: string;
  category: string;
  status: AnnouncementStatus;
  date: string;
  author: string;
  authorRole: string;
  content: ContentBlock[];
}

/* ─── Announcements ────────────────────────────────────────────── */

/**
 * Official announcements from SP NET INC.
 *
 * This list intentionally starts empty. Nothing is published here until
 * there is a legitimate, official announcement to make — no placeholder
 * posts, no fabricated news. The Newsroom index renders a strong "first
 * announcement pending" state until the first item is added.
 *
 * To publish an announcement, add an entry below. The route
 * `/newsroom/[slug]` and the sitemap are driven entirely by this data.
 */
export const newsroomPosts: NewsroomPost[] = [];

/* ─── Selectors ────────────────────────────────────────────────── */

export function getNewsroomPost(slug: string): NewsroomPost | undefined {
  return newsroomPosts.find((post) => post.slug === slug);
}

export function getPublishedNewsroomPosts(): NewsroomPost[] {
  return [...newsroomPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
