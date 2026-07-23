import {
  Download,
} from "lucide-react";
import type { NavigationConfig } from "./types";

export const portfolioNavigation: NavigationConfig = {
  title: "Portfolio App",
  sections: [
    {
      title: "Portfolio App",
      slug: "portfolio-app",
      items: [
        { title: "Overview", slug: "overview", href: "/portfolio-app", description: "What the Portfolio App is" },
        { title: "Installation", slug: "install", description: "Step-by-step install guides" },
        { title: "Platform Support", slug: "platform-support", description: "Browser and OS compatibility" },
        { title: "Offline Experience", slug: "offline", description: "How caching and offline access work" },
      ],
    },
    {
      title: "Documentation",
      slug: "documentation",
      items: [
        { title: "Introduction", slug: "getting-started/introduction", href: "/docs/getting-started/introduction", description: "Overview of the Portfolio App" },
        { title: "Quick Start", slug: "getting-started/quick-start", href: "/docs/getting-started/quick-start", description: "Get started in under a minute" },
        { title: "Installation Guide", slug: "installation/overview", href: "/docs/installation/overview", description: "Platform-specific install guides" },
        { title: "Features", slug: "features/offline", href: "/docs/features/offline", description: "Offline, updates, responsive, and more" },
        { title: "Architecture", slug: "architecture/technology-stack", href: "/docs/architecture/technology-stack", description: "Technology stack and project structure" },
        { title: "Developer Guide", slug: "developer/project-setup", href: "/docs/developer/project-setup", description: "Setup, patterns, and standards" },
        { title: "Reference", slug: "reference/faq", href: "/docs/reference/faq", description: "FAQ, troubleshooting, and changelog" },
      ],
    },
    {
      title: "Support",
      slug: "support",
      items: [
        { title: "FAQ", slug: "faq", description: "Frequently asked questions" },
        { title: "Release Notes", slug: "release-notes", description: "Changelog and version history" },
        { title: "Privacy", slug: "privacy", description: "What data is and is not collected" },
      ],
    },
    {
      title: "Downloads",
      slug: "downloads",
      items: [
        { title: "Download App", slug: "downloads/portfolio-app", href: "/downloads/portfolio-app", description: "Download the Portfolio App" },
      ],
    },
  ],
  footerLinks: [
    { label: "Install App", href: "/downloads/portfolio-app", icon: Download },
  ],
};
