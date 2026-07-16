import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET API — Developer Infrastructure at Scale",
  description:
    "A unified API platform providing authentication, rate limiting, billing, SDKs, and developer tools for building on the SP NET ecosystem.",
  openGraph: {
    title: "SP NET API — Developer Infrastructure at Scale",
    description:
      "Authentication, rate limiting, billing, SDKs — everything developers need to build on the SP NET platform.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-api",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-api", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET API — Developer Infrastructure at Scale",
    description:
      "A unified API platform for building on the SP NET ecosystem.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-api", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-api",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET API",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "A unified API platform providing authentication, rate limiting, billing, SDKs, and developer tools for building on the SP NET ecosystem.",
  url: "https://savan.sp-net.in/products/sp-net-api",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/PreRelease",
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

export default function SPNetApiPage() {
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
