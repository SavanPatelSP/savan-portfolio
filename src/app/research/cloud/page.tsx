import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Cloud Computing — Scalable Infrastructure Exploration",
  description:
    "Savan Patel's personal exploration of cloud computing — Docker, Kubernetes, edge computing, serverless, and building scalable infrastructure.",
  openGraph: {
    title: "Cloud Computing — Scalable Infrastructure Exploration",
    description:
      "Savan Patel's personal exploration of cloud computing — Docker, Kubernetes, edge computing, and serverless.",
    url: "https://savan.sp-net.in/research/cloud",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Computing — Scalable Infrastructure Exploration",
    description:
      "Savan Patel's personal exploration of cloud computing — Docker, Kubernetes, edge computing, and serverless.",
  },
  alternates: {
    canonical: "/research/cloud",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Cloud Computing Research",
  url: "https://savan.sp-net.in/research/cloud",
  description:
    "Savan Patel's personal exploration of cloud computing — Docker, Kubernetes, edge computing, and building scalable infrastructure.",
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
