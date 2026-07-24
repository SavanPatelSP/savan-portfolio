"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Rocket,
  Navigation,
  Download,
  LayoutDashboard,
  Wifi,
  Zap,
  Code2,
  FolderTree,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { docsNavigation, APP_VERSION } from "@/data/documentation";
import { ease, NORMAL } from "@/lib/motion";

const sectionIcons: Record<string, React.ReactNode> = {
  "Getting Started": <Rocket className="h-5 w-5" />,
  Installation: <Download className="h-5 w-5" />,
  Application: <LayoutDashboard className="h-5 w-5" />,
  Features: <Zap className="h-5 w-5" />,
  Architecture: <Code2 className="h-5 w-5" />,
  "Developer Guide": <FolderTree className="h-5 w-5" />,
  Reference: <HelpCircle className="h-5 w-5" />,
};

const sectionDescriptions: Record<string, string> = {
  "Getting Started": "Everything you need to start using the Portfolio App, from installation to navigation.",
  Installation: "Platform-specific guides for installing the app on Web, Android, and iOS.",
  Application: "Explore the Dashboard, Projects, Downloads, Documentation, Settings, and Search features.",
  Features: "Deep dives into offline experience, updates, responsive design, accessibility, performance, and privacy.",
  Architecture: "Technology stack, project structure, routing, service workers, SEO, and deployment.",
  "Developer Guide": "Local setup, component patterns, coding standards, and contributing guidelines.",
  Reference: "FAQ, troubleshooting, changelog, and platform support information.",
};

const quickLinks = [
  { title: "Quick Start", href: "/docs/getting-started/quick-start", icon: Rocket, description: "Get up and running in under a minute" },
  { title: "Installation", href: "/docs/installation/overview", icon: Download, description: "Install on any platform" },
  { title: "Offline Mode", href: "/docs/features/offline", icon: Wifi, description: "Browse without internet" },
  { title: "Keyboard Shortcuts", href: "/docs/getting-started/navigation", icon: Navigation, description: "Navigate faster" },
  { title: "FAQ", href: "/docs/reference/faq", icon: HelpCircle, description: "Common questions answered" },
  { title: "Troubleshooting", href: "/docs/reference/troubleshooting", icon: AlertTriangle, description: "Resolve common issues" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: NORMAL, ease: ease.out } },
};

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: ease.out }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">
              v{APP_VERSION}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-[0.92] mb-4">
            Documentation
          </h1>
          <p className="text-[15px] sm:text-base text-white/30 leading-relaxed max-w-xl mx-auto">
            Everything you need to know about the Portfolio App — from first launch to
            advanced features.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-16"
        >
          {quickLinks.map((link) => (
            <motion.div key={link.title} variants={item}>
              <Link
                href={link.href}
                className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.06] transition-colors duration-200">
                  <link.icon className="h-4 w-4 text-white/30 group-hover:text-white/50 transition-colors duration-200" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-white/60 group-hover:text-white/80 transition-colors duration-200">
                    {link.title}
                  </p>
                  <p className="text-[11px] text-white/25 mt-0.5 truncate">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-white/15 ml-auto shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {docsNavigation.map((section) => (
            <motion.div key={section.slug} variants={item}>
              <div className="rounded-xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    {sectionIcons[section.title] || <BookOpen className="h-5 w-5 text-white/30" />}
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-white/70">{section.title}</h2>
                    <p className="text-[11px] text-white/25 mt-0.5">
                      {section.items.length} {section.items.length === 1 ? "article" : "articles"}
                    </p>
                  </div>
                </div>

                <p className="text-[13px] text-white/30 leading-relaxed mb-5">
                  {sectionDescriptions[section.title]}
                </p>

                <ul className="space-y-1">
                  {section.items.map((doc) => (
                    <li key={doc.slug}>
                      <Link
                        href={`/docs/${doc.slug}`}
                        className="group flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-white/[0.02] transition-colors duration-200"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors duration-200 shrink-0" />
                        <span className="text-[13px] text-white/30 group-hover:text-white/50 transition-colors duration-200">
                          {doc.title}
                        </span>
                        {doc.description && (
                          <span className="text-[11px] text-white/15 hidden sm:inline truncate ml-auto">
                            — {doc.description}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
