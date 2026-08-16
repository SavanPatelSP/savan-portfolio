import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { SplashProvider } from "@/lib/splash";
import { Cursor } from "@/components/ui/Cursor";
import { InstallPrompt } from "@/components/ui/InstallPrompt";
import { InstallModal } from "@/components/portfolio-app/InstallModal";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ClientNavigation } from "@/components/ClientNavigation";
import { PageTransition } from "@/components/ui/PageTransition";
import { personal } from "@/data/personal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "Y-qUzkMGzr9qMKHhBrBj3epLnjiFh00Mxsc80fzVh4k",
  },

  title: {
    default: "Savan Patel — Founder & Product Engineer at SP NET INC",
    template: "%s | Savan Patel",
  },
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
    "Portfolio",
  ],
  authors: [{ name: "Savan Patel", url: "https://savan.sp-net.in" }],
  creator: "Savan Patel",
  publisher: "SP NET INC",
  openGraph: {
    title: "Savan Patel — Founder & Product Engineer at SP NET INC",
    description:
      "Building SP NET GRAM, SP NET ADMIN OS, and SP NET AI. Products that connect people, empower communities, and shape the future of technology.",
    type: "website",
    locale: "en_US",
    siteName: "SP NET INC",
    url: "https://savan.sp-net.in",
    images: [{ url: "/og?section=default", width: 1200, height: 630, alt: "Savan Patel — Founder & Product Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Savan Patel — Founder & Product Engineer at SP NET INC",
    description:
      "Building SP NET GRAM, SP NET ADMIN OS, and SP NET AI. Products that connect people, empower communities, and shape the future of technology.",
    creator: "@savanpatel",
    images: [{ url: "/og?section=default", width: 1200, height: 630, alt: "Savan Patel — Founder & Product Engineer" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://savan.sp-net.in"),
  alternates: {
    canonical: "/",
  },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  appleWebApp: {
    capable: true,
    title: "Savan Patel",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Savan Patel",
      givenName: "Savan",
      familyName: "Patel",
      jobTitle: "Founder & Product Engineer",
      description: personal.description,
      email: personal.email,
      image: "https://savan.sp-net.in/logo.jpg",
      url: "https://savan.sp-net.in",
      sameAs: [
        personal.social.github,
        personal.social.x,
        personal.social.linkedin,
        personal.social.telegram,
        personal.social.instagram,
      ],
      knowsAbout: ["Software Engineering", "Product Design", "Full Stack Development", "AI", "System Architecture"],
      affiliation: {
        "@type": "Organization",
        name: "SP NET INC",
        url: "https://sp-net.in",
        description: "Building the infrastructure for modern communication, enterprise administration, and intelligent automation.",
      },
      nationality: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Organization",
      name: "SP NET INC",
      alternateName: "SP NET",
      url: "https://sp-net.in",
      logo: "https://savan.sp-net.in/android-chrome-512x512.png",
      description: personal.description,
      founder: { "@type": "Person", name: "Savan Patel" },
      email: personal.email,
      sameAs: [
        personal.social.github,
        personal.social.x,
        personal.social.linkedin,
        personal.social.telegram,
        personal.social.instagram,
      ],
    },
    {
      "@type": "WebSite",
      name: "Savan Patel — Portfolio",
      alternateName: "SP NET INC",
      url: "https://savan.sp-net.in",
      description: personal.description,
      author: { "@type": "Person", name: "Savan Patel" },
    },
    {
      "@type": "WebPage",
      name: "Savan Patel — Founder & Product Engineer at SP NET INC",
      description: personal.description,
      url: "https://savan.sp-net.in",
      isPartOf: { "@type": "WebSite", url: "https://savan.sp-net.in" },
      breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://savan.sp-net.in" }] },
    },
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
      data-loading=""
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" as="image" href="/sp-net-inc-splash-icon.png" fetchPriority="high" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <style>{`
          [data-loading] #page-content {
            opacity: 0 !important;
            visibility: hidden !important;
          }
          #page-content {
            transition: opacity 0.6s ease;
          }
          #splash-screen {
            position: fixed !important;
            inset: 0 !important;
            z-index: 9999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            flex-direction: column !important;
            background: #0a0a0a !important;
          }
          @media (prefers-reduced-motion: reduce) {
            [data-loading] { transition: none !important; }
            #page-content { transition: none !important; }
          }
        `}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-black text-white antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <SplashProvider>
            <Cursor />
            <SplashScreen />
            <NoiseOverlay />
            <ScrollProgress />
            <div id="page-content">
              <Header />
              <ScrollToHash />
              <ClientNavigation />
              <main id="main-content" tabIndex={-1}><PageTransition>{children}</PageTransition></main>
              <Footer />
            </div>
            <InstallPrompt />
            <InstallModal />
            <CookieConsent />
          </SplashProvider>
        <Script
          id="sw-register"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(e){if(window.location.hostname==='localhost')console.error('SW registration failed:',e)})})}`,
          }}
        />
        </MotionConfig>
      </body>
    </html>
  );
}
