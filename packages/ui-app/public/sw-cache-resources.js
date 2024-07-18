// everytime you deploy new frontend version, please update the cache version
const cacheVersion = 'v0.2'

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

const cacheResource = async (cacheName, event) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(event.request)

  if (cachedResponse) {
    return cachedResponse
  }

  const res = await fetch(event.request);
  const resClone = res.clone();

  await cache.put(event.request, resClone);
  return res;
}

const cacheFirstThenFetch = async (cacheName, event) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(event.request)

  if (cachedResponse) {
    event.waitUntil( // Schedule a background update
      fetch(event.request).then((networkResponse) => {
        cache.put(event.request, networkResponse.clone());
      })
    );

    return cachedResponse
  }

  const res = await fetch(event.request);
  const resClone = res.clone();

  await cache.put(event.request, resClone);
  return res;
}


const isEmojiResources = (url) => {
  return url.includes('cdn.jsdelivr.net/npm/emoji-datasource-twitter/img')
}

const cacheEmojiResources = async (event) => {
  cacheResource(cacheVersion, event)
}

const isNextjsStaticResource = (url) => {
  return url.includes('_next/static');

}

const cachedNextStaticResources = async (event) => {
  cacheResource(cacheVersion, event)
}

const isOtherNextResource = (url) => {
  return url.includes('__nextjs_original-stack-frame');
}

const cacheOtherNextResource = async (event) => {
  cacheResource(cacheVersion, event)
}

const cacheProjectPage = async (event) => {
  cacheFirstThenFetch(cacheVersion, event)
}

const isApiRequest = (url) => {
  return url.includes('/api/');
}

const isProjectPage = (url) => {
  const urlObj = new URL(url)

  if (!urlObj.pathname) return

  const path = urlObj.pathname.split('/').filter(Boolean)

  return path.length === 3 && path[1] === 'project'

}

const isGmailAvatar = (url) => {
  return url.includes('lh3.googleusercontent.com');
}

const cacheGmailAvatar = async (event) => {
  cacheFirstThenFetch(cacheVersion, event)
}

const fetchEvent = () => {

  // delete old caches
  deleteOldCaches()

  self.addEventListener('fetch', (e) => {
    const url = e.request.url

    // cache fixed images like emoji picker
    if (isEmojiResources(url)) {
      cacheEmojiResources(e)
      return
    }

    if (isNextjsStaticResource(url)) {
      cachedNextStaticResources(e)
      return
    }

    if (isOtherNextResource(url)) {
      cacheOtherNextResource(e)
      // e.respondWith(fetch(e.request))
      return
    }

    if (isApiRequest(url)) {
      // console.log('request url', url)
      // e.respondWith(fetch(e.request))
      return
    }

    if (isProjectPage(url)) {
      cacheProjectPage(e)
      return
    }

    if (isGmailAvatar(url)) {
      cacheGmailAvatar(e)
    }

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

