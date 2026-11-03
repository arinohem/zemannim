# Decisions log

Each rule implemented in the app, its source, and its status.
Status: **MT** = read in the Mishne Tora (mechon-mamre.org) · **Comm.** = Rambam's Commentary on the Mishna (Sefaria, Vilna ed.) · **Inferred** = our conclusion · **Choice** = decided by the owner · **Setting** = can be switched in the app.
Halakha numbers follow mechon-mamre.org; where they differ from the printed editions, the printed number follows in brackets.

## Times

| Rule | Implementation | Source | Status |
|---|---|---|---|
| Seasonal hours | Sunrise → sunset, ÷ 12 | Tefilla 3:1 (prayer starts «עם הנץ החמה»; 4th hour = «שליש היום»); 3:4 (minḥa «עד שתשקע החמה») | Inferred; Choice |
| Ṣeth ha-kokhaḇim = end of Shabbath and festivals | 20 fixed minutes after sunset | Terumoth 7:2: «וזה העת כמו שליש שעה אחר שקיעת החמה»; Shabbath 5:4 (three medium stars, no minutes) | MT; Choice; **Setting** (20/18) |
| Alternative 18 min | ¾ mil × 24 min | Mil = «שני חומשי שעה משעות ההשויה» (Comm. Pesaḥim 3:2). Where the Rambam states ¾ mil himself: **not found** | Comm.; Inferred |
| ʿAloth ha-shaḥar | 1.2 seasonal *day* hours before sunrise | Comm. Berakhoth 1:1: «בכדי שעה וחומש שעה מן השעות הזמניות». The MT uses dawn only as a limit (Qeriʾath Shemaʿ 1:10–13; Tefilla 3:6–7) without an interval in the chapters read. Day vs night seasonal hour: text silent; day hour chosen | Comm.; Inferred; Choice; **Setting** (show/hide) |
| End of morning Shemaʿ | 3 hours | Qeriʾath Shemaʿ 1:12–14 | MT |
| End of Shaḥrith | 4 hours | Tefilla 3:1 | MT |
| End of Musaf (only on Musaf days) | 7 hours | Tefilla 3:5 | MT |
| Midday | 6 hours | Tefilla 3:9 («חצי היום») | MT |
| Minḥa geḏola / qeṭanna | 6½ / 9½ hours | Tefilla 3:2, 3:4 | MT |
| 1¼ hours before sunset | 10¾ hours (MT wording, not called פלג המנחה) | Tefilla 3:4: «עד שיישאר מן היום שעה ורביע; ויש לו להתפלל אותה, עד שתשקע החמה» | MT |
| Midnight | Midpoint sunset → next sunrise | Qeriʾath Shemaʿ 1:10 («חצי הלילה», undefined) | Inferred |
| Candle lighting | **Not shown** | Shabbath 5:3: «מבעוד יום, קודם שקיעת החמה» (no minutes) | MT; Choice |
| Sun | Sea level, no elevation (NOAA, zenith 90°50′) | Passages read say only «הנץ החמה» / «שקיעת החמה» | Choice |
| "Fixed" intervals | 20/18 min are clock minutes | Text does not say equal vs seasonal | Choice |
| Rounding | Prudent: deadlines down, beginnings up | Not an MT rule | Choice; **Setting** |
| Removed | טלית ותפילין, רבינו תם, MG"A times, maqam, anything ʿOḇaḏya Yosef / Sephardi | — | Choice |

## Liturgy

| Rule | Implementation | Source | Status |
|---|---|---|---|
| Nefilath appayim omitted | Shabbath, festivals, Ḥol ha-moʿeḏ, Rosh ha-Shana, Rosh Ḥoḏesh, Ḥanukka, Purim (local day), Minḥa on eve of Shabbath and festivals; never at ʿArḇith | Tefilla 5:16 [15]: «מנהג פשוט… שאין נפילת פנים בשבתות ובמועדות, ולא בראש השנה, ולא בראשי חודשים ובחנוכה ופורים, ולא במנחה של ערבי שבתות וימים טובים, ולא בערבית שבכל יום» | MT; Ḥol ha-moʿeḏ included by Choice |
| Yom ha-Kippurim | At every prayer, including the ʿArḇith that opens it | Tefilla 5:16 [15]: «וביום הכיפורים בלבד, נופלין על פניהם בכל תפילה ותפילה» | MT |
| Eve of Kippur, Minḥa | Nefilath appayim is said (not a festival eve) | Sheḇithath Yom Ṭoḇ 1:1: the «ימים טובים» are six days (Pesaḥ 1st and 7th, Sukkoth 1st and 8th, Shaḇuʿoth, 1 Tishri); Kippur is not among them, and Tefilla 5:16 [15] treats it as a separate category. Applying the 1:1 definition to Tefilla 5:16 is ours. Teshuḇa 2:9 [7] (confession on the eve) is silent on nefilath appayim | MT; Inferred; Choice (owner, 2026-11-02) |
| Tishʿa be-Aḇ and all other days | Nefilath appayim is said | Not listed in 5:16 [15] | Choice (owner: omit only where MT states it) |
| Mention of rain | «משיב הרוח ומוריד הגשם» from Musaf of Shemini ʿAṣereth (diaspora: first day) to Shaḥrith of 1st day of Pesaḥ; nothing in summer | Dates: Tefilla 2:17, 2:19. Wording: Italian rite (MT 2:17 has «מוריד הגשם» / «מוריד הטל») | MT; Choice |
| Request for rain | Israel: from 7 Marḥeshwan. Diaspora: from the 60th day after tequfath Tishri, tequfa day = day 1. Until rain is no longer mentioned | Tefilla 2:18 («שואלין את הגשמים ביום שישים אחר תקופת תשרי»; «כל זמן שמזכיר הגשם»). The MT names Shinʿar, Syria, Egypt «והדומין להן»: applying it to Europe is ours | MT; Inferred |
| Tequfa | **Chapter 9** (365¼ days; tequfath Nisan of year 1 = 7d 9h 642p before molad Nisan, 9:3). Alternative chapter 10 (365d 5h 997p 48r; 9h 642p before molad, 10:3), called «האמת יותר» (10:6): request ~11 days earlier (2026: 24 Nov instead of 5 Dec) | Qiddush ha-Ḥoḏesh 9–10 | MT; Choice; **Setting** (reversible) |
| Israel / diaspora | From location (approximate border) | — | Choice; **Setting** (auto/on/off) |
| Purim | 15 Aḏar within ~6 km of Jerusalem's Old City, else 14; Aḏar II in leap years | — | Choice; **Setting** (auto/on/off) |
| Parasha | Annual cycle; reading of the chosen location; when Israel and diaspora differ, the other is shown below | Tefilla 13:1. Algorithm ours, checked against Hebcal for 5600–6199: 0 differences | Verified |
| Hafṭaroth | **Not implemented.** Owner's plan (2026-11-02): lists for the Italian, Ashkenazi, and Sephardi rites, but only if the Ashkenazi list can be traced to Western Ashkenazi sources and the Sephardi list to Western Sephardi sources / the Rambam; otherwise Italian only | To find. Candidate for the Rambam (UNKNOWN, to verify): the order of haftaroth in Tefilla 13 and in the order of prayers at the end of Sefer Ahaḇa | To do |
| Parasha romanization | Checked against the Maḥazor project (2026-11-03): it has no list of the parashiyyoth; its transliteration rules match the app's except gimel refuyya (gh there, ḡ here by the owner's later rule) | Maḥazor `.claude/rules/rubriche.md` | Done |
| Time zone | City list: fixed zone; GPS: device zone | — | Choice |

## Interface

| Rule | Implementation | Source | Status |
|---|---|---|---|
| Languages | Hebrew terms always shown; captions in Italian, English, or French; a fourth option shows Hebrew only | — | Choice (owner, 2026-11-02); **Setting** |
| Romanization by language | Italian: an accent — à, è (seḡol), é (ṣere), ì, ò, ù — marks the stress only where Italian spelling would not predict it (2026-11-03). A word ending in a vowel reads as piana, so the accent marks *tronche* (Minḥà, Ḥayyé Sarà, Teṣawwè, Wayḥì, Tishrì). A word ending in a consonant reads as tronca, so the accent marks milleʿel words (Sheminì ʿAṣèreth, as the Maḥazor writes it; Pèsaḥ, Rosh Ḥòḏesh, ʿaloth ha-shàḥar, appàyim, Wayyésheḇ, Qòraḥ, ʿÉqeḇ, Wayyélekh). A milleʿel word ending in a vowel has none (Haʾazinu); nor do monosyllables (Bo, and Noaḥ, whose pathaḥ is furtive). English and French: the same forms without accents (Minḥa, Ḥayye Sara) | Stress from the Masoretic accents of the verses that name the parashiyyoth (Sefaria, Miqra according to the Masorah): milleʿel: הַאֲזִ֥ינוּ, וַיֵּ֣שֶׁב, קֹ֔רַח, עֵ֣קֶב, וַיֵּ֖לֶךְ, נֹ֔חַ; the rest final (שָׂרָ֔ה included); segholates and the dual (פֶּסַח, חֹדֶשׁ, עֲצֶרֶת, שַׁחַר, אַפַּיִם) by grammar | Choice (owner, 2026-11-02); stresses Verified |
| Refuyyoth | ḇ, ḡ, ḏ, kh, f, th in every language (Sheḇaṭ, Meḡillà, Ḥoḏesh); kaf and taw can be switched to ḵ, ṯ (setting, default kh, th; 2026-11-03); pe stays f; replaces the older v, gh, dh. Only a real refuyya takes the line: after a silent shewa the letter is plain (Bemiḏbar) | — | Choice (owner, 2026-11-02) |
| ʾAlef | Consonantal ʾalef is written ʾ (Reʾé, Haʾazinu, Waʾerà, Waʾethḥannan, Qeriʾath); not word-initially, also after a prefix hyphen (Emor, Elul, be-Aḇ); quiescent ʾalef is not written (Bereshith, Rosh, Wayyiqrà, Ṣeth) | — | Choice (owner, 2026-11-03) |
| Romanization exceptions | ʿArḇith (spirant, as in the Maḥazor, although the shewa is silent; 2026-11-03); Tazriaʿ (title form, not Thazriaʿ from כִּי תַזְרִיעַ); after a hyphen (article, prefixes) the daḡesh forte is not written: the hyphen replaces the gemination (ha-kokhaḇim, ha-moʿeḏ) | — | Choice (owner, 2026-11-02) |
| Names of grammatical signs | Romanized from the pointing of the traditional academic grammars, not the modern Israeli one (סֶגּוֹל, פַּתָּח): seḡol, pathaḥ, daḡesh | Gesenius–Kautzsch–Cowley §8 d («סְגוֹל», «פַּ֫תַח»), §12 b (Dageš, root דגשׁ; «דָּגֵשׁ») | Choice (owner, 2026-11-03); forms Verified |
| Deadline captions | Italian «Termine per», English «Latest time for», French «Heure limite pour» (Shemaʿ, Shaḥrith, Musaf, minḥa qeṭanna, and «termine preferibile» for the evening Shemaʿ at midnight, 2026-11-03); «Fine» / «End» / «Fin» kept for the end of Shabbath and of the festival | — | Choice (owner, 2026-11-02) |
| Transliteration of כ and ת | Setting «Traslitterazione di כ e ת» (EN «Romanization», FR «Translittération»): kh, th (default) or ḵ, ṯ. The sources store ḵ, ṯ, which occur only in transliteration; the display turns them into kh, th. App-wide default: `translit` in `DEFAULTS`, `ui.js` | — | Choice (owner, 2026-11-03); **Setting** |
| Transliteration of ב | Separate setting «Traslitterazione di ב» (EN «Romanization of ב», FR «Translittération de ב»): ḇ (default) or v. Kept apart from kaf and taw because the treatment of beth is less widely agreed. Sources store ḇ; app-wide default: `beth` in `DEFAULTS`, `ui.js` | — | Choice (owner, 2026-11-03); **Setting** |
| Decisions page | Italian only for now; may be translated later | — | Choice |
| English and French texts | Drafted by Claude; to be reviewed by the owner | — | To do |
| Italian texts | Interface, captions, and decisions page: full review of the Italian (style, terminology, consistency), not yet done | — | To do (owner, 2026-11-03) |
| Minor festivals and recurrences | Decide which to mark (now shown: Rosh Ḥodesh, Ḥanukka, Purim besides the festivals) | — | To do (owner, 2026-11-03) |
| Seasonal changes | Review how to mark changes such as the start of the request for rain and of the mention of rain | — | To do (owner, 2026-11-03) |
| Israel / diaspora readings | Review whether and how to mark weeks when the weekly reading differs (now: the other reading is shown below) | — | To do (owner, 2026-11-03) |
