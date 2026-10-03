const CACHE='flightfolio-tour-v26';
const ACTIVE='./leg54.tour.json';
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
  html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>FlightFolio Tour Player v26 — Leg 54</title>');
  html=html.replace(/v21 · Leg 50/g,'v26 · Leg 54');
  html=html.replace(/Reset Leg 50/g,'Reset Leg 54');
  html=html.replace(/Leg 50 player v21 loaded/g,'Leg 54 player v26 loaded');

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

  html=html.replace(
    "log(`Recognition alternatives: ${alternatives.join(' | ')}`);",
    "log(`HEARD TEXT OPTIONS: ${alternatives.join(' | ')}`);"
  );
  html=html.replace(
    "if(!t.includes('tour') && !t.startsWith('waypoint')) return;",
`if(!t.includes('tour') && !t.startsWith('waypoint')){
      els.message.textContent='Speech heard, but no command matched: “'+raw+'”';
      log('RESULT: NOT A COMMAND — heard: "'+raw+'" | normalized: "'+t+'"');
      return;
    }`
  );
  html=html.replace(
    "log(`Unmatched normalized command: ${t}`);",
    "log(`RESULT: COMMAND NOT MATCHED — heard: \"${raw}\" | normalized: \"${t}\"`);"
  );
  html=html.replace(
    "recognition.onnomatch=()=>log('Recognition no-match (ignored)');",
    "recognition.onnomatch=()=>log('NO TRANSCRIPT — Chrome returned a no-match event; no recognized text was provided.');"
  );
  html=html.replace(
    "log(`Recognition error: ${e.error}${harmless?' (ignored/restarting)':''}`);",
`if(e.error==='no-speech'){
        log('NO SPEECH — Chrome ended this recognition cycle without usable speech.');
      }else{
        log(\`Recognition error: \${e.error}\${harmless?' (ignored/restarting)':''}\`);
      }`
  );

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
