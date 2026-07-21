import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Web",
  description:
    "Use the Portfolio App directly in your browser — no installation required.",
  openGraph: {
    title: "Web — Portfolio App Docs",
    description:
      "Use the Portfolio App directly in your browser — no installation required.",
    url: "https://savan.sp-net.in/docs/installation/web",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/installation/web" },
};

export default function WebPage() {
  return <ClientPage />;
}
