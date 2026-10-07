# Little Plates – vegetarian weaning tracker

A single-page Progressive Web App for tracking a baby's first foods: five tries per food, whole-meal logging, reactions, amounts, textures, notes, favourites, allergen introductions with a one-at-a-time check, iron-rich food tracking, daily ideas and a shareable summary. Works offline and installs to an Android home screen.

All data is stored **on the device only** (browser `localStorage`). Nothing is sent anywhere. Use **Progress → Export backup** regularly.

## Deploy to GitHub Pages

1. Create a public repository, e.g. `little-plates`.
2. Upload everything in this folder to the repository root (keep the `icons/` folder).
3. Repository **Settings → Pages → Build and deployment → Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After a minute the app is live at `https://<your-username>.github.io/little-plates/`.

All paths are relative, so it works under a project sub-path without changes.

## Install on Android

Open the URL in Chrome → menu (⋮) → **Install app** (or **Add to Home screen**). The app also offers an **Install app** button on the Progress tab when Chrome allows it.

## Updating

1. Edit `index.html`.
2. In `sw.js`, bump `CACHE_VERSION` (e.g. `littleplates-v2`).
3. Commit. Installed phones pick up the change on the next launch or the one after.

## Configuration

Everything app-specific is in the **CONFIG** block at the top of the `<script>` in `index.html`:

| Setting | What it does |
|---|---|
| `CONFIG.triesTarget` | Number of try circles per food (default 5) |
| `CONFIG.allergenNudgeDays` | Flags an introduced allergen not offered for this many days (default 7) |
| `CONFIG.backupNudgeDays` | Shows a backup reminder after this many days (default 14) |
| `CONFIG.allergenGapDays` | Warns when a new allergen is logged within this many days of another new one (default 3; an app convention, not an NHS figure) |
| `CONFIG.ideasCount` | Number of "Ideas for today" cards (default 5) |
| `IRON_RICH` | Built-in foods tagged iron-rich (Fe badge, filter and weekly count) |
| `AMOUNTS` / `MEALS` | Options in the log sheets |
| `CORE` / `EXTRA` | Built-in food lists per group. `EXTRA` items are tagged "Suggested". Format `'Name'` or `'Name:allergen,allergen'` |
| `TIPS` | Preparation/safety tip shown when logging a food, keyed by food name |
| `ALLERGENS` / `CATEGORIES` | Allergen tracking cards and food groups |

Changing a built-in food's **name** changes its internal id, so existing tries for that food will no longer show. Add new foods freely; rename with care.

## Version history

| Version | Changes |
|---|---|
| v1 | Initial release |
| v2 | Log a meal, allergen one-at-a-time check, amount eaten, meal slot, ideas for today, iron-rich tags, filter counts, share summary, undo, edit custom foods, first-run welcome, sticky save buttons |

v1 backups import into v2 unchanged; the new fields are optional.

## Data and backups

- Export: Progress → Export backup (downloads a `.json` file).
- Import: Progress → Import backup (replaces everything on the device).
- Clearing Chrome's site data or uninstalling the app deletes the data — export first.

## Guidance sources

Allergen and safety copy is based on NHS Best Start in Life weaning guidance. It is a tracker, not medical advice.
