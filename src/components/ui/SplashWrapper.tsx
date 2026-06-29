"use client";

import dynamic from "next/dynamic";

const SplashScreen = dynamic(() => import("@/components/ui/SplashScreen").then((m) => ({ default: m.SplashScreen })), {
  ssr: false,
});

export function SplashWrapper() {
  return <SplashScreen />;
}
