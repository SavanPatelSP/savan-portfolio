import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "Image optimization, lazy loading, code splitting, caching strategies, and Core Web Vitals targets.",
  openGraph: {
    title: "Performance — Portfolio App Docs",
    description:
      "Image optimization, lazy loading, code splitting, caching strategies, and Core Web Vitals targets.",
    url: "https://savan.sp-net.in/docs/features/performance",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/features/performance" },
};

export default function PerformancePage() {
  return <ClientPage />;
}
