// everytime you deploy new frontend version, please update the cache version
const cacheVersion = 'v1.1'

const cacheClone = async (e) => {
  const res = await fetch(e.request);
  const resClone = res.clone();

  const cache = await caches.open(cacheVersion);
  await cache.put(e.request, resClone);
  return res;
};

const deleteOldCaches = async () => {
  const keys = await caches.keys()
  keys.map(async k => {
    if (k === cacheVersion) return
    console.log('delete key', k)
    await caches.delete(k)
  })
}


const isEmojiResources = (url) => {
  return url.includes('cdn.jsdelivr.net/npm/emoji-datasource-twitter/img')
}

const cacheEmojiResources = async (e) => {
  const cache = await caches.open(cacheVersion);

  const res = await fetch(e.request);
  const resClone = res.clone();

  await cache.put(e.request, resClone);
  return res;
}

const cachedNextStaticResources = async () => {
  console.log(1)
}

const fetchEvent = () => {

  // delete old caches
  deleteOldCaches()


  // return default request 

  self.addEventListener('fetch', (e) => {
    // console.log('----------------------')
    // console.log('e.request:', e.request.method, e.request.url)

    // cache fixed images like emoji picker

    const url = e.request.url
    if (isEmojiResources(url)) {
      console.log(url)
      cacheEmojiResources(e)
      return
    }

    // cache _next/static
    cachedNextStaticResources()

    e.respondWith(fetch(e.request))
    // e.respondWith(
    //   cacheClone(e)
    //     .catch(() => caches.match(e.request))
    //     .then((res) => res)
    // );
  });
};

fetchEvent();

const installEvent = () => {
  self.addEventListener('install', () => {
    console.log('service worker installed');
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener('activate', () => {
    console.log('service worker activated');
  });
};
activateEvent();

