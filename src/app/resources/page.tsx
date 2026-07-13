import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Resources — Savan Patel",
  description:
    "Documentation, FAQs, blog, open-source projects, media kit, and press resources.",
  openGraph: {
    title: "Resources — Savan Patel",
    description:
      "Documentation, FAQs, blog, open-source projects, media kit, and press resources.",
    url: "https://savan.sp-net.in/resources",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — Savan Patel",
    description:
      "Documentation, FAQs, blog, open-source projects, media kit, and press resources.",
  },
  alternates: {
    canonical: "/resources",
  },
};

export default function Page() {
  return <ClientPage />;
}
