const CACHE_NAME = "calculator-cache-v1";
const OFFLINE_URL = "./index.html"; // Use a relative path for offline access

const assets = [
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./icons/icon-192x192.png",
  "./icons/icon-512x512.png",
  "./screenshots/screenshot1.png",
  "./screenshots/screenshot2.png"
];

// Install Service Worker and Cache Assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Fetch Cached Assets with Offline Fallback
self.addEventListener("fetch", (event) => {
  // Ignore WebSocket requests
  if (!event.request.url.startsWith("ws://127.0.0.1:5500/index.html/ws") 
    && !event.request.url.startsWith("wss://")) {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request).catch(() => {
        // If it's a page request, return the offline page
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }
        return new Response(null, { status: 204 }); // Avoid 503 errors
      });
    })
  );
  }
});

// Update Cache when a new service worker is activated
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
