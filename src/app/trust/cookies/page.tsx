import type { Metadata } from "next";
import ClientPage from "./ClientPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://savan.sp-net.in";

export const metadata: Metadata = {
  title: "Cookies & Local Storage — SP NET INC",
  description:
    "How SP NET INC uses browser localStorage for preference storage. No advertising cookies, no tracking cookies, no third-party cookies. Privacy by default.",
  keywords: [
    "cookies",
    "local storage",
    "browser storage",
    "privacy",
    "SP NET INC",
    "SP NET",
    "data storage",
    "consent preferences",
  ],
  openGraph: {
    title: "Cookies & Local Storage — SP NET INC",
    description:
      "How SP NET INC uses browser localStorage for preference storage. No advertising cookies, no tracking, privacy by default.",
    url: `${SITE_URL}/trust/cookies`,
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookies & Local Storage — SP NET INC",
    description:
      "How SP NET INC uses browser localStorage for preference storage. No advertising cookies, no tracking, privacy by default.",
  },
  alternates: {
    canonical: `${SITE_URL}/trust/cookies`,
  },
};

export default function CookiesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Trust",
        item: `${SITE_URL}/trust`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Cookies & Local Storage",
        item: `${SITE_URL}/trust/cookies`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does SP NET INC use cookies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SP NET INC does not use advertising cookies, tracking cookies, or analytics cookies. A Website Preferences notice may appear once to remember whether you accepted or declined it. That preference is stored locally in your browser using localStorage.",
        },
      },
      {
        "@type": "Question",
        name: "What is browser localStorage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "localStorage is a browser-native storage mechanism that lets websites save small amounts of data locally on your device. Unlike cookies, localStorage data is not sent to any server. SP NET INC uses it only to remember your preference about the Website Preferences notice.",
        },
      },
      {
        "@type": "Question",
        name: "Can I clear my browser preferences?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can clear localStorage through your browser's developer tools or settings. Clearing it will cause the Website Preferences notice to reappear the next time you visit the site.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ClientPage />
    </>
  );
}
