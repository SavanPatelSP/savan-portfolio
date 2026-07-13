import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Media Kit — Brand Assets & Press Information",
  description:
    "Official brand assets, press information, and media guidelines for SP NET INC. Logos, colors, typography, and usage rules.",
  openGraph: {
    title: "Media Kit — Brand Assets & Press Information",
    description:
      "Official brand assets, press information, and media guidelines for SP NET INC.",
    url: "https://savan.sp-net.in/resources/media-kit",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Kit — Brand Assets & Press Information",
    description:
      "Official brand assets, press information, and media guidelines for SP NET INC.",
  },
  alternates: {
    canonical: "https://savan.sp-net.in/resources/media-kit",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Media Kit — Brand Assets & Press Information",
  description:
    "Official brand assets, press information, and media guidelines for SP NET INC.",
  url: "https://savan.sp-net.in/resources/media-kit",
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://sp-net.in",
  },
  about: {
    "@type": "Organization",
    name: "SP NET INC",
    founder: {
      "@type": "Person",
      name: "Savan Patel",
    },
  },
};

export default function MediaKitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <ClientPage />
    </>
  );
}
