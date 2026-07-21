import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "FAQ — Portfolio App",
  description: "Frequently asked questions about the Portfolio App. Installation, offline access, privacy, troubleshooting, and more.",
  openGraph: {
    title: "FAQ — Portfolio App",
    description: "Frequently asked questions about the Portfolio App.",
    url: "https://savan.sp-net.in/portfolio-app/faq",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Portfolio App",
    description: "Frequently asked questions about the Portfolio App.",
  },
  alternates: { canonical: "/portfolio-app/faq" },
};

export default function Page() {
  return <ClientPage />;
}
