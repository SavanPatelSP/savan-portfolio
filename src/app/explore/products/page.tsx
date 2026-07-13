import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Products — What I'm Building",
  description:
    "A look at the products Savan Patel is building under SP NET INC — messaging, enterprise tools, AI, and the connected ecosystem that ties them together.",
  openGraph: {
    title: "Products — What I'm Building",
    description:
      "The products Savan Patel is building — SP NET GRAM, ADMIN OS, AI, and the Ecosystem.",
    type: "website",
    url: "https://savan.sp-net.in/explore/products",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products — What I'm Building",
    description:
      "The products Savan Patel is building — SP NET GRAM, ADMIN OS, AI, and the Ecosystem.",
  },
  alternates: {
    canonical: "/explore/products",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Products — What I'm Building",
  url: "https://savan.sp-net.in/explore/products",
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
