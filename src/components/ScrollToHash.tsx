"use client";

import { useEffect } from "react";

const SECTIONS = ["home", "products", "founder", "technologies", "organization", "journey", "roadmap", "contact"];

export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !SECTIONS.includes(hash)) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top > 80 || rect.bottom < 0) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
