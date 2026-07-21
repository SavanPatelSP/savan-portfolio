import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Introduction — Portfolio App Documentation",
  description:
    "Learn what the Portfolio App is — a Progressive Web App that delivers a native app experience without the app store. Installable, offline-capable, and privacy-first.",
  openGraph: {
    title: "Introduction — Portfolio App Documentation",
    description:
      "Learn what the Portfolio App is — a PWA that delivers a native app experience without the app store.",
    url: "https://savan.sp-net.in/docs/introduction",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Introduction — Portfolio App",
    description:
      "Learn what the Portfolio App is — a PWA that delivers a native app experience without the app store.",
  },
  alternates: {
    canonical: "/docs/introduction",
  },
};

export default function Page() {
  return <ClientPage />;
}
