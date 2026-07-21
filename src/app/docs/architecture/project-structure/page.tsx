import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Project Structure",
  description:
    "Folder organization, key directories, file naming conventions, and component organization in the Portfolio App.",
  openGraph: {
    title: "Project Structure — Portfolio App Docs",
    description:
      "Folder organization, key directories, file naming conventions, and component organization in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/architecture/project-structure",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/project-structure" },
};

export default function ProjectStructurePage() {
  return <ClientPage />;
}
