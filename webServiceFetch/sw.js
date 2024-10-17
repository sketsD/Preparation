const cacheVersion = "v1";
const cacheData = [];

const API_URL = "https://randomuser.me/api/";

const addDataToCache = async function (datatToCache) {
  const cache = await caches.open(cacheVersion);
  await cache.addAll(datatToCache);
};

self.addEventListener("install", (event) => {
  event.waitUntill(addDataToCache(cacheData));
  console.log("ServiceWorker installed");
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);
  event.respondWith(
    (async function () {
      //Cache first
      // const cachedResponse = await caches.match(event.request);
      // if (cachedResponse) return cachedResponse;

      try {
        const networkResponse = await fetch(event.request);

        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseToCache = networkResponse.clone();

          const cache = await caches.open(CACHE_NAME);
          await cache.put(event.request, responseToCache);
        }
        return networkResponse;
      } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
      }
    })()
  );
});
