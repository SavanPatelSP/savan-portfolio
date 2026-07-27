import type { NavigationConfig } from "./navigation/types";
import { APP_CONFIG } from "@/config/app";

export interface DocSection {
  title: string;
  slug: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  slug: string;
  description?: string;
}

export const docsNavigation: DocSection[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      { title: "Introduction", slug: "introduction", description: "What the Portfolio App is and why it exists" },
      { title: "Quick Start", slug: "quick-start", description: "Get up and running in under a minute" },
      { title: "Navigation", slug: "navigation", description: "How to move through the application" },
    ],
  },
  {
    title: "Installation",
    slug: "installation",
    items: [
      { title: "Overview", slug: "overview", description: "Installation methods and requirements" },
      { title: "Web", slug: "web", description: "Using the app directly in your browser" },
      { title: "PWA", slug: "pwa", description: "Progressive Web App installation" },
      { title: "Android", slug: "android", description: "Install on Android devices" },
      { title: "iOS", slug: "ios", description: "Install on iPhone and iPad" },
    ],
  },
  {
    title: "Application",
    slug: "application",
    items: [
      { title: "Dashboard", slug: "dashboard", description: "Project metrics and activity overview" },
      { title: "Projects", slug: "projects", description: "Engineering portfolio and project tracking" },
      { title: "Downloads", slug: "downloads", description: "Installing software and managing versions" },
      { title: "Documentation", slug: "documentation", description: "Knowledge base and guides" },
      { title: "Settings", slug: "settings", description: "Application preferences and configuration" },
      { title: "Search", slug: "search", description: "Finding content across the portfolio" },
    ],
  },
  {
    title: "Features",
    slug: "features",
    items: [
      { title: "Offline Experience", slug: "offline", description: "How the app works without internet" },
      { title: "Updates", slug: "updates", description: "Latest improvements and changes" },
      { title: "Responsive Design", slug: "responsive", description: "Adapting to every screen size" },
      { title: "Accessibility", slug: "accessibility", description: "Inclusive design and WCAG compliance" },
      { title: "Performance", slug: "performance", description: "How fast the app loads and runs" },
      { title: "Privacy & Security", slug: "privacy", description: "Your data stays yours" },
    ],
  },
  {
    title: "Architecture",
    slug: "architecture",
    items: [
      { title: "Technology Stack", slug: "technology-stack", description: "Modern web technologies" },
      { title: "Project Structure", slug: "project-structure", description: "How the site is organized" },
      { title: "Routing", slug: "routing", description: "How pages connect" },
      { title: "Service Worker", slug: "service-worker", description: "Works when you need it" },
      { title: "SEO & Metadata", slug: "seo", description: "How the site gets found" },
      { title: "Build & Deployment", slug: "build-deploy", description: "Built for speed and reliability" },
    ],
  },
  {
    title: "Developer Guide",
    slug: "developer",
    items: [
      { title: "Project Setup", slug: "project-setup", description: "Welcome" },
      { title: "Component Architecture", slug: "component-architecture", description: "How the interface is crafted" },
      { title: "Coding Standards", slug: "coding-standards", description: "Standards that guide the work" },
      { title: "Contributing", slug: "contributing", description: "Ways to get involved" },
    ],
  },
  {
    title: "Reference",
    slug: "reference",
    items: [
      { title: "FAQ", slug: "faq", description: "Frequently asked questions" },
      { title: "Troubleshooting", slug: "troubleshooting", description: "Common issues and solutions" },
      { title: "Changelog", slug: "changelog", description: "Version history and release notes" },
      { title: "Platform Support", slug: "platform-support", description: "Browser and OS compatibility" },
    ],
  },
];

export const documentationNavigation: NavigationConfig = {
  title: "Documentation",
  sections: docsNavigation.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      slug: `${section.slug}/${item.slug}`,
    })),
  })),
};

export function findDocItem(slug: string): { section: DocSection; item: DocItem } | null {
  for (const section of docsNavigation) {
    for (const item of section.items) {
      if (item.slug === slug) return { section, item };
    }
  }
  return null;
}

export function getAdjacentDocs(slug: string): { prev: DocItem | null; next: DocItem | null; section: DocSection | null } {
  const allItems = docsNavigation.flatMap((s) => s.items);
  const idx = allItems.findIndex((i) => i.slug === slug);
  const found = findDocItem(slug);
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
    section: found?.section || null,
  };
}

export const APP_VERSION = APP_CONFIG.version;
export const LAST_UPDATED = "July 2026";
