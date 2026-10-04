// Service Worker for Wilmar Machado Portfolio & PWA Console 2026
const CACHE_NAME = 'wm-portfolio-v2026-v2';

const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './preloader.js',
  './admin.html',
  './admin.css',
  './admin.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './images/obra-01.jpg',
  './images/obra-02.jpg',
  './images/obra-03.jpg',
  './images/obra-04.jpg',
  './images/obra-05.jpg',
  './images/obra-06.jpg',
  './images/obra-07.jpg',
  './images/obra-08.jpg',
  './images/obra-09.jpg',
  './images/obra-10.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS).catch((err) => {
        console.warn('Portfolio cache prefetch note:', err);
      });
    })
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
  if (event.request.method !== 'GET') return;

  // Video or byte-range requests should bypass service worker cache
  // to preserve native browser HTTP streaming (partial content 206) in iOS and Chrome
  if (event.request.destination === 'video' || event.request.headers.get('range') || event.request.url.includes('.mp4')) {
    return;
  }

  // Stale-While-Revalidate for cached assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && (networkResponse.type === 'basic' || networkResponse.type === 'cors')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
