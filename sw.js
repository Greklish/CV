const staticCache = 'site-static-v1'

// install event
const assets = [
    './',
    'https://github.com/Gripencreutz/CV/blob/master/index.html',
    'https://github.com/Gripencreutz/CV/blob/master/CSS/style.css',
    'https://github.com/Gripencreutz/CV/blob/master/images/cloud.png',
    'https://github.com/Gripencreutz/CV/blob/master/images/mountain.png',
    'https://github.com/Gripencreutz/CV/blob/master/images/simon.jpg',
    'https://fonts.googleapis.com/css?family=Merriweather|Montserrat|Sacramento&display=swap',
    'https://media.giphy.com/media/dscTJjpsiVamjIk6nk/giphy.gif',
    'https://media2.giphy.com/media/eJGAjgTxQkdf6sKXhu/giphy.gif?cid=790b76115d4839ce7444744c496fb582&rid=giphy.gif'
]
// self.addEventListener('install', evt => {
//     //console.log('service worker has been installed')
//     evt.waitUntil(
//         caches.open(staticCache).then(cache => {
//             console.log('adding assets')
//             cache.addAll(assets)
//         })
//     )
// })

// //activate event
// self.addEventListener('activate', evt => {
//     console.log('service worker has been activated')
// })

// // fetch event
// self.addEventListener('fetch', evt => {
//     //console.log('Fetch event', evt)
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             return cacheRes || fetch(evt.request);
//         })
//     )
// })

// Install event
self.addEventListener('install', function (event) {
    console.log("SW installed");
    event.waitUntil(
        caches.open(staticCache)
            .then(function (cache) {
                console.log('SW caching cachefiles');
                return cache.addAll(assets);
            })
    )
});

// Activate event
self.addEventListener('activate', function (event) {
    console.log("SW activated");
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(cacheNames.map(function (thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        console.log('SW Removing cached files from', thisCacheName);
                        return caches.delete(thisCacheName);
                    }
                }))
            })
    )
});

// Fetch event
self.addEventListener('fetch', function (event) {
    console.log("SW fetching", event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                console.log('Fetching new files');
                return response || fetch(event.request);
            })
    );
});
