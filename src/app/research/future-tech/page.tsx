import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Future Technologies — What Excites Me Next",
  description:
    "Savan Patel's exploration of emerging technologies — AR/VR, IoT, blockchain, and the long-term technical vision for SP NET.",
  openGraph: {
    title: "Future Technologies — What Excites Me Next",
    description:
      "Savan Patel's exploration of emerging technologies — AR/VR, IoT, blockchain, and the long-term technical vision.",
    url: "https://savan.sp-net.in/research/future-tech",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Technologies — What Excites Me Next",
    description:
      "Savan Patel's exploration of emerging technologies — AR/VR, IoT, blockchain, and the long-term technical vision.",
  },
  alternates: {
    canonical: "/research/future-tech",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Future Technologies Research",
  url: "https://savan.sp-net.in/research/future-tech",
  description:
    "Savan Patel's exploration of emerging technologies — AR/VR, IoT, blockchain, and the long-term technical vision.",
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
