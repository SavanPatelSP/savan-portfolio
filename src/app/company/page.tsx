import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Company — SP NET INC",
  description:
    "Everything about SP NET INC — the company building infrastructure for modern communication, enterprise administration, and intelligent automation.",
  openGraph: {
    title: "Company — SP NET INC",
    description:
      "Everything about SP NET INC — the company building infrastructure for modern communication, enterprise administration, and intelligent automation.",
    url: "https://savan.sp-net.in/company",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Company — SP NET INC",
    description:
      "Everything about SP NET INC — the company building infrastructure for modern communication, enterprise administration, and intelligent automation.",
  },
  alternates: {
    canonical: "/company",
  },
};

export default function Page() {
  return <ClientPage />;
}
