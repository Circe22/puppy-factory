import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ANIMALS,ANIMAL_LOOKS,PARTS,DEFAULT,FRESH_LOOKS,animalForEar,randomAnimalState,compose,cloneState,validState,readFavorites,writeFavorites,copyText} from '../dist/model.js';

test('all six animal groups have different editable, Unicode-safe sample faces',()=>{
  assert.equal(ANIMALS.length,6);
  assert.equal(new Set(ANIMALS.map(a=>a.id)).size,ANIMALS.length);
  assert.equal(ANIMAL_LOOKS.length,ANIMALS.length);
  const faces=new Set();
  for(const look of ANIMAL_LOOKS){
    assert(validState(look.state));
    assert.equal(animalForEar(look.state.ears),look.id);
    const rendered=compose(look.state);
    assert(!rendered.includes('undefined')&&!rendered.includes('null'));
    assert.equal(Buffer.from(rendered).toString('utf8'),rendered);
    assert(!faces.has(rendered),'duplicate sample: '+look.name);
    faces.add(rendered);
  }
});
test('animal ear selection and mood-filtered randomness stay in the chosen species',()=>{
  for(const animal of ANIMALS){
    for(const mood of ['开心','困困','委屈']){
      for(let i=0;i<30;i++){
        const state=randomAnimalState(animal.id,mood);
        assert(validState(state));
        assert.equal(animalForEar(state.ears),animal.id);
        assert.equal(PARTS.eyes[state.eyes].mood,mood);
      }
    }
  }
  assert.throws(()=>randomAnimalState('not-an-animal'),RangeError);
});
test('the original dog and all nine fresh faces retain their exact Unicode',()=>{
  assert.equal(compose(DEFAULT),'૮₍ ˶• ﻌ •˶ ₎ა');
  for(const look of FRESH_LOOKS)assert.equal(compose(look.state),look.expected,look.name);
  assert.equal(animalForEar(0),'dog');
  assert.equal(animalForEar(12),'cat');
});
test('new animals survive favorites, clipboard and editing without changing the saved face',async()=>{
  for(const look of ANIMAL_LOOKS){
    const saved=cloneState(look.state);
    const expected=compose(saved);
    let persisted,clipboard;
    const storage={getItem:()=>persisted,setItem:(_,text)=>persisted=text};
    assert(writeFavorites(storage,[saved]));
    assert.equal(compose(readFavorites(storage)[0]),expected);
    assert.equal(await copyText(expected,{clipboard:{writeText:async s=>clipboard=s}},{}),'clipboard');
    assert.equal(clipboard,expected);
    const edited=cloneState(saved);edited.eyes=(edited.eyes+1)%PARTS.eyes.length;
    assert.notEqual(compose(edited),expected);
    assert.equal(compose(saved),expected);
  }
});
