# Ashkenazi East: Hebrew (rabbinic) and Yiddish names of towns

Compiled 2026-11-04 (about 90 minutes, partly automated). Read-only research for the rules on writing non-Italian town names in Hebrew letters; it extends Part B of `evidence-german-yiddish.md`. Nothing in the app was changed.

## Method, sources, and labels

- **Town list.** 378 towns in Poland, Lithuania, Latvia, Estonia, Belarus, Ukraine, Moldova, Russia, Hungary, Romania, Czechia, and Slovakia: the larger present-day towns (roughly above 50,000 inhabitants, except Russia, where only a few large towns and the former Pale and Ḥasidic centres are included) and the historically important communities and printing centres regardless of size. Prague and Bratislava are covered elsewhere and are left out.
- **Coordinates** come from Wikidata (property P625, via the SPARQL endpoint) for the English Wikipedia article of each town, rounded to two decimals. For Kletsk, Iziaslav, Nevel, and Hannopil they come from a Wikidata label search; the identification of Hannopil (the Maggid's and R. Zusya's Annopol) with the village at 50.45, 26.90 in Khmelnytskyi oblast is mine (INFERRED).
- **Hebrew rabbinic form.** Candidate spellings were checked in two places:
  1. **Sefaria** search API (`api/search-wrapper`, field `exact`, 2026-11-04). A form counts as VERIFIED only if a hit shows it as the name of the town in a rabbinic text: in an address or signature (דק"ק, אבד"ק, מו"ץ דק', פה, בעיר), or in an imprint ("דפוס X", "X תקפ"ז"). The source column cites the first such passage. Sefaria texts are modern digital transcriptions of printed editions, so VERIFIED means "seen in that transcription", not "seen on a scan". Works of Yosef Caro, the Zohar, and modern codes (Mishna Berura, ʿArukh ha-Shulḥan, etc.) were excluded from the cited examples.
  2. **University of Pennsylvania Libraries catalogue** (find.library.upenn.edu, phrase search). Where Sefaria had nothing, the place of publication as transcribed from the title page in a catalogue record ("סלאוויטא : משה שפירא ...") is given as REPORTED (title-page imprint as transcribed by a library catalogue; I did not see the title page). Hits that were only book titles (memorial books, studies) were not used.
  For a few towns with an ambiguous name (גור, מיר, באר, לידא, etc.) the search was repeated with the phrases "דק"ק X", "אבד"ק X", "בק"ק X", "מק"ק X", and "דפוס X".
- **Yiddish form** = the title of the Yiddish Wikipedia article linked from Wikidata, or the Wikidata Yiddish label. Pointing was removed (the table gives unpointed forms, not YIVO pointing), the ligatures װ, ײ, ױ were written as וו, יי, וי, and disambiguators such as ", פוילן" were dropped. These are REPORTED: Yiddish Wikipedia sometimes uses a Soviet or modern official name (קאלינינגראד, דניפרא, דאנעצק) rather than the traditional Jewish one; such cases are noted below.
- **Labels** (they refer to the Hebrew rabbinic form): **VERIFIED** (seen in a rabbinic text on Sefaria, or carried over from the title-page checks in `evidence-german-yiddish.md`); **REPORTED** (Penn catalogue imprint); **REPORTED (imprint in modern bibliography)** (the form occurs on Sefaria only in a 20th-century bibliography or edition list quoting an imprint, e.g. Sefer Puah, Oṣar Midrashim, Tosefta ki-Fshuṭah); **REPORTED (Yiddish only)** (no rabbinic form found; only the Yiddish form is given); **UNKNOWN** (nothing found). "(also X (V))" lists other spellings that were also VERIFIED; "(R)" marks variants found only in the catalogue.
- Sefaria hit counts are not given in the table; they are in the working files and are only a rough guide (the corpus is dominated by a few 19th-century responsa collections: Shoʾel u-Meshiv, Maharsham, Ḥatam Sofer, Meshiv Davar).

## Table

| Local name (official) | Country | Lat | Lon | Hebrew rabbinic form | Yiddish form | Source | Label |
|---|---|---|---|---|---|---|---|
| Ashmyany | Belarus | 54.42 | 25.94 | — | אשמענע (Yid.) | — | REPORTED (Yiddish only) |
| Babruysk | Belarus | 53.15 | 29.23 | באברויסק | באברויסק (Yid.) | Sefaria: HaElef Lekha Shlomo, Yoreh Deah 245:1 ("כעת שאלני הרב מו"ה שואל קאצינעלזאהן מק' באברויסק מדין אסור לעשות שותפות ע") | VERIFIED |
| Baranavichy | Belarus | 53.13 | 26.02 | — | באראנאוויטש (Yid.) | — | REPORTED (Yiddish only) |
| Barysaw | Belarus | 54.22 | 28.51 | באריסאוו | באריסאב (Yid.) | Penn catalogue imprint: "באריסאוו] : י. אייזענשטאדט, תרמ״ו" | REPORTED |
| Brest | Belarus | 52.08 | 23.66 | בריסק | בריסק (Yid.) | Sefaria: Geulat Olam on Pesach Haggadah, Barech, Pour Out Thy Wrath 2:1 ("בכמה מקומו' שהר' מהר"ר אברהם ז"ל אבדק"ק בריסק דליטא חלם וזה תורף דבריו") | VERIFIED |
| Bykhaw | Belarus | 53.53 | 30.24 | — | UNKNOWN | — | UNKNOWN |
| Dzyatlava | Belarus | 53.47 | 25.41 | — | זשעטל (Yid.) | — | REPORTED (Yiddish only) |
| Homyel | Belarus | 52.44 | 30.98 | — | האמל (Yid.) | — | REPORTED (Yiddish only) |
| Hrodna | Belarus | 53.67 | 23.82 | הוראדנא | גראדנע (Yid.) | Sefaria: Hagahot Menachem Tzion, Letter Lamed 4:1 ("ובראש ספר לבוש התכלת כ' אחר שהיה אבד"ק הוראדנא לובלין וקרמינץ קבל אגרת") | VERIFIED |
| Iwye | Belarus | 53.93 | 25.77 | — | UNKNOWN | — | UNKNOWN |
| Kapyl | Belarus | 53.15 | 27.09 | קאפיל | UNKNOWN | Sefaria: Teshuvot Maharsham Volume II 22:1 ("נ"ח להרב ומאה"ג וכו' מו"ה יהודא ליב נ"י אבד"ק קאפיל. ברוסיא:") | VERIFIED |
| Kletsk | Belarus | 53.06 | 26.64 | קלעצק | קלעצק (Yid.) | Sefaria: Teshuvot Maharsham Volume I 168:1 (""ה יעקב יוסף הכהן ראבינאוויטץ נ"י אבד"ק קלעצק ברוסיא") | VERIFIED |
| Kobryn | Belarus | 52.21 | 24.35 | קאברין | קאברין (Yid.) | Sefaria: Ohel Ya'akov on Torah, Devarim; Petach HaOhel 12 ("ינדא היתה בת הגאון הקדוש מו"ה נחום אב"ד דק"ק קאברין ז"ל. אחיה הגאון מו"ה משה נ"ע נשא את בת אחותו") | VERIFIED |
| Kopys | Belarus | 54.32 | 30.29 | קאפוסט | קאפוסט (Yid.) | Sefaria: Otzar Midrashim, Book of Rezial the Angel 2 ("ונדפס אח״כ בהוראדנא תקנ"ג, קאפוסט תק״פ, אוסטראה תקפ"ז, לבו") | REPORTED (imprint in modern bibliography) |
| Lida | Belarus | 53.90 | 25.30 | — | לידא (Yid.) | — | REPORTED (Yiddish only) |
| Lyakhavichy | Belarus | 53.04 | 26.26 | — | לעכעוויטש (Yid.) | — | REPORTED (Yiddish only) |
| Lyozna | Belarus | 55.03 | 30.79 | — | UNKNOWN | — | UNKNOWN |
| Mahilyow | Belarus | 53.91 | 30.34 | מאהליב (also מאהילוב (R)) | מאהליב (Yid.) | Sefaria: Etz Yosef on Bamidbar Rabbah 10:7:21 ("זיח פזיח ה"ז נזיר כן מצאתי הנוסחא בדפוס מאהליב. ונוסחא זו עיקרית. ובגמר") | VERIFIED |
| Maladzyechna | Belarus | 54.31 | 26.85 | — | UNKNOWN | — | UNKNOWN |
| Mazyr | Belarus | 52.05 | 29.23 | — | מאזיר (Yid.) | — | REPORTED (Yiddish only) |
| Minsk | Belarus | 53.90 | 27.56 | מינסק | מינסק (Yid.) | Sefaria: Toafot Re'em, Introduction 13 ("מ"ו מוה' אלי' נ"י שיף ר"מ דבהמ"ד פ"צ פה מינסק. דליטא.") | VERIFIED |
| Mir | Belarus | 53.45 | 26.47 | מיר | מיר (Yid.) | Sefaria: Sha'arei Torat Eretz Yisrael on Jerusalem Talmud Sanhedrin 10:4:2:1 (""ז אבי אבי אבי זללה"ה הרה"ג ר' דוד אב"ד דק"ק מיר ע"פ מה דאיתא בדברים רבה פ"ב אות ה' דא"ל הקב"ה ל") | VERIFIED |
| Mstsislaw | Belarus | 54.02 | 31.72 | — | UNKNOWN | — | UNKNOWN |
| Navahrudak | Belarus | 53.60 | 25.83 | — | UNKNOWN | — | UNKNOWN |
| Nyasvizh | Belarus | 53.22 | 26.68 | — | נעזשוויז (Yid.) | — | REPORTED (Yiddish only) |
| Orsha | Belarus | 54.51 | 30.43 | — | ארשע (Yid.) | — | REPORTED (Yiddish only) |
| Pinsk | Belarus | 52.12 | 26.10 | פינסק | פינסק (Yid.) | Sefaria: Pardes Yosef, Leviticus 1:9:5 ("ובס' סביב ליראיו על היראים מהגאבד"ק פינסק שליט"א כתב כוונתו. כמ"ש") | VERIFIED |
| Polotsk | Belarus | 55.48 | 28.80 | — | פאלאצק (Yid.) | not used: פלאצק: the hits are Płock (Meshivath Nefesh by the rabbi of Płock) | REPORTED (Yiddish only) |
| Pruzhany | Belarus | 52.56 | 24.46 | — | פרוזשענע (Yid.) | — | REPORTED (Yiddish only) |
| Radun | Belarus | 54.05 | 25.00 | ראדין | ראדין (Yid.) | Sefaria: Ahavat Yisrael 1:1 ("כר צדיק וקדוש לברכה לחיי העולם הבא מעיר ראדין בעל המחבר ספר חפץ חיים ו") | VERIFIED |
| Rechytsa | Belarus | 52.37 | 30.39 | — | רעטשיצע (Yid.) | — | REPORTED (Yiddish only) |
| Shklow | Belarus | 54.21 | 30.29 | שקלאוו (also שקלאב (V)) | UNKNOWN | Sefaria: Haamek Sheilah on Sheiltot d'Rav Achai Gaon, Kidmat HaEmek, Part I 18:3 ("הוא בני הרב מ' חיים ברלין מק"ק שקלאוו לקח עמו קונטרסים אלו להג") | VERIFIED |
| Slonim | Belarus | 53.08 | 25.32 | סלאנים | סלאנים (Yid.) | Sefaria: HaElef Lekha Shlomo, Orach Chayim 24:1 ("ח על הבתים הנה כבר הארכתי בזה הרבה לק"ק סלאנים ופסלתי כמה מאות תפילין ו") | VERIFIED |
| Slutsk | Belarus | 53.03 | 27.55 | סלוצק | סלוצק (Yid.) | Sefaria: Torah Temimah on Torah, Leviticus 26:20:1 ("תקנה זו ע"פ יסודי תקנת ועד הרבנים בעיר סלוצק") | VERIFIED |
| Smarhon | Belarus | 54.48 | 26.40 | — | סמארגאן (Yid.) | — | REPORTED (Yiddish only) |
| Stolin | Belarus | 51.89 | 26.85 | סטאלין | סטולין (Yid.) | Sefaria: Beit Aharon, Letters, R' Asher (the First) of Stolin 20 ("בעז"ה יום ב' פ' תולדות פה ק"ק סטאלין. לקאזעניץ") | VERIFIED |
| Svislach | Belarus | 53.03 | 24.10 | — | סיסלעוויטש (Yid.) | — | REPORTED (Yiddish only) |
| Valozhyn | Belarus | 54.08 | 26.52 | וולאזין (also וואלאזין (V)) | וואלאזשין (Yid.) | Sefaria: Torah Temimah on Torah, Leviticus 4:25:1 ("בזה, ונהירנא, כי בלמדי בימי חרפי בישיבת וולאזין") | VERIFIED |
| Vawkavysk | Belarus | 53.17 | 24.47 | וואלקאוויסק | וואלקאוויסק (Yid.) | Sefaria: Binyan Olam, Yoreh De'ah 7:1 ("בעזה"ש יום ג' י' שבט תקצ"ח לפ"ק וואלקאוויסק יע"א:") | VERIFIED |
| Vitsyebsk | Belarus | 55.18 | 30.17 | וויטעבסק | וויטעבסק (Yid.) | Sefaria: Sources and References on Torah Ohr, Vayeshev 29:8 ("בכ"ה בכסלו: נאמרה בחנוכה תקנ"ט בק"ק וויטעבסק. ראה לקו"ד ח"א כא, א. רא") | REPORTED (imprint in modern bibliography) |
| Boskovice | Czechia | 49.49 | 16.66 | — | UNKNOWN | — | UNKNOWN |
| Brno | Czechia | 49.20 | 16.61 | ברין | ברין (Yid.) | Sefaria: Responsa Chatam Sofer, Choshen Mishpat 138:2 ("' כך הי' הרב מו"ה ליב דרעזניטץ ז"ל אב"ד דק"ק ברין הניח אחריו ארבעה בנים שם האחד ר' געציל והשני ר") | VERIFIED |
| Holešov | Czechia | 49.33 | 17.58 | — | UNKNOWN | — | UNKNOWN |
| Jihlava | Czechia | 49.40 | 15.59 | — | UNKNOWN | — | UNKNOWN |
| Kolín | Czechia | 50.03 | 15.20 | — | UNKNOWN | — | UNKNOWN |
| Kroměříž | Czechia | 49.30 | 17.39 | קרעמזיר | UNKNOWN | Sefaria: Teshuva MeAhava Part I 130:1 ("י המופלג בתורה מוה' איצק ברד"צ נ"י בק"ק קרעמזיר, אחר דש"ה כו' הנה ידעתי") | VERIFIED |
| Liberec | Czechia | 50.77 | 15.05 | — | UNKNOWN | — | UNKNOWN |
| Lipník nad Bečvou | Czechia | 49.53 | 17.59 | לייפניק | UNKNOWN | Sefaria: Responsa Chatam Sofer, Orach Chayim 113:7 ("ן הגאון מו"ה ברוך פרענקל זצ"ל אב"ד דק"ק לייפניק בחיים חיותו אירע מעשה שה") | VERIFIED |
| Mikulov | Czechia | 48.81 | 16.64 | ניקלשבורג (also ניקלשפורג (V)) | ניקאלשבורג (Yid.) | Sefaria: Be'er Mayim Chaim, Genesis 1:26:23 ("קים קדוש מוהר"ר שמואל שמעלקא האב"ד דק"ק ניקלשבורג על מאמר אדון החכמים לסוס") | VERIFIED |
| Olomouc | Czechia | 49.59 | 17.25 | — | UNKNOWN | — | UNKNOWN |
| Opava | Czechia | 49.94 | 17.90 | — | UNKNOWN | — | UNKNOWN |
| Ostrava | Czechia | 49.84 | 18.29 | אסטראוו | UNKNOWN | Penn catalogue imprint: "אסטראוו : דפוס A.W. RUBIN, תרצ"ג-." | REPORTED |
| Plzeň | Czechia | 49.74 | 13.38 | פילזן | פילזען (Yid.) | Sefaria: Noda BiYehudah II, Choshen Mishpat 52:3 ("שמואל נר"ו אשר כעת אב"ד דק"ק טאכי וגליל פילזן:") | VERIFIED |
| Prostějov | Czechia | 49.47 | 17.11 | — | פראסטיץ (Yid.) | — | REPORTED (Yiddish only) |
| Třebíč | Czechia | 49.21 | 15.88 | טריטש (also טריביטש (V)) | UNKNOWN | Sefaria: Noda BiYehudah II, Orach Chaim 109:3 ("וד האלופים התורניים הרבנים בי דינא דק"ק טריטש:") | VERIFIED |
| Uherský Brod | Czechia | 49.03 | 17.65 | — | UNKNOWN | — | UNKNOWN |
| České Budějovice | Czechia | 48.97 | 14.47 | — | UNKNOWN | — | UNKNOWN |
| Narva | Estonia | 59.38 | 28.20 | — | UNKNOWN | — | UNKNOWN |
| Tallinn | Estonia | 59.44 | 24.75 | — | טאלין (Yid.) | — | REPORTED (Yiddish only) |
| Tartu | Estonia | 58.38 | 26.72 | — | UNKNOWN | — | UNKNOWN |
| Balassagyarmat | Hungary | 48.07 | 19.29 | — | באלש דיארמאט (Yid.) | — | REPORTED (Yiddish only) |
| Budapest | Hungary | 47.50 | 19.04 | אובן (also בודאפעסט (R), פעסט (R)) | בודאפעשט (Yid.) | Sefaria: Chakham Tzvi 95:1 ("בודון דמתקריא אובן ת"מ לפ"ק.") | VERIFIED |
| Debrecen | Hungary | 47.53 | 21.64 | — | דעברעצין (Yid.) | — | REPORTED (Yiddish only) |
| Eger | Hungary | 47.90 | 20.37 | ערלוי | ערלוי (Yid.) | Sefaria: Teshuvot Maharsham Volume II 53:1 ("להרב הג' וכ' מו"ה שמעון סופר נ"י אבד"ק ערלוי. במדינת הגר:") | VERIFIED |
| Gyöngyös | Hungary | 47.78 | 19.93 | — | דינדיש (Yid.) | — | REPORTED (Yiddish only) |
| Győr | Hungary | 47.68 | 17.63 | ראב | גיאר (Yid.) | Sefaria: Responsa Chatam Sofer, Yoreh De'ah 37:1 ("ג הותיק מלא עתיק כבוד מה אברהם נ"י אב"ד דק"ק ראב יע"א:") | VERIFIED |
| Kaposvár | Hungary | 46.37 | 17.78 | — | UNKNOWN | — | UNKNOWN |
| Kecskemét | Hungary | 46.91 | 19.69 | קעטשקעמעט | UNKNOWN | Penn catalogue imprint: "קעטשקעמעט : מ. אבראהאם, תרפ"ז." | REPORTED |
| Kisvárda | Hungary | 48.23 | 22.08 | קליינווארדיין | קליינווארדיין (Yid.) | Sefaria: Teshuvot Maharsham Volume II 64:1 ("רב וכו' מו"ה נפתלי שרייבער נ"י מו"ץ דק' קליינווארדיין בארץ הגר:") | VERIFIED |
| Makó | Hungary | 46.22 | 20.48 | מאקאווא (also מאקא (V)) | מאקאווע (Yid.) | Sefaria: Responsa Chatam Sofer, Even HaEzer 2:12:1 ("ורסם כש"ת מה' זלמן אולמן אב"ד ור"מ דק"ק מאקאווא יע"א:") | VERIFIED |
| Miskolc | Hungary | 48.10 | 20.78 | מישקולץ (also מישקאלץ (R)) | מישקאלץ (Yid.) | Sefaria: Sefer Puah, Fourth Volume; Gynecology, Diseases, Society and Research, Bibliography 413 ("לבושי מרדכי, חלקים א-ז, טולצ'וה–בודפסט–מישקולץ תרע"ב-תרצ"ז.") | REPORTED (imprint in modern bibliography) |
| Mád | Hungary | 48.19 | 21.27 | מאד | מאד (Yid.) | Sefaria: Teshuvot Maharsham Volume I 56:2 ("מכתבו הגיעני ובדבר מה שהשבתי לגיסו הרב אבד"ק מאד בענין הכרמים וכעת שלח אלי העתק ממכתב הרב הגאון") | VERIFIED |
| Nagykanizsa | Hungary | 46.46 | 17.00 | קאנישא | UNKNOWN | Sefaria: Responsa Chatam Sofer, Even HaEzer 2:86:1 ("לא כמ"ה מאיר נ"י יושב בשבת תחכמוני בק"ק קאנישא:") | VERIFIED |
| Nagykálló | Hungary | 47.88 | 21.85 | — | קאלעוו (Yid.) | — | REPORTED (Yiddish only) |
| Nyíregyháza | Hungary | 47.95 | 21.72 | — | נירעדהאז (Yid.) | — | REPORTED (Yiddish only) |
| Paks | Hungary | 46.62 | 18.86 | פאקש | UNKNOWN | Sefaria: Noda BiYehudah II, Yoreh Deah 29:4 ("לכבוד הרב המופלא מוהר"ר יצחק אב"ד בק"ק פאקש:") | VERIFIED |
| Pécs | Hungary | 46.07 | 18.23 | — | פעטש (Yid.) | — | REPORTED (Yiddish only) |
| Sopron | Hungary | 47.68 | 16.58 | — | שאפראן (Yid.) | — | REPORTED (Yiddish only) |
| Szeged | Hungary | 46.25 | 20.17 | — | סעגעד (Yid.) | — | REPORTED (Yiddish only) |
| Szolnok | Hungary | 47.17 | 20.18 | — | UNKNOWN | — | UNKNOWN |
| Szombathely | Hungary | 47.23 | 16.63 | — | UNKNOWN | — | UNKNOWN |
| Székesfehérvár | Hungary | 47.19 | 18.41 | — | UNKNOWN | — | UNKNOWN |
| Sátoraljaújhely | Hungary | 48.39 | 21.66 | אוהעל | איהעל (Yid.) | Sefaria: Responsa Chatam Sofer, Choshen Mishpat 44:13 ("קנת המדינה עפ"י מלכות כאשר עשו אנשי ק"ק אוהעל") | VERIFIED |
| Tokaj | Hungary | 48.12 | 21.41 | טאקאי | UNKNOWN | Sefaria: Responsa Chatam Sofer, Choshen Mishpat 44:12 ("מופלג בתורה כש"ת מו"ה נתן נ"י אב"ד דק"ק טאקאי יע"א:") | VERIFIED |
| Veszprém | Hungary | 47.10 | 17.92 | — | UNKNOWN | — | UNKNOWN |
| Daugavpils | Latvia | 55.87 | 26.52 | דווינסק | דענענבורג (Yid.) | Sefaria: Sefer Puah, Fourth Volume; Gynecology, Diseases, Society and Research, Bibliography 684 ("ין , שו"ת צפנת פענח, בעריכת רחל ציטרון, דווינסק ת"ש.") | REPORTED (imprint in modern bibliography) |
| Jelgava | Latvia | 56.65 | 23.72 | — | UNKNOWN | — | UNKNOWN |
| Jēkabpils | Latvia | 56.50 | 25.87 | — | UNKNOWN | — | UNKNOWN |
| Krāslava | Latvia | 55.90 | 27.16 | — | קריסלאווא (Yid.) | — | REPORTED (Yiddish only) |
| Liepāja | Latvia | 56.51 | 21.01 | ליבויא | ליבאווע (Yid.) | Sefaria: Teshuvot Rabbi Akiva Eiger 121:23 ("שעת הדחק איני רוצה לסמוך עלי, ואנשי ק"ק ליבויא יפרידו את הזוג עד ישאלו") | VERIFIED |
| Ludza | Latvia | 56.54 | 27.72 | לוצין | UNKNOWN | Sefaria: Sefer Puah, Fourth Volume; Gynecology, Diseases, Society and Research, Bibliography 124 ("יהודה, דרשות, חידושים ושו"ת, חלקים א-ב, לוצין תר"צ–תרצ"ט.") | REPORTED (imprint in modern bibliography) |
| Riga | Latvia | 56.95 | 24.11 | ריגא | ריגע (Yid.) | Sefaria: Teshuvot Meshiv Davar, Volume II 55:2 ("רב וכו' כקש"ת מו"ה ראובן יצחק מו"ץ דק"ק ריגא:") | VERIFIED |
| Rēzekne | Latvia | 56.51 | 27.33 | — | UNKNOWN | — | UNKNOWN |
| Tukums | Latvia | 56.97 | 23.15 | — | UNKNOWN | — | UNKNOWN |
| Alytus | Lithuania | 54.40 | 24.05 | — | אליטע (Yid.) | — | REPORTED (Yiddish only) |
| Biržai | Lithuania | 56.20 | 24.75 | — | בירזש (Yid.) | — | REPORTED (Yiddish only) |
| Eišiškės | Lithuania | 54.17 | 25.00 | — | UNKNOWN | — | UNKNOWN |
| Jurbarkas | Lithuania | 55.08 | 22.77 | — | UNKNOWN | — | UNKNOWN |
| Kaunas | Lithuania | 54.90 | 23.93 | קאוונא (also קובנא (V)) | קאוונע (Yid.) | Sefaria: Haamek Sheilah on Sheiltot d'Rav Achai Gaon, Kidmat HaEmek, Part I 18:4 ("בהגאון מוהר"א ליב שפירא זצ"ל אב"ד דק"ק קאוונא הוא יושב עמדי בחבורה, כח") | VERIFIED |
| Kelmė | Lithuania | 55.63 | 22.93 | — | UNKNOWN | — | UNKNOWN |
| Klaipėda | Lithuania | 55.71 | 21.14 | מעמעל | UNKNOWN | Sefaria: Ohr Yisrael, Netivot Ohr 91 ("וע יחד בעגלה עם אנשים סוחרים שנסעו לעיר מעמעל לרגלי מסחרם, אשר לא ידעו") | VERIFIED |
| Kretinga | Lithuania | 55.89 | 21.25 | — | קרעטינגא (Yid.) | — | REPORTED (Yiddish only) |
| Kėdainiai | Lithuania | 55.28 | 23.97 | קידאן (also קיידאן (R)) | UNKNOWN | Sefaria: Hagahot She'erit Tzion 100:3 ("את כבוד בנו הג"מ דוד קצנאלנבויגן אבד"ק קידאן אבל המה לא אבו") | VERIFIED |
| Marijampolė | Lithuania | 54.56 | 23.35 | — | UNKNOWN | — | UNKNOWN |
| Panevėžys | Lithuania | 55.73 | 24.36 | פאניוועז | פאנעוועזש (Yid.) | Sefaria: Toafot Re'em 1:2 ("ן רא"ד שליט"א ראבינאוויץ אב"ד ור"מ דק"ק פאניוועז שיש בזה טעות א' מהמעתיקי") | VERIFIED |
| Plungė | Lithuania | 55.92 | 21.85 | פלונגיאן | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura III 1:123:2 ("שים וכבר השיבו בזה הרבנים הגאונים אבד"ק פלונגיאן") | VERIFIED |
| Raseiniai | Lithuania | 55.37 | 23.12 | ראסיין | UNKNOWN | Sefaria: Teshuvot Meshiv Davar, Volume II 90:1 ("תשובה להרב מ' ליב נ"י מו"ץ בק' ראסיין בעזה"י א) אשר הקשה בסנהד") | VERIFIED |
| Rokiškis | Lithuania | 55.97 | 25.58 | — | UNKNOWN | — | UNKNOWN |
| Telšiai | Lithuania | 55.98 | 22.25 | טעלז | טעלזש (Yid.) | Sefaria: Teshuvot Meshiv Davar, Volume II 69:1 ("ו' כש"ת מו"ה יהושע העליר נ"י האב"ד דק"ק טעלז יע"א. המקום יהא בעוזרו ו") | VERIFIED |
| Ukmergė | Lithuania | 55.25 | 24.77 | — | ווילקאמיר (Yid.) | — | REPORTED (Yiddish only) |
| Vilkaviškis | Lithuania | 54.67 | 23.03 | — | UNKNOWN | — | UNKNOWN |
| Vilnius | Lithuania | 54.69 | 25.28 | ווילנא | ווילנע (Yid.) | title page *Ḥorev* II (Wikisource): "ווילנא בדפוס האלמנה והאחים ראם"; Ḥokhmath Adam 50:5 "דק"ק ווילנא"; וילנא is also frequent (Or Yisrael 1:1) | VERIFIED |
| Šiauliai | Lithuania | 55.93 | 23.32 | שאוול | שאוול (Yid.) | Sefaria: HaElef Lekha Shlomo, Even HaEzer 188:1 ("להרב מיכאל מו"צ דק' שאוול.") | VERIFIED |
| Žagarė | Lithuania | 56.36 | 23.25 | זאגער | UNKNOWN | Sefaria: Be'er Yitzchak, Orach Chayim 23:1 ("ורסם וכו' מוהר"ר אורי דוד ני' אב"ד דק"ק זאגער ישן.") | VERIFIED |
| Bender (Tighina) | Moldova | 46.83 | 29.48 | בענדער | UNKNOWN | Sefaria: Ben Porat Yosef, Shabbat HaGadol Sermons 1:71 ("קכ"ט לפ"ק, שסיפר לי אחד מעשה שאירע בק"ק בענדער") | VERIFIED |
| Briceni | Moldova | 48.36 | 27.09 | — | UNKNOWN | — | UNKNOWN |
| Bălți | Moldova | 47.76 | 27.93 | — | בעלץ (Yid.) | — | REPORTED (Yiddish only) |
| Chișinău | Moldova | 47.02 | 28.84 | קישינוב | קעשענעוו (Yid.) | Sefaria: Sefer Puah, Fourth Volume; Gynecology, Diseases, Society and Research, Bibliography 517 ("צירלסון, מערכי לב, שו"ת דרושים ונאומים, קישינוב תרצ"ב.") | REPORTED (imprint in modern bibliography) |
| Edineț | Moldova | 48.17 | 27.30 | — | UNKNOWN | — | UNKNOWN |
| Lipcani | Moldova | 48.27 | 26.80 | ליפקאן | UNKNOWN | Sefaria: Teshuvot Maharsham Volume III 277:1 ("להרב מו"ה חיים יהודא ליב נ"י אבד"ק ליפקאן במדינת בעסראביע") | VERIFIED |
| Orhei | Moldova | 47.38 | 28.82 | — | UNKNOWN | — | UNKNOWN |
| Soroca | Moldova | 48.16 | 28.30 | סאראקא | UNKNOWN | Sefaria: Teshuvot Maharsham Volume I 161:2 ("' מקרוביה ומפורסם שפסק ווסתה ונסעה לעיר סאראקא") | VERIFIED |
| Tiraspol | Moldova | 46.85 | 29.63 | טיראספאל | UNKNOWN | Sefaria: Teshuvot Maharsham Volume II 6:1 ("וכו' מו"ה ישראל אברהם לערניר נ"י אבד"ק טיראספאל. ברוסיא.") | VERIFIED |
| Aleksandrów Łódzki | Poland | 51.82 | 19.30 | — | אלעקסאנדער (Yid.) | — | REPORTED (Yiddish only) |
| Białystok | Poland | 53.13 | 23.17 | ביאליסטאק (also ביאליסטוק (R)) | ביאליסטאק (Yid.) | Sefaria: Teshuvot Rabbi Akiva Eiger 68:1 ("לידידי הרב רבי משה זאב נ"י הגאכ"ד דק"ק ביאליסטאק") | VERIFIED |
| Bielsko-Biała | Poland | 49.82 | 19.04 | — | UNKNOWN | — | UNKNOWN |
| Biłgoraj | Poland | 50.55 | 22.73 | בילגורייא (also בילגוריי (R)) | בילגוריי (Yid.) | Sefaria: Sefer Puah, Fourth Volume; Gynecology, Diseases, Society and Research, Bibliography 295 ("דוד מנחם מאניש באבד, שו"ת חבצלת השרון, בילגורייא תרצ"א.") | REPORTED (imprint in modern bibliography) |
| Bobowa | Poland | 49.71 | 20.94 | — | באבאוו (Yid.) | — | REPORTED (Yiddish only) |
| Bochnia | Poland | 49.97 | 20.43 | באכניא | UNKNOWN | Sefaria: Teshuvot Maharsham Volume I 144:3 ("נין זה ודלא כתי' ב' של הכ"מ ובתשובה לק' באכניא") | VERIFIED |
| Brzeg Dolny | Poland | 51.27 | 16.72 | דיהרנפורט | UNKNOWN | Sefaria: Noda BiYehudah II, Orach Chaim 57:26 ("והוא ע"פ מה שנדפס בטור א"ח דפוס דיהרנפורט בהגהת הגאון מהר"ל חנליש") | VERIFIED |
| Bydgoszcz | Poland | 53.12 | 18.00 | — | בידגאש (Yid.) | — | REPORTED (Yiddish only) |
| Bytom | Poland | 50.35 | 18.92 | — | UNKNOWN | — | UNKNOWN |
| Będzin | Poland | 50.33 | 19.13 | בענדין | בענדין (Yid.) | Sefaria: Noda BiYehudah II, Even HaEzer 52:27 ("א דהכי מקדש ואין זה דומה להך עובדא דק"ק בענדין אשר הזכרתי בנודע ביהודה") | VERIFIED |
| Chełm | Poland | 51.13 | 23.48 | חעלם | כעלם (Yid.) | Sefaria: Chakham Tzvi 93:1 ("העידו על זקני הגאון מוהר"ר אליהו אבדק"ק חעלם מי מצטרף לעשרה לדברים הצ") | VERIFIED |
| Chrzanów | Poland | 50.13 | 19.40 | — | קשאנאוו (Yid.) | — | REPORTED (Yiddish only) |
| Ciechanów | Poland | 52.88 | 20.62 | — | UNKNOWN | — | UNKNOWN |
| Częstochowa | Poland | 50.81 | 19.12 | — | טשענסטאכאוו (Yid.) | — | REPORTED (Yiddish only) |
| Dynów | Poland | 49.82 | 22.23 | דינוב | דינאוו (Yid.) | Sefaria: Shoel uMeshiv Mahadura I 1:88:1 ("המופלג וכו' מוה' לייביש הכהן מו"ץ דק"ק דינוב.") | VERIFIED |
| Elbląg | Poland | 54.15 | 19.41 | — | UNKNOWN | — | UNKNOWN |
| Gdańsk | Poland | 54.35 | 18.65 | דאנציג | דאנציג (Yid.) | Sefaria: Responsa Benei Banim, Volume I 35:5 ("הוא היה אב"ד דאנציג ומדבריו מוכח שלא חשש להת") | VERIFIED |
| Gdynia | Poland | 54.52 | 18.54 | — | UNKNOWN | — | UNKNOWN |
| Gliwice | Poland | 50.29 | 18.67 | — | UNKNOWN | — | UNKNOWN |
| Gniezno | Poland | 52.53 | 17.60 | — | UNKNOWN | — | UNKNOWN |
| Gorlice | Poland | 49.66 | 21.16 | גארליץ | UNKNOWN | Sefaria: Teshuvot Maharsham Volume II 123:1 ("ג וכו' מו"ה רפאל צימעטבוים נ"י מו"ץ דק' גארליץ בעהמחים אור לפארו:") | VERIFIED |
| Grodzisk Mazowiecki | Poland | 52.11 | 20.62 | גראדזיסק | גראדזשיסק (Yid.) | Sefaria: Derekh HaMelekh, Kuntres Tiferet Banim, Introduction 9 ("ברי מתוקים אלו, להוציא מפי אדומו"ר מק"ק גראדזיסק באספקלריא המאירה אשר כל") | VERIFIED |
| Grudziądz | Poland | 53.49 | 18.75 | — | UNKNOWN | — | UNKNOWN |
| Góra Kalwaria | Poland | 51.98 | 21.21 | גור | גער (Yid.) | Sefaria: Chiddushei HaRim Responsa, Choshen Mishpat 5:1 ("להרב דק"ק גור מו' ליביש נ"י") | VERIFIED |
| Głogów | Poland | 51.66 | 16.08 | גלוגא | UNKNOWN | Sefaria: Responsa Chatam Sofer, Orach Chayim 122:1 ("ע"ה פ"ה כקש"ת מהו' אברהם נ"י אב"ד דק"ק גלוגא רבתי יע"א:") | VERIFIED |
| Hrubieszów | Poland | 50.80 | 23.92 | — | UNKNOWN | — | UNKNOWN |
| Izbica | Poland | 50.88 | 23.17 | איזביצא | איזשביצע (Yid.) | Sefaria: Mei HaShiloach, Volume II, Introduction 18 ("תרי״ד בשבעה בחודש טבת מנוחתו כבוד בעיר איזביצא. עכ״ל אחי אדמו״ר זללה״ה.") | VERIFIED |
| Jarosław | Poland | 50.02 | 22.68 | — | UNKNOWN | — | UNKNOWN |
| Józefów (Biłgoraj) | Poland | 50.48 | 23.05 | — | UNKNOWN | — | UNKNOWN |
| Kalisz | Poland | 51.76 | 18.08 | קאליש | קאליש (Yid.) | Sefaria: Em HaBanim Semecha, Approbations 20 ("יד"נ וכו' הרב מו"ה חיים אלעזר נ"י אבד"ק קאליש יע"א.") | VERIFIED |
| Katowice | Poland | 50.25 | 19.00 | — | קאטאוויץ (Yid.) | — | REPORTED (Yiddish only) |
| Kielce | Poland | 50.87 | 20.63 | — | קעלץ (Yid.) | not used: קעלץ: single hit (Noda bi-Yehuda II OḤ 51, address to "מוה׳ אלעזר אב"ד דק"ק קעלץ") is doubtful for Kielce, where Jews could not settle before 1833 | REPORTED (Yiddish only) |
| Kock | Poland | 51.64 | 22.45 | קאצק | UNKNOWN | Sefaria: Teshuvot Maharsham Volume III 149:2 ("פני הרב הגאון מו"ה יואב יהושע ני' אבד"ק קאצק") | VERIFIED |
| Koszalin | Poland | 54.19 | 16.18 | — | UNKNOWN | — | UNKNOWN |
| Kozienice | Poland | 51.59 | 21.55 | קאזניץ | קאזשניץ (Yid.) | Sefaria: Maor VaShemesh, Miketz 12 ("עתי מפי הרב המגיד בוצינא קדישא מ"מ דק"ק קאזניץ") | VERIFIED |
| Kraków | Poland | 50.06 | 19.94 | קראקא | קראקע (Yid.) | Sefaria: Shenei Luchot HaBerit, Aseret HaDibrot, Yoma, Ner Mitzva 1:46 ("וף המרומם בפי כל מהורר"ף סג"ל יצ"ו מק"ק קראקא העיד על גיסו מהר"מ איסרל") | VERIFIED |
| Kraśnik | Poland | 50.92 | 22.22 | קראשניק | קרושניק (Yid.) | Sefaria: Shoel uMeshiv Mahadura II 2:35:14 ("יא בשם הגאון מו"ה עזריאל הורוויטץ אבד"ק קראשניק") | VERIFIED |
| Krotoszyn | Poland | 51.70 | 17.44 | קראטשין (also קראטאשין (V)) | UNKNOWN | Sefaria: Yedei Moshe on Bereshit Rabbah 76:9:1 ("שם דודי הגאון מהור"ר מן אשכנז אב"ד דק"ק קראטשין לפי שאמר יוסף לבנימן אלה") | VERIFIED |
| Kutno | Poland | 52.23 | 19.37 | קוטנא | UNKNOWN | Sefaria: Em HaBanim Semecha, Approbations 32 ("ישראל יהושע חופ"ק קוטנא") | VERIFIED |
| Legnica | Poland | 51.21 | 16.16 | — | UNKNOWN | — | UNKNOWN |
| Lelów | Poland | 50.68 | 19.63 | — | UNKNOWN | — | UNKNOWN |
| Lesko | Poland | 49.47 | 22.33 | לינסק | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura I 2:170:1 ("נודע שמכר בשר טריפה במקום כשר ונסע לעיר לינסק ומכר ג"כ בשר טריפה בחזקת") | VERIFIED |
| Leszno | Poland | 51.84 | 16.57 | ליסא | ליסא (Yid.) | Sefaria: Chokhmat Adam, Author's Introduction 1 ("חזור מחיבורי ביום א׳ או ב׳ ובהיותי בק״ק ליסא") | VERIFIED |
| Leżajsk | Poland | 50.27 | 22.42 | ליזענסק | ליזשענסק (Yid.) | Sefaria: HaElef Lekha Shlomo, Even HaEzer 155:1 ("להרב מו"ה יהושע אפרים אב"ד ליזענסק.") | VERIFIED |
| Lubartów | Poland | 51.47 | 22.60 | — | לעווערטאוו (Yid.) | — | REPORTED (Yiddish only) |
| Lublin | Poland | 51.25 | 22.57 | לובלין | לובלין (Yid.) | Ḥakham Ṣevi 83: "לובלין שבמדינת פולין" | VERIFIED |
| Mszczonów | Poland | 51.97 | 20.53 | — | אמשינאוו (Yid.) | — | REPORTED (Yiddish only) |
| Mława | Poland | 53.12 | 20.37 | — | מלאווע (Yid.) | — | REPORTED (Yiddish only) |
| Nowy Dwór Mazowiecki | Poland | 52.43 | 20.72 | — | נאווידוואר (Yid.) | — | REPORTED (Yiddish only) |
| Nowy Sącz | Poland | 49.62 | 20.70 | צאנז (also סאנץ (V)) | צאנז (Yid.) | Sefaria: Teshuvot Maharsham Volume III 132:1 ("מו"ה ארי' ליבש הלבר- שטאם שליט"א אבד"ק צאנז") | VERIFIED |
| Olsztyn | Poland | 53.78 | 20.49 | — | UNKNOWN | — | UNKNOWN |
| Opatów | Poland | 50.80 | 21.42 | אפטא | אפטא (Yid.) | Sefaria: Kedushat Levi, Letters of Approbation 1 ("ארים מוהר"ר אברהם יהושע העשיל אב"ד דק"ק אפטא ומעזבוז :") | VERIFIED |
| Opoczno | Poland | 51.38 | 20.28 | — | אפאטשנא (Yid.) | — | REPORTED (Yiddish only) |
| Opole | Poland | 50.67 | 17.92 | — | UNKNOWN | — | UNKNOWN |
| Ostrowiec Świętokrzyski | Poland | 50.93 | 21.40 | — | אסטראווצע (Yid.) | — | REPORTED (Yiddish only) |
| Oświęcim | Poland | 50.04 | 19.22 | אושפיצין | אשפעצין (Yid.) | Sefaria: Shoel uMeshiv Mahadura I 1:131:1 ("אוה"ג וכו' מוהר"ר יחזקאל הלוי נ"י אבד"ק אושפיצין מה ששאל באתרוגים שהובאו") | VERIFIED |
| Pabianice | Poland | 51.66 | 19.35 | פאביאניץ | UNKNOWN | Sefaria: Pardes Yosef, Exodus 16:4:1 ("קו"ד ח"ז סי' נ"ה וחו"ט סי' ל"ב מהגאבד"ק פאביאניץ") | VERIFIED |
| Piotrków Trybunalski | Poland | 51.40 | 19.68 | פיעטרקוב (also פיעטריקוב (R)) | פיעטרקאוו (Yid.) | Sefaria: Hagahot She'erit Tzion 26:1 ("ם - טור אדם, פטדה, וברקת ונדפס מחדש בק' פיעטרקוב.") | VERIFIED |
| Pińczów | Poland | 50.52 | 20.53 | פינטשוב | פינטשאוו (Yid.) | Sefaria: Tiferet Shlomo, on Torah, Shabbat Chazon 6 ("ו הרב הגאון הגדול מו"ה שלמה זלה"ה אבד"ק פינטשוב בהרב המופלג המפורסם מו"ה") | VERIFIED |
| Poznań | Poland | 52.41 | 16.93 | פוזנא | פויזן (Yid.) | Sefaria: Responsa Chatam Sofer, Yoreh De'ah 236:1 (""הח פ"הי כקש"ת מו"ה עקיבא נ"י אב"ד דק"ק פוזנא יע"א:") | VERIFIED |
| Przemyśl | Poland | 49.78 | 22.78 | פרעמישלא (also פשעמישל (V)) | פשעמישל (Yid.) | Sefaria: Teshuvot Maharsham Volume I 48:1 ("וכו' מו"ה נתן העבינשטרייט נ"י מו"ץ דק' פרעמישלא.") | VERIFIED |
| Przeworsk | Poland | 50.06 | 22.49 | פשעווארסק (also פרשעווארסק (V)) | פשעווארסק (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 3:91:1 ("שלום להרב הה"ג מוה' יונה נ"י אבד"ק פשעווארסק:") | VERIFIED |
| Przysucha | Poland | 51.37 | 20.62 | — | UNKNOWN | — | UNKNOWN |
| Pułtusk | Poland | 52.72 | 21.10 | פולטוסק | UNKNOWN | Sefaria: Chiddushei HaRim Responsa, Even HaEzer 18:1 ("ע"ד ענין הקדושין שז"ל הגב"ע מב"ד דק"ק פולטוסק:") | VERIFIED |
| Płock | Poland | 52.55 | 19.70 | פלאצק | פלאצק (Yid.) | Sefaria: Teshuvot Maharsham Volume I 190:3 ("ק במזומנים וגם בשו"ת משיבת נפש להגאבד"ק פלאצק") | VERIFIED |
| Płońsk | Poland | 52.62 | 20.38 | פלונסק | UNKNOWN | Sefaria: Teshuvot Maharsham Volume I 38:1 ("וכו' מו"ה צבי יחזקאל מיכלזאהן נ"י אבד"ק פלונסק ברוסיא.") | VERIFIED |
| Radom | Poland | 51.42 | 21.15 | — | ראדעם (Yid.) | — | REPORTED (Yiddish only) |
| Radzymin | Poland | 52.42 | 21.18 | ראדזימין | UNKNOWN | Sefaria: Mekor Mayim Chayim on Baal Shem Tov, Ki Tisa 9:3 ("וכתב לנו הראש ישיבה בישיבת ראדזימין בזה הלשון, ובדבר הספר עמ") | VERIFIED |
| Radzyń Podlaski | Poland | 51.78 | 22.62 | ראדזין | UNKNOWN | Sefaria: Noda BiYehudah I, Even HaEzer 36:13 ("אגרות שמסרו לבנו השייך לק"ק סקאהל ולק"ק ראדזין הם עצמם האגרות שנמצאו אצ") | VERIFIED |
| Ropczyce | Poland | 50.08 | 21.63 | ראפשיץ | ראפשיץ (Yid.) | Sefaria: Imrei Shefer, Epistles 6:20 ("פה"ק ראפשיץ .") | VERIFIED |
| Rybnik | Poland | 50.08 | 18.50 | — | UNKNOWN | — | UNKNOWN |
| Rymanów | Poland | 49.57 | 21.88 | רימאנוב | רימאנאוו (Yid.) | Sefaria: Teshuvot Maharsham Volume III 213:1 ("אה"ג מו"ה משה מרדכי אייזען נ"י מו"צ דק' רימאנוב") | VERIFIED |
| Rzeszów | Poland | 50.04 | 22.00 | ריישא (also רישא (R)) | ריישע (Yid.) | Sefaria: Imrei Shefer, Epistles 6:15 ("נים כידוע למוכ"ז ר' מנחם מענדל נ"י מעיר ריישא") | VERIFIED |
| Sandomierz | Poland | 50.68 | 21.75 | צוזמיר | צויזמער (Yid.) | Sefaria: Seder HaDorot, Compositions 1851:1 ("פירוש על המסורה מ' יעקב בר' יצחק אבד"ק צוזמיר מה שלא פי' ר' אלי' בחור") | VERIFIED |
| Sanok | Poland | 49.55 | 22.22 | — | סאניק (Yid.) | — | REPORTED (Yiddish only) |
| Siedlce | Poland | 52.18 | 22.28 | שעדליץ (also שעדלעץ (R)) | שעדליץ (Yid.) | Sefaria: Chiddushei HaRim Responsa, Even HaEzer 27:1 (""ג חריף ובקי נ"י פ"ה מ' לייזר נ"י אבד"ק שעדליץ.") | VERIFIED |
| Sieniawa | Poland | 50.18 | 22.61 | שינאווא (also שינאווע (V)) | שינאווא (Yid.) | Sefaria: Hagahot Menachem Tzion, Letter Alef 26:1 (""י השתדלות הרה"ק מו"ה יחזקאל שרגא אבד"ק שינאווא ז"ל נדפס בשלימות") | VERIFIED |
| Sochaczew | Poland | 52.23 | 20.23 | סאכאטשוב (also סאכטשאב (V)) | סאכאטשאוו (Yid.) | Sefaria: Pardes Yosef, Genesis 37:34:2 (""ך ח"ב מאא"ז הגה"ק מהר"א הכהן ז"ל אבד"ק סאכאטשוב, ע"ש בערוגה ד':") | VERIFIED |
| Sosnowiec | Poland | 50.30 | 19.17 | — | סאסנאווצע (Yid.) | — | REPORTED (Yiddish only) |
| Suwałki | Poland | 54.10 | 22.93 | סוואלק | UNKNOWN | Sefaria: Binyan Olam, Introduction 8 ("מוה' יחזקאל במוה' ניסן ליפסקי נ"י מפ"ק סוואלק אשר הגדיל חסדו עלי ועשה") | VERIFIED |
| Szczebrzeszyn | Poland | 50.70 | 22.97 | שעברשין | UNKNOWN | Sefaria: Hagahot Menachem Tzion, Letter Mem 23:1 ("למו"ה יואל במו"ה גד אבד"ק שעברשין.") | VERIFIED |
| Szczecin | Poland | 53.42 | 14.56 | שטעטין | שטעטין (Yid.) | Sefaria: Otzar Midrashim, Midrash on Book of Samuel 3 ("ווארשא תרי״א עם פי׳ הנ״ל והגהות הרד״ל; שטעטין תר"כ עם") | REPORTED (imprint in modern bibliography) |
| Tarnobrzeg | Poland | 50.58 | 21.68 | דזיקוב | דזשיקאוו (Yid.) | Sefaria: Teshuvot Maharsham Volume III 148:1 ("רב הגדול וכו' מו"ה שמעון הערץ מו"צ דק"ק דזיקוב.") | VERIFIED |
| Tarnów | Poland | 50.01 | 20.99 | טארנא (also טארנוב (R), טארנאוו (R)) | טארנע (Yid.) | Sefaria: Teshuvot Maharsham Volume II 126:1 ("י ומוה' אברהם יהודא ארשיטץ נ"י בד"צ דק' טארנא מכתבם הגיעני וע"ד שאלתם") | VERIFIED |
| Tomaszów Mazowiecki | Poland | 51.53 | 20.01 | — | טאמאשאוו-מאזאוויעצק (Yid.) | — | REPORTED (Yiddish only) |
| Toruń | Poland | 53.01 | 18.60 | טהארן | טויערן (Yid.) | Sefaria: Binyan Tziyon 1:1 ("רה"ג וכו' מה' צבי הירש קאלישער נ"י בק"ק טהארן יע"א.") | VERIFIED |
| Tychy | Poland | 50.12 | 18.99 | — | UNKNOWN | — | UNKNOWN |
| Tykocin | Poland | 53.20 | 22.78 | טיקטין | UNKNOWN | Sefaria: Binyan Olam, Orach Chayim 14:1 ("וה' יצחק אייזיק נ"י בעהמח"ס בית יצחק רב דק"ק טיקטין הצלחתו ירום ויגדיל למעלה ראש:") | VERIFIED |
| Warka | Poland | 51.79 | 21.18 | ווארקא | ווארקע (Yid.) | Sefaria: Avodat Yisrael, Approbations 4 ("החסיד מפו׳ הצדיק מופת הדור וכו׳ האבד״ק ווארקא: הנה מהראוי להחזיק טובת") | VERIFIED |
| Warszawa | Poland | 52.23 | 21.01 | ווארשא (also ווארשוי (V)) | ווארשע (Yid.) | Sefaria: Otzar Midrashim, A Tale of Rabbi Yehoshua ben Levy, Introduction 1 ("עם אגדת בראשית דפוס לובלין תרמ״ג ודפוס ווארשא תרל״ו, וב בית המדרש ליעל") | REPORTED (imprint in modern bibliography) |
| Wieliczka | Poland | 49.99 | 20.07 | — | UNKNOWN | — | UNKNOWN |
| Wrocław | Poland | 51.11 | 17.03 | ברעסלא (also ברעסלויא (V), ברעסלוי (V)) | ברעסלוי (Yid.) | Sefaria: Noda BiYehudah II, Orach Chaim 94:3 ("לק"ק ברעסלא.") | VERIFIED |
| Włocławek | Poland | 52.65 | 19.05 | — | UNKNOWN | — | UNKNOWN |
| Włodawa | Poland | 51.55 | 23.55 | — | UNKNOWN | — | UNKNOWN |
| Zabrze | Poland | 50.30 | 18.78 | — | UNKNOWN | — | UNKNOWN |
| Zamość | Poland | 50.72 | 23.26 | זאמאשטש | זאמאשטש (Yid.) | Penn catalogue imprint: "זאמאשטש : [מוציא לאור לא ידוע], תרצ"ז-תרצ"ט." | REPORTED |
| Zgierz | Poland | 51.86 | 19.41 | — | UNKNOWN | — | UNKNOWN |
| Zielona Góra | Poland | 51.94 | 15.51 | — | UNKNOWN | — | UNKNOWN |
| Łańcut | Poland | 50.07 | 22.23 | לאנצהוט | לאנצהוט (Yid.) | Sefaria: Teshuvot Maharsham Volume III 36:1 ("מו"ה חיים ראובן וואגשאהל נ"י דומ"צ דק"ק לאנצהוט") | VERIFIED |
| Łomża | Poland | 53.18 | 22.08 | לאמזא | לאמזע (Yid.) | Sefaria: Melammed Lehoil Part II 148:4 (""ש קלוגער בספרו טוב טעם ודעת, והרב דק"ק לאמזא") | VERIFIED |
| Łódź | Poland | 51.75 | 19.47 | לאדז (also לאדזש (R)) | לאדזש (Yid.) | Sefaria: Teshuvot Maharsham Volume III 96:1 ("וכו' מו"ה משה פערלמוטטער נ"י מו"צ דק"ק לאדז בעהמ"ס חמדת משה.") | VERIFIED |
| Łęczyca | Poland | 52.06 | 19.20 | לונטשיץ | UNKNOWN | Sefaria: Teshuvot Rabbi Akiva Eiger 139:1 ("לידידי הגאב"ד דק"ק לונטשיץ הרב רבי חיים נ"י") | VERIFIED |
| Arad | Romania | 46.17 | 21.32 | — | UNKNOWN | — | UNKNOWN |
| Bacău | Romania | 46.58 | 26.92 | — | UNKNOWN | — | UNKNOWN |
| Baia Mare | Romania | 47.66 | 23.57 | — | UNKNOWN | — | UNKNOWN |
| Botoșani | Romania | 47.75 | 26.67 | באטשאן | באטאשאן (Yid.) | Penn catalogue imprint: "באטשאן : [דפוס יהושע מארקאוויטש], תרצ"ב 1932." | REPORTED |
| Brașov | Romania | 45.65 | 25.61 | — | UNKNOWN | — | UNKNOWN |
| Brăila | Romania | 45.27 | 27.96 | — | UNKNOWN | — | UNKNOWN |
| Bucharest | Romania | 44.41 | 26.10 | בוקארעשט (also בוקרשט (R)) | בוקארעשט (Yid.) | Sefaria: Ta'amei HaMinhagim 934:2 ("הרב הה"ג כש"ת מוהר"ר ישראל שליט"א אבד"ק בוקארעשט כתב לי ששמע מתלמידי מורו") | VERIFIED |
| Bârlad | Romania | 46.22 | 27.67 | — | UNKNOWN | — | UNKNOWN |
| Carei | Romania | 47.69 | 22.47 | קראלי (also קראלא (V)) | קראלי (Yid.) | Sefaria: Responsa Chatam Sofer, Collected Responsa 58:1 ("ים מופלאים במעשיהם ה' עליהם אקרו"ט דק"ק קראלי יע"א וגובה להם ה"ה הנגיד") | VERIFIED |
| Cluj-Napoca | Romania | 46.77 | 23.59 | קלויזענבורג (also קלויזנבורג (R)) | קלויזנבורג (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 3:93:1 ("ובקי המפורסים מוה' מרדכי בער נ"י אבד"ק קלויזענבורג:") | VERIFIED |
| Constanța | Romania | 44.18 | 28.65 | — | UNKNOWN | — | UNKNOWN |
| Craiova | Romania | 44.33 | 23.82 | — | UNKNOWN | — | UNKNOWN |
| Dej | Romania | 47.14 | 23.88 | דעעש | דעזש (Yid.) | Sefaria: Teshuvot Maharsham Volume I 108:4 ("א למיחש ללעז ובתשובות אבני צדק להגאבד"ק דעעש") | VERIFIED |
| Dorohoi | Romania | 47.96 | 26.40 | — | UNKNOWN | — | UNKNOWN |
| Focșani | Romania | 45.70 | 27.18 | פאקשאן | UNKNOWN | Sefaria: Teshuvot Maharsham Volume III 323:1 ("להרב מו"ה בן ציון מרגלית דומ"צ וק"ק פאקשאן") | VERIFIED |
| Fălticeni | Romania | 47.46 | 26.30 | — | UNKNOWN | — | UNKNOWN |
| Galați | Romania | 45.43 | 28.06 | גאלאץ | UNKNOWN | Sefaria: Teshuvot Maharsham Volume II 66:2 ("בר"מ בערזשאר בע"ג שנטבע בנהר דונא בעיר גאלאץ ביום ה' כ"ו סיון שנה העב") | VERIFIED |
| Gherla | Romania | 47.02 | 23.90 | — | UNKNOWN | — | UNKNOWN |
| Huși | Romania | 46.67 | 28.06 | — | UNKNOWN | — | UNKNOWN |
| Iași | Romania | 47.16 | 27.59 | יאס (also יאסי (V)) | יאס (Yid.) | Sefaria: Teshuvot Maharsham Volume I 209:1 (""ק וכו' מו"ה שלום גוטמאן נ"י דומו"ץ בק' יאס במאלדוי") | VERIFIED |
| Oradea | Romania | 47.07 | 21.92 | ווארדיין (also גראסווארדיין (V)) | גרויסווארדיין (Yid.) | Sefaria: Responsa Chatam Sofer, Even HaEzer 1:66:5 ("ב"ד ח"מ יום ב' ח' מרחשון תקפ"ד לפ"ק פה ווארדיין") | VERIFIED |
| Piatra Neamț | Romania | 46.93 | 26.37 | — | UNKNOWN | — | UNKNOWN |
| Ploiești | Romania | 44.94 | 26.02 | פלאיעשט | UNKNOWN | Sefaria: Responsa Chatam Sofer, Even HaEzer 2:145:2 ("ספרי' זא"ז מערל אחד שהרג יהודי אחד מק"ק פלאיעשט") | VERIFIED |
| Roman | Romania | 46.93 | 26.93 | — | ראמאן (Yid.) | — | REPORTED (Yiddish only) |
| Rădăuți | Romania | 47.84 | 25.92 | — | ראדעוויץ (Yid.) | — | REPORTED (Yiddish only) |
| Satu Mare | Romania | 47.79 | 22.89 | סאטמאר | סאטמאר (Yid.) | Sefaria: Teshuvot Maharsham Volume III 370:3 ("רו"מ בשם משיב כהלכה סי' ט"ז ובתשו' לק"ק סאטמאר") | VERIFIED |
| Sighetu Marmației | Romania | 47.93 | 23.89 | סיגעט (also סיגט (V)) | סיגעט (Yid.) | Sefaria: Sefer Puah, Fourth Volume; Gynecology, Diseases, Society and Research, Bibliography 616 ("הרב חיים צבי טייטלבוים, שו"ת עצי חיים, סיגעט תרצ"ט.") | REPORTED (imprint in modern bibliography) |
| Suceava | Romania | 47.65 | 26.26 | — | שאץ (Yid.) | — | REPORTED (Yiddish only) |
| Timișoara | Romania | 45.76 | 21.23 | טעמעשוואר | UNKNOWN | Sefaria: Responsa Chatam Sofer, Choshen Mishpat 191:1 ("המאה"ג כבוד מו"ה צבי הירש נ"י אב"ד דק"ק טעמעשוואר יע"א:") | VERIFIED |
| Târgu Mureș | Romania | 46.55 | 24.56 | — | UNKNOWN | — | UNKNOWN |
| Târgu Neamț | Romania | 47.20 | 26.36 | — | UNKNOWN | — | UNKNOWN |
| Vișeu de Sus | Romania | 47.71 | 24.43 | — | אויבער ווישעווע (Yid.) | not used: וויזניצא: the hits are Wiśnicz near Kraków ("סמוך לקראקא"; R. Aryeh Leibush of Wiśnicz) | REPORTED (Yiddish only) |
| Bryansk | Russia | 53.24 | 34.37 | — | UNKNOWN | — | UNKNOWN |
| Kaliningrad | Russia | 54.72 | 20.50 | קעניגסבערג | קאלינינגראד (Yid.) | Sefaria: Ohr Yisrael, Netivot Ohr 28 ("ספר לי איש אמונים מעיר קעניגסבערג. כי באורף האחרון מימי חי") | VERIFIED |
| Klintsy | Russia | 52.75 | 32.24 | — | UNKNOWN | — | UNKNOWN |
| Kursk | Russia | 51.74 | 36.19 | — | UNKNOWN | — | UNKNOWN |
| Lyubavichi | Russia | 54.83 | 30.96 | — | ליובאוויטש (Yid.) | — | REPORTED (Yiddish only) |
| Moskva | Russia | 55.75 | 37.62 | מאסקווא | מאסקווע (Yid.) | Sefaria: Teshuvot Meshiv Davar, Volume I 37:1 ("לבני היקר הרב וכו' ראב"ד בעיר מאסקווא.:") | VERIFIED |
| Nevel | Russia | 56.02 | 29.93 | — | UNKNOWN | — | UNKNOWN |
| Novozybkov | Russia | 52.53 | 31.93 | — | UNKNOWN | — | UNKNOWN |
| Rostov-on-Don | Russia | 47.22 | 39.71 | — | UNKNOWN | — | UNKNOWN |
| Sankt-Peterburg | Russia | 59.95 | 30.32 | פעטערסבורג (also פעטערבורג (R)) | פעטערבורג (Yid.) | Sefaria: Melammed Lehoil Part I 39:1 ("רץ מולדתו וגם הרב יצחק באלזער זצ"ל מעיר פעטערסבורג") | VERIFIED |
| Smolensk | Russia | 54.78 | 32.05 | — | סמאלענסק (Yid.) | — | REPORTED (Yiddish only) |
| Starodub | Russia | 52.58 | 32.77 | — | UNKNOWN | — | UNKNOWN |
| Taganrog | Russia | 47.23 | 38.90 | — | UNKNOWN | — | UNKNOWN |
| Velizh | Russia | 55.60 | 31.20 | — | UNKNOWN | — | UNKNOWN |
| Banská Bystrica | Slovakia | 48.74 | 19.15 | — | UNKNOWN | — | UNKNOWN |
| Bardejov | Slovakia | 49.29 | 21.28 | בארטפעלד | UNKNOWN | Penn catalogue imprint: "בארטפעלד : יוסף מאיר בלייער, תרס"ד." | REPORTED |
| Dunajská Streda | Slovakia | 48.00 | 17.61 | — | UNKNOWN | — | UNKNOWN |
| Galanta | Slovakia | 48.19 | 17.73 | גאלאנטא | גאלאנטא (Yid.) | Penn catalogue imprint: "גאלאנטא : דפוס ש"ז נייפעלד, תרצ"ג." | REPORTED |
| Humenné | Slovakia | 48.93 | 21.91 | הומנא | הומנא (Yid.) | Penn catalogue imprint: "הומנא : י.מ.ש"פ, תרצ"ה." | REPORTED |
| Huncovce | Slovakia | 49.12 | 20.38 | — | UNKNOWN | — | UNKNOWN |
| Komárno | Slovakia | 47.76 | 18.13 | — | UNKNOWN | — | UNKNOWN |
| Košice | Slovakia | 48.72 | 21.25 | קאשוי | קאשוי (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 1:2:1 ("עולם דור דור מוה' אברהם אבלי נ"י אבד"ק קאשוי והגליל:") | VERIFIED |
| Michalovce | Slovakia | 48.76 | 21.92 | — | UNKNOWN | — | UNKNOWN |
| Nitra | Slovakia | 48.31 | 18.09 | נייטרא | נייטרא (Yid.) | Sefaria: Em HaBanim Semecha, Second Introduction 3 ("סיד מו"ה שמואל דוד אונגאר שליט"א אבדק"ק נייטרא") | VERIFIED |
| Nové Zámky | Slovakia | 47.99 | 18.16 | — | נייהייזל (Yid.) | — | REPORTED (Yiddish only) |
| Prešov | Slovakia | 49.00 | 21.23 | — | UNKNOWN | — | UNKNOWN |
| Sereď | Slovakia | 48.28 | 17.73 | סערעד | UNKNOWN | Sefaria: Responsa Chatam Sofer, Even HaEzer 2:121:1 ("בני הדיין מצוין מו"ה יוסף נ"י דיין דק"ק סערעד יע"א:") | VERIFIED |
| Stropkov | Slovakia | 49.20 | 21.65 | — | סטראפקאוו (Yid.) | — | REPORTED (Yiddish only) |
| Trenčín | Slovakia | 48.89 | 18.04 | טרענטשין | UNKNOWN | Sefaria: Chatam Sofer on Torah, Vayechi 9 ("דיק מהור"ר יחזקאל סג"ל זצ"ל שהי' אבדק"ק טרענטשין") | VERIFIED |
| Trnava | Slovakia | 48.38 | 17.59 | טירנא | UNKNOWN | Sefaria: Em HaBanim Semecha, Tributes 19 ("יק זצ"ל תלמיד הגאון ר' יהודה אססאד זצ"ל מק"ק טירנא כ"ה שבט תרפ"ד.") | VERIFIED |
| Vrbové | Slovakia | 48.62 | 17.72 | ווערבוי | UNKNOWN | Sefaria: Responsa Chatam Sofer, Choshen Mishpat 124:1 ("פלג מה' חזקי' כ"ץ מורה צדק לקהל ה' גליל ווערבוי יע"א:") | VERIFIED |
| Žilina | Slovakia | 49.22 | 18.73 | — | UNKNOWN | — | UNKNOWN |
| Balta | Ukraine | 47.94 | 29.62 | באלטא | UNKNOWN | Sefaria: Ahavat Yehonatan, Introduction 4 ("מוה' מרדכי הכהן זצללה"ה שהי' אב"ד דק"ק באלטא ודק"ק חערסאן.") | VERIFIED |
| Bar | Ukraine | 49.08 | 27.68 | באר | באר (Yid.) | Sefaria: Toldot Yaakov Yosef, Shemot 14 ("עוד י"ל, על פי ששמעתי מהרב המגיד דק"ק באר ביאר ש"ס ד' מלכים מה שביקש זה לא ביקש זה וכו',") | VERIFIED |
| Belz | Ukraine | 50.38 | 24.02 | בעלז | בעלז (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 1:284:1 ("ף המופלג בתורה מוה' יחיאל נ"י מו"ץ דק"ק בעלז:") | VERIFIED |
| Berdiansk | Ukraine | 46.76 | 36.79 | — | UNKNOWN | — | UNKNOWN |
| Berdychiv | Ukraine | 49.89 | 28.60 | בארדיטשוב (also ברדיטשוב (V)) | בערדיטשעוו (Yid.) | Sefaria: Me'or Einayim, Approbations 7 ("הסכמת הרב הגאון החסיד המפורסם אב"ד דק"ק בארדיטשוב .") | VERIFIED |
| Berehove | Ukraine | 48.20 | 22.64 | בערעגסאס | בערעגסאז (Yid.) | Penn catalogue imprint: "בערעגסאס : דפוס ש"ש קליין, ה'ש'ם' ה'אחד' ה'ו'א א'ל'י'ע'ז" | REPORTED |
| Berestechko | Ukraine | 50.35 | 25.12 | — | ברעסטעטשקע (Yid.) | — | REPORTED (Yiddish only) |
| Berezhany | Ukraine | 49.45 | 24.94 | ברעזאן | ברעזשאן (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 3:30:1 ("לק' ברעזאן") | VERIFIED |
| Bila Tserkva | Ukraine | 49.80 | 30.12 | — | שווארצע טומאה (Yid.) | — | REPORTED (Yiddish only) |
| Bolekhiv | Ukraine | 49.07 | 23.85 | באלחוב | באלעכאוו (Yid.) | Sefaria: HaElef Lekha Shlomo, Omissions 37:1 ("להרב מו"ה ישראל גאטטליעב אב"ד באלחוב כעת בלבוב.") | VERIFIED |
| Bratslav | Ukraine | 48.81 | 28.94 | ברסלב | בראסלעוו (Yid.) | Sefaria: Chayei Moharan 91:1 ("כסלו תק"ע פה ברסלב חלום הייתי יושב בביתי ול") | VERIFIED |
| Brody | Ukraine | 50.08 | 25.15 | בראד | בראד (Yid.) | evidence-german-yiddish.md (151 Sefaria hits); בראדי in Pardes Yosef, Lev. 19:27 ("אבד"ק בראדי") | VERIFIED |
| Buchach | Ukraine | 49.06 | 25.39 | בוטשאטש | בוטשאטש (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 1:310:1 ("ג בתורה ויראה מוה' פייביל הלוי נ"י מו"ץ דק"ק בוטשאטש:") | VERIFIED |
| Cherkasy | Ukraine | 49.44 | 32.06 | טשערקאס | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura I 1:81:1 ("ב המופלג וכו' מוה' ברוך עסמאן ני' אבד"ק טשערקאס.") | VERIFIED |
| Chernihiv | Ukraine | 51.49 | 31.29 | — | UNKNOWN | — | UNKNOWN |
| Chernivtsi | Ukraine | 48.29 | 25.93 | טשערנאוויץ | טשערנאוויץ (Yid.) | Sefaria: Yakar MiPaz, Approbation 1 ("צחק שמשון הורוויץ מייזעלש נ"י אב"ד דק"ק טשערנאוויץ וכעת אב"ד דק"ק זאלקווא ו") | VERIFIED |
| Chornobyl | Ukraine | 51.27 | 30.22 | טשערנאביל | טשערנאבל (Yid.) | Sefaria: Ohev Yisrael, Approbations 1 ("עה״ח יום א׳ טו״ב סיון שנת תרכ״א לפ״ק פה טשערנאביל") | VERIFIED |
| Chortkiv | Ukraine | 49.02 | 25.80 | טשארטקוב | טשארטקאוו (Yid.) | Sefaria: Teshuvot Maharsham Volume II 248:1 ("תני הרב הגדול מו"ה יעקב לנדא נ"י דאבד"ק טשארטקוב:") | VERIFIED |
| Dnipro | Ukraine | 48.47 | 35.04 | — | דניפרא (Yid.) | — | REPORTED (Yiddish only) |
| Donetsk | Ukraine | 48.02 | 37.80 | — | דאנעצק (Yid.) | — | REPORTED (Yiddish only) |
| Drohobych | Ukraine | 49.35 | 23.50 | דראהביטש (also דראהאביטש (V)) | דראהביטש (Yid.) | Sefaria: HaElef Lekha Shlomo, Even HaEzer 213:1 ("רב החריף מו"ה מרדכי זאב בערמאן דיין בק' דראהביטש.") | VERIFIED |
| Dubno | Ukraine | 50.39 | 25.73 | דובנא | דובנא (Yid.) | Sefaria: Shoel uMeshiv Mahadura IV 2:198:2 ("לך מה שראיתי קושיא נדפסה בסוף ספר תומים דפוס דובנא הקשה שם על דברת התוס' בשבועות דף ל"ג ע"ב ד"ה") | VERIFIED |
| Hannopil | Ukraine | 50.45 | 26.90 | האניפאלי | UNKNOWN | Sefaria: Yosher Divrei Emet, First Kuntres 14:1 ("הצדיק המפורסם מו"ה זוסיא נ"י שהוא בק"ק האניפאלי") | VERIFIED |
| Hlukhiv | Ukraine | 51.68 | 33.91 | — | UNKNOWN | — | UNKNOWN |
| Husiatyn | Ukraine | 49.07 | 26.19 | הוסיאטין | הוסיאטין (Yid.) | Sefaria: Teshuvot Maharsham Volume III 305:1 ("להרב מו"ה משה הורוויץ נ"י אבד"ק הוסיאטין") | VERIFIED |
| Ivano-Frankivsk | Ukraine | 48.92 | 24.71 | סטאניסלאב (also סטאניסלאוו (V)) | סטאניסלאוו (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 1:143:1 ("ד מוה' מרדכי נ"י אבד"ק פיסטין וכעת בק"ק סטאניסלאב:") | VERIFIED |
| Iziaslav | Ukraine | 50.12 | 26.80 | זאסלאב | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura I 1:6:1 ("ומצוחצח מ' ארי' לייבש באלכובר ני' אבד"ק זאסלאב יצ"ו") | VERIFIED |
| Kamianets-Podilskyi | Ukraine | 48.68 | 26.58 | — | קאמעניץ (Yid.) | — | REPORTED (Yiddish only) |
| Kerch | Ukraine | 45.34 | 36.47 | — | UNKNOWN | — | UNKNOWN |
| Kharkiv | Ukraine | 49.99 | 36.23 | כארקאוו | כארקאוו (Yid.) | Penn catalogue imprint: "כארקאוו : מעלוכע־פארלאג, 1932." | REPORTED |
| Kherson | Ukraine | 46.64 | 32.62 | חערסאן | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura III 1:61:1 ("הרב המופלג וכו' מוהר"ר יצחק יהודה אבד"ק חערסאן נ"י:") | VERIFIED |
| Khmelnytskyi | Ukraine | 49.42 | 27.00 | — | UNKNOWN | — | UNKNOWN |
| Khust | Ukraine | 48.18 | 23.30 | חוסט | חוסט (Yid.) | Sefaria: Teshuvot Maharsham Volume II 150:3 ("אך שבעיר הנ"ל אין מסדרין גיטין ובא לעיר חוסט") | VERIFIED |
| Kolomyia | Ukraine | 48.52 | 25.03 | קאלאמייא | קאלאמיי (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 1:3:1 ("ורה מוהר"ר זכרי' מענדיל דיין ומו"ץ דק"ק קאלאמייא:") | VERIFIED |
| Korets | Ukraine | 50.62 | 27.17 | קאריץ (also קארעץ (V)) | קאריץ (Yid.) | Sefaria: Otzar Midrashim, R' Nechunya Ben HaKanah 3 ("לו מדרש נחום בן הקנה , נדפס עם ס׳ הקנה קאריץ תקמ"ד.") | REPORTED (imprint in modern bibliography) |
| Kosiv | Ukraine | 48.31 | 25.10 | קאסוב | קאסאוו (Yid.) | Sefaria: Teshuvot Maharsham Volume I 225:1 ("מו"ה יוסף יהודה שטראזבערג נ"י מו"ץ דק' קאסוב.") | VERIFIED |
| Kovel | Ukraine | 51.22 | 24.72 | קאוולא | קאוולע (Yid.) | Sefaria: Teshuvot Maharsham Volume III 246:5 ("ים למי שלא ראה את החודש וכו' ובפרט בעיר קאוולא … נשואין ועוד דבלא התרו") | VERIFIED |
| Kremenchuk | Ukraine | 49.06 | 33.40 | — | UNKNOWN | — | UNKNOWN |
| Kremenets | Ukraine | 50.11 | 25.73 | — | קרעמעניץ (Yid.) | — | REPORTED (Yiddish only) |
| Kropyvnytskyi | Ukraine | 48.51 | 32.27 | יעליסאוועטגראד | יעליסאוועטגראד (Yid.) | Sefaria: Teshuvot Meshiv Davar, Volume I 17:1 ("לאנשי עדת יעליסאוועטגראד יע"א בענין תפלות שבני אש") | VERIFIED |
| Kryvyi Rih | Ukraine | 47.91 | 33.39 | — | קריוואראג (Yid.) | — | REPORTED (Yiddish only) |
| Kuty | Ukraine | 48.26 | 25.17 | קיטוב | UNKNOWN | Sefaria: Teshuvot Maharsham Volume III 47:3 ("בד אם גירש בע"כ הגט כשר ובתשו' להרב דק' קיטוב") | VERIFIED |
| Kyiv | Ukraine | 50.45 | 30.52 | קיוב (also קיעוו (R)) | קיעוו (Yid.) | Penn catalogue imprint: "קיוב : [חמו״ל], [1911] 672." | REPORTED |
| Luhansk | Ukraine | 48.57 | 39.30 | — | UNKNOWN | — | UNKNOWN |
| Lutsk | Ukraine | 50.75 | 25.32 | לוצק | לוצק (Yid.) | Sefaria: Beit Yisrael (Ruzhin), His Imprisonment 10 ("דק' מריסק זלל"ה שנתראה פ"א עם מרן בעיר לוצק וסיפר לו מרן איך שהתפילי") | VERIFIED |
| Lviv | Ukraine | 49.84 | 24.03 | לבוב | לעמבערג (Yid.) | title page *Ḥeshbon ha-Nefesh* (Wikisource): "דק"ק לבוב"; also לעמבערג, title page *Toledot Adam* (Lemberg 1912) and Binyan Ṣiyyon 141 | VERIFIED |
| Mariupol | Ukraine | 47.13 | 37.56 | — | מאריופאל (Yid.) | — | REPORTED (Yiddish only) |
| Medzhybizh | Ukraine | 49.44 | 27.39 | מעזיבוז (also מעזבוז (V)) | מעזשביזש (Yid.) | Sefaria: Ba'al Shem Tov, Yitro 26:17 ("הודו ממוהר"ר ישראל בעל השם זצוק"ל דק"ק מעזיבוז: .") | VERIFIED |
| Melitopol | Ukraine | 46.85 | 35.37 | — | UNKNOWN | — | UNKNOWN |
| Mohyliv-Podilskyi | Ukraine | 48.45 | 27.78 | — | UNKNOWN | not used: מאהליב: the "דפוס מאהליב" hit cannot be assigned to Mohyliv-Podilskyi rather than Mahilyow | UNKNOWN |
| Mukachevo | Ukraine | 48.44 | 22.71 | מונקאטש | מונקאטש (Yid.) | Sefaria: Responsa Chatam Sofer, Orach Chayim 12:1 ("ש"ת מו"ה צבי אביגדור נ"י אב"ד ור"מ דק"ק מונקאטש יע"א וחד דעימי' האי מרבנ") | VERIFIED |
| Mykolaiv | Ukraine | 46.98 | 32.00 | — | מיקאלייעוו (Yid.) | — | REPORTED (Yiddish only) |
| Nemyriv | Ukraine | 48.98 | 28.84 | נעמירוב | UNKNOWN | Sefaria: Teshuvot Bayit Chadash, HaYeshanot 73:1 ("קינדר נעשה היום ו' תמוז שע"ד לפ"ק בק"ק נעמירוב") | VERIFIED |
| Nizhyn | Ukraine | 51.05 | 31.88 | — | UNKNOWN | — | UNKNOWN |
| Odesa | Ukraine | 46.48 | 30.73 | אדעס (also אדעסא (V)) | אדעס (Yid.) | Sefaria: Shoel uMeshiv Mahadura I 1:184:3 ("הלז בשם הרב הגאון מו"ה ראובן ז"ל אבד"ק אדעס") | VERIFIED |
| Ostroh | Ukraine | 50.33 | 26.52 | אוסטרהא (also אוסטרא (V)) | UNKNOWN | Sefaria: Me'or Einayim, Approbations 11 ("איש אלקי קדוש כמהור"ר אשר צבי מ"מ דק"ק אוסטרהא") | VERIFIED |
| Pereiaslav | Ukraine | 50.06 | 31.45 | — | UNKNOWN | — | UNKNOWN |
| Polonne | Ukraine | 50.12 | 27.52 | פולנאה | פאלאנע (Yid.) | Sefaria: Degel Machaneh Ephraim, Vayikra 9 ("בתשובה עכ"ד והוא מבואר בכתבי הכה"ג דק"ק פולנאה") | VERIFIED |
| Poltava | Ukraine | 49.59 | 34.55 | פאלטאווא | פאלטאווע (Yid.) | Penn catalogue imprint: "פאלטאווא : דפוס א"ע ראבינאוויץ, תרע"ג." | REPORTED |
| Radomyshl | Ukraine | 50.49 | 29.23 | — | UNKNOWN | — | UNKNOWN |
| Rava-Ruska | Ukraine | 50.25 | 23.62 | ראווא | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura I 2:75:2 ("א"ז הגאון מוהר"ר נפתלי הירץ זלה"ה אבד"ק ראווא שהביא ראיה לדעת הרמב"ם ז") | VERIFIED |
| Rivne | Ukraine | 50.62 | 26.25 | ראווני (also ראוונא (V)) | ראוונע (Yid.) | Sefaria: Noam Elimelekh, Sefer Bamidbar, Sh'lach 12:1 ("ב הגאון הקדוש המנוח מורינו דוב בער דק"ק ראווני") | VERIFIED |
| Ruzhyn | Ukraine | 49.72 | 29.22 | רוזין | רוזשין (Yid.) | Sefaria: Weekday Siddur Chabad, Mishnayot for a Mourner 2 ("כך שמעתי בשם הרה״ק מק״ק רוזין ז״ל זי״ע. ומי שיש לו פנא") | REPORTED (imprint in modern bibliography) |
| Sambir | Ukraine | 49.52 | 23.20 | סאמבור | סאמבאר (Yid.) | Sefaria: Teshuvot Maharsham Volume III 113:7 ("והנה לפמש"ל י"ל נ"מ בזה ואני בתשו' לק' סאמבור [] הארכתי בזה והבאתי מהמ") | VERIFIED |
| Sataniv | Ukraine | 49.25 | 26.27 | סאטנוב | UNKNOWN | Sefaria: Shoel uMeshiv Mahadura II 2:63:7 ("ום והביא בשם הגאון מו"ה סענדר ז"ל אבד"ק סאטנוב שכתב שבהגיע השטר לידו נק") | VERIFIED |
| Simferopol | Ukraine | 44.95 | 34.10 | — | UNKNOWN | — | UNKNOWN |
| Skvyra | Ukraine | 49.73 | 29.68 | סקווירא | סקווירא (Yid.) | Sefaria: Midrash Pinchas 6:36 ("נו וסיפר ר' שמחה נרו שהיה עמו והי' בעיר סקווירא") | VERIFIED |
| Slavuta | Ukraine | 50.30 | 26.87 | סלאוויטא | סלאוויטא (Yid.) | Sefaria: Me'or Einayim, Approbations 3 ("אנכי בדרך נחני ה' פה ק"ק סלאוויטא ומצאתי בכאן מכתבי הקודש") | VERIFIED |
| Sokal | Ukraine | 50.48 | 24.28 | סאקאל | סקאהל (Yid.) | Sefaria: Shoel uMeshiv Mahadura I 1:215:1 ("עלעגראף מהרב המאוה"ג מ' זונדל נ"י אבד"ק סאקאל שנמצא בשם בטחול של שור ב") | VERIFIED |
| Starokostiantyniv | Ukraine | 49.76 | 27.22 | קאנסטאנטין | UNKNOWN | Sefaria: Shivchei HaBesht 93:1 ("על הרב על הכבוד שעושין לו כי שמעתי בק"ק קאנסטאנטין ישן הלכו כל העיר לקראתו") | VERIFIED |
| Stryi | Ukraine | 49.25 | 23.85 | סטרי | סטרי (Yid.) | Penn catalogue imprint: "סטרי : דפוס י. מיזלש, תרצ"ג." | REPORTED |
| Sumy | Ukraine | 50.91 | 34.80 | — | UNKNOWN | — | UNKNOWN |
| Talne | Ukraine | 48.89 | 30.70 | טאלנא | טאלנא (Yid.) | Sefaria: Teshuvot Maharsham Volume II 60:1 ("וכו' מו"ה נפתלי הירץ הכהן נ"י מו"ץ דק' טאלנא. ברוסיא:") | VERIFIED |
| Ternopil | Ukraine | 49.57 | 25.60 | טארנאפאל | טארנאפאל (Yid.) | Sefaria: Responsa Chatam Sofer, Orach Chayim 136:1 ("וץ המופלא כמהו' יוסף יואל נ"י דיין בק"ק טארנאפאל:") | VERIFIED |
| Tiachiv | Ukraine | 48.01 | 23.57 | — | טעטש (Yid.) | — | REPORTED (Yiddish only) |
| Tulchyn | Ukraine | 48.67 | 28.85 | טולטשין | UNKNOWN | Sefaria: Shivchei HaBesht 96:8 (""א שבת אצל הרב דקהלתינו ר' דוד מ"מ דק"ק טולטשין שהיה נכד של הצדיק ר' דוד") | VERIFIED |
| Turiisk | Ukraine | 51.08 | 24.53 | טריסק | UNKNOWN | Sefaria: Teshuvot Maharsham Volume II 148:1 ("ב הה"ג וכו' מו"ה יהושע גלאזער נ"י אבד"ק טריסק ברוסיא:") | VERIFIED |
| Uman | Ukraine | 48.75 | 30.22 | אומאן | אומאן (Yid.) | Sefaria: Me'or Einayim, Approbations 2 ("סלאויטא ובק"ק שופטיווקא ובק"ק באר ובק"ק אומאן והגליל אשר לע"ע מקום ישי") | VERIFIED |
| Uzhhorod | Ukraine | 48.62 | 22.30 | אונגוואר | אונגוואר (Yid.) | Sefaria: Responsa Chatam Sofer, Yoreh De'ah 356:2 ("ני תלמידי הרב הגאון מוה' מאיר אב"ד דק"ק אונגוואר נ"י בתפלת רב טביומי המוז") | VERIFIED |
| Vinnytsia | Ukraine | 49.24 | 28.47 | — | וויניצע (Yid.) | not used: וויניצא: the hits with "דפוס וויניצא" are Venice (e.g. "שנת רפ"ב"); one modern hit (Mishpeṭe ʿUzziel V, EH 22) may be Vinnytsia | REPORTED (Yiddish only) |
| Volodymyr | Ukraine | 50.85 | 24.32 | — | לודמיר (Yid.) | — | REPORTED (Yiddish only) |
| Vynohradiv | Ukraine | 48.14 | 23.03 | — | סעליש (Yid.) | — | REPORTED (Yiddish only) |
| Vyzhnytsia | Ukraine | 48.25 | 25.19 | — | וויזשניץ (Yid.) | — | REPORTED (Yiddish only) |
| Yavoriv | Ukraine | 49.95 | 23.39 | — | יאוואראוו (Yid.) | — | REPORTED (Yiddish only) |
| Zaporizhzhia | Ukraine | 47.85 | 35.12 | — | זאפאראזשיע (Yid.) | — | REPORTED (Yiddish only) |
| Zbarazh | Ukraine | 49.66 | 25.78 | זבאריז | זבאראזש (Yid.) | Sefaria: Shoel uMeshiv Mahadura III 1:221:1 ("היחס והמעלה מוה' אברהם תאומים נ"י אבד"ק זבאריז:") | VERIFIED |
| Zhovkva | Ukraine | 50.07 | 23.97 | זאלקווא | זשאלקווע (Yid.) | Sefaria: Otzar Midrashim, Midrash on the Ten Commandments, Introduction 3 ("רונא ת״ז, לובלין עם ס׳ ארחות חיים של״ב, זאלקווא תק"ע, זיטאמיר תר״י, ועם") | REPORTED (imprint in modern bibliography) |
| Zhytomyr | Ukraine | 50.25 | 28.66 | זיטאמיר | זשיטאמיר (Yid.) | Sefaria: Otzar Midrashim, Midrash on the Ten Commandments, Introduction 3 ("ין עם ס׳ ארחות חיים של״ב, זאלקווא תק"ע, זיטאמיר תר״י, ועם צוואות ר״א הגד") | REPORTED (imprint in modern bibliography) |
| Zolochiv | Ukraine | 49.81 | 24.90 | זלאטשוב | UNKNOWN | Sefaria: Ohev Yisrael, Selections, Vayetzei 1 ("נראה לפרש ע"פ מה ששמעתי מן המ"מ דק"ק זלאטשוב פי' הפסוק ויתן לו אברהם") | VERIFIED |

## Rabbinic form against Yiddish form

Where both are known they usually differ in the ways described in `evidence-german-yiddish.md`: the rabbinic layer ends a vowel-final name in **א** where Yiddish has **ע** (ווילנא / ווילנע, ווארשא / ווארשע, קאוונא / קאוונע, טארנא / טארנע, ראוונא / ראוונע, קאוולא / קאוולע, ריגא / ריגע, ליבויא / ליבאווע); it writes Polish *ż* as **ז** where Yiddish has **זש** (זיטאמיר / זשיטאמיר, וואלאזין / וואלאזשין, ליזענסק / ליזשענסק, קאזניץ / קאזשניץ, מעזיבוז / מעזשביזש, זאלקווא / זשאלקווע, ברעזאן / ברעזשאן, טעלז / טעלזש); and it writes final *-ów* as **-וב** where Yiddish has **-וו** (בארדיטשוב / בערדיטשעוו, פיעטרקוב / פיעטרקאוו, דינוב / דינאוו, רימאנוב / רימאנאוו, פינטשוב / פינטשאוו, טשארטקוב / טשארטקאוו, סאכאטשוב / סאכאטשאוו). The table gives both forms side by side, so these pairs can be read off it.

Separate Jewish names, unrelated or only distantly related to the official name, that an app would have to store one by one: הוראדנא (Hrodna; Yiddish גראדנע), בריסק (Brest), לבוב and לעמבערג (Lviv), קאוונא and קובנא (Kaunas), ווילנא (Vilnius), צאנז and סאנץ (Nowy Sącz), גור (Góra Kalwaria), דזיקוב (Tarnobrzeg), אפטא (Opatów), ליסא (Leszno), דיהרנפורט (Brzeg Dolny), צוזמיר (Sandomierz), לינסק (Lesko), אושפיצין (Oświęcim), לונטשיץ (Łęczyca), ריישא (Rzeszów), טהארן (Toruń), ווילקאמיר (Ukmergė, Yiddish only), מעמעל (Klaipėda), דווינסק (Daugavpils; Yiddish Wikipedia has the German דענענבורג), ליבויא (Liepāja), אדעס / אדעסא (Odesa), יעליסאוועטגראד (Kropyvnytskyi), סטאניסלאב (Ivano-Frankivsk), קאנסטאנטין (Starokostiantyniv, "קאנסטאנטין ישן"), זאסלאב (Iziaslav), טריסק (Turiisk), קיטוב (Kuty), האניפאלי (Hannopil), אונגוואר (Uzhhorod), מונקאטש (Mukachevo), טשערנאוויץ (Chernivtsi), סעליש and טעטש (Vynohradiv, Tiachiv; Yiddish only), אובן (Buda, i.e. Budapest), ראב (Győr), ערלוי (Eger), אוהעל (Sátoraljaújhely), קליינווארדיין (Kisvárda), יאס (Iași), סאטמאר (Satu Mare), ווארדיין / גראסווארדיין (Oradea), קלויזענבורג (Cluj-Napoca), טעמעשוואר (Timișoara), קראלי / קראלא (Carei), סיגעט (Sighetu Marmației), דעעש (Dej), ניקלשבורג (Mikulov), טריטש / טריביטש (Třebíč), לייפניק (Lipník), קרעמזיר (Kroměříž), ברין (Brno), קאשוי (Košice), נייטרא (Nitra), טירנא (Trnava), ווערבוי (Vrbové), קעניגסבערג (Kaliningrad), פעטערסבורג (Saint Petersburg).

## Doubtful cases

- **Polotsk / Płock.** פלאצק on Sefaria is Płock (*Meshivath Nefesh* by the rabbi of Płock). For Polotsk no rabbinic form was found; Yiddish Wikipedia has פאלאצק. The two towns need different forms in the app.
- **Mahilyow (Belarus) / Mohyliv-Podilskyi (Ukraine).** Both are מאהליב. Meshiv Davar II 60 ("מ"ץ דק"ק מאהליב", to the Netziv's uncle) is probably Mahilyow; Shivḥe ha-Besht 159 ("בק"ק מאהליב") is probably Mohyliv-Podilskyi. I gave מאהליב to Mahilyow and left Mohyliv-Podilskyi UNKNOWN; the owner may want a qualifier for one of them. I did not find which qualifier the sources use.
- **Kielce.** The only hit (Noda bi-Yehuda II, OḤ 51, to "R. Elʿazar, av bet din of קעלץ") is eighteenth-century, when Jews could not settle in Kielce. It may be another town. Left as Yiddish only (קעלץ).
- **Vinnytsia.** "דפוס וויניצא" in the commentaries on the Mishne Tora is Venice (1522–24 edition). One hit in Mishpeṭe ʿUzziel V, EH 22 ("לפנים רב בעיר וויניצא") may be Vinnytsia. Left as Yiddish only (וויניצע).
- **Vișeu de Sus.** וויזניצא on Sefaria is Wiśnicz near Kraków, not Vișeu. Vyzhnytsia (Wiżnitz, Bukovina) is a third town: no rabbinic form found, Yiddish וויזשניץ.
- **Budapest.** אובן is Buda (Ofen), VERIFIED in Ḥakham Ṣevi 95 ("בודון דמתקריא אובן"). Pest is פעסט (Mishpeṭe ʿUzziel VIII, OḤ 60: "ראב"ד דק"ק פעסט"; and Penn imprints). The united city (from 1873) appears as בודאפעסט only in catalogue imprints. Which of the three the app should show for today's Budapest is a decision for the owner.
- **Common words.** For גור, מיר, באר, מאד, ראב, טירנא, דובנא, קאפיל, and בוטשאטש a bare count means nothing; they were accepted only from phrase hits ("דק"ק גור", "אבד"ק מיר", "דק"ק באר", "אבד"ק מאד", "דק"ק ראב", "מק"ק טירנא", "דפוס דובנא", "אבד"ק קאפיל", "מו"ץ דק"ק בוטשאטש"). The Mir hit cited in the table (Shaʿare Torath Ereṣ Yisraʾel) is a 20th-century edition; Maharsham II 65 ("אבד"ק מיר בארץ ליטא") is an older witness. אלכסנדר (Aleksandrów Łódzki), באבוב (Bobowa), לעלוב (Lelów), לידא (Lida), and ליובאוויטש (Lyubavichi) produced no usable phrase hit, so only their Yiddish form is given, though the Hebrew spelling is very probably the same; that is INFERRED and is not in the table.
- **Spelling variants where both are VERIFIED** (the table puts the better-attested one first): ווילנא / וילנא; קאוונא / קובנא (Ḥatam Sofer writes קובנא); ברעסלא / ברעסלויא / ברעסלוי; ווארשא / ווארשוי; צאנז / סאנץ; פרעמישלא / פשעמישל; שינאווא / שינאווע; פשעווארסק / פרשעווארסק; קראטשין / קראטאשין; סאכאטשוב / סאכטשאב; וולאזין / וואלאזין; שקלאוו / שקלאב; אדעס / אדעסא; ראווני / ראוונא; סטאניסלאב / סטאניסלאוו; דראהביטש / דראהאביטש; בארדיטשוב / ברדיטשוב; אוסטרהא / אוסטרא; קאריץ / קארעץ; מעזיבוז / מעזבוז; יאס / יאסי; ווארדיין / גראסווארדיין; קראלי / קראלא; סיגעט / סיגט; ניקלשבורג / ניקלשפורג; טריטש / טריביטש; מאקאווא / מאקא.
- **Modern sources counted as rabbinic.** Some VERIFIED citations come from 20th-century rabbinic works (Pardes Yosef, Ṭaʿame ha-Minhagim, Mishpeṭe ʿUzziel, Torah Temima). They are rabbinic texts, but later than the classic title-page layer. Citations from bibliographies (Sefer Puah, Oṣar Midrashim, Tosefta ki-Fshuṭah) are labelled "REPORTED (imprint in modern bibliography)"; they quote imprints, usually 20th-century ones (קישינוב, סיגעט, לוצין, דווינסק, בילגורייא, מישקולץ).
- **Yiddish Wikipedia forms that are not traditional.** קאלינינגראד (Kaliningrad), דניפרא (Dnipro), דאנעצק (Donetsk), זאפאראזשיע (Zaporizhzhia), and טאלין (Tallinn) are modern official names in Yiddish spelling. The older Jewish names (קעניגסבערג, VERIFIED; יעקאטערינאסלאוו, אלכסנדרובסק, יוזאווקא, רעוואל: candidates with no hits) were not found in the sources I could search.
- **Other notes.** Kėdainiai: קידאן is VERIFIED; the expected קיידאן was not found. Toruń: טהארן (Binyan Ṣiyyon 1, to R. Ṣevi Hirsch Kalischer). Lesko: לינסק. Sátoraljaújhely: Ḥatam Sofer writes אוהעל; Yiddish Wikipedia has איהעל. Arad: Sefaria has one hit for "בק"ק אראד" (Ḥatam Sofer, Collected Responsa 93), but the excerpt did not show the phrase, so the town is left UNKNOWN.

## Abbreviations

No town in this list has a standard abbreviation of its own name comparable to פפד"מ or אה"ו. The abbreviations seen are the ones around the name, which the app should not copy: ק"ק / דק"ק / בק"ק / מק"ק (קהלה קדושה), אבד"ק / אב"ד דק"ק (rabbi of the community), מו"ץ דק' (rabbinic judge), פ"ק / פה"ק (here, the holy community), יע"א / יצ"ו (blessings after the name). Qualifiers that belong to the name appear in the texts: בריסק דליטא, פינסק דליטא, זאגער ישן, קאנסטאנטין ישן, גלוגא רבתי, "נאווי מינסק" (Nowy Mińsk, a different town from Minsk). They distinguish homonyms and could serve the app where two towns share a name.

## Could not fetch or not consulted

- **hebrewbooks.org**: HTTP 403 from both curl and WebFetch, so no title pages were seen there.
- **English Wikipedia and Wikidata APIs**: HTTP 429 (rate limit). Coordinates and Yiddish titles were taken from the Wikidata SPARQL endpoint instead.
- **Hebrew Wikisource**: not used this time (rate-limited in the earlier sessions). The title-page checks for Vilnius, Warsaw, Kraków, Lviv, and Grodno come from `evidence-german-yiddish.md`.
- **National Library of Israel catalogue**: not tried (it returned 403 before). The Penn catalogue was used in its place.
- **JewishGen Communities Database, YIVO Encyclopedia, Pinkas ha-Kehillot**: not consulted for lack of time. JewishGen gives Yiddish names in Latin letters only, so it would not have supplied Hebrew-script forms.
- **Russia**: only 14 towns. A full list of Russian towns over 50,000 (about 170) was out of reach and is mostly outside the area of traditional Jewish settlement.

Working files (Sefaria and Penn results, Wikidata output, the scripts) are in the session scratchpad and were not added to the repository.
