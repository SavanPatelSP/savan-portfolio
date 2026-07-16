import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET Cloud — Scalable Infrastructure for Everything",
  description:
    "A cloud infrastructure platform designed for the SP NET ecosystem — compute, storage, edge functions, and managed services built for privacy and performance.",
  openGraph: {
    title: "SP NET Cloud — Scalable Infrastructure for Everything",
    description:
      "Compute, storage, edge functions, and managed services — cloud infrastructure built for privacy and performance.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-cloud",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-cloud", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET Cloud — Scalable Infrastructure for Everything",
    description:
      "Cloud infrastructure built for privacy, performance, and the SP NET ecosystem.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-cloud", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-cloud",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET Cloud",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "A cloud infrastructure platform designed for the SP NET ecosystem — compute, storage, edge functions, and managed services built for privacy and performance.",
  url: "https://savan.sp-net.in/products/sp-net-cloud",
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

export default function SPNetCloudPage() {
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
