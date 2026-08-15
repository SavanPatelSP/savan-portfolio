import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "savaro-x",
  title: "SavaroX — Official Token of SP NET BLOCKCHAIN",
  description:
    "SavaroX is the official digital token of the SP NET BLOCKCHAIN platform. A digital asset designed for utility, governance, and ecosystem participation within the SP NET ecosystem.",
  ogDescription:
    "Official token of the SP NET BLOCKCHAIN platform. Designed for utility, governance, and ecosystem participation.",
  twitterDescription:
    "Official token of the SP NET BLOCKCHAIN platform. Designed for utility, governance, and ecosystem participation.",
  category: "Official Token",
});

const jsonLd = generateProductJsonLd({
  slug: "savaro-x",
  title: "SavaroX — Official Token",
  description:
    "The official digital token of the SP NET BLOCKCHAIN platform. Designed for utility, governance, and ecosystem participation.",
  category: "Official Token",
});

export default function SavaroXPage() {
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
