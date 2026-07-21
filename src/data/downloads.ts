export const DOWNLOAD_PLATFORMS = [
  {
    id: "windows",
    name: "Windows",
    icon: "Monitor",
    support: "full" as const,
    method: "PWA Install",
    browsers: ["Chrome 67+", "Edge 79+", "Opera 54+"],
    requirements: "Windows 10 or later",
  },
  {
    id: "macos",
    name: "macOS",
    icon: "Monitor",
    support: "full" as const,
    method: "PWA Install",
    browsers: ["Safari 14.1+", "Chrome 67+", "Edge 79+"],
    requirements: "macOS 11 Big Sur or later",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "Terminal",
    support: "full" as const,
    method: "PWA Install",
    browsers: ["Chrome 67+", "Edge 79+"],
    requirements: "Any modern Linux distribution",
  },
  {
    id: "android",
    name: "Android",
    icon: "Smartphone",
    support: "full" as const,
    method: "PWA Install",
    browsers: ["Chrome 67+", "Samsung Internet 14+", "Edge 79+"],
    requirements: "Android 5.0 or later",
  },
  {
    id: "ios",
    name: "iOS",
    icon: "Smartphone",
    support: "guided" as const,
    method: "Manual Install",
    browsers: ["Safari 14.1+ (iOS 15+)"],
    requirements: "iOS 15 or later",
  },
  {
    id: "ipados",
    name: "iPadOS",
    icon: "Tablet",
    support: "guided" as const,
    method: "Manual Install",
    browsers: ["Safari 14.1+ (iPadOS 15+)"],
    requirements: "iPadOS 15 or later",
  },
  {
    id: "chromeos",
    name: "ChromeOS",
    icon: "Globe",
    support: "full" as const,
    method: "PWA Install",
    browsers: ["Chrome 67+"],
    requirements: "ChromeOS with Chrome 67+",
  },
  {
    id: "browser",
    name: "Browser",
    icon: "Globe",
    support: "full" as const,
    method: "Direct Access",
    browsers: ["Chrome 67+", "Edge 79+", "Safari 14.1+"],
    requirements: "Any modern browser",
  },
] as const;

export type DownloadPlatform = (typeof DOWNLOAD_PLATFORMS)[number];

export interface DownloadProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "available" | "building" | "future";
  releaseChannel: "stable" | "beta" | "alpha" | "unreleased";
  version: string;
  buildNumber: string;
  releaseDate: string;
  lastUpdated: string;
  architecture: string;
  license: string;
  fileSize: string;
  checksum: string;
  color: string;
  gradient: string;
  platforms: string[];
  minimumRequirements: string;
  recommendedRequirements: string;
  screenshots: { label: string; description: string }[];
  features: { title: string; description: string }[];
  documentationUrl: string;
  downloadUrl: string;
}

export const downloadProducts: DownloadProduct[] = [
  {
    id: "portfolio-app",
    slug: "portfolio-app",
    name: "Portfolio App",
    tagline: "The flagship installable web application by SP NET INC",
    description:
      "A Progressive Web App that transforms the portfolio into a native-like application with offline access, automatic updates, and a distraction-free experience.",
    status: "available",
    releaseChannel: "stable",
    version: "1.0.0",
    buildNumber: "2026.07.17",
    releaseDate: "2026",
    lastUpdated: "2026",
    architecture: "Web (PWA)",
    license: "Free",
    fileSize: "5\u201315 MB",
    checksum: "sha256:a1b2c3d4e5f6\u2026placeholder",
    color: "#f59e0b",
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    platforms: ["windows", "macos", "linux", "android", "ios", "ipados", "chromeos", "browser"],
    minimumRequirements:
      "A supported modern browser (Chrome 67+, Edge 79+, or Safari 14.1+) with an internet connection for initial setup.",
    recommendedRequirements:
      "Chrome or Edge latest version on desktop. Chrome on Android. Safari on iOS 15+.",
    screenshots: [
      { label: "Dashboard", description: "Real-time project metrics, activity feed, and quick actions" },
      { label: "Products", description: "Full product ecosystem — SP NET GRAM, ADMIN OS, AI Engine" },
      { label: "Installations", description: "Secure software installation with platform selection and integrity verification" },
      { label: "Documentation", description: "Structured knowledge base with code samples and installation guides" },
      { label: "Projects", description: "Engineering portfolio with progress tracking and deployment status" },
      { label: "Offline Mode", description: "Cached content management with sync status and storage metrics" },
    ],
    features: [
      { title: "Native Experience", description: "Runs in its own standalone window without browser chrome." },
      { title: "Offline Access", description: "Previously viewed pages remain available without internet." },
      { title: "Automatic Updates", description: "Always stays current with the latest content." },
      { title: "Instant Launch", description: "Opens directly from your desktop or home screen." },
      { title: "Privacy First", description: "No analytics, no tracking, no data collection." },
      { title: "Cross-Platform", description: "Consistent experience on every device." },
    ],
    documentationUrl: "/portfolio-app",
    downloadUrl: "/downloads/portfolio-app",
  },
];

export interface FutureDownloadProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  status: "building" | "future" | "research";
  eta: string;
  color: string;
  gradient: string;
}

export const futureDownloadProducts: FutureDownloadProduct[] = [
  {
    id: "sp-net-gram",
    slug: "sp-net-gram",
    name: "SP NET GRAM",
    tagline: "Messaging reimagined for the modern world",
    status: "building",
    eta: "Coming Soon",
    color: "#3b82f6",
    gradient: "from-blue-500 via-cyan-400 to-teal-300",
  },
  {
    id: "sp-net-admin-os",
    slug: "sp-net-admin-os",
    name: "SP NET ADMIN OS",
    tagline: "Enterprise administration, redesigned",
    status: "building",
    eta: "Coming Soon",
    color: "#8b5cf6",
    gradient: "from-violet-500 via-purple-400 to-fuchsia-300",
  },
  {
    id: "sp-net-ai",
    slug: "sp-net-ai",
    name: "SP NET AI",
    tagline: "Intelligence for the SP NET ecosystem",
    status: "building",
    eta: "Coming Soon",
    color: "#10b981",
    gradient: "from-emerald-500 via-green-400 to-teal-300",
  },
];

export interface DownloadIntegrityItem {
  label: string;
  value: string;
  icon: string;
}

export const downloadIntegrity: DownloadIntegrityItem[] = [
  { label: "Official Build", value: "Verified by SP NET INC", icon: "ShieldCheck" },
  { label: "Developed by", value: "SP NET INC", icon: "Building2" },
  { label: "Secure Distribution", value: "HTTPS only", icon: "Lock" },
  { label: "SHA-256 Checksum", value: "sha256:a1b2c3\u2026", icon: "Fingerprint" },
  { label: "Release Channel", value: "Stable", icon: "Radio" },
  { label: "Version Signature", value: "v1.0.0", icon: "Tag" },
  { label: "Build Number", value: "2026.07.17", icon: "Hash" },
  { label: "License", value: "Free", icon: "FileText" },
];

export const downloadCategories = [
  { id: "all", label: "All Products" },
  { id: "available", label: "Available" },
  { id: "coming-soon", label: "Coming Soon" },
] as const;
