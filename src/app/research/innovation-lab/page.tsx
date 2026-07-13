import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Innovation Lab — Personal Experiments & Explorations",
  description:
    "Savan Patel's personal sandbox — side projects, experimental features, rapid prototyping, and the ideas that keep me up at night.",
  openGraph: {
    title: "Innovation Lab — Personal Experiments & Explorations",
    description:
      "Savan Patel's personal sandbox for side projects, experimental features, and rapid prototyping.",
    url: "https://savan.sp-net.in/research/innovation-lab",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovation Lab — Personal Experiments & Explorations",
    description:
      "Savan Patel's personal sandbox for side projects, experimental features, and rapid prototyping.",
  },
  alternates: {
    canonical: "/research/innovation-lab",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Innovation Lab",
  url: "https://savan.sp-net.in/research/innovation-lab",
  description:
    "Savan Patel's personal sandbox — side projects, experimental features, and rapid prototyping.",
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
