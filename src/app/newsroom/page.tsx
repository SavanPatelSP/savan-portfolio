import type { Metadata } from "next";
import { generateNewsroomIndexJsonLd, generateNewsroomIndexMetadata } from "@/lib/seo";
import { getPublishedNewsroomPosts } from "@/data/newsroom";
import ClientPage from "./ClientPage";

export const metadata: Metadata = generateNewsroomIndexMetadata();

const jsonLd = generateNewsroomIndexJsonLd();

export default function Page() {
  const posts = getPublishedNewsroomPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage posts={posts} />
    </>
  );
}
