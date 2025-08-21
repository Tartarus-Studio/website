const CACHE = "tartarus-v1";
const ASSETS = [
  "/index.html",
  "/css/styles.css",
  "/css/loader.css",
  "/css/animations.css",
  "/js/main.js",
  "/js/loader.js",
  "/js/api.js"
];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request))
  );
});
