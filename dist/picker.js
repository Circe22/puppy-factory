import {translate} from './i18n.js?v=31';
import {PARTS, ACCESSORIES, NEW_PARTS, DEFAULT, cloneState} from './model.js?v=28';

export const RECENT_KEY = 'puppy-factory:recent-parts';
const OPTIONS = {...PARTS, ...ACCESSORIES};
export const EYE_MOODS = {
  '开心': [3, 2, 14, 20, 26, 31],
  '困': [4, 5, 24, 28, 33, 36],
  '哭': [7, 16, 17, 18, 32, 34],
  '坏笑': [30, 11, 15, 19, 9, 25],
  '害羞': [13, 27, 11, 0, 21, 8],
};
const COMMON = {
  eyes: [0, 1, 3, 4, 12, 30, 31, 32],
  mouth: [0, 2, 3, 4, 6, 9, 15, 26],
  ears: [1, 0, 2, 3, 7, 8, 12, 13],
  decor: [1, 0, 2, 3, 6, 9, 11, 14],
};
function validIndex(key, value) {
  return Number.isInteger(value) && value >= 0 && value < (OPTIONS[key]?.length || 0);
}
export function cleanRecent(data) {
  const result = {};
  if (!data || typeof data !== 'object' || Array.isArray(data)) return result;
  for (const key of Object.keys(OPTIONS)) {
    if (Array.isArray(data[key])) result[key] = [...new Set(data[key].filter(i => validIndex(key, i)))].slice(0, 8);
  }
  return result;
}
export function readRecent(storage) {
  try { return cleanRecent(JSON.parse(storage.getItem(RECENT_KEY) || '{}')); }
  catch { return {}; }
}
export function usePart(recent, key, index) {
  const next = cleanRecent(recent);
  if (validIndex(key, index)) next[key] = [index, ...(next[key] || []).filter(i => i !== index)].slice(0, 8);
  return next;
}
export function writeRecent(storage, recent) {
  try { storage.setItem(RECENT_KEY, JSON.stringify(cleanRecent(recent))); return true; }
  catch { return false; }
}
export function partTray(key, {recent = {}, expanded = false, query = '', mood = '常用'} = {}) {
  const items = OPTIONS[key] || [];
  const order = [...new Set([
    ...(cleanRecent(recent)[key] || []), ...(COMMON[key] || []), ...(NEW_PARTS[key] || []),
    ...items.map((_, i) => i),
  ])].filter(i => validIndex(key, i));
  const q = query.trim().toLowerCase();
  const candidates = order.filter(i => {
    if (items[i].hidden) return false;
    if (q) return (items[i].name + ' ' + translate(items[i].name,'en') + ' ' + (Array.isArray(items[i].v) ? items[i].v.join(' ') : items[i].v)).toLowerCase().includes(q);
    return key !== 'eyes' || mood === '常用' || (EYE_MOODS[mood] || []).includes(i);
  });
  return {visible: expanded ? candidates : candidates.slice(0, 8), total: candidates.length, hasMore: candidates.length > 8};
}
export function clearFace(state) {
  const empty = cloneState(DEFAULT);
  empty.ears = state.ears;
  empty.decor = 0;
  empty.custom = {eyeLeft: '', eyeRight: '', mouth: ''};
  return empty;
}
export function compactDock({mobile, workbenchTop, wasCompact = false}) {
  // Hysteresis avoids toggling near the sticky boundary as mobile browser chrome moves.
  return mobile && workbenchTop < (wasCompact ? 4 : -12);
}
export function anchorTop(sectionTop, scrollY, dockHeight, mobile) {
  return Math.max(0, sectionTop + scrollY - (mobile ? dockHeight + 12 : 24));
}
