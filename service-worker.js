const CACHE_NAME = "tartarus-studio-v1.1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/style/styles.css",
  "/src/main.js",
  "/src/TartarusApp.js",
  "/src/config/constants.js",
  "/src/config/urls.js",
  "/src/config/projects.js",
  "/src/config/site.js",
  "/src/config/index.js",
  "/src/modules/TranslationManager.js",
  "/src/modules/NavigationManager.js",
  "/src/modules/SocialManager.js",
  "/src/modules/EmailManager.js",
  "/src/modules/AnimationManager.js",
  "/src/modules/ProjectsManager.js",
  "/src/modules/MetaManager.js",
  "/src/modules/Utils.js",
  "/src/utils/logger.js",
  "/src/translations/en.json",
  "/src/translations/ar.json",
  "/assets/logo.svg",
  "/assets/logo-mono.svg",
  "/assets/works/work-1.webp",
  "/manifest.webmanifest"
];

// Install event - cache static assets
self.addEventListener("install", event => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(error => console.error("Service Worker: Cache failed", error))
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", event => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener("fetch", event => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;
  
  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }
        
        // Fetch from network
        return fetch(event.request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== "basic") {
              return response;
            }
            
            // Clone the response before caching
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(() => {
            // Fallback for offline scenarios
            if (event.request.destination === "document") {
              return caches.match("/index.html");
            }
          });
      })
  );
});
