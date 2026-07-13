import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Press Releases — Coming Soon",
  description:
    "Official press releases, product announcements, and company news from SP NET INC.",
  openGraph: {
    title: "Press Releases — Coming Soon",
    description:
      "Official press releases, product announcements, and company news from SP NET INC.",
    url: "https://savan.sp-net.in/resources/press-releases",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Releases — Coming Soon",
    description:
      "Official press releases, product announcements, and company news from SP NET INC.",
  },
  alternates: {
    canonical: "/resources/press-releases",
  },
};

export default function Page() {
  return <ClientPage />;
}
