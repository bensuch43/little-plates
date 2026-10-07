// Little Plates service worker — bump CACHE_VERSION whenever you change any file so phones pick up the update.
const CACHE_VERSION = 'littleplates-v4';
const SHELL = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
const put = (req, res) => { if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE_VERSION).then(c => c.put(req, copy)); } return res; };

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  if (req.mode === 'navigate') {
    // Pages: network first so updates arrive; cached copy when offline.
    e.respondWith(fetch(req).then(res => put('./index.html', res)).catch(() => caches.match('./index.html')));
  } else if (sameOrigin) {
    // App files incl. the manifest: network first, so manifest/icon changes reach installed phones.
    e.respondWith(fetch(req).then(res => put(req, res)).catch(() => caches.match(req)));
  } else {
    // Google Fonts: cache first.
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => put(req, res))));
  }
});
