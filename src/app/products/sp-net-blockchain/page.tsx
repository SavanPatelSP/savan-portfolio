import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-blockchain",
  title:
    "SP NET BLOCKCHAIN — Private Blockchain Platform | Digital Asset Infrastructure by SP NET INC",
  description:
    "A private blockchain platform developed entirely by SP NET INC. SP NET BLOCKCHAIN provides the long-term infrastructure for official digital tokens, digital assets, wallet services, and enterprise blockchain solutions across the SP NET ecosystem.",
  ogDescription:
    "Private blockchain platform by SP NET INC. The long-term foundation for official digital tokens, digital assets, and enterprise blockchain services across the SP NET ecosystem.",
  twitterDescription:
    "Private blockchain platform by SP NET INC. The long-term foundation for official digital tokens, digital assets, and enterprise blockchain services across the SP NET ecosystem.",
  category: "Blockchain Platform",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-blockchain",
  title: "SP NET BLOCKCHAIN — Private Blockchain Platform",
  description:
    "A private blockchain platform built by SP NET INC. The long-term foundation for blockchain-powered products, official tokens, digital assets, and enterprise blockchain solutions.",
  category: "Blockchain Platform",
});

export default function BlockchainPage() {
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
