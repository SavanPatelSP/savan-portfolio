import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Project Setup",
  description:
    "Set up the Portfolio App development environment with Node.js, install dependencies, and start the development server.",
  openGraph: {
    title: "Project Setup — Portfolio App Docs",
    description:
      "Set up the Portfolio App development environment with Node.js, install dependencies, and start the development server.",
    url: "https://savan.sp-net.in/docs/developer/project-setup",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/developer/project-setup" },
};

export default function ProjectSetupPage() {
  return <ClientPage />;
}
