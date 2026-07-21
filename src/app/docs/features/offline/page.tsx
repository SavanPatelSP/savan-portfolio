import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Offline Experience",
  description:
    "Service worker architecture, cache-first strategies, and offline capabilities in the Portfolio App.",
  openGraph: {
    title: "Offline Experience — Portfolio App Docs",
    description:
      "Service worker architecture, cache-first strategies, and offline capabilities in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/features/offline",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/features/offline" },
};

export default function OfflinePage() {
  return <ClientPage />;
}
