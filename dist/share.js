const W = 1080, H = 1440;
const INK = '#614d46', MUTED = '#a78a7c', PINK = '#d794a1', CREAM = '#fffaf5';
const SANS = "'PingFang SC','Noto Sans SC','Microsoft YaHei',system-ui,sans-serif";
const FACE = "PuppyUnicode,'Noto Sans','Arial Unicode MS','DejaVu Sans',sans-serif";

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

export async function drawShareCard(canvas, face, caption, labels) {
  const scale = 0.75;
  canvas.width = W * scale; canvas.height = H * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas drawing is unavailable');
  if (document.fonts && typeof document.fonts.load === 'function') {
    try {
      await Promise.race([
        document.fonts.load('120px PuppyUnicode', face),
        new Promise(resolve => setTimeout(resolve, 350))
      ]);
    } catch (error) {}
  }
  ctx.scale(scale, scale);

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
  ctx.fillStyle = INK; ctx.fillText(face, W / 2, 510, W - 360);

  ctx.fillStyle = MUTED; ctx.font = `38px ${SANS}`; ctx.fillText(caption, W / 2, 800);

  // 分隔虚线
  ctx.strokeStyle = '#ead8d0'; ctx.lineWidth = 3; ctx.setLineDash([12, 10]);
  ctx.beginPath(); ctx.moveTo(140, 880); ctx.lineTo(W - 140, 880); ctx.stroke(); ctx.setLineDash([]);

  ctx.fillStyle = INK;
  ctx.font = `700 50px ${SANS}`;
  ctx.fillText(labels.brand, W / 2, 995, W - 300);
  ctx.fillStyle = MUTED;
  ctx.font = `34px ${SANS}`;
  ctx.fillText(labels.tagline, W / 2, 1095, W - 300);

  ctx.textAlign = 'center'; ctx.fillStyle = '#b48a90'; ctx.font = `30px ${FACE}`;
  ctx.fillText('૮₍ ˶• ﻌ •˶ ₎ა  ♡', W / 2, 1360);
  return canvas;
}
