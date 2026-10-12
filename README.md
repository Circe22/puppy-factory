# Puppy Factory

A buildless, responsive kaomoji studio. Deploy `dist/` as static assets. No application login, backend, analytics, or external runtime dependency. Favorites stay in `localStorage` in the current browser, and clearing browser data removes them.

Features: two dog families, 8 ear pairs, 12 eye pairs, 12 mouths, 8 decorations (9,216 preset combinations), editable Unicode components, random generation, mood/family galleries, copy with fallback and manual copy dialog, persistent favorites, keyboard-accessible part tabs, reduced-motion support.

## Validation

Run `npm test` for exhaustive preset Unicode round trips, exact reference faces, category restrictions, combining marks, favorites persistence/corruption handling, and mocked clipboard success/denial/fallback. Run `node --check dist/app.js` for application syntax.

The managed environment did not expose the required browser-control skill. Browser screenshots, actual OS clipboard access, and mobile visual QA have not been performed; these remain device verification limits. Responsive CSS covers narrow/mobile/tablet/desktop widths. Font subset cmap coverage is checked separately; rendering can vary after pasting into other apps.

Checkpoint commits are retained in the source repository.
