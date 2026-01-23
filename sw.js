const CACHE_NAME = 'hydrapro-v3'; // versão atualizada
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/lv_0_20260122231858.mp4',
  'https://i.ibb.co/0VBBMfrZ/lv-0-20260119011237.png', // HydraPro transparente (para splash e topo)
  'https://i.ibb.co/r22ZV0kv/lv-0-20260116051448.png', // HydraFilmes
  'https://i.ibb.co/60KP16PJ/lv-0-20260117003207.png', // HydraMusic
  'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg'
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
