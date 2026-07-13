import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Get in Touch — Savan Patel",
  description:
    "Get in touch with Savan Patel. Choose the communication method that works best for your needs — from the Personal Communication Assistant to direct contact.",
  openGraph: {
    title: "Get in Touch — Savan Patel",
    description:
      "Get in touch with Savan Patel. Choose the communication method that works best for your needs — from the Personal Communication Assistant to direct contact.",
    url: "https://savan.sp-net.in/get-in-touch",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch — Savan Patel",
    description:
      "Get in touch with Savan Patel. Choose the communication method that works best for your needs — from the Personal Communication Assistant to direct contact.",
  },
  alternates: {
    canonical: "/get-in-touch",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Get in Touch with Savan Patel",
  url: "https://savan.sp-net.in/get-in-touch",
  description:
    "Get in touch with Savan Patel. Choose the communication method that works best for your needs.",
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
