// 字体体检页生成器（2026-11-23 界）：把字字兽用到的每一个特殊字符列出来，用手机自带字体显示，
// 拾在微信里打开截图，就能看出哪些字在别人手机上会变成方框。
// 用法：node tools/glyph-check.mjs > glyph-check.html
import {PARTS, ACCESSORIES, ANIMAL_LOOKS, FRESH_LOOKS, compose} from '../dist/model.js';

const uses = new Map();
const add = (text, where) => {
  for (const ch of Array.from(text)) {
    const cp = ch.codePointAt(0);
    if (cp < 0x80 || /\s/u.test(ch)) continue;
    if (!uses.has(ch)) uses.set(ch, new Set());
    uses.get(ch).add(where);
  }
};
for (const [k, list] of Object.entries(PARTS)) list.forEach(x => add([].concat(x.v).join(''), x.name));
for (const [k, list] of Object.entries(ACCESSORIES)) list.forEach(x => add([].concat(x.v).join(''), x.name));

const chars = [...uses.keys()].sort((a, b) => a.codePointAt(0) - b.codePointAt(0));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const rows = chars.map((ch, i) => `<tr><td class="n">${i + 1}</td><td class="g">${esc(ch)}</td><td class="c">U+${ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}</td><td class="w">${esc([...uses.get(ch)].slice(0, 3).join('、'))}</td></tr>`).join('\n');
const faces = [...ANIMAL_LOOKS.map(x => [x.name, compose(x.state)]), ...FRESH_LOOKS.map(x => [x.name, compose(x.state)])]
  .map(([n, f], i) => `<tr><td class="n">${i + 1}</td><td class="f">${esc(f)}</td><td class="w">${esc(n)}</td></tr>`).join('\n');

console.log(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>字字兽 · 字体体检</title><style>
body{margin:0;padding:18px;font-family:system-ui,-apple-system,sans-serif;background:#fffaf5;color:#614d46}
h1{font-size:20px;margin:0 0 6px}h2{font-size:16px;margin:26px 0 8px}p{font-size:13px;color:#9a8277;line-height:1.7;margin:0 0 10px}
table{border-collapse:collapse;width:100%}td{border-bottom:1px solid #eddfd5;padding:6px 4px;vertical-align:middle}
.n{width:28px;color:#b39b8e;font-size:12px}.g{font-size:30px;width:52px;text-align:center}.c{font-size:11px;color:#b39b8e;width:70px}.w{font-size:12px;color:#9a8277}.f{font-size:20px}
</style></head><body>
<h1>字字兽 · 字体体检</h1>
<p>这一页故意<b>不用</b>网站自带的字体，只用你手机自己的字体，跟别人粘贴后看到的一样。<br>请在<b>微信里</b>打开，从头到尾截图发给界。哪个字变成了方框 □、问号或者空白，就是在这台手机上显示不了的字。最好安卓、苹果各测一台。</p>
<h2>一、每一个特殊字符（共 ${chars.length} 个）</h2>
<table>${rows}</table>
<h2>二、整只团子（预设造型）</h2>
<table>${faces}</table>
</body></html>`);
