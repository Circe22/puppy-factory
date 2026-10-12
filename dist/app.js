import {PARTS,ACCESSORIES,NEW_PARTS,FRESH_LOOKS,DEFAULT,cloneState,values,compose,randomState,readFavorites,writeFavorites,copyText} from './model.js?v=4';
import {RECENT_KEY,EYE_MOODS,readRecent,usePart,writeRecent,partTray,clearFace,compactDock,anchorTop} from './picker.js?v=4';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state=cloneState(DEFAULT),filter='全部小狗',counter=1,toastTimer,gallery=[],history=[],storage;
try{storage=localStorage}catch{}
let favorites=readFavorites(storage);
let recent=readRecent(storage);
const trays=new Map();
const categories=['新到表情','全部小狗','垂耳小狗','软团小狗','小恶魔','小天使','开心','撒娇','困困','委屈'];
const customKeys={ears:['left','right'],eyes:['eyeLeft','eyeRight'],mouth:['mouth'],decor:['prefix','suffix']};
const names={left:'左耳',right:'右耳',eyeLeft:'左眼',eyeRight:'右眼',mouth:'嘴巴',prefix:'前面的小装饰',suffix:'后面的小装饰'};
const labels={eyes:'选择眼睛',mouth:'选择嘴巴',ears:'换一对小耳朵',decor:'腮红与小装饰'};
const looks=[
 {name:'委屈小狗',state:{...cloneState(DEFAULT),eyes:12,mouth:6}},
 {name:'小恶魔',state:{...cloneState(DEFAULT),accessories:{horns:1,tail:0,wings:0}}},
 {name:'摇尾小恶魔',state:{...cloneState(DEFAULT),accessories:{horns:1,tail:1,wings:0}}},
 {name:'扑扇小天使',state:{...cloneState(DEFAULT),ears:8,eyes:13,mouth:9,decor:0,accessories:{horns:0,tail:0,wings:1}}},
 {name:'天使小狗',state:{...cloneState(DEFAULT),eyes:3,accessories:{horns:0,tail:0,wings:2}}},
 {name:'困困抱抱',state:{...cloneState(DEFAULT),eyes:4,mouth:3,decor:11}}
];
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n}
function button(cls,text,fn){const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b}
function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2400)}
function checkpoint(){history.push(cloneState(state));if(history.length>40)history.shift()}
function rememberPart(key,index){recent=usePart(recent,key,index);writeRecent(storage,recent)}
function change(fn,{remember=true}={}){const previous=cloneState(state);checkpoint();fn();if(remember){for(const k of Object.keys(PARTS))if(previous[k]!==state[k])rememberPart(k,state[k]);for(const k of Object.keys(ACCESSORIES))if(previous.accessories[k]!==state.accessories[k])rememberPart(k,state.accessories[k])}render();syncCustom()}
const hasSaved=s=>favorites.some(x=>compose(x)===compose(s));
function save(s){const t=compose(s),next=hasSaved(s)?favorites.filter(x=>compose(x)!==t):[cloneState(s),...favorites];if(next.length>500){toast('小狗窝已经住满 500 只啦');return}if(!writeFavorites(storage,next)){toast('浏览器无法保存收藏，请允许本地存储后再试');return}const added=next.length>favorites.length;favorites=next;renderSaved();renderGallery();renderFavorites();toast(added?'♡ 小狗住进收藏夹啦':'已从收藏中移出')}
async function copy(s){const text=compose(s);const method=await copyText(text,navigator,document);if(method==='manual'){$('#copy-text').value=text;$('#manual-copy').showModal();$('#copy-text').focus();$('#copy-text').select()}else toast('复制好啦！把小狗带去聊天吧 ♡')}
function renderSaved(){$('#favorite-count').textContent=favorites.length;$('#save').setAttribute('aria-pressed',String(hasSaved(state)));$('#save').textContent=hasSaved(state)?'♥ 已收藏':'♡ 收藏';$$('.nav-item').forEach(b=>{if(b.dataset.view==='favorites')b.setAttribute('aria-label',`我的收藏，${favorites.length}只小狗`)})}
function render(){
 const currentSpace=state.spacing??PARTS.ears[state.ears].spacing??(PARTS.ears[state.ears].family==='classic'?'':' ');$$('[data-spacing]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.spacing===currentSpace)));
 const text=compose(state);$('#puppy').textContent=text;$('#puppy').classList.toggle('long-puppy',Array.from(text).length>27);
 const recipe=['ears','eyes','mouth','decor'].map(k=>PARTS[k][state[k]].name);
 Object.entries(state.accessories||{}).forEach(([k,v])=>{if(v)recipe.push(ACCESSORIES[k][v].name)});
 $('#recipe').textContent=state.custom.eyeLeft===''&&state.custom.eyeRight===''&&state.custom.mouth===''?'空脸小狗 · 等待你选零件':recipe.join(' / ')+(Object.keys(state.custom).length?' · 自定义':'');
 $('#puppy-caption').textContent=state.custom.eyeLeft===''&&state.custom.eyeRight===''&&state.custom.mouth===''?'空空的小狗脸，重新捏一只吧':state.accessories.wings?'天使小狗正在扑扇翅膀':state.accessories.horns?'今天也是可爱的小恶魔':PARTS.eyes[state.eyes].mood==='困困'?'小狗困困，陪你慢慢休息':'这一只，是你的独家小狗';
 $('#puppy-number').textContent=String(counter).padStart(3,'0');$('#undo').disabled=!history.length;
 $$('[data-family]').forEach(b=>b.setAttribute('aria-pressed',String(PARTS.ears[state.ears].family===b.dataset.family)));
 $$('[data-choice]').forEach(b=>{const k=b.dataset.choice;b.setAttribute('aria-pressed',String(state[k]===Number(b.dataset.index)&&!customKeys[k].some(x=>Object.hasOwn(state.custom,x))))});
 $$('[data-accessory]').forEach(b=>b.setAttribute('aria-pressed',String((state.accessories[b.dataset.accessory]||0)===Number(b.dataset.index))));
 updateTrays();renderSaved();
}
function sample(k,x){if(k==='ears')return x.v[0]+'◦'+x.v[1];if(k==='eyes')return x.v[0]+' '+x.v[1];if(k==='mouth')return x.v;return x.v.join('')||'—'}
function buildFamilies(){[['classic','U・ﻌ・U','垂耳小狗'],['soft','૮₍ ˶• ﻌ •˶ ₎ა','软团小狗']].forEach(([family,face,name])=>{const b=button('family-option','',()=>change(()=>{state.ears=family==='classic'?0:1;delete state.custom.left;delete state.custom.right;rememberPart('ears',state.ears)}));b.dataset.family=family;b.append(el('span','kaomoji',face),el('small','',name));$('#families').append(b)})}
function buildCustom(k){const details=el('details','custom-editor');details.append(el('summary','','自己输入'+(k==='decor'?'前后装饰':labels[k].replace('选择','').replace('换一对小',''))));const grid=el('div','custom-fields');customKeys[k].forEach(key=>{const label=el('label','',names[key]);const input=el('input');input.type='text';input.dir='ltr';input.dataset.custom=key;input.setAttribute('aria-label',names[key]+'自定义');input.autocomplete='off';input.spellcheck=false;input.addEventListener('focus',checkpoint);input.addEventListener('input',()=>{state.custom[key]=Array.from(input.value.replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/gu,'')).slice(0,16).join('');render()});label.append(input);grid.append(label)});details.append(grid);return details}
function syncCustom(){const v=values(state);$$('[data-custom]').forEach(input=>input.value=v[input.dataset.custom])}
function updateTray(tray){
 const result=partTray(tray.key,{recent,expanded:tray.expanded,query:tray.query,mood:tray.mood});
 const visible=new Set(result.visible),order=[...result.visible,...tray.buttons.keys()].filter((x,i,a)=>a.indexOf(x)===i);
 const focused=document.activeElement;
 if(tray.lastOrder!==order.join(',')){tray.grid.append(...order.map(i=>tray.buttons.get(i)));tray.lastOrder=order.join(',')}
 tray.buttons.forEach((b,i)=>{b.hidden=!visible.has(i);b.classList.toggle('recent-choice',(recent[tray.key]||[]).includes(i));b.title=((recent[tray.key]||[]).includes(i)?'最近使用 · ':'')+tray.items[i].name});
 tray.count.textContent=`${result.visible.length} / ${result.total} 个零件`;
 tray.empty.hidden=result.total>0;tray.toggle.hidden=!result.hasMore;tray.toggle.textContent=tray.expanded?'收起，只看常用 ▴':'展开全部 ▾';tray.toggle.setAttribute('aria-expanded',String(tray.expanded));
 if(tray.moodHost)[...tray.moodHost.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mood===tray.mood)));
 if(focused&&tray.grid.contains(focused)&&!focused.hidden&&document.activeElement!==focused)focused.focus({preventScroll:true});
}
function updateTrays(){trays.forEach(updateTray)}
function buildPart(k,open=true){
 const section=el(open?'section':'details','picker-section');section.id='picker-'+k;
 const heading=el(open?'div':'summary','picker-heading'),count=el('span');heading.append(el('h3','',labels[k]),count);section.append(heading);
 const grid=el('div','choices expanded-choices');grid.id='choices-'+k;
 const empty=el('p','part-empty','没有找到，试试换个名字，或展开下方自定义。');empty.hidden=true;
 const tray={key:k,grid,count,empty,expanded:false,query:'',mood:'常用',buttons:new Map(),items:PARTS[k]};
 if(k==='eyes'){
  const moods=el('div','mood-tabs');moods.setAttribute('aria-label','眼睛心情');
  for(const mood of ['常用',...Object.keys(EYE_MOODS)]){const b=button('mood-chip',mood,()=>{tray.mood=mood;tray.expanded=false;tray.query='';tray.search.value='';updateTray(tray)});b.dataset.mood=mood;moods.append(b)}
  tray.moodHost=moods;section.append(moods);
 }
 if(k==='eyes'||k==='mouth'){
  const search=el('input','part-search');search.type='search';search.placeholder=k==='eyes'?'搜名字或符号：≖、困困、眼泪…':'搜名字或符号：小舌头、猫鼻…';search.setAttribute('aria-label','搜索'+labels[k]);
  search.addEventListener('input',()=>{tray.query=search.value;tray.expanded=false;updateTray(tray)});tray.search=search;section.append(search);
 }
 PARTS[k].forEach((x,i)=>{
  const b=button('choice','',()=>change(()=>{state[k]=i;customKeys[k].forEach(key=>delete state.custom[key]);rememberPart(k,i)}));
  b.dataset.choice=k;b.dataset.index=i;b.setAttribute('aria-label',labels[k]+'：'+x.name);b.append(el('span','kaomoji',sample(k,x)),el('small','',x.name));tray.buttons.set(i,b);
 });
 tray.toggle=button('expand-parts','展开全部 ▾',()=>{tray.expanded=!tray.expanded;updateTray(tray)});tray.toggle.setAttribute('aria-controls',grid.id);
 trays.set(k,tray);section.append(empty,grid,tray.toggle,buildCustom(k));return section;
}
function buildAccessories(){
 const section=el('section','picker-section accessory-section');section.id='picker-accessories';const h=el('div','picker-heading');h.append(el('h3','','角、尾巴与翅膀'),el('span','','三种可以一起戴'));section.append(h);
 for(const [key,label]of[['horns','小恶魔角'],['tail','小尾巴'],['wings','天使翅膀']]){
  const row=el('fieldset','accessory-row'),legend=el('legend','',label),count=el('span','accessory-count');legend.append(count);row.append(legend);
  const grid=el('div','accessory-choices');grid.id='choices-'+key;const empty=el('p','part-empty');empty.hidden=true;
  const tray={key,grid,count,empty,expanded:false,query:'',mood:'常用',buttons:new Map(),items:ACCESSORIES[key]};
  ACCESSORIES[key].forEach((x,i)=>{const b=button('choice accessory-choice','',()=>change(()=>{const selected=state.accessories[key]===i?0:i;state.accessories[key]=selected;rememberPart(key,selected)}));b.dataset.accessory=key;b.dataset.index=i;b.setAttribute('aria-label',x.name);b.append(el('span','kaomoji',i===0?'—':Array.isArray(x.v)?x.v.join(' ◦ '):x.v.trim()),el('small','',x.name));tray.buttons.set(i,b)});
  tray.toggle=button('expand-parts','展开全部 ▾',()=>{tray.expanded=!tray.expanded;updateTray(tray)});tray.toggle.setAttribute('aria-controls',grid.id);trays.set(key,tray);row.append(grid,tray.toggle);section.append(row);
 }
 return section;
}
function buildControls(){buildFamilies();FRESH_LOOKS.forEach(look=>{const b=button('preset fresh-preset','',()=>change(()=>{state=cloneState(look.state);counter++}));b.append(el('span','kaomoji',compose(look.state)),el('small','',look.name));$('#fresh-presets').append(b)});$$('[data-spacing]').forEach(b=>b.addEventListener('click',()=>change(()=>{state.spacing=b.dataset.spacing}))); looks.forEach(look=>{const b=button('preset','',()=>change(()=>{state=cloneState(look.state);counter++}));b.append(el('span','kaomoji',compose(look.state)),el('small','',look.name));$('#presets').append(b)});const earDecor=el('section','ear-decor-group');earDecor.id='picker-ears-and-decor';earDecor.append(buildPart('ears',false),buildPart('decor',false));$('#all-parts').append(buildPart('eyes'),buildPart('mouth'),buildAccessories(),earDecor);}
function card(s){const text=compose(s),saved=hasSaved(s);const c=el('article','puppy-card');const top=el('div','card-portrait');const saveBtn=button('card-save',saved?'♥':'♡',()=>save(s));saveBtn.setAttribute('aria-label',(saved?'取消收藏 ':'收藏 ')+text);saveBtn.setAttribute('aria-pressed',String(saved));const face=el('span','kaomoji card-puppy',text);face.dir='ltr';if(Array.from(text).length>25)face.style.fontSize='16px';top.append(face,saveBtn);const bottom=el('div','card-bottom');const name=el('span','card-name',s.accessories?.wings?'天使小狗':s.accessories?.horns?'恶魔小狗':PARTS.eyes[s.eyes].mood+'小狗');name.append(el('small','',PARTS.ears[s.ears].family==='classic'?'垂耳系':'软团系'));const actions=el('div','card-actions');actions.append(button('','捏捏',()=>{change(()=>{state=cloneState(s);counter++});showView('studio');$('.workbench').scrollIntoView({behavior:'smooth',block:'start'})}),button('','复制',()=>copy(s)));bottom.append(name,actions);c.append(top,bottom);return c}
function matches(s){return filter==='新到表情'&&FRESH_LOOKS.some(x=>compose(x.state)===compose(s))||filter==='全部小狗'||filter==='垂耳小狗'&&PARTS.ears[s.ears].family==='classic'||filter==='软团小狗'&&PARTS.ears[s.ears].family==='soft'||filter==='小恶魔'&&s.accessories?.horns>0||filter==='小天使'&&s.accessories?.wings>0||PARTS.eyes[s.eyes].mood===filter}
function renderGallery(){$('#gallery').replaceChildren(...gallery.filter(matches).slice(0,12).map(card))}
function newRandom(family=null,mood=null){const s=cloneState(randomState(family,mood));for(const k of Object.keys(ACCESSORIES))s.accessories[k]=Math.random()<.25?1+Math.floor(Math.random()*(ACCESSORIES[k].length-1)):0;return s}
function refreshGallery(){gallery=[...FRESH_LOOKS.map(x=>cloneState(x.state)),...looks.map(x=>cloneState(x.state)),cloneState(DEFAULT),cloneState({ears:0,eyes:1,mouth:0,decor:0,custom:{}}),...['开心','撒娇','困困','委屈'].flatMap(mood=>Array.from({length:8},(_,i)=>newRandom(i%2?'classic':'soft',mood)))];const family=filter==='垂耳小狗'?'classic':filter==='软团小狗'?'soft':null;const mood=['开心','撒娇','困困','委屈'].includes(filter)?filter:null;for(let i=0;i<12;i++){const s=newRandom(family,mood);if(filter==='小恶魔')s.accessories.horns=1+Math.floor(Math.random()*4);if(filter==='小天使')s.accessories.wings=1+Math.floor(Math.random()*5);gallery.push(s)}const seen=new Set();gallery=gallery.filter(s=>{const t=compose(s);if(seen.has(t))return false;seen.add(t);return true});renderGallery()}
function renderFilters(){$('#filters').replaceChildren();categories.forEach(name=>{const b=button('filter',name,()=>{filter=name;renderFilters();refreshGallery()});b.setAttribute('aria-pressed',String(filter===name));$('#filters').append(b)})}
function renderFavorites(){$('#favorite-grid').replaceChildren(...favorites.map(card));$('#empty-favorites').hidden=!!favorites.length}
function showView(view){$('#studio').hidden=view!=='studio';$('#favorites').hidden=view!=='favorites';$$('.nav-item').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);if(b.dataset.view===view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});if(view==='favorites')renderFavorites()}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
$('.brand').addEventListener('click',e=>{e.preventDefault();showView('studio');window.scrollTo({top:0,behavior:'smooth'})});
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>jumpToPart(b.dataset.jump)));
$('#copy').addEventListener('click',()=>copy(state));$('#save').addEventListener('click',()=>save(state));
$('#random').addEventListener('click',()=>{change(()=>{state=newRandom();counter++});toast('叮！一只新小狗诞生了')});
$('#reset').addEventListener('click',()=>{change(()=>state=clearFace(state),{remember:false});toast('搭配已清空，点一下撤回就能找回来')});
$('#undo').addEventListener('click',()=>{if(history.length){state=history.pop();render();syncCustom()}});
$('#more').addEventListener('click',()=>{refreshGallery();toast('新的一窝小狗来啦')});$('#close-dialog').addEventListener('click',()=>$('#manual-copy').close());
window.addEventListener('storage',e=>{if(e.key==='puppy-factory:favorites'||e.key===null){favorites=readFavorites(storage);renderSaved();renderGallery();renderFavorites()}if(e.key===RECENT_KEY||e.key===null){recent=readRecent(storage);updateTrays()}});


const mobileScreen=matchMedia('(max-width: 720px)');
let dockFrame=0;
function updateDock(){
 const dock=$('#preview-dock'),workbench=$('.workbench');
 dock.classList.toggle('is-compact',compactDock({mobile:mobileScreen.matches,workbenchTop:workbench.getBoundingClientRect().top,wasCompact:dock.classList.contains('is-compact')}));
 const height=dock.getBoundingClientRect().height;document.documentElement.style.setProperty('--puppy-dock-height',height+'px');
 const limit=mobileScreen.matches?height+18:36;let active=null;
 for(const id of ['eyes','mouth','accessories','ears-and-decor']){if($('#picker-'+id).getBoundingClientRect().top<=limit)active=id}
 $$('[data-jump]').forEach(b=>{if(b.dataset.jump===active)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current')});
}
function queueDock(){if(!dockFrame)dockFrame=requestAnimationFrame(()=>{dockFrame=0;updateDock()})}
function jumpToPart(id){
 const target=$('#picker-'+id);if(id==='ears-and-decor')target.querySelectorAll('details.picker-section').forEach(d=>d.open=true);
 if(mobileScreen.matches)$('#preview-dock').classList.add('is-compact');
 const height=$('#preview-dock').getBoundingClientRect().height;
 window.scrollTo({top:anchorTop(target.getBoundingClientRect().top,window.scrollY,height,mobileScreen.matches),behavior:'auto'});
 target.tabIndex=-1;target.focus({preventScroll:true});queueDock();
}
function setupDock(){
 window.addEventListener('scroll',queueDock,{passive:true});window.addEventListener('resize',queueDock,{passive:true});mobileScreen.addEventListener('change',queueDock);
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(queueDock).observe($('#preview-dock'));
 document.fonts?.ready.then(queueDock);updateDock();
}

buildControls();render();syncCustom();renderFilters();refreshGallery();showView('studio');setupDock();
