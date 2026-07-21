import {
  LayoutDashboard,
  Download,
  Wifi,
  Smartphone,
  HelpCircle,
  Shield,
  FileText,
} from "lucide-react";
import type { NavigationConfig } from "./types";

export const portfolioNavigation: NavigationConfig = {
  title: "Portfolio App",
  sections: [
    {
      title: "Portfolio App",
      slug: "portfolio-app",
      items: [
        { title: "Overview", slug: "overview", description: "What the Portfolio App is" },
        { title: "Installation", slug: "install", description: "Step-by-step install guides" },
        { title: "Screenshots", slug: "screenshots", description: "App screenshots and previews" },
        { title: "Offline Experience", slug: "offline", description: "How caching and offline access work" },
        { title: "Platform Support", slug: "platform-support", description: "Browser and OS compatibility" },
      ],
    },
    {
      title: "Documentation",
      slug: "documentation",
      items: [
        { title: "Introduction", slug: "docs/introduction", description: "Overview of the Portfolio App" },
        { title: "Quick Start", slug: "docs/quick-start", description: "Get started in under a minute" },
        { title: "Installation", slug: "docs/installation", description: "Platform-specific install guides" },
        { title: "Application", slug: "docs/application", description: "App features and sections" },
        { title: "Features", slug: "docs/features", description: "Offline, updates, responsive, and more" },
        { title: "Architecture", slug: "docs/architecture", description: "Technology stack and project structure" },
        { title: "Developer Guide", slug: "docs/developer", description: "Setup, patterns, and standards" },
        { title: "Reference", slug: "docs/reference", description: "FAQ, troubleshooting, and changelog" },
      ],
    },
    {
      title: "Support",
      slug: "support",
      items: [
        { title: "FAQ", slug: "faq", description: "Frequently asked questions" },
        { title: "Troubleshooting", slug: "troubleshooting", description: "Common issues and solutions" },
        { title: "Release Notes", slug: "release-notes", description: "Changelog and version history" },
        { title: "Privacy", slug: "privacy", description: "What data is and is not collected" },
      ],
    },
    {
      title: "Resources",
      slug: "resources",
      items: [
        { title: "Downloads", slug: "downloads", description: "Download the Portfolio App" },
        { title: "All Downloads", slug: "downloads/all", description: "Browse all available downloads" },
      ],
    },
  ],
  footerLinks: [
    { label: "Install App", href: "/downloads/portfolio-app", icon: Download },
  ],
};
