import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-gram",
  title: "SP NET GRAM — Next-Generation Messaging Platform",
  description:
    "A next-generation messaging platform focused on privacy, productivity, premium experiences, modern communication, customization, and powerful user tools.",
  ogDescription:
    "Messaging reimagined for the modern world. Secure messaging, communities, premium experiences, and deep personalization — all in one platform.",
  twitterDescription:
    "Messaging reimagined for the modern world. Secure, private, and built for how people actually communicate.",
  category: "CommunicationApplication",
  operatingSystem: "iOS, Android, macOS, Windows, Linux, Web",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-gram",
  title: "SP NET GRAM",
  description:
    "A next-generation messaging platform focused on privacy, productivity, premium experiences, modern communication, customization, and powerful user tools.",
  category: "CommunicationApplication",
  operatingSystem: "iOS, Android, macOS, Windows, Linux, Web",
});

export default function SPNetGramPage() {
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
