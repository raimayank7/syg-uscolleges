(function(){'use strict';
var d=document,S=window.SYG,$=function(s){return d.querySelector(s)};
var f=$('[data-filter]');
if(f){var rows=[].slice.call(d.querySelectorAll(f.getAttribute('data-filter'))),none=$('[data-none]'),sel=$('[data-type]');
 var go=function(){var q=f.value.trim().toLowerCase(),t=sel?sel.value:'',n=0;rows.forEach(function(r){var hit=(!q||(r.getAttribute('data-k')||r.textContent).toLowerCase().indexOf(q)>-1)&&(!t||r.getAttribute('data-t')===t);r.hidden=!hit;if(hit)n++});if(none)none.hidden=n>0};
 f.addEventListener('input',go);if(sel)sel.addEventListener('change',go)}
var box=$('#uc-q');
if(box){var out=$('#uc-out'),J=null,want=false;
 var run=function(){var q=box.value.trim().toLowerCase();if(q.length<2){out.innerHTML='';return}if(!J){out.innerHTML='<div class="shim"></div>';return}
  var words=q.split(/\s+/),hits=J.filter(function(j){var t=(j[0]+' '+j[2]+' '+j[3]).toLowerCase();return words.every(function(w){return t.indexOf(w)>-1})});
  hits.sort(function(a,b){var x=a[0].toLowerCase().indexOf(words[0]),y=b[0].toLowerCase().indexOf(words[0]);return (x<0?99:x)-(y<0?99:y)||b[4]-a[4]});
  out.innerHTML=hits.length?'<ul class="uc-list">'+hits.slice(0,15).map(function(j){return '<li><a href="/college/'+j[1]+'/">'+S.esc(j[0])+'<span>'+S.esc(j[2])+', '+j[3]+'</span></a></li>'}).join('')+'</ul>'+(hits.length>15?'<p class="hint">'+hits.length+' matches. Add the city or state letters to narrow the list.</p>':''):'<p class="uc-empty">No college matches "'+S.esc(box.value.trim())+'". Try part of the name, or browse by <a href="/state/">state</a>. Schools that only give certificates are not on this site.</p>'};
 var load=function(){if(want)return;want=true;S.json('/data/colleges.json').then(function(j){J=j;run()})};
 box.addEventListener('focus',load);box.addEventListener('input',function(){load();run()})}
/* saved colleges, kept in this browser only */
var KEY='uc-saved',get=function(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}},put=function(l){try{localStorage.setItem(KEY,JSON.stringify(l))}catch(e){}};
var sb=$('[data-save]');
if(sb){var me={u:location.pathname,t:sb.getAttribute('data-save')},paint=function(){var on=get().some(function(x){return x.u===me.u});sb.textContent=on?'Saved. Tap to remove':'Save this college';sb.setAttribute('aria-pressed',on)};
 sb.addEventListener('click',function(){var l=get(),on=l.some(function(x){return x.u===me.u});l=on?l.filter(function(x){return x.u!==me.u}):[me].concat(l).slice(0,30);put(l);paint();S.toast(on?'Removed from your list':'Saved in this browser')});paint()}
var sl=$('#uc-saved');
if(sl){var l=get();if(l.length){sl.hidden=false;sl.innerHTML='<h2>Your saved colleges</h2><ul class="uc-list">'+l.map(function(x){return '<li><a href="'+S.esc(x.u)+'">'+S.esc(x.t)+'<span>saved</span></a></li>'}).join('')+'</ul>'}}
})();