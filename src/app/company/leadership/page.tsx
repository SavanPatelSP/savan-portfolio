import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Leadership — Guiding the Vision Forward",
  description:
    "Meet the leadership behind SP NET INC — Savan Patel, Founder & Product Engineer, driving the vision for modern communication and enterprise technology.",
  openGraph: {
    title: "Leadership — Guiding the Vision Forward",
    description:
      "Meet the leadership behind SP NET INC — driving the vision for modern communication and enterprise technology.",
    url: "https://savan.sp-net.in/company/leadership",
    type: "website",
    siteName: "SP NET INC",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leadership — Guiding the Vision Forward",
    description:
      "Meet the leadership behind SP NET INC — driving the vision for modern communication and enterprise technology.",
  },
  alternates: {
    canonical: "/company/leadership",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SP NET INC",
  url: "https://sp-net.in",
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
