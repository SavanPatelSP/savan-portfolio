import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Install — SP NET INC",
  description:
    "Install SP NET INC software products. Install the Portfolio App and access upcoming SP NET products directly from your browser.",
  openGraph: {
    title: "Install — SP NET INC",
    description:
      "Install SP NET INC software products.",
    url: "https://savan.sp-net.in/downloads",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Install — SP NET INC",
    description:
      "Install SP NET INC software products.",
  },
  alternates: {
    canonical: "/downloads",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "SP NET Install",
  description:
    "Install SP NET INC software products.",
  url: "https://savan.sp-net.in/downloads",
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://savan.sp-net.in",
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
