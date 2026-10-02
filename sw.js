const CACHE='flightfolio-tour-v24';
const ACTIVE='./leg52.tour.json';
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
  const [base,rawTourText]=await Promise.all([
    textFromNetworkOrCache(request,'./index.html'),
    textFromNetworkOrCache(ACTIVE,ACTIVE)
  ]);
  let tourText=rawTourText.replace(/Trip resume/g,'Trip continue');
  let html=base;
  html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>FlightFolio Tour Player v24 — Leg 52</title>');
  html=html.replace(/v21 · Leg 50/g,'v24 · Leg 52');
  html=html.replace(/Reset Leg 50/g,'Reset Leg 52');
  html=html.replace(/Leg 50 player v21 loaded/g,'Leg 52 player v24 loaded');

  // Trip is the preferred spoken wake word. "Trip continue" resumes from a normal pause,
  // but preserves the existing continue/waypoint behavior while already running or at a boundary.
  html=html.replace(/Briefing complete — tour paused\. Take off when ready, then say “Trip resume\.”/g,
    'Briefing complete — tour paused. Take off when ready, then say “Trip continue.”');
  html=html.replace(/Briefing complete — tour paused and listening\. Take off when ready, then say “Trip resume\.”/g,
    'Briefing complete — tour paused and listening. Take off when ready, then say “Trip continue.”');
  html=html.replace(/if\(\/\\btour\\s\+continue\\b\/\.test\(t\)\)\{ await manualContinue\(\); return; \}/,
`if(/\\btour\\s+continue\\b/.test(t)){
      if(app.boundaryPrompted){ await manualContinue(); return; }
      if(app.paused || !app.running){
        setRunning(true);
        await speak('Trip continuing.');
        return;
      }
      await manualContinue();
      return;
    }`);
  html=html.replace(/“Tour start” \/ “Trip start”/g,'“Trip start” / “Tour start”');
  html=html.replace(/“Tour resume” \/ “Trip resume” — starts timing after takeoff/g,'“Trip continue” / “Tour continue” — starts timing after takeoff');
  html=html.replace(/“Tour briefing” \/ “Trip briefing”/g,'“Trip briefing” / “Tour briefing”');
  html=html.replace(/“Tour status” \/ “Trip update”/g,'“Trip update” / “Trip status”');
  html=html.replace(/<li>“Tour continue”<\/li>/g,'<li>“Trip continue” / “Tour continue”</li>');
  html=html.replace(/Use <b>Tour<\/b> or <b>Trip<\/b> interchangeably\./g,'Use <b>Trip</b> as the primary wake word; <b>Tour</b> remains fully supported.');

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