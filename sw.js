const CACHE_NAME = 'quick-jot-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/src/css/app.css',
  '/src/js/app.js',
  '/manifest.webmanifest.json',
  '/src/icons/icon-192x192.png',
  '/src/icons/icon-512x512.png',
  '/src/img/images.jpeg',
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://code.getmdl.io/1.3.0/material.deep_purple-amber.min.css",
  "https://code.getmdl.io/1.3.0/material.min.js"
];

self.addEventListener("install", event => {
  console.log("[SW] Instalando Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Archivos cacheados");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("[SW] Activado");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Eliminando caché antigua", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
