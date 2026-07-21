import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Automatic update mechanism, background detection, and version handling in the Portfolio App.",
  openGraph: {
    title: "Updates — Portfolio App Docs",
    description:
      "Automatic update mechanism, background detection, and version handling in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/features/updates",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/features/updates" },
};

export default function UpdatesPage() {
  return <ClientPage />;
}
