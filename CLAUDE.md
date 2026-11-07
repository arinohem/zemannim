# Zemannim secondo il Mishne Tora — instructions for Claude

A personal web app (PWA) for the owner's iPhone. It shows the day's halakhic times, the Hebrew date, the parasha and a few liturgical notes, **according to the Mishne Tora (MT) only**. It is served by GitHub Pages from the root of `main`: https://arinohem.github.io/zemannim/

Read `DECISIONS.md` before changing any rule. Every rule there was settled with the owner; do not change one silently. Record decisions only in DECISIONS.md and the in-app decisions page; do not create ADRs or CONTEXT.md in this project.

## Halakhic ground rules (owner's instructions)

- **Mishne Tora only.** No Shulḥan ʿArukh, Mishna Berura, R. ʿOḇaḏya Yosef, Sephardi customs (e.g. maqam) or later poseqim. Where the MT is silent, do not fill the gap: say so and ask the owner. The Rambam's Commentary on the Mishna may be used only where the owner has agreed, and must be labelled as such.
- **Liturgical wording** follows the Italian rite where the owner said so (e.g. «משיב הרוח ומוריד הגשם»; nothing in summer).
- **Verify, never infer.** Before stating what a source says, fetch and read it. MT text: mechon-mamre.org (URL pattern `https://mechon-mamre.org/i/BTCC.htm`: B = book, T = treatise, CC = chapter; e.g. Tefilla 3 = `2203`, Shabbath 5 = `3105`, Terumoth 7 = `7307`, Qiddush ha-Ḥoḏesh 9 = `3809`). Avoid chabad.org. Label claims VERIFIED / INFERRED / UNKNOWN. Never turn a qualified statement into a categorical one; absence of mention is not evidence of absence.
- If a source cannot be fetched, say so; do not cite it.

## Language and romanization

- UI: Italian and Hebrew. Halakhic terms appear in Hebrew script (like the Zemaneh Yosef app); Italian captions underneath.
- Romanization: scientific, based on ISO 259, with the owner's exceptions: `sh` for ש; daḡesh forte doubled (not for sh); no daḡesh lene doubling; no vowel quantity; ṣere = e; refuyyoth → ḇ, ḡ, ḏ, kh, f, th (b and d with a line below, g with a line above because of the letter's shape); kaf and taw are switchable to ḵ, ṯ by a setting, so **in the code and the decisions page always write ḵ and ṯ, never kh and th, in transliterated Hebrew** (the display converts them; `translit` in `ui.js`); beth has its own setting (ḇ or v, `beth` in `ui.js`), so always write ḇ in the sources; after a hyphen (article, prefixes) the hyphen replaces the gemination, so no doubling (ha-kokhaḇim); owner's exceptions: ʿArḇith (spirant, as in the Maḥazor), Tazriaʿ; no matres lectionis (Tora, not Torah); ʾalef written ʾ when consonantal (Reʾé, Haʾazinu, Qeriʾath), but not word-initially, also after a prefix hyphen (Emor, be-Aḇ), and not when quiescent (Bereshith, Wayyiqrà); classical grammar always (mobile vs quiescent shewa: שַׁחְרִית = Shaḥrith).
- Italian romanization follows the owner's Maḥazor conventions: an accent (à, è for seḡol, é for ṣere, ì, ò, ù) marks the stress only where Italian spelling would not predict it: words ending in a vowel read as piane, so tronche are accented (Minḥà, Meḡillà, Ḥayyé Sarà, Teṣawwè, Wayḥì); words ending in a consonant read as tronche, so milleʿel words are accented (Sheminì ʿAṣèreth, Pèsaḥ, Ḥòḏesh, ʿÉqeḇ). No accent on milleʿel words ending in a vowel (Haʾazinu) or on monosyllables (Bo, Noaḥ with furtive pathaḥ). Check the stress, e.g. on the Masoretic accents. The Maḥazor project's own rules are in Dropbox `0_progetto_mahazor_italiano/.claude/rules/rubriche.md`.
- English text uses Oxford British spelling (-ize: romanization; but -yse, -our).
- English, French, and any other language: the same romanization without those accents (`sciRoman` in `engine.js`).
- The app's name is **Zemannim** (daḡesh in the nun).
- Italian: no doubled gender forms; use the generic masculine.

## Code layout

- `engine.js` — all calculations, no dependencies: Hebrew calendar (Reingold–Dershowitz arithmetic), festivals (Israel/diaspora), parashiyyoth, sun (NOAA, sea level), MT times, nefilath appayim, rain, tequfa (MT Qiddush ha-Ḥoḏesh 9 and 10).
- `ui.js` — interface, settings (localStorage), Italian/Hebrew texts, geolocation, place lookup (bundled list; optional OpenStreetMap lookup).
- `placename.js` — Hebrew spelling of town names (rules per language; DECISIONS.md). `places.json` — the bundled town list, built by `tools/build_places.py` from GeoNames (cache in `tools/cache/`, not committed), with `tools/place-exceptions.tsv` (traditional Hebrew names), `notes/place-name/east-names.json` and the z/s data; English pronunciations in `tools/english-ipa.tsv` (`tools/build_english.py`). Rebuild places.json after changing any of these.
- `tools/index.src.html` — page template, styles, and the in-app "Note sulle scelte" (decisions page, in Italian). **Edit this, not `index.html`.**
- `tools/build.py` — writes `index.html`; `--preview` writes a single-file `preview.html` (scripts inlined) for previews where external files can't load.
- `sw.js` — offline cache. **Bump the cache name (`mt-zemanim-vN`) whenever any served file changes**, or installed copies may keep old files.
- `tests/` — `npm install` then `npm test`. Compares Hebrew dates (1900–2100) and parashiyyoth (5600–6199, Israel and diaspora) with @hebcal/core (dev only, GPL; never ship it), and sunrise/sunset with Hebcal's NOAA. `npm test` fails on any date or parasha mismatch, or if sunrise/sunset differs from Hebcal by more than 5 seconds.

## Workflow

1. Change `engine.js` / `ui.js` / `tools/index.src.html`.
2. `python3 tools/build.py`, `npm test`.
3. If a rule changed, update `DECISIONS.md` and the decisions page in `tools/index.src.html`.
4. Bump the cache name in `sw.js`.
5. `README.md` holds the owner-approved descriptions of the app for outside users (Italian; a short one at the top, then the full one). After every revision of the app, check it against the change and submit it to the owner again, with any proposed edits; change it only with the owner's approval.
6. Commit and push to `main` (Pages deploys from there). If working on another branch, merge into `main` when the owner approves.
