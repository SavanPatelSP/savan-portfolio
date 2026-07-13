import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Future Vision — Where I'm Headed",
  description:
    "Savan Patel's vision for the future — short-term goals, medium-term dreams, and the long-term impact I want to make through technology.",
  openGraph: {
    title: "Future Vision — Where I'm Headed",
    description:
      "Savan Patel's vision for the future — goals, dreams, and impact.",
    type: "website",
    url: "https://savan.sp-net.in/explore/vision",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Vision — Where I'm Headed",
    description:
      "Savan Patel's vision for the future — goals, dreams, and impact.",
  },
  alternates: {
    canonical: "/explore/vision",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Future Vision — Where I'm Headed",
  url: "https://savan.sp-net.in/explore/vision",
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
