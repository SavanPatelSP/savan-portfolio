import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  slug: string;
  /** Absolute path override — used when the target route differs from basePath/slug. */
  href?: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  items?: NavigationItem[];
}

export interface NavigationSection {
  title: string;
  slug: string;
  items: NavigationItem[];
}

export interface NavigationFooterLink {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface NavigationConfig {
  title: string;
  sections: NavigationSection[];
  footerLinks?: NavigationFooterLink[];
}
