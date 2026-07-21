import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Platform Support — Portfolio App",
  description:
    "Detailed platform and browser compatibility matrix for the Portfolio App. Supported browsers, operating systems, and features.",
  openGraph: {
    title: "Platform Support — Portfolio App",
    description: "Detailed platform and browser compatibility matrix.",
    url: "https://savan.sp-net.in/portfolio-app/platform-support",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Support — Portfolio App",
    description: "Detailed platform and browser compatibility matrix.",
  },
  alternates: { canonical: "/portfolio-app/platform-support" },
};

export default function Page() {
  return <ClientPage />;
}
