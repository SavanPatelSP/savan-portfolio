import type { Metadata } from "next";
import AboutClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "About Savan Patel — Founder & Product Engineer",
  description:
    "Learn about Savan Patel — the founder and product engineer behind SP NET INC. Self-taught developer from India building products that connect people and shape the future of technology.",
  openGraph: {
    title: "About Savan Patel — Founder & Product Engineer",
    description:
      "Learn about Savan Patel — the founder and product engineer behind SP NET INC.",
    url: "https://savan.sp-net.in/founder/about",
    type: "profile",
  },
  alternates: {
    canonical: "/founder/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Savan Patel",
    jobTitle: "Founder & Product Engineer",
    description:
      "Building products that connect people, empower communities, and shape the future of technology through SP NET INC.",
    url: "https://savan.sp-net.in/founder/about",
    sameAs: [
      "https://github.com/savanpatelssp",
      "https://x.com/savanpatel",
      "https://linkedin.com/in/savanpatel",
      "https://t.me/ABOUTME_SP",
      "https://instagram.com/savanpatelssp",
    ],
    worksFor: {
      "@type": "Organization",
      name: "SP NET INC",
      url: "https://sp-net.in",
    },
    nationality: {
      "@type": "Country",
      name: "India",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutClientPage />
    </>
  );
}
