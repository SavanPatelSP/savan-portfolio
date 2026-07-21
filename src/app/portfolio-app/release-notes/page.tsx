import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Release Notes — Portfolio App",
  description: "Changelog and release notes for the Portfolio App. View what's new in each version.",
  openGraph: {
    title: "Release Notes — Portfolio App",
    description: "Changelog and release notes for the Portfolio App.",
    url: "https://savan.sp-net.in/portfolio-app/release-notes",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Release Notes — Portfolio App",
    description: "Changelog and release notes for the Portfolio App.",
  },
  alternates: { canonical: "/portfolio-app/release-notes" },
};

export default function Page() {
  return <ClientPage />;
}
