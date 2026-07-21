import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Documentation Viewer",
  description:
    "Navigate the built-in documentation viewer — three-column layout, search, and code samples.",
  openGraph: {
    title: "Documentation Viewer — Portfolio App Docs",
    description:
      "Navigate the built-in documentation viewer — three-column layout, search, and code samples.",
    url: "https://savan.sp-net.in/docs/application/documentation",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/application/documentation" },
};

export default function DocumentationPage() {
  return <ClientPage />;
}
