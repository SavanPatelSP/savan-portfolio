import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Newsroom — Coming Soon",
  description:
    "Stay tuned for the latest news, product launches, and company milestones from SP NET INC.",
  openGraph: {
    title: "Newsroom — Coming Soon",
    description:
      "Stay tuned for the latest news, product launches, and company milestones from SP NET INC.",
    url: "https://savan.sp-net.in/company/newsroom",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsroom — Coming Soon",
    description:
      "Stay tuned for the latest news, product launches, and company milestones from SP NET INC.",
  },
  alternates: {
    canonical: "/company/newsroom",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Newsroom",
  url: "https://savan.sp-net.in/company/newsroom",
};

export default function Page() {
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
