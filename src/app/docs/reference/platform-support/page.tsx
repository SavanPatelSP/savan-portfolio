import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Platform Support — Portfolio App Documentation",
  description:
    "Browser compatibility, operating system support, and feature matrix for the Portfolio App across all major platforms.",
  openGraph: {
    title: "Platform Support — Portfolio App Documentation",
    description:
      "Browser compatibility and OS support for the Portfolio App.",
    url: "https://savan.sp-net.in/docs/platform-support",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Platform Support — Portfolio App",
    description:
      "Browser compatibility and OS support for the Portfolio App.",
  },
  alternates: {
    canonical: "/docs/platform-support",
  },
}

export default function Page() {
  return <ClientPage />
}
