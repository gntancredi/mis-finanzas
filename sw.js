/* Service worker — MI CENTRO FINANCIERO
 * Sólo guarda en caché la "cáscara" de la app (HTML, íconos, manifiesto).
 * NUNCA guarda en caché respuestas de la API (datos financieros). */
var VERSION = 'mcf-v1.1.1';
var SHELL = ['./', './index.html', './manifest.webmanifest', './config.js', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); })); });
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) { return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('message', function (e) { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return; // API de Google y login: siempre por red
  // Red primero (para recibir actualizaciones); si no hay conexión, la copia en caché.
  e.respondWith(fetch(req).then(function (resp) {
    if (resp.ok && SHELL.some(function (p) { return url.pathname.endsWith(p.replace('./', '/')) || (p === './' && url.pathname.endsWith('/')); })) {
      var copy = resp.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); });
    }
    return resp;
  }).catch(function () { return caches.match(req).then(function (r) { return r || caches.match('./index.html'); }); }));
});
