import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Contact — Savan Patel",
  description:
    "Get in touch with Savan Patel. Reach out for collaborations, software engineering, research, or a meaningful conversation.",
  openGraph: {
    title: "Contact — Savan Patel",
    description:
      "Get in touch with Savan Patel. Reach out for collaborations, software engineering, research, or a meaningful conversation.",
    url: "https://savan.sp-net.in/contact",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Savan Patel",
    description:
      "Get in touch with Savan Patel. Reach out for collaborations, software engineering, research, or a meaningful conversation.",
  },
  alternates: {
    canonical: "/contact",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Savan Patel",
  url: "https://savan.sp-net.in/contact",
  description:
    "Get in touch with Savan Patel for collaborations, software engineering, research, or a meaningful conversation.",
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
