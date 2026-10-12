import{test}from'node:test';import assert from'node:assert/strict';import{PARTS,ACCESSORIES,FRESH_LOOKS,DEFAULT,cloneState,compose,randomState,validState,readFavorites,writeFavorites,copyText}from'../dist/model.js';
test('two requested dogs are preserved byte for byte',()=>{assert.equal(compose(DEFAULT),'૮₍ ˶• ﻌ •˶ ₎ა');assert.equal(compose({ears:0,eyes:1,mouth:0,decor:0,custom:{}}),'U・ﻌ・U')});
test('every combination remains valid Unicode and survives UTF-8 and JSON',()=>{let count=0;for(let ears=0;ears<PARTS.ears.length;ears++)for(let eyes=0;eyes<PARTS.eyes.length;eyes++)for(let mouth=0;mouth<PARTS.mouth.length;mouth++)for(let decor=0;decor<PARTS.decor.length;decor++){const s={ears,eyes,mouth,decor,custom:{}};const text=compose(s);assert(validState(s));assert(!text.includes('undefined'));assert.equal(Buffer.from(text).toString('utf8'),text);assert.equal(compose(JSON.parse(JSON.stringify(s))),text);count++}assert.equal(count,Object.values(PARTS).reduce((n,items)=>n*items.length,1))});
test('combining diacritics and emoji are copied without normalization',()=>{const s={...DEFAULT,eyes:7,custom:{suffix:' 🐾'}};const t=compose(s);assert(t.includes('o̴̶̷᷄'));assert(t.includes('o̴̶̷̥᷅'));assert(t.endsWith(' 🐾'));assert.equal(compose(cloneState(s)),t)});
test('random categories stay in the requested family and mood',()=>{for(const f of ['soft','classic'])for(const mood of ['日常','开心','撒娇','困困','委屈'])for(let i=0;i<100;i++){const s=randomState(f,mood);assert(validState(s));assert.equal(PARTS.ears[s.ears].family,f);assert.equal(PARTS.eyes[s.eyes].mood,mood)}});
test('favorites persist; malformed and blocked storage do not crash',()=>{const store=new Map(),storage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)};assert(writeFavorites(storage,[DEFAULT,{...DEFAULT,eyes:7}]));assert.deepEqual(readFavorites(storage),[DEFAULT,{...DEFAULT,eyes:7}]);store.set('puppy-factory:favorites','not json');assert.deepEqual(readFavorites(storage),[]);store.set('puppy-factory:favorites',JSON.stringify([{...DEFAULT,ears:999},DEFAULT,{...DEFAULT,custom:{suffix:'\u202e'}}]));assert.equal(readFavorites(storage).length,1);assert.deepEqual(readFavorites(undefined),[]);assert.equal(writeFavorites(undefined,[]),false)});
function fakeDocument(copyResult=true){let input,removed=false,focused=false;return{get removed(){return removed},get focused(){return focused},get input(){return input},activeElement:{focus(){focused=true}},createElement(){return input={value:'',style:{},setAttribute(){},focus(){},select(){},setSelectionRange(start,end){assert.equal(start,0);assert.equal(end,this.value.length)},remove(){removed=true}}},body:{append(){}},execCommand(cmd){assert.equal(cmd,'copy');return copyResult}}}
test('Clipboard API receives exact rendered Unicode',async()=>{for(const s of [DEFAULT,{...DEFAULT,eyes:7},{...DEFAULT,custom:{suffix:' 🐾'}}]){const text=compose(s);let written;assert.equal(await copyText(text,{clipboard:{writeText:async x=>{written=x}}},{}),'clipboard');assert.equal(written,text)}});
test('denied or missing Clipboard API falls back with identical text and restores focus',async()=>{for(const nav of [{},{clipboard:{writeText:async()=>{throw Error('denied')}}}]){const doc=fakeDocument();const text=compose({...DEFAULT,eyes:7});assert.equal(await copyText(text,nav,doc),'fallback');assert.equal(doc.input.value,text);assert(doc.removed);assert(doc.focused)}});
test('failed fallback offers manual copy, never a false success',async()=>{const doc=fakeDocument(false);assert.equal(await copyText(compose(DEFAULT),{},doc),'manual');assert(doc.removed)});
test('requested sad puppy, devil horns, and flapping angel are exact',()=>{
 assert.equal(compose({...cloneState(DEFAULT),eyes:12,mouth:6}),'૮₍ ˶- ᯅ -˶ ₎ა');
 assert.equal(compose({...cloneState(DEFAULT),accessories:{horns:1,tail:0,wings:0}}),'૮₍^ ˶• ﻌ •˶^ ₎ა');
 assert.equal(compose({...cloneState(DEFAULT),ears:8,eyes:13,mouth:9,decor:0,accessories:{horns:0,tail:0,wings:1}}),'⁽⁽ଘ( ˊᵕˋ )ଓ⁾⁾');
});
test('all accessory layers combine independently and preserve Unicode',()=>{
 for(let horns=0;horns<ACCESSORIES.horns.length;horns++)for(let tail=0;tail<ACCESSORIES.tail.length;tail++)for(let wings=0;wings<ACCESSORIES.wings.length;wings++){
  const s={...cloneState(DEFAULT),accessories:{horns,tail,wings}},text=compose(s);assert(validState(s));assert.equal(Buffer.from(text).toString(),text);assert.equal(compose(cloneState(s)),text);
 }
 const s={...cloneState(DEFAULT),accessories:{horns:1,tail:1,wings:1}};
 assert.equal(compose(s),'⁽⁽ଘ૮₍^ ˶• ﻌ •˶^ ₎აଓ⁾⁾ ↝');
 const t=cloneState(s);t.accessories.tail=0;assert.equal(s.accessories.tail,1);assert(!compose(t).includes('↝'));assert(compose(t).includes('^'));assert(compose(t).includes('ଘ'));
});
test('version 1 favorites retain exact face and upgrade accessory defaults',()=>{
 const old={ears:1,eyes:7,mouth:0,decor:2,custom:{}};const storage={getItem:()=>JSON.stringify([old])};const list=readFavorites(storage);assert.equal(list.length,1);assert.equal(compose(list[0]),compose(old));assert.deepEqual(list[0].accessories,{horns:0,tail:0,wings:0});
 assert(!validState({...old,accessories:{horns:99}}));assert(!validState({...old,accessories:{wings:-1}}));assert(!validState({...old,accessories:{unknown:1}}));
});
test('layered accessories and old favorites survive storage and exact clipboard copying',async()=>{
 const s={...cloneState(DEFAULT),accessories:{horns:2,tail:2,wings:2}};let serialized,written;const storage={setItem:(_,v)=>serialized=v,getItem:()=>serialized};assert(writeFavorites(storage,[s]));assert.equal(compose(readFavorites(storage)[0]),compose(s));assert.equal(await copyText(compose(s),{clipboard:{writeText:async x=>written=x}},{}),'clipboard');assert.equal(written,compose(s));
});
test('all nine user-provided faces are exact, editable, savable and copied unchanged',async()=>{
 for(const look of FRESH_LOOKS){
  const s=cloneState(look.state);assert(validState(s));assert.equal(compose(s),look.expected);
  let serialized,written;const storage={getItem:()=>serialized,setItem:(_,v)=>serialized=v};assert(writeFavorites(storage,[s]));assert.equal(compose(readFavorites(storage)[0]),look.expected);
  await copyText(compose(s),{clipboard:{writeText:async x=>written=x}},{});assert.equal(written,look.expected);
  const edited=cloneState(s);edited.mouth=(edited.mouth+1)%PARTS.mouth.length;assert.notEqual(compose(edited),look.expected);assert.equal(compose(s),look.expected);
 }
});
test('spacing choice persists and does not strip the sleeping nose or tears',()=>{
 const sleep=cloneState(FRESH_LOOKS[8].state);assert.equal(compose(sleep),'(՞_   ̫ _՞)ᐝ');assert.equal(compose({...sleep,spacing:' '}),'(՞_    ̫  _՞)ᐝ');
 assert.equal(compose({...cloneState(FRESH_LOOKS[4].state),spacing:''}),'՞⩌‸⩌՞');
 const tears=compose(FRESH_LOOKS[2].state);assert(tears.includes('˃̣̣̥'));assert.equal([...tears].filter(c=>c==='̣').length,4);
 assert(!validState({...sleep,spacing:'invalid'}));assert(validState({...sleep,spacing:''}));
});
