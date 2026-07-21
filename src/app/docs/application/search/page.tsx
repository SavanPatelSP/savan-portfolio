import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Find content across the Portfolio App using the global search modal.",
  openGraph: {
    title: "Search — Portfolio App Docs",
    description:
      "Find content across the Portfolio App using the global search modal.",
    url: "https://savan.sp-net.in/docs/application/search",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/application/search" },
};

export default function SearchPage() {
  return <ClientPage />;
}
