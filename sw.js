const CACHE='flightfolio-tour-v22';
const ACTIVE='./leg51.tour.json';
const ASSETS=['./index.html','./manifest.webmanifest',ACTIVE,'./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));
    await self.clients.claim();
  })());
});

async function textFromNetworkOrCache(request,fallback){
  try{
    const r=await fetch(request,{cache:'no-store'});
    if(r.ok) return await r.text();
  }catch(e){}
  const cached=await caches.match(fallback||request);
  if(!cached) throw new Error('Offline resource unavailable');
  return await cached.text();
}

async function activePage(request){
  const [base,tourText]=await Promise.all([
    textFromNetworkOrCache(request,'./index.html'),
    textFromNetworkOrCache(ACTIVE,ACTIVE)
  ]);
  let html=base;
  html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>FlightFolio Tour Player v22 — Leg 51</title>');
  html=html.replace(/v21 · Leg 50/g,'v22 · Leg 51');
  html=html.replace(/Reset Leg 50/g,'Reset Leg 51');
  html=html.replace(/Leg 50 player v21 loaded/g,'Leg 51 player v22 loaded');
  const safeTour=tourText.replace(/<\/script/gi,'<\\/script');
  html=html.replace(/<script id="tourData" type="application\/json">[\s\S]*?<\/script>/i,
    '<script id="tourData" type="application/json">'+safeTour+'</script>');
  return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache, no-store, must-revalidate'}});
}

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  if(event.request.mode==='navigate'){
    event.respondWith(activePage(event.request).catch(()=>fetch(event.request,{cache:'no-store'})));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    const copy=response.clone();
    caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    return response;
  })));
});
