"use client";

import { useCallback, useSyncExternalStore } from "react";

/* ─── Reading-list (save for later) store ──────────────────────── */
/* localStorage-only. No accounts, no backend, no tracking.          */

const STORAGE_KEY = "savan.blog.saved";

const EMPTY: readonly string[] = [];

function readFromStorage(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

let cache: readonly string[] = EMPTY;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function persist(slugs: readonly string[]) {
  cache = slugs;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch {
    /* storage unavailable — keep in-memory only */
  }
  emit();
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    cache = readFromStorage();
  }
  listeners.add(listener);
  window.addEventListener("storage", handleStorageEvent);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageEvent);
  };
}

function handleStorageEvent(event: StorageEvent) {
  if (event.key === STORAGE_KEY) {
    cache = readFromStorage();
    emit();
  }
}

function getSnapshot(): readonly string[] {
  return cache;
}

function getServerSnapshot(): readonly string[] {
  return EMPTY;
}

export function useSavedPosts(): readonly string[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsSaved(slug: string): boolean {
  const saved = useSavedPosts();
  return saved.includes(slug);
}

export function useToggleSaved(): (slug: string) => void {
  return useCallback((slug: string) => {
    const current = readFromStorage();
    const next = current.includes(slug)
      ? current.filter((s) => s !== slug)
      : [...current, slug];
    persist(next);
  }, []);
}
