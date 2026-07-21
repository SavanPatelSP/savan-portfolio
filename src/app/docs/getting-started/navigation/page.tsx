import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Navigation — Portfolio App Documentation",
  description:
    "Learn how to navigate the Portfolio App — sidebar, keyboard shortcuts, URL-based routing, breadcrumbs, search, and mobile navigation.",
  openGraph: {
    title: "Navigation — Portfolio App Documentation",
    description:
      "Learn how to navigate the Portfolio App — sidebar, keyboard shortcuts, URL-based routing, breadcrumbs, search, and mobile navigation.",
    url: "https://savan.sp-net.in/docs/navigation",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navigation — Portfolio App",
    description:
      "Learn how to navigate the Portfolio App — sidebar, keyboard shortcuts, and more.",
  },
  alternates: {
    canonical: "/docs/navigation",
  },
};

export default function Page() {
  return <ClientPage />;
}
