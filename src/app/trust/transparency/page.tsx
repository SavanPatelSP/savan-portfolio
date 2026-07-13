import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Transparency — Building Openly",
  description:
    "How I build in public, share progress honestly, and keep an open-source mindset across all my projects.",
  openGraph: {
    title: "Transparency — Building Openly",
    description:
      "How I build in public, share progress honestly, and keep an open-source mindset.",
    url: "https://savan.sp-net.in/trust/transparency",
    type: "website",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transparency — Building Openly",
    description:
      "How I build in public, share progress honestly, and keep an open-source mindset.",
  },
  alternates: {
    canonical: "/trust/transparency",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Transparency",
  url: "https://savan.sp-net.in/trust/transparency",
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
