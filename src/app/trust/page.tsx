import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Trust — Savan Patel",
  description:
    "My principles on privacy, security, transparency, and responsible technology development.",
  openGraph: {
    title: "Trust — Savan Patel",
    description:
      "My principles on privacy, security, transparency, and responsible technology development.",
    url: "https://savan.sp-net.in/trust",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust — Savan Patel",
    description:
      "My principles on privacy, security, transparency, and responsible technology development.",
  },
  alternates: {
    canonical: "/trust",
  },
};

export default function Page() {
  return <ClientPage />;
}
