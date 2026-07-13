import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Innovation — Pushing Boundaries",
  description:
    "How Savan Patel approaches innovation — experimental projects, creative engineering, and the ideas that keep pushing him to build something better.",
  openGraph: {
    title: "Innovation — Pushing Boundaries",
    description:
      "Innovation, experiments, and creative engineering from Savan Patel.",
    type: "website",
    url: "https://savan.sp-net.in/explore/innovation",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovation — Pushing Boundaries",
    description:
      "Innovation, experiments, and creative engineering from Savan Patel.",
  },
  alternates: {
    canonical: "/explore/innovation",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Innovation — Pushing Boundaries",
  url: "https://savan.sp-net.in/explore/innovation",
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
