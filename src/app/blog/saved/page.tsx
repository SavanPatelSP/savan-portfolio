import type { Metadata } from "next";
import { getPublishedBlogPosts } from "@/data/blog";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Saved for Later · The Blog",
  description:
    "Your personal reading list from Savan Patel's blog. Posts you saved are kept in this browser, never uploaded anywhere.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const posts = getPublishedBlogPosts();
  return <ClientPage posts={posts} />;
}
