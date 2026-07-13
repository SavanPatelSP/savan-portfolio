import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Learning Resources — What I'm Learning & Recommend",
  description:
    "Technologies Savan Patel is currently learning, resources I recommend, and the approach I take to keep growing as a developer.",
  openGraph: {
    title: "Learning Resources — What I'm Learning & Recommend",
    description:
      "Learning resources and technologies Savan Patel recommends and is currently exploring.",
    type: "website",
    url: "https://savan.sp-net.in/explore/learning",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Resources — What I'm Learning & Recommend",
    description:
      "Learning resources and technologies Savan Patel recommends and is currently exploring.",
  },
  alternates: {
    canonical: "/explore/learning",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Learning Resources — What I'm Learning & Recommend",
  url: "https://savan.sp-net.in/explore/learning",
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
