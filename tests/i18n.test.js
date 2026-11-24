import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {PARTS,ACCESSORIES,FRESH_LOOKS,compose,cloneState} from '../dist/model.js';
import {LANGUAGE_KEY,translate,readLanguage,writeLanguage} from '../dist/i18n.js';
import {partTray} from '../dist/picker.js';

const han = /\p{Script=Han}/u;
test('all named parts, accessories, and fresh looks have English labels without altering faces',()=>{
  for(const items of [...Object.values(PARTS),...Object.values(ACCESSORIES),FRESH_LOOKS]){
    for(const item of items){const name=item.name;assert(!han.test(translate(name,'en')),name);assert.equal(translate(name,'zh'),name)}
  }
  for(const look of FRESH_LOOKS){const saved=cloneState(look.state);translate(look.name,'en');assert.equal(compose(saved),look.expected)}
});
test('static Chinese page text has complete English translations',()=>{
  // 纯文字版区块（tools/agent-text.mjs 生成，给不跑 JS 的 AI 读）故意不翻译，跳过
  const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8').replace(/<!-- agent-text:start[\s\S]*?<!-- agent-text:end -->/,'');
  for(const match of html.matchAll(/>([^<>]+)</g)){
    const text=match[1];if(!han.test(text)||text==='中文')continue;
    assert(!han.test(translate(text,'en')),text);assert.equal(translate(text,'zh'),text);
  }
});
test('dynamic counts, recipes, accessible names, and custom fields translate completely',()=>{
  const strings=['8 / 37 个零件','我的收藏，15只小狗','选择眼睛：半眯审视','选择嘴巴：调皮小舌头','换一对小耳朵：猫猫尖耳','腮红与小装饰：红扑扑','搜索选择眼睛','左眼自定义','前面的小装饰自定义','软团垂耳 / 小豆豆 / 小狗嘴 / 红扑扑 · 自定义','最近使用 · 猫猫尖耳','取消收藏 ૮₍ ˶• ﻌ •˶ ₎ა','收藏 ૮₍ ˶• ﻌ •˶ ₎ა'];
  for(const s of strings)assert(!han.test(translate(s,'en')),s);
  assert.equal(translate('8 / 37 个零件','en'),'8 / 37 parts');
  assert.equal(translate('收藏 ૮₍ ˶• ﻌ •˶ ₎ა','en'),'Save ૮₍ ˶• ﻌ •˶ ₎ა');
  assert.equal(translate('  小狗工坊 \n','en'),'  Puppy Studio \n');
});
test('language preferences persist separately and blocked storage keeps a safe Chinese default',()=>{
  const map=new Map([['puppy-factory:favorites','keep favorites'],['puppy-factory:recent-parts','keep recents']]);
  const storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
  assert.equal(readLanguage(storage),'zh');assert(writeLanguage(storage,'en'));assert.equal(readLanguage(storage),'en');
  assert(writeLanguage(storage,'zh'));assert.equal(readLanguage(storage),'zh');assert(!writeLanguage(storage,'invalid'));
  assert.equal(map.get('puppy-factory:favorites'),'keep favorites');assert.equal(map.get('puppy-factory:recent-parts'),'keep recents');
  map.set(LANGUAGE_KEY,'broken');assert.equal(readLanguage(storage),'zh');assert.equal(readLanguage(undefined),'zh');assert(!writeLanguage(undefined,'en'));
});
test('English searches find translated labels and Chinese searches still work',()=>{
  assert.deepEqual(partTray('mouth',{query:'cheeky tongue'}).visible,[27]);
  assert.deepEqual(partTray('mouth',{query:'调皮小舌头'}).visible,[27]);
  assert(partTray('eyes',{query:'sleepy'}).total>0);
  assert.deepEqual(partTray('eyes',{query:'side-eye'}).visible,[30]);
});
