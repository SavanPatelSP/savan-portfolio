import type { Metadata } from "next";
import ClientPage from "./ClientPage";
import { faqItems } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs — Frequently Asked Questions",
  description:
    "The central FAQ hub for Savan Patel, SP NET INC, products, privacy, security, contact, and everything in between.",
  openGraph: {
    title: "FAQs — Frequently Asked Questions",
    description:
      "The central FAQ hub for Savan Patel, SP NET INC, products, privacy, security, contact, and everything in between.",
    url: "https://savan.sp-net.in/resources/faqs",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQs — Frequently Asked Questions",
    description:
      "The central FAQ hub for Savan Patel, SP NET INC, products, privacy, security, contact, and everything in between.",
  },
  alternates: {
    canonical: "/resources/faqs",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
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
