import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Install Portfolio App — SP NET INC",
  description:
    "Install the Portfolio App v1.0.0 by SP NET INC. A Progressive Web App with native experience, offline access, and automatic updates. Free install for Windows, macOS, Linux, Android, and iOS.",
  openGraph: {
    title: "Install Portfolio App — SP NET INC",
    description:
      "Install the Portfolio App v1.0.0. Progressive Web App with native experience, offline access, and automatic updates.",
    url: "https://savan.sp-net.in/downloads/portfolio-app",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Install Portfolio App — SP NET INC",
    description:
      "Install the Portfolio App v1.0.0. Progressive Web App with native experience, offline access, and automatic updates.",
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
  softwareVersion: "1.0.0",
  fileSize: "15MB",
  downloadUrl: "https://savan.sp-net.in/downloads/portfolio-app",
  screenshot: "https://savan.sp-net.in/og?section=portfolio-app",
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
