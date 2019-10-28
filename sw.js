const staticCacheName = 'cv-cache'
// const dynamicCache = 'dynamic-v2'

const assets = [
    '/',
    '/index.html',
    '/images/cloud.png',
    '/images/mountain.png',
    '/images/simon.jpg',
    '/CSS/style.css',
]

self.addEventListener('install', evt => {
    //console.log('Service worker installed')
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {

            cache.addAll(assets)
            console.log(' Caching shell assets')
        }))
})

self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
                .then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(evt.request.utl, fetchRes.clone())
                        return fetchRes
                    })
                })
        })
    )
})

self.addEventListener('activate', evt => {
    //console.log('Service worker activated')
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys)
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete())
            )
        })
    )
})
