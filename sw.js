const CACHE_NAME="gp-v3";
const ASSETS=["./","index.html","styles.css","data.js","app.js","icon.svg","icon-192.png","icon-512.png","manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE_NAME).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res&&res.status===200&&res.type==="basic"){const cp=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,cp))}return res}).catch(()=>caches.match("index.html"))))});
