import type { Metadata } from "next";
import SPNetGramClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET GRAM — Next-Generation Messaging Platform",
  description:
    "A next-generation messaging platform focused on privacy, productivity, premium experiences, modern communication, customization, and powerful user tools.",
  openGraph: {
    title: "SP NET GRAM — Next-Generation Messaging Platform",
    description:
      "Messaging reimagined for the modern world. Secure messaging, communities, premium experiences, and deep personalization — all in one platform.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-gram",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-gram", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET GRAM — Next-Generation Messaging Platform",
    description:
      "Messaging reimagined for the modern world. Secure, private, and built for how people actually communicate.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-gram", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-gram",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET GRAM",
  applicationCategory: "CommunicationApplication",
  operatingSystem: "iOS, Android, macOS, Windows, Linux, Web",
  description:
    "A next-generation messaging platform focused on privacy, productivity, premium experiences, modern communication, customization, and powerful user tools.",
  url: "https://savan.sp-net.in/products/sp-net-gram",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Person",
    name: "Savan Patel",
    url: "https://savan.sp-net.in",
  },
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://sp-net.in",
  },
};

export default function SPNetGramPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SPNetGramClientPage />
    </>
  );
}
