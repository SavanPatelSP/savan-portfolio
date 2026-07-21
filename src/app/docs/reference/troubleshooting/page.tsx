import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Troubleshooting — Portfolio App Documentation",
  description:
    "Troubleshooting guide for common issues with the Portfolio App — installation problems, offline errors, and performance fixes.",
  openGraph: {
    title: "Troubleshooting — Portfolio App Documentation",
    description:
      "Troubleshooting guide for common issues with the Portfolio App.",
    url: "https://savan.sp-net.in/docs/troubleshooting",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Troubleshooting — Portfolio App",
    description:
      "Troubleshooting guide for common issues with the Portfolio App.",
  },
  alternates: {
    canonical: "/docs/troubleshooting",
  },
}

export default function Page() {
  return <ClientPage />
}
