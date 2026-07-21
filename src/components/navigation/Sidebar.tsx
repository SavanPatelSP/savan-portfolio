"use client";

import Link from "next/link";
import { SidebarSection } from "./SidebarSection";
import type { NavigationConfig } from "@/data/navigation/types";

export function Sidebar({
  navigation,
  basePath,
  onClose,
}: {
  navigation: NavigationConfig;
  basePath: string;
  onClose?: () => void;
}) {
  return (
    <nav className="space-y-1" aria-label={`${navigation.title} navigation`}>
      {navigation.sections.map((section) => (
        <SidebarSection
          key={section.slug}
          section={section}
          basePath={basePath}
          onClose={onClose}
        />
      ))}
      {navigation.footerLinks && navigation.footerLinks.length > 0 && (
        <div className="pt-4 mt-4 border-t border-white/[0.06] space-y-0.5">
          {navigation.footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 text-[13px] text-white/30 hover:text-white/50 rounded-lg hover:bg-white/[0.02] transition-all duration-200 min-h-[32px]"
            >
              {link.icon && <link.icon className="h-3.5 w-3.5" />}
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
