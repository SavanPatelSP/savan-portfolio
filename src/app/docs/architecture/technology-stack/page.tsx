import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Technology Stack",
  description:
    "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and other technologies powering the Portfolio App.",
  openGraph: {
    title: "Technology Stack — Portfolio App Docs",
    description:
      "Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and other technologies powering the Portfolio App.",
    url: "https://savan.sp-net.in/docs/architecture/technology-stack",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/technology-stack" },
};

export default function TechnologyStackPage() {
  return <ClientPage />;
}
