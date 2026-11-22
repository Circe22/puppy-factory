// 2026-11-23 界（拾提）：分享卡片。把现在捏的团子画到一张 3:4 的卡片上，底下带网址和二维码，方便发小红书、朋友圈。
// 二维码是提前生成好的，指向 https://circe.circeworks.com/zizishou/（拾 11-23 定的正式地址），不连任何外部服务。
export const SHARE_URL = 'https://circe.circeworks.com/zizishou/';
const QR = ["11111110000111000010001111111","10000010110010101110001000001","10111010110100101001001011101","10111010101111111100001011101","10111010011101001001101011101","10000010000011100110101000001","11111110101010101010101111111","00000000101000100001100000000","10000010111000000111011001110","11010000001000110111000110110","00011011000000011100100100000","11101101111110010011110011000","11001010010101110001011100001","11011000101001011011101110011","11100111111011111110101001100","11110001100011101000000010101","11000110100000100100000101100","10110101101010011111101110111","11101010111001111001011011001","10100000011110110001011000000","10111111111010001100111110111","00000000110001010110100011000","11111110011001111001101011100","10000010001011000001100010001","10111010000101001011111111001","10111010001011011110110001101","10111010000000010100011111110","10000010000001111001000101101","11111110101001001101000010100"];

const W = 1080, H = 1440;
const INK = '#614d46', MUTED = '#a78a7c', PINK = '#d794a1', CREAM = '#fffaf5';
const SANS = "'PingFang SC','Noto Sans SC','Microsoft YaHei',system-ui,sans-serif";
const FACE = "PuppyUnicode,'Noto Sans','Arial Unicode MS','DejaVu Sans',sans-serif";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function drawQR(ctx, x, y, size) {
  const n = QR.length, quiet = 3, cell = size / (n + quiet * 2);
  ctx.fillStyle = '#ffffff'; roundRect(ctx, x, y, size, size, 18); ctx.fill();
  ctx.fillStyle = INK;
  QR.forEach((row, r) => { for (let c = 0; c < n; c++) if (row[c] === '1') ctx.fillRect(Math.floor(x + (c + quiet) * cell), Math.floor(y + (r + quiet) * cell), Math.ceil(cell), Math.ceil(cell)); });
}

// labels：已经翻译好的文案 {brand, tagline, scan}
export async function drawShareCard(canvas, face, caption, labels) {
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  try { await document.fonts.load(`120px PuppyUnicode`, face); await document.fonts.ready; } catch {}

  // 粉色波点纸
  ctx.fillStyle = '#fbe9ec'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(215,148,161,.38)';
  for (let y = 18; y < H; y += 36) for (let x = (y / 36) % 2 ? 36 : 18; x < W; x += 36) { ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill(); }

  // 卡片
  ctx.save(); ctx.shadowColor = 'rgba(180,94,120,.22)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14;
  ctx.fillStyle = CREAM; roundRect(ctx, 80, 120, W - 160, 1160, 48); ctx.fill(); ctx.restore();
  ctx.lineWidth = 5; ctx.strokeStyle = PINK; roundRect(ctx, 80, 120, W - 160, 1160, 48); ctx.stroke();

  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ad8878'; ctx.font = `600 26px ${SANS}`;
  ctx.fillText('T H E   L I T T L E   K A O M O J I   S T U D I O', W / 2, 220);

  // 团子本体：太长就自动缩小
  ctx.fillStyle = '#f8ece6'; roundRect(ctx, 140, 290, W - 280, 440, 36); ctx.fill();
  let size = 132; ctx.font = `${size}px ${FACE}`;
  while (ctx.measureText(face).width > W - 360 && size > 40) { size -= 4; ctx.font = `${size}px ${FACE}`; }
  ctx.fillStyle = INK; ctx.fillText(face, W / 2, 510);

  ctx.fillStyle = MUTED; ctx.font = `38px ${SANS}`; ctx.fillText(caption, W / 2, 800);

  // 分隔虚线
  ctx.strokeStyle = '#ead8d0'; ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.moveTo(140, 880); ctx.lineTo(W - 140, 880); ctx.stroke(); ctx.setLineDash([]);

  // 左边文字，右边二维码
  ctx.textAlign = 'left';
  ctx.fillStyle = INK; let bs = 54; ctx.font = `700 ${bs}px ${SANS}`; while (ctx.measureText(labels.brand).width > 480 && bs > 30) { bs -= 2; ctx.font = `700 ${bs}px ${SANS}`; } ctx.fillText(labels.brand, 150, 980);
  ctx.fillStyle = MUTED; ctx.font = `34px ${SANS}`; ctx.fillText(labels.tagline, 150, 1050);
  ctx.fillStyle = '#c67788'; ctx.font = `600 32px ${SANS}`; ctx.fillText(labels.scan, 150, 1120);
  ctx.fillStyle = MUTED; ctx.font = `26px ${SANS}`; ctx.fillText(SHARE_URL.replace('https://', ''), 150, 1180);
  ctx.strokeStyle = PINK; ctx.lineWidth = 4; roundRect(ctx, W - 150 - 270, 920, 270, 270, 22); ctx.stroke();
  drawQR(ctx, W - 150 - 262, 928, 254);

  ctx.textAlign = 'center'; ctx.fillStyle = '#b48a90'; ctx.font = `30px ${FACE}`;
  ctx.fillText('૮₍ ˶• ﻌ •˶ ₎ა  ♡', W / 2, 1360);
  return canvas;
}
