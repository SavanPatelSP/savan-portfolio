import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "iOS",
  description:
    "Install the Portfolio App on iPhone and iPad using Safari.",
  openGraph: {
    title: "iOS — Portfolio App Docs",
    description:
      "Install the Portfolio App on iPhone and iPad using Safari.",
    url: "https://savan.sp-net.in/docs/installation/ios",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/installation/ios" },
};

export default function IOSPage() {
  return <ClientPage />;
}
