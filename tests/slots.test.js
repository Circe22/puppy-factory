import test from 'node:test';
import assert from 'node:assert/strict';
import {PARTS,ACCESSORIES,DEFAULT,compose,cloneState,validState} from '../dist/model.js';

test('拆零件：删掉一只腮红、一只角、一只翅膀和尾巴，组合结果跟着变', () => {
  const s = cloneState({...DEFAULT, accessories:{horns:1, wings:2, tail:1}});
  const full = compose(s);
  s.custom.blushLeft = ''; s.custom.hornLeft = ''; s.custom.wingRight = ''; s.custom.tail = '';
  const cut = compose(s);
  assert.notEqual(cut, full);
  assert.ok(!cut.includes(ACCESSORIES.tail[1].v.trim()));
  assert.ok(!cut.endsWith(ACCESSORIES.wings[2].v[1] + PARTS.decor[s.decor].v[3]) || ACCESSORIES.wings[2].v[1] === '');
});

test('拆零件：没戴的配件，即使有自定义也不会出现', () => {
  const s = cloneState(DEFAULT);
  s.custom.tail = '〜〜'; s.custom.wingLeft = '✧';
  assert.equal(compose(s), compose(cloneState(DEFAULT)));
});

test('拆零件：新的槽位能通过收藏校验，克隆后保留', () => {
  const s = cloneState({...DEFAULT, accessories:{horns:1, wings:1, tail:1}});
  Object.assign(s.custom, {blushLeft:'', blushRight:'✿', hornLeft:'', hornRight:'^', wingLeft:'', wingRight:'ଓ', tail:''});
  assert.ok(validState(s));
  assert.equal(compose(cloneState(s)), compose(s));
  assert.ok(!validState({...s, custom:{...s.custom, unknown:'x'}}));
});
