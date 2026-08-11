// Service worker LIMPIO: se autoelimina y borra cachés antiguas.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.map(c => caches.delete(c))))
    .then(() => self.registration.unregister()).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => e.respondWith(fetch(e.request, { cache: 'no-store' })));
