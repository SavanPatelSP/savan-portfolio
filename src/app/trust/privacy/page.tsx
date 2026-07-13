import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Privacy — How I Respect Your Privacy",
  description:
    "How I handle visitor data on this portfolio. No tracking, no ads, no analytics — just a simple site that respects your privacy.",
  openGraph: {
    title: "Privacy — How I Respect Your Privacy",
    description:
      "How I handle visitor data on this portfolio. No tracking, no ads, no analytics.",
    url: "https://savan.sp-net.in/trust/privacy",
    type: "website",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy — How I Respect Your Privacy",
    description:
      "How I handle visitor data on this portfolio. No tracking, no ads, no analytics.",
  },
  alternates: {
    canonical: "/trust/privacy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Privacy",
  url: "https://savan.sp-net.in/trust/privacy",
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
