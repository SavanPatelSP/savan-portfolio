import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Products — SP NET INC",
  description:
    "Explore the SP NET product ecosystem — from messaging to administration to AI-powered intelligent automation.",
  openGraph: {
    title: "Products — SP NET INC",
    description:
      "Explore the SP NET product ecosystem — from messaging to administration to AI-powered intelligent automation.",
    url: "https://savan.sp-net.in/products",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products — SP NET INC",
    description:
      "Explore the SP NET product ecosystem — from messaging to administration to AI-powered intelligent automation.",
  },
  alternates: {
    canonical: "/products",
  },
};

export default function Page() {
  return <ClientPage />;
}
