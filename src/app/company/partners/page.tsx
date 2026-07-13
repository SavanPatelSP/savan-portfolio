import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Partners — Strategic Collaborations",
  description:
    "Strategic collaborations and technology partnerships at SP NET INC. Building the future together with trusted partners across cloud, tools, and platforms.",
  openGraph: {
    title: "Partners — Strategic Collaborations",
    description:
      "Strategic collaborations and technology partnerships at SP NET INC.",
    url: "https://savan.sp-net.in/company/partners",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners — Strategic Collaborations",
    description:
      "Strategic collaborations and technology partnerships at SP NET INC.",
  },
  alternates: {
    canonical: "/company/partners",
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
