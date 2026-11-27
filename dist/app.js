import {earSegments,PARTS,ACCESSORIES,NEW_PARTS,FRESH_LOOKS,ANIMALS,ANIMAL_LOOKS,animalForEar,randomAnimalState,DEFAULT,cloneState,values,composeParts,compose,readFavorites,writeFavorites,copyText,STASH_SLOTS,readMyParts,writeMyParts,addMyPart,removeMyPart,stashSample,applyMyPart,sprinkleMyParts,randomSides,flipSide,currentSide,decorSideOf,reorderVisible} from './model.js?v=35';
import {drawShareCard,SHARE_URL} from './share.js?v=4';
import {RECENT_KEY,EYE_MOODS,readRecent,usePart,writeRecent,partTray,clearFace,compactDock,anchorTop} from './picker.js?v=39';
import {LANGUAGE_KEY,translate,readLanguage,writeLanguage} from './i18n.js?v=36';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let state=cloneState(DEFAULT),filter='全部团子',counter=1,toastTimer,gallery=[],history=[],storage;
try{storage=localStorage}catch{}
let language=readLanguage(storage);
const textBindings=new Map(),attributeBindings=new Map();
function setText(node,value){const source=String(value);const literal=node.classList.contains('kaomoji')||node.id==='puppy';node.textContent=literal?source:translate(source,language);if(!literal&&node.firstChild)textBindings.set(node.firstChild,source)}
function localizedAttr(node,name,value){const source=String(value);node.setAttribute(name,translate(source,language));if(!attributeBindings.has(node))attributeBindings.set(node,new Map());attributeBindings.get(node).set(name,source)}
function bindStaticText(){
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
 while((node=walker.nextNode())){if(/\p{Script=Han}/u.test(node.data)&&!node.parentElement.closest('.kaomoji,.agent-text,script,style,[data-language]'))textBindings.set(node,node.data)}
 document.querySelectorAll('[aria-label],[placeholder],[title]').forEach(node=>{for(const name of ['aria-label','placeholder','title'])if(node.hasAttribute(name))localizedAttr(node,name,node.getAttribute(name))});
}
function applyLanguage(){
 for(const [node,source]of textBindings){if(node.isConnected)node.data=translate(source,language);else textBindings.delete(node)}
 for(const [node,attrs]of attributeBindings){if(!node.isConnected){attributeBindings.delete(node);continue}for(const [name,source]of attrs)node.setAttribute(name,translate(source,language))}
 document.documentElement.lang=language==='en'?'en':'zh-CN';document.documentElement.dataset.language=language;
 document.title=translate('字字兽 · 颜文字团子工厂',language);
 document.querySelector('meta[name="description"]').content=translate('捏一只属于你的字字兽。选小狗、小猫、兔兔或更多小动物，自由拼装颜文字。',language);
 $$('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===language)));queueDock();
}
let favorites=readFavorites(storage);
let recent=readRecent(storage);
let mine=readMyParts(storage);
const trays=new Map();
const categories=['全部团子',...ANIMALS.map(x=>x.name),'新到表情','小恶魔','小天使','开心','撒娇','困困','委屈'];
const customKeys={ears:['left','right','leftOuter','leftFrame','leftInner','rightInner','rightFrame','rightOuter'],eyes:['eyeLeft','eyeRight'],mouth:['mouth'],decor:['prefix','suffix','blushLeft','blushRight']};
const accessorySlots={horns:['hornLeft','hornRight'],wings:['wingLeft','wingRight'],tail:['tail'],hands:['handLeft','handRight']};
const names={left:'左耳',right:'右耳',eyeLeft:'左眼',eyeRight:'右眼',mouth:'嘴巴',prefix:'前面的小装饰',suffix:'后面的小装饰',leftOuter:'左外耳',handLeft:'左手',handRight:'右手',leftFrame:'左脸边',leftInner:'左内侧',rightInner:'右内侧',rightFrame:'右脸边',rightOuter:'右外耳',blushLeft:'左腮红',blushRight:'右腮红',hornLeft:'左角',hornRight:'右角',wingLeft:'左翅膀',wingRight:'右翅膀',tail:'尾巴'};
const labels={eyes:'选择眼睛',mouth:'选择嘴巴',ears:'换一对小耳朵',decor:'腮红与小装饰'};
const looks=[
 {name:'委屈小狗',state:{...cloneState(DEFAULT),eyes:12,mouth:6}},
 {name:'小恶魔',state:{...cloneState(DEFAULT),accessories:{horns:1,tail:0,wings:0}}},
 {name:'摇尾小恶魔',state:{...cloneState(DEFAULT),accessories:{horns:1,tail:1,wings:0}}},
 {name:'扑扇小天使',state:{...cloneState(DEFAULT),ears:8,eyes:13,mouth:9,decor:0,accessories:{horns:0,tail:0,wings:1}}},
 {name:'天使小狗',state:{...cloneState(DEFAULT),eyes:3,accessories:{horns:0,tail:0,wings:2}}},
 {name:'困困抱抱',state:{...cloneState(DEFAULT),eyes:4,mouth:3,decor:0,accessories:{horns:0,tail:0,wings:0,hands:7}}}
];
function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;/* 拾 11-23：浏览器翻译会把 ó ò 翻成「哦」，颜文字一律不让翻 */if(cls&&/\bkaomoji\b|card-puppy/.test(cls))n.translate=false;if(text!==undefined)setText(n,text);return n}
function button(cls,text,fn){const b=el('button',cls,text);b.type='button';b.addEventListener('click',fn);return b}
function toast(message,tone=''){setText($('#toast'),message);$('#toast').classList.toggle('toast-pink',tone==='pink');$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2400)}
function checkpoint(){history.push(cloneState(state));if(history.length>40)history.shift()}
function rememberPart(key,index){recent=usePart(recent,key,index);writeRecent(storage,recent)}
function change(fn,{remember=true}={}){const previous=cloneState(state);checkpoint();fn();if(remember){for(const k of Object.keys(PARTS))if(previous[k]!==state[k])rememberPart(k,state[k]);for(const k of Object.keys(ACCESSORIES))if(previous.accessories[k]!==state.accessories[k])rememberPart(k,state.accessories[k])}render();syncCustom()}
const hasSaved=s=>favorites.some(x=>compose(x)===compose(s));
function save(s){const t=compose(s),next=hasSaved(s)?favorites.filter(x=>compose(x)!==t):[cloneState(s),...favorites];if(next.length>500){toast('团子小窝已经住满 500 只啦');return}if(!writeFavorites(storage,next)){toast('浏览器无法保存收藏，请允许本地存储后再试');return}const added=next.length>favorites.length;favorites=next;renderSaved();renderGallery();renderFavorites();toast(added?'♡ 团子住进收藏夹啦':'已从收藏中移出')}
async function copy(s){
 const text=compose(s);
 const method=await copyText(text,navigator,document);
 if(method==='manual'){
  const input=$('#copy-text');
  input.value=text;
  $('#manual-copy').showModal();
  input.focus();
  input.select();
 }else toast('复制好啦！把团子带去聊天吧 ♡');
 return method;
}
function renderSaved(){$('#favorite-count').textContent=favorites.length;$('#save').setAttribute('aria-pressed',String(hasSaved(state)));setText($('#save'),hasSaved(state)?'♥ 已收藏':'♡ 收藏');$$('.nav-item').forEach(b=>{if(b.dataset.view==='favorites')localizedAttr(b,'aria-label',`我的收藏，${favorites.length}只团子`)})}
let renderedFaceParts,renderedFaceKeys,highlightTimer;
// 拾 11-23：随机、一键穿搭、新到的小表情、集合里的「捏捏」、清空，都是整只换掉，不需要标出哪里变了，所以跳过强调。
let quietFace=false;
function renderFace(){
 const quiet=quietFace;quietFace=false;
 const parts=composeParts(state);
 const partKeys=parts.map(([k])=>k).join();/* 拖动只换顺序、字不变时也要重画 */
 if(renderedFaceParts?.size===parts.length&&renderedFaceKeys===partKeys&&parts.every(([key,text])=>renderedFaceParts.get(key)===text))return;

 const preview=document.createDocumentFragment();
 for(const [key,text] of parts){
  // Ignore padding-only differences, such as the spaces trimmed when putting on horns.
  if(!quiet&&renderedFaceParts&&(renderedFaceParts.get(key)??'').trim()!==text.trim()){
   const mark=el('span','preview-change');
   mark.dataset.part=key;
   mark.textContent=text;
   preview.append(mark);
  }else preview.append(text);
 }
 preview.normalize();
 const face=$('#puppy-text');
 face.replaceChildren(preview.cloneNode(true));
 $('#slot-preview').replaceChildren(preview);
 $('#puppy').classList.toggle('long-puppy',Array.from(face.textContent).length>27);
 renderedFaceParts=new Map(parts);renderedFaceKeys=partKeys;

 clearTimeout(highlightTimer);
 if(face.querySelector('.preview-change')){
  highlightTimer=setTimeout(()=>$$('.preview-change').forEach(mark=>mark.classList.remove('preview-change')),1600);
 }
}
function render(){
 const currentSpace=state.spacing??PARTS.ears[state.ears].spacing??(PARTS.ears[state.ears].family==='classic'?'':' ');$$('[data-spacing]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.spacing===currentSpace)));
 renderFace();
 const recipe=['ears','eyes','mouth','decor'].map(k=>PARTS[k][state[k]].name);
 Object.entries(state.accessories||{}).forEach(([k,v])=>{if(v)recipe.push(ACCESSORIES[k][v].name)});
 setText($('#recipe'),state.custom.eyeLeft===''&&state.custom.eyeRight===''&&state.custom.mouth===''?'空脸团子 · 等待你选零件':recipe.join(' / ')+(Object.keys(state.custom).length?' · 自定义':''));
 setText($('#puppy-caption'),state.custom.eyeLeft===''&&state.custom.eyeRight===''&&state.custom.mouth===''?'空空的小脸，重新捏一只吧':state.accessories.wings?'小天使正在扑扇翅膀':state.accessories.horns?'今天也是可爱的小恶魔':PARTS.eyes[state.eyes].mood==='困困'?'团子困困，陪你慢慢休息':'这一只，是你的独家字字兽');
 $('#puppy-number').textContent=String(counter).padStart(3,'0');$('#undo').disabled=!history.length;
 $$('[data-animal]').forEach(b=>b.setAttribute('aria-pressed',String(animalForEar(state.ears)===b.dataset.animal)));
 $$('[data-choice]').forEach(b=>{const k=b.dataset.choice;b.setAttribute('aria-pressed',String(state[k]===Number(b.dataset.index)&&!customKeys[k].some(x=>Object.hasOwn(state.custom,x))))});
 $$('[data-accessory]').forEach(b=>b.setAttribute('aria-pressed',String((state.accessories[b.dataset.accessory]||0)===Number(b.dataset.index))));
 updateTrays();renderSaved();
}
function sample(k,x){if(k==='ears')return x.v[0]+'◦'+x.v[1];if(k==='eyes')return x.v[0]+' '+x.v[1];if(k==='mouth')return x.v;return x.v.join('')||'—'}
function buildFamilies(){ANIMALS.forEach(animal=>{const look=ANIMAL_LOOKS.find(x=>x.id===animal.id);const b=button('family-option','',()=>change(()=>{state.ears=animal.earIndex;delete state.order;customKeys.ears.forEach(k=>delete state.custom[k]);rememberPart('ears',state.ears);/* 狐狸自带爪爪：没戴手时自动配上；换走时只撤掉自动配的那副 */const a=state.accessories;if(autoHands&&a.hands===autoHands&&animal.hands!==autoHands){a.hands=0;autoHands=0}if(animal.hands&&!a.hands){a.hands=animal.hands;autoHands=animal.hands;accessorySlots.hands.forEach(s=>delete state.custom[s])}}));b.dataset.animal=animal.id;localizedAttr(b,'aria-label','捏一只'+animal.name);b.append(el('span','kaomoji',compose(look.state)),el('small','',animal.name));$('#families').append(b)})}
function buildCustom(k){const details=el('details','custom-editor');details.append(el('summary','','自己输入'+(k==='decor'?'前后装饰':labels[k].replace('选择','').replace('换一对小',''))));const grid=el('div','custom-fields');(k==='ears'?['left','right']:customKeys[k]).forEach(key=>{const label=el('label','',names[key]);const input=el('input');input.type='text';input.dir='ltr';input.dataset.custom=key;localizedAttr(input,'aria-label',names[key]+'自定义');input.autocomplete='off';input.spellcheck=false;input.addEventListener('focus',checkpoint);input.addEventListener('input',()=>{state.custom[key]=Array.from(input.value.replace(/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/gu,'')).slice(0,16).join('');render()});label.append(input);grid.append(label)});details.append(grid);return details}
// 2026-11-28 拾：每一格都有一个「塞素材」的地方。只有点了「塞进素材区」才留下来，排在那一格最前面，随机也会抽到。
const stashLists=new Map();
// 2026-11-28 拾：单边的装饰和尾巴，选中后再点一下＝换左右（其他零件仍是「再点一下回到上一个」）。
function doFlip(kind){const f=flipSide(state,kind);if(!f)return false;change(()=>{state=f},{remember:false});toast(currentSide(state,kind)==='left'?'换到左边啦':'换到右边啦');return true}
function flipHint(kind){if(currentSide(state,kind))toast('再点一下，可以换到另一边')}
// 拾 01:16：单边的零件在名字后面用括号写清楚放在哪一边
const STASH_LABELS={tail:'尾巴（后）',prefix:'前面的小装饰（左）',suffix:'后面的小装饰（右）'};
function saveMine(next){if(!writeMyParts(storage,next)){toast('浏览器无法保存素材，请允许本地存储后再试');return false}mine=next;return true}
function renderMine(tray){
 const k=tray.key;
 for(const key of [...tray.buttons.keys()])if(typeof key==='string'){tray.buttons.get(key).remove();tray.buttons.delete(key)}
 (mine[k]||[]).forEach(entry=>{
  const id='m:'+entry.id;
  const b=button('choice my-choice','',()=>{const on=Object.entries(entry.v).every(([x,v])=>state.custom[x]===v)&&(k!=='tail'||!!state.accessories.tail);if(on&&(k==='decor'||k==='tail')&&doFlip(k))return;change(()=>{state=applyMyPart(state,k,entry);if(k==='decor'&&state.sides)delete state.sides.decor});rememberPart(k,id);if(k==='decor'||k==='tail')flipHint(k)});
  const face=el('span','kaomoji',stashSample(k,entry.v));const tag=el('small','','我的');if(entry.name)tag.append(document.createTextNode(' · '+entry.name));
  localizedAttr(b,'aria-label','我的素材');b.title=entry.name||stashSample(k,entry.v);b.append(face,tag);tray.buttons.set(id,b);
 });
 tray.allowReorder=true;tray.lastOrder=null;updateTray(tray);tray.allowReorder=false;renderStashList(k);
}
function renderStashList(k){
 const list=stashLists.get(k);if(!list)return;list.replaceChildren();
 (mine[k]||[]).forEach((entry,i)=>{const chip=el('span','stash-chip');chip.append(el('span','kaomoji',stashSample(k,entry.v)));if(entry.name)chip.append(el('small','',entry.name));
  const del=button('stash-delete','×',()=>{if(saveMine(removeMyPart(mine,k,i))){const t=trays.get(k);if(t)renderMine(t);toast('删掉啦')}});localizedAttr(del,'aria-label','删掉');chip.append(del);list.append(chip)});
 list.hidden=!(mine[k]||[]).length;
}
function buildStash(k){
 const details=el('details','custom-editor stash-editor');details.append(el('summary','','＋ 塞一个自己的素材'));
 const grid=el('div','custom-fields');const inputs={};
 STASH_SLOTS[k].forEach(slot=>{const label=el('label','',STASH_LABELS[slot]||names[slot]);const input=el('input');input.type='text';input.dir='ltr';input.autocomplete='off';input.spellcheck=false;localizedAttr(input,'aria-label',names[slot]);inputs[slot]=input;label.append(input);grid.append(label)});
 const nameLabel=el('label','','名字（可不填）');const nameInput=el('input','stash-name');nameInput.type='text';nameInput.autocomplete='off';nameInput.maxLength=12;nameLabel.append(nameInput);grid.append(nameLabel);
 const add=button('stash-add','塞进素材区',()=>{
  const values={};for(const [slot,input]of Object.entries(inputs))values[slot]=input.value;
  const {mine:next,result,entry:result_entry}=addMyPart(mine,k,values,nameInput.value);
  if(result==='empty'){toast('先填一个零件再塞哦');return}
  if(result==='duplicate'){toast('这个素材已经在里面啦');return}
  if(!saveMine(next))return;
  Object.values(inputs).forEach(x=>x.value='');nameInput.value='';
  change(()=>{state=applyMyPart(state,k,result_entry)});rememberPart(k,'m:'+result_entry.id);
  const t=trays.get(k);if(t){renderMine(t);t.grid.scrollLeft=0}
  toast('塞进去啦，已经换上了','pink');
 });
 const list=el('div','stash-list');stashLists.set(k,list);
 grid.append(add);details.append(grid,list);renderStashList(k);return details;
}
function syncCustom(){const v=values(state);$$('[data-custom]').forEach(input=>input.value=v[input.dataset.custom])}
function updateTray(tray){
 const result=partTray(tray.key,{recent,expanded:tray.rail||tray.expanded,query:tray.query,mood:tray.mood});
 const myKeys=[...tray.buttons.keys()].filter(x=>typeof x==='string'),q=(tray.query||'').trim().toLowerCase();
 const myShown=myKeys.filter(id=>{if(tray.key==='eyes'&&tray.mood&&tray.mood!=='常用')return false;if(!q)return true;const b=tray.buttons.get(id);return (b.textContent+' '+(b.title||'')).toLowerCase().includes(q)});
 const recentFirst=(recent[tray.key]||[]).filter(x=>result.visible.includes(x)||myShown.includes(x));
 const visible=new Set([...result.visible,...myShown]),order=[...((tray.key==='decor'||Object.hasOwn(ACCESSORIES,tray.key))&&visible.has(0)?[0]:[]),...recentFirst,...myShown,...result.visible,...tray.buttons.keys()].filter((x,i,a)=>a.indexOf(x)===i);
 const focused=document.activeElement;
 if(tray.lastOrder!==order.join(',')&&(!tray.rail||!tray.lastOrder||tray.allowReorder)){tray.grid.append(...order.map(i=>tray.buttons.get(i)));tray.lastOrder=order.join(',')}
 tray.buttons.forEach((b,i)=>{b.hidden=!visible.has(i);b.classList.toggle('recent-choice',(recent[tray.key]||[]).includes(i));if(typeof i==='string')return;localizedAttr(b,'title',((recent[tray.key]||[]).includes(i)?'最近使用 · ':'')+tray.items[i].name)});
 setText(tray.count,`${result.visible.length+myShown.length} / ${result.total+myShown.length} 个零件`);
 tray.empty.hidden=result.total>0;tray.toggle.hidden=tray.rail||!result.hasMore;setText(tray.toggle,tray.expanded?'收起，只看常用 ▴':'展开全部 ▾');tray.toggle.setAttribute('aria-expanded',String(tray.expanded));
 if(tray.moodHost)[...tray.moodHost.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mood===tray.mood)));
 if(focused&&tray.grid.contains(focused)&&!focused.hidden&&document.activeElement!==focused)focused.focus({preventScroll:true});fitTray(tray);
}
function updateTrays(){trays.forEach(updateTray)}
function buildPart(k,open=true){
 const section=el(open?'section':'details','picker-section');section.id='picker-'+k;
 const heading=el(open?'div':'summary','picker-heading'),count=el('span');heading.append(el('h3','',labels[k]),count);section.append(heading);
 const grid=el('div','choices expanded-choices part-rail');grid.id='choices-'+k;
 const empty=el('p','part-empty','没有找到，试试换个名字，或者在下面塞一个自己的素材。');empty.hidden=true;
 const tray={key:k,grid,count,empty,expanded:false,rail:true,query:'',mood:'常用',buttons:new Map(),items:PARTS[k]};
 if(k==='eyes'){
  const moods=el('div','mood-tabs');localizedAttr(moods,'aria-label','眼睛心情');
  for(const mood of ['常用',...Object.keys(EYE_MOODS)]){const b=button('mood-chip',mood,()=>{tray.mood=mood;tray.expanded=false;tray.query='';tray.search.value='';updateTray(tray)});b.dataset.mood=mood;moods.append(b)}
  tray.moodHost=moods;section.append(moods);
 }
 if(k==='eyes'||k==='mouth'){
  const search=el('input','part-search');search.type='search';localizedAttr(search,'placeholder',k==='eyes'?'搜名字或符号：≖、困困、眼泪…':'搜名字或符号：小舌头、猫鼻…');localizedAttr(search,'aria-label','搜索'+labels[k]);
  search.addEventListener('input',()=>{tray.query=search.value;tray.expanded=false;updateTray(tray)});tray.search=search;section.append(search);
 }
 PARTS[k].forEach((x,i)=>{
  const b=button('choice'+(k==='decor'&&i===0?' none-choice':''),'',()=>{const cur=state[k];if(k==='decor'&&cur===i&&!customKeys.decor.some(x=>Object.hasOwn(state.custom,x))&&doFlip('decor'))return;if(cur===i&&prevPick[k]===undefined)return;change(()=>{if(cur===i){state[k]=prevPick[k];delete prevPick[k]}else{prevPick[k]=cur;state[k]=i}customKeys[k].forEach(key=>delete state.custom[key]);if(k==='decor'&&state.sides)delete state.sides.decor;rememberPart(k,state[k])});if(k==='decor'&&cur!==i)flipHint('decor')});
  b.dataset.choice=k;b.dataset.index=i;localizedAttr(b,'aria-label',labels[k]+'：'+x.name);b.append(el('span','kaomoji',sample(k,x)),el('small','',x.name));tray.buttons.set(i,b);
 });
 tray.toggle=button('expand-parts','展开全部 ▾',()=>{tray.expanded=!tray.expanded;updateTray(tray)});tray.toggle.setAttribute('aria-controls',grid.id);
 trays.set(k,tray);section.append(empty,grid,tray.toggle,buildStash(k));renderMine(tray);return section;
}
function buildAccessories(rows=[['horns','小恶魔角'],['tail','小尾巴'],['wings','天使翅膀']],title='角、尾巴与翅膀',note='三种可以一起戴',id='picker-accessories'){
 const section=el('section','picker-section accessory-section');section.id=id;const h=el('div','picker-heading');h.append(el('h3','',title),el('span','',note));section.append(h);
 for(const [key,label]of rows){
  const row=el('fieldset','accessory-row'),legend=el('legend','',label),count=el('span','accessory-count');legend.append(count);row.append(legend);
  const grid=el('div','accessory-choices part-rail');grid.id='choices-'+key;const empty=el('p','part-empty');empty.hidden=true;
  const tray={key,grid,count,empty,expanded:false,rail:true,query:'',mood:'常用',buttons:new Map(),items:ACCESSORIES[key]};
  ACCESSORIES[key].forEach((x,i)=>{const b=button('choice accessory-choice'+(i===0?' none-choice':''),'',()=>{const cur=state.accessories[key]||0;if(key==='tail'&&i!==0&&cur===i&&!Object.hasOwn(state.custom,'tail')&&doFlip('tail'))return;if(key==='tail'&&i!==0&&cur!==i)setTimeout(()=>flipHint('tail'));let selected;if(cur===i){if(prevPick[key]===undefined&&i===0)return;selected=prevPick[key]??0;delete prevPick[key]}else{prevPick[key]=cur;selected=i}if(key==='hands')autoHands=0;change(()=>{state.accessories[key]=selected;accessorySlots[key].forEach(slot=>delete state.custom[slot]);rememberPart(key,selected)})});b.dataset.accessory=key;b.dataset.index=i;localizedAttr(b,'aria-label',x.name);b.append(el('span','kaomoji',i===0?'—':Array.isArray(x.v)?x.v.join('\u200e ◦ \u200e'):x.v.trim()),el('small','',x.name));tray.buttons.set(i,b)});
  tray.toggle=button('expand-parts','展开全部 ▾',()=>{tray.expanded=!tray.expanded;updateTray(tray)});tray.toggle.setAttribute('aria-controls',grid.id);trays.set(key,tray);row.append(grid,tray.toggle,buildStash(key));renderMine(tray);section.append(row);
 }
 return section;
}
function buildControls(){buildFamilies();FRESH_LOOKS.forEach(look=>{const b=button('preset fresh-preset','',()=>{quietFace=true;change(()=>{state=cloneState(look.state);counter++})});b.append(el('span','kaomoji',compose(look.state)),el('small','',look.name));$('#fresh-presets').append(b)});$$('[data-spacing]').forEach(b=>b.addEventListener('click',()=>change(()=>{state.spacing=b.dataset.spacing}))); [...ANIMAL_LOOKS,...looks].forEach(look=>{const b=button('preset','',()=>{quietFace=true;change(()=>{state=cloneState(look.state);counter++})});b.append(el('span','kaomoji',compose(look.state)),el('small','',look.name));$('#presets').append(b)});const earDecor=el('section','ear-decor-group');earDecor.id='picker-ears-and-decor';earDecor.append(buildPart('ears'),buildAccessories([['hands','']],'小手','举在外面，或者抱在怀里','picker-hands'),buildPart('decor'));const face=el('section','ear-decor-group face-group');face.id='picker-face';face.append(buildPart('eyes'),buildPart('mouth'));$('#all-parts').append(face,buildAccessories(),earDecor);showPart(activePart);}
// 2026-11-23 拾：像换装游戏一样——顶上的「眼睛 / 嘴巴 / 角 / 耳朵」是切换标签，下面一次只摆一格衣柜，每格两排左右滑。
// 2026-11-23 19:08 拾：眼睛、嘴巴合成一格「眼睛·嘴巴」；耳朵那格叫「耳朵·装饰·爪爪」。
// 2026-11-23 拾：选中的零件再点一下＝反悔这一下，回到点它之前的那一个（配件一开始是「不带」，所以通常就是取消）。
// 2026-11-23 拾：格子窄，长一点的零件（૮(ᐢ ◦ ᐢ)ა）右边被切掉。放不下就按比例缩小字号。
function fitTray(tray){if(!tray.rail)return;tray.grid.querySelectorAll('.choice:not([hidden]) .kaomoji').forEach(k=>{k.style.fontSize='';const w=k.clientWidth,sw=k.scrollWidth;if(w&&sw>w){const fs=parseFloat(getComputedStyle(k).fontSize);k.style.fontSize=Math.max(9,Math.floor(fs*w/sw*0.96))+'px'}})}
function fitAll(){trays.forEach(fitTray)}addEventListener('resize',()=>requestAnimationFrame(fitAll),{passive:true});document.fonts?.ready?.then(fitAll);
const prevPick={};let autoHands=0;
const PART_TABS=['face','accessories','ears-and-decor'];let activePart='face';
function showPart(id){if(!PART_TABS.includes(id))return;activePart=id;/* 横滑时点一下不让零件跳走：只在换标签时按「最近用过」重新排 */trays.forEach(t=>{const before=t.lastOrder;t.allowReorder=true;updateTray(t);t.allowReorder=false;if(t.rail&&t.lastOrder!==before)t.grid.scrollLeft=0});PART_TABS.forEach(x=>{const s=document.getElementById('picker-'+x);if(s)s.hidden=x!==id});document.querySelectorAll('[data-jump]').forEach(b=>{if(b.dataset.jump===id)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current')});document.querySelectorAll('[data-part-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.partTab===id)));fitAll()}
// 2026-11-23 拾：零件区上面也放一排标签，免得有人没发现顶上那排能切换。这里点了只换格子，不滚动。
document.querySelectorAll('[data-part-tab]').forEach(b=>{b.setAttribute('role','tab');b.addEventListener('click',()=>{showPart(b.dataset.partTab);queueDock()})})

function card(s){const text=compose(s),saved=hasSaved(s),animal=ANIMALS.find(x=>x.id===animalForEar(s.ears));const c=el('article','puppy-card'),top=el('div','card-portrait');const saveBtn=button('card-save',saved?'♥':'♡',()=>save(s));localizedAttr(saveBtn,'aria-label',(saved?'取消收藏 ':'收藏 ')+text);saveBtn.setAttribute('aria-pressed',String(saved));const face=el('span','kaomoji card-puppy',text);face.dir='ltr';if(Array.from(text).length>25)face.style.fontSize='16px';top.append(face,saveBtn);const bottom=el('div','card-bottom'),animalName=animal?.name||'团子';const name=el('span','card-name',s.accessories?.wings?'天使'+animalName:s.accessories?.horns?'恶魔'+animalName:PARTS.eyes[s.eyes].mood+animalName);name.append(el('small','',PARTS.ears[s.ears].name));const actions=el('div','card-actions');actions.append(button('','捏捏',()=>{quietFace=true;change(()=>{state=cloneState(s);counter++});showView('studio');$('.workbench').scrollIntoView({behavior:'smooth',block:'start'})}),button('','复制',()=>copy(s)));bottom.append(name,actions);c.append(top,bottom);return c}
function matches(s){if(filter==='全部团子')return true;if(filter==='新到表情')return FRESH_LOOKS.some(x=>compose(x.state)===compose(s));const animal=ANIMALS.find(x=>x.name===filter);if(animal)return animalForEar(s.ears)===animal.id;if(filter==='小恶魔')return (s.accessories?.horns||0)>0;if(filter==='小天使')return (s.accessories?.wings||0)>0;return PARTS.eyes[s.eyes].mood===filter}
function renderGallery(){$('#gallery').replaceChildren(...gallery.filter(matches).slice(0,12).map(card))}
function newRandom(animalId=null,mood=null){const chosen=animalId||ANIMALS[Math.floor(Math.random()*ANIMALS.length)].id;const s=cloneState(randomAnimalState(chosen,mood));for(const k of Object.keys(ACCESSORIES))s.accessories[k]=k!=='horns'&&Math.random()<.2?1+Math.floor(Math.random()*(ACCESSORIES[k].length-1)):0;return randomSides(sprinkleMyParts(s,mine))}
function refreshGallery(){gallery=[...ANIMAL_LOOKS.map(x=>cloneState(x.state)),...FRESH_LOOKS.map(x=>cloneState(x.state)),...looks.map(x=>cloneState(x.state)),cloneState(DEFAULT),...ANIMALS.flatMap(x=>['开心','撒娇','困困','委屈'].map(m=>newRandom(x.id,m)))];const animal=ANIMALS.find(x=>x.name===filter),mood=['开心','撒娇','困困','委屈'].includes(filter)?filter:null;for(let i=0;i<24;i++){const s=newRandom(animal?.id||null,mood);if(filter==='小恶魔')s.accessories.horns=1+Math.floor(Math.random()*(ACCESSORIES.horns.length-1));if(filter==='小天使')s.accessories.wings=1+Math.floor(Math.random()*(ACCESSORIES.wings.length-1));gallery.push(s)}const seen=new Set();gallery=gallery.filter(s=>{const text=compose(s);if(seen.has(text))return false;seen.add(text);return true});renderGallery()}
function renderFilters(){$('#filters').replaceChildren();categories.forEach(name=>{const b=button('filter',name,()=>{filter=name;renderFilters();refreshGallery()});b.setAttribute('aria-pressed',String(filter===name));$('#filters').append(b)})}
function renderFavorites(){$('#favorite-grid').replaceChildren(...favorites.map(card));$('#empty-favorites').hidden=!!favorites.length}
function showView(view){$('#studio').hidden=view!=='studio';$('#favorites').hidden=view!=='favorites';$$('.nav-item').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);if(b.dataset.view===view)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});if(view==='favorites')renderFavorites()}
$$('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
$('.brand').addEventListener('click',e=>{e.preventDefault();showView('studio');window.scrollTo({top:0,behavior:'smooth'})});
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>jumpToPart(b.dataset.jump)));
$('#copy').addEventListener('click',()=>copy(state));$('#save').addEventListener('click',()=>save(state));
const compactCopy=$('#copy-compact');
let copyFeedbackTimer;
compactCopy.addEventListener('click',async()=>{
 const method=await copy(state);
 clearTimeout(copyFeedbackTimer);
 compactCopy.classList.toggle('is-copied',method!=='manual');
 if(method!=='manual')copyFeedbackTimer=setTimeout(()=>compactCopy.classList.remove('is-copied'),1400);
});
$('#random').addEventListener('click',()=>{quietFace=true;change(()=>{state=newRandom();counter++});toast('噗叽！一只字字兽诞生啦')});
$('#reset').addEventListener('click',()=>{quietFace=true;change(()=>state=clearFace(state),{remember:false});toast('搭配已清空，点一下撤回就能找回来')});
$('#undo').addEventListener('click',()=>{if(history.length){state=history.pop();render();syncCustom()}});
$('#more').addEventListener('click',()=>{refreshGallery();toast('新的一窝团子来啦')});$('#close-dialog').addEventListener('click',()=>$('#manual-copy').close());
window.addEventListener('storage',e=>{if(e.key===LANGUAGE_KEY||e.key===null){language=readLanguage(storage);applyLanguage()}if(e.key==='puppy-factory:favorites'||e.key===null){favorites=readFavorites(storage);renderSaved();renderGallery();renderFavorites()}if(e.key===RECENT_KEY||e.key===null){recent=readRecent(storage);updateTrays()}});


const mobileScreen=matchMedia('(max-width: 720px)');
let dockFrame=0;let dockFullHeight=0;
function updateDock(){
 const dock=$('#preview-dock'),workbench=$('.workbench');
 dock.classList.toggle('is-compact',compactDock({mobile:mobileScreen.matches,workbenchTop:workbench.getBoundingClientRect().top,wasCompact:dock.classList.contains('is-compact')}));
 // 2026-11-23 界：卡片收起后会矮一截，先用 margin 把少掉的高度垫上，下面的内容就不会被一下拽上来
 const compactNow=dock.classList.contains('is-compact');
 if(!compactNow){dock.style.marginBottom='';dockFullHeight=dock.getBoundingClientRect().height}
 else if(dockFullHeight){dock.style.marginBottom=Math.max(0,dockFullHeight-dock.getBoundingClientRect().height)+'px'}
 const height=dock.getBoundingClientRect().height;document.documentElement.style.setProperty('--puppy-dock-height',height+'px');
 const limit=mobileScreen.matches?height+18:36;let active=null;
 active=activePart
 $$('[data-jump]').forEach(b=>{if(b.dataset.jump===active)b.setAttribute('aria-current','location');else b.removeAttribute('aria-current')});
}
function queueDock(){if(!dockFrame)dockFrame=requestAnimationFrame(()=>{dockFrame=0;updateDock()})}
function jumpToPart(id){
 const target=$('#picker-'+id);showPart(id);
 if(mobileScreen.matches){
  const dock=$('#preview-dock');
  if(!dock.classList.contains('is-compact'))dockFullHeight=dock.getBoundingClientRect().height;
  dock.classList.add('is-compact');
  if(dockFullHeight)dock.style.marginBottom=Math.max(0,dockFullHeight-dock.getBoundingClientRect().height)+'px';
 }
 const height=$('#preview-dock').getBoundingClientRect().height;
 window.scrollTo({top:anchorTop(target.getBoundingClientRect().top,window.scrollY,height,mobileScreen.matches),behavior:'auto'});
 target.tabIndex=-1;target.focus({preventScroll:true});queueDock();
}
function setupDock(){
 window.addEventListener('scroll',queueDock,{passive:true});window.addEventListener('resize',queueDock,{passive:true});mobileScreen.addEventListener('change',queueDock);
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(queueDock).observe($('#preview-dock'));
 document.fonts?.ready.then(queueDock);updateDock();
}

bindStaticText();buildControls();render();syncCustom();renderFilters();refreshGallery();showView('studio');setupDock();applyLanguage();
$$('[data-language]').forEach(b=>b.addEventListener('click',()=>{language=b.dataset.language;writeLanguage(storage,language);applyLanguage()}));

// 2026-11-23 界（拾提，照 Live2D 的思路）：「拆零件」。点颜文字，把它拆成一块块零件：
// × 删掉这一块，点进去可以改字。删掉、改过的零件会一直保持，
// 直到在下面重新选这个部件，才会被新部件覆盖。撤回照常可用。
const slotOrder=[['prefix','前装饰'],['wingLeft','左翅膀','wings'],['handLeft','左手','hands'],['left','左耳'],['hornLeft','左角','horns'],['blushLeft','左腮红'],['eyeLeft','左眼'],['mouth','嘴巴'],['eyeRight','右眼'],['blushRight','右腮红'],['hornRight','右角','horns'],['right','右耳'],['handRight','右手','hands'],['wingRight','右翅膀','wings'],['tail','尾巴','tail'],['suffix','后装饰']];
function slotDefault(key){const v=values({...state,custom:{}}),a=state.accessories||{};
 if(key==='hornLeft')return ACCESSORIES.horns[a.horns||0].v[0];if(key==='hornRight')return ACCESSORIES.horns[a.horns||0].v[1];
 if(key==='wingLeft')return ACCESSORIES.wings[a.wings||0].v[0];if(key==='wingRight')return ACCESSORIES.wings[a.wings||0].v[1];
 if(key==='handLeft'||key==='handRight')return a.hands?ACCESSORIES.hands[a.hands].v[key==='handLeft'?0:1]:''
if(key==='tail')return ACCESSORIES.tail[a.tail||0].v;return v[key]??''}
function slotValue(key){return Object.hasOwn(state.custom,key)?state.custom[key]:slotDefault(key)}
const cleanSlot=v=>Array.from(v.replace(/[\u0000-\u001f\u007f‪-‮⁦-⁩]/gu,'')).slice(0,16).join('');
function earSlots(side){
 if(Object.hasOwn(state.custom,side))return null;
 const segments=earSegments({},PARTS.ears[state.ears],side);
 if(segments[0][0]===side)return null;
 return segments.filter(([key,def])=>Object.hasOwn(state.custom,key)||def.trim()!=='')
  .map(([key,def])=>({key,label:names[key],def}));
}
// 2026-11-28 拾：拆零件里的格子按颜文字里真实的先后排；长按一块拖到别的位置，颜文字跟着换顺序。
const EAR_PIECES=new Set(['leftOuter','leftFrame','leftInner','rightInner','rightFrame','rightOuter']);
const slotLabels=Object.fromEntries(slotOrder.map(([k,l,n])=>[k,[l,n]]));
function earPieceDefault(key){const side=key.startsWith('left')?'left':'right';const seg=earSegments({},PARTS.ears[state.ears],side).find(([k])=>k===key);return seg?seg[1]:''}
function renderSlots(){
 const box=$('#slot-list');box.replaceChildren();
 for(const [key] of composeParts(state)){
  if(key==='leftGap'||key==='rightGap')continue;
  if(EAR_PIECES.has(key)){const def=earPieceDefault(key);if(Object.hasOwn(state.custom,key)||def.trim()!==''){const c=pieceChip({key,label:names[key],def});c.dataset.key=key;box.append(c)}continue}
  const [label,needs]=slotLabels[key]||[names[key]||key];
  if(needs&&!state.accessories[needs])continue;
  const has=Object.hasOwn(state.custom,key),deleted=has&&state.custom[key]==='';
  if(!deleted&&!has&&slotDefault(key)==='')continue;
  const chip=el('div','slot-chip'+(deleted?' is-deleted':''));chip.dataset.key=key;chip.append(el('small','',label));
  if(deleted){chip.append(button('slot-restore','↺ 恢复',()=>{delete state.custom[key];render();syncCustom();renderSlots()}))}
  else{const input=el('input');input.type='text';input.dir='ltr';input.value=slotValue(key);input.spellcheck=false;input.autocomplete='off';localizedAttr(input,'aria-label',label);
   input.addEventListener('input',()=>{state.custom[key]=cleanSlot(input.value);render();syncCustom()});
   const del=button('slot-delete','×',()=>{state.custom[key]='';render();syncCustom();renderSlots()});localizedAttr(del,'aria-label','删掉'+label);
   chip.append(input,del)}
  box.append(chip)}
}
// 长按拖动：按住格子（输入框和 × 以外的地方）约 0.35 秒，格子浮起来，拖到想去的位置松手。
(function setupSlotDrag(){
 const box=$('#slot-list'),dialog=$('#slot-edit');let timer=0,startX=0,startY=0,pending=null,drag=null;
 const clear=()=>{clearTimeout(timer);timer=0;pending=null};
 function begin(chip,x,y){
  clear();const r=chip.getBoundingClientRect();const ghost=chip.cloneNode(true);ghost.classList.add('drag-ghost');ghost.style.width=r.width+'px';ghost.style.height=r.height+'px';dialog.append(ghost);
  drag={chip,ghost,dx:x-r.left,dy:y-r.top,before:[...box.children].map(c=>c.dataset.key).join()};chip.classList.add('is-dragging');document.body.classList.add('slot-dragging');navigator.vibrate?.(12);move(x,y);
 }
 function move(x,y){
  if(!drag)return;drag.ghost.style.left=(x-drag.dx)+'px';drag.ghost.style.top=(y-drag.dy)+'px';
  const target=document.elementFromPoint(x,y)?.closest('.slot-chip');
  if(!target||target===drag.chip||!box.contains(target))return;
  const r=target.getBoundingClientRect();const after=x>r.left+r.width/2;
  if(after){if(target.nextSibling!==drag.chip)target.after(drag.chip)}else if(target.previousSibling!==drag.chip)target.before(drag.chip);
 }
 function end(){
  if(!drag){clear();return}
  const {chip,ghost,before}=drag;drag=null;ghost.remove();chip.classList.remove('is-dragging');document.body.classList.remove('slot-dragging');
  const keys=[...box.children].map(c=>c.dataset.key).filter(Boolean);
  if(keys.join()===before)return;
  checkpoint();state=reorderVisible(state,keys);render();syncCustom();renderSlots();
 }
 const startable=e=>{const chip=e.target.closest('.slot-chip');if(!chip||!box.contains(chip)||e.target.closest('button,input'))return null;return chip};
 box.addEventListener('touchstart',e=>{const chip=startable(e);if(!chip||e.touches.length>1)return;const t=e.touches[0];startX=t.clientX;startY=t.clientY;pending=chip;timer=setTimeout(()=>begin(chip,startX,startY),350)},{passive:true});
 box.addEventListener('touchmove',e=>{const t=e.touches[0];if(drag){e.preventDefault();move(t.clientX,t.clientY)}else if(pending&&Math.hypot(t.clientX-startX,t.clientY-startY)>8)clear()},{passive:false});
 box.addEventListener('touchend',end);box.addEventListener('touchcancel',end);
 box.addEventListener('mousedown',e=>{if(e.button!==0)return;const chip=startable(e);if(!chip)return;e.preventDefault();startX=e.clientX;startY=e.clientY;pending=chip;timer=setTimeout(()=>begin(chip,startX,startY),250)});
 addEventListener('mousemove',e=>{if(drag)move(e.clientX,e.clientY);else if(pending&&Math.hypot(e.clientX-startX,e.clientY-startY)>4)begin(pending,e.clientX,e.clientY)});
 addEventListener('mouseup',end);
 box.addEventListener('contextmenu',e=>{if(drag||pending)e.preventDefault()});
})();
function openSlots(){checkpoint();render();renderSlots();$('#slot-edit').showModal()}
$('#puppy').addEventListener('click',openSlots);
$('#puppy').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openSlots()}});
$('#slot-open').addEventListener('click',openSlots);
$('#slot-open-compact').addEventListener('click',openSlots);
$('#slot-done').addEventListener('click',()=>{$('#slot-edit').close();render();toast('拆好啦，删掉的零件会一直保持')});

// 2026-11-23 界（拾提）：分享卡片，底下带网址和二维码。
let shareBlobUrl='';
async function openShare(){
 const canvas=document.createElement('canvas');
 const t=x=>translate(x,language);
 await drawShareCard(canvas,compose(state),t($('#puppy-caption').dataset.source||$('#puppy-caption').textContent),{brand:t('字字兽 · 颜文字团子工厂'),tagline:t('自由组合颜文字字符，随时组合你喜欢的颜文字，以及部分改动表情'),scan:t('扫码捏一只你的团子 →')});
 const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));if(!blob){toast('卡片生成失败了，再试一次吧');return}
 if(shareBlobUrl)URL.revokeObjectURL(shareBlobUrl);shareBlobUrl=URL.createObjectURL(blob);
 $('#share-img').src=shareBlobUrl;$('#share-download').href=shareBlobUrl;
 const file=new File([blob],'zizishou.png',{type:'image/png'});
 const canShare=!!(navigator.canShare&&navigator.canShare({files:[file]}));
 $('#share-native').hidden=!canShare;$('#share-native').onclick=async()=>{try{await navigator.share({files:[file],title:t('字字兽'),text:compose(state)+' '+SHARE_URL})}catch{}};
 $('#share-card').showModal();
}
$('#share-open').addEventListener('click',openShare);
$('#share-close').addEventListener('click',()=>$('#share-card').close());

// 拆开的耳朵块：保留原来那一块前后的空格，只换中间的字
function pieceChip({key,label,def}){
 const has=Object.hasOwn(state.custom,key),deleted=has&&state.custom[key]==='';
 const lead=def.match(/^\s*/u)[0],trail=def.match(/\s*$/u)[0];
 const chip=el('div','slot-chip'+(deleted?' is-deleted':''));chip.append(el('small','',label));
 if(deleted){chip.append(button('slot-restore','↺ 恢复',()=>{delete state.custom[key];render();syncCustom();renderSlots()}));return chip}
 const input=el('input');input.type='text';input.dir='ltr';input.value=(has?state.custom[key]:def).trim();input.spellcheck=false;input.autocomplete='off';localizedAttr(input,'aria-label',label);
 input.addEventListener('input',()=>{const v=cleanSlot(input.value).trim();state.custom[key]=v?lead+v+trail:'';render();syncCustom()});
 const del=button('slot-delete','×',()=>{state.custom[key]='';render();syncCustom();renderSlots()});localizedAttr(del,'aria-label','删掉'+label);
 chip.append(input,del);return chip}
