import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "FAQ — Portfolio App Documentation",
  description:
    "Frequently asked questions about the Portfolio App — installation, features, privacy, offline access, and troubleshooting.",
  openGraph: {
    title: "FAQ — Portfolio App Documentation",
    description:
      "Frequently asked questions about the Portfolio App — installation, features, privacy, and more.",
    url: "https://savan.sp-net.in/docs/faq",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Portfolio App",
    description:
      "Frequently asked questions about the Portfolio App.",
  },
  alternates: {
    canonical: "/docs/faq",
  },
}

export default function Page() {
  return <ClientPage />
}
