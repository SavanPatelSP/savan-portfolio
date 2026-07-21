import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Contributing",
  description:
    "Development workflow, code review process, pull request guidelines, and commit conventions for contributing to the Portfolio App.",
  openGraph: {
    title: "Contributing — Portfolio App Docs",
    description:
      "Development workflow, code review process, pull request guidelines, and commit conventions for contributing to the Portfolio App.",
    url: "https://savan.sp-net.in/docs/developer/contributing",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/developer/contributing" },
};

export default function ContributingPage() {
  return <ClientPage />;
}
