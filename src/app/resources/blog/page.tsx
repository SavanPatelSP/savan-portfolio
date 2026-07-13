import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Blog — Coming Soon",
  description:
    "A space for deep dives into engineering decisions, technology explorations, and the stories behind building SP NET.",
  openGraph: {
    title: "Blog — Coming Soon",
    description:
      "A space for deep dives into engineering decisions, technology explorations, and the stories behind building SP NET.",
    url: "https://savan.sp-net.in/resources/blog",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Coming Soon",
    description:
      "A space for deep dives into engineering decisions, technology explorations, and the stories behind building SP NET.",
  },
  alternates: {
    canonical: "/resources/blog",
  },
};

export default function Page() {
  return <ClientPage />;
}
