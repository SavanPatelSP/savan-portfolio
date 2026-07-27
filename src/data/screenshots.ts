export interface ScreenshotEntry {
  id: string;
  title: string;
  description: string;
  feature: string;
  device: "desktop" | "laptop" | "tablet" | "phone" | "landscape";
  src: string;
}

export const screenshots: ScreenshotEntry[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Your project overview at a glance",
    feature: "Real-Time Dashboard",
    device: "desktop",
    src: "/screenshots/portfolio-app/desktop/dashboard.png",
  },
  {
    id: "products",
    title: "Products",
    description: "Full product ecosystem — SP NET GRAM, ADMIN OS, AI Engine, and platform infrastructure",
    feature: "Product Ecosystem",
    device: "desktop",
    src: "/screenshots/portfolio-app/desktop/products.png",
  },
  {
    id: "downloads",
    title: "Installations",
    description: "Download and install across your devices",
    feature: "Software Distribution",
    device: "desktop",
    src: "/screenshots/portfolio-app/desktop/downloads.png",
  },
  {
    id: "documentation",
    title: "Documentation",
    description: "Structured knowledge base with code samples, installation guides, and API references",
    feature: "Knowledge Base",
    device: "desktop",
    src: "/screenshots/portfolio-app/desktop/documentation.png",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Engineering portfolio with progress tracking, tech stacks, and deployment status",
    feature: "Project Management",
    device: "desktop",
    src: "/screenshots/portfolio-app/desktop/projects.png",
  },
  {
    id: "offline",
    title: "Offline Mode",
    description: "Your content, available even offline",
    feature: "Offline Experience",
    device: "laptop",
    src: "/screenshots/portfolio-app/laptop/offline.png",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Application preferences — appearance, notifications, security, and keyboard shortcuts",
    feature: "Preferences",
    device: "desktop",
    src: "/screenshots/portfolio-app/desktop/settings.png",
  },
];

export const deviceConfigs = {
  desktop: {
    label: "Desktop",
    width: 960,
    height: 600,
    bezel: "none",
    hasTrafficLights: true,
    os: "macOS",
  },
  laptop: {
    label: "Laptop",
    width: 800,
    height: 520,
    bezel: "laptop",
    hasTrafficLights: true,
    os: "macOS",
  },
  tablet: {
    label: "Tablet",
    width: 380,
    height: 520,
    bezel: "tablet",
    hasTrafficLights: false,
    os: "iPadOS",
  },
  phone: {
    label: "Phone",
    width: 280,
    height: 580,
    bezel: "phone",
    hasTrafficLights: false,
    os: "iOS",
  },
  landscape: {
    label: "Landscape",
    width: 580,
    height: 340,
    bezel: "phone",
    hasTrafficLights: false,
    os: "Android",
  },
} as const;
