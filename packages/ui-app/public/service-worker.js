importScripts("https://js.pusher.com/beams/service-worker.js");
// importScripts('sw-cache-resources.js')

// everytime you deploy new frontend version, please update the cache version
const cacheVersion = 'v0.18'

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
  const resClone = res.clone();

  await cache.put(url, resClone);
  return res;
}

const cacheFirstThenFetch = async (cacheName, event) => {
  const url = event.request.url
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(url)

  // const updatePromise = async () => { // Separate promise for update
  //   const res = await fetch(event.request);
  //   const resClone = res.clone();
  //   console.log('return cache 3', event.request.url)
  //   await cache.put(event.request, resClone);
  // }

  if (cachedResponse) {
    // event.waitUntil(updatePromise);
    console.log('return from cached')
    return cachedResponse
  }

  const res = await fetch(event.request);
  const resClone = res.clone();

  await cache.put(url, resClone);
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
  cacheResource(cacheVersion, event)
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
      return
    }

    if (isApiRequest(url)) {
      return
    }

    if (isGmailAvatar(url)) {
      cacheGmailAvatar(e)
      return
    }

    if (isProjectPage(url)) {
      console.log('is project page', url)
      cacheProjectPage(e)
      return
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



