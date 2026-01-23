const CACHE_NAME = 'hydrapro-cache-v1';
const urlsToCache = [
  './index.html',
  './lv_0_20260122231858.mp4',
  './manifest.json'
];

// Instalação do SW e cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação do SW
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch: tenta buscar no cache antes de ir para a rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
