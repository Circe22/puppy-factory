import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PARTS,ACCESSORIES,FRESH_LOOKS,compose,cloneState,validState} from '../dist/model.js';
import {RECENT_KEY,EYE_MOODS,readRecent,usePart,writeRecent,partTray,clearFace,compactDock,anchorTop} from '../dist/picker.js';

test('every category starts with at most eight choices; expansion restores all',()=>{
  for(const [key,items] of Object.entries({...PARTS,...ACCESSORIES})){
    const short=partTray(key);assert.equal(short.visible.length,Math.min(8,items.length));assert.equal(short.total,items.length);
    assert.equal(short.hasMore,items.length>8);
    const full=partTray(key,{expanded:true});assert.equal(full.visible.length,items.length);assert.equal(new Set(full.visible).size,items.length);
  }
});
test('mood tabs each offer six valid eyes and retain their recent ordering',()=>{
  for(const [mood,indices] of Object.entries(EYE_MOODS)){
    assert.equal(indices.length,6);assert(indices.every(i=>PARTS.eyes[i]));
    const tray=partTray('eyes',{mood});assert.equal(tray.visible.length,6);assert.deepEqual(new Set(tray.visible),new Set(indices));
    const recent=usePart({},'eyes',indices.at(-1));assert.equal(partTray('eyes',{mood,recent}).visible[0],indices.at(-1));
  }
});
test('search finds hidden choices across moods and never changes the source collection',()=>{
  const all=PARTS.eyes.length;
  assert.deepEqual(partTray('eyes',{mood:'开心',query:'≖'}).visible,[30]);
  assert.deepEqual(partTray('mouth',{query:'𐃷'}).visible,[27]);
  assert.equal(partTray('eyes',{query:'no-such-puppy'}).total,0);
  assert.equal(PARTS.eyes.length,all);
});
test('recent parts are unique, newest first, bounded, persistent, and isolated from favorites',()=>{
  let recent={};for(let i=0;i<12;i++)recent=usePart(recent,'mouth',i);
  assert.equal(recent.mouth.length,8);assert.equal(recent.mouth[0],11);
  recent=usePart(recent,'mouth',7);assert.equal(recent.mouth[0],7);assert.equal(recent.mouth.filter(i=>i===7).length,1);
  assert.equal(partTray('mouth',{recent}).visible[0],7);
  const data=new Map([['puppy-factory:favorites','keep these puppies']]);const storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v)};
  assert(writeRecent(storage,recent));assert.deepEqual(readRecent(storage),recent);assert.equal(data.get('puppy-factory:favorites'),'keep these puppies');assert(data.has(RECENT_KEY));
});
test('invalid and blocked recent storage falls back safely without hiding all parts',()=>{
  assert.deepEqual(readRecent(undefined),{});assert(!writeRecent(undefined,{}));
  assert.deepEqual(readRecent({getItem:()=>'{broken'}),{});
  const recent=readRecent({getItem:()=>JSON.stringify({eyes:[999,-1,0,0,'1'],mouth:'bad',unknown:[0]})});
  assert.deepEqual(recent,{eyes:[0]});assert.equal(partTray('eyes',{recent}).visible.length,8);
});
test('clear removes the current face and accessories while leaving a restorable snapshot',()=>{
  const previous=cloneState({...FRESH_LOOKS[7].state,ears:1,accessories:{horns:1,tail:2,wings:1}}),before=compose(previous);
  const cleared=clearFace(previous);assert(validState(cleared));assert.equal(cleared.ears,previous.ears);
  assert.deepEqual(cleared.accessories,{horns:0,tail:0,wings:0});assert.equal(cleared.custom.eyeLeft,'');assert.equal(cleared.custom.eyeRight,'');assert.equal(cleared.custom.mouth,'');assert.equal(cleared.decor,0);
  assert.equal(compose(previous),before);assert.equal(compose(cloneState(previous)),before);
});
test('mobile dock collapses after the sticky boundary and expands when returning',()=>{
  assert(!compactDock({mobile:true,workbenchTop:100}));assert(compactDock({mobile:true,workbenchTop:-20}));
  assert(compactDock({mobile:true,workbenchTop:0,wasCompact:true}));assert(!compactDock({mobile:true,workbenchTop:5,wasCompact:true}));
  assert(!compactDock({mobile:false,workbenchTop:-500,wasCompact:true}));
});
test('anchor jumps use the measured dock height and keep the heading below it',()=>{
  for(const dockHeight of [130,160,220]){
    const top=anchorTop(500,100,dockHeight,true);assert.equal(600-top,dockHeight+12);
  }
  assert.equal(anchorTop(500,100,220,false),576);assert.equal(anchorTop(0,0,200,true),0);
});
