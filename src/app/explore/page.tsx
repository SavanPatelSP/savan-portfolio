import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Explore — Savan Patel",
  description:
    "Discover products, innovation projects, technology stack, future vision, and learning resources.",
  openGraph: {
    title: "Explore — Savan Patel",
    description:
      "Discover products, innovation projects, technology stack, future vision, and learning resources.",
    url: "https://savan.sp-net.in/explore",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore — Savan Patel",
    description:
      "Discover products, innovation projects, technology stack, future vision, and learning resources.",
  },
  alternates: {
    canonical: "/explore",
  },
};

export default function Page() {
  return <ClientPage />;
}
