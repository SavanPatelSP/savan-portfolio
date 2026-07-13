import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Technology — Technologies I Love",
  description:
    "The technologies Savan Patel uses and loves — why each tool earned its place, what I'm learning next, and how I think about choosing the right stack.",
  openGraph: {
    title: "Technology — Technologies I Love",
    description:
      "Technologies Savan Patel uses and loves — the tools behind every project.",
    type: "website",
    url: "https://savan.sp-net.in/explore/technology",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technology — Technologies I Love",
    description:
      "Technologies Savan Patel uses and loves — the tools behind every project.",
  },
  alternates: {
    canonical: "/explore/technology",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Technology — Technologies I Love",
  url: "https://savan.sp-net.in/explore/technology",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage />
    </>
  );
}
