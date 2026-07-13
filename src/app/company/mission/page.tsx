import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Mission & Vision — Purpose & Direction at SP NET INC",
  description:
    "Discover the mission and vision driving SP NET INC — to build software that elevates human potential through thoughtful design and precision engineering.",
  openGraph: {
    title: "Mission & Vision — Purpose & Direction at SP NET INC",
    description:
      "To build software that elevates human potential through thoughtful design and precision engineering.",
    url: "https://savan.sp-net.in/company/mission",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mission & Vision — Purpose & Direction at SP NET INC",
    description:
      "To build software that elevates human potential through thoughtful design and precision engineering.",
  },
  alternates: {
    canonical: "/company/mission",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SP NET INC",
  url: "https://sp-net.in",
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
