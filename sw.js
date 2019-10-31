const staticCache = 'site-static-v1'

// install event
const assets = [
    '/',
    './index.html',
    './CSS/style.css',
    './images/cloud.png',
    './images/mountain.png',
    './images/simon.jpg',
    'https://fonts.googleapis.com/css?family=Merriweather|Montserrat|Sacramento&display=swap',
    'https://media.giphy.com/media/dscTJjpsiVamjIk6nk/giphy.gif',
    'https://media2.giphy.com/media/eJGAjgTxQkdf6sKXhu/giphy.gif?cid=790b76115d4839ce7444744c496fb582&rid=giphy.gif'
]
self.addEventListener('install', evt => {
    //console.log('service worker has been installed')
    evt.waitUntil(
        caches.open(staticCache).then(cache => {
            console.log('adding assets')
            cache.addAll(assets)
        })
    )
})

//activate event
self.addEventListener('activate', evt => {
    console.log('service worker has been activated')
})

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('Fetch event', evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
})