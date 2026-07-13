import type { Metadata } from "next";
import JourneyClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Journey — From Curiosity to Creation",
  description:
    "The journey of Savan Patel — from writing his first line of code in 2018 to founding SP NET INC and building a suite of products that connect people and shape the future of technology.",
  openGraph: {
    title: "Journey — From Curiosity to Creation",
    description:
      "From writing his first line of code in 2018 to founding SP NET INC — the full timeline.",
    url: "https://savan.sp-net.in/founder/journey",
    type: "profile",
  },
  alternates: {
    canonical: "/founder/journey",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Savan Patel",
    jobTitle: "Founder & Product Engineer",
    description: "From curiosity to creation — the journey of building SP NET INC.",
    url: "https://savan.sp-net.in/founder/journey",
    alumniOf: "Self-taught",
    nationality: {
      "@type": "Country",
      name: "India",
    },
  },
};

export default function JourneyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JourneyClientPage />
    </>
  );
}
