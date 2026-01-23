const CACHE_NAME = 'hydrapro-v2'; // mude a versão
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/lv_0_20260122231858.mp4',
  'https://i.ibb.co/NgNsR966/file-0000000074d071f59185902cd5d7dd05.png' // novo logo
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
