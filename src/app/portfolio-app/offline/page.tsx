import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Offline Experience — Portfolio App",
  description: "Learn about the Portfolio App's offline capabilities, caching strategy, and offline fallback page.",
  openGraph: {
    title: "Offline Experience — Portfolio App",
    description: "Offline capabilities, caching strategy, and limitations.",
    url: "https://savan.sp-net.in/portfolio-app/offline",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Offline Experience — Portfolio App",
    description: "Offline capabilities, caching strategy, and limitations.",
  },
  alternates: { canonical: "/portfolio-app/offline" },
};

export default function Page() {
  return <ClientPage />;
}
