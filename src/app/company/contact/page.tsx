import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Contact — SP NET INC",
  description:
    "Get in touch with SP NET INC. Reach out for business inquiries, media requests, partnerships, careers, or general company questions.",
  openGraph: {
    title: "Contact — SP NET INC",
    description:
      "Get in touch with SP NET INC. Reach out for business inquiries, media requests, partnerships, careers, or general company questions.",
    url: "https://savan.sp-net.in/company/contact",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — SP NET INC",
    description:
      "Get in touch with SP NET INC. Reach out for business inquiries, media requests, partnerships, careers, or general company questions.",
  },
  alternates: {
    canonical: "/company/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SP NET INC",
  url: "https://savan.sp-net.in",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@sp-net.in",
    availableLanguage: "English",
  },
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
