import test from 'node:test';
import assert from 'node:assert/strict';
import {PARTS,ACCESSORIES,DEFAULT,compose,composeParts,cloneState,validState} from '../dist/model.js';

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

test('随机：耳朵带爪爪时，不再配「举起爪爪」装饰（不会出现四个爪爪）', async () => {
  const {randomAnimalState, ANIMALS, PARTS} = await import('../dist/model.js');
  for (const a of ANIMALS) {
    for (let i = 0; i < 300; i++) {
      const s = randomAnimalState(a.id);
      const ears = PARTS.ears[s.ears].v.join(''), decor = PARTS.decor[s.decor].v.join('');
      if (ears.includes('ฅ')) assert.ok(!decor.includes('ฅ'), `${a.id}: ${ears} + ${decor}`);
    }
  }
});

test('拆耳朵：带脸框的耳朵拆成外耳、脸边、内侧，可以只删里面的小耳朵', async () => {
  const {earPieces} = await import('../dist/model.js');
  assert.deepEqual(earPieces('૮(ᐢ ', 'left'), {outer:'૮', frame:'(', inner:'ᐢ '});
  assert.deepEqual(earPieces(' ᐢ)ა', 'right'), {inner:' ᐢ', frame:')', outer:'ა'});
  assert.equal(earPieces('ᐢ', 'left'), null);
  const rabbit = PARTS.ears.findIndex(x => x.v[0] === '૮(ᐢ ');
  const s = cloneState({...DEFAULT, ears: rabbit});
  const full = compose(s);
  s.custom.leftInner = ''; s.custom.rightInner = '';
  const cut = compose(s);
  assert.ok(full.includes('ᐢ') && !cut.includes('ᐢ'));
  assert.ok(cut.includes('૮(') && cut.includes(')ა'));
  assert.ok(validState(s));
});

test('预览分段：脸边和内耳各自定位，戴角后复制仍保留原始字形', () => {
  const ears = PARTS.ears.findIndex(part => part.v[0] === '૮(ᐢ ');
  const state = cloneState({...DEFAULT, ears, decor:0, accessories:{horns:1}});
  state.custom = {leftInner:'  ', rightInner:'  ', hornLeft:'^', hornRight:'^', eyeLeft:'˃̣̣̥'};
  const pieces = new Map(composeParts(state));

  assert.deepEqual(
    ['leftFrame', 'leftInner', 'hornLeft', 'eyeLeft', 'hornRight', 'rightInner', 'rightFrame']
      .map(key => pieces.get(key)),
    ['(', '', '^', '˃̣̣̥', '^', '', ')']
  );
  assert.equal(compose(state), '૮(^˃̣̣̥ﻌ•^)ა');
});

test('随机：耳朵里带手（如 ʕっ っʔ）时，不配带手的装饰；用户手动拼不受影响', async () => {
  const {randomAnimalState, ANIMALS, PARTS, compose, cloneState, validState} = await import('../dist/model.js');
  let handEars = 0;
  for (const a of ANIMALS) {
    for (let i = 0; i < 400; i++) {
      const s = randomAnimalState(a.id);
      if (PARTS.ears[s.ears].hands) { handEars++; assert.ok(!PARTS.decor[s.decor].hands, `${a.id}: ${compose(s)}`); }
    }
  }
  // 2026-11-23：手拆成单独零件后，绑着手的耳朵不再进随机。
  assert.equal(handEars, 0, '随机里不该再抽到绑着手的耳朵');
  const bear = PARTS.ears.findIndex(e => e.v[0] === 'ʕっ ');
  const paws = PARTS.decor.findIndex(d => d.v[0] === 'ฅ ');
  const manual = cloneState({ears: bear, eyes: 0, mouth: 0, decor: paws});
  assert.ok(validState(manual));
  assert.ok(compose(manual).includes('ฅ') && compose(manual).includes('っ'));
});

test('随机：外耳和内侧都是耳朵的 ૮(ᐢ ᐢ)ა 不会被随机出来，但手动能选', async () => {
  const {randomAnimalState, ANIMALS, PARTS, compose, cloneState, validState} = await import('../dist/model.js');
  const double = PARTS.ears.findIndex(e => e.v[0] === '૮(ᐢ ');
  assert.ok(PARTS.ears[double].noRandom);
  for (const a of ANIMALS) for (let i = 0; i < 400; i++) assert.notEqual(randomAnimalState(a.id).ears, double, a.id);
  const manual = cloneState({ears: double, eyes: 0, mouth: 0, decor: 0});
  assert.ok(validState(manual)); assert.ok(compose(manual).startsWith('૮(ᐢ'));
});

test('兔兔：默认和随机都用 ₍ᐢ ᐢ₎ 这类软团兔耳，不再随机出长耳', async () => {
  const {randomAnimalState, ANIMALS, ANIMAL_LOOKS, PARTS, compose} = await import('../dist/model.js');
  const rabbit = ANIMALS.find(a => a.id === 'rabbit');
  assert.equal(PARTS.ears[rabbit.earIndex].v[0], '₍ᐢ ');
  assert.ok(compose(ANIMAL_LOOKS.find(l => l.id === 'rabbit').state).startsWith('₍ᐢ'));
  for (let i = 0; i < 400; i++) assert.ok(PARTS.ears[randomAnimalState('rabbit').ears].v[0].startsWith('₍ᐢ'));
});
