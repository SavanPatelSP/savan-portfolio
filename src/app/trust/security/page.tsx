import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Security — My Engineering Approach to Security",
  description:
    "How I think about security as a developer. Secure coding practices, responsible disclosure, and building with a security-first mindset.",
  openGraph: {
    title: "Security — My Engineering Approach to Security",
    description:
      "How I think about security as a developer. Secure coding practices and a security-first mindset.",
    url: "https://savan.sp-net.in/trust/security",
    type: "website",
    siteName: "Savan Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Security — My Engineering Approach to Security",
    description:
      "How I think about security as a developer. Secure coding practices and a security-first mindset.",
  },
  alternates: {
    canonical: "/trust/security",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Security",
  url: "https://savan.sp-net.in/trust/security",
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
