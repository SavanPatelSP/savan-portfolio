import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Projects — Active Development",
  description:
    "What Savan Patel is working on right now — active projects, side experiments, open source contributions, and the code that keeps him up at night.",
  openGraph: {
    title: "Projects — Active Development",
    description:
      "Active projects, side experiments, and open source work from Savan Patel.",
    type: "website",
    url: "https://savan.sp-net.in/explore/projects",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects — Active Development",
    description:
      "Active projects, side experiments, and open source work from Savan Patel.",
  },
  alternates: {
    canonical: "/explore/projects",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Projects — Active Development",
  url: "https://savan.sp-net.in/explore/projects",
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
