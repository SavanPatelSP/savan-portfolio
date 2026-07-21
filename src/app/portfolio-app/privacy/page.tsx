import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Privacy — Portfolio App",
  description: "Privacy policy for the Portfolio App. No tracking, no analytics, no data collection. Full transparency.",
  openGraph: {
    title: "Privacy — Portfolio App",
    description: "No tracking, no analytics, no data collection. Full transparency.",
    url: "https://savan.sp-net.in/portfolio-app/privacy",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy — Portfolio App",
    description: "No tracking, no analytics, no data collection. Full transparency.",
  },
  alternates: { canonical: "/portfolio-app/privacy" },
};

export default function Page() {
  return <ClientPage />;
}
