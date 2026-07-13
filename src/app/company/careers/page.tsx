import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Careers — Build the Future With Us",
  description:
    "Join SP NET INC and help build the future of communication, enterprise administration, and intelligent automation. Explore open roles and our engineering culture.",
  openGraph: {
    title: "Careers — Build the Future With Us",
    description:
      "Join SP NET INC and help build the future of communication, enterprise administration, and intelligent automation.",
    url: "https://savan.sp-net.in/company/careers",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Build the Future With Us",
    description:
      "Join SP NET INC and help build the future of communication, enterprise administration, and intelligent automation.",
  },
  alternates: {
    canonical: "/company/careers",
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
