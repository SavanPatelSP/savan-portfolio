import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Install Portfolio App — PWA | SP NET INC",
  description:
    "Install the Portfolio Application as a Progressive Web App. Available now for Chrome, Edge, Safari, and other modern browsers. Works offline with automatic updates.",
  openGraph: {
    title: "Install Portfolio App — PWA | SP NET INC",
    description:
      "Install the Portfolio Application as a Progressive Web App. Works offline with automatic updates.",
    url: "https://savan.sp-net.in/downloads/portfolio-app",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Install Portfolio App — PWA | SP NET INC",
    description:
      "Install the Portfolio Application as a Progressive Web App. Works offline with automatic updates.",
  },
  alternates: {
    canonical: "/downloads/portfolio-app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Portfolio App",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux, Android, iOS, ChromeOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://savan.sp-net.in",
  },
  description:
    "A Progressive Web App that transforms the portfolio into a native-like application with offline access, automatic updates, and a distraction-free experience.",
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
