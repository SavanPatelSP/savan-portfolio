import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET Ecosystem — Coming Soon",
  description:
    "A unified ecosystem connecting messaging, administration, and intelligence. Currently in active research and development.",
  openGraph: {
    title: "SP NET Ecosystem — Coming Soon",
    description:
      "A unified ecosystem connecting messaging, administration, and intelligence. Currently in active research and development.",
    url: "https://savan.sp-net.in/products/sp-net-ecosystem",
    siteName: "SP NET INC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET Ecosystem — Coming Soon",
    description:
      "A unified ecosystem connecting messaging, administration, and intelligence. Currently in active research and development.",
  },
  alternates: {
    canonical: "/products/sp-net-ecosystem",
  },
};

export default function Page() {
  return <ClientPage />;
}
