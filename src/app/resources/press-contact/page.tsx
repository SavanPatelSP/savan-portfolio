import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Press Contact — Media Inquiries",
  description:
    "Media inquiries, press kit access, and interview requests for SP NET INC. We respond to all press requests promptly.",
  openGraph: {
    title: "Press Contact — Media Inquiries",
    description:
      "Media inquiries, press kit access, and interview requests for SP NET INC.",
    url: "https://savan.sp-net.in/resources/press-contact",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Contact — Media Inquiries",
    description:
      "Media inquiries, press kit access, and interview requests for SP NET INC.",
  },
  alternates: {
    canonical: "/resources/press-contact",
  },
};

export default function Page() {
  return <ClientPage />;
}
