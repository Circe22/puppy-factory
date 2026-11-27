import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PARTS,ACCESSORIES,HANDS,DEFAULT,FRESH_LOOKS,ANIMALS,ANIMAL_LOOKS,compose,cloneState,validState,randomState,randomAnimalState} from '../dist/model.js';
import {partTray} from '../dist/picker.js';

const face=o=>compose({...cloneState(DEFAULT),...o,accessories:{...DEFAULT.accessories,...o.accessories}});

test('hands combine freely with any ears', () => {
  assert.equal(face({ears:18,accessories:{hands:HANDS.hug}}),'ʕっ ˶• ﻌ •˶ っʔ');
  assert.equal(face({ears:18,accessories:{hands:HANDS.flip}}),'凸ʕ ˶• ﻌ •˶ ʔ凸');
  assert.equal(face({ears:1,accessories:{hands:HANDS.paws}}),'ฅ૮₍ ˶• ﻌ •˶ ₎აฅ');
});
test('old bundled looks rebuild exactly from clean ears + hands', () => {
  for(const look of FRESH_LOOKS)assert.equal(compose(look.state),look.expected,look.name);
  assert.equal(face({ears:18,decor:0,accessories:{hands:HANDS.hug}}),face({ears:19,decor:0}));
});
test('old favorites with bundled parts still load and look the same', () => {
  const old={ears:19,eyes:0,mouth:0,decor:11,custom:{},accessories:{horns:0,tail:0,wings:0}};
  assert.ok(validState(old));
  assert.equal(compose(cloneState(old)),compose(old));
  assert.ok(validState({...old,custom:{handLeft:'ฅ'},accessories:{hands:2}}));
});
test('bundled ears and hand decor are hidden from trays and random', () => {
  for(const key of ['ears','decor']){
    const shown=partTray(key,{expanded:true}).visible;
    assert.ok(shown.every(i=>!PARTS[key][i].hidden),key);
  }
  assert.ok(partTray('hands',{expanded:true}).visible.length===ACCESSORIES.hands.length);
  let seed=1;const rng=()=>(seed=(seed*16807)%2147483647)/2147483647;
  for(let i=0;i<400;i++){
    const s=randomState(null,null,rng);assert.ok(!PARTS.ears[s.ears].hidden&&!PARTS.decor[s.decor].hidden);
    for(const a of ANIMALS){const t=randomAnimalState(a.id,null,rng);assert.ok(!PARTS.ears[t.ears].hidden,a.id)}
  }
});
test('animal buttons match their preview', () => {
  for(const a of ANIMALS){const look=ANIMAL_LOOKS.find(l=>l.id===a.id);assert.equal(look.state.ears,a.earIndex);assert.ok(!PARTS.ears[a.earIndex].hidden,a.id)}
});
