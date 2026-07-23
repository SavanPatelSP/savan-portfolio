

import type { NavigationConfig } from "./types";

export const documentationNavigation: NavigationConfig = {
  title: "Documentation",
  sections: [
    {
      title: "Getting Started",
      slug: "getting-started",
      items: [
        { title: "Introduction", slug: "getting-started/introduction", description: "What the Portfolio App is and why it exists" },
        { title: "Quick Start", slug: "getting-started/quick-start", description: "Get up and running in under a minute" },
        { title: "Navigation", slug: "getting-started/navigation", description: "How to move through the application" },
      ],
    },
    {
      title: "Installation",
      slug: "installation",
      items: [
        { title: "Overview", slug: "installation/overview", description: "Installation methods and requirements" },
        { title: "Web", slug: "installation/web", description: "Using the app directly in your browser" },
        { title: "PWA", slug: "installation/pwa", description: "Progressive Web App installation" },
        { title: "Android", slug: "installation/android", description: "Install on Android devices" },
        { title: "iOS", slug: "installation/ios", description: "Install on iPhone and iPad" },
      ],
    },
    {
      title: "Application",
      slug: "application",
      items: [
        { title: "Dashboard", slug: "application/dashboard", description: "Project metrics and activity overview" },
        { title: "Projects", slug: "application/projects", description: "Engineering portfolio and project tracking" },
        { title: "Downloads", slug: "application/downloads", description: "Installing software and managing versions" },
        { title: "Documentation", slug: "application/documentation", description: "Knowledge base and guides" },
        { title: "Settings", slug: "application/settings", description: "Application preferences and configuration" },
        { title: "Search", slug: "application/search", description: "Finding content across the portfolio" },
      ],
    },
    {
      title: "Features",
      slug: "features",
      items: [
        { title: "Offline Experience", slug: "features/offline", description: "Caching, service workers, and offline access" },
        { title: "Updates", slug: "features/updates", description: "How automatic updates work" },
        { title: "Responsive Design", slug: "features/responsive", description: "Adapting to every screen size" },
        { title: "Accessibility", slug: "features/accessibility", description: "Inclusive design and WCAG compliance" },
        { title: "Performance", slug: "features/performance", description: "Optimization strategies and Core Web Vitals" },
        { title: "Privacy & Security", slug: "features/privacy", description: "Data handling and security practices" },
      ],
    },
    {
      title: "Architecture",
      slug: "architecture",
      items: [
        { title: "Technology Stack", slug: "architecture/technology-stack", description: "Next.js, React, TypeScript, Tailwind, and more" },
        { title: "Project Structure", slug: "architecture/project-structure", description: "Folder organization and file conventions" },
        { title: "Routing", slug: "architecture/routing", description: "App Router and file-based routing" },
        { title: "Service Worker", slug: "architecture/service-worker", description: "Offline caching and update strategies" },
        { title: "SEO & Metadata", slug: "architecture/seo", description: "Search optimization and structured data" },
        { title: "Build & Deployment", slug: "architecture/build-deploy", description: "Build process and Vercel deployment" },
      ],
    },
    {
      title: "Developer Guide",
      slug: "developer",
      items: [
        { title: "Project Setup", slug: "developer/project-setup", description: "Local development environment" },
        { title: "Component Architecture", slug: "developer/component-architecture", description: "UI component patterns and conventions" },
        { title: "Coding Standards", slug: "developer/coding-standards", description: "Style guide and best practices" },
        { title: "Contributing", slug: "developer/contributing", description: "How to contribute to the project" },
      ],
    },
    {
      title: "Reference",
      slug: "reference",
      items: [
        { title: "FAQ", slug: "reference/faq", description: "Frequently asked questions" },
        { title: "Troubleshooting", slug: "reference/troubleshooting", description: "Common issues and solutions" },
        { title: "Changelog", slug: "reference/changelog", description: "Version history and release notes" },
        { title: "Platform Support", slug: "reference/platform-support", description: "Browser and OS compatibility" },
      ],
    },
  ],
};
