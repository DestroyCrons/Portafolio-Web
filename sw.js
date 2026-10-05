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
  './admin.webmanifest',
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

// Push Notifications & Interaction Support
self.addEventListener('push', (event) => {
  let data = { title: 'Nuevo Pedido · Wilmar Machado', body: 'Has recibido una nueva cotización en tu portafolio.' };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch(e) {
    if (event.data) data.body = event.data.text();
  }

  const options = {
    body: data.body,
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || 'admin.html#tab-inquiries'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : 'admin.html#tab-inquiries';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('admin.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

