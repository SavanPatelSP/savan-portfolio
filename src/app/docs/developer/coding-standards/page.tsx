import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Coding Standards",
  description:
    "TypeScript strict mode conventions, Tailwind CSS patterns, naming rules, import ordering, and file structure guidelines for the Portfolio App.",
  openGraph: {
    title: "Coding Standards — Portfolio App Docs",
    description:
      "TypeScript strict mode conventions, Tailwind CSS patterns, naming rules, import ordering, and file structure guidelines for the Portfolio App.",
    url: "https://savan.sp-net.in/docs/developer/coding-standards",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/developer/coding-standards" },
};

export default function CodingStandardsPage() {
  return <ClientPage />;
}
