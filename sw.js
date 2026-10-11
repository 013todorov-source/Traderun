const V='trade-run-v2',F=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(F.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:true}).then(r=>{const f=fetch(e.request).then(res=>{if(res&&res.ok)c.put(e.request,res.clone());return res}).catch(()=>r||c.match('index.html'));return r||f})))});
