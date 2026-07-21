import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Overview of the Portfolio App dashboard — real-time metrics, projects, and activity.",
  openGraph: {
    title: "Dashboard — Portfolio App Docs",
    description:
      "Overview of the Portfolio App dashboard — real-time metrics, projects, and activity.",
    url: "https://savan.sp-net.in/docs/application/dashboard",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/application/dashboard" },
};

export default function DashboardPage() {
  return <ClientPage />;
}
