
/* Wochenkoch – Service Worker */

const CACHE_NAME = 'wochenkoch-v11-54-rezepte';

const APP_FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './recipes-extra.js',
  './averages.js',
  './cloud.js',
  './config.js',
  './preise.html',
  './prices.js',
  './receipt.js',
  './camera.js',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await Promise.allSettled(
        APP_FILES.map(file => cache.add(file))
      );
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();

      await Promise.all(
        names
          .filter(name =>
            name.startsWith('wochenkoch-') &&
            name !== CACHE_NAME
          )
          .map(name => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  // Seiten und JavaScript möglichst frisch laden.
  if (
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, copy);
            });
          }

          return response;
        })
        .catch(async () => {
          return (
            await caches.match(event.request) ||
            Response.error()
          );
        })
    );

    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
