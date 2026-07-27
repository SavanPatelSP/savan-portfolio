"use client";

import { useSyncExternalStore } from "react";
import { isStandalone } from "@/lib/pwa";

export function useIsStandalone(): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(display-mode: standalone)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    isStandalone,
    () => false,
  );
}
