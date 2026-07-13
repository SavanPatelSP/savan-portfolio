import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Cybersecurity — Protecting What Matters",
  description:
    "Savan Patel's passion for cybersecurity — E2EE in SP NET GRAM, zero-trust architecture, secure coding practices, and responsible disclosure.",
  openGraph: {
    title: "Cybersecurity — Protecting What Matters",
    description:
      "Savan Patel's passion for cybersecurity — E2EE, zero-trust architecture, and secure coding practices.",
    url: "https://savan.sp-net.in/research/cybersecurity",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity — Protecting What Matters",
    description:
      "Savan Patel's passion for cybersecurity — E2EE, zero-trust architecture, and secure coding practices.",
  },
  alternates: {
    canonical: "/research/cybersecurity",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Cybersecurity Research",
  url: "https://savan.sp-net.in/research/cybersecurity",
  description:
    "Savan Patel's passion for cybersecurity — E2EE in GRAM, zero-trust architecture, and secure coding practices.",
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
