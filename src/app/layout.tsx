import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SplashWrapper } from "@/components/ui/SplashWrapper";
import { Cursor } from "@/components/ui/Cursor";
import { CookieConsent } from "@/components/ui/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Savan Patel — Founder & Product Engineer at SP NET INC",
  description:
    "Founder & Product Engineer building SP NET GRAM, SP NET ADMIN OS, and SP NET AI. Crafting products that connect people, empower communities, and shape the future of technology.",
  keywords: [
    "Savan Patel",
    "SP NET INC",
    "Product Engineer",
    "Founder",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Design",
    "SP NET GRAM",
    "SP NET ADMIN OS",
    "SP NET AI",
    "Full Stack",
    "Entrepreneur",
  ],
  authors: [{ name: "Savan Patel", url: "https://spnetinc.com" }],
  creator: "Savan Patel",
  publisher: "SP NET INC",
  openGraph: {
    title: "Savan Patel — Founder & Product Engineer at SP NET INC",
    description:
      "Building SP NET GRAM, SP NET ADMIN OS, and SP NET AI. Products that connect people, empower communities, and shape the future of technology.",
    type: "website",
    locale: "en_US",
    siteName: "SP NET INC",
    url: "https://spnetinc.com",
    images: [{ url: "/og?section=default", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savan Patel — Founder & Product Engineer at SP NET INC",
    description:
      "Building SP NET GRAM, SP NET ADMIN OS, and SP NET AI. Products that connect people, empower communities, and shape the future of technology.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=default", width: 1200, height: 630 }],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://spnetinc.com"),
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Savan Patel",
  givenName: "Savan",
  familyName: "Patel",
  jobTitle: "Founder & Product Engineer",
  affiliation: {
    "@type": "Organization",
    name: "SP NET INC",
    description: "Building the infrastructure for modern communication, enterprise administration, and intelligent automation.",
  },
  knowsAbout: ["Software Engineering", "Product Design", "Full Stack Development", "AI", "System Architecture"],
  url: "https://spnetinc.com",
  sameAs: [
    "https://github.com/savanpatel",
    "https://x.com/savanpatel",
    "https://linkedin.com/in/savanpatel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="theme-color" content="#0a0a0a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-black text-white antialiased lg-cursor-none">
        <Cursor />
        <SplashWrapper />
        <NoiseOverlay />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
