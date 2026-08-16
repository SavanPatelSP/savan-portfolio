"use client";

import { createContext, useContext, useState, useCallback, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface SplashState {
  ready: boolean;
  visible: boolean;
  isInitial: boolean;
  markReady: () => void;
  finish: () => void;
}

const SplashContext = createContext<SplashState | null>(null);

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isInitial, setIsInitial] = useState(true);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Restart the splash for a new route: hide content, remount the splash overlay.
  const startLoading = useCallback(() => {
    setReady(false);
    setVisible(true);
    document.documentElement.setAttribute("data-loading", "");
  }, []);

  // Called by SplashScreen once the display timer elapses — begins the exit animation.
  const markReady = useCallback(() => {
    setVisible(false);
  }, []);

  // Called by SplashScreen when the exit animation completes — reveal the page content.
  const finish = useCallback(() => {
    setReady(true);
    document.documentElement.removeAttribute("data-loading");
  }, []);

  // Route change detection — trigger a fresh splash on every client-side navigation.
  // useLayoutEffect (not useEffect) so data-loading is applied before the browser
  // paints the incoming route, preventing a content flash between navigations.
  useLayoutEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setIsInitial(false);
      startLoading();
    }
  }, [pathname, startLoading]);

  return (
    <SplashContext.Provider value={{ ready, visible, isInitial, markReady, finish }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) throw new Error("useSplash must be used within SplashProvider");
  return ctx;
}
