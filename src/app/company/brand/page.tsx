import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Brand — Official Brand Guidelines",
  description:
    "Official brand guidelines for SP NET INC — logos, colors, typography, voice, and usage rules. Everything you need to represent our brand consistently.",
  openGraph: {
    title: "Brand — Official Brand Guidelines",
    description:
      "Official brand guidelines for SP NET INC — logos, colors, typography, voice, and usage rules.",
    url: "https://savan.sp-net.in/company/brand",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand — Official Brand Guidelines",
    description:
      "Official brand guidelines for SP NET INC — logos, colors, typography, voice, and usage rules.",
  },
  alternates: {
    canonical: "/company/brand",
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
