import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-cloud",
  title: "SP NET Cloud — Scalable Infrastructure for Everything",
  description:
    "A cloud infrastructure platform designed for the SP NET ecosystem — compute, storage, edge functions, and managed services built for privacy and performance.",
  ogDescription:
    "Compute, storage, edge functions, and managed services — cloud infrastructure built for privacy and performance.",
  twitterDescription:
    "Cloud infrastructure built for privacy, performance, and the SP NET ecosystem.",
  category: "DeveloperApplication",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-cloud",
  title: "SP NET Cloud",
  description:
    "A cloud infrastructure platform designed for the SP NET ecosystem — compute, storage, edge functions, and managed services built for privacy and performance.",
  category: "DeveloperApplication",
});

export default function SPNetCloudPage() {
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
