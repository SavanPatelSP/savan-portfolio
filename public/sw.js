const CACHE_NAME = "portfolio-v3";
const PRECACHE_URLS = [
  "/portfolio-app/offline",
  "/icon-192.svg",
  "/icon-512.svg",
  "/favicon.svg",
  "/logo.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetched = fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const contentType = response.headers.get("content-type") || "";
              if (contentType.includes("text/html") || contentType.includes("javascript") || contentType.includes("css") || contentType.includes("json") || contentType.includes("image/")) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
              }
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetched;
      })
    );
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match("/portfolio-app/offline").then((cached) => {
            if (cached) return cached;
            return new Response(
              "<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your connection and try again.</p></body></html>",
              { headers: { "Content-Type": "text/html" }, status: 503 }
            );
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request)
          .then((response) => {
            if (response.ok && url.pathname.startsWith("/")) {
              const contentType = response.headers.get("content-type") || "";
              if (contentType.includes("text/html") || contentType.includes("javascript") || contentType.includes("css") || contentType.includes("json") || contentType.includes("image/")) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
              }
            }
            return response;
          })
          .catch(() => new Response("", { status: 408, statusText: "Offline" }))
      );
    })
  );
});
