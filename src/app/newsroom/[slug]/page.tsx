import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateNewsroomPostJsonLd, generateNewsroomPostMetadata } from "@/lib/seo";
import { getNewsroomPost, getPublishedNewsroomPosts } from "@/data/newsroom";
import ClientPage from "./ClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPublishedNewsroomPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsroomPost(slug);
  if (!post) return {};
  return generateNewsroomPostMetadata(post);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getNewsroomPost(slug);
  if (!post) notFound();

  const jsonLd = generateNewsroomPostJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage post={post} />
    </>
  );
}
