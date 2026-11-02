# Decisions log

Each rule implemented in the app, its source, and its status.
Status: **MT** = read in the Mishne Tora (mechon-mamre.org) · **Comm.** = Rambam's Commentary on the Mishna (Sefaria, Vilna ed.) · **Inferred** = our conclusion · **Choice** = decided by the owner · **Setting** = can be switched in the app.
Halakha numbers follow mechon-mamre.org; where they differ from the printed editions, the printed number follows in brackets.

## Times

| Rule | Implementation | Source | Status |
|---|---|---|---|
| Seasonal hours | Sunrise → sunset, ÷ 12 | Tefilla 3:1 (prayer starts «עם הנץ החמה»; 4th hour = «שליש היום»); 3:4 (minḥa «עד שתשקע החמה») | Inferred; Choice |
| Ṣeth ha-kokhavim = end of Shabbath and festivals | 20 fixed minutes after sunset | Terumoth 7:2: «וזה העת כמו שליש שעה אחר שקיעת החמה»; Shabbath 5:4 (three medium stars, no minutes) | MT; Choice; **Setting** (20/18) |
| Alternative 18 min | ¾ mil × 24 min | Mil = «שני חומשי שעה משעות ההשויה» (Comm. Pesaḥim 3:2). Where the Rambam states ¾ mil himself: **not found** | Comm.; Inferred |
| ʿAlòth ha-shaḥar | 1.2 seasonal *day* hours before sunrise | Comm. Berakhoth 1:1: «בכדי שעה וחומש שעה מן השעות הזמניות». The MT uses dawn only as a limit (Qeriath Shemaʿ 1:10–13; Tefilla 3:6–7) without an interval in the chapters read. Day vs night seasonal hour: text silent; day hour chosen | Comm.; Inferred; Choice; **Setting** (show/hide) |
| End of morning Shemaʿ | 3 hours | Qeriath Shemaʿ 1:12–14 | MT |
| End of Shaḥrith | 4 hours | Tefilla 3:1 | MT |
| End of Musaf (only on Musaf days) | 7 hours | Tefilla 3:5 | MT |
| Midday | 6 hours | Tefilla 3:9 («חצי היום») | MT |
| Minḥa gedola / qetanna | 6½ / 9½ hours | Tefilla 3:2, 3:4 | MT |
| 1¼ hours before sunset | 10¾ hours (MT wording, not called פלג המנחה) | Tefilla 3:4: «עד שיישאר מן היום שעה ורביע; ויש לו להתפלל אותה, עד שתשקע החמה» | MT |
| Midnight | Midpoint sunset → next sunrise | Qeriath Shemaʿ 1:10 («חצי הלילה», undefined) | Inferred |
| Candle lighting | **Not shown** | Shabbath 5:3: «מבעוד יום, קודם שקיעת החמה» (no minutes) | MT; Choice |
| Sun | Sea level, no elevation (NOAA, zenith 90°50′) | Passages read say only «הנץ החמה» / «שקיעת החמה» | Choice |
| "Fixed" intervals | 20/18 min are clock minutes | Text does not say equal vs seasonal | Choice |
| Rounding | Prudent: deadlines down, beginnings up | Not an MT rule | Choice; **Setting** |
| Removed | טלית ותפילין, רבינו תם, MG"A times, maqam, anything Ovadya Yosef / Sephardi | — | Choice |

## Liturgy

| Rule | Implementation | Source | Status |
|---|---|---|---|
| Nefilath appayim omitted | Shabbath, festivals, Ḥol ha-moʿed, Rosh ha-Shana, Rosh Ḥodesh, Ḥanukka, Purim (local day), Minḥa on eve of Shabbath and festivals; never at ʿArvith | Tefilla 5:16 [15]: «מנהג פשוט… שאין נפילת פנים בשבתות ובמועדות, ולא בראש השנה, ולא בראשי חודשים ובחנוכה ופורים, ולא במנחה של ערבי שבתות וימים טובים, ולא בערבית שבכל יום» | MT; Ḥol ha-moʿed included by Choice |
| Yom ha-Kippurim | At every prayer, including the ʿArvith that opens it | Tefilla 5:16 [15]: «וביום הכיפורים בלבד, נופלין על פניהם בכל תפילה ותפילה» | MT |
| Eve of Kippur, Minḥa | Nefilath appayim is said (not a festival eve) | Shevitath Yom Ṭov 1:1: the «ימים טובים» are six days (Pesaḥ 1st and 7th, Sukkoth 1st and 8th, Shavuʿoth, 1 Tishri); Kippur is not among them, and Tefilla 5:16 [15] treats it as a separate category. Applying the 1:1 definition to Tefilla 5:16 is ours. Teshuva 2:9 [7] (confession on the eve) is silent on nefilath appayim | MT; Inferred; Choice (owner, 2026-11-02) |
| Tishʿa be-Av and all other days | Nefilath appayim is said | Not listed in 5:16 [15] | Choice (owner: omit only where MT states it) |
| Mention of rain | «משיב הרוח ומוריד הגשם» from Musaf of Shemini ʿAṣereth (diaspora: first day) to Shaḥrith of 1st day of Pesaḥ; nothing in summer | Dates: Tefilla 2:17, 2:19. Wording: Italian rite (MT 2:17 has «מוריד הגשם» / «מוריד הטל») | MT; Choice |
| Request for rain | Israel: from 7 Marḥeshwan. Diaspora: from the 60th day after tequfath Tishri, tequfa day = day 1. Until rain is no longer mentioned | Tefilla 2:18 («שואלין את הגשמים ביום שישים אחר תקופת תשרי»; «כל זמן שמזכיר הגשם»). The MT names Shinʿar, Syria, Egypt «והדומין להן»: applying it to Europe is ours | MT; Inferred |
| Tequfa | **Chapter 9** (365¼ days; tequfath Nisan of year 1 = 7d 9h 642p before molad Nisan, 9:3). Alternative chapter 10 (365d 5h 997p 48r; 9h 642p before molad, 10:3), called «האמת יותר» (10:6): request ~11 days earlier (2026: 24 Nov instead of 5 Dec) | Qiddush ha-Ḥodesh 9–10 | MT; Choice; **Setting** (reversible) |
| Israel / diaspora | From location (approximate border) | — | Choice; **Setting** (auto/on/off) |
| Purim | 15 Adar within ~6 km of Jerusalem's Old City, else 14; Adar II in leap years | — | Choice; **Setting** (auto/on/off) |
| Parasha | Annual cycle; reading of the chosen location; when Israel and diaspora differ, the other is shown below | Tefilla 13:1. Algorithm ours, checked against Hebcal for 5600–6199: 0 differences | Verified |
| Haftaroth | **Not implemented** — Italian rite, to be checked with owner | — | To do |
| Parasha romanisation | Provisional | — | To do (align with Mahazor) |
| Time zone | City list: fixed zone; GPS: device zone | — | Choice |
