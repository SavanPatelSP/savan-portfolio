import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-ai",
  title: "SP NET AI — Intelligent Experiences for the SP NET Ecosystem",
  description:
    "SP NET AI is an AI platform being built to power intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  ogDescription:
    "An AI platform powering intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  twitterDescription:
    "An AI platform powering intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  category: "Artificial Intelligence Application",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-ai",
  title: "SP NET AI",
  description:
    "An AI platform powering intelligent experiences across the SP NET ecosystem — from smart messaging to automated administration.",
  category: "Artificial Intelligence Application",
});

export default function SPNetAIPage() {
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
