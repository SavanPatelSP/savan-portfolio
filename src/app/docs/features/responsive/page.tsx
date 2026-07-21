import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Responsive Design",
  description:
    "Responsive breakpoints, device-specific layouts, and adaptive interactions in the Portfolio App.",
  openGraph: {
    title: "Responsive Design — Portfolio App Docs",
    description:
      "Responsive breakpoints, device-specific layouts, and adaptive interactions in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/features/responsive",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/features/responsive" },
};

export default function ResponsivePage() {
  return <ClientPage />;
}
