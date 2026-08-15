import { APP_CONFIG } from "@/config/app";
import { getPublishedBlogPosts } from "@/data/blog";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getPublishedBlogPosts();
  const siteUrl = APP_CONFIG.url;

  const items = posts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      const published = new Date(post.date).toISOString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${published}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <author>${escapeXml(post.author)} (${escapeXml(post.authorRole)})</author>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog — Savan Patel</title>
    <link>${siteUrl}/blog</link>
    <description>Personal writing from Savan Patel on engineering lessons, product-building, technology, and ideas.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
