import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Socials — Follow SP NET INC",
  description:
    "Follow SP NET INC and Savan Patel on GitHub, LinkedIn, Instagram, and Telegram. Stay connected across all platforms.",
  openGraph: {
    title: "Socials — Follow SP NET INC",
    description:
      "Follow SP NET INC and Savan Patel on GitHub, LinkedIn, Instagram, and Telegram. Stay connected across all platforms.",
    url: "https://savan.sp-net.in/company/socials",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Socials — Follow SP NET INC",
    description:
      "Follow SP NET INC and Savan Patel on GitHub, LinkedIn, Instagram, and Telegram. Stay connected across all platforms.",
  },
  alternates: {
    canonical: "/company/socials",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Socials",
  url: "https://savan.sp-net.in/company/socials",
  description:
    "Follow SP NET INC and Savan Patel on GitHub, LinkedIn, Instagram, and Telegram.",
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
