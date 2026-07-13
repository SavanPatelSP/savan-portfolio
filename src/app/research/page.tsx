import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Research — Savan Patel",
  description:
    "Personal research and exploration in AI, cloud computing, cybersecurity, and emerging technologies.",
  openGraph: {
    title: "Research — Savan Patel",
    description:
      "Personal research and exploration in AI, cloud computing, cybersecurity, and emerging technologies.",
    url: "https://savan.sp-net.in/research",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research — Savan Patel",
    description:
      "Personal research and exploration in AI, cloud computing, cybersecurity, and emerging technologies.",
  },
  alternates: {
    canonical: "/research",
  },
};

export default function Page() {
  return <ClientPage />;
}
