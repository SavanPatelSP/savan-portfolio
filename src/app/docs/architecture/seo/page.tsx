import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SEO & Metadata",
  description:
    "Metadata API, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt, canonical URLs, and page-specific metadata.",
  openGraph: {
    title: "SEO & Metadata — Portfolio App Docs",
    description:
      "Metadata API, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt, canonical URLs, and page-specific metadata.",
    url: "https://savan.sp-net.in/docs/architecture/seo",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/seo" },
};

export default function SEOPage() {
  return <ClientPage />;
}
