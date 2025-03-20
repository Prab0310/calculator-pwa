const CACHE_NAME = "calculator-cache-v1";
const OFFLINE_URL = "./index.html"; // Fallback page for offline mode

const assets = [
  "./",
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
  if (event.request.url.startsWith("ws://") || event.request.url.startsWith("wss://")) {
    return; // Ignore WebSocket requests
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
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
