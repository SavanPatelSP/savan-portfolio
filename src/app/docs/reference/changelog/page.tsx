import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Changelog — Portfolio App Documentation",
  description:
    "Version history and changelog for the Portfolio App — release notes, updates, and bug fixes.",
  openGraph: {
    title: "Changelog — Portfolio App Documentation",
    description:
      "Version history and changelog for the Portfolio App.",
    url: "https://savan.sp-net.in/docs/changelog",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog — Portfolio App",
    description:
      "Version history and changelog for the Portfolio App.",
  },
  alternates: {
    canonical: "/docs/changelog",
  },
}

export default function Page() {
  return <ClientPage />
}
