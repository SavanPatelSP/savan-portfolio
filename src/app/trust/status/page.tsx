import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Status — Personal Availability Dashboard",
  description:
    "Current status of my projects, what I'm working on, and whether I'm available for collaboration.",
  openGraph: {
    title: "Status — Personal Availability Dashboard",
    description:
      "Current status of my projects, what I'm working on, and availability for collaboration.",
    url: "https://savan.sp-net.in/trust/status",
    type: "website",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Status — Personal Availability Dashboard",
    description:
      "Current status of my projects, what I'm working on, and availability for collaboration.",
  },
  alternates: {
    canonical: "/trust/status",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Status",
  url: "https://savan.sp-net.in/trust/status",
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
