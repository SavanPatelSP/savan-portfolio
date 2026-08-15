"use client";

import { useCallback, useEffect, useRef } from "react";

/* ─── Hyvor Talk provider ───────────────────────────────────────── */
/* Renders the official <hyvor-talk-comments> web component (see      */
/* https://talk.hyvor.com/docs/comments). The embed module script is  */
/* injected lazily and at most once per page load; the custom element */
/* upgrades itself in place once the script registers it.             */

const EMBED_URL = "https://talk.hyvor.com/embed/embed.js";

let scriptLoading: Promise<void> | null = null;

function loadEmbedScript(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (scriptLoading) return scriptLoading;
  if (document.querySelector(`script[src="${EMBED_URL}"]`)) {
    return Promise.resolve();
  }
  scriptLoading = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = EMBED_URL;
    script.type = "module";
    script.async = true;
    script.onload = () => {
      scriptLoading = null;
      resolve();
    };
    script.onerror = () => {
      script.remove();
      scriptLoading = null;
      reject(new Error("Hyvor Talk embed script failed to load"));
    };
    document.body.appendChild(script);
  });
  return scriptLoading;
}

export function HyvorComments({
  websiteId,
  pageId,
  pageUrl,
  pageTitle,
  onReady,
  onError,
}: {
  websiteId: string;
  pageId: string;
  pageUrl: string;
  pageTitle: string;
  onReady?: () => void;
  onError?: () => void;
}) {
  const mountedRef = useRef(false);

  const start = useCallback(() => {
    loadEmbedScript()
      .then(() => {
        if (mountedRef.current) onReady?.();
      })
      .catch(() => {
        if (mountedRef.current) onError?.();
      });
  }, [onReady, onError]);

  useEffect(() => {
    mountedRef.current = true;
    start();
    return () => {
      mountedRef.current = false;
    };
  }, [start]);

  return (
    <hyvor-talk-comments
      website-id={websiteId}
      page-id={pageId}
      page-url={pageUrl}
      page-title={pageTitle}
      colors="dark"
    />
  );
}
