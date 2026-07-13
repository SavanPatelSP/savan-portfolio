import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Responsible AI — How I Approach AI Ethically",
  description:
    "My personal approach to using and building with AI. Human oversight, ethical considerations, and transparency about AI usage.",
  openGraph: {
    title: "Responsible AI — How I Approach AI Ethically",
    description:
      "My personal approach to using and building with AI ethically. Human oversight and transparency.",
    url: "https://savan.sp-net.in/trust/responsible-ai",
    type: "website",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Responsible AI — How I Approach AI Ethically",
    description:
      "My personal approach to using and building with AI ethically. Human oversight and transparency.",
  },
  alternates: {
    canonical: "/trust/responsible-ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Responsible AI",
  url: "https://savan.sp-net.in/trust/responsible-ai",
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
