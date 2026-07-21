import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Quick Start — Portfolio App Documentation",
  description:
    "Get up and running with the Portfolio App in under a minute. Open, install, launch, and browse — even offline.",
  openGraph: {
    title: "Quick Start — Portfolio App Documentation",
    description:
      "Get up and running with the Portfolio App in under a minute. Open, install, launch, and browse — even offline.",
    url: "https://savan.sp-net.in/docs/quick-start",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Start — Portfolio App",
    description:
      "Get up and running with the Portfolio App in under a minute.",
  },
  alternates: {
    canonical: "/docs/quick-start",
  },
};

export default function Page() {
  return <ClientPage />;
}
