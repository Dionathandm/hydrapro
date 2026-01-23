const CACHE_NAME = 'hydrapro-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://i.ibb.co/0VBBMfrZ/lv-0-20260119011237.png',
  'https://i.ibb.co/r22ZV0kv/lv-0-20260116051448.png',
  'https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png'
];

// Instalando o service worker e cacheando arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativando o service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptando requisições e servindo do cache se possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
