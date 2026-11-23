export {copyText} from './web-copy.js';

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
export const DEFAULT={ears:1,eyes:0,mouth:0,decor:1,custom:{},accessories:{horns:0,tail:0,wings:0,hands:0}};
export const FAVORITES_KEY='puppy-factory:favorites';
export function hasOwn(object,key){return Object.prototype.hasOwnProperty.call(object,key)}
function partValue(value,fallback){return value==null?fallback:value}
export function cloneState(s){
  return Object.assign({},s,{
    custom:Object.assign({},s.custom),
    accessories:Object.assign({horns:0,tail:0,wings:0,hands:0},s.accessories)
  });
}
// 2026-11-23 界（拾提）：带脸框的耳朵（如 ૮(ᐢ ）拆成三块：外耳、脸边、内侧，可以只删里面的小耳朵
export const EAR_FRAMES=new Set(['(',')','₍','₎','꒰','꒱','[',']','（','）','ʕ','ʔ']);
export function earPieces(str,side){
  const chars=Array.from(str);
  const left=side==='left';
  const step=left?1:-1;
  let i=left?0:chars.length-1;
  while(i>=0&&i<chars.length&&!EAR_FRAMES.has(chars[i]))i+=step;
  if(i<0||i>=chars.length)return null;
  const before=chars.slice(0,i).join('');
  const frame=chars[i];
  const after=chars.slice(i+1).join('');
  return left?{outer:before,frame,inner:after}:{inner:before,frame,outer:after};
}
const EAR_SEGMENTS={
  left:[['leftOuter','outer'],['leftFrame','frame'],['leftInner','inner']],
  right:[['rightInner','inner'],['rightFrame','frame'],['rightOuter','outer']]
};
export function earSegments(custom,ear,side){
  const base=ear.v[side==='left'?0:1];
  if(custom[side]!==undefined)return [[side,custom[side]]];
  const pieces=earPieces(base,side);
  if(!pieces)return [[side,base]];
  return EAR_SEGMENTS[side].map(([key,piece])=>[key,partValue(custom[key],pieces[piece])]);
}
function joinSegments(segments){return segments.map(([,text])=>text).join('')}
function faceValues(s,custom){
  const eyes=PARTS.eyes[s.eyes].v;
  const decor=PARTS.decor[s.decor].v;
  return {
    eyeLeft:partValue(custom.eyeLeft,eyes[0]),
    eyeRight:partValue(custom.eyeRight,eyes[1]),
    mouth:partValue(custom.mouth,PARTS.mouth[s.mouth].v),
    prefix:partValue(custom.prefix,decor[0]),
    blushLeft:partValue(custom.blushLeft,decor[1]),
    blushRight:partValue(custom.blushRight,decor[2]),
    suffix:partValue(custom.suffix,decor[3])
  };
}
export function values(s){
  const custom=s.custom||{};
  const ear=PARTS.ears[s.ears];
  return Object.assign({
    left:joinSegments(earSegments(custom,ear,'left')),
    right:joinSegments(earSegments(custom,ear,'right'))
  },faceValues(s,custom));
}
function trimEarEdge(segments,edge){
  const fromStart=edge==='start';
  for(const segment of fromStart?segments:[...segments].reverse()){
    segment[1]=segment[1].replace(fromStart?/^\s+/u:/\s+$/u,'');
    if(segment[1])return;
  }
}
export function faceSpacing(s){
  const ear=PARTS.ears[s.ears];
  return partValue(s.spacing,partValue(ear.spacing,ear.family==='classic'?'':' '));
}
function handParts(accessories,custom){
  const index=accessories.hands||0,item=(ACCESSORIES.hands||[])[index];
  if(!index||!item)return {outside:false,inside:false};
  const inside=item.pos==='in';
  return {outside:!inside,inside,left:partValue(custom.handLeft,item.v[0]),right:partValue(custom.handRight,item.v[1])};
}
// 抱在里面的手：有脸框就塞在脸框里面（ʕっ ・ᴥ・ っʔ），没有脸框就贴着耳朵内侧。
function insertInside(segments,hand,side){
  const frame=segments.findIndex(([key])=>key===side+'Frame');
  if(frame>=0)segments.splice(side==='left'?frame+1:frame,0,hand);
  else if(side==='left')segments.push(hand);
  else segments.unshift(hand);
}
export function composeParts(s){
  const custom=s.custom||{};
  const accessories=s.accessories||{};
  const ear=PARTS.ears[s.ears];
  const face=faceValues(s,custom);
  const gap=faceSpacing(s);
  const left=earSegments(custom,ear,'left');
  const right=earSegments(custom,ear,'right');
  const horns=ACCESSORIES.horns[accessories.horns||0].v;
  const wings=ACCESSORIES.wings[accessories.wings||0].v;
  const tail=ACCESSORIES.tail[accessories.tail||0].v;
  // 2026-11-23 拾：手从耳朵和装饰里拆出来，单独一个零件。举在外面的贴着耳朵外侧，抱在里面的贴着脸框内侧。
  const hand=handParts(accessories,custom);
  if(hand.inside){insertInside(left,['handLeft',hand.left],'left');insertInside(right,['handRight',hand.right],'right')}
  if(accessories.horns){
    trimEarEdge(left,'end');
    trimEarEdge(right,'start');
  }
  return [
    ['prefix',face.prefix],
    ['wingLeft',accessories.wings?partValue(custom.wingLeft,wings[0]):''],
    ...(hand.outside?[['handLeft',hand.left]]:[]),
    ...left,
    ['hornLeft',accessories.horns?partValue(custom.hornLeft,horns[0]):''],
    ['blushLeft',face.blushLeft],
    ['eyeLeft',face.eyeLeft],
    ['leftGap',gap],
    ['mouth',face.mouth],
    ['rightGap',gap],
    ['eyeRight',face.eyeRight],
    ['blushRight',face.blushRight],
    ['hornRight',accessories.horns?partValue(custom.hornRight,horns[1]):''],
    ...right,
    ...(hand.outside?[['handRight',hand.right]]:[]),
    ['wingRight',accessories.wings?partValue(custom.wingRight,wings[1]):''],
    ['tail',accessories.tail?partValue(custom.tail,tail):''],
    ['suffix',face.suffix]
  ];
}
export function compose(s){return joinSegments(composeParts(s))}
export function randomState(family=null,mood=null,rng=Math.random){const pick=a=>a[Math.floor(rng()*a.length)];const indexes=(key,fn)=>PARTS[key].map((v,i)=>({v,i})).filter(x=>!x.v.hidden&&(!fn||fn(x.v))).map(x=>x.i);return {ears:pick(indexes('ears',family?v=>v.family===family:null)),eyes:pick(indexes('eyes',mood?v=>v.mood===mood:null)),mouth:pick(indexes('mouth')),decor:pick(indexes('decor')),custom:{}}}
// Random and ready-made little creatures share the same existing Unicode composer.
export function randomAnimalState(animalId,mood=null,rng=Math.random){
  const animal=ANIMALS.find(a=>a.id===animalId);
  if(!animal)throw new RangeError('Unknown animal: '+animalId);
  const state=randomState(null,mood,rng);
  // 2026-11-23 拾：打了 noRandom 的耳朵（两对耳朵的 ૮(ᐢ ᐢ)ა、她不想随机到的长耳）随机时不抽；用户自己选照样能用。
  const allEars=PARTS.ears.map((_,i)=>i).filter(i=>animalForEar(i)===animalId);
  const ears=allEars.filter(i=>!PARTS.ears[i].noRandom).length?allEars.filter(i=>!PARTS.ears[i].noRandom):allEars;
  state.ears=ears[Math.min(ears.length-1,Math.floor(rng()*ears.length))];
  state.mouth=animal.mouthIndex;
  // 2026-11-23 界（拾发现「四个爪爪」）：耳朵里已经带了 ฅ 之类的字，随机时就不再配同样字的装饰，免得重复
  const earChars=new Set(Array.from(PARTS.ears[state.ears].v.join('')).filter(ch=>ch.trim()&&!/[()₍₎\[\]]/u.test(ch)));
  // 2026-11-23 拾：耳朵里带手（っ ฅ ／＼ o( )o）时，也不配带手的装饰。只管随机，用户自己拼不拦。
  const earHands=!!PARTS.ears[state.ears].hands;
  const clashes=i=>(earHands&&!!PARTS.decor[i].hands)||Array.from(PARTS.decor[i].v.join('')).some(ch=>earChars.has(ch));
  if(clashes(state.decor)){const ok=PARTS.decor.map((_,i)=>i).filter(i=>!clashes(i));if(ok.length)state.decor=ok[Math.floor(rng()*ok.length)]}
  return state;
}
export const ANIMAL_LOOKS=ANIMALS.map(animal=>({
  id:animal.id,name:animal.name+'团子',
  state:Object.assign(cloneState(DEFAULT),{ears:animal.earIndex,mouth:animal.mouthIndex})
}));
export function validState(s){return !!s&&(s.spacing===undefined||s.spacing===''||s.spacing===' ')&&['ears','eyes','mouth','decor'].every(k=>Number.isInteger(s[k])&&s[k]>=0&&s[k]<PARTS[k].length)&&(!s.accessories||(typeof s.accessories==='object'&&Object.entries(s.accessories).every(([k,v])=>hasOwn(ACCESSORIES,k)&&Number.isInteger(v)&&v>=0&&v<ACCESSORIES[k].length)))&&(!s.custom||Object.entries(s.custom).every(([k,v])=>['left','right','eyeLeft','eyeRight','mouth','prefix','suffix','blushLeft','blushRight','hornLeft','hornRight','wingLeft','wingRight','tail','leftOuter','leftFrame','leftInner','rightInner','rightFrame','rightOuter','handLeft','handRight'].includes(k)&&typeof v==='string'&&Array.from(v).length<=16&&!/[\u0000-\u001f\u007f\u202a-\u202e\u2066-\u2069]/u.test(v)))}
export function readFavorites(storage){try{const data=JSON.parse(storage.getItem(FAVORITES_KEY)||'[]');return Array.isArray(data)?data.filter(validState).slice(0,500).map(cloneState):[]}catch(error){return []}}
export function writeFavorites(storage,list){try{storage.setItem(FAVORITES_KEY,JSON.stringify(list));return true}catch(error){return false}}

// 2026-11-23 界（拾说「你现在用的这个也好可爱」）：把 ٩(ˊᗜˋ*)و 拆成零件加进来，只往后追加，不改已有编号
const cheerEyes=addPart('eyes',{name:'弯弯笑眼',v:['ˊ','ˋ'],mood:'开心'});
const cheerMouth=addPart('mouth',{name:'张嘴大笑',v:'ᗜ'});
const tightEars=addPart('ears',{name:'紧凑圆脸',v:['(',')'],family:'soft',spacing:''});
const cheerDecor=addPart('decor',{name:'举手欢呼',v:['٩','','*','و']});
FRESH_LOOKS.push({name:'欢呼团子',expected:'٩(ˊᗜˋ*)و',state:{ears:tightEars,eyes:cheerEyes,mouth:cheerMouth,decor:cheerDecor,spacing:''}});

// 2026-11-23 界（拾：「加个这个气气素材好不好？」૮₍ꐦ˶•᷅ ﻌ •᷄˶₎ა）：拆成零件，只往后追加，不改已有编号
const angryEyes=addPart('eyes',{name:'皱眉豆豆眼',v:['•᷅','•᷄'],mood:'生气'});
const snugSoftEars=addPart('ears',{name:'软团贴脸',v:['૮₍','₎ა'],family:'soft',spacing:' '});
const angryDecor=addPart('decor',{name:'气鼓鼓',v:['','ꐦ˶','˶','']});
FRESH_LOOKS.push({name:'气气团子',expected:'૮₍ꐦ˶•᷅ ﻌ •᷄˶₎ა',state:{ears:snugSoftEars,eyes:angryEyes,mouth:0,decor:angryDecor}});

// 2026-11-23 界（拾丢来一串 12 只：「按照我们的 live 2d 的形式切分塞到素材里」）：只往后追加，不改已有编号。
// (◍•ᴗ•◍)❤ 的 ❤ 在 iOS/微信会变彩色 emoji，换成 ♡。
const padMouth=addPart('mouth',{name:'肉垫小嘴',v:'ࡇ'});
const pointMouth=addPart('mouth',{name:'尖尖小嘴',v:'^'});
const waveMouth=addPart('mouth',{name:'波浪小嘴',v:'~'});
const boxMouth=addPart('mouth',{name:'小方嘴',v:'⌔'});
// 憋泪小猫的嘴两边要两个空格，但收藏只认 '' 或 ' ' 的间距，所以把多出的空格放进嘴里（同「趴睡小鼻子」的做法）。
const wideSulkMouth=addPart('mouth',{name:'憋住的小尖嘴',v:' ‸ '});
const smugEyes=addPart('eyes',{name:'挑眉眯眼',v:['-̀','-́'],mood:'日常'});
const softEyes=addPart('eyes',{name:'软软眯眼',v:['´͈','`͈'],mood:'撒娇'});
const huffEyes=addPart('eyes',{name:'鼓气斜眼',v:['´','｀'],mood:'生气'});
const holdTearEyes=addPart('eyes',{name:'憋泪一线',v:['_','_ ̥'],mood:'委屈'});
const frownEyes=addPart('eyes',{name:'皱眉圆眼',v:['•︡','•︠'],mood:'委屈'});
const sobEyes=addPart('eyes',{name:'哭唧唧',v:['꒦ິ','꒦ິ'],mood:'委屈'});
const glowEyes=addPart('eyes',{name:'亮晶晶豆豆',v:['•͈','•͈'],mood:'撒娇'});
const rollEyes=addPart('eyes',{name:'翻白眼',v:['◔','◔'],mood:'日常'});
const fistEars=addPart('ears',{name:'握拳小手',v:['o(',')o'],family:'soft',spacing:''});
const cheekEars=addPart('ears',{name:'大圆脸蛋',v:['(O ',' O)'],family:'soft',spacing:' '});
const heartDecor=addPart('decor',{name:'小心心',v:['','','','♡']});
const ballDecor=addPart('decor',{name:'圆圆腮',v:['','◍','◍','']});
const ballHeartDecor=addPart('decor',{name:'圆腮比心',v:['','◍','◍','♡']});
const dotDecor=addPart('decor',{name:'小句点',v:['｡','','','｡']});
FRESH_LOOKS.push(
 {name:'肉垫笑笑狗',expected:'૮₍ ˶ᵕࡇᵕ˶ ₎ა',state:{ears:1,eyes:27,mouth:padMouth,decor:1,spacing:''}},
 {name:'挑眉小狗',expected:'૮₍ ˶-̀ ᴗ -́˶ ₎ა',state:{ears:1,eyes:smugEyes,mouth:2,decor:1}},
 {name:'软软比心',expected:'( ´͈ ᵕ `͈ )♡',state:{ears:8,eyes:softEyes,mouth:9,decor:heartDecor,spacing:' '}},
 {name:'鼓气包',expected:'o(´^｀)o',state:{ears:fistEars,eyes:huffEyes,mouth:pointMouth,decor:0}},
 {name:'憋泪小猫',expected:'ᐢ_  ‸  _ ̥ᐢ',state:{ears:12,eyes:holdTearEyes,mouth:wideSulkMouth,decor:0,spacing:' '}},
 {name:'皱眉委屈',expected:'•︡ᯅ•︠',state:{ears:14,eyes:frownEyes,mouth:6,decor:0}},
 {name:'哭唧唧',expected:'꒦ິ^꒦ິ',state:{ears:14,eyes:sobEyes,mouth:pointMouth,decor:0}},
 {name:'圆腮比心',expected:'(◍•ᴗ•◍)♡',state:{ears:24,eyes:0,mouth:2,decor:ballHeartDecor}},
 {name:'扑扑小天使',expected:'⁽⁽ଘ( ˊᵕˋ )ଓ⁾⁾',state:{ears:8,eyes:13,mouth:9,decor:0,accessories:{wings:1}}},
 {name:'大圆脸笑',expected:'(O ^ ~ ^ O)',state:{ears:cheekEars,eyes:14,mouth:waveMouth,decor:0}},
 {name:'亮晶晶',expected:'(◍•͈⌔•͈◍)',state:{ears:24,eyes:glowEyes,mouth:boxMouth,decor:ballDecor}},
 {name:'翻白眼',expected:'｡◔‸◔｡',state:{ears:14,eyes:rollEyes,mouth:25,decor:dotDecor}},
);

// 2026-11-23 拾：「左内侧、右内侧其实也是手」——给带手的零件偷偷打标签，随机时手不和手撞。
for(const i of [11,16,19,20,fistEars])PARTS.ears[i].hands=true;
for(const i of [3,10,11,15])PARTS.decor[i].hands=true;
// 2026-11-23 拾：「喜欢 ₍ᐢ ᐢ₎ 这种，不要长耳朵了」。
// 旧的两款兔耳留在零件库（收藏过的人不变样），但不进随机；兔兔默认换成软团兔耳。
const softBunnyEars=addPart('ears',{name:'兔兔团耳',v:['₍ᐢ ',' ᐢ₎'],animal:'rabbit',spacing:''});
const snugBunnyEars=addPart('ears',{name:'兔兔贴脸',v:['₍ᐢ','ᐢ₎'],animal:'rabbit',spacing:''});
PARTS.ears[16].noRandom=true;
PARTS.ears[17].noRandom=true;
ANIMALS.find(a=>a.id==='rabbit').earIndex=softBunnyEars;
ANIMAL_LOOKS.find(l=>l.id==='rabbit').state.ears=softBunnyEars;

// 2026-11-23 18:01 拾：评论区说「凸^-^凸 这个很可爱 贱贱的」，加进素材；库里已有的（^ 笑弯了）不重复加。
// 凸 是常用汉字，手机自带中文字体都有，不用另外打字体包。
const flipEars=addPart('ears',{name:'凸凸手',v:['凸','凸'],family:'soft',spacing:'',hands:true});
const dashMouth=addPart('mouth',{name:'一字小嘴',v:'-'});
FRESH_LOOKS.push({name:'贱贱团子',expected:'凸^-^凸',state:{ears:flipEars,eyes:14,mouth:dashMouth,decor:0}});

// 2026-11-23 18:29 拾：「分类有点乱，特别是耳朵和手……把手拆开放到耳朵装饰这一边」。
// 手单独做成一个零件（存在 accessories.hands，和角、尾巴、翅膀一样可以单独换）。
// 原来绑着手的耳朵、装饰都不删（收藏过的团子打开还是原样），只是从列表和随机里藏起来。
ACCESSORIES.hands=[
  {name:'不带手',v:['','']},
  {name:'举起爪爪',v:['ฅ','ฅ'],pos:'out'},
  {name:'凸凸手',v:['凸','凸'],pos:'out'},
  {name:'握拳小手',v:['o','o'],pos:'out'},
  {name:'欢呼小手',v:['٩','و'],pos:'out'},
  {name:'抱抱小手',v:['っ','っ'],pos:'in'},
  {name:'伸出小爪',v:['',' っ'],pos:'out'},
  {name:'捧着心心',v:['',' つ♡'],pos:'out'}
];
export const HANDS={paws:1,flip:2,fist:3,cheer:4,hug:5,reach:6,heart:7};
const foxPointEars=addPart('ears',{name:'狐狸尖尖',v:['^','^'],animal:'fox',spacing:''});
const cheerStarDecor=addPart('decor',{name:'星星腮',v:['','','*','']});
for(const i of [11,19,20,fistEars,flipEars]){PARTS.ears[i].hidden=true;PARTS.ears[i].noRandom=true}
for(const i of [3,10,11,cheerDecor])PARTS.decor[i].hidden=true;
// 狐狸默认换成蓬蓬耳（不带手），按「狐狸」时和预览长得一样。
ANIMALS.find(a=>a.id==='fox').earIndex=21;
ANIMAL_LOOKS.find(l=>l.id==='fox').state.ears=21;
// 用到旧捆绑零件的现成造型，换成「干净耳朵 + 小手」，拼出来一字不差。
const withHands=(look,patch,hands)=>{Object.assign(look.state,patch);look.state.accessories=Object.assign({horns:0,tail:0,wings:0},look.state.accessories,{hands})};
withHands(FRESH_LOOKS.find(l=>l.name==='鼓气包'),{ears:tightEars},HANDS.fist);
withHands(FRESH_LOOKS.find(l=>l.name==='欢呼团子'),{decor:cheerStarDecor},HANDS.cheer);
withHands(FRESH_LOOKS.find(l=>l.name==='贱贱团子'),{ears:freshEars[2]},HANDS.flip);

// 2026-11-23 18:54 拾：想要 = = 这种眯眯眼；软软眯眼、亮晶晶豆豆也都留着。
addPart('eyes',{name:'眯眯眼',v:['=','='],mood:'撒娇'});

// 2026-11-23 19:18 拾：小猫、狐狸、兔兔都用 ᐢ，看着一样。
// 狐狸回到原来的 ฅ^ ^ฅ（干净尖耳 + 自动配的爪爪）；小猫换成大三角耳 /ᐠ ᐟ\（字体包 19，DejaVu Sans）。
const catTriEars=addPart('ears',{name:'猫猫三角耳',v:['/ᐠ','ᐟ\\'],animal:'cat',spacing:''});
ANIMALS.find(a=>a.id==='cat').earIndex=catTriEars;
ANIMAL_LOOKS.find(l=>l.id==='cat').state.ears=catTriEars;
const fox=ANIMALS.find(a=>a.id==='fox');fox.earIndex=foxPointEars;fox.hands=HANDS.paws;
Object.assign(ANIMAL_LOOKS.find(l=>l.id==='fox').state,{ears:foxPointEars,accessories:{horns:0,tail:0,wings:0,hands:HANDS.paws}});

// 2026-11-23 19:34 拾：狐狸是尖耳朵，ᐢ⸝ ⸝ᐢ 更像兔兔。
// 原「狐狸蓬蓬」原地改名「蓬松兔耳」、归到兔兔（字不变，收藏不变样）；另做尖尖的「蓬松狐耳」。
Object.assign(PARTS.ears[21],{name:'蓬松兔耳',animal:'rabbit'});
addPart('ears',{name:'蓬松狐耳',v:['^⸝ ',' ⸝^'],animal:'fox',spacing:''});
// 兔兔长耳去掉里面的小耳朵，只留外面的斜线，叫「垂耳兔」。旧的藏起来，收藏过的照旧。
addPart('ears',{name:'垂耳兔',v:['／( ',' )＼'],animal:'rabbit',spacing:''});
Object.assign(PARTS.ears[16],{hidden:true,noRandom:true});
// 拾 11-23 说过兔兔随机只要 ₍ᐢ ᐢ₎ 这种，新归来的两款兔耳只给自己挑，不进随机。
PARTS.ears[21].noRandom=true;PARTS.ears[PARTS.ears.length-1].noRandom=true;

// 2026-11-23 19:38 拾：OuO UuU OvO OAO OaO 这种字母脸。补字母嘴和 O、U 两种眼睛。
['小u嘴|u','小v嘴|v','大A嘴|A','小a嘴|a'].forEach(x=>{const [name,v]=x.split('|');addPart('mouth',{name,v})});
addPart('eyes',{name:'大O眼',v:['O','O'],mood:'日常'});
addPart('eyes',{name:'U形眼',v:['U','U'],mood:'困困'});

// 2026-11-24 00:42 拾发来一篮子新零件：可爱腮红、猫耳朵、右边装饰、眼镜、星星、蝴蝶结、四叶草。
// 查过都不重复。冷门字（⪩⪨ ⎚ ᨓ ྀི 𖧧 ꕤ ࣪ 等）另外打了字体包 20 号起。写法保持 ES2017，方便合进小工具版。
const earIndex=function(name){return PARTS.ears.findIndex(function(x){return x.name===name})};
const cuteBlush=addPart('decor',{name:'可爱腮红',v:['','๑','๑','']});
const dotMouth=addPart('mouth',{name:'小圆点嘴',v:'.'});
addPart('ears',{name:'尖尖猫耳',v:['⪩ ',' ⪨'],animal:'cat'});
addPart('decor',{name:'右边小撇撇',v:['','','','ˊˎ˗']});
addPart('decor',{name:'星星点点',v:['✩.*˚ ','','','']});
addPart('decor',{name:'四叶草',v:['','','',' ⋆𖧧˚🍀˚⊹ ࣪ ˖｡ꕤ']});
// 蝴蝶结 ྀི 是要贴在前一个字上的小符号，单独放会挂在空格上。照常见写法贴在脸框 ꒰ ꒱ 后面，做成一对耳朵。
const bowEars=addPart('ears',{name:'蝴蝶结团耳',v:['꒰ྀི ',' ꒱ྀི'],animal:'hamster'});
// 眼镜脸没有耳朵：做一个藏起来的「不带耳朵」，只给眼镜团子用，不进列表、不进随机。
const noEars=addPart('ears',{name:'不带耳朵',v:['',''],spacing:'',hidden:true,noRandom:true});
const squareGlasses=addPart('eyes',{name:'方框眼镜',v:['⎚','⎚'],mood:'日常'});
const armGlasses=addPart('eyes',{name:'带腿眼镜',v:['ˋ⎚','⎚ˊ'],mood:'日常'});
const glassesMouth=addPart('mouth',{name:'小波浪嘴',v:'ᨓ'});
FRESH_LOOKS.push(
 {name:'腮红团子',expected:'(๑• . •๑)',state:{ears:earIndex('紧凑圆脸'),eyes:0,mouth:dotMouth,decor:cuteBlush,spacing:' '}},
 {name:'眼镜团子',expected:'⎚ᨓ⎚',state:{ears:noEars,eyes:squareGlasses,mouth:glassesMouth,decor:0}},
 {name:'斯文团子',expected:'ˋ⎚⤚⎚ˊ',state:{ears:noEars,eyes:armGlasses,mouth:5,decor:0}},
 {name:'蝴蝶结团子',expected:'꒰ྀི ˶• ᴗ •˶ ꒱ྀི',state:{ears:bowEars,eyes:0,mouth:2,decor:1}}
);
