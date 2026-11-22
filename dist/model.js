export const PARTS={
 ears:[{name:'经典垂耳',v:['U','U'],family:'classic'},{name:'软团垂耳',v:['૮₍ ',' ₎ა'],family:'soft'},{name:'卷卷耳朵',v:['૮꒰ ',' ꒱ა'],family:'soft'},{name:'小括号耳',v:['૮( ',' )ა'],family:'soft'},{name:'蓬松耳朵',v:['U꒰ ',' ꒱U'],family:'classic'},{name:'圆圆脸颊',v:['U( ',' )U'],family:'classic'},{name:'轻盈小狗',v:['ᑌ','ᑌ'],family:'classic'},{name:'小小垂耳',v:['૮ ',' ა'],family:'soft'}],
 eyes:[{name:'小豆豆',v:['•','•'],mood:'日常'},{name:'点点眼',v:['・','・'],mood:'日常'},{name:'开心眯眼',v:['˃','˂'],mood:'开心'},{name:'弯弯笑眼',v:['ᵔ','ᵔ'],mood:'开心'},{name:'困困闭眼',v:['˘','˘'],mood:'困困'},{name:'软软低头',v:['ᴗ','ᴗ'],mood:'困困'},{name:'晕乎乎',v:['@','@'],mood:'委屈'},{name:'泪汪汪',v:['o̴̶̷᷄','o̴̶̷̥᷅'],mood:'委屈'},{name:'坚定小狗',v:['•̀','•́'],mood:'开心'},{name:'闪闪眼',v:['✧','✧'],mood:'开心'},{name:'圆眼睛',v:['ㅇ','ㅇ'],mood:'日常'},{name:'眨眨眼',v:['•','˘'],mood:'撒娇'}],
 mouth:[{name:'小狗嘴',v:'ﻌ'},{name:'小猫嘴',v:'ω'},{name:'笑一笑',v:'ᴗ'},{name:'软软嘴',v:'꒳'},{name:'嘟嘟嘴',v:'⤙'},{name:'小小吻',v:'⤚'},{name:'呜呜',v:'ᯅ'},{name:'小鼻尖',v:'ᴥ'},{name:'圆圆嘴',v:'ㅅ'},{name:'轻轻笑',v:'ᵕ'},{name:'小小点',v:'·̫'},{name:'吐舌头',v:'ڡ'}],
 decor:[{name:'素颜小狗',v:['','','','']},{name:'红扑扑',v:['','˶','˶','']},{name:'送你小心心',v:['','˶','˶',' ♡']},{name:'伸出小爪',v:['','','',' っ']},{name:'星星陪伴',v:['✧ ','','',' ✧']},{name:'困困 Zzz',v:['','','',' z Z']},{name:'戴小蝴蝶结',v:['୨୧ ','˶','˶','']},{name:'闪亮小狗',v:['˚₊ ','','',' ₊˚']}]
};
// Append-only preset indexes preserve every previously saved puppy.
PARTS.ears.push({name:'圆脸天使',v:['( ',' )'],family:'soft',spacing:''},{name:'小方脸',v:['[ ',' ]'],family:'soft'},{name:'圆滚滚',v:['（','）'],family:'soft'},{name:'小尖耳',v:['ฅ՞','՞ฅ'],family:'soft'});
PARTS.eyes.push(...[
 ['小小不开心','-','-','委屈'],['温柔弯眼','ˊ','ˋ','撒娇'],['笑弯了','^','^','开心'],['豆豆眨眼','･','<','撒娇'],['爱心眼','♡','♡','撒娇'],['委屈垂眼','；','；','委屈'],['眼泪啪嗒','T','T','委屈'],['紧张小狗','ó','ò','委屈'],['偷偷瞄你','¬','¬','日常'],['呆呆小狗','º','º','日常'],['月牙眼','⌒','⌒','开心'],['睁大眼睛','⊙','⊙','日常'],['瞌睡横线','–','–','困困'],['认真盯盯','•̀','ᴗ','开心'],['星星眼','★','★','开心'],['乖乖点头','ᵕ','ᵕ','撒娇'],['困到融化','ᓀ','ᓀ','困困'],['猫猫亮眼','✦','✦','开心']
].map(([name,a,b,mood])=>({name,v:[a,b],mood})));
PARTS.mouth.push(...[['小海鸥嘴','﹏'],['委屈扁嘴','︿'],['亲亲小嘴','3'],['乖乖抿嘴','⩊'],['张大嘴','O'],['小小圆嘴','o'],['猫猫笑','w'],['平平嘴巴','_'],['微微嘟嘴','ε'],['惊讶小狗','Ⱉ'],['软软鼻子','ᴓ'],['小小微笑','υ']].map(([name,v])=>({name,v})));
PARTS.decor.push(...[{name:'害羞斜线',v:['','//','//','']},{name:'小脸红红',v:['','⸝⸝','⸝⸝','']},{name:'举起爪爪',v:['ฅ ','','',' ฅ']},{name:'捧着心心',v:['','','',' つ♡']},{name:'一朵小花',v:['✿ ','','','']},{name:'星星点点',v:['⋆ ','','',' ⋆']}]);
export const ACCESSORIES={
 horns:[{name:'不戴角',v:['','']},{name:'小恶魔角',v:['^ ','^ ']},{name:'尖尖恶魔角',v:['ψ ',' ψ']},{name:'弯弯小角',v:['⌁ ',' ⌁']},{name:'双尖小角',v:['˄ ',' ˄']}],
 tail:[{name:'不加尾巴',v:''},{name:'恶魔箭尾',v:' ↝'},{name:'爱心恶魔尾',v:' ⤳❥'},{name:'空心爱心尾',v:' ⤳♡'},{name:'卷卷尾巴',v:' ʚ'},{name:'翘翘小尾巴',v:' ⤤'},{name:'长长小尾巴',v:' 〜'},{name:'小爱心尾',v:' ⤳ღ'},{name:'小翘线尾',v:' ⸍'},{name:'招手尾巴',v:' ﾉ'}],
 wings:[{name:'不戴翅膀',v:['','']},{name:'扑扇天使翼',v:['⁽⁽ଘ','ଓ⁾⁾']},{name:'小天使翅膀',v:['ଘ','ଓ']},{name:'圆圆天使翼',v:['ʚ','ɞ']},{name:'展开小翅膀',v:['ଘ ',' ଓ']},{name:'星星天使翼',v:['✧ଘ','ଓ✧']}]
};
// Version 3: user-provided faces; indexes are append-only for old favorites.
export const NEW_PARTS={ears:[],eyes:[],mouth:[],decor:[]};
function addPart(key,item){const index=PARTS[key].push(item)-1;NEW_PARTS[key].push(index);return index}
const freshEyes=[['半眯审视','≖','≖','日常'],['圆圆亮眼','◕','◕','开心'],['眼泪汪汪','˃̣̣̥','˂̣̣̥','委屈'],['懒懒半睁','⩌','⩌','困困'],['瀑布眼泪','ㅠ','ㅠ','委屈'],['咧嘴笑眼','ᗜ','ᗜ','开心'],['趴着睡觉','_','_','困困']].map(([name,l,r,mood])=>addPart('eyes',{name,v:[l,r],mood}));
const freshMouths=[['小小猫鼻','༝'],['委屈小尖嘴','‸'],['困困小嘴','⌯'],['调皮小舌头','𐃷'],['趴睡小鼻子','   ̫ ']].map(([name,v])=>addPart('mouth',{name,v}));
const freshEars=[['猫猫尖耳',['ᐢ','ᐢ']],['细细猫耳',['՞','՞']],['无框小脸',['','']],['趴睡圆脸',['(՞','՞)']]].map(([name,v])=>addPart('ears',{name,v,family:'soft',spacing:''}));
const sleepingDecor=addPart('decor',{name:'小小呼噜泡',v:['','','','ᐝ']});
const curlyTail=ACCESSORIES.tail.push({name:'小卷尾',v:'ಣ'})-1;
export const FRESH_LOOKS=[
 {name:'半眯眼小狗',expected:'૮₍ ˶≖ ﻌ ≖˶ ₎ა',state:{ears:1,eyes:freshEyes[0],mouth:0,decor:1}},
 {name:'圆眼开心狗',expected:'૮₍ ˶◕ ᴗ ◕˶ ₎ა',state:{ears:1,eyes:freshEyes[1],mouth:2,decor:1}},
 {name:'泪汪汪小狗',expected:'૮₍ ˃̣̣̥ ᯅ ˂̣̣̥ ₎ა',state:{ears:1,eyes:freshEyes[2],mouth:6,decor:0}},
 {name:'害羞小猫',expected:'ᐢ⸝⸝•༝•⸝⸝ᐢ',state:{ears:freshEars[0],eyes:0,mouth:freshMouths[0],decor:9}},
 {name:'小猫委屈了',expected:'՞⩌ ‸ ⩌՞',state:{ears:freshEars[1],eyes:freshEyes[3],mouth:freshMouths[1],decor:0,spacing:' '}},
 {name:'懒懒小猫',expected:'՞⩌⌯⩌՞',state:{ears:freshEars[1],eyes:freshEyes[3],mouth:freshMouths[2],decor:0}},
 {name:'眼泪面条',expected:'ㅠ⩊ㅠ',state:{ears:freshEars[2],eyes:freshEyes[4],mouth:15,decor:0}},
 {name:'调皮卷尾',expected:'˶ᗜ𐃷ᗜ˶ಣ',state:{ears:freshEars[2],eyes:freshEyes[5],mouth:freshMouths[3],decor:1,accessories:{horns:0,tail:curlyTail,wings:0}}},
 {name:'趴着呼噜',expected:'(՞_   ̫ _՞)ᐝ',state:{ears:freshEars[3],eyes:freshEyes[6],mouth:freshMouths[4],decor:sleepingDecor}}
];
// Zizishou experiment: append new ear pairs; never renumber existing presets or favorites.
const NEW_ANIMAL_EARS=[
  {name:'兔兔长耳',v:['／(ᐢ ',' ᐢ)＼'],animal:'rabbit',spacing:''},
  {name:'兔兔软耳',v:['૮(ᐢ ',' ᐢ)ა'],animal:'rabbit',spacing:''},
  {name:'熊熊圆耳',v:['ʕ ',' ʔ'],animal:'bear',spacing:' '},
  {name:'小熊抱抱',v:['ʕっ ',' っʔ'],animal:'bear',spacing:' '},
  {name:'狐狸尖耳',v:['ฅ^','^ฅ'],animal:'fox',spacing:''},
  {name:'狐狸蓬蓬',v:['ᐢ⸝ ',' ⸝ᐢ'],animal:'fox',spacing:''},
  {name:'仓鼠团团',v:['꒰ ',' ꒱'],animal:'hamster',spacing:' '},
  {name:'仓鼠鼓腮',v:['(⸝⸝ ',' ⸝⸝)'],animal:'hamster',spacing:''}
];
PARTS.ears.push(...NEW_ANIMAL_EARS);
export const ANIMALS=[
  {id:'dog',name:'小狗',earIndex:1,mouthIndex:0},
  {id:'cat',name:'小猫',earIndex:12,mouthIndex:24},
  {id:'rabbit',name:'兔兔',earIndex:16,mouthIndex:9},
  {id:'bear',name:'熊熊',earIndex:18,mouthIndex:7},
  {id:'fox',name:'狐狸',earIndex:20,mouthIndex:1},
  {id:'hamster',name:'仓鼠',earIndex:22,mouthIndex:15}
];
export function animalForEar(index){
  if(!Number.isInteger(index)||index<0||index>=PARTS.ears.length)return null;
  return PARTS.ears[index].animal||([11,12,13].includes(index)?'cat':'dog');
}
export const DEFAULT={ears:1,eyes:0,mouth:0,decor:1,custom:{},accessories:{horns:0,tail:0,wings:0}};
export function cloneState(s){return {...s,custom:{...s.custom},accessories:{horns:0,tail:0,wings:0,...s.accessories}}}
export function values(s){const c=s.custom||{};return {left:c.left??PARTS.ears[s.ears].v[0],right:c.right??PARTS.ears[s.ears].v[1],eyeLeft:c.eyeLeft??PARTS.eyes[s.eyes].v[0],eyeRight:c.eyeRight??PARTS.eyes[s.eyes].v[1],mouth:c.mouth??PARTS.mouth[s.mouth].v,prefix:c.prefix??PARTS.decor[s.decor].v[0],blushLeft:c.blushLeft??PARTS.decor[s.decor].v[1],blushRight:c.blushRight??PARTS.decor[s.decor].v[2],suffix:c.suffix??PARTS.decor[s.decor].v[3]}}
export function compose(s){const v=values(s),a=s.accessories||{};const horns=ACCESSORIES.horns[a.horns||0].v,tail=ACCESSORIES.tail[a.tail||0].v,wings=ACCESSORIES.wings[a.wings||0].v;const ear=PARTS.ears[s.ears];const sep=s.spacing??ear.spacing??(ear.family==='classic'?'':' ');const c=s.custom||{};const left=a.horns?v.left.trimEnd()+(c.hornLeft??horns[0]):v.left;const right=a.horns?(c.hornRight??horns[1])+v.right.trimStart():v.right;const wl=a.wings?(c.wingLeft??wings[0]):'',wr=a.wings?(c.wingRight??wings[1]):'',tl=a.tail?(c.tail??tail):'';return v.prefix+wl+left+v.blushLeft+v.eyeLeft+sep+v.mouth+sep+v.eyeRight+v.blushRight+right+wr+tl+v.suffix}
export function randomState(family=null,mood=null,rng=Math.random){const pick=a=>a[Math.floor(rng()*a.length)];const indexes=(key,fn)=>PARTS[key].map((v,i)=>({v,i})).filter(x=>!fn||fn(x.v)).map(x=>x.i);return {ears:pick(indexes('ears',family?v=>v.family===family:null)),eyes:pick(indexes('eyes',mood?v=>v.mood===mood:null)),mouth:pick(indexes('mouth')),decor:pick(indexes('decor')),custom:{}}}
// Random and ready-made little creatures share the same existing Unicode composer.
export function randomAnimalState(animalId,mood=null,rng=Math.random){
  const animal=ANIMALS.find(a=>a.id===animalId);
  if(!animal)throw new RangeError('Unknown animal: '+animalId);
  const state=randomState(null,mood,rng);
  const ears=PARTS.ears.map((_,i)=>i).filter(i=>animalForEar(i)===animalId);
  state.ears=ears[Math.min(ears.length-1,Math.floor(rng()*ears.length))];
  state.mouth=animal.mouthIndex;
  // 2026-11-23 界（拾发现「四个爪爪」）：耳朵里已经带了 ฅ 之类的字，随机时就不再配同样字的装饰，免得重复
  const earChars=new Set(Array.from(PARTS.ears[state.ears].v.join('')).filter(ch=>ch.trim()&&!/[()₍₎\[\]]/u.test(ch)));
  const clashes=i=>Array.from(PARTS.decor[i].v.join('')).some(ch=>earChars.has(ch));
  if(clashes(state.decor)){const ok=PARTS.decor.map((_,i)=>i).filter(i=>!clashes(i));if(ok.length)state.decor=ok[Math.floor(rng()*ok.length)]}
  return state;
}
export const ANIMAL_LOOKS=ANIMALS.map(animal=>({
  id:animal.id,name:animal.name+'团子',
  state:{...cloneState(DEFAULT),ears:animal.earIndex,mouth:animal.mouthIndex}
}));
export function validState(s){return !!s&&(s.spacing===undefined||s.spacing===''||s.spacing===' ')&&['ears','eyes','mouth','decor'].every(k=>Number.isInteger(s[k])&&s[k]>=0&&s[k]<PARTS[k].length)&&(!s.accessories||(typeof s.accessories==='object'&&Object.entries(s.accessories).every(([k,v])=>Object.hasOwn(ACCESSORIES,k)&&Number.isInteger(v)&&v>=0&&v<ACCESSORIES[k].length)))&&(!s.custom||Object.entries(s.custom).every(([k,v])=>['left','right','eyeLeft','eyeRight','mouth','prefix','suffix','blushLeft','blushRight','hornLeft','hornRight','wingLeft','wingRight','tail'].includes(k)&&typeof v==='string'&&Array.from(v).length<=16&&!/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u.test(v)))}
export function readFavorites(storage){try{const data=JSON.parse(storage.getItem('puppy-factory:favorites')||'[]');return Array.isArray(data)?data.filter(validState).slice(0,500).map(cloneState):[]}catch{return []}}
export function writeFavorites(storage,list){try{storage.setItem('puppy-factory:favorites',JSON.stringify(list));return true}catch{return false}}
export async function copyText(text,nav,doc){try{if(nav.clipboard?.writeText){await nav.clipboard.writeText(text);return 'clipboard'}}catch{}const active=doc.activeElement;const input=doc.createElement('textarea');input.value=text;input.setAttribute('readonly','');input.setAttribute('dir','ltr');input.style.cssText='position:fixed;top:0;left:0;opacity:0;font-size:16px';doc.body.append(input);input.focus();input.select();input.setSelectionRange(0,text.length);let copied=false;try{copied=doc.execCommand('copy')}catch{}finally{input.remove();active?.focus?.()}return copied?'fallback':'manual'}
