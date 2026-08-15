"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface SplashState {
  ready: boolean;
  dismissing: boolean;
  markReady: () => void;
}

const SplashContext = createContext<SplashState | null>(null);

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  const markReady = useCallback(() => {
    setDismissing(true);
    setTimeout(() => {
      setReady(true);
      document.documentElement.removeAttribute("data-loading");
    }, 800);
  }, []);

  // Route change detection
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <SplashContext.Provider value={{ ready, dismissing, markReady }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) throw new Error("useSplash must be used within SplashProvider");
  return ctx;
}
