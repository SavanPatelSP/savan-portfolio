import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "PWA Installation",
  description:
    "Install the Portfolio App as a Progressive Web App on desktop and mobile.",
  openGraph: {
    title: "PWA Installation — Portfolio App Docs",
    description:
      "Install the Portfolio App as a Progressive Web App on desktop and mobile.",
    url: "https://savan.sp-net.in/docs/installation/pwa",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/installation/pwa" },
};

export default function PWAInstallationPage() {
  return <ClientPage />;
}
