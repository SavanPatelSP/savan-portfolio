import ClientPage from "./ClientPage";
import { generateProductMetadata, generateProductJsonLd } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-api",
  title: "SP NET API — Developer Infrastructure at Scale",
  description:
    "A unified API platform providing authentication, rate limiting, billing, SDKs, and developer tools for building on the SP NET ecosystem.",
  ogDescription:
    "Authentication, rate limiting, billing, SDKs — everything developers need to build on the SP NET platform.",
  twitterDescription:
    "A unified API platform for building on the SP NET ecosystem.",
  category: "DeveloperApplication",
});

const jsonLd = generateProductJsonLd({
  slug: "sp-net-api",
  title: "SP NET API",
  description:
    "A unified API platform providing authentication, rate limiting, billing, SDKs, and developer tools for building on the SP NET ecosystem.",
  category: "DeveloperApplication",
});

export default function SPNetApiPage() {
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
