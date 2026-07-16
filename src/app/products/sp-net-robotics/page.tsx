import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET Robotics — Intelligence Meets the Physical World",
  description:
    "A robotics research initiative exploring how the SP NET AI platform can bridge the gap between digital intelligence and physical-world automation.",
  openGraph: {
    title: "SP NET Robotics — Intelligence Meets the Physical World",
    description:
      "Exploring how SPNET AI bridges digital intelligence and physical-world automation through robotics research.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-robotics",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-robotics", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET Robotics — Intelligence Meets the Physical World",
    description:
      "Robotics research exploring how AI bridges digital intelligence and physical-world automation.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-robotics", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-robotics",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET Robotics",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "A robotics research initiative exploring how the SP NET AI platform can bridge the gap between digital intelligence and physical-world automation.",
  url: "https://savan.sp-net.in/products/sp-net-robotics",
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

export default function SPNetRoboticsPage() {
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
