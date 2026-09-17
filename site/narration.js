/* Local neural narration. Static releases may provide the audio; highlighting uses source-text offsets. */
(function () {
  'use strict';
  const SKIP = '.widget,.section-figure,table,pre,.reference-content,[hidden],[aria-hidden="true"],script,style,button';
  const BLOCKS = 'h2,h3,h4,h5,h6,p,li';
  function extract(prose) {
    const passages = [];
    const hiddenMemo = new WeakMap();
    function hidden(element) {
      if (hiddenMemo.has(element)) return hiddenMemo.get(element);
      let value = getComputedStyle(element).visibility === "hidden";
      for (let parent = element; parent && parent !== prose.parentElement; parent = parent.parentElement) if (getComputedStyle(parent).display === "none") { value = true; break; }
      hiddenMemo.set(element,value); return value;
    }
    for (const element of prose.querySelectorAll(BLOCKS)) {
      if (element.closest(SKIP) || hidden(element)) continue;
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const mappings = []; let raw = '', node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest(SKIP) || hidden(node.parentElement) || node.parentElement.closest(BLOCKS) !== element) continue;
        mappings.push({ node, start: raw.length, end: raw.length + node.length }); raw += node.data;
      }
      let cursor = 0;
      while (cursor < raw.length) {
        while (/\s/.test(raw[cursor] || '') && cursor < raw.length) cursor++;
        if (cursor >= raw.length) break;
        let end = Math.min(raw.length, cursor + 1200);
        if (end < raw.length) {
          const part = raw.slice(cursor, end), sentence = [...part.matchAll(/[.!?][”"')]*\s+/g)].pop();
          const split = sentence && sentence.index > 350 ? sentence.index + sentence[0].length : part.lastIndexOf(' ');
          if (split > 0) end = cursor + split;
        }
        const text = raw.slice(cursor, end).trimEnd();
        if (text.trim()) passages.push({ text, element, offset: cursor, mappings });
        cursor = end;
      }
    }
    return passages;
  }
  function rangeFor(passage, offset, length) {
    const from = passage.offset + offset, to = from + length;
    const a = passage.mappings.find(m => m.start <= from && m.end > from);
    const b = passage.mappings.find(m => m.start < to && m.end >= to);
    if (!a || !b || length < 1) return null;
    const range = document.createRange(); range.setStart(a.node, from - a.start); range.setEnd(b.node, to - b.start); return range;
  }
  const RELEASE_AUDIO_PREFIX = '/DicksonWu654/sand-to-gpu/releases/download/';
  function isAllowedAudioUrl(value) {
    let url;
    try { url = new URL(value, location.href); } catch { return false; }
    if (url.origin === location.origin) return true;
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.username && !url.password && !url.search && !url.hash && url.pathname.startsWith(RELEASE_AUDIO_PREFIX) && url.pathname.length > RELEASE_AUDIO_PREFIX.length;
  }
  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    for (const [key,value] of Object.entries(attrs || {})) node.setAttribute(key,value);
    if (text) node.textContent = text; return node;
  }
  function mount({ prose, toolbar, title, lessonKey }) {
    let destroyed = false, passages = null, index = 0, generation = 0, frame = 0, lastWord = -1;
    let wantsPlay = false, follow = true, ready = false, opened = false, current = null, highlighted = null;
    let mainAbort = null, statusAbort = null, statusTimer = null, lastScrollAt = 0;
    let recorded = null, recordingRoot = null, paragraphClickTimer = null;
    const paragraphStarts = new Map();
    const cache = new Map(), pending = new Map(), prefetchControllers = new Set(), audio = new Audio();
    audio.preload = 'auto';
    const launch = el('button',{type:'button',class:'narration-launch','aria-expanded':'false'},'Listen to this chapter');
    const player = el('section',{class:'narration-player','aria-label':'Chapter audio player',hidden:'', 'data-state':'idle',tabindex:'-1'});
    const top = el('div',{class:'narration-top'}), identity = el('div',{class:'narration-identity'});
    identity.append(el('strong',{class:'narration-title'},title));
    function button(action,label,text) { return el('button',{type:'button','data-action':action,'aria-label':label,title:label},text); }
    const close = button('close','Close audio player','×'); top.append(identity,close);
    const status = el('p',{class:'narration-status',role:'status','aria-live':'polite'},'Natural narration, generated on this computer.');
    const transport = el('div',{class:'narration-transport'});
    const previous = button('previous','Previous passage','←'), play = button('play','Play narration','Play'), next = button('next','Next passage','→');
    const position = el('span',{class:'narration-position'},'Ready when you are');
    const settingsToggle = button('settings','Voice and playback settings','•••');
    settingsToggle.setAttribute('aria-expanded','false');
    settingsToggle.setAttribute('aria-controls','narration-settings');
    const timeline = el('div',{class:'narration-timeline'}), seek = el('input',{type:'range',class:'narration-seek',min:'0',max:'1',step:'0.01',value:'0','aria-label':'Seek within this passage'}), elapsed = el('span',{class:'narration-elapsed'},'0:00 / 0:00');
    seek.disabled=true; timeline.append(seek,elapsed);
    const settings = el('div',{id:'narration-settings',class:'narration-settings',hidden:''});
    const voiceLabel = el('label',null,'Voice'), voice = el('select',{class:'narration-voice','aria-label':'Narration voice'});
    voice.append(el('option',{value:'af_heart'},'Heart')); voiceLabel.append(voice);
    const rateLabel = el('label',null,'Speed'), rate = el('select',{class:'narration-rate','aria-label':'Playback speed'});
    [0.75,1,1.15,1.25,1.5,1.75,2].forEach(value => rate.append(el('option',{value:String(value)},value+'×'))); rate.value='1'; rateLabel.append(rate);
    const followButton = button('follow','Follow the spoken word','Follow text'); followButton.setAttribute('aria-pressed','true');
    const here = button('here','Start at the passage currently on screen','Read from here');
    transport.append(previous,play,next,followButton,position,settingsToggle);
    settings.append(voiceLabel,rateLabel,here);
    const note = el('p',{class:'narration-note'},'AI voice · Click a paragraph to read from there, or use Read from here. Saved after its first reading. Diagrams, tables, code blocks and references are skipped.');
    settings.append(note);
    player.append(top,status,transport,timeline,settings); toolbar.append(launch); document.body.append(player);
    const supportsHighlight = !!(window.CSS?.highlights && window.Highlight);
    if(!supportsHighlight)note.textContent+=' This browser highlights the current passage.';
    function setState(state,message) {
      player.dataset.state=state;
      if (message) status.textContent=message;
      play.textContent = wantsPlay ? 'Pause' : state==='error' ? 'Retry' : 'Play';
      play.setAttribute('aria-label', wantsPlay ? 'Pause narration' : state==='error' ? 'Retry narration' : 'Play narration');
      play.disabled=!ready && state==='loading';
      previous.disabled=!passages || index<=0; next.disabled=!passages || index>=passages.length-1;
      if (passages) { position.textContent=(index+1)+' / '+passages.length; position.setAttribute('aria-label','Passage '+(index+1)+' of '+passages.length); }
    }
    function clearHighlight() {
      if (supportsHighlight) CSS.highlights.delete('narration-word');
      highlighted?.classList.remove('narration-current-passage'); highlighted=null; lastWord=-1;
    }
    function setFollow(value,manual) {
      follow=value; followButton.setAttribute('aria-pressed',String(value));
      followButton.textContent=value?'Following':'Follow';
      followButton.title=value?'Pause automatic scrolling':'Follow the spoken word';
      if (manual && opened && wantsPlay) status.textContent='Scroll freely. Choose Follow to return to the voice.';
      lastWord=-1;
    }
    function clock(seconds) { const value=Math.max(0,Math.floor(seconds||0)); return Math.floor(value/60)+":"+String(value%60).padStart(2,"0"); }
    function updateTime() {
      const duration=current?.duration || 0; seek.disabled=!current; seek.max=String(duration || 1); seek.value=String(audio.currentTime || 0);
      elapsed.textContent=clock(audio.currentTime)+" / "+clock(duration); seek.setAttribute("aria-valuetext",clock(audio.currentTime)+" of "+clock(duration));
    }
    function tick() {
      if (destroyed || !opened || !current) return;
      updateTime();
      const wordIndex=current.words.findIndex(w => audio.currentTime>=w.start && audio.currentTime<w.end);
      if (wordIndex!==lastWord) {
        lastWord=wordIndex;
        if (supportsHighlight) CSS.highlights.delete('narration-word');
        if (wordIndex>=0) {
          const word=current.words[wordIndex], range=rangeFor(passages[index],word.textOffset,word.length);
          if (range) {
            if (supportsHighlight) CSS.highlights.set('narration-word',new Highlight(range));
            const rect=range.getBoundingClientRect(), bottom=Math.min(innerHeight*.72,player.getBoundingClientRect().top-35);
            if (follow && wantsPlay && bottom>170 && performance.now()-lastScrollAt>900 && (rect.top<120 || rect.bottom>bottom)) { lastScrollAt=performance.now(); window.scrollBy({top:rect.top-innerHeight*.38,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
          }
        }
      }
      if (!audio.paused) frame=requestAnimationFrame(tick);
    }
    function keyFor(passage, selectedVoice) { return selectedVoice+'\n'+passage.text; }
    async function getAudio(passage, selectedVoice, signal) {
      const key=keyFor(passage,selectedVoice);
      if (cache.has(key)) return cache.get(key);
      if (pending.has(key) && !pending.get(key).signal.aborted) return pending.get(key).promise;
      const request=(async()=>{
        let data;
        if(recorded) {
          const entry=recorded.get(passage.text);
          if(!entry)throw new Error('This passage is missing from the recorded edition.');
          data={...entry,audioUrl:new URL(entry.audioUrl,recordingRoot).href};
        } else {
          const response=await fetch('/api/narration/render',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:passage.text,voice:selectedVoice}),signal});
          data=await response.json();
          if (!response.ok) throw new Error(data.error || data.message || 'Narration could not be generated.');
        }
        if (!Array.isArray(data.words) || !data.words.length || typeof data.audioUrl!=='string' || !Number.isFinite(data.duration) || data.duration<=0 || data.words.some((w,i)=>!w||!Number.isFinite(w.start)||!Number.isFinite(w.end)||w.start<0||w.end<=w.start||w.end>data.duration||(i>0&&w.start<data.words[i-1].start)||!Number.isInteger(w.textOffset)||!Number.isInteger(w.length)||w.textOffset<0||w.length<1||w.textOffset+w.length>passage.text.length)) throw new Error('The narration response was incomplete. Please retry.');
        const url=new URL(data.audioUrl,location.href); if(!isAllowedAudioUrl(url.href)) throw new Error('The recording must come from this website or the approved GitHub release.');
        cache.set(key,data); if(cache.size>12) cache.delete(cache.keys().next().value); return data;
      })();
      pending.set(key,{promise:request,signal});
      try{return await request;}finally{if(pending.get(key)?.promise===request)pending.delete(key);}
    }
    function prefetch() {
      if (!passages[index+1] || destroyed || !opened) return;
      const controller=new AbortController(); prefetchControllers.add(controller);
      Promise.allSettled(passages.slice(index+1,index+3).map(async p=>{
        const data=await getAudio(p,voice.value,controller.signal);
        if(recorded && new URL(data.audioUrl,location.href).origin===location.origin) {
          const response=await fetch(data.audioUrl,{signal:controller.signal,cache:'force-cache'});
          if(response.ok)await response.arrayBuffer();
        }
      }))
        .finally(()=>prefetchControllers.delete(controller));
    }
    async function start(target) {
      if (!passages?.length || !ready) return;
      generation++; const ticket=generation;
      mainAbort?.abort(); mainAbort=new AbortController();
      audio.pause(); cancelAnimationFrame(frame); clearHighlight(); current=null; updateTime();
      index=Math.max(0,Math.min(target,passages.length-1));
      setState('loading',recorded||cache.has(keyFor(passages[index],voice.value))?'Loading saved audio…':'Preparing this passage… The first reading takes a little longer.');
      try {
        const data=await getAudio(passages[index],voice.value,mainAbort.signal);
        if(destroyed || !opened || ticket!==generation)return;
        current=data; audio.src=data.audioUrl; audio.playbackRate=Number(rate.value); updateTime();
        highlighted=passages[index].element; highlighted.classList.add('narration-current-passage');
        if(wantsPlay) { await audio.play(); if(ticket!==generation || destroyed || !wantsPlay)return; setState('playing','Playing · '+(follow?'Following the spoken word.':'Automatic scrolling is paused.')); tick(); }
        else setState('paused','Ready. Press Play to continue.');
        prefetch();
      }catch(error){
        if(destroyed || !opened || ticket!==generation || (!wantsPlay && current))return;
        wantsPlay=false; if(error.name==='AbortError'){setState('paused','Paused. Press Play to continue.');return;}
        setState('error',error.name==='NotAllowedError'?'Audio is ready. Press Play to start listening.':error.name==='NotSupportedError'?'Saved audio could not be played. Try another passage or retry.':error.message);
      }
    }
    async function findRecording(signal) {
      const root=new URL('narration/',document.baseURI);
      const response=await fetch(new URL('index.json',root),{signal,cache:'no-cache'});
      if(response.status===404)return null;
      if(!response.ok)throw new Error('The recorded edition could not be loaded. Please retry.');
      let index;
      try{index=await response.json();}catch{throw new Error('The recorded edition is unavailable. Please retry later.');}
      if(index.version!==1 || index.complete!==true || !['af_heart','af_bella'].includes(index.voice))throw new Error('This recorded edition is not complete yet.');
      const spec=index.lessons?.[lessonKey];
      if(!spec?.manifest)throw new Error('This chapter is missing from the recorded edition.');
      const manifestUrl=new URL(spec.manifest,root);
      if(manifestUrl.origin!==location.origin || !manifestUrl.pathname.startsWith(root.pathname))throw new Error('The recording manifest is invalid.');
      const chapterResponse=await fetch(manifestUrl,{signal,cache:'no-cache'});
      if(!chapterResponse.ok)throw new Error('This chapter’s recordings are unavailable. Please retry.');
      let chapter;
      try{chapter=await chapterResponse.json();}catch{throw new Error('This chapter’s recordings could not be loaded. Please retry.');}
      if(chapter.complete!==true || chapter.voice!==index.voice || !Array.isArray(chapter.passages) || chapter.passages.length!==passages.length || chapter.passages.some((entry,i)=>entry.text!==passages[i].text))throw new Error('The recordings do not match this edition of the lesson. Updated audio is needed.');
      if(signal.aborted)throw new DOMException('Canceled','AbortError');
      recorded=new Map(chapter.passages.map(entry=>[entry.text,entry])); recordingRoot=root;
      note.textContent='Recorded AI voice · Click a paragraph to read from there, or use Read from here. Plays from saved audio. Diagrams, tables, code blocks and references are skipped.';
      if(!supportsHighlight)note.textContent+=' This browser highlights the current passage.';
      return {ready:true,voices:[{id:index.voice,name:index.voice==='af_heart'?'Heart':index.voice}]};
    }
    async function checkStatus() {
      statusAbort?.abort(); statusAbort=new AbortController(); const signal=statusAbort.signal; setState('loading','Loading this chapter’s audio…');
      try {
        let data=await findRecording(signal);
        if(signal.aborted)return;
        if(!data) {
          if(document.querySelector('meta[name="narration-mode"][content="static"]') || !['localhost','127.0.0.1','[::1]'].includes(location.hostname))throw new Error('The recorded audio has not been included with this website.');
          const response=await fetch('/api/narration/status',{signal});
          if(!response.ok)throw new Error('Audio is unavailable here. Include the recorded audio files, or start the local narrator.');
          try{data=await response.json();}catch{throw new Error('Audio is unavailable here. Include the recorded audio files, or start the local narrator.');}
        }
        if(destroyed || !opened || signal.aborted)return;
        ready=!!data.ready;
        if(Array.isArray(data.voices) && data.voices.length){ const selected=voice.value; voice.replaceChildren(...data.voices.map(v=>el('option',{value:v.id,title:v.name||v.id},(v.name||v.id).split(' · ')[0]))); if(data.voices.some(v=>v.id===selected))voice.value=selected; }
        if(!ready){
          if(data.state==='loading'){setState('loading',data.message || 'Warming up the natural voice…');statusTimer=setTimeout(checkStatus,1500);return;}
          wantsPlay=false;setState('error',data.message || 'The natural voice is not ready yet. Start the local narrator, then press Retry.');return;
        }
        await start(index);
      }catch(error){if(destroyed || !opened || error.name==='AbortError')return; wantsPlay=false;setState('error',error.message || 'Narration is unavailable. Please retry.');}
    }
    function visibleIndex() {
      const bottom=opened?player.getBoundingClientRect().top:innerHeight;
      const visible=passages.findIndex(p=>{const r=p.element.getBoundingClientRect();return r.bottom>130 && r.top<bottom;});
      return visible<0?0:visible;
    }
    function stop() {
      clearTimeout(paragraphClickTimer);
      paragraphStarts.forEach((_, element) => element.classList.remove('narration-seekable-passage'));
      opened=false; wantsPlay=false; generation++; clearTimeout(statusTimer); mainAbort?.abort();prefetchControllers.forEach(controller=>controller.abort());prefetchControllers.clear();statusAbort?.abort(); pending.clear();
      audio.pause();audio.removeAttribute('src');audio.load();current=null;cancelAnimationFrame(frame);clearHighlight();
      player.hidden=true;launch.setAttribute('aria-expanded','false');document.body.classList.remove('narration-open');
    }
    launch.addEventListener('click',()=>{
      if(opened){play.focus();return;}
      passages ||= extract(prose); if(!passages.length)return;
      if (!paragraphStarts.size) passages.forEach((passage, i) => {
        if (passage.element.tagName === 'P' && !paragraphStarts.has(passage.element)) paragraphStarts.set(passage.element, i);
      });
      paragraphStarts.forEach((_, element) => element.classList.add('narration-seekable-passage'));
      opened=true; player.hidden=false; launch.setAttribute('aria-expanded','true');document.body.classList.add('narration-open');
      index=visibleIndex(); wantsPlay=true; setFollow(true); play.focus({preventScroll:true}); checkStatus();
    });
    function pausePlayback() {
      clearTimeout(paragraphClickTimer);
      if (!opened || destroyed) return;
      wantsPlay=false; audio.pause(); cancelAnimationFrame(frame);
      setState('paused',current?'Paused. Pick up where you left off.':'Paused. This passage is still being prepared.');
    }
    prose.addEventListener('course-reading-dialog-open',pausePlayback);
    player.addEventListener('click',async event=>{
      clearTimeout(paragraphClickTimer);
      const action=event.target.closest('[data-action]')?.dataset.action;
      if(action==='settings'){settings.hidden=!settings.hidden;settingsToggle.setAttribute('aria-expanded',String(!settings.hidden));lastWord=-1;}
      if(action==='close'){stop();launch.focus({preventScroll:true});}
      if(action==='follow')setFollow(!follow);
      if(action==='previous' || action==='next'){wantsPlay=true;start(index+(action==='next'?1:-1));}
      if(action==='here'){wantsPlay=true;setFollow(true);start(visibleIndex());}
      if(action==='play'){
        if(wantsPlay)pausePlayback();
        else{wantsPlay=true;if(!ready)checkStatus();else if(!current)start(index);else try{await audio.play();if(destroyed || !opened || !wantsPlay)return;setState('playing','Playing · '+(follow?'Following the spoken word.':'Automatic scrolling is paused.'));tick();}catch{if(destroyed || !opened || !wantsPlay)return;wantsPlay=false;setState('error','Audio could not start. Press Retry.');}}
      }
    });
    player.addEventListener('keydown',event=>{
      if(event.key==='Escape' && !event.target.closest('select')){event.preventDefault();stop();launch.focus({preventScroll:true});}
    });
    seek.addEventListener('input',()=>{if(current){audio.currentTime=Number(seek.value);lastWord=-1;cancelAnimationFrame(frame);tick();}});
    rate.addEventListener('change',()=>{audio.playbackRate=Number(rate.value);});
    voice.addEventListener('change',()=>{prefetchControllers.forEach(controller=>controller.abort());prefetchControllers.clear();pending.clear();if(ready)start(index);});
    audio.addEventListener('ended',()=>{if(destroyed || !opened || !wantsPlay)return; if(index<passages.length-1)start(index+1);else{wantsPlay=false;clearHighlight();setState('paused','Chapter complete. Take a moment to let it settle.');}});
    audio.addEventListener('error',()=>{if(destroyed || !opened || !current)return;wantsPlay=false;cancelAnimationFrame(frame);setState('error','Saved audio could not be played. Try another passage or retry.');current=null;});
    const manual=event=>{clearTimeout(paragraphClickTimer);if(event.target.closest?.('.narration-player'))return;if(opened && follow)setFollow(false,true);};
    const key=event=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key) && !event.target.closest('input,select,textarea,button,[contenteditable="true"]'))manual(event);};
    const anchor=event=>{if(event.target.closest('a[href^="#"]'))manual(event);};
    // One delegated listener keeps ordinary paragraphs as selectable text, not thousands of controls.
    const paragraphClick = event => {
      clearTimeout(paragraphClickTimer);
      if (!opened || destroyed || event.defaultPrevented || event.button !== 0 || event.detail > 1 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      if (!target || target.closest('a,button,input,select,textarea,label,summary,[role=button],[role=link],[contenteditable],code,pre,table,.table-scroll,.widget,.section-figure,.reference-content,[hidden],[aria-hidden="true"]')) return;
      const paragraph = target.closest('p');
      if (!paragraph || !paragraphStarts.has(paragraph) || !document.getSelection()?.isCollapsed) return;
      // Give double-click word selection a chance to finish before seeking.
      paragraphClickTimer = setTimeout(() => {
        if (!opened || destroyed || !paragraph.isConnected || !document.getSelection()?.isCollapsed) return;
        wantsPlay = true; setFollow(true); index = paragraphStarts.get(paragraph);
        if (ready) start(index);
        else if (player.dataset.state === 'error') checkStatus();
      }, 250);
    };
    prose.addEventListener('click', paragraphClick);
    window.addEventListener('wheel',manual,{passive:true});window.addEventListener('touchmove',manual,{passive:true});window.addEventListener('keydown',key);document.addEventListener('click',anchor);
    setState('idle');
    return ()=>{stop();destroyed=true;prose.removeEventListener('course-reading-dialog-open',pausePlayback);prose.removeEventListener('click',paragraphClick);paragraphStarts.clear();window.removeEventListener('wheel',manual);window.removeEventListener('touchmove',manual);window.removeEventListener('keydown',key);document.removeEventListener('click',anchor);launch.remove();player.remove();cache.clear();};
  }
  window.CourseNarration={mount,extract,rangeFor};
})();
