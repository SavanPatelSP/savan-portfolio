import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-robotics",
  title: "SP NET Robotics — Intelligence Meets the Physical World",
  description:
    "A robotics research initiative exploring how the SP NET AI platform can bridge the gap between digital intelligence and physical-world automation.",
  ogDescription:
    "Exploring how SPNET AI bridges digital intelligence and physical-world automation through robotics research.",
  twitterDescription:
    "Robotics research exploring how AI bridges digital intelligence and physical-world automation.",
  category: "DeveloperApplication",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-robotics",
  title: "SP NET Robotics",
  description:
    "A robotics research initiative exploring how the SP NET AI platform can bridge the gap between digital intelligence and physical-world automation.",
  category: "DeveloperApplication",
});

export default function SPNetRoboticsPage() {
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
