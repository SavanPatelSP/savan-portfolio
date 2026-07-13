import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Updates — News & Announcements",
  description:
    "Stay up to date with SP NET INC. Newsroom announcements, blog posts, press releases, and product changelogs — all in one place.",
  openGraph: {
    title: "Updates — News & Announcements",
    description:
      "Stay up to date with SP NET INC. Newsroom announcements, blog posts, press releases, and product changelogs — all in one place.",
    url: "https://savan.sp-net.in/company/updates",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Updates — News & Announcements",
    description:
      "Stay up to date with SP NET INC. Newsroom announcements, blog posts, press releases, and product changelogs — all in one place.",
  },
  alternates: {
    canonical: "/company/updates",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Updates",
  url: "https://savan.sp-net.in/company/updates",
  description:
    "Stay up to date with SP NET INC. Newsroom, blog, press releases, and changelogs.",
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
