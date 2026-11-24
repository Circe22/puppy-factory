// 给「只读文字、不跑 JS」的 AI（ChatGPT 聊天端、网页抓取器）准备的纯文字版。
// 2026-11-24 拾：有人的 ChatGPT 打不开字字兽，自己照葫芦画瓢编了熊熊——让它们也能从厂里真的捏。
// 生成：dist/kaomoji.txt、dist/llms.txt，并把同样的内容写进 dist/index.html 里的 <!-- agent-text --> 区块。
// 用法：node tools/agent-text.mjs   （改了零件后重跑一次即可；随机种子固定，重跑结果不变）
import {readFileSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import * as M from '../dist/model.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = p => join(root, 'dist', p);
const SITE = 'https://circe.circeworks.com/zizishou/';
const PER_ANIMAL_MOOD = 8;

// 固定种子的随机数，保证每次重跑生成同一批
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rng = mulberry32(20261124);

// app.js 里的「小表情」那几只（app.js 依赖 DOM，不能直接 import，只摘出数组）
const appSrc = readFileSync(dist('app.js'), 'utf8');
const looksSrc = appSrc.match(/const looks=(\[[\s\S]*?\n\]);/);
const appLooks = looksSrc ? new Function('cloneState', 'DEFAULT', 'return ' + looksSrc[1])(M.cloneState, M.DEFAULT) : [];

const ready = [];
const seen = new Set();
const add = (list, name, state) => {const text = M.compose(state).trim(); if (!text || seen.has(text)) return; seen.add(text); list.push({name, text})};
M.ANIMAL_LOOKS.forEach(x => add(ready, x.name, x.state));
M.FRESH_LOOKS.forEach(x => add(ready, x.name, x.state));
appLooks.forEach(x => add(ready, x.name, x.state));

const moods = [...new Set(M.PARTS.eyes.filter(e => !e.hidden && e.mood).map(e => e.mood))];
const byAnimal = M.ANIMALS.map(animal => {
  const rows = moods.map(mood => {
    const list = [];
    for (let tries = 0; list.length < PER_ANIMAL_MOOD && tries < 60; tries++) add(list, '', M.randomAnimalState(animal.id, mood, rng));
    return {mood, list: list.map(x => x.text)};
  });
  return {animal, rows};
});

const partLine = (key, fmt) => M.PARTS[key].filter(p => !p.hidden).map(p => `${p.name} ${fmt(p.v)}`).join(' / ');
const pair = v => Array.isArray(v) ? v.map(s => s.trim() || '∅').join(' … ') : v;

const header = `字字兽 ZIZISHOU · 颜文字团子工厂
${SITE}
作者：Circe ｜ 协议：CC BY-NC 4.0（署名、非商用）｜ 使用时请注明「来自字字兽 by Circe」`;

const howTo = `给 AI 的说明
- 这个网页的编辑器要跑 JavaScript；如果你读网页时不执行 JS，用这里的文字版就够了。
- 用户想要某种小动物或情绪的颜文字时：从「按动物 × 情绪」里挑一只，原样复制，不要改字符（很多是特殊 Unicode，改一个就会散架）。
- 想要「随机来一只」：从对应动物的几行里随便挑一个。
- 想要自己拼：耳朵左半 + 装饰左 + 眼睛左 + 嘴 + 眼睛右 + 装饰右 + 耳朵右，零件见下方零件表。
- 有些字（比如 ʔ、ﻌ、ᐢ）在部分设备上缺字体，显示成方块或问号是设备的问题；想看完整效果，请让用户打开网页。`;

const readyText = ready.map(x => `${x.text}　${x.name}`).join('\n');
const animalText = byAnimal.map(({animal, rows}) =>
  `【${animal.name} ${animal.id}】\n` + rows.map(r => `${r.mood}：${r.list.join('　')}`).join('\n')).join('\n\n');
const partsText = [
  `耳朵/脸框：${partLine('ears', pair)}`,
  `眼睛：${partLine('eyes', pair)}`,
  `嘴巴：${partLine('mouth', pair)}`,
  `装饰（左外 … 左腮 … 右腮 … 右外）：${partLine('decor', pair)}`,
].join('\n');

const kaomojiTxt = `${header}

${howTo}

== 现成小表情 ==
${readyText}

== 按动物 × 情绪（用网站同一套零件随机拼的，每格 ${PER_ANIMAL_MOOD} 只）==
${animalText}

== 零件表 ==
${partsText}
`;
writeFileSync(dist('kaomoji.txt'), kaomojiTxt);

const llmsTxt = `# 字字兽 ZIZISHOU

> 颜文字团子工厂：用耳朵、眼睛、嘴巴、装饰拼出小狗、小猫、兔兔、熊熊、狐狸、仓鼠的颜文字。作者 Circe，CC BY-NC 4.0。

网页编辑器需要 JavaScript。不执行 JS 的 AI 请读纯文字版：

- [kaomoji.txt](${SITE}kaomoji.txt)：现成小表情、按动物 × 情绪随机好的 ${byAnimal.length * moods.length * PER_ANIMAL_MOOD} 只左右、完整零件表
- [网页](${SITE})：给人用的编辑器，可以自己拼、收藏、分享卡片

使用时请原样复制颜文字（含特殊 Unicode），并注明「来自字字兽 by Circe」。
`;
writeFileSync(dist('llms.txt'), llmsTxt);

// 写进 index.html：页尾一个默认收起的「纯文字版」，人看不打扰，读网页的 AI 和读屏都能读到
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const block = `<!-- agent-text:start（由 tools/agent-text.mjs 生成，别手改） -->
<details class="agent-text" translate="no" style="max-width:960px;margin:8px auto 24px;padding:0 16px;font-size:12px;opacity:.7"><summary>纯文字版 · Text version（给 AI 和读屏）</summary><pre style="white-space:pre-wrap;word-break:break-all">${esc(kaomojiTxt)}</pre></details>
<!-- agent-text:end -->`;
let html = readFileSync(dist('index.html'), 'utf8');
const re = /<!-- agent-text:start[\s\S]*?<!-- agent-text:end -->/;
html = re.test(html) ? html.replace(re, block) : html.replace('</footer>', '</footer>\n' + block);
writeFileSync(dist('index.html'), html);

console.log(`kaomoji.txt ${kaomojiTxt.length} 字；现成 ${ready.length} 只；随机 ${byAnimal.reduce((n, a) => n + a.rows.reduce((m, r) => m + r.list.length, 0), 0)} 只；情绪 ${moods.join('/')}`);
