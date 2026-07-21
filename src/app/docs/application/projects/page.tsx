import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse and filter the engineering portfolio — project cards, status badges, and tech stacks.",
  openGraph: {
    title: "Projects — Portfolio App Docs",
    description:
      "Browse and filter the engineering portfolio — project cards, status badges, and tech stacks.",
    url: "https://savan.sp-net.in/docs/application/projects",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/application/projects" },
};

export default function ProjectsPage() {
  return <ClientPage />;
}
