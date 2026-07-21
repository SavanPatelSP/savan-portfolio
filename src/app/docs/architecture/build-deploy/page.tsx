import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Build & Deployment",
  description:
    "Vercel deployment, build process, environment variables, preview deployments, and performance budgets.",
  openGraph: {
    title: "Build & Deployment — Portfolio App Docs",
    description:
      "Vercel deployment, build process, environment variables, preview deployments, and performance budgets.",
    url: "https://savan.sp-net.in/docs/architecture/build-deploy",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/architecture/build-deploy" },
};

export default function BuildDeployPage() {
  return <ClientPage />;
}
