import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Configure appearance, notifications, security, and keyboard shortcuts in the Portfolio App.",
  openGraph: {
    title: "Settings — Portfolio App Docs",
    description:
      "Configure appearance, notifications, security, and keyboard shortcuts in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/application/settings",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/application/settings" },
};

export default function SettingsPage() {
  return <ClientPage />;
}
