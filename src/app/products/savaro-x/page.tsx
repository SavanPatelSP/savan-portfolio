import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "savaro-x",
  title: "SavaroX — Decentralized Infrastructure for the Next Internet",
  description:
    "SavaroX is a blockchain initiative building decentralized infrastructure, tokenized economies, and Web3-native experiences across the SP NET ecosystem.",
  ogDescription:
    "Building decentralized infrastructure, tokenized economies, and Web3-native experiences for the SP NET ecosystem.",
  twitterDescription:
    "Building decentralized infrastructure, tokenized economies, and Web3-native experiences for the SP NET ecosystem.",
  category: "Blockchain & Web3",
});

const jsonLd = generateProductJsonLd({
  slug: "savaro-x",
  title: "SavaroX",
  description:
    "Building decentralized infrastructure, tokenized economies, and Web3-native experiences for the SP NET ecosystem.",
  category: "Blockchain & Web3",
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
