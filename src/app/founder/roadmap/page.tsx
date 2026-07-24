import type { Metadata } from "next";
import RoadmapPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Roadmap — What's Next for SP NET INC",
  description:
    "The roadmap for SP NET INC. Current focus, product timelines, and the long-term vision for the ecosystem.",
  openGraph: {
    title: "Roadmap — What's Next for SP NET INC",
    description:
      "Current focus, product timelines, and the long-term vision for the ecosystem.",
    url: "/founder/roadmap",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap — What's Next for SP NET INC",
    description:
      "Current focus, product timelines, and the long-term vision for the ecosystem.",
  },
  alternates: {
    canonical: "/founder/roadmap",
  },
};

export default function Page() {
  return (
    <>
      <RoadmapPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Roadmap — What's Next for SP NET INC",
            description:
              "The roadmap for SP NET INC. Current focus, product timelines, and the long-term vision for the ecosystem.",
            url: "https://savan.sp-net.in/founder/roadmap",
            publisher: {
              "@type": "Organization",
              name: "SP NET INC",
              url: "https://sp-net.in",
            },
            dateModified: "2026-07-12",
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
