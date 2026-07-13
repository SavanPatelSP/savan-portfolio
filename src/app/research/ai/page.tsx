import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Artificial Intelligence — Exploring Intelligent Systems",
  description:
    "Savan Patel's personal exploration of artificial intelligence — from LLMs and prompt engineering to AI features in SP NET GRAM and ADMIN OS.",
  openGraph: {
    title: "Artificial Intelligence — Exploring Intelligent Systems",
    description:
      "Savan Patel's personal exploration of artificial intelligence — LLMs, prompt engineering, and building AI features.",
    url: "https://savan.sp-net.in/research/ai",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Intelligence — Exploring Intelligent Systems",
    description:
      "Savan Patel's personal exploration of artificial intelligence — LLMs, prompt engineering, and building AI features.",
  },
  alternates: {
    canonical: "/research/ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Artificial Intelligence Research",
  url: "https://savan.sp-net.in/research/ai",
  description:
    "Savan Patel's personal exploration of artificial intelligence — from LLMs to building AI-powered features.",
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
