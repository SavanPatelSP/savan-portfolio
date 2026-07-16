import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Products — SP NET INC",
  description:
    "Explore the full SP NET product ecosystem — core products, platforms, and research initiatives spanning messaging, administration, AI, and beyond.",
  openGraph: {
    title: "Products — SP NET INC",
    description:
      "Explore the full SP NET product ecosystem — core products, platforms, and research initiatives.",
    url: "https://savan.sp-net.in/products",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products — SP NET INC",
    description:
      "Explore the full SP NET product ecosystem — core products, platforms, and research initiatives.",
  },
  alternates: {
    canonical: "/products",
  },
};

export default function Page() {
  return <ClientPage />;
}
