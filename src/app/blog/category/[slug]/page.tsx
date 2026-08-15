import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  generateBlogCategoryJsonLd,
  generateBlogCategoryMetadata,
} from "@/lib/seo";
import {
  getBlogCategories,
  getBlogCategory,
  getPostsByCategory,
} from "@/data/blog";
import ClientPage from "./ClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return {};
  return generateBlogCategoryMetadata(category);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const jsonLd = generateBlogCategoryJsonLd(category, posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage category={category} posts={posts} />
    </>
  );
}
