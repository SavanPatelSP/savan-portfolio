import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Build & Deployment",
  description:
    "How the site is built, optimized, and delivered to visitors around the world.",
  openGraph: {
    title: "Build & Deployment — Portfolio App Docs",
    description:
      "How the site is built, optimized, and delivered to visitors around the world.",
    url: "https://savan.sp-net.in/docs/architecture/build-deploy",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/build-deploy" },
};

export default function BuildDeployPage() {
  return <ClientPage />;
}
