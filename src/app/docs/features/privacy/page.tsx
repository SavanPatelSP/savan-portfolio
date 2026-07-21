import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Privacy & Security",
  description:
    "Zero data collection, no analytics, no tracking, HTTPS-only, and local storage practices in the Portfolio App.",
  openGraph: {
    title: "Privacy & Security — Portfolio App Docs",
    description:
      "Zero data collection, no analytics, no tracking, HTTPS-only, and local storage practices in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/features/privacy",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/features/privacy" },
};

export default function PrivacyPage() {
  return <ClientPage />;
}
