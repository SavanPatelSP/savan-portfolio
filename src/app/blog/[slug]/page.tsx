import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateBlogPostJsonLd, generateBlogPostMetadata } from "@/lib/seo";
import { getBlogPost, getPublishedBlogPosts, getRelatedPosts } from "@/data/blog";
import ClientPage from "./ClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return generateBlogPostMetadata(post);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const sorted = getPublishedBlogPosts();
  const currentIndex = sorted.findIndex((p) => p.slug === post.slug);
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : undefined;

  const related = getRelatedPosts(post, 3);

  const jsonLd = generateBlogPostJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage post={post} prev={prev} next={next} related={related} />
    </>
  );
}
