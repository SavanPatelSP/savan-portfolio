import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "About SP NET INC — Building the Future of Technology",
  description:
    "Learn about SP NET INC — a technology company building infrastructure for modern communication, enterprise administration, and intelligent automation. Founded in 2022 by Savan Patel.",
  openGraph: {
    title: "About SP NET INC — Building the Future of Technology",
    description:
      "A technology company building infrastructure for modern communication, enterprise administration, and intelligent automation.",
    url: "https://savan.sp-net.in/company/about",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SP NET INC — Building the Future of Technology",
    description:
      "A technology company building infrastructure for modern communication, enterprise administration, and intelligent automation.",
  },
  alternates: {
    canonical: "/company/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SP NET INC",
  url: "https://sp-net.in",
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
