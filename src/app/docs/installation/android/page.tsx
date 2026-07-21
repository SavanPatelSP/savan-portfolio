import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Android",
  description:
    "Install and manage the Portfolio App on Android devices.",
  openGraph: {
    title: "Android — Portfolio App Docs",
    description:
      "Install and manage the Portfolio App on Android devices.",
    url: "https://savan.sp-net.in/docs/installation/android",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/installation/android" },
};

export default function AndroidPage() {
  return <ClientPage />;
}
