"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion as useReducedMotionFramer } from "framer-motion";

function subscribe() {
  return () => {};
}

/**
 * SSR-safe wrapper around Framer Motion's useReducedMotion.
 *
 * Framer Motion's hook returns `null` during SSR and the real preference on
 * the client. That difference causes components to branch between `<motion.*>`
 * and a plain element during hydration, producing React hydration mismatches.
 *
 * This hook returns `false` during SSR and the initial hydration pass, then
 * switches to the user's real preference after mount. Components therefore
 * render identical HTML on server and client, and only adapt post-hydration.
 */
export function useReducedMotion(): boolean {
  const prefersReduced = useReducedMotionFramer();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  return mounted ? !!prefersReduced : false;
}
