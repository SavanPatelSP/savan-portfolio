import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-game",
  title: "SP NET GAME — Interactive Entertainment Reimagined",
  description:
    "A gaming platform exploring cloud-native game streaming, cross-device play, social gaming experiences, and creator tools for indie developers.",
  ogDescription:
    "Cloud-native game streaming, cross-device play, and creator tools — gaming built for the future.",
  twitterDescription:
    "A gaming platform exploring cloud streaming, cross-device play, and creator tools.",
  category: "GameApplication",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-game",
  title: "SP NET GAME",
  description:
    "A gaming platform exploring cloud-native game streaming, cross-device play, social gaming experiences, and creator tools for indie developers.",
  category: "GameApplication",
});

export default function SPNetGamePage() {
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
