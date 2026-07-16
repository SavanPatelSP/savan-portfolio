import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET Security — Protection Built Into Every Layer",
  description:
    "A security platform providing threat detection, vulnerability assessment, incident response, and compliance monitoring across the entire SP NET ecosystem.",
  openGraph: {
    title: "SP NET Security — Protection Built Into Every Layer",
    description:
      "Threat detection, vulnerability assessment, incident response, and compliance — security built into every layer.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-security",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-security", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET Security — Protection Built Into Every Layer",
    description:
      "Comprehensive security across the entire SP NET ecosystem.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-security", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-security",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET Security",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Cross-platform",
  description:
    "A security platform providing threat detection, vulnerability assessment, incident response, and compliance monitoring across the entire SP NET ecosystem.",
  url: "https://savan.sp-net.in/products/sp-net-security",
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

export default function SPNetSecurityPage() {
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
