import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Support — Help & Resources",
  description:
    "Get help with SP NET INC products. FAQs, bug reports, feature requests, and direct contact — everything you need in one place.",
  openGraph: {
    title: "Support — Help & Resources",
    description:
      "Get help with SP NET INC products. FAQs, bug reports, feature requests, and direct contact — everything you need in one place.",
    url: "https://savan.sp-net.in/company/support",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support — Help & Resources",
    description:
      "Get help with SP NET INC products. FAQs, bug reports, feature requests, and direct contact — everything you need in one place.",
  },
  alternates: {
    canonical: "/company/support",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Support",
  url: "https://savan.sp-net.in/company/support",
  description:
    "Get help with SP NET INC products. FAQs, bug reports, feature requests, and direct contact.",
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
