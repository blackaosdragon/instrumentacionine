if ("function" === typeof importScripts){
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
    )
    console.log("Service worker bien?")
    if (workbox){
        console.log("WorkBox is loaded");
        workbox.setConfig({debug: false });

        self.addEventListener("install", e => {
            self.skipWaiting();
            window.location.reload()
        });
        workbox.precaching.precacheAndRoute([]);
        workbox.routing.registerRoute(
            new RegExp("https://fonts.(?:.googlepis|gstatic).com/(.*)"),
            workbox.strategies.cacheFirst({
                cacheName: "googleapis",
                plugins:[
                    new workbox.expiration.Plugin({
                        maxEntries: 30
                    })
                ]
            })
        );
        workbox.routing.registerRoute(
            /\.(?:png|gif|jpg|jpeg|svg)$/,
            workbox.strategies.cacheFirst({
                cacheName: "images",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 30*24*60*60
                    })
                ]
            })
        );
        workbox.routing.registerRoute(
            /\.(?:js|css)$/,
            workbox.strategies.staleWhileRevalidate({
                cacheName: "static-resources",
                plugins: [
                    new workbox.expiration.Plugin({
                        maxEntries: 60,
                        maxAgeSeconds: 20*24*60*60
                    })
                ]
            })
        );
    } else {
        console.log("Workbox no ha cargado. No hay soporte offline")
    }
}