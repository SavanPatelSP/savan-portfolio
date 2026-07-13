import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Founder — Savan Patel",
  description:
    "Learn about Savan Patel — the self-taught software engineer and founder behind SP NET INC.",
  openGraph: {
    title: "Founder — Savan Patel",
    description:
      "Learn about Savan Patel — the self-taught software engineer and founder behind SP NET INC.",
    url: "https://savan.sp-net.in/founder",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder — Savan Patel",
    description:
      "Learn about Savan Patel — the self-taught software engineer and founder behind SP NET INC.",
  },
  alternates: {
    canonical: "/founder",
  },
};

export default function Page() {
  return <ClientPage />;
}
