# Place name from the phone's location: design (draft for the owner, 2026-11-04)

Status: waiting for the owner's approval. Nothing coded yet.

## Current state
`ui.js:417` stores `{ name: 'Posizione attuale', lat, lon, tz }`; `PLACE_NAMES` (`ui.js:174`) gives en/fr/he for the fixed cities and for «Posizione attuale» / «מיקום נוכחי».

## 1. Finding the town from the coordinates
Safari gives a web app coordinates only, never a town name, so the name has to come from a lookup.

A. Online reverse geocoding (Nominatim/OpenStreetMap or similar), one request per tap on «Usa la mia posizione».
- Gives the exact town, and the name directly in it/en/fr (e.g. Firenze / Florence).
- Sends the coordinates (and the IP address) to a third party; can be reduced by rounding to ~1 km before sending.
- Needs a network connection; offline the app falls back to «Posizione attuale».
- Nothing to maintain in the repository.

B. Bundled gazetteer, looked up on the phone (nearest place to the coordinates).
- Nothing leaves the phone; works offline.
- Source: GeoNames (CC BY 4.0, needs an attribution line on the decisions page). Proposed content: all ~7,900 Italian comuni + places of 15,000+ inhabitants elsewhere (~30,000), with it/en/fr names only where they differ, and the Hebrew name for Israeli places.
- Size: roughly 600 KB raw, ~250 KB compressed (estimate, to be measured), cached by the service worker. Today's app is much smaller, so this is the largest single file.
- Precision: nearest centroid, so near a boundary it can name the neighbouring comune; abroad, a small village gets the nearest town of 15,000+.
- A build script (`tools/`) regenerates the file; GeoNames is not shipped as code.

C. (Recommended) B, plus the possibility of correcting the name by hand: after the lookup the settings show the town name with a small field to change it (Latin name; the Hebrew is regenerated and can also be overwritten). No network. A wrong guess near a boundary or a bad transliteration is fixed once and stored.

Optional later: a switch for A («cerca il nome in rete»), off by default.

## 2. Transliteration Italian → Hebrew (algorithm)
Built on the attested forms (פירארה, פאדובה, ויניציאה, בולונייא, רומא, פירינצי, טריאיסטי, ליוורנו, אלטאבילא ויצינטינא). Forms marked "rule" are generated, not attested.

Settled by the owner already:
- a → א (also medial): נאפולי, פאדובה.
- e → י: פירינצי.
- medial v → ב: פאדובה, אלטאבילא; initial v → ו: ויניציאה.
- final -a → א (רומא, אלטאבילא), except attested forms with ה (פירארה, פאדובה, ויניציאה).

Proposed, following the attested forms:
- i → י; o, u → ו; final -e, -i → י; final -o → ו (מילאנו, טורינו).
- Word-initial vowel carries א: Imola → אימולא, Udine → אודיני, Este → איסטי (rule).
- Vowel after vowel carries א (hiatus): Trieste → טריאיסטי; -zia → -ציא (Gorizia → גוריציא, rule).
- No gemination: rr → ר (פירארה), ll → ל (אלטאבילא), tt → ט.
- c before a/o/u, ch → ק; c before e/i → צ (ויצינטינא, attested). Chieti → קיאיטי (rule).
- z, zz → צ (פירינצי, ויניציאה).
- t → ט, d → ד, p and f → פ, b → ב, s → ס, h silent, qu → קו (Aquileia → אקוילייא, rule).
- Final letter forms (ך ם ן ף ץ) at word end: San → סאן.
- Accents dropped: Cantù → קאנטו, Forlì → פורלי (rule).
- Several words, prepositions: each word separately; apostrophe dropped: Reggio nell'Emilia, Sant'Ilario d'Enza.

Doubtful cases, one question each:
1. g before e/i (Genova, Gela): ג, ג׳, or ז׳?
2. Silent i in cia/cio/gia/gio/scia (Reggio, Ciampino, Foggia): drop it (ריגו / ריג׳ו) or write it as yod (ריגייו)?
3. gn (Bologna → בולונייא): always ניי before a vowel, on the Bologna model (Cagnano → קאנייאנו), or ני?
4. gli (Cagliari, Conegliano): לי + vowel (קאליארי) or ליי (קאלייארי)?
5. sc before e/i (Scicli, Ascea): ש, or סצ?
6. Voiced z (Zero Branco) and intervocalic s (Pisa, Pesaro): always צ and ס, or ז where Italian has a voiced sound? (The algorithm cannot see the voicing; ז would need a word list.)
7. Medial v after a consonant (Silvano, Alvisopoli): ב like the intervocalic case?
8. Livorno ליוורנו has medial v as וו: treat as an attested exception only (the rule gives ליבורנו)?
9. Final letter forms: confirm ן ם ץ etc.
10. Non-Italian names (Manchester, München, Lyon): spelling cannot be read off the letters. Options: (a) Judeo-Italian rules on the local name, per language (only for French, German, Spanish, English: much extra code and many errors); (b) the Hebrew name from GeoNames (modern Israeli spelling, e.g. with geresh); (c) (a) for Romance languages and (b) for the rest; (d) Latin name only, no Hebrew, unless the town is in the exceptions table.
11. Israel: GeoNames Hebrew name (Israeli spelling) unless the exceptions table has a more traditional one. Confirm.

## 3. Exceptions table (towns with a traditional Hebrew name)
Already in `PLACE_NAMES` (owner-approved): the Italian cities, פאריש, לונדון, קובינטרי, ירושלים, תל אביב, סיאול, ניו יורק.

Candidates to research and check with the owner one by one (no form below is verified; each needs an attested source before it goes in):
- Italy: Mantova, Ancona, Verona, Modena, Reggio Emilia, Gorizia, Casale Monferrato, Asti/Fossano/Moncalvo, Soncino, Sabbioneta, Cremona, Piove di Sacco, Riva del Garda, Pesaro, Urbino, Senigallia, Pitigliano, Lugo, Cento, Carpi, Correggio, Vercelli, Alessandria, Conegliano, Rovigo, Pisa, Siena, Genova, Reggio Calabria.
- Abroad: Vilna, Amsterdam, Constantine, Salonica, Istanbul, Izmir, Edirne, Rhodes, Corfu, Prague, Vienna, Kraków, Frankfurt, Worms, Mainz, Speyer, Cologne, Marseille, Avignon, Carpentras, Toledo, Lisbon, Hamburg, Fez, Tunis, Tripoli, Cairo, Alexandria, Damascus, Aleppo.
Method: for each, attested forms in title pages, gittin lists, responsa (Sefaria, NLI catalogue), with the source; the owner decides.

## Data model (implementation)
`S.place = { name, names: { it, en, fr, he }, lat, lon, tz, auto: true }`; `placeName` reads `S.place.names` first, then `PLACE_NAMES`. Old saved «Posizione attuale» keeps working.

## Owner's answers (2026-11-04)
- Geocoding (section 1): postponed to a later stage; spelling rules to be fixed now.
- Spelling rules of section 2 approved, with accepted exceptions (e.g. Saluzzo, Vercelli: forms still to be found); z = ז when voiced.
- Doubt 1, soft g: ג + yod everywhere (ריגייו, גינובא, פוגיא, מוגיא).
- Doubt 2, silent i: gi + vowel = גי + vowel (ריגיו, פוגיא; ריגייו only as attested exception); ci + vowel = צ + vowel (צאמפינו); a stressed i stays (לוציא).
- Doubt 3, gn + vowel = ניי + vowel (בולונייא, קאנייאנו).
- Doubt 4, gli + vowel = לי + vowel (קאליארי, קוניליאנו).
- Doubt 5, sc before e/i = ש, silent i dropped (ברישא, שיקלי, פישא).
- Doubt 6, z = צ everywhere; ז only for towns on a list of voiced z, to be examined with the owner (start soon). Owner: these rules are for Italian names; where the local language has a different rule, follow that language's rule (bears on doubt 10).
- Doubt 7, intervocalic s: ז in the north (line about La Spezia–Rimini, by coordinates), ס elsewhere; owner wants a systematic review (the line, and exceptions).
- Doubt 8, medial v: attested forms always (ליוורנו, רוויגו, ווירונא…); unattested, ב when intervocalic medial.
- Doubt 9, final letter forms: yes (סאן).
- Doubt 8b, v next to a consonant: owner asked for historical examples (research agent running, appends §8b to spelling-evidence.md).
- Doubt 10, outside Italy: rules per local language for French, Spanish, German, English, plus Yiddish for Eastern European names; elsewhere Latin name only unless in the exceptions table.
- Doubt 11, Israel: Hebrew name from the gazetteer (Israeli spelling), overridden by the exceptions table where the owner approves a traditional form.
- Still open: list of voiced z; systematic review of the s line (north/south); Saluzzo and Vercelli forms (research found only שאלוצי, REPORTED, for Saluzzo); exceptions list; per-language rules (fr, es, de, en, yi) to be drafted.
- Exceptions given by the owner from personal experience: סאלוצצו Saluzzo, וירציללי Vercelli, קוני Cuneo (note: double letters, against the no-gemination rule; kept as exceptions).
- Doubt 8b, v next to a consonant = וו (סילוואנו, קורווארא; cf. אלוויזי, Venice 1552).
- Voiced z list: owner chose local pronunciation; in practice DiPI (Canepari, dipionline.it) first form decides (Piedmont mixed cases: all per DiPI); where DiPI has no entry, Italian Wikipedia's pronunciation as second choice. Data: z-comuni-dipi.md.
- Mixed z: DiPI first form everywhere except Lombardia, Emilia-Romagna, Veneto, Trentino-Alto Adige, Friuli-Venezia Giulia, which the owner reviews region by region. Wikipedia lookup for towns not in DiPI running.
- Lombardia mixed: DiPI first form for all (owner).
- Veneto, Trentino-Alto Adige, Friuli-Venezia Giulia, Emilia-Romagna mixed: DiPI first form for all (owner). So: all mixed z = DiPI first form, everywhere.
- DiPI lookups: query lowercase too (capitalized lemmas often miss). Where DiPI gives forms by region (◆ (Lomb.) … (Trent.) …), the town's own region's form is used: Mazzano (Lomb.) ז, Mazzano Romano צ, Carzano (Trent.) צ, Manzano (Friu.) ז, Ranzo (Lig.) צ, Avezzano (Abr.) צ, Vanzone (Piem.) צ, Gozzano צ, Pezzolo צ. Bozzolo (Lomb.) ז, Spezzano Albanese/della Sila (Cal.) ז, Ziano ז, Zone (Lomb.) ז, Prezza ז, Rocca di Mezzo ז (proper-noun entries).
- Voiced z list CLOSED (owner approved A, B (silent z in Bionaz, Champdepraz, Perloz: not written), C). Final data: z-voiced-final.json / .md (per word: v = ז, u = צ, silent).
- s line (owner): DiPI first, as for z; where DiPI has no entry, the La Spezia–Rimini isogloss plus the Gallo-Italic edges (Pesaro e Urbino, Massa-Carrara/Lunigiana): ז north, ס south. DiPI lookup of the 1,043 comuni with single s between vowels running (s_dipi.json in scratchpad).
- s CLOSED (owner): DiPI first everywhere (ז nearly always; ס in 37 comuni where DiPI has [s], mostly compounds); gaps by analogy with DiPI (ז). The north/south line is dropped. Data: s-intervocalic-final.json / .md.

## Non-Italian names: French, Spanish, German, English, Yiddish (session local_1758e24f, from 2026-11-04)
Evidence files: evidence-*.md in this folder (notes/place-name/)
- Basis (owner): pronunciation, not local spelling, but written by the Judeo-Italian spelling and Hebrew grammar; e.g. Lyon has an alef between yod and waw (ליאון: vowel after vowel carries א, as טריאיסטי).
- Yiddish area (owner): the whole Ashkenazi East: Poland, Lithuania, Latvia, Belarus, Ukraine, Moldova, Russia, and also Hungary, Romania, Czechia, Slovakia. German-speaking lands keep their own (German) rule.
- French j / soft g /ʒ/ (owner): ש, the 19th-c. French and Alsatian rabbinic practice (שאן, שאנעט; Melammed le-Hoʿil III 31): Dijon → דישון, Limoges → לימוש.
- French oi /wa/ (owner): וא, as לואי (Melammed le-Hoʿil III 31): Blois → בלוא, Poitiers → פואטיי.
- French eu/œu /ø, œ/ (owner): יו, as Rashi's שיאו"ר: Bayeux → באייו, Lisieux → ליזייו. (French u /y/ → ו, as לוניל.)
- French schwa (owner): a pronounced e muet inside a name is not written, like a Hebrew shewa (Besançon → בזאנסון, Genève → גנב → with j=ש: שנב); a silent e muet is not written either. (Chamonix was a wrong example of mine: its a is a full vowel, so שאמוני.)
- Alsace and Moselle (owner): German rule on the German/Alsatian name (départements 67, 68, 57), as the Jewish forms do (מיץ, קאלמאר, שטראסבורג).
- Italianate places outside Italy (owner): Italian rules on the Italian name also for historic Italian names: Ticino, Italian Graubünden, San Marino, Vatican, Corsica, Nice/Roya (Nizza), Monaco, Istria and Dalmatia (Pola, Zara, Capodistria).
- FRENCH TABLE APPROVED (owner), including un → יון (Verdun וירדיון) and le joined as ל (Le Havre לאבר, Le Mans למאן; la → לא, les → לי separate). Full table: a à â → א; e é è ê ai ei → י; i y → י; o au eau ou u → ו; eu œu → יו; oi → וא; schwa and silent e not written; an en am em → אן; in ain ein im → ין; on om → ון; un → יון; initial vowel and vowel after vowel → א; ch j soft g → ש; c(e,i) ç s ss → ס; s between vowels, z → ז; c k qu → ק; hard g → ג; gn → ניי; ill /j/ → יי; t th → ט; ph f → פ; x → קס; h not written; v as in Italian; silent final consonants not written; no doubling; final forms; hyphenated names word by word.
- German e (owner): ע, stressed and unstressed (Bremen → ברעמען, Essen → עסען, Celle → צעלע); ö → ע (קעלן).
- German ü (owner): י, the 19th-c. German-Jewish norm (Hoffmann III 33): München → מינכען, Lübeck → ליבעק.
- German diphthongs (owner): Jewish forms: ei/ai → יי (מיינץ), au → וי (פאסוי, אויגסבורג), eu/äu → יי (ניישטאט).
- German final devoicing (owner): by sound, as Isserlein: -burg → בורק, -berg → בערק, -stadt → שטאט (האמבורק, נירנבערק, דארמשטאט).
- GERMAN TABLE APPROVED (owner): area Germany, Austria, German Switzerland, Liechtenstein, Alsace and Moselle (German name). a → א; e ä ö → ע (stressed or not); i ie ü y → י; o u → ו; ei ai ey → יי; au → וי; eu äu → יי; final -e → ע; initial vowel → א + letter, but initial e → ע alone; long-vowel h, aa ee oo → one letter; b d g at syllable end → פ ט ק; ch → כ/ך; chs x → קס; sch → ש; s before p/t at word/syllable start → ש; s before a vowel → ז; other s, ss, ß → ס; z tz → צ/ץ; w → וו; v f ph → פ; pf → פפ (Pforzheim → פפורצהיים; the preview's פפארצהיים was my slip against o → ו); k ck → ק; qu → קוו; j → י; t th dt → ט; h initial ה, after vowel silent; no doubling; final forms; compounds one word, separate words apart (פראנקפורט אם מיין).
- Spanish final -a (owner): א, as in Italian (גראנאדא, מאלאגא).
- Spanish ch /tʃ/ (owner): צ, as Italian ci (מארצינא, ציליאן/ציייאן per ll rule).
- Spanish c(e,i) and z (owner): ס everywhere, Spain and America (סאראגוסא, קאדיס, באלינסיא).
- Spanish j, g(e,i) /x/ (owner): ח (Jerez חיריס, Jaén חאאין, Gijón חיחון).
- Spanish ll (owner): לי, as Italian gli (סיביליא, באליאדוליד, מידילין).
- SPANISH TABLE APPROVED (owner): area Spain and Spanish-speaking America; Catalonia, Valencia, Balearics, Galicia, Basque Country on the Castilian name. a → א (final -a א); e i → י; o u → ו; initial vowel and vowel after vowel → א (León ליאון; Oviedo → אוביאידו, the preview's אוביידו was my slip); b v → ב; c(e,i) z s → ס, also s between vowels (מינדוסא); ch → צ; j g(e,i) → ח; ll → לי; ñ → ניי; y before vowel → יי, else as i; c k qu → ק; g gu(e,i) → ג; gü → גו; x → קס (Mexican x = /x/ → ח); h not written; t → ט; f → פ; r rr → ר; accents dropped; no doubling; final forms; separate words apart (לא קורונייא).
- English basis (owner): sound, from data: pronunciation taken from a pronouncing dictionary or IPA list prepared with the town list, written in Judeo-Italian letters; towns with no known pronunciation: Latin name only (unless in the exceptions table).
- English schwa (owner): written with the vowel letter of the English spelling (a → א, e i → י, o u → ו): קובינטרי, לונדון, בריסטול, אוקספורד, ליסטיר.
- English th (owner): /θ/ → ת, /ð/ → ד (spirant values): פלימות, תורסו, רודירהאם.
- ENGLISH TABLE APPROVED (owner): area UK, Ireland, USA, English Canada, Australia, New Zealand, other English-speaking places; Quebec → French rule. /æ/ /ɑː/ → א; /e/ /ɪ/ /iː/ → י; /ɒ/ /ɔː/ /oʊ/ → ו; /ʊ/ /uː/ → ו; /juː/ → יו; /ʌ/ /ɜː/ schwa → vowel of the spelling; /eɪ/ → יי; /aɪ/ → איי; /aʊ/ → או; /ɔɪ/ → וי; initial vowel and vowel after vowel → א; r after a vowel written where spelled; ch → צ; j soft g → ג (+ י before a vowel); sh → ש; th → ת /θ/, ד /ð/; w wh → וו; v as Italian; s → ס, /z/ → ז; c k ck q → ק; x → קס; h → ה where pronounced; ph f → פ; t → ט; silent letters not written; no doubling; final forms; words apart. Examples: מאנציסטיר, הול, בירמינגאם, ווייקפילד, בראייטון, סאותאמפטון, גירזי, גריניץ.
- Eastern Europe layer (owner): the Hebrew rabbinic/title-page layer (ווילנא, ווארשא, קראקא, הוראדנא, קאוונא, זיטאמיר, לבוב, בריסק); Yiddish forms only where no Hebrew one is found. YIVO pointing not used.
- Eastern vowels for towns with no Jewish name (owner): rabbinic: o → א, e → ע (as זיטאמיר, פיעטרקוב); a → א, u → ו, i/y → י.
- EASTERN TABLE APPROVED (owner): area Poland, Baltics, Belarus, Ukraine, Moldova, Russia, Hungary, Romania, Czechia, Slovakia. (1) Traditional Jewish name, Hebrew rabbinic layer, from a list still to be compiled; Yiddish form where no Hebrew one. (2) Otherwise by sound on the local name: a o ó → א; e → ע, ę → ען; ą → אן; i y í ü → י; u ú → ו; ö → ע; initial vowel → א + letter, initial e → ע; vowel after vowel → א; final -a → א, -e → ע; w v → וו; final -ów/-ov → וב; cz ć č cs → טש; sz ś š Hungarian s ș → ש; szcz šč щ → שטש; ż ź rz ž zs → ז, rz after p t k → ש; c ț Hungarian c → צ; Hungarian sz → ס; ch, Polish h, х → ח; Slavic h, Ukrainian г → ה; ł l → ל; ń ny → ני; j → י; k → ק; t → ט; f → פ; dz → דז; no doubling; final forms; Cyrillic from the standard romanization.
  Correction confirmed by the owner: Romanian ce/ci → טש, ch → ק, ă → ע, â/î → י (Chișinău → קישינעו). The preview had listed Romanian ch → טש by mistake.
- ALL FIVE LANGUAGES APPROVED 2026-11-04. Next: DECISIONS.md row and decisions page.

## Owner's answers, second round (2026-11-04)
- Section 1, finding the town: option C (bundled GeoNames list + manual correction), with A (online lookup) as an optional setting, off by default (see the correction below: not deferred).
- Exceptions list: research started (exceptions-italy.md, exceptions-abroad.md, east-names.md in this folder); each form goes to the owner one by one.
- Data still to prepare with the town list: English pronunciations and the Eastern traditional names (east-names.md).
- Italian exceptions, first batch (owner): Mantova מנטובה; Reggio nell'Emilia ריגייו (whole name; Reggio Calabria by the rules); Casale Monferrato קזאלי; Cremona קרימונה; Sabbioneta סביוניטה (Shadal's form, not Ḥida's סביוניטא). By the rules, no exception: Verona וירונא (Maharam of Padua's ווירונא not adopted), Pitigliano, Piove di Sacco, Fossombrone, L'Aquila. Same as the rules already: Ancona, Modena, Gorizia, Senigallia, Fano, Brescia, Pesaro. Soncino: owner asked to check the spelling in the Soncino Maḥazor. Colophon of the Maḥazor ke-minhag Roma, Soncino–Casalmaggiore 1485–86, as quoted by Avraham David, review of the Magnes facsimile, HaMaʿayan 38 (machonso.org/hamaayan/?gilayon=38&id=1167): «בני שונצין בעיר שונצין בחדש תשרי שנת רמ"ו … והשלמנוהו פה קזאל מיורי». Same form in the corrector's preface to Berakhot, Soncino 1484, as quoted on he.wikipedia «משפחת שונצינו»: «היושב בעיר שונצין אשר במדינת לונברדיא״ה» (Ḥida's paraphrase of the same passage has צונצין). REPORTED: modern transcriptions, no scan seen. Proposal: Soncino שונצין, Casalmaggiore קזאל מיורי. APPROVED (owner): Soncino שונצין, Casalmaggiore קזאל מיורי.
- Abroad exceptions, group 1 (owner approved all proposals; evidence in exceptions-abroad.md): Amsterdam אמשטרדם; The Hague האג; Rotterdam ראטערדאם; Antwerp אנטווערפען; London stays לונדון; Paris stays פאריש; Marseille מארשיליא; Avignon אויגניון; Carpentras קארפינטראץ; Cavaillon קאוואליאון; L'Isle-sur-la-Sorgue לישלוה; Montpellier מונפשליר; Narbonne נרבונה; Troyes טרוייש. By the rules: Metz, Strasbourg, Colmar, Lyon, Lunel (rules = attested), Nîmes, Bordeaux, Bayonne, Rouen (Golb's רדום unverified).
- Abroad exceptions, group 2 (owner approved all proposals): Frankfurt am Main פראנקפורט דמיין; Worms וורמייזא; Mainz מגנצא; Speyer שפירא; Hamburg המבורג; Fürth פיורדא; Vienna ווינא; Prague פראג; Mikulov ניקלשבורג; Bratislava פרעסבורג; Toledo טוליטולה; Barcelona ברצלונה; Girona גירונדה; Seville אשביליה; Córdoba קורטבה; Granada גרנטה; Saragossa סרקסטה; Lisbon לישבונה. By the rules (rules = attested): Cologne קעלן, Altona אלטונא, Berlin בערלין.
- Abroad exceptions, group 3 (owner approved): Salonica שאלוניקי; Izmir אזמיר; Edirne אדריאנופולי; Rhodes רודוס; Corfu קורפו; Fez פאס; Meknes מכנאס; Tunis תונס; Tripoli (Libya) טריפולי; Algiers אלגזאיר; Constantine קסנטינה; Oran והראן; Alexandria נא אמון; Damascus דמשק; Aleppo ארם צובה; Baghdad בגדאד; New York stays ניו יורק; Israel: gazetteer names (ירושלים, צפת, טבריה, חברון, תל אביב). Open: Istanbul (owner asks whether the קושטנדינא forms are Constantinople or Constantine), Sarajevo (check spellings), Cairo (owner: קהיר or the Arabic Miṣr, if attested).
  Checks (Sefaria search, 2026-11-04): (1) Istanbul: every קושט- hit checked is Constantinople (Ḥida «מרבני קושטנדינא», «דפוס קושטנדינא»; Maharashdam EH 14 with Kavala, Divre Riḇoṯ 320 with Salonica and Edirne; Maharit «פה קושטאנטינה» dated השס"ב; Maharik 83 with Negroponte). Constantine in Algeria has ס: קסנטינה, קוסטנטינה, קונסטנטינא («אשר אצל אלגיר»). VERIFIED. (2) Sarajevo: שראי (Maharit II ḤM 12, «שראי דילה בוזנה», early 17th c.); שאראי (Maskil le-Dawiḏ, Venice 1760, introd. 45: «מק"ק שאראי»); סאריי (Lieberman, Tosefta ki-Fshuṭa, 20th c.: «סאריי דמן בוסנא»); סאראייבו (modern, a manuscript name). VERIFIED (transcriptions). (3) Cairo: Hebrew texts say מצרים; in gittin «אלקאהרה הסמוכה לפסטאט מצרים» (Uziel, Mishpeṭe ʿUzziʾel V EH 68:15, citing Nehar Miṣrayim II 219, 225a) VERIFIED as Uziel's report; מצר for Fustat/Cairo in Judaeo-Arabic Geniza letters (Princeton Geniza Project, T-S 8J23.17: «אן מצר תחת כטר») VERIFIED (catalogue transcription), not found in Hebrew-language texts (unsearchable on Sefaria: מצר = boundary); קהיר only modern.
  APPROVED (owner): Istanbul קושטנדינא; Sarajevo שאראי; Cairo אלקאהרה.
- Research reports received 2026-11-04: exceptions-italy.md (new Italian forms; Pesaro: Italian authors write פיסארו, to put to the owner again), exceptions-abroad.md, east-names.md (378 towns; method for review still to propose).
- Activation (owner, corrected): option C as originally proposed, always active (bundled list, manual correction). Only the online lookup (A) is a separate setting, off by default, that the user can switch on; it is part of the implementation, not deferred.
