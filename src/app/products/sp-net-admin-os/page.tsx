import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-admin-os",
  title: "SP NET ADMIN OS — Enterprise Administration Platform",
  description:
    "A complete enterprise administration platform featuring licensing, premium management, coins & gems economy, organizations, team members, departments, permissions, audit logs, analytics, moderation, security, and administration dashboard.",
  ogDescription:
    "Enterprise administration, redesigned. Organizations, permissions, economies, analytics, moderation — all unified in one platform.",
  twitterDescription:
    "Enterprise administration, redesigned. A complete platform for organizations, permissions, analytics, and moderation.",
  category: "BusinessApplication",
  operatingSystem: "Web",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-admin-os",
  title: "SP NET ADMIN OS",
  description:
    "A complete enterprise administration platform featuring licensing, premium management, coins & gems economy, organizations, team members, departments, permissions, audit logs, analytics, moderation, security, and administration dashboard.",
  category: "BusinessApplication",
  operatingSystem: "Web",
});

export default function SPNetAdminOSPage() {
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
