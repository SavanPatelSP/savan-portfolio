import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Portfolio App — Installable Web Application by SP NET INC",
  description:
    "The Portfolio App is a flagship Progressive Web App developed by SP NET INC. Install it for native desktop and mobile experience with offline access.",
  openGraph: {
    title: "Portfolio App — SP NET INC",
    description:
      "Installable web application with native experience, offline access, and automatic updates.",
    url: "https://savan.sp-net.in/portfolio-app",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio App — SP NET INC",
    description:
      "Installable web application with native experience, offline access, and automatic updates.",
  },
  alternates: {
    canonical: "/portfolio-app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Portfolio App",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux, Android, iOS",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Organization", name: "SP NET INC" },
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
