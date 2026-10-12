# Puppy Factory

A buildless, responsive kaomoji studio. Deploy `dist/` as static assets. No application login, backend, analytics, or external runtime dependency. Favorites stay in `localStorage` in the current browser, and clearing browser data removes them.

Features: two dog families, 12 ear pairs, 30 eye pairs, 24 mouths, 14 decorations (120,960 base combinations), plus independently layered horns, tails, and wings, editable Unicode components, random generation, mood/family galleries, copy with fallback and manual copy dialog, persistent favorites, direct eye/mouth buttons, one-click looks, undo, sticky mobile preview, reduced-motion support.

## Validation

Run `npm test` for exhaustive preset Unicode round trips, exact reference faces, category restrictions, combining marks, favorites persistence/corruption handling, and mocked clipboard success/denial/fallback. Run `node --check dist/app.js` for application syntax.

The managed environment did not expose the required browser-control skill. Browser screenshots, actual OS clipboard access, and mobile visual QA have not been performed; these remain device verification limits. Responsive CSS covers narrow/mobile/tablet/desktop widths. Font subset cmap coverage is checked separately; rendering can vary after pasting into other apps.

Checkpoint commits are retained in the source repository.

## Version 2 validation

The three requested sad/devil/angel strings match exactly. All 210 horn/tail/wing combinations pass Unicode and state validation; old favorites preserve their original strings. Twelve tests pass, including clipboard copying of layered accessories. Preset font coverage is bundled locally. Real browser visual and OS clipboard QA remains unavailable in this environment.
