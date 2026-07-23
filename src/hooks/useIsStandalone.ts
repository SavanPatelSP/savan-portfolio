import { useSyncExternalStore } from "react";
import { isStandalone } from "@/lib/pwa";

export function useIsStandalone(): boolean {
  return useSyncExternalStore(
    () => () => {},
    isStandalone,
    () => false,
  );
}
