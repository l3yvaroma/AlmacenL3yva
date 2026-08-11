// ═══════ SERVICE WORKER DE LIMPIEZA ═══════
// Se auto-elimina y borra TODAS las cachés antiguas.
// A partir de ahora la app carga siempre la versión más reciente desde la red.

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});

// Responde siempre desde la red, nunca desde caché.
self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request, { cache: 'no-store' }));
});
