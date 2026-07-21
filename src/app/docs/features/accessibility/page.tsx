import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "WCAG compliance, keyboard navigation, ARIA labels, and inclusive design practices in the Portfolio App.",
  openGraph: {
    title: "Accessibility — Portfolio App Docs",
    description:
      "WCAG compliance, keyboard navigation, ARIA labels, and inclusive design practices in the Portfolio App.",
    url: "https://savan.sp-net.in/docs/features/accessibility",
    siteName: "SP NET INC",
    type: "website",
  },
  alternates: { canonical: "/docs/features/accessibility" },
};

export default function AccessibilityPage() {
  return <ClientPage />;
}
