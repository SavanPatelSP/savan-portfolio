import ClientPage from "./ClientPage";
import { generateProductMetadata } from "@/lib/seo";

export const metadata = generateProductMetadata({
  slug: "sp-net-ecosystem",
  title: "SP NET Ecosystem — Coming Soon",
  description:
    "A unified ecosystem connecting messaging, administration, and intelligence. Currently in active research and development.",
  ogDescription:
    "A unified ecosystem connecting messaging, administration, and intelligence. Currently in active research and development.",
  twitterDescription:
    "A unified ecosystem connecting messaging, administration, and intelligence. Currently in active research and development.",
  category: "SoftwareApplication",
  hasOgImage: false,
});

export default function Page() {
  return <ClientPage />;
}
