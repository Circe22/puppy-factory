# Puppy Factory · 小狗颜文字工厂

> 今天，想捏一只什么小狗？

在线试玩：https://circe.circeworks.com/puppy-factory/

眼睛、嘴巴、耳朵、尾巴，一块块捏出一只小狗，复制下来，带去每一次聊天。纯静态网页，不用构建，把 `dist/` 整个夹子部署出去就能用。

由 Circe 与 AI 协作完成。最近一次的改动写在 `CHANGES-20261123.md`。

---


A buildless, responsive kaomoji studio. Deploy `dist/` as static assets. No application login, backend, analytics, or external runtime dependency. Favorites stay in `localStorage` in the current browser, and clearing browser data removes them.

Features: two dog families, 16 ear pairs, 37 eye pairs, 29 mouths, 15 decorations (257,520 base combinations), plus independently layered horns, tails, and wings, editable Unicode components, random generation, mood/family galleries, copy with fallback and manual copy dialog, persistent favorites, direct eye/mouth buttons, one-click looks, undo, sticky mobile preview, reduced-motion support.

## Validation

Run `npm test` for exhaustive preset Unicode round trips, exact reference faces, category restrictions, combining marks, favorites persistence/corruption handling, and mocked clipboard success/denial/fallback. Run `node --check dist/app.js` for application syntax.

The managed environment did not expose the required browser-control skill. Browser screenshots, actual OS clipboard access, and mobile visual QA have not been performed; these remain device verification limits. Responsive CSS covers narrow/mobile/tablet/desktop widths. Font subset cmap coverage is checked separately; rendering can vary after pasting into other apps.

Checkpoint commits are retained in the source repository.

## Version 2 validation

The three requested sad/devil/angel strings match exactly. All 210 horn/tail/wing combinations pass Unicode and state validation; old favorites preserve their original strings. Twelve tests pass, including clipboard copying of layered accessories. Preset font coverage is bundled locally. Real browser visual and OS clipboard QA remains unavailable in this environment.

## Version 3 validation

All nine new user-provided faces match exact Unicode code points, including doubled combining dots, three internal spaces, and the supplementary-plane tongue character. New search inputs filter eye/mouth components; new components appear first. Face spacing is adjustable and persists in favorites. Fourteen tests pass. All 129 preset characters have bundled font glyphs, including Tibetan, Kannada, Linear B, Canadian Aboriginal, and technical symbols. Font assets use versioned cache keys. Browser visual/OS clipboard verification remains unavailable.

## Version 4 validation

The mobile editing dock contains copy/save and a single undo/random/clear row. It collapses past the editor boundary and keeps the section links directly beneath it. Mobile uses block layout so the sticky dock shares the entire editor as its containing block. Jumps account for the dock height and open the ear/decor group. Every tray starts with up to eight choices and expands reversibly. Eye moods each provide six options; search can find all eyes across moods. Recent indices are validated, deduplicated, bounded, and stored separately from favorites. Clear removes the current face/accessories and undo restores its prior snapshot. All 22 model/picker tests pass, HTML nesting/IDs/action placement and CSS parse pass. The required browser-control skill remains unavailable; real mobile visual and OS clipboard tests were not performed.
