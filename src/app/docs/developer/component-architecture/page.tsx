import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Component Architecture",
  description:
    "Understand the component organization, client/server component boundaries, motion system, and shared patterns in the Portfolio App.",
  openGraph: {
    title: "Component Architecture — Portfolio App Docs",
    description:
      "Understand the component organization, client/server component boundaries, motion system, and shared patterns in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/developer/component-architecture",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/developer/component-architecture" },
};

export default function ComponentArchitecturePage() {
  return <ClientPage />;
}
