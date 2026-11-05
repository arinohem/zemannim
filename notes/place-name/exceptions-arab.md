# Arabic-speaking countries: traditional forms and Judeo-Arabic spelling (proposals, 2026-11-05)

Status: approved by the owner on 2026-11-05 as proposed, except the fallback of R1 (see place-name-design.md, last section); implemented. Evidence: `evidence-judeo-arabic-orthography.md`, `evidence-arab-morocco.md`, `evidence-arab-algeria-tunisia-libya.md`, `evidence-arab-east.md` (this folder). VERIFIED there means read in a transcription (Sefaria, Hebrew Wikisource, Princeton Geniza Project), not in a scan. Not reached: hebrewbooks.org, the NLI catalogue and ketubbot site, Blau's *Grammar*, Hary 2018, Moroccan get manuals.

## Finding that changes the method

GeoNames has an Arabic name for 996 of the 1,576 towns of Arabic-speaking countries in the cities15000 list (only 346 of them now get a Hebrew form, from Hebrew Wikipedia; the rest show the Latin name). Copying the Arabic spelling letter for letter is the Classical Judeo-Arabic practice (Khan 2002, p. 603, VERIFIED), and it reproduces most of the attested traditional forms with no exception needed:

פאס, מכנאס, רבאט, אספי, צפרו, דבדו, תאזה, מראכש (Geniza), תלמסאן, מליאנה, בגאיה, והראן, תונס, קאבס (geonic), אלמהדיה, סוסה, בנזרת, קפצה, טראבלס (Libyan rabbis), אלקאהרה, רשיד, דמיאט, סויס, דמשק, בירות, בגדאד, כרכוך, ארביל, צנעא, עדן, מכה, גדה.

The Hebrew Wikipedia forms with added vowels (מאראקיש, גידא, ביני מילאל) are attested nowhere.

## Proposed rule (R1–R6)

- R1. Arabic-speaking countries: the Hebrew form is the Arabic name in Hebrew letters, letter for letter (ا א, ب ב, ت ת, ث תׄ, ج ג, ح ח, خ כׄ, د ד, ذ דׄ, ر ר, ز ז, س ס, ش ש, ص צ, ض צׄ, ط ט, ظ טׄ, ع ע, غ גׄ, ف פ, ق ק, ك כ, ل ל, م מ, ن נ, ه ה, و ו, ي י, ى י, ء not written or its seat). No vowels added. Final forms. Administrative prefixes in GeoNames (بلدية, مدينة, ولاية, دائرة, ناحية, قضاء, إمارة) dropped. If the Arabic name does not match the Latin name (GeoNames errors: Mohammedia, Soran), or there is none, the current Hebrew Wikipedia method, with R3.
- R2. Initial article ال: dropped, as Hebrew-language texts do (בצרה, מוצל, חלה, עמארה, קירואן, מדיאה); inside a name kept and joined (קצר אלכביר). Attested forms with the article stay in the exceptions list (אלקאהרה, אלגזאיר, אלמהדיה). Alternative: keep it everywhere, as in Arabic and Judeo-Arabic letters (אלבצרה, אלמוצל).
- R3. tāʾ marbūṭa: ה (Connolly 2018 §2.1.4, VERIFIED: plain ה is the norm in the absolute state; ה with two dots only occasional; א a late phonetic spelling, mostly in folk tales). Geniza place names: סוסה, אלמהדיה, אלאסכנדריה; also in construct קלעה חמאד, though ת appears too (בזוילת אלמהדיה) and is the norm from the 15th c. Proposal: ה always (Jeddah גדה, Taza תאזה). Alternative: ת in construct (Kelaat Mgouna קלעת מגונה). Also in the Wikipedia fallback: final ה stays ה (Jeddah no longer גידא).
- R4. Dots: keep the current set (כׄ גׄ תׄ דׄ צׄ טׄ, jīm plain ג). Connolly (VERIFIED): jīm's dot is erratic in every period and usually absent in late and Maghrebi texts; ghayn has a dot above (15th–16th c.) or none. Alternative: no dots, as in the Hebrew-language attestations (כיבר, מוסתגאנים).
- R5. Morocco and Algeria: ك written ג where the Latin name has g (Moroccan Arabic writes /g/ with ك: أكادير Agadir → אגאדיר, attested; كلميم Guelmim → גלמים). ق stays ק even when pronounced g (Gabès קאבס, Gafsa קפצה, both attested).
- R6. Persian/Kurdish letters in Iraqi names: گ ג, چ צ׳, پ פ, ڤ פ, ک כ.

## Exceptions where the attested form differs from R1–R2

| Town | R1–R2 gives | Attested | Proposal |
|---|---|---|---|
| Marrakesh | מראכש | מראכש (Geniza 1801, medieval letter); מאראכיש (Marrakesh dateline 1842, Keraḵ shel Romi); מאראקש (Uziel, 20th c.); מאראקאש 0 hits | rule = attested: מראכש |
| Casablanca | דאר אלביצׄא | כאזאבלאנכא (title page, 1930/31) | כאזאבלאנכא |
| Essaouira | צוירה | מוגאדור (Moroccan author, 20th c.); אצוירא in a 1902 ketubba (REPORTED, catalogue) | מוגאדור |
| Tetuan | תטואן | תיטואן (Tashbeṣ IV), תיטוואן, טיטואן (dateline 1869) | תיטואן |
| Tangier | טנגה | טאנגא (Uziel only) | rule: טנגה |
| Meknes | מכנאס (= current exception) | מכנאס, מקנאס | unchanged |
| Demnat | דמנאת | צור מוסא (REPORTED, Hebrew Wikipedia) | rule |
| Mostaganem | מסתגׄאנם | מוסתגאנים (9 headings, Tashbeṣ/Rivash) | מוסתגאנים |
| Médéa | מדיה | מדייא (Tashbeṣ), מדיאה (Rivash) | מדיאה |
| Annaba | ענאבה | בונה (Bône; Tashbeṣ III 163, IV 1:53) | בונה |
| Biskra | בסכרה | בסכרא (Tashbeṣ IV 1:6) | בסכרא |
| Touggourt | תקרת | תקורט (Tashbeṣ IV 1:1) | תקורט |
| Constantine | קסנטינה (= current) | קסנטינא 6, קוסנטינא 3, קסנטינה 2 (Tashbeṣ) | unchanged |
| Kairouan | קירואן | קירואן (geonic), אלקירואן (Geniza) | rule = attested |
| Sfax | צפאקס | ספאקס, צפקס (Geniza) | ספאקס |
| Tripoli (Libya) | טראבלס | טראבלס (local rabbis); טריפולי המערב (Livorno print) | change exception to טראבלס |
| Sidon | צידא | צידון (Radbaz, get) | צידון |
| Tripoli (Lebanon) | טראבלס | טרבלס (Radbaz IV 1105) | טרבלס |
| Hama | חמאה | חמא (Geniza) | חמא |
| Khaybar | כׄיבר | כיבר | rule |
| Mosul | מוצל | מוצל; אשור (REPORTED, NLI ketubbot records not opened) | rule |
| Cairo, Alexandria, Damascus, Aleppo, Baghdad, Algiers, Oran, Fez, Tunis | — | current exceptions confirmed | unchanged |

No traditional form found (UNKNOWN): Salé, Taroudant, Mazagan, Ouezzane, Larache, Ksar el-Kebir, Oujda, Tiznit, Asilah, Azemmour, Beni Mellal, Kenitra; Mascara, Sétif, Batna, Ghardaïa, Laghouat, Sidi Bel Abbès; Monastir, Nabeul, Béja, Le Kef, Tozeur, Zarzis, Medenine; Libyan towns except Benghazi (בנגאזי, 1943 = rule with dot); Tanta, Port Said, Ismailia, Homs, Amman, Kufa, the Gulf. These go by R1.
