importScripts("https://js.pusher.com/beams/service-worker.js");

// everytime you deploy new frontend version, please update the cache version
const cacheVersion = 'v0.53'


const deleteOldCaches = async () => {
  const keys = await caches.keys()
  keys.map(async k => {
    if (k === cacheVersion) return
    console.log('delete key', k)
    await caches.delete(k)
  })
}

const cacheResource = async (cacheName, event) => {
  const url = event.request.url
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url)

  if (cachedResponse) {
    return cachedResponse
  }

  const res = await fetch(event.request);
  if (res.ok) {
    const resClone = res.clone();
    await cache.put(url, resClone);
  }
  return res;
}

const isEmojiResources = (url) => {
  return url.includes('cdn.jsdelivr.net/npm/emoji-datasource-twitter/img')
}

const cacheEmojiResources = async (event) => {
  return cacheResource(cacheVersion, event)
}

const isNextjsStaticResource = (url) => {
  return url.includes('_next/static');
}

const cachedNextStaticResources = async (event) => {
  return cacheResource(cacheVersion, event)
}

const isApiRequest = (url) => {
  return url.includes('/api/');
}

const isGmailAvatar = (url) => {
  return url.includes('lh3.googleusercontent.com');
}

const isMediaResources = (url) => {
  return /\.(png|svg|gif|jpeg|jpg|bmp|avif|ico)$/.test(url)
}

const cacheGmailAvatar = async (event) => {
  return cacheResource(cacheVersion, event)
}

const fetchEvent = () => {

  // delete old caches
  deleteOldCaches()

  self.addEventListener('fetch', (e) => {
    const req = e.request
    const url = req.url

    if (isApiRequest(url)) {
      return
    }

    if (isEmojiResources(url)) {
      e.respondWith(cacheEmojiResources(e))
      return
    }

    if (isGmailAvatar(url)) {
      e.respondWith(cacheGmailAvatar(e))
      return
    }

    if (isMediaResources(url)) {
      e.respondWith(cacheResource(cacheVersion, e))
      return
    }

    if (isNextjsStaticResource(url)) {
      // e.respondWith(cachedNextStaticResources(e))
      return
    }

    // e.respondWith(fetch(e.request))

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



