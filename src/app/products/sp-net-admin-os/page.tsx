import type { Metadata } from "next";
import SPNetAdminOSClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "SP NET ADMIN OS — Enterprise Administration Platform",
  description:
    "A complete enterprise administration platform featuring licensing, premium management, coins & gems economy, organizations, team members, departments, permissions, audit logs, analytics, moderation, security, and administration dashboard.",
  openGraph: {
    title: "SP NET ADMIN OS — Enterprise Administration Platform",
    description:
      "Enterprise administration, redesigned. Organizations, permissions, economies, analytics, moderation — all unified in one platform.",
    type: "website",
    url: "https://savan.sp-net.in/products/sp-net-admin-os",
    siteName: "SP NET INC",
    images: [{ url: "/og?section=sp-net-admin-os", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP NET ADMIN OS — Enterprise Administration Platform",
    description:
      "Enterprise administration, redesigned. A complete platform for organizations, permissions, analytics, and moderation.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=sp-net-admin-os", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "/products/sp-net-admin-os",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SP NET ADMIN OS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "A complete enterprise administration platform featuring licensing, premium management, coins & gems economy, organizations, team members, departments, permissions, audit logs, analytics, moderation, security, and administration dashboard.",
  url: "https://savan.sp-net.in/products/sp-net-admin-os",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Person",
    name: "Savan Patel",
    url: "https://savan.sp-net.in",
  },
  publisher: {
    "@type": "Organization",
    name: "SP NET INC",
    url: "https://sp-net.in",
  },
};

export default function SPNetAdminOSPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SPNetAdminOSClientPage />
    </>
  );
}
