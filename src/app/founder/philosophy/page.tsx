import type { Metadata } from "next";
import PhilosophyPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Engineering Philosophy — Principles That Guide Every Decision",
  description:
    "The engineering philosophy behind SP NET INC. Core principles, quality standards, and the approach to building software that matters.",
  openGraph: {
    title: "Engineering Philosophy — Principles That Guide Every Decision",
    description:
      "Core principles, quality standards, and the approach to building software that matters.",
    url: "/founder/philosophy",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Philosophy — Principles That Guide Every Decision",
    description:
      "Core principles, quality standards, and the approach to building software that matters.",
  },
  alternates: {
    canonical: "/founder/philosophy",
  },
};

export default function Page() {
  return (
    <>
      <PhilosophyPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Engineering Philosophy — Principles That Guide Every Decision",
            description:
              "The engineering philosophy behind SP NET INC. Core principles, quality standards, and the approach to building software that matters.",
            url: "https://savan.sp-net.in/founder/philosophy",
            publisher: {
              "@type": "Organization",
              name: "SP NET INC",
              url: "https://sp-net.in",
            },
            mainEntity: {
              "@type": "Person",
              name: "Savan Patel",
              jobTitle: "Founder",
              url: "https://savan.sp-net.in",
            },
          }),
        }}
      />
    </>
  );
}
