import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Software distribution, version management, and file verification for the Portfolio App.",
  openGraph: {
    title: "Downloads — Portfolio App Docs",
    description:
      "Software distribution, version management, and file verification for the Portfolio App.",
    url: "https://savan.sp-net.in/docs/application/downloads",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/application/downloads" },
};

export default function DownloadsPage() {
  return <ClientPage />;
}
