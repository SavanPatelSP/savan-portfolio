import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Open Source — A Future Vision",
  description:
    "Savan Patel's open source philosophy and long-term vision for releasing SP NET tools, libraries, and documentation to the developer community.",
  openGraph: {
    title: "Open Source — A Future Vision",
    description:
      "Open source philosophy and the long-term vision for releasing SP NET tools, libraries, and documentation to the developer community.",
    url: "https://savan.sp-net.in/resources/open-source",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Source — A Future Vision",
    description:
      "Open source philosophy and the long-term vision for releasing SP NET tools, libraries, and documentation to the developer community.",
  },
  alternates: {
    canonical: "/resources/open-source",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Open Source — A Future Vision",
  description:
    "Savan Patel's open source philosophy and long-term vision for releasing SP NET tools, libraries, and documentation to the developer community.",
  url: "https://savan.sp-net.in/resources/open-source",
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://sp-net.in",
  },
  author: {
    "@type": "Person",
    name: "Savan Patel",
    url: "https://savan.sp-net.in",
  },
};

export default function OpenSourcePage() {
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
