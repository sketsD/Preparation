const cacheName = "cache_v1";
const filesToCache = [
  "./index.html",
  "./style.css",
  "./script.js",
  "./img/bigImage.jpg",
  //   "sw.js",
];

let cacheCounter = 0;
let webCounter = 0;
let totalRequests = 0;

self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
  console.log(event);
  event.waitUntil(
    (async function () {
      const cache = await caches.open(cacheName);
      await cache.addAll(filesToCache);
      console.log(cache);
    })()
  );
});

const cacheFirst = async function (request) {
  try {
    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
      cacheCounter++;
      totalRequests++;
      console.log(cacheCounter);
      return responseFromCache;
    }
    webCounter++;
    totalRequests++;
    console.log(webCounter);
    return fetch(request);
  } catch (err) {
    console.error("There is was an error fetching the data" + err.message);
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker is active");
  console.log(event);

  event.waitUntil(
    (async function activate() {
      const keyCache = await caches.keys();
      await Promise.all(
        keyCache.map((key) => {
          console.log(key);

          if (key !== cacheName) {
            console.log("Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })()
  );
  event.waitUntil(self.clients.claim());
});

self.onmessage = function () {
  console.log(
    "cache responded: " + cacheCounter + " / " + "web responded: " + webCounter
  );
  if (totalRequests === 0) return;
  console.log((cacheCounter / totalRequests) * 100 + "%");
};
