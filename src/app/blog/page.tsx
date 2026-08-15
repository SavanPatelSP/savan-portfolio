import type { Metadata } from "next";
import { generateBlogIndexJsonLd, generateBlogIndexMetadata } from "@/lib/seo";
import {
  getBlogCategories,
  getPinnedBlogPost,
  getPublishedBlogPosts,
  getRecommendedPosts,
} from "@/data/blog";
import ClientPage from "./ClientPage";

export const metadata: Metadata = generateBlogIndexMetadata();

const jsonLd = generateBlogIndexJsonLd();

export default function Page() {
  const posts = getPublishedBlogPosts();
  const pinned = getPinnedBlogPost();
  const categories = getBlogCategories();
  const recommended = getRecommendedPosts(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage posts={posts} pinned={pinned} categories={categories} recommended={recommended} />
    </>
  );
}
