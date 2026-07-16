import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET WORKPLACE — Your Complete Digital Workspace",
  description:
    "A unified digital workplace bringing together documents, project management, team collaboration, and communication into one seamless platform.",
  openGraph: {
    title: "SP NET WORKPLACE — Your Complete Digital Workspace",
    description:
      "Documents, projects, collaboration, and communication — all in one seamless workspace built for modern teams.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-workplace",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-workplace", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET WORKPLACE — Your Complete Digital Workspace",
    description:
      "A unified digital workspace for documents, projects, and team collaboration.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-workplace", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-workplace",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET WORKPLACE",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, macOS, Windows, Linux",
  description:
    "A unified digital workplace bringing together documents, project management, team collaboration, and communication into one seamless platform.",
  url: "https://savan.sp-net.in/products/sp-net-workplace",
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

export default function SPNetWorkplacePage() {
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
