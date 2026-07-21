import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Installation Overview",
  description:
    "Installation methods, platform requirements, and browser support for the Portfolio App.",
  openGraph: {
    title: "Installation Overview — Portfolio App Docs",
    description:
      "Installation methods, platform requirements, and browser support for the Portfolio App.",
    url: "https://savan.sp-net.in/docs/installation/overview",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/installation/overview" },
};

export default function InstallationOverviewPage() {
  return <ClientPage />;
}
