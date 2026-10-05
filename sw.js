const CACHE='flightfolio-tour-v28';
const ACTIVE='./leg56.tour.json';
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
  html=html.replace(/<title>[\s\S]*?<\/title>/i,'<title>FlightFolio Tour Player v28 — Leg 56</title>');
  html=html.replace(/v21 · Leg 50/g,'v28 · Leg 56');
  html=html.replace(/Reset Leg 50/g,'Reset Leg 56');
  html=html.replace(/Leg 50 player v21 loaded/g,'Leg 56 player v28 loaded');

  html=html.replace(/Briefing complete — tour paused\. Take off when ready, then say “Trip resume\.”/g,
    'Briefing complete — tour paused. Take off when ready, then say “Trip continue.”');
  html=html.replace(/Briefing complete — tour paused and listening\. Take off when ready, then say “Trip resume\.”/g,
    'Briefing complete — tour paused and listening. Take off when ready, then say “Trip continue.”');

  html=html.replace(/if\(\/\\btour\\s\+continue\\b\/\.test\(t\)\)\{ await manualContinue\(\); return; \}/,
`if(/\\btour\\s+continue\\b/.test(t)){
      if(app.boundaryPrompted){ await manualContinue(); return; }
      if(app.paused || !app.running){
        setRunning(true);
        markVoiceResult('CONTINUE accepted');
        await speak('Trip continuing.');
        return;
      }
      markVoiceResult('CONTINUE accepted');
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
    /<div><b>Last heard:<\/b> <span id="heard">—<\/span><\/div>/,
    `<div><b>Last heard:</b> <span id="heard">—</span></div>
     <div style="margin-top:10px"><b>Recent voice attempts</b>
       <div id="voiceAttempts" class="small" style="white-space:pre-wrap;margin-top:5px">—</div>
     </div>`
  );

  html=html.replace(
    /function log\(msg\)\{[\s\S]*?\n  \}\n  function save\(\)/,
`let flightLogActive=false;
  let voiceAttempts=[];
  function renderVoiceAttempts(){
    const el=document.getElementById('voiceAttempts');
    if(!el) return;
    el.textContent=voiceAttempts.length
      ? voiceAttempts.map(v=>\`Heard: "\${v.raw}"\\nInterpreted: "\${v.norm}"\\nResult: \${v.result}\`).join('\\n\\n')
      : '—';
  }
  function recordVoiceAttempt(raw,norm,result='HEARD'){
    voiceAttempts.unshift({raw:String(raw||''),norm:String(norm||''),result});
    voiceAttempts=voiceAttempts.slice(0,8);
    renderVoiceAttempts();
  }
  function markVoiceResult(result){
    if(!voiceAttempts.length) return;
    voiceAttempts[0].result=result;
    renderVoiceAttempts();
  }
  function log(msg){
    if(!flightLogActive) return;
    const stamp = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
    const lines = ((\`[\${stamp}] \${msg}\\n\`) + els.log.textContent).split('\\n').slice(0,200);
    els.log.textContent = lines.join('\\n');
  }
  function save()`
  );

  html=html.replace(
    "async function startTourExperience(){\n    if(!app.briefingPlayed){",
`async function startTourExperience(){
    if(!flightLogActive){
      flightLogActive=true;
      els.log.textContent='';
      voiceAttempts=[];
      renderVoiceAttempts();
      log('FLIGHT LOG STARTED');
    }
    if(!app.briefingPlayed){`
  );

  html=html.replace(
    "function resetTour(){\n    clearSchedule();",
`function resetTour(){
    flightLogActive=false;
    els.log.textContent='';
    voiceAttempts=[];
    renderVoiceAttempts();
    clearSchedule();`
  );

  html=html.replace(
    "log(`Destination confirmed; ${tour.title} complete`);\n      if(announce) speak(`Destination confirmed. ${tour.title} complete.`);",
`log(\`Destination confirmed; \${tour.title} complete\`);
      markVoiceResult('DESTINATION accepted');
      stopRecognitionLoop();
      els.mic.textContent='OFF — flight complete';
      els.mic.className='goodtxt';
      log('FLIGHT COMPLETE — microphone stopped; diagnostic log frozen.');
      flightLogActive=false;
      if(announce) speak(\`Destination confirmed. \${tour.title} complete. Microphone off.\`);`
  );

  html=html.replace(
    /function speak\(text, opts=\{\}\)\{[\s\S]*?\n  \}\n\n  function dueBlocks\(\)/,
`let speechChain=Promise.resolve();
  let queuedSpeechCount=0;
  function speak(text, opts={}){
    queuedSpeechCount++;
    const run=()=>new Promise(resolve=>{
      speaking=true;
      lastUtteranceText=text;
      if(opts.narrationId) lastNarrationId=opts.narrationId;
      if(recognition){ try{ recognition.abort(); }catch(e){} }
      const u=new SpeechSynthesisUtterance(text);
      const v=chosenVoice();
      if(v){ u.voice=v; u.lang=v.lang; }
      u.rate=0.96; u.pitch=1.0; u.volume=1.0;
      if(v) log(\`Speaking with: \${v.name} / \${v.lang} / \${v.voiceURI || 'no URI'}\`);
      let finished=false;
      const finish=()=>{
        if(finished) return;
        finished=true;
        queuedSpeechCount=Math.max(0,queuedSpeechCount-1);
        speaking=queuedSpeechCount>0;
        if(!speaking) restartRecognitionSoon();
        resolve();
      };
      u.onend=finish;
      u.onerror=finish;
      speechSynthesis.speak(u);
    });
    const p=speechChain.then(run,run);
    speechChain=p.catch(()=>{});
    return p;
  }

  function dueBlocks()`
  );

  html=html.replace(
    "const replacements = [",
`const replacements = [
      [/\\bweigh\\s+points?\\b/g, 'waypoint'],
      [/\\bweight\\s+points?\\b/g, 'waypoint'],
      [/\\bway\\s+points?\\b/g, 'waypoint'],
      [/\\btour\\s+sing\\b/g, 'tour sync'],
      [/\\btour\\s+sinks\\b/g, 'tour sync'],
      [/\\btour\\s+syncs\\b/g, 'tour sync'],`
  );

  html=html.replace(
    "log(`Recognition alternatives: ${alternatives.join(' | ')}`);",
    "log(`HEARD TEXT OPTIONS: ${alternatives.join(' | ')}`);"
  );
  html=html.replace(
    "els.heard.textContent=chosen;\n        handleCommand(chosen);",
`els.heard.textContent=chosen;
        recordVoiceAttempt(chosen,normalizeCommandText(chosen),'HEARD');
        handleCommand(chosen);`
  );

  html=html.replace(
    "if(!t.includes('tour') && !t.startsWith('waypoint')) return;",
`if(!t.includes('tour') && !t.startsWith('waypoint')){
      markVoiceResult('NOT A COMMAND');
      els.message.textContent='Speech heard, but no command matched: “'+raw+'”';
      log('RESULT: NOT A COMMAND — heard: "'+raw+'" | normalized: "'+t+'"');
      return;
    }`
  );
  html=html.replace(
    "log(`Unmatched normalized command: ${t}`);",
`markVoiceResult('COMMAND NOT MATCHED');
      log(\`RESULT: COMMAND NOT MATCHED — heard: "\${raw}" | normalized: "\${t}"\`);`
  );

  html=html.replace(
    "if(/\\btour\\s+(destination|airport|arrival)\\b/.test(t)){\n      atWaypoint(tour.waypoints.length+1);",
`if(/\\btour\\s+(destination|airport|arrival)\\b/.test(t)){
      markVoiceResult('DESTINATION accepted');
      atWaypoint(tour.waypoints.length+1);`
  );

  html=html.replace(
    "if((/\\btour\\s+waypoint\\b/.test(t)||t.startsWith('waypoint')) && wn){\n      atWaypoint(wn);",
`if((/\\btour\\s+waypoint\\b/.test(t)||t.startsWith('waypoint')) && wn){
      markVoiceResult('WAYPOINT '+wn+' accepted');
      atWaypoint(wn);`
  );

  html=html.replace(
    "if(Number.isFinite(miles)){\n          const segIdx=wn-1;\n          await setSync(segIdx,miles,true);",
`if(Number.isFinite(miles)){
          markVoiceResult('SYNC accepted — '+miles+' miles to waypoint '+wn);
          const segIdx=wn-1;
          await setSync(segIdx,miles,true);`
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