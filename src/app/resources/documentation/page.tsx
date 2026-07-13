import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Documentation — Coming Soon",
  description:
    "Comprehensive documentation for all SP NET products, APIs, and developer tools. Currently being prepared.",
  openGraph: {
    title: "Documentation — Coming Soon",
    description:
      "Comprehensive documentation for all SP NET products, APIs, and developer tools. Currently being prepared.",
    url: "https://savan.sp-net.in/resources/documentation",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation — Coming Soon",
    description:
      "Comprehensive documentation for all SP NET products, APIs, and developer tools. Currently being prepared.",
  },
  alternates: {
    canonical: "/resources/documentation",
  },
};

export default function Page() {
  return <ClientPage />;
}
