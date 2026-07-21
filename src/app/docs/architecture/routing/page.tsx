import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Routing",
  description:
    "App Router, file-based routing, dynamic routes, route groups, loading states, error handling, and the metadata API.",
  openGraph: {
    title: "Routing — Portfolio App Docs",
    description:
      "App Router, file-based routing, dynamic routes, route groups, loading states, error handling, and the metadata API.",
    url: "https://savan.sp-net.in/docs/architecture/routing",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/routing" },
};

export default function RoutingPage() {
  return <ClientPage />;
}
