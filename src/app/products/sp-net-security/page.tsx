import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-security",
  title: "SP NET Security — Protection Built Into Every Layer",
  description:
    "A security platform providing threat detection, vulnerability assessment, incident response, and compliance monitoring across the entire SP NET ecosystem.",
  ogDescription:
    "Threat detection, vulnerability assessment, incident response, and compliance — security built into every layer.",
  twitterDescription:
    "Comprehensive security across the entire SP NET ecosystem.",
  category: "SecurityApplication",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-security",
  title: "SP NET Security",
  description:
    "A security platform providing threat detection, vulnerability assessment, incident response, and compliance monitoring across the entire SP NET ecosystem.",
  category: "SecurityApplication",
});

export default function SPNetSecurityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ClientPage />
    </>
  );
}
