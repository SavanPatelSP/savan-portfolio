import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET AI — Intelligent Experiences for the SP NET Ecosystem",
  description:
    "SP NET AI is an AI platform being built to power intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  openGraph: {
    title: "SP NET AI — Intelligent Experiences for the SP NET Ecosystem",
    description:
      "An AI platform powering intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
    url: "https://savan.sp-net.in/products/sp-net-ai",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET AI — Intelligent Experiences for the SP NET Ecosystem",
    description:
      "An AI platform powering intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  },
  alternates: {
    canonical: "/products/sp-net-ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET AI",
  description:
    "An AI platform powering intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  applicationCategory: "Artificial Intelligence Application",
  url: "https://savan.sp-net.in/products/sp-net-ai",
  creator: {
    "@type": "Person",
    name: "Savan Patel",
  },
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://sp-net.in",
  },
  operatingSystem: "Cross-platform",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/PreRelease",
  },
};

export default function SPNetAIPage() {
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
