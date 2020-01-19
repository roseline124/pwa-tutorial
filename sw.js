const staticCacheName = 'site-static-v1'
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
]

// install service worker
self.addEventListener('install', (event) => { 
    // console.log('service worker has been installed')
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets')
            cache.addAll(assets)
        })
    )
})

// activate event
self.addEventListener('activate', (event) => {
    // console.log('service worker has been activated')
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

// fetch event
self.addEventListener('fetch', (event) => {
    // console.log('fetc h event')

    event.respondWith(
        caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetch(event.request)
        })
    )
}) 
