"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

function isModifiedEvent(e: MouseEvent) {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
}

/**
 * Intercepts clicks on internal `<a>` tags that are not Next `<Link>`
 * components and performs them as client-side navigations instead of full
 * page loads. This lets the route-aware splash trigger for every internal
 * navigation (header, footer, cards, mobile nav, etc.) while preserving the
 * native browser behavior for external links, downloads, hash-only links,
 * and modified clicks (open in new tab, etc.).
 */
export function ClientNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (isModifiedEvent(e)) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;
      if (href.startsWith("//")) return;
      if (/^[a-z]+:/i.test(href)) return;
      if (href.startsWith("#")) return;
      if (!href.startsWith("/")) return;

      // Same-page fragment link — let the browser scroll natively.
      const [path, hash] = href.split("#");
      if (hash && path === pathname) return;

      e.preventDefault();
      router.push(href);
    };

    // Capture phase so the interceptor fires even when a descendant handler
    // (e.g. the mobile-nav overlay's stopPropagation) would otherwise block
    // bubbling to this document-level listener. Next `<Link>` safely skips its
    // own navigation when the event is already defaultPrevented.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, pathname]);

  return null;
}
