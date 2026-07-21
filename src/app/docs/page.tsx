import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Documentation — Portfolio App",
  description:
    "Complete documentation for the Portfolio App — installation, features, architecture, developer guide, and reference.",
  openGraph: {
    title: "Documentation — Portfolio App",
    description:
      "Complete documentation for the Portfolio App — installation, features, architecture, developer guide, and reference.",
    url: "https://savan.sp-net.in/docs",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation — Portfolio App",
    description: "Complete documentation for the Portfolio App.",
  },
  alternates: {
    canonical: "/docs",
  },
};

export default function Page() {
  return <ClientPage />;
}
