import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Service Worker",
  description:
    "Service worker registration, lifecycle, cache strategies, update mechanisms, and debugging in the Portfolio App.",
  openGraph: {
    title: "Service Worker — Portfolio App Docs",
    description:
      "Service worker registration, lifecycle, cache strategies, update mechanisms, and debugging in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/architecture/service-worker",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/service-worker" },
};

export default function ServiceWorkerPage() {
  return <ClientPage />;
}
