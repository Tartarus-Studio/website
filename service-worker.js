const CACHE = "tartarus-v1";
const ASSETS = [
  "/index.html",
  "/css/base.css",
  "/css/theme.css",
  "/js/main.js"
];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request))
  );
});
