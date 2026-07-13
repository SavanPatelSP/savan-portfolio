import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Newsletter — Coming Soon",
  description:
    "The SP NET INC newsletter is launching soon. Subscribe to receive curated updates on product launches, engineering insights, and company milestones.",
  openGraph: {
    title: "Newsletter — Coming Soon",
    description:
      "The SP NET INC newsletter is launching soon. Subscribe to receive curated updates on product launches, engineering insights, and company milestones.",
    url: "https://savan.sp-net.in/company/newsletter",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsletter — Coming Soon",
    description:
      "The SP NET INC newsletter is launching soon. Subscribe to receive curated updates on product launches, engineering insights, and company milestones.",
  },
  alternates: {
    canonical: "/company/newsletter",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Newsletter",
  url: "https://savan.sp-net.in/company/newsletter",
  description:
    "The SP NET INC newsletter is launching soon. Subscribe to receive curated updates.",
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
