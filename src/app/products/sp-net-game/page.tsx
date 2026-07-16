import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET GAME — Interactive Entertainment Reimagined",
  description:
    "A gaming platform exploring cloud-native game streaming, cross-device play, social gaming experiences, and creator tools for indie developers.",
  openGraph: {
    title: "SP NET GAME — Interactive Entertainment Reimagined",
    description:
      "Cloud-native game streaming, cross-device play, and creator tools — gaming built for the future.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-game",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-game", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET GAME — Interactive Entertainment Reimagined",
    description:
      "A gaming platform exploring cloud streaming, cross-device play, and creator tools.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-game", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-game",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET GAME",
  applicationCategory: "GameApplication",
  operatingSystem: "Cross-platform",
  description:
    "A gaming platform exploring cloud-native game streaming, cross-device play, social gaming experiences, and creator tools for indie developers.",
  url: "https://savan.sp-net.in/products/sp-net-game",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/PreRelease",
  },
  creator: {
    "@type": "Person",
    name: "Savan Patel",
    url: "https://savan.sp-net.in",
  },
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://sp-net.in",
  },
};

export default function SPNetGamePage() {
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
