/* Interfaccia — Zemannim */
(function () {
'use strict';
const E = window.MTEngine;

// ---------- Impostazioni (salvate sul dispositivo, se possibile) ----------
const DEFAULTS = {
  lang: 'it', tzeth: 20, tequfa: 9, dawn: true, israel: 'auto', walled: 'auto', prudent: true,
  translit: 'digraph', // כ e ת refuyyoṯ: 'digraph' = kh, th; 'line' = ḵ, ṯ
  beth: 'line',        // ב refuyyà: 'line' = ḇ; 'v' = v
  netLookup: false,    // nome del luogo cercato in rete (OpenStreetMap); spento in partenza
  autoLoc: true,       // posizione automatica: il luogo segue il telefono (oltre 5 km di spostamento)
  away: false,         // con la posizione automatica: si sta guardando un altro luogo, scelto con la ricerca
  place: { name: 'Ferrara', lat: 44.8378, lon: 11.6198, tz: 'Europe/Rome', cc: 'IT', sub: 'FE',
           names: { it: 'Ferrara', en: 'Ferrara', fr: 'Ferrare', he: 'פירארה' } },
  saved: [],           // «I miei luoghi», salvati con la stella (scelta del curatore, 2026-11-11)
  recent: []           // gli ultimi 5 luoghi scelti con la ricerca
};
let S = Object.assign({}, DEFAULTS);
try { const raw = localStorage.getItem('mt-zemanim'); if (raw) S = Object.assign({}, DEFAULTS, JSON.parse(raw)); } catch (e) {}
function save() { try { localStorage.setItem('mt-zemanim', JSON.stringify(S)); } catch (e) {} }

// ---------- Testi ----------
const T = {
  it: {
    tammuzNote: 'Rito italiano (Maḥazor di Bologna): si legge di seguito, senza saltare. Alcuni leggono come negli altri digiuni (<span lang="he">ויחל משה</span>, poi <span lang="he">פסל לך</span>), secondo il MT', fastOut: 'Fine del digiuno', reading: 'Lettura della Torà', both: 'Shaḥriṯ e Minḥà', av9In: 'Inizio di Tishʿà be-Aḇ',
    hamEat: 'Termine per mangiare ḥameṣ', hamEatShabb: 'Termine per mangiare ḥameṣ; ciò che avanza si annulla e si copre', hamTora: 'Da qui il ḥameṣ è vietato dalla Torà',
    hamSearch: 'Stasera, all’inizio della notte: ricerca del ḥameṣ', hamFriday: 'Prima dello Shabbaṯ si elimina il ḥameṣ, tranne quello da mangiare domani fino alle 4 ore',
    cdIn: 'tra', hanLight: 'Accensione dei lumi di Ḥanukkà', hanFriday: 'I lumi di Ḥanukkà si accendono prima',
    neila: 'Neʿilà si conclude poco prima',moonLastEve: 'Stasera: ultima sera per la benedizione della luna (<span lang="he">מחדש חדשים</span>); si può recitare fino al tramonto di domani', moonLastDay: 'Benedizione della luna (<span lang="he">מחדש חדשים</span>): ultimo giorno, fino al tramonto',
    moonFirst: 'Da stasera: benedizione della luna (<span lang="he">מחדש חדשים</span>), da recitare appena si vede la luna nuova',
    omer: (n, w, d) => `ʿÒmer: stasera si conta il ${n}° giorno` + (w ? ` (${w} settiman${w > 1 ? 'e' : 'a'}${d ? ` e ${d} giorn${d > 1 ? 'i' : 'o'}` : ''})` : ''),
    title: 'Zemannim', subtitle: 'Orari halakhici secondo il Mishné Torà', today: 'Oggi', week: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
    months: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    afterSunset: 'Dopo il tramonto', parasha: 'Parashà della settimana', festShabbath: 'Sabato festivo: lettura della festa',
    na: 'Nefilaṯ appàyim', shahrith: 'Shaḥriṯ', minha: 'Minḥà', arvith: 'ʿArḇiṯ', yes: 'sì', no: 'no',
    ask: 'Richiesta della pioggia',
    askTonight: 'si comincia stasera a ʿArḇiṯ', askFirst: 'si è cominciato ieri sera a ʿArḇiṯ', askLast: 'per l’ultima volta a Minḥà',
    scTonight: 'Da ʿArḇiṯ di stasera', scUntilMinha: 'Fino a Minḥà', scUntilNeila: 'Fino a Neʿilà', ifFast: 'Chi digiuna', b3: '3ª benedizione', b11: '11ª benedizione', aboda: 'nella ʿAḇoḏà', hodaya: 'nella Hoḏayà',
    anenu: 'in Shomeaʿ tefillà; l’officiante ne fa una benedizione a sé, fra Goʾel e Rofé', boneh: 'in Boné Yerushalàyim', hour: 'Ora stagionale', settings: 'Impostazioni', notes: 'Note sulle scelte',
    close: 'Chiudi', place: 'Luogo', useGps: 'Usa la mia posizione', gpsFail: 'Posizione non disponibile in questa pagina: cerca un luogo.',
    gpsWait: 'Ricerca della posizione…', manual: 'Coordinate', apply: 'Applica', tzethLbl: 'Ṣeṯ ha-koḵaḇim (fine dello Shabbaṯ, delle feste e dei digiuni)',
    tequfaLbl: 'Tequfà per la richiesta della pioggia (diaspora)', dawnLbl: 'Mostra ʿaloṯ ha-shàḥar', israelLbl: 'Terra d’Israele',
    walledLbl: 'Città murata (Purim il 15)', auto: 'automatico', on: 'sì', off: 'no', prudentLbl: 'Arrotondamento prudente',
    langLbl: 'Lingua', zone: 'Orari nel fuso orario', shabbIn: 'Inizio dello Shabbaṯ', shabbOut: 'Fine dello Shabbaṯ',
    ytIn: 'Inizio della festa', ytOut: 'Fine della festa', source: 'Fonte', polar: 'In questo luogo e in questa data il sole non sorge o non tramonta.',
    firstMention: 'si comincia a dirlo a Musaf', lastMention: 'si dice fino a Shaḥriṯ; da Musaf non si dice più', israelOn: 'Israele', diaspora: 'diaspora', inIsrael: 'In Israele', naAll: 'in ogni preghiera', naKippurIt: 'secondo il rito italiano solo a Neʿilà', naVar: { kippurEve: 'alcuni la omettono a Minḥà', hanEve: 'alcuni la omettono a Minḥà', rhEve: 'variante: lo Shibbolé ha-Lèqeṭ la omette a Minḥà', av9: 'secondo il rito italiano solo a Minḥà' }, arvithKippur: 'ʿArḇiṯ (sera di Kippur)', inDiaspora: 'Nella diaspora', festReading: 'lettura della festa',
    splitPesah: 'Nella diaspora questo sabato è l’ultimo giorno di Pèsaḥ, con la lettura della festa; in Israele si legge la parashà seguente.',
    splitShavuoth: 'Nella diaspora questo sabato è il secondo giorno di Shaḇuʿoṯ, con la lettura della festa; in Israele si legge la parashà seguente.',
    rejoin: (d, p) => `Le letture tornano a coincidere dopo il ${d}, quando nella diaspora si leggono insieme ${p}.`,
    rejoinNow: p => `Questo sabato nella diaspora si leggono insieme ${p}; dal sabato seguente la lettura è di nuovo la stessa.`,
    translitLbl: 'Traslitterazione di כ e ת', bethLbl: 'Traslitterazione di ב', tequfa: 'tequfà secondo il', chapter: 'cap.', langLbl2: 'Lingua (oltre all’ebraico)', hebOnly: 'solo ebraico', nameLatin: 'Nome del luogo', nameHeb: 'Nome in ebraico', save: 'Salva', placeNote: 'Nome trovato con la posizione; si può correggere.', autoLocLbl: 'Posizione automatica', autoLocNote: 'Il luogo segue la posizione del telefono e cambia se ci si sposta di oltre 5 km. Si può scegliere un altro luogo per vederne gli orari, e poi tornare alla propria posizione.', backLoc: 'Torna alla mia posizione', searchLbl: 'Cerca un luogo', searchPh: 'Nome o coordinate (44.84, 11.62)', savedLbl: 'I miei luoghi', recentLbl: 'Scelti di recente', starNote: 'Con ☆ un luogo si aggiunge ai miei luoghi.', starAdd: 'Aggiungi ai miei luoghi', starDel: 'Togli dai miei luoghi', noRes: 'Nessun luogo trovato.',
    netLbl: 'Cerca il nome del luogo in rete (OpenStreetMap)', netNote: 'Manda la posizione, arrotondata a circa 1 km, a OpenStreetMap; senza rete si usa l’elenco incluso.'
  },
  en: {
    tammuzNote: 'Italian rite (Bologna Maḥazor): read straight through, without skipping. Some read as on the other fasts (<span lang="he">ויחל משה</span>, then <span lang="he">פסל לך</span>), as in the MT', fastOut: 'Fast ends', reading: 'Tora reading', both: 'Shaḥriṯ and Minḥa', av9In: 'Tishʿa be-Aḇ begins',
    hamEat: 'Latest time for eating ḥameṣ', hamEatShabb: 'Latest time for eating ḥameṣ; what is left is annulled and covered', hamTora: 'From here ḥameṣ is forbidden by the Tora',
    hamSearch: 'Tonight, at the beginning of the night: search for ḥameṣ', hamFriday: 'Before Shabbaṯ the ḥameṣ is removed, except what will be eaten tomorrow until 4 hours',
    cdIn: 'in', hanLight: 'Lighting of the Ḥanukka lights', hanFriday: 'The Ḥanukka lights are lit before',
    neila: 'Neʿila is completed shortly before',moonLastEve: 'Tonight: last evening for the blessing on the moon (<span lang="he">מחדש חדשים</span>); it may be recited until sunset tomorrow', moonLastDay: 'Blessing on the moon (<span lang="he">מחדש חדשים</span>): last day, until sunset',
    moonFirst: 'From tonight: blessing on the moon (<span lang="he">מחדש חדשים</span>), to be recited as soon as the new moon is seen',
    omer: (n, w, d) => `ʿOmer: tonight is day ${n}` + (w ? ` (${w} week${w > 1 ? 's' : ''}${d ? ` and ${d} day${d > 1 ? 's' : ''}` : ''})` : ''),
    title: 'Zemannim', subtitle: 'Halakhic times according to the Mishne Tora', today: 'Today', week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    afterSunset: 'After sunset', parasha: 'Weekly parasha', festShabbath: 'Festival Shabbaṯ: festival reading',
    na: 'Nefilaṯ appayim', shahrith: 'Shaḥriṯ', minha: 'Minḥa', arvith: 'ʿArḇiṯ', yes: 'yes', no: 'no',
    ask: 'Request for rain',
    askTonight: 'begins at ʿArḇiṯ tonight', askFirst: 'it began at ʿArḇiṯ last night', askLast: 'for the last time at Minḥa',
    scTonight: 'From ʿArḇiṯ tonight', scUntilMinha: 'Until Minḥa', scUntilNeila: 'Until Neʿila', ifFast: 'If fasting', b3: '3rd blessing', b11: '11th blessing', aboda: 'in the ʿAḇoḏa', hodaya: 'in the Hoḏaya',
    anenu: 'in Shomeaʿ tefilla; the reader makes it a separate blessing, between Goʾel and Rofe', boneh: 'in Bone Yerushalayim', hour: 'Seasonal hour', settings: 'Settings', notes: 'Notes on the choices',
    close: 'Close', place: 'Place', useGps: 'Use my location', gpsFail: 'Location is not available on this page: search for a place.',
    gpsWait: 'Finding your location…', manual: 'Coordinates', apply: 'Apply', tzethLbl: 'Ṣeṯ ha-koḵaḇim (end of Shabbaṯ, festivals, and fasts)',
    tequfaLbl: 'Tequfa for the request for rain (diaspora)', dawnLbl: 'Show ʿaloṯ ha-shaḥar', israelLbl: 'Land of Israel',
    walledLbl: 'Walled city (Purim on the 15th)', auto: 'automatic', on: 'yes', off: 'no', prudentLbl: 'Prudent rounding',
    langLbl: 'Language', zone: 'Times in time zone', shabbIn: 'Shabbaṯ begins', shabbOut: 'Shabbaṯ ends',
    ytIn: 'Festival begins', ytOut: 'Festival ends', source: 'Source', polar: 'At this place and date the sun does not rise or does not set.',
    firstMention: 'begins at Musaf', lastMention: 'said until Shaḥriṯ; no longer said from Musaf', israelOn: 'Israel', diaspora: 'diaspora', inIsrael: 'In Israel', naAll: 'at every prayer', naKippurIt: 'in the Italian rite, only at Neʿila', naVar: { kippurEve: 'some omit it at Minḥa', hanEve: 'some omit it at Minḥa', rhEve: 'variant: the Shibbole ha-Leqeṭ omits it at Minḥa', av9: 'in the Italian rite, only at Minḥa' }, arvithKippur: 'ʿArḇiṯ (Kippur night)', inDiaspora: 'In the diaspora', festReading: 'festival reading',
    splitPesah: 'In the diaspora this Shabbaṯ is the last day of Pesaḥ and the festival portion is read; in Israel the next parasha is read.',
    splitShavuoth: 'In the diaspora this Shabbaṯ is the second day of Shaḇuʿoṯ and the festival portion is read; in Israel the next parasha is read.',
    rejoin: (d, p) => `The readings coincide again after ${d}, when the diaspora reads ${p} together.`,
    rejoinNow: p => `This Shabbaṯ the diaspora reads ${p} together; from next Shabbaṯ the reading is the same again.`,
    translitLbl: 'Romanization of כ and ת', bethLbl: 'Romanization of ב', tequfa: 'tequfa by', chapter: 'ch.', langLbl2: 'Language (besides Hebrew)', hebOnly: 'Hebrew only', nameLatin: 'Place name', nameHeb: 'Name in Hebrew', save: 'Save', placeNote: 'Name found from the location; it can be corrected.', autoLocLbl: 'Automatic location', autoLocNote: 'The place follows the phone’s location and changes after a move of more than 5 km. Another place can be chosen to see its times, before going back to one’s own location.', backLoc: 'Back to my location', searchLbl: 'Search for a place', searchPh: 'Name or coordinates (44.84, 11.62)', savedLbl: 'My places', recentLbl: 'Recently chosen', starNote: 'With ☆ a place is added to my places.', starAdd: 'Add to my places', starDel: 'Remove from my places', noRes: 'No place found.',
    netLbl: 'Look up the place name online (OpenStreetMap)', netNote: 'Sends the location, rounded to about 1 km, to OpenStreetMap; offline, the built-in list is used.'
  },
  fr: {
    tammuzNote: 'Rite italien (Maḥazor de Bologne) : on lit à la suite, sans sauter. Certains lisent comme les autres jeûnes (<span lang="he">ויחל משה</span>, puis <span lang="he">פסל לך</span>), comme le MT', fastOut: 'Fin du jeûne', reading: 'Lecture de la Tora', both: 'Shaḥriṯ et Minḥa', av9In: 'Début de Tishʿa be-Aḇ',
    hamEat: 'Heure limite pour manger du ḥameṣ', hamEatShabb: 'Heure limite pour manger du ḥameṣ ; ce qui reste est annulé et recouvert', hamTora: 'À partir d’ici le ḥameṣ est interdit par la Tora',
    hamSearch: 'Ce soir, au début de la nuit : recherche du ḥameṣ', hamFriday: 'Avant le Shabbaṯ on élimine le ḥameṣ, sauf celui que l’on mangera demain jusqu’à 4 heures',
    cdIn: 'dans', hanLight: 'Allumage des lumières de Ḥanukka', hanFriday: 'Les lumières de Ḥanukka s’allument avant',
    neila: 'La Neʿila s’achève peu avant',moonLastEve: 'Ce soir : dernier soir pour la bénédiction de la lune (<span lang="he">מחדש חדשים</span>) ; on peut la réciter jusqu’au coucher du soleil de demain', moonLastDay: 'Bénédiction de la lune (<span lang="he">מחדש חדשים</span>) : dernier jour, jusqu’au coucher du soleil',
    moonFirst: 'À partir de ce soir : bénédiction de la lune (<span lang="he">מחדש חדשים</span>), à réciter dès que l’on voit la nouvelle lune',
    omer: (n, w, d) => `ʿOmer : ce soir, ${n === 1 ? '1er' : n + 'e'} jour` + (w ? ` (${w} semaine${w > 1 ? 's' : ''}${d ? ` et ${d} jour${d > 1 ? 's' : ''}` : ''})` : ''),
    title: 'Zemannim', subtitle: 'Horaires halakhiques selon le Mishne Tora', today: 'Aujourd’hui', week: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    afterSunset: 'Après le coucher du soleil', parasha: 'Parasha de la semaine', festShabbath: 'Shabbaṯ de fête : lecture de la fête',
    na: 'Nefilaṯ appayim', shahrith: 'Shaḥriṯ', minha: 'Minḥa', arvith: 'ʿArḇiṯ', yes: 'oui', no: 'non',
    ask: 'Demande de la pluie',
    askTonight: 'commence ce soir à ʿArḇiṯ', askFirst: 'on a commencé hier soir à ʿArḇiṯ', askLast: 'pour la dernière fois à Minḥa',
    scTonight: 'À partir de ʿArḇiṯ ce soir', scUntilMinha: 'Jusqu’à Minḥa', scUntilNeila: 'Jusqu’à Neʿila', ifFast: 'Si l’on jeûne', b3: '3e bénédiction', b11: '11e bénédiction', aboda: 'dans la ʿAḇoḏa', hodaya: 'dans la Hoḏaya',
    anenu: 'dans Shomeaʿ tefilla ; l’officiant en fait une bénédiction à part, entre Goʾel et Rofe', boneh: 'dans Bone Yerushalayim', hour: 'Heure saisonnière', settings: 'Réglages', notes: 'Notes sur les choix',
    close: 'Fermer', place: 'Lieu', useGps: 'Utiliser ma position', gpsFail: 'Position indisponible sur cette page : cherchez un lieu.',
    gpsWait: 'Recherche de la position…', manual: 'Coordonnées', apply: 'Appliquer', tzethLbl: 'Ṣeṯ ha-koḵaḇim (fin du Shabbaṯ, des fêtes et des jeûnes)',
    tequfaLbl: 'Tequfa pour la demande de la pluie (diaspora)', dawnLbl: 'Afficher ʿaloṯ ha-shaḥar', israelLbl: 'Terre d’Israël',
    walledLbl: 'Ville fortifiée (Purim le 15)', auto: 'automatique', on: 'oui', off: 'non', prudentLbl: 'Arrondi prudent',
    langLbl: 'Langue', zone: 'Heures dans le fuseau horaire', shabbIn: 'Début du Shabbaṯ', shabbOut: 'Fin du Shabbaṯ',
    ytIn: 'Début de la fête', ytOut: 'Fin de la fête', source: 'Source', polar: 'En ce lieu et à cette date, le soleil ne se lève pas ou ne se couche pas.',
    firstMention: 'on commence à le dire à Musaf', lastMention: 'on le dit jusqu’à Shaḥriṯ ; à partir de Musaf on ne le dit plus', israelOn: 'Israël', diaspora: 'diaspora', inIsrael: 'En Israël', naAll: 'à chaque prière', naKippurIt: 'selon le rite italien, seulement à la Neʿila', naVar: { kippurEve: 'certains l’omettent à Minḥa', hanEve: 'certains l’omettent à Minḥa', rhEve: 'variante : le Shibbole ha-Leqeṭ l’omet à Minḥa', av9: 'selon le rite italien, seulement à Minḥa' }, arvithKippur: 'ʿArḇiṯ (nuit de Kippur)', inDiaspora: 'En diaspora', festReading: 'lecture de la fête',
    splitPesah: 'En diaspora, ce Shabbaṯ est le dernier jour de Pesaḥ, avec la lecture de la fête ; en Israël on lit la parasha suivante.',
    splitShavuoth: 'En diaspora, ce Shabbaṯ est le deuxième jour de Shaḇuʿoṯ, avec la lecture de la fête ; en Israël on lit la parasha suivante.',
    rejoin: (d, p) => `Les lectures coïncident de nouveau après le ${d}, quand la diaspora lit ensemble ${p}.`,
    rejoinNow: p => `Ce Shabbaṯ, la diaspora lit ensemble ${p} ; à partir du Shabbaṯ suivant la lecture est de nouveau la même.`,
    translitLbl: 'Translittération de כ et ת', bethLbl: 'Translittération de ב', tequfa: 'tequfa selon le', chapter: 'chap.', langLbl2: 'Langue (en plus de l’hébreu)', hebOnly: 'hébreu seul', nameLatin: 'Nom du lieu', nameHeb: 'Nom en hébreu', save: 'Enregistrer', placeNote: 'Nom trouvé à partir de la position ; on peut le corriger.', autoLocLbl: 'Position automatique', autoLocNote: 'Le lieu suit la position du téléphone et change après un déplacement de plus de 5 km. On peut choisir un autre lieu pour en voir les heures, puis revenir à sa position.', backLoc: 'Revenir à ma position', searchLbl: 'Chercher un lieu', searchPh: 'Nom ou coordonnées (44.84, 11.62)', savedLbl: 'Mes lieux', recentLbl: 'Choisis récemment', starNote: 'Avec ☆ un lieu s’ajoute à mes lieux.', starAdd: 'Ajouter à mes lieux', starDel: 'Retirer de mes lieux', noRes: 'Aucun lieu trouvé.',
    netLbl: 'Chercher le nom du lieu en ligne (OpenStreetMap)', netNote: 'Envoie la position, arrondie à 1 km environ, à OpenStreetMap ; hors ligne, la liste intégrée est utilisée.'
  },
  he: {
    tammuzNote: 'מנהג ק״ק איטאליאני (מחזור בולוניה): קוראים הכל על הסדר ואין מדלגים. ויש שקוראים כשאר תעניות (ויחל משה ופסל לך), כמשנה תורה', fastOut: 'סוף התענית', reading: 'קריאת התורה', both: 'שחרית ומנחה', av9In: 'תחלת תשעה באב',
    hamEat: 'סוף זמן אכילת חמץ', hamEatShabb: 'סוף זמן אכילת חמץ; הנשאר מבטלים אותו וכופים עליו כלי', hamTora: 'מכאן החמץ אסור מן התורה',
    hamSearch: 'הלילה, מתחלת הלילה: בדיקת חמץ', hamFriday: 'מבערים את החמץ מלפני השבת, חוץ ממה שאוכלים למחר עד ארבע שעות',
    cdIn: 'בעוד', hanLight: 'הדלקת נרות חנכה', hanFriday: 'מדליקים נרות חנכה קדם לכן',
    neila: 'משלימים תפלת נעילה סמוך לשקיעת החמה',moonLastEve: 'הלילה: לילה אחרון לברכת הלבנה (מחדש חדשים); מברכים עד שקיעת החמה של מחר', moonLastDay: 'ברכת הלבנה (מחדש חדשים): יום אחרון, עד שקיעת החמה',
    moonFirst: 'מהלילה: ברכת הלבנה (מחדש חדשים); מברכים כשרואים את הלבנה בחדושה',
    omer: (n, w, d) => `ספירת העמר: הלילה יום ${E.hebNumeral(n)}` + (w ? `, ${w === 1 ? 'שבוע אחד' : E.hebNumeral(w) + ' שבועות'}${d ? ' ו' + (d === 1 ? 'יום אחד' : E.hebNumeral(d) + ' ימים') : ''}` : ''),
    title: 'זמנים', subtitle: 'זמני ההלכה על פי משנה תורה', today: 'היום', week: ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום ששי', 'שבת'],
    months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    afterSunset: 'אחר השקיעה', parasha: 'פרשת השבוע', festShabbath: 'שבת של מועד: קריאת המועד',
    na: 'נפילת אפים', shahrith: 'שחרית', minha: 'מנחה', arvith: 'ערבית', yes: 'כן', no: 'לא',
    ask: 'שאלת גשמים',
    askTonight: 'מתחילים בערבית של הלילה', askFirst: 'מערבית של אתמול', askLast: 'בפעם האחרונה במנחה',
    scTonight: 'מערבית של הלילה', scUntilMinha: 'עד מנחה', scUntilNeila: 'עד נעילה', ifFast: 'המתענה', b3: 'בברכה שלישית', b11: 'בברכה אחת עשרה', aboda: 'בעבודה', hodaya: 'בהודיה',
    anenu: 'בשומע תפלה; ושליח צבור אומרה ברכה בפני עצמה, בין גואל לרופא', boneh: 'בבונה ירושלים', hour: 'שעה זמנית', settings: 'הגדרות', notes: 'הערות על ההכרעות',
    close: 'סגור', place: 'מקום', useGps: 'השתמש במיקום שלי', gpsFail: 'המיקום אינו זמין בדף זה: חפש מקום.',
    gpsWait: 'מחפש מיקום…', manual: 'קואורדינטות', apply: 'החל', tzethLbl: 'צאת הכוכבים (מוצאי שבת)',
    tequfaLbl: 'תקופה לשאלת גשמים (חוץ לארץ)', dawnLbl: 'הצג עלות השחר', israelLbl: 'ארץ ישראל',
    walledLbl: 'עיר מוקפת חומה (פורים בט״ו)', auto: 'אוטומטי', on: 'כן', off: 'לא', prudentLbl: 'עיגול לחומרא',
    langLbl: 'שפה', zone: 'שעות לפי אזור הזמן', shabbIn: 'כניסת שבת', shabbOut: 'יציאת שבת',
    ytIn: 'כניסת יום טוב', ytOut: 'מוצאי יום טוב', source: 'מקור', polar: 'במקום וביום זה החמה אינה זורחת או אינה שוקעת.',
    firstMention: 'מתחילים במוסף', lastMention: 'אומרים עד שחרית; ממוסף ואילך אין אומרים', israelOn: 'ארץ ישראל', diaspora: 'חוץ לארץ', inIsrael: 'בארץ ישראל', naAll: 'בכל תפלה ותפלה', naKippurIt: 'במנהג ק״ק איטאליאני בנעילה בלבד', naVar: { kippurEve: 'יש שאין נופלים במנחה', hanEve: 'יש שאין נופלים במנחה', rhEve: 'ובשבלי הלקט: אין נופלים במנחה', av9: 'במנהג ק״ק איטאליאני במנחה בלבד' }, arvithKippur: 'ערבית (ליל יום הכפורים)', inDiaspora: 'בחוץ לארץ', festReading: 'קריאת המועד',
    splitPesah: 'בחוץ לארץ שבת זו היא אחרון של פסח וקוראים בענין המועד; בארץ ישראל קוראים את הפרשה הבאה.',
    splitShavuoth: 'בחוץ לארץ שבת זו היא יום טוב שני של שבעות וקוראים בענין המועד; בארץ ישראל קוראים את הפרשה הבאה.',
    rejoin: (d, p) => `הקריאה חוזרת להיות שוה אחרי ${d}, כשבחוץ לארץ מחברים ${p}.`,
    rejoinNow: p => `בשבת זו מחברים בחוץ לארץ ${p}; מן השבת הבאה הקריאה שוה שוב.`,
    translitLbl: 'תעתיק של כ ושל ת', bethLbl: 'תעתיק של ב', chapter: 'פרק', langLbl2: 'שפה (נוסף על העברית)', hebOnly: 'עברית בלבד', nameLatin: 'שם המקום באותיות לטיניות', nameHeb: 'שם המקום בעברית', save: 'שמור', placeNote: 'השם נמצא לפי המיקום; אפשר לתקנו.', autoLocLbl: 'מיקום אוטומטי', autoLocNote: 'המקום נקבע לפי מיקום הטלפון ומשתנה כשמתרחקים יותר מחמשה קילומטרים. אפשר לבחור מקום אחר כדי לראות את זמניו, ולחזור אחר כך למיקום.', backLoc: 'חזרה למיקום שלי', searchLbl: 'חיפוש מקום', searchPh: 'שם או קואורדינטות (44.84, 11.62)', savedLbl: 'המקומות שלי', recentLbl: 'נבחרו לאחרונה', starNote: 'ב־☆ מוסיפים מקום למקומות שלי.', starAdd: 'הוסף למקומות שלי', starDel: 'הסר מהמקומות שלי', noRes: 'לא נמצא מקום.',
    netLbl: 'חפש את שם המקום ברשת (OpenStreetMap)', netNote: 'שולח את המיקום, בעיגול לכקילומטר, אל OpenStreetMap; בלי רשת משתמשים ברשימה שבתוך היישום.'
  }
};
// 'he' = solo ebraico; 'it' / 'en' / 'fr' = ebraico con didascalie in quella lingua
if (!T[S.lang]) S.lang = 'it';
const L = () => T[S.lang];

// ---------- Installazione ----------
// Istruzioni per aggiungere l'app alla schermata Home; la voce sparisce quando l'app è già installata.
const URL_APP = 'https://arinohem.github.io/zemannim/';
const INSTALL = {
  it: { title: 'Installazione', ios: 'iPhone (iOS)', android: 'Android', both: 'Su entrambi i sistemi', other: 'Istruzioni per l’altro sistema',
    iosSteps: [`Apri Safari e vai all’indirizzo ${URL_APP}.`, 'Tocca il pulsante <b>Condividi</b> (il quadrato con la freccia verso l’alto). Nelle versioni recenti di iOS, se non lo vedi nella barra, è nel menu <b>⋯</b>.', 'Scorri il menu e scegli <b>Aggiungi alla schermata Home</b>.', 'Lascia il nome proposto, «Zemannim», e tocca <b>Aggiungi</b>.'],
    iosAfter: 'L’icona compare nella schermata Home e l’app si apre a tutto schermo, come le altre.',
    androidSteps: [`Apri Chrome e vai all’indirizzo ${URL_APP}.`, 'Tocca il menu <b>⋮</b> in alto a destra.', 'Scegli <b>Installa app</b> oppure <b>Aggiungi a schermata Home</b>: il nome della voce cambia secondo la versione di Chrome.', 'Conferma con <b>Installa</b>.'],
    androidAfter: 'L’icona compare nella schermata Home e nell’elenco delle app. Con altri browser, come Samsung Internet o Firefox, la voce si trova in un menu simile.',
    bothItems: ['<b>Posizione:</b> alla prima apertura il telefono chiede il permesso di usare la posizione. Se lo neghi, puoi sempre cercare il luogo per nome o per coordinate.', '<b>Senza rete:</b> dopo la prima apertura l’app funziona anche senza connessione.', '<b>Aggiornamenti:</b> arrivano da soli quando l’app viene aperta con la connessione attiva. Una nuova icona, invece, compare di solito solo dopo aver tolto l’app dalla schermata Home e averla aggiunta di nuovo.'] },
  en: { title: 'Installation', ios: 'iPhone (iOS)', android: 'Android', both: 'On both systems', other: 'Instructions for the other system',
    iosSteps: [`Open Safari and go to ${URL_APP}.`, 'Tap the <b>Share</b> button (the square with an upward arrow). In recent versions of iOS, if it is not in the bar, it is in the <b>⋯</b> menu.', 'Scroll down the menu and choose <b>Add to Home Screen</b>.', 'Keep the suggested name, “Zemannim”, and tap <b>Add</b>.'],
    iosAfter: 'The icon appears on the Home Screen, and the app opens full screen, like the others.',
    androidSteps: [`Open Chrome and go to ${URL_APP}.`, 'Tap the <b>⋮</b> menu at the top right.', 'Choose <b>Install app</b> or <b>Add to Home screen</b>: the name of the item depends on the version of Chrome.', 'Confirm with <b>Install</b>.'],
    androidAfter: 'The icon appears on the Home screen and in the list of apps. Other browsers, such as Samsung Internet or Firefox, have the item in a similar menu.',
    bothItems: ['<b>Location:</b> the first time the app is opened, the phone asks for permission to use the location. If you refuse, you can still search for the place by name or by coordinates.', '<b>Offline:</b> after the first opening, the app also works without a connection.', '<b>Updates:</b> they arrive by themselves when the app is opened online. A new icon, however, usually appears only after removing the app from the Home Screen and adding it again.'] },
  fr: { title: 'Installation', ios: 'iPhone (iOS)', android: 'Android', both: 'Sur les deux systèmes', other: 'Instructions pour l’autre système',
    iosSteps: [`Ouvrez Safari et allez à l’adresse ${URL_APP}.`, 'Touchez le bouton <b>Partager</b> (le carré avec une flèche vers le haut). Dans les versions récentes d’iOS, s’il n’est pas dans la barre, il se trouve dans le menu <b>⋯</b>.', 'Faites défiler le menu et choisissez <b>Sur l’écran d’accueil</b>.', 'Gardez le nom proposé, « Zemannim », et touchez <b>Ajouter</b>.'],
    iosAfter: 'L’icône apparaît sur l’écran d’accueil et l’app s’ouvre en plein écran, comme les autres.',
    androidSteps: [`Ouvrez Chrome et allez à l’adresse ${URL_APP}.`, 'Touchez le menu <b>⋮</b> en haut à droite.', 'Choisissez <b>Installer l’application</b> ou <b>Ajouter à l’écran d’accueil</b> : le nom de l’option dépend de la version de Chrome.', 'Confirmez avec <b>Installer</b>.'],
    androidAfter: 'L’icône apparaît sur l’écran d’accueil et dans la liste des applications. Dans d’autres navigateurs, comme Samsung Internet ou Firefox, l’option se trouve dans un menu semblable.',
    bothItems: ['<b>Position :</b> à la première ouverture, le téléphone demande l’autorisation d’utiliser la position. Si vous la refusez, vous pouvez toujours chercher le lieu par son nom ou par ses coordonnées.', '<b>Hors ligne :</b> après la première ouverture, l’app fonctionne aussi sans connexion.', '<b>Mises à jour :</b> elles arrivent d’elles-mêmes quand l’app est ouverte en ligne. Une nouvelle icône, en revanche, n’apparaît en général qu’après avoir retiré l’app de l’écran d’accueil et l’avoir ajoutée de nouveau.'] },
  he: { title: 'התקנה', ios: 'iPhone (iOS)', android: 'Android', both: 'בשתי המערכות', other: 'הוראות למערכת האחרת',
    iosSteps: [`פתח את Safari ועבור לכתובת <span dir="ltr">${URL_APP}</span>.`, 'לחץ על כפתור <b>שיתוף</b> (הריבוע עם החץ כלפי מעלה). בגרסאות החדשות של iOS, אם אינו בסרגל, הוא נמצא בתפריט <b>⋯</b>.', 'גלול בתפריט ובחר <b>הוספה למסך הבית</b>.', 'השאר את השם המוצע, <span dir="ltr">Zemannim</span>, ולחץ <b>הוספה</b>.'],
    iosAfter: 'הסמל מופיע במסך הבית, והיישום נפתח במסך מלא כשאר היישומים.',
    androidSteps: [`פתח את Chrome ועבור לכתובת <span dir="ltr">${URL_APP}</span>.`, 'לחץ על התפריט <b>⋮</b> שבראש המסך.', 'בחר <b>התקנת האפליקציה</b> או <b>הוספה למסך הבית</b>: שם האפשרות משתנה לפי גרסת Chrome.', 'אשר בלחיצה על <b>התקנה</b>.'],
    androidAfter: 'הסמל מופיע במסך הבית וברשימת היישומים. בדפדפנים אחרים, כגון Samsung Internet או Firefox, האפשרות נמצאת בתפריט דומה.',
    bothItems: ['<b>מיקום:</b> בפתיחה הראשונה הטלפון מבקש רשות להשתמש במיקום. אם לא נותנים אותה, אפשר תמיד לחפש את המקום לפי שמו או לפי קואורדינטות.', '<b>בלי רשת:</b> אחרי הפתיחה הראשונה היישום פועל גם בלי חיבור.', '<b>עדכונים:</b> הם מגיעים מעצמם כשפותחים את היישום עם חיבור לרשת. אבל סמל חדש מופיע בדרך כלל רק אחרי שמסירים את היישום ממסך הבית ומוסיפים אותו מחדש.'] },
};
const isInstalled = () => (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
const phoneOs = () => {
  const ua = navigator.userAgent || '';
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'ios';
  return /Android/.test(ua) ? 'android' : null;
};
function installHtml() {
  const t = INSTALL[S.lang];
  const block = os => `<h4>${t[os]}</h4><ol>${t[os + 'Steps'].map(x => `<li>${x}</li>`).join('')}</ol><p>${t[os + 'After']}</p>`;
  const os = phoneOs();
  // Sul telefono riconosciuto, le sue istruzioni e le altre richiudibili; altrove, entrambe.
  const main = os ? block(os) + `<details><summary>${t.other}</summary>${block(os === 'ios' ? 'android' : 'ios')}</details>` : block('ios') + block('android');
  return `<div class="notesdoc install">${main}<h4>${t.both}</h4><ul>${t.bothItems.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
}
const cap = () => S.lang !== 'he';          // ci sono didascalie accanto all'ebraico?
const COLON = () => S.lang === 'fr' ? ' :' : ':';
const roman = s => S.lang === 'it' ? s : E.sciRoman(s);
// Nei sorgenti כ e ת refuyyoṯ sono scritte ḵ e ṯ (lettere che compaiono solo nella traslitterazione);
// qui diventano kh e th se l'impostazione lo chiede
// Così anche ב refuyyà, scritta ḇ, che diventa v se l'impostazione (separata) lo chiede
// Gli esempi fissi della pagina delle note stanno in <span class="fix"> e non si convertono
const translit = html => html.split(/(<span class="fix">[^<]*<\/span>)/).map((s, i) => {
  if (i % 2) return s;
  if (S.translit !== 'line') s = s.replace(/[ḵḴṯṮ]/g, c => ({ 'ḵ': 'kh', 'Ḵ': 'Kh', 'ṯ': 'th', 'Ṯ': 'Th' }[c]));
  if (S.beth === 'v') s = s.replace(/[ḇḆ]/g, c => c === 'ḇ' ? 'v' : 'V');
  return s;
}).join('');
const LOCALE = { it: 'it-IT', en: 'en-GB', fr: 'fr-FR', he: 'he-IL' };

// Voci della lista: etichetta ebraica, didascalie, fonte (stringa o testo per lingua), tipo di arrotondamento
const ZEMANIM = {
  alot:    { he: 'עלות השחר', it: 'Spuntare dell’alba', en: 'Break of dawn', fr: 'Lever de l’aube',
             src: { it: 'Rambam, Comm. alla Mishnà, Beraḵoṯ 1:1 (non MT): 1⅕ ore stagionali prima del sorgere del sole',
                    en: 'Rambam, Commentary on the Mishna, Beraḵoṯ 1:1 (not MT): 1⅕ seasonal hours before sunrise',
                    fr: 'Rambam, Commentaire de la Mishna, Beraḵoṯ 1:1 (pas le MT) : 1⅕ heure saisonnière avant le lever du soleil' }, r: 'c' },
  netz:    { he: 'הנץ החמה', it: 'Sorgere del sole', en: 'Sunrise', fr: 'Lever du soleil', src: 'MT Qeriʾaṯ Shemaʿ 1:12; Tefillà 3:1', r: 'n' },
  shema:   { he: 'סוף זמן קריאת שמע', it: 'Termine per lo Shemaʿ del mattino (3 ore)', en: 'Latest time for the morning Shemaʿ (3 hours)', fr: 'Heure limite pour le Shemaʿ du matin (3 heures)', src: 'MT Qeriʾaṯ Shemaʿ 1:12–14', r: 'f' },
  tefilla: { he: 'סוף זמן תפלת השחר', it: 'Termine per Shaḥriṯ (4 ore)', en: 'Latest time for Shaḥriṯ (4 hours)', fr: 'Heure limite pour Shaḥriṯ (4 heures)', src: 'MT Tefillà 3:1', r: 'f' },
  // Solo il 14 Nisan (5 ore); se cade di Shabbaṯ non si brucia: hametzShabb
  hametz:  { he: 'סוף זמן בעור חמץ', it: 'Termine per eliminare e annullare il ḥameṣ (5 ore); da qui è vietato anche trarne beneficio',
             en: 'Latest time for removing and annulling ḥameṣ (5 hours); from here benefit from it is also forbidden',
             fr: 'Heure limite pour éliminer et annuler le ḥameṣ (5 heures) ; à partir d’ici il est aussi interdit d’en tirer profit', src: 'MT Ḥameṣ u-Maṣṣà 1:9–10; 3:7', r: 'f' },
  hametzShabb: { he: 'סוף זמן בטול חמץ', it: 'Termine per annullare il ḥameṣ (5 ore); da qui è vietato anche trarne beneficio',
             en: 'Latest time for annulling ḥameṣ (5 hours); from here benefit from it is also forbidden',
             fr: 'Heure limite pour annuler le ḥameṣ (5 heures) ; à partir d’ici il est aussi interdit d’en tirer profit', src: 'MT Ḥameṣ u-Maṣṣà 1:9; 3:3; 3:7', r: 'f' },
  hatzot:  { he: 'חצות היום', it: 'Mezzogiorno (6 ore)', en: 'Midday (6 hours)', fr: 'Midi (6 heures)', src: 'MT Tefillà 3:1 («עד חצות היום»)', r: 'f' },
  minhaG:  { he: 'מנחה גדולה', it: 'Minḥà geḏolà (6½ ore)', en: 'Minḥa geḏola (6½ hours)', fr: 'Minḥa geḏola (6½ heures)', src: 'MT Tefillà 3:2, 3:4', r: 'c' },
  musaf:   { he: 'סוף זמן תפלת המוספין', it: 'Termine per Musaf (7 ore)', en: 'Latest time for Musaf (7 hours)', fr: 'Heure limite pour Musaf (7 heures)',
             src: { it: 'MT Tefillà 3:5: fino a 7 ore; chi prega dopo esce d’obbligo, pur essendo in difetto, perché il suo tempo è tutto il giorno',
                    en: 'MT Tefilla 3:5: until 7 hours; whoever prays later has fulfilled the obligation, though at fault, because its time is the whole day',
                    fr: 'MT Tefilla 3:5 : jusqu’à 7 heures ; qui prie plus tard est quitte, bien qu’en faute, car son temps est toute la journée' }, r: 'f' },
  minhaQ:  { he: 'מנחה קטנה', it: 'Minḥà qeṭannà (9½ ore)', en: 'Minḥa qeṭanna (9½ hours)', fr: 'Minḥa qeṭanna (9½ heures)', src: 'MT Tefillà 3:2, 3:4', r: 'c' },
  plag:    { he: 'שעה ורביע קדם השקיעה', it: 'Termine per la minḥà qeṭannà, 1¼ ore prima del tramonto (si può recitare Minḥà fino al tramonto)',
             en: 'Latest time for minḥa qeṭanna, 1¼ hours before sunset (Minḥa may be recited until sunset)',
             fr: 'Heure limite pour la minḥa qeṭanna, 1¼ heure avant le coucher du soleil (on peut réciter la prière de Minḥa jusqu’au coucher du soleil)', src: 'MT Tefillà 3:4', r: 'f' },
  shqia:   { he: 'שקיעת החמה', it: 'Tramonto', en: 'Sunset', fr: 'Coucher du soleil', src: 'MT Shabbaṯ 5:3–4; Tefillà 3:4', r: 'f' },
  tzeth:   { he: 'צאת הכוכבים', it: 'Uscita delle stelle', en: 'Emergence of the stars', fr: 'Sortie des étoiles', src: 'MT Terumoṯ 7:2 («כמו שליש שעה אחר שקיעת החמה»); Shabbaṯ 5:4', r: 'c' },
  hatzotLayla: { he: 'חצות הלילה', it: 'Mezzanotte (termine preferibile per lo Shemaʿ della sera)', en: 'Midnight (preferred latest time for the evening Shemaʿ)', fr: 'Minuit (heure limite préférable pour le Shemaʿ du soir)',
             src: { it: 'MT Qeriʾaṯ Shemaʿ 1:10; calcolata a metà fra il tramonto e il sorgere del sole',
                    en: 'MT Qeriʾaṯ Shemaʿ 1:10; computed as the midpoint between sunset and sunrise',
                    fr: 'MT Qeriʾaṯ Shemaʿ 1:10 ; calculé à mi-chemin entre le coucher et le lever du soleil' }, r: 'f' }
};
// Le fonti-stringa sono citazioni romanizzate (forma italiana); in modalità solo ebraico le note restano in italiano
const srcText = z => typeof z.src === 'string' ? roman(z.src) : (z.src[S.lang] || z.src.it);

// Nome del ripiego «Posizione attuale» nelle altre lingue (i luoghi dell'elenco e della ricerca hanno i loro nomi in names)
const PLACE_NAMES = {
  'Posizione attuale': { en: 'Current location', fr: 'Position actuelle', he: 'מיקום נוכחי' },
  'מיקום נוכחי': { it: 'Posizione attuale', en: 'Current location', fr: 'Position actuelle' }
};
function placeName(n) {
  const p = S.place;
  if (p && p.names && n === p.name) return (S.lang === 'he' ? p.names.he : p.names[S.lang]) || p.names.it || p.name;
  return (PLACE_NAMES[n] && PLACE_NAMES[n][S.lang]) || n;
}

// ---------- Nome del luogo dalla posizione (elenco incluso: places.json, da GeoNames) ----------
const P = window.MTPlace;
// places.json: { tz: [fusi], p: [[lat, lon, nome, regola, extra, fuso, paese, popolazione, provincia?], …] }
let PLACES = null, ZONES = null;
function loadPlaces() {
  if (PLACES) return Promise.resolve(PLACES);
  // no-cache: si chiede sempre al server se il file è cambiato (una copia vecchia, di formato diverso, romperebbe la ricerca)
  return fetch('places.json', { cache: 'no-cache' }).then(r => r.json()).then(d => {
    if (!d || !Array.isArray(d.p)) throw new Error('places.json');
    ZONES = d.tz; return (PLACES = d.p);
  });
}
function placeFromEntry(e, lat, lon, tz) {
  const x = e[4] || {}, name = e[2];
  const data = {}; if (x.z) data.z = x.z; if (x.s) data.s = x.s;
  return { name, lat, lon, tz: tz || ZONES[e[5]], auto: true, rule: e[3], data, cc: e[6], sub: e[8] || '',
    names: { it: x.it || name, en: x.en || name, fr: x.fr || name, he: P.hebrew(name, e[3], x) || '' } };
}
const fold = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’ʼ‘]/g, "'").toLowerCase();
// Regole per i luoghi trovati in rete: come in tools/build_places.py
function ruleFor(cc, a, nd) {
  const st = [a.state, a.county, a.region, a['ISO3166-2-lvl4'], a['ISO3166-2-lvl6']].filter(Boolean).join(' ');
  if (['IT', 'SM', 'VA', 'MC'].includes(cc)) return ['it', 'it'];
  if (cc === 'CH') return /Ticino|Tessin|CH-TI/.test(st) ? ['it', 'it'] : /Genève|Geneva|Vaud|Neuchâtel|Jura|Fribourg|Valais|CH-(GE|VD|NE|JU|FR|VS)/.test(st) ? ['fr', 'fr'] : ['de', 'de'];
  if (cc === 'FR') {
    if (/Corse|FR-20R/.test(st) || /^(nice|tende|la brigue|breil-sur-roya|saorge|fontan)$/.test(fold(nd.name || ''))) return ['it', 'it'];
    if (/Bas-Rhin|Haut-Rhin|Moselle|FR-67|FR-68|FR-57|FR-6AE/.test(st)) return ['de', 'de'];
    return ['fr', 'fr'];
  }
  if (cc === 'HR' && /Istar|Istria|Zadar|Šibensk|Splitsko|Dubrova|HR-(18|13|17|15|19)/.test(st)) return nd['name:it'] ? ['it', 'it'] : ['', ''];
  if (cc === 'SI' && /^(koper|izola|piran)$/.test(fold(nd.name || ''))) return ['it', 'it'];
  if (cc === 'BE') return /Wallon|Bruxelles|Brussel|BE-WAL|BE-BRU/.test(st) ? ['fr', 'fr'] : ['', ''];
  if (cc === 'CA' && /Québec|Quebec|CA-QC/.test(st)) return ['fr', 'fr'];
  if (['DE', 'AT', 'LI'].includes(cc)) return ['de', 'de'];
  if ('ES MX GT HN SV NI CR PA CU DO PR CO VE EC PE BO CL AR UY PY'.split(' ').includes(cc)) return ['es', 'es'];
  if ('GB IE US CA AU NZ'.split(' ').includes(cc)) return ['en', 'en'];
  const east = { PL: 'pl', CZ: 'cs', SK: 'sk', HU: 'hu', RO: 'ro', MD: 'ro', LT: 'lt', LV: 'lv', EE: 'et', UA: 'uk', BY: 'be', RU: 'ru' }[cc];
  if (east) return [east, ['uk', 'be', 'ru'].includes(east) ? 'en' : east];
  if (cc === 'IL' || cc === 'PS') return ['he', 'he'];
  if ('MA DZ TN LY EG SD SA YE OM AE QA BH KW IQ SY LB JO MR DJ SO KM EH'.split(' ').includes(cc)) return ['ar', 'en'];
  return ['', ''];
}
function netLookup(lat, lon, tz, list) {
  const u = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&namedetails=1&addressdetails=1&lat=' + lat.toFixed(2) + '&lon=' + lon.toFixed(2);
  return fetch(u).then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.namedetails || !(j.namedetails.name || j.name)) return null;
    const nd = j.namedetails, a = j.address || {}, cc = String(a.country_code || '').toUpperCase();
    // stesso luogo nell'elenco incluso, vicino e con uno dei nomi: se ne prendono le eccezioni e i dati
    const names = new Set(Object.values(nd).map(fold));
    const k = Math.cos(lat * Math.PI / 180);
    const same = list.filter(e => names.has(fold(e[2])) || (e[4] && ['it', 'en', 'fr'].some(l => e[4][l] && names.has(fold(e[4][l])))))
      .filter(e => Math.hypot(e[0] - lat, (e[1] - lon) * k) < 0.2);
    if (same.length) return placeFromEntry(same[0], lat, lon, tz);
    const [rule, lang] = ruleFor(cc, a, nd);
    const local = nd.name || j.name, src = (lang && nd['name:' + lang]) || local;
    // paesi arabofoni: il nome arabo, lettera per lettera (grafia giudeo-araba)
    const ar = rule === 'ar' ? (nd['name:ar'] || (/[؀-ۿ]/.test(local) ? local : '')) : '';
    const he = rule === 'he' ? (nd['name:he'] || '') : (P.hebrew(src, rule, ar ? { ar, c: cc } : null, cc) || '');
    return { name: src, lat, lon, tz, auto: true, rule: rule === 'he' ? '' : rule, data: {}, net: true, cc,
      names: { it: nd['name:it'] || src, en: nd['name:en'] || src, fr: nd['name:fr'] || src, he } };
  });
}
function locate(lat, lon, tz) {
  return loadPlaces().then(list => {
    const n = P.nearest(list, lat, lon);
    const local = n && n.km < 50 ? placeFromEntry(n.entry, lat, lon, tz) : null;
    if (!S.netLookup) return local;
    return netLookup(lat, lon, tz, list).then(r => r || local, () => local);
  }, () => null);
}

// ---------- Ricerca dei luoghi: per nome nell'elenco incluso, o per coordinate (scelte del curatore, 2026-11-11) ----------
// Si confrontano i nomi locale, italiano, inglese e francese senza accenti; in ebraico la grafia dell'app, quella fissa,
// e le grafie israeliane (nome ebraico di GeoNames e titolo di Wikipedia ebraica, campo q), poi, se non basta, lo
// scheletro consonantico: senza א, י, ו, senza ה finale, con ב = ו (פרארה trova פירארה, ליבורנו trova ליוורנו).
// Ordine: nome intero, inizio del nome, inizio di una parola del nome, scheletro; a parità, i luoghi più popolosi e più
// vicini al luogo attuale (popolazione in decibel, meno 10·log10(1 + km/100): Ferrara prima di Fergana per chi è in Italia).
const HEB = /[א-ת]/;
// Le lettere finali contano per il nome intero (רום non è רומא), non per l'inizio di un nome che si sta scrivendo
const hnorm = s => String(s).replace(/[\u0591-\u05C7]/g, '').replace(/[׳״'"’`]/g, '').replace(/[־-]/g, ' ').replace(/\s+/g, ' ').trim();
const nofin = s => s.replace(/[ךםןףץ]/g, c => 'כמנפצ'['ךםןףץ'.indexOf(c)]);
const skel = s => nofin(hnorm(s)).replace(/ב/g, 'ו').split(' ').map(w => w.replace(/ה$/, '').replace(/[איו]/g, '')).filter(Boolean).join(' ');
let IDX = null, HIDX = null;
const lfold = s => fold(s).replace(/[-‐–]/g, ' ');
function tierOf(keys, q, f = x => x) {
  let t = 9;
  const q0 = q; q = f(q);
  for (let k of keys) {
    if (k === q0) return 0;
    k = f(k);
    if (k.startsWith(q)) t = 1;
    else if (t > 2 && (k.includes(' ' + q) || k.includes('-' + q) || k.includes("'" + q))) t = 2;
  }
  return t;
}
function parseCoords(s) {
  const m = s.replace(/°/g, ' ').trim().match(/^(-?\d{1,3}(?:[.,]\d+)?)\s*[,;\s]\s*(-?\d{1,3}(?:[.,]\d+)?)$/);
  if (!m) return null;
  const lat = +m[1].replace(',', '.'), lon = +m[2].replace(',', '.');
  return Math.abs(lat) <= 90 && Math.abs(lon) <= 180 ? [lat, lon] : null;
}
// Luogo dato per coordinate: il nome della località più vicina dell'elenco, entro 50 km come per la posizione del
// telefono, altrimenti le coordinate; il fuso è quello della località più vicina
function coordPlace(lat, lon) {
  const n = P.nearest(PLACES, lat, lon), tz = n ? ZONES[n.entry[5]] : undefined;
  const c = lat.toFixed(4) + ', ' + lon.toFixed(4);
  const p = n && n.km < 50 ? placeFromEntry(n.entry, lat, lon, tz) : { name: c, lat, lon, tz, names: { it: c, en: c, fr: c, he: c } };
  p.auto = false; p.coords = true;
  return p;
}
function entryPlace(e) { const p = placeFromEntry(e, e[0], e[1]); p.auto = false; return p; }
function searchPlaces(q) {
  const c = parseCoords(q);
  if (c) return [coordPlace(c[0], c[1])];
  const hits = [];
  if (HEB.test(q)) {
    const hq = hnorm(q), sq = skel(q);
    if (hq.length < 2) return [];
    if (!HIDX) HIDX = PLACES.map(e => {
      const x = e[4] || {};
      const forms = [...new Set([P.hebrew(e[2], e[3], x), x.he, x.w, ...(x.q || [])].filter(Boolean).map(hnorm))];
      return [forms, [...new Set(forms.map(skel))]];
    });
    PLACES.forEach((e, i) => {
      let t = tierOf(HIDX[i][0], hq, nofin);
      if (t > 2 && sq && HIDX[i][1].some(k => k.startsWith(sq) || k.includes(' ' + sq))) t = 3;
      if (t < 9) hits.push([t, 0, i]);
    });
  } else {
    const fq = lfold(q).trim();
    if (fq.length < 2) return [];
    if (!IDX) IDX = PLACES.map(e => { const x = e[4] || {}; return [...new Set([e[2], x.it, x.en, x.fr].filter(Boolean).map(lfold))]; });
    IDX.forEach((keys, i) => { const t = tierOf(keys, fq); if (t < 9) hits.push([t, 0, i]); });
  }
  const o = S.home || S.place, k = Math.cos(o.lat * Math.PI / 180);
  for (const h of hits) {
    const e = PLACES[h[2]], km = 111.2 * Math.hypot(e[0] - o.lat, (e[1] - o.lon) * k);
    h[1] = -(e[7] - 10 * Math.log10(1 + km / 100));
  }
  hits.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return hits.slice(0, 10).map(h => entryPlace(PLACES[h[2]]));
}
const placeKey = p => p.name + '|' + p.lat.toFixed(3) + '|' + p.lon.toFixed(3);
function regionName(cc) {
  try { return new Intl.DisplayNames([LOCALE[S.lang]], { type: 'region' }).of(cc) || cc; } catch (e) { return cc || ''; }
}
const placeLabel = p => (p.names && (S.lang === 'he' ? p.names.he || p.names.it : p.names[S.lang])) || placeName(p.name);
const placeMeta = p => {
  const c = p.lat.toFixed(4) + ', ' + p.lon.toFixed(4);
  return p.coords ? (p.name === c ? '' : c) : (p.cc ? regionName(p.cc) : '') + (p.sub ? ' (' + p.sub + ')' : '');
};
// I luoghi salvati prima di questa versione (le 19 città fisse) non hanno names: si prendono dall'elenco
function migratePlaces() {
  const old = p => p && !p.names;
  if (![S.place, S.home].some(old)) return;
  loadPlaces().then(list => {
    const fix = p => {
      if (!old(p)) return p;
      const f = fold(p.name), k = Math.cos(p.lat * Math.PI / 180);
      const e = list.find(e => Math.hypot(e[0] - p.lat, (e[1] - p.lon) * k) < 0.2
        && [e[2], ...['it', 'en', 'fr'].map(l => e[4] && e[4][l])].some(n => n && fold(n) === f));
      if (!e) return p;
      const q = placeFromEntry(e, p.lat, p.lon, p.tz); q.auto = !!p.auto;
      return q;
    };
    S.place = fix(S.place); if (S.home) S.home = fix(S.home);
    save(); render();
  }, () => {});
}

// ---------- Luogo: Israele e Gerusalemme ----------
function inIsrael(lat, lon) {
  // poligono approssimativo; si può forzare dalle impostazioni
  const poly = [[33.33, 35.1], [33.3, 35.62], [32.7, 35.9], [32.3, 35.57], [31.5, 35.48], [29.55, 34.98], [29.5, 34.9], [31.2, 34.27], [31.6, 34.48], [33.1, 35.1]];
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i], [yj, xj] = poly[j];
    if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
function isWalled(lat, lon) {
  const dLat = (lat - 31.7767) * 111, dLon = (lon - 35.2345) * 111 * Math.cos(31.78 * Math.PI / 180);
  return Math.hypot(dLat, dLon) < 6;
}
function opts() {
  const p = S.place;
  const il = S.israel === 'auto' ? inIsrael(p.lat, p.lon) : S.israel === 'on';
  const walled = S.walled === 'auto' ? isWalled(p.lat, p.lon) : S.walled === 'on';
  return { lat: p.lat, lon: p.lon, israel: il, walled, tzethMinutes: +S.tzeth, tequfaMethod: +S.tequfa, dawn: S.dawn };
}

// ---------- Formattazione ----------
function fmtTime(date, kind) {
  let ms = date.getTime();
  if (S.prudent && kind === 'f') ms = Math.floor(ms / 60000) * 60000;
  else if (S.prudent && kind === 'c') ms = Math.ceil(ms / 60000) * 60000;
  else ms = Math.round(ms / 60000) * 60000;
  try {
    return new Date(ms).toLocaleTimeString(LOCALE[S.lang], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: S.place.tz || undefined });
  } catch (e) { return new Date(ms).toTimeString().slice(0, 5); }
}
// Conto alla rovescia verso il prossimo orario: all'istante calcolato, al secondo, non al minuto arrotondato
// mostrato nella riga (scelta del curatore, 2026-11-10)
function cdText(target) {
  const s = Math.max(0, Math.ceil((target - Date.now()) / 1000));
  const p = n => String(n).padStart(2, '0');
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60);
  return `${L().cdIn} <bdi>${h ? h + ':' + p(m) : m}:${p(s % 60)}</bdi>`;
}
function hebDateStr(h) {
  return S.lang === 'he'
    ? E.hebNumeral(h.d) + ' ' + E.monthName(h.m, h.y, 'he') + ' ' + E.hebNumeral(h.y)
    : h.d + ' ' + E.monthName(h.m, h.y, S.lang) + ' ' + h.y;
}
const dayNum = d => (S.lang === 'fr' && d === 1) ? '1er' : d;
function gregStr(g) { return dayNum(g.d) + ' ' + L().months[g.m - 1] + ' ' + g.y; }
function todayRd() {
  const now = new Date();
  let parts;
  try { parts = new Intl.DateTimeFormat('en-CA', { timeZone: S.place.tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(now).split('-'); }
  catch (e) { parts = [now.getFullYear(), now.getMonth() + 1, now.getDate()]; }
  return E.rdFromGreg(+parts[0], +parts[1], +parts[2]);
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- Disegno della giornata ----------
let current = todayRd();
function render() {
  const o = opts();
  document.documentElement.lang = S.lang;
  document.documentElement.dir = S.lang === 'he' ? 'rtl' : 'ltr';
  const r = E.computeDay(current, o);
  const l = L();
  const isToday = current === todayRd();
  const g = r.greg, h = r.heb;
  const wd = E.weekday(current);
  const tomorrow = E.dayInfo(current + 1, o);
  const nextHeb = E.hebFromRd(current + 1);

  let html = '';
  html += `<button class="place" id="placeBtn">${esc(placeName(S.place.name))} · ${o.israel ? l.israelOn : l.diaspora}</button>`;
  if (S.autoLoc && S.away) html += `<button class="back" id="backLoc">${l.backLoc}</button>`;
  html += `<section class="card date"><div class="wd">${l.week[wd]}${cap() ? ' / ' + T.he.week[wd] : ''}</div>
    <div class="big">${isToday ? l.today + ' – ' : ''}${gregStr(g)}</div>
    <div class="heb">${hebDateStr(h)}</div>
    <div class="small">${l.afterSunset}${COLON()} ${hebDateStr(nextHeb)}</div></section>`;

  // Parashà del sabato di questa settimana (o della festa)
  const sat = current + ((6 - wd + 7) % 7);
  const par = E.parashaFor(sat, o.israel);
  const other = E.parashaFor(sat, !o.israel);
  const pHe = p => p ? p.map(i => E.PARASHIYYOTH[i][1]).join('–') : null;
  const pIt = p => p ? p.map(i => roman(E.PARASHIYYOTH[i][0])).join('–') : null;
  html += '<section class="card par">';
  if (par) html += `<div class="label">${l.parasha}</div><div class="parhe" lang="he" dir="rtl">${pHe(par)}</div>${cap() ? `<div class="small">${pIt(par)}</div>` : ''}`;
  else html += `<div class="label">${l.festShabbath}</div>`;
  // Sabati con nome: le quattro parashiyyoṯ (Tefillà 13:20) e Shabbaṯ ha-Gaḏol
  const sp = E.specialParasha(sat);
  if (sp) html += `<div class="diverge"><span lang="he">${E.SPECIAL[sp][1]}</span>${cap() ? ` · ${roman(E.SPECIAL[sp][0])}` : ''}</div>`;
  if (JSON.stringify(par) !== JSON.stringify(other)) {
    const where = o.israel ? l.inDiaspora : l.inIsrael;
    const what = other ? (cap() ? `<span lang="he">${pHe(other)}</span> (${pIt(other)})` : pHe(other)) : l.festReading;
    html += `<div class="diverge">${where}${COLON()} ${what}</div>`;
    // Perché divergono e quando si riallineano: dato di calendario
    const sp2 = E.readingSplit(sat);
    if (sp2) {
      const dj = E.parashaFor(sp2.end, false), pair = cap() ? `<span lang="he">${pHe(dj)}</span> (${pIt(dj)})` : pHe(dj);
      const why = sat === sp2.start ? (sp2.fest === 'pesah' ? l.splitPesah : l.splitShavuoth) + ' ' : '';
      const when = sat === sp2.end ? l.rejoinNow(pair) : l.rejoin(gregStr(E.gregFromRd(sp2.end)), pair);
      html += `<div class="small splitnote">${why}${when}</div>`;
    }
  }
  html += '</section>';

  // Note del giorno
  const notes = [];
  for (const n of r.info.names) notes.push(cap() ? `${n[S.lang]} <span lang="he">${n.he}</span>` : n.he);
  if (r.info.fast) { // lettura dei digiuni (Taʿaniyyoṯ 5:5; Tefillà 13:18)
    const fr = E.fastReading(r.info.fast.key), heb = s => `<span lang="he">${s}</span>`;
    notes.push(`${l.reading}${COLON()} ` + (fr.shahrith === fr.minha ? `${heb(fr.shahrith)} (${l.both})` : `${l.shahrith} ${heb(fr.shahrith)} · ${l.minha} ${heb(fr.minha)}`));
    if (fr.italian) notes.push(l.tammuzNote); // 17 Tammuz: rito italiano, diverso dal MT
  }
  if (r.omerTonight) {
    const n = r.omerTonight, w = Math.floor(n / 7), d = n % 7;
    notes.push(l.omer(n, w, d) + (cap() ? ' <span lang="he">ספירת העמר</span>' : ''));
  }
  if (!r.polar) {
    const na = r.na, yn = v => v ? l.yes : l.no;
    notes.push(na.all ? `${l.na}${COLON()} ${l.naAll}; ${l.naKippurIt}` :
      `${l.na}${COLON()} ${l.shahrith} ${yn(na.shahrith)} · ${l.minha} ${yn(na.minha)}${na.arvith ? ` · ${l.arvithKippur} ${yn(true)}` : ''}${na.variant ? `; ${l.naVar[na.variant]}` : ''}`);
  }
  const rain = r.rain, HL = html => ({ html, hl: true }); // HL: nota evidenziata (un cambio comincia o finisce)
  const heb = s => `<span lang="he">${s}</span>`;
  const lc = s => s[0].toLowerCase() + s.slice(1);
  // Rito italiano: d'estate non si dice nulla, quindi non si mostra nulla
  if (rain.mention) {
    let rainTxt = heb('משיב הרוח ומוריד הגשם');
    if (rain.firstMention) rainTxt += ` (${l.firstMention})`;
    if (rain.lastMention) rainTxt += ` (${l.lastMention})`;
    notes.push(rain.firstMention || rain.lastMention ? HL(rainTxt) : rainTxt);
    // Richiesta (formula del Maḥazor del proprietario, rito italiano antico: d'inverno si aggiunge l'intera frase
    // in Birkaṯ ha-shanim). Come la menzione: solo nei giorni in cui si dice (e la sera prima dell'inizio);
    // la nota in italiano solo nei giorni di cambio.
    if (rain.ask || rain.askTonight) {
      const formula = heb('ותן טל ומטר לברכה על פני האדמה ושבע את העולם מברכותיך');
      const st = rain.askTonight ? l.askTonight : rain.askFirst ? l.askFirst : rain.askLast ? l.askLast : null;
      if (!st) notes.push(formula);
      else {
        const tq = o.israel ? '' : ` (${S.lang === 'he' ? 'תקופה לפי פרק ' + E.hebNumeral(S.tequfa).replace(/[׳״]/g, '') : l.tequfa + ' ' + l.chapter + ' ' + S.tequfa})`;
        notes.push(HL(`${formula}<br>${l.ask}${COLON()} ${st}${tq}`));
      }
    }
  }
  // Aggiunte alla ʿAmiḏà (Tefillà 2:12–13, 2:15, 2:20)
  for (const a of r.amida || []) {
    let body;
    if (a.key === 'tenDays') body = `${heb('המלך הקדוש')} (${l.b3})` + (a.mishpat ? ` · ${heb('המלך המשפט')} (${l.b11}${a.mishpat !== a.scope && a.mishpat !== 'all' ? ', ' + lc(a.mishpat === 'tonight' ? l.scTonight : l.scUntilMinha) : ''})` : '');
    else if (a.key === 'yaale') body = `${heb('יעלה ויבוא')} (${l.aboda})`;
    else body = `${heb('על הנסים')} (${l.hodaya})`;
    if (a.scope === 'all') notes.push(body);
    else notes.push(HL(`${{ tonight: l.scTonight, untilMinha: l.scUntilMinha, untilNeila: l.scUntilNeila }[a.scope]}${COLON()} ${body}`));
  }
  // Digiuni (Tefillà 2:16), formule del rito italiano (Piattelli, che segue il ms. del 1265 e Bologna):
  // il 9 di Aḇ a ʿArḇiṯ, Shaḥriṯ e Minḥà; negli altri digiuni, facoltativi, a Shaḥriṯ e Minḥà per chi digiuna
  // (scelta del proprietario, 2026-11-03).
  const anenu = `${heb('עננו יי עננו')} (${l.anenu})`, rahem = `${heb('רחם יי אלהינו עלינו')} (${l.boneh})`;
  if (tomorrow.fast && tomorrow.fast.key === 'av9') notes.push(HL(`${l.scTonight}${COLON()} ${anenu} · ${rahem}`));
  if (r.info.fast) notes.push(r.info.fast.key === 'av9' ? `${l.both}${COLON()} ${anenu} · ${rahem}` : `${l.ifFast} (${l.both})${COLON()} ${anenu}`);
  // Ḥameṣ: ricerca la sera che apre il 14 Nisan (2:3); se il 14 è Shabbaṯ, giovedì sera, e venerdì si elimina (3:3)
  if (r.hametz && r.hametz.searchTonight) notes.push(HL(l.hamSearch));
  if (r.hametz && r.hametz.beforeShabbath) notes.push(HL(l.hamFriday));
  // Benedizione della luna, la sera che apre il mese (Beraḵoṯ 10:18–19 [16–17])
  if (r.moonFirst) notes.push(HL(l.moonFirst));
  // Ultima sera e ultimo giorno: fino al tramonto che chiude il 15 (lettura adottata dal curatore, 2026-11-10)
  if (r.moonLast) notes.push(HL(r.moonLast === 'tonight' ? l.moonLastEve : l.moonLastDay));
  html += `<section class="notes">${notes.map(n => n.hl ? `<div class="hl">${n.html}</div>` : `<div>${n}</div>`).join('')}</section>`;

  // Orari
  if (r.polar) html += `<p class="small">${l.polar}</p>`;
  else {
    const now = Date.now();
    const list = r.times.slice().sort((a, b) => a.date - b.date);
    const nextIdx = isToday ? list.findIndex(t => t.date.getTime() > now) : -1;
    html += '<section class="times">';
    list.forEach((t, i) => {
      const ham = r.hametz || {};
      const z = ZEMANIM[t.key === 'hametz' && ham.shabbath ? 'hametzShabb' : t.key];
      let extra = '';
      // 14 Nisan (Ḥameṣ u-Maṣṣà 1:8, 1:11 [10]; di Shabbaṯ 3:3)
      if (t.key === 'tefilla' && ham.day) extra = ham.shabbath ? l.hamEatShabb : l.hamEat;
      if (t.key === 'hatzot' && ham.day) extra = l.hamTora;
      // Kippur: Neʿilà si conclude poco prima del tramonto (Tefillà 3:6)
      if (t.key === 'shqia' && r.info.yomKippur) extra = l.neila;
      if (t.key === 'shqia' && (tomorrow.shabbath || tomorrow.yomTov)) extra = tomorrow.shabbath ? l.shabbIn : l.ytIn;
      if (t.key === 'tzeth' && (r.info.shabbath || r.info.yomTov) && !(tomorrow.shabbath || tomorrow.yomTov)) extra = r.info.shabbath ? l.shabbOut : l.ytOut;
      // Lumi di Ḥanukkà, la sera che apre ciascuno degli otto giorni: al tramonto (Meḡillà wa-Ḥanukkà 4:5);
      // il venerdì prima del tramonto e all'uscita dello Shabbaṯ all'uscita delle stelle (scelte del curatore, 2026-11-10)
      if (tomorrow.hanukka) {
        if (t.key === 'shqia' && tomorrow.shabbath) extra += ' · ' + l.hanFriday;
        else if (t.key === 'shqia' && !r.info.shabbath) extra = l.hanLight;
        else if (t.key === 'tzeth' && r.info.shabbath) extra += ' · ' + l.hanLight;
      }
      // I digiuni finiscono all'uscita delle stelle (scelta dell'utente, 2026-11-03)
      if (t.key === 'tzeth' && r.info.fast) extra = (extra ? extra + ' · ' : '') + l.fastOut;
      // Tishʿà be-Aḇ comincia la sera: «בין השמשות שלו, אסור כיום הכיפורים» (Taʿaniyyoṯ 5:7)
      if (t.key === 'shqia' && tomorrow.fast && tomorrow.fast.key === 'av9') extra = (extra ? extra + ' · ' : '') + l.av9In;
      html += `<details class="row${i === nextIdx ? ' next' : ''}"><summary>
        <span class="t">${fmtTime(t.date, z.r)}${i === nextIdx ? ` ◂<span class="cd" id="cd" data-t="${t.date.getTime()}">${cdText(t.date.getTime())}</span>` : ''}</span>
        <span class="z"><span class="zhe" lang="he" dir="rtl">${z.he}</span>${cap() ? `<span class="zit">${z[S.lang]}</span>` : ''}${extra ? `<span class="tag">${extra}</span>` : ''}</span>
        </summary><div class="src">${l.source}${COLON()} ${esc(srcText(z))}${t.key === 'tzeth' ? ` · ${S.tzeth} min` : ''}</div></details>`;
    });
    const hm = r.hourMs / 60000;
    html += `<div class="foot">${l.hour}${COLON()} ${Math.floor(hm)} min ${Math.round((hm % 1) * 60)} s · ${l.zone} ${esc(S.place.tz || '')}</div>`;
    html += '</section>';
  }
  document.getElementById('main').innerHTML = translit(html);
  document.getElementById('placeBtn').onclick = () => openSheet('settings');
  const bl = document.getElementById('backLoc');
  if (bl) bl.onclick = backToLocation;
  document.getElementById('dateInput').value = `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}`;
  document.getElementById('appTitle').textContent = l.title;
  document.getElementById('appSub').textContent = l.subtitle;
  document.getElementById('settingsBtn').textContent = l.settings;
  document.getElementById('todayBtn').textContent = l.today;
  document.title = l.title;
}

// ---------- Impostazioni e note ----------
function seg(name, val, choices) {
  return `<div class="seg" data-name="${name}">${choices.map(([v, t]) => `<button data-v="${v}" class="${String(S[name]) === String(v) ? 'on' : ''}">${t}</button>`).join('')}</div>`;
}
// Luogo scelto con la ricerca o fra i miei luoghi. Con la posizione automatica è un altro luogo da guardare: il luogo
// del telefono si conserva per il ritorno, e la data scelta resta (scelte del curatore, 2026-11-11)
function choosePlace(p) {
  const pl = Object.assign({}, p);
  if (S.autoLoc) { if (!S.away && S.place.auto) S.home = S.place; S.away = true; }
  S.place = pl;
  S.recent = [pl, ...S.recent.filter(r => placeKey(r) !== placeKey(pl))].slice(0, 5);
  save(); if (!S.autoLoc) current = todayRd(); render(); openSheet('settings');
}
function openSheet(which) {
  const l = L();
  const sh = document.getElementById('sheet');
  let html = `<div class="sheethead"><b>${which === 'notes' ? l.notes : which === 'install' ? INSTALL[S.lang].title : l.settings}</b><button id="closeSheet">${l.close}</button></div>`;
  if (which === 'settings') {
    const pl = S.place;
    html += `<h3>${l.place}</h3><p>${esc(placeName(pl.name))} (${pl.lat.toFixed(4)}, ${pl.lon.toFixed(4)})</p>
      <h3>${l.searchLbl}</h3><input class="field" id="pq" type="search" autocomplete="off" autocorrect="off" spellcheck="false" dir="auto" placeholder="${esc(l.searchPh)}"><div id="pres"></div>`;
    if (pl.auto && pl.names) html += `<p class="small">${l.placeNote}</p>
      <label class="small">${l.nameLatin}<input class="field" id="pLat" value="${esc(pl.names[S.lang === 'he' ? 'it' : S.lang] || pl.name)}"></label>
      <label class="small">${l.nameHeb}<input class="field" id="pHeb" dir="rtl" lang="he" value="${esc(pl.names.he || '')}"></label>
      <button class="wide" id="pSave">${l.save}</button>`;
    html += `<button class="wide" id="gps">${l.useGps}</button><p class="small" id="gpsMsg"></p>
      <h3>${l.autoLocLbl}</h3>${seg('autoLoc', S.autoLoc, [[true, l.on], [false, l.off]])}<p class="small">${l.autoLocNote}</p>
      <h3>${l.netLbl}</h3>${seg('netLookup', S.netLookup, [[true, l.on], [false, l.off]])}<p class="small">${l.netNote}</p>
      <h3>${cap() ? l.langLbl2 : l.langLbl}</h3>${seg('lang', S.lang, [['it', 'Italiano'], ['en', 'English'], ['fr', 'Français'], ['he', T.he.hebOnly]])}
      <h3>${l.tzethLbl}</h3>${seg('tzeth', S.tzeth, [[20, '20 min'], [18, '18 min']])}
      <h3>${l.tequfaLbl}</h3>${seg('tequfa', S.tequfa, [[9, `${l.chapter} 9 (365¼)`], [10, `${l.chapter} 10`]])}
      <h3>${l.dawnLbl}</h3>${seg('dawn', S.dawn, [[true, l.on], [false, l.off]])}
      <h3>${l.israelLbl}</h3>${seg('israel', S.israel, [['auto', l.auto], ['on', l.on], ['off', l.off]])}
      <h3>${l.walledLbl}</h3>${seg('walled', S.walled, [['auto', l.auto], ['on', l.on], ['off', l.off]])}
      <h3>${l.prudentLbl}</h3>${seg('prudent', S.prudent, [[true, l.on], [false, l.off]])}
      <h3>${l.translitLbl}</h3>${seg('translit', S.translit, [['digraph', 'kh, th'], ['line', '&#7733;, &#7791;']])}
      <h3>${l.bethLbl}</h3>${seg('beth', S.beth, [['line', '&#7687;'], ['v', 'v']])}
      ${isInstalled() ? '' : `<button class="wide" id="openInstall">${INSTALL[S.lang].title}</button>`}
      <button class="wide" id="openNotes">${l.notes}</button>`;
  } else if (which === 'install') html += installHtml();
  else {
    // Note nella lingua scelta; l'italiano è in notesTpl
    let notes = (document.getElementById('notesTpl-' + S.lang) || document.getElementById('notesTpl')).innerHTML;
    // Nel testo latino ogni citazione ebraica è isolata, altrimenti i numeri che la seguono («…» (10:5 [6])) finiscono nel suo verso
    if (cap()) notes = notes.replace(/[֐-׿](?:[֐-׿ ,]*[֐-׿])?/g, '<bdi>$&</bdi>');
    html += notes;
  }
  sh.innerHTML = translit(html);
  sh.classList.add('open');
  document.getElementById('closeSheet').onclick = () => { sh.classList.remove('open'); render(); };
  sh.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
    const name = b.parentNode.dataset.name; let v = b.dataset.v;
    if (v === 'true') v = true; else if (v === 'false') v = false; else if (/^\d+$/.test(v)) v = +v;
    S[name] = v;
    if (name === 'autoLoc') { S.away = false; delete S.home; }
    save(); render(); openSheet('settings');
    if (name === 'autoLoc' && v) refreshLocation(true);
  });
  // Ricerca dei luoghi: a campo vuoto, i miei luoghi e gli ultimi scelti; scrivendo, i risultati
  const pq = document.getElementById('pq'), pres = document.getElementById('pres');
  if (pq && pres) {
    let pick = [];
    const row = (p, i) => {
      const on = S.saved.some(s => placeKey(s) === placeKey(p));
      return `<div class="prow"><button class="pick" data-i="${i}"><bdi>${esc(placeLabel(p))}</bdi> <span class="meta">${esc(placeMeta(p))}</span></button>`
        + `<button class="star${on ? ' on' : ''}" data-i="${i}" aria-label="${on ? l.starDel : l.starAdd}">${on ? '★' : '☆'}</button></div>`;
    };
    const list = ps => { const o = pick.length; pick = pick.concat(ps); return ps.map((p, i) => row(p, o + i)).join(''); };
    const show = () => {
      const q = pq.value.trim();
      pick = [];
      if (!q) {
        const rec = S.recent.filter(r => !S.saved.some(s => placeKey(s) === placeKey(r)));
        pres.innerHTML = `<p class="small">${l.savedLbl}</p>` + (S.saved.length ? list(S.saved) : `<p class="small">${l.starNote}</p>`)
          + (rec.length ? `<p class="small">${l.recentLbl}</p>` + list(rec) : '');
        wire(); return;
      }
      loadPlaces().then(() => {
        if (pq.value.trim() !== q) return;
        const r = searchPlaces(q);
        pres.innerHTML = r.length ? list(r) : `<p class="small">${q.length < 2 ? '' : l.noRes}</p>`;
        wire();
      }, () => { pres.innerHTML = `<p class="small">${l.noRes}</p>`; });
    };
    const wire = () => {
      pres.querySelectorAll('.pick').forEach(b => b.onclick = () => choosePlace(pick[+b.dataset.i]));
      pres.querySelectorAll('.star').forEach(b => b.onclick = () => {
        const p = pick[+b.dataset.i], k = placeKey(p);
        S.saved = S.saved.some(s => placeKey(s) === k) ? S.saved.filter(s => placeKey(s) !== k) : [...S.saved, p];
        save(); show();
      });
    };
    pq.oninput = show;
    show();
  }
  const gps = document.getElementById('gps');
  if (gps) gps.onclick = () => {
    const msg = document.getElementById('gpsMsg');
    if (!navigator.geolocation) { msg.textContent = l.gpsFail; return; }
    msg.textContent = l.gpsWait;
    navigator.geolocation.getCurrentPosition(p => {
      let tz; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      const lat = p.coords.latitude, lon = p.coords.longitude;
      locate(lat, lon, tz).then(found => {
        S.place = found || { name: 'Posizione attuale', lat, lon, tz, auto: true };
        S.away = false; delete S.home;
        save(); current = todayRd(); render(); openSheet('settings');
      });
    }, () => { msg.textContent = l.gpsFail; }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
  };
  // Correzione a mano del nome trovato: il nome ebraico si rifà dal nome latino finché non lo si tocca
  const pLat = document.getElementById('pLat'), pHeb = document.getElementById('pHeb'), pSave = document.getElementById('pSave');
  if (pLat && pHeb && pSave) {
    let hebTouched = false;
    pHeb.oninput = () => { hebTouched = true; };
    pLat.oninput = () => { if (!hebTouched) pHeb.value = P.hebrew(pLat.value.trim(), S.place.rule, S.place.data) || ''; };
    pSave.onclick = () => {
      const v = pLat.value.trim(); if (!v) return;
      const pl = S.place, old = pl.names[S.lang === 'he' ? 'it' : S.lang] || pl.name;
      if (v !== old) pl.names = { it: v, en: v, fr: v, he: pl.names.he };
      pl.names.he = pHeb.value.trim();
      pl.name = v; pl.edited = true;
      save(); render(); openSheet('settings');
    };
  }
  const on = document.getElementById('openNotes');
  if (on) on.onclick = () => openSheet('notes');
  const oi = document.getElementById('openInstall');
  if (oi) oi.onclick = () => openSheet('install');
}

// ---------- Navigazione ----------
document.getElementById('prev').onclick = () => { current--; render(); };
document.getElementById('next').onclick = () => { current++; render(); };
document.getElementById('todayBtn').onclick = () => { current = todayRd(); render(); };
document.getElementById('settingsBtn').onclick = () => openSheet('settings');
document.getElementById('dateInput').onchange = e => { const [y, m, d] = e.target.value.split('-').map(Number); if (y) { current = E.rdFromGreg(y, m, d); render(); } };
let tx = null;
document.getElementById('main').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
document.getElementById('main').addEventListener('touchend', e => {
  if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 70) { current += (dx < 0 ? 1 : -1) * (S.lang === 'he' ? -1 : 1); render(); }
});
// Posizione automatica (predefinita; scelte del curatore, 2026-11-11): il luogo segue il telefono. La posizione si
// rilegge all'apertura e al ritorno in primo piano; un luogo già preso dal telefono cambia solo oltre 5 km (o se
// cambia il fuso), così il nome non oscilla e un nome corretto a mano resta finché non ci si sposta. Mentre si
// guarda un'altra città (S.away) non si rilegge nulla. Se il permesso è negato, l'impostazione si spegne.
let locBusy = false;
function refreshLocation(force) {
  if (!S.autoLoc || S.away || !navigator.geolocation || locBusy) return;
  locBusy = true;
  navigator.geolocation.getCurrentPosition(p => {
    let tz; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
    const lat = p.coords.latitude, lon = p.coords.longitude, o = S.place, R = Math.PI / 180;
    const a = Math.sin((lat - o.lat) * R / 2) ** 2 + Math.cos(lat * R) * Math.cos(o.lat * R) * Math.sin((lon - o.lon) * R / 2) ** 2;
    const km = 12742 * Math.asin(Math.sqrt(a));
    if (S.away || (o.auto && !force && km <= 5 && (!tz || tz === o.tz))) { locBusy = false; return; }
    locate(lat, lon, tz).then(found => {
      locBusy = false;
      if (S.away || !S.autoLoc) return;
      S.place = found || { name: 'Posizione attuale', lat, lon, tz, auto: true };
      save();
      const open = document.getElementById('sheet').classList.contains('open');
      if (!open || force) { current = todayRd(); render(); }
      if (open && force) openSheet('settings'); // acceso dalle impostazioni: il luogo nuovo si vede subito
    }, () => { locBusy = false; });
  }, e => { locBusy = false; if (e && e.code === 1) { S.autoLoc = false; save(); } },
  { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
}
// Ritorno dalla città guardata al luogo del telefono: subito l'ultimo luogo noto, poi la rilettura
function backToLocation() {
  S.away = false;
  if (S.home) { S.place = S.home; delete S.home; }
  save(); current = todayRd(); render(); refreshLocation();
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refreshLocation(); });
setInterval(() => { if (!document.getElementById('sheet').classList.contains('open')) render(); }, 60000);
// Ogni secondo si aggiorna solo il conto alla rovescia; all'istante dell'orario si ridisegna, e la riga seguente diventa la prossima
setInterval(() => {
  const cd = document.getElementById('cd');
  if (!cd) return;
  if (Date.now() >= +cd.dataset.t) { if (!document.getElementById('sheet').classList.contains('open')) render(); }
  else cd.innerHTML = cdText(+cd.dataset.t);
}, 1000);
render();
migratePlaces();
refreshLocation();

// Lavoratore per l'uso senza rete (funziona solo se la pagina è ospitata normalmente, non come anteprima)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {}
}
})();
