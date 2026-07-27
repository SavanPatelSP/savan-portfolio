import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-workplace",
  title: "SP NET WORKPLACE — Your Complete Digital Workspace",
  description:
    "A unified digital workplace bringing together documents, project management, team collaboration, and communication into one seamless platform.",
  ogDescription:
    "Documents, projects, collaboration, and communication — all in one seamless workspace built for modern teams.",
  twitterDescription:
    "A unified digital workspace for documents, projects, and team collaboration.",
  category: "BusinessApplication",
  operatingSystem: "Web, macOS, Windows, Linux",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-workplace",
  title: "SP NET WORKPLACE",
  description:
    "A unified digital workplace bringing together documents, project management, team collaboration, and communication into one seamless platform.",
  category: "BusinessApplication",
  operatingSystem: "Web, macOS, Windows, Linux",
});

export default function SPNetWorkplacePage() {
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
