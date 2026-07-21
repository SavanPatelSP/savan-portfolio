import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Installation Guide — Portfolio App",
  description:
    "Step-by-step installation guides for the Portfolio App on Windows, macOS, Linux, Android, and iOS. Install for native desktop and mobile experience.",
  openGraph: {
    title: "Installation Guide — Portfolio App",
    description: "Step-by-step installation guides for all platforms.",
    url: "https://savan.sp-net.in/portfolio-app/install",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Installation Guide — Portfolio App",
    description: "Step-by-step installation guides for all platforms.",
  },
  alternates: { canonical: "/portfolio-app/install" },
};

export default function Page() {
  return <ClientPage />;
}
