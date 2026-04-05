const VERSION = 'iloverunn-hub-v3';
const STATIC_CACHE = `static-${VERSION}`;
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo120.png',
  '/logo152.png',
  '/logo167.png',
  '/logo180.png',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => cache.addAll(APP_SHELL.filter(Boolean)).catch(() => undefined))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== STATIC_CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isDynamic = [
    'docs.google.com',
    'drive.google.com',
    'googleusercontent.com',
    'googleapis.com',
    'firebaseapp.com',
    'firebasestorage.googleapis.com',
    'gstatic.com',
    'framerusercontent.com'
  ].some(host => url.hostname.includes(host));

  if (isDynamic) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, fresh.clone()).catch(() => undefined);
        return fresh;
      } catch {
        return (await caches.match(request)) || (await caches.match('/index.html'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const fresh = await fetch(request);
      if (url.origin === self.location.origin) {
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, fresh.clone()).catch(() => undefined);
      }
      return fresh;
    } catch {
      return cached;
    }
  })());
});
