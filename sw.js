const CACHE_NAME = 'bang-&-olufsen---the-composer-pwa-v1';
const ASSETS = [
    './',
    './composer.html',
    './manifest.json',
    './pwa.css',
    './index.html',
    './pwa.js',
    './sw.js',
    './demo.html',
    './vx-poster-annotation-optimized_2x.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});