/* Zemannim secondo il Mishné Torà — motore di calcolo.
   Tutto il codice è originale; nessuna dipendenza esterna.
   Calendario ebraico: algoritmi aritmetici standard (Reingold–Dershowitz, "Calendrical Calculations").
   Sole: algoritmo NOAA (Meeus), alba/tramonto a livello del mare, zenit 90°50'. */
(function (root) {
'use strict';

// ---------- Utilità sulle date (RD = Rata Die, 1 = lunedì 1 gennaio dell'anno 1) ----------
const floor = Math.floor;
function mod(a, b) { return a - b * floor(a / b); }
function gregLeap(y) { return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0); }
function rdFromGreg(y, m, d) {
  return 365 * (y - 1) + floor((y - 1) / 4) - floor((y - 1) / 100) + floor((y - 1) / 400)
    + floor((367 * m - 362) / 12) + (m <= 2 ? 0 : (gregLeap(y) ? -1 : -2)) + d;
}
function gregFromRd(rd) {
  const d0 = rd - 1, n400 = floor(d0 / 146097), d1 = mod(d0, 146097);
  const n100 = floor(d1 / 36524), d2 = mod(d1, 36524);
  const n4 = floor(d2 / 1461), d3 = mod(d2, 1461), n1 = floor(d3 / 365);
  let y = 400 * n400 + 100 * n100 + 4 * n4 + n1;
  if (!(n100 === 4 || n1 === 4)) y += 1;
  const prior = rd - rdFromGreg(y, 1, 1);
  const corr = rd < rdFromGreg(y, 3, 1) ? 0 : (gregLeap(y) ? 1 : 2);
  const m = floor((12 * (prior + corr) + 373) / 367);
  return { y, m, d: rd - rdFromGreg(y, m, 1) + 1 };
}
function weekday(rd) { return mod(rd, 7); } // 0 = domenica … 6 = sabato

// ---------- Calendario ebraico (MT, Hilkhoth Qiddush ha-Ḥoḏesh 6–8: calendario fisso) ----------
const EPOCH = -1373427; // RD di 1 Tishrì dell'anno 1
// mesi: 1 Nisan … 6 Elul, 7 Tishrì … 12 Aḏar (Aḏar I negli anni embolismici), 13 Aḏar II
function hLeap(y) { return mod(7 * y + 1, 19) < 7; }
function lastMonth(y) { return hLeap(y) ? 13 : 12; }
function elapsedDays(y) {
  const months = floor((235 * y - 234) / 19);
  const parts = 12084 + 13753 * months;
  const day = 29 * months + floor(parts / 25920);
  return mod(3 * (day + 1), 7) < 3 ? day + 1 : day;
}
function yearCorr(y) {
  const a = elapsedDays(y - 1), b = elapsedDays(y), c = elapsedDays(y + 1);
  if (c - b === 356) return 2;
  if (b - a === 382) return 1;
  return 0;
}
function newYear(y) { return EPOCH + elapsedDays(y) + yearCorr(y); }
function daysInYear(y) { return newYear(y + 1) - newYear(y); }
function monthLen(m, y) {
  const n = daysInYear(y);
  if ([2, 4, 6, 10, 13].includes(m)) return 29;
  if (m === 12 && !hLeap(y)) return 29;
  if (m === 8 && mod(n, 10) !== 5) return 29;
  if (m === 9 && mod(n, 10) === 3) return 29;
  return 30;
}
function rdFromHeb(y, m, d) {
  let rd = newYear(y) + d - 1;
  if (m < 7) {
    for (let k = 7; k <= lastMonth(y); k++) rd += monthLen(k, y);
    for (let k = 1; k < m; k++) rd += monthLen(k, y);
  } else {
    for (let k = 7; k < m; k++) rd += monthLen(k, y);
  }
  return rd;
}
function hebFromRd(rd) {
  const approx = floor((rd - EPOCH) / (35975351 / 98496)) + 1;
  let y = approx - 1;
  while (newYear(y + 1) <= rd) y++;
  const start = rd < rdFromHeb(y, 1, 1) ? 7 : 1;
  let m = start;
  while (rd > rdFromHeb(y, m, monthLen(m, y))) m = (m === lastMonth(y)) ? 1 : m + 1;
  return { y, m, d: rd - rdFromHeb(y, m, 1) + 1 };
}
const MONTHS_HE = { 1: 'ניסן', 2: 'אייר', 3: 'סיון', 4: 'תמוז', 5: 'אב', 6: 'אלול', 7: 'תשרי', 8: 'מרחשון', 9: 'כסלו', 10: 'טבת', 11: 'שבט', 12: 'אדר', 13: 'אדר שני' };
const MONTHS_IT = { 1: 'Nisan', 2: 'Iyyar', 3: 'Siwan', 4: 'Tammuz', 5: 'Aḇ', 6: 'Elul', 7: 'Tishrì', 8: 'Marḥeshwan', 9: 'Kislew', 10: 'Ṭeḇeth', 11: 'Sheḇaṭ', 12: 'Aḏar', 13: 'Aḏar II' };
// Romanizzazione: in italiano le parole tronche hanno l'accento (à, è = segol, é = ṣeré, ì, ò, ù);
// in inglese e francese le stesse forme senza accento (Minḥà → Minḥa)
const sciRoman = s => s.replace(/[àèéìòù]/g, c => ({ 'à': 'a', 'è': 'e', 'é': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u' }[c]));
function monthName(m, y, lang) {
  if (m === 12 && hLeap(y)) return lang === 'he' ? 'אדר ראשון' : 'Aḏar I';
  return (lang === 'he' ? MONTHS_HE : MONTHS_IT)[m];
}
function hebNumeral(n) {
  const ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
  const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
  const hund = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
  n = n % 1000;
  let s = hund[floor(n / 100)];
  let r = n % 100;
  if (r === 15) s += 'טו'; else if (r === 16) s += 'טז'; else s += tens[floor(r / 10)] + ones[r % 10];
  return s.length > 1 ? s.slice(0, -1) + '״' + s.slice(-1) : s + '׳';
}

// ---------- Feste (dipendono da Israele / diaspora) ----------
// Restituisce informazioni sul giorno ebraico (il giorno che inizia la sera precedente).
function dayInfo(rd, opt) {
  const { y, m, d } = hebFromRd(rd);
  const il = !!opt.israel;
  const purimDay = opt.walled ? 15 : 14;
  const adarPurim = hLeap(y) ? 13 : 12;
  const info = { y, m, d, names: [], yomTov: false, holMoed: false, roshHodesh: false, hanukka: false, purim: false, yomKippur: false, roshHashana: false, musaf: false };
  const add = (it, he, en = sciRoman(it), fr = en) => info.names.push({ it, he, en, fr });
  if (m === 7 && (d === 1 || d === 2)) { info.yomTov = info.roshHashana = true; add('Rosh ha-Shanà', 'ראש השנה'); }
  if (m === 7 && d === 10) { info.yomKippur = true; add('Yom ha-Kippurim', 'יום הכפורים'); }
  if (m === 7 && (d === 15 || (!il && d === 16))) { info.yomTov = true; add('Sukkoth', 'סכות'); }
  if (m === 7 && d > (il ? 15 : 16) && d <= 21) { info.holMoed = true; add('Ḥol ha-moʿeḏ Sukkoth', 'חול המועד סכות'); }
  if (m === 7 && d === 22) { info.yomTov = true; add('Sheminì ʿAṣereth', 'שמיני עצרת'); }
  if (m === 7 && d === 23 && !il) { info.yomTov = true; add('Sheminì ʿAṣereth (secondo giorno)', 'שמיני עצרת (יום שני)', 'Shemini ʿAṣereth (second day)', 'Shemini ʿAṣereth (deuxième jour)'); }
  if (m === 1 && (d === 15 || (!il && d === 16))) { info.yomTov = true; add('Pesaḥ', 'פסח'); }
  if (m === 1 && d > (il ? 15 : 16) && d <= 20) { info.holMoed = true; add('Ḥol ha-moʿeḏ Pesaḥ', 'חול המועד פסח'); }
  if (m === 1 && (d === 21 || (!il && d === 22))) { info.yomTov = true; add('Pesaḥ (ultimi giorni)', 'שביעי של פסח', 'Pesaḥ (last days)', 'Pesaḥ (derniers jours)'); }
  if (m === 3 && (d === 6 || (!il && d === 7))) { info.yomTov = true; add('Shaḇuʿoth', 'שבועות'); }
  if ((d === 1 && m !== 7) || d === 30) { info.roshHodesh = true; add('Rosh Ḥoḏesh', 'ראש חדש'); }
  const hanStart = rdFromHeb(y, 9, 25);
  const hy = (m >= 7) ? y : y - 1; // Ḥanukkà cade in Kislew/Ṭeḇeth dell'anno che inizia a Tishrì
  const hs = rdFromHeb(hy, 9, 25);
  if (rd >= hs && rd < hs + 8) {
    const n = rd - hs + 1;
    info.hanukka = true; add('Ḥanukkà, ' + n + '° giorno', 'חנכה', 'Ḥanukka, day ' + n, 'Ḥanukka, ' + (n === 1 ? '1er' : n + 'e') + ' jour');
  }
  if (m === adarPurim && d === purimDay) { info.purim = true; add('Purim', 'פורים'); }
  info.shabbath = weekday(rd) === 6;
  info.musaf = info.shabbath || info.yomTov || info.holMoed || info.roshHodesh || info.yomKippur;
  return info;
}

// ---------- Parashiyyoth (lettura annuale; MT Tefillà 13:1) ----------
const PARASHIYYOTH = [
  ['Bereshith', 'בראשית'], ['Noaḥ', 'נח'], ['Lekh lekhà', 'לך לך'], ['Wayyerà', 'וירא'], ['Ḥayyé Sarà', 'חיי שרה'],
  ['Toleḏoth', 'תולדות'], ['Wayyeṣé', 'ויצא'], ['Wayyishlaḥ', 'וישלח'], ['Wayyesheḇ', 'וישב'], ['Miqqeṣ', 'מקץ'],
  ['Wayyiggash', 'ויגש'], ['Wayḥì', 'ויחי'], ['Shemoth', 'שמות'], ['Waerà', 'וארא'], ['Bo', 'בא'],
  ['Beshallaḥ', 'בשלח'], ['Yithrò', 'יתרו'], ['Mishpaṭim', 'משפטים'], ['Terumà', 'תרומה'], ['Teṣawwè', 'תצוה'],
  ['Ki thissà', 'כי תשא'], ['Wayyaqhel', 'ויקהל'], ['Pequḏé', 'פקודי'], ['Wayyiqrà', 'ויקרא'], ['Ṣaw', 'צו'],
  ['Sheminì', 'שמיני'], ['Tazriaʿ', 'תזריע'], ['Meṣoraʿ', 'מצורע'], ['Aḥaré moth', 'אחרי מות'], ['Qeḏoshim', 'קדשים'],
  ['Emor', 'אמר'], ['Behar', 'בהר'], ['Beḥuqqothay', 'בחקתי'], ['Bemiḏbar', 'במדבר'], ['Nasò', 'נשא'],
  ['Behaʿalothekhà', 'בהעלתך'], ['Shelaḥ lekhà', 'שלח לך'], ['Qoraḥ', 'קרח'], ['Ḥuqqath', 'חקת'], ['Balaq', 'בלק'],
  ['Pineḥas', 'פינחס'], ['Maṭṭoth', 'מטות'], ['Masʿé', 'מסעי'], ['Deḇarim', 'דברים'], ['Waethḥannan', 'ואתחנן'],
  ['ʿEqeḇ', 'עקב'], ['Reʾé', 'ראה'], ['Shofeṭim', 'שופטים'], ['Ki theṣé', 'כי תצא'], ['Ki thaḇò', 'כי תבוא'],
  ['Niṣṣaḇim', 'נצבים'], ['Wayyelekh', 'וילך'], ['Haazinu', 'האזינו'], ['We-zoth ha-berakhà', 'וזאת הברכה']
];
// Accento sulle tronche secondo gli accenti masoretici dei versetti (Haazinu è piana: הַאֲזִ֥ינוּ; Bo è monosillabo).

function isFestivalShabbath(rd, il) {
  const i = dayInfo(rd, { israel: il });
  return i.yomTov || i.holMoed || i.yomKippur;
}
function nextSat(rd) { return rd + mod(6 - weekday(rd), 7); }
function prevSatOnOrBefore(rd) { return rd - mod(weekday(rd) - 6, 7); }
function slots(fromRd, toRd, il) { // sabati non festivi, inclusi gli estremi
  const out = [];
  for (let s = nextSat(fromRd); s <= toRd; s += 7) if (!isFestivalShabbath(s, il)) out.push(s);
  return out;
}
const sedraCache = new Map();
// Ciclo che inizia con Bereshith dopo Simḥath Torà dell'anno y (Tishrì y … Elul y).
// Si legge una parashà per sabato non festivo; si uniscono due parashiyyoth (solo le coppie consuete)
// il più tardi possibile (in Israele, tra Pesaḥ e Shaḇuʿoth, il prima possibile), quando altrimenti non si arriverebbe in tempo ai punti fissi:
// Ṣaw (anno semplice) / Meṣoraʿ (anno embolismico) prima di Pesaḥ; Bemiḏbar prima di Shaḇuʿoth;
// Deḇarim nel sabato prima del 9 di Aḇ; Niṣṣaḇim nel sabato prima di Rosh ha-Shanà.
const PAIRS = [21, 26, 28, 31, 38, 41];
function sedraCycle(y, il) {
  const key = y + (il ? 'i' : 'd');
  if (sedraCache.has(key)) return sedraCache.get(key);
  const start = rdFromHeb(y, 7, il ? 23 : 24);
  const pesah = rdFromHeb(y, 1, 15), shavuot = rdFromHeb(y, 3, 6);
  const av9 = rdFromHeb(y, 5, 9), rh = rdFromHeb(y + 1, 7, 1), sukkot = rdFromHeb(y + 1, 7, 15);
  const leap = hLeap(y);
  const s = slots(start, rh - 1, il);
  const post = slots(rh, sukkot - 1, il);
  const lastBefore = lim => { let j = -1; s.forEach((x, i) => { if (x < lim) j = i; }); return j; };
  const deadlines = [
    { slot: lastBefore(pesah), target: leap ? 27 : 24 },
    { slot: lastBefore(shavuot), target: 33, early: il },
    { slot: lastBefore(av9 + 1), target: 43 },
    { slot: s.length - 1, target: 50 }
  ];
  const map = new Map();
  let k = 0;
  for (let i = 0; i < s.length && k <= 50; i++) {
    let combine = false;
    if (PAIRS.includes(k)) {
      for (const D of deadlines) {
        if (D.slot < i || k + 1 > D.target) continue;
        const excess = (D.target - k + 1) - (D.slot - i + 1);
        const later = PAIRS.filter(c => c > k && c + 1 <= D.target).length;
        if (excess > (D.early && k > deadlines[0].target ? 0 : later)) { combine = true; break; }
      }
    }
    if (combine) { map.set(s[i], [k, k + 1]); k += 2; } else { map.set(s[i], [k]); k += 1; }
  }
  // dopo Rosh ha-Shanà: Wayyelekh e Haazinu, oppure solo Haazinu (Niṣṣaḇim–Wayyelekh uniti)
  const lastSat = s[s.length - 1];
  if (post.length >= 2) { map.set(post[0], [51]); map.set(post[1], [52]); }
  else if (post.length === 1) { map.set(lastSat, [50, 51]); map.set(post[0], [52]); }
  sedraCache.set(key, map);
  return map;
}
function parashaFor(rd, il) { // rd di un sabato
  const { y, m } = hebFromRd(rd);
  for (const yy of [y, y - 1]) {
    const mp = sedraCycle(yy, il);
    if (mp.has(rd)) return mp.get(rd);
  }
  return null;
}

// ---------- Sole (NOAA) ----------
const RAD = Math.PI / 180;
function sunEvent(rd, lat, lon, rising, zenith) {
  // restituisce minuti UTC dalla mezzanotte UTC del giorno civile rd (iterazione su JD)
  const jd0 = rd + 1721424.5; // JD alla mezzanotte UTC
  let t = rising ? 360 : 1080; // stima in minuti UTC
  for (let i = 0; i < 3; i++) {
    const jd = jd0 + t / 1440;
    const T = (jd - 2451545) / 36525;
    const L0 = mod(280.46646 + T * (36000.76983 + 0.0003032 * T), 360);
    const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
    const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
    const C = Math.sin(M * RAD) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(2 * M * RAD) * (0.019993 - 0.000101 * T) + Math.sin(3 * M * RAD) * 0.000289;
    const omega = 125.04 - 1934.136 * T;
    const lambda = L0 + C - 0.00569 - 0.00478 * Math.sin(omega * RAD);
    const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
    const eps = eps0 + 0.00256 * Math.cos(omega * RAD);
    const decl = Math.asin(Math.sin(eps * RAD) * Math.sin(lambda * RAD)) / RAD;
    const yv = Math.tan(eps / 2 * RAD) ** 2;
    const eqt = 4 / RAD * (yv * Math.sin(2 * L0 * RAD) - 2 * e * Math.sin(M * RAD) + 4 * e * yv * Math.sin(M * RAD) * Math.cos(2 * L0 * RAD) - 0.5 * yv * yv * Math.sin(4 * L0 * RAD) - 1.25 * e * e * Math.sin(2 * M * RAD));
    if (zenith === null) { t = 720 - 4 * lon - eqt; continue; } // transito
    const cosH = (Math.cos(zenith * RAD) / (Math.cos(lat * RAD) * Math.cos(decl * RAD))) - Math.tan(lat * RAD) * Math.tan(decl * RAD);
    if (cosH > 1 || cosH < -1) return null;
    const H = Math.acos(cosH) / RAD;
    t = 720 - 4 * (lon + (rising ? H : -H)) - eqt;
  }
  return t;
}
function toDate(rd, minutesUtc) {
  const g = gregFromRd(rd);
  return new Date(Date.UTC(g.y, g.m - 1, g.d, 0, 0, 0) + minutesUtc * 60000);
}
function sunrise(rd, lat, lon) { const t = sunEvent(rd, lat, lon, true, 90.833); return t === null ? null : toDate(rd, t); }
function sunset(rd, lat, lon) { const t = sunEvent(rd, lat, lon, false, 90.833); return t === null ? null : toDate(rd, t); }

// ---------- Tequfà di Tishrì (MT Qiddush ha-Ḥoḏesh 9 e 10) ----------
const PART = 1 / 25920; // un ḥeleq in giorni
function moladNisanRd(y) { // molad di Nisan dell'anno y, in giorni RD (ora di Gerusalemme, da mezzanotte)
  const months = floor((235 * y - 234) / 19) + (hLeap(y) ? 7 : 6);
  return EPOCH - 876 / 25920 + months * (29 + 13753 / 25920);
}
function tequfaTishri(y, method) { // tequfà di Tishrì che segue il Nisan dell'anno y
  // cap. 9: anno di 365¼ giorni; tequfà di Nisan dell'anno 1 = 7g 9h 642p prima del molad di Nisan (9:3)
  // cap. 10: anno di 365g 5h 997p 48r; tequfà di Nisan dell'anno 1 = 9h 642p prima del molad di Nisan (10:3)
  const yearLen = method === 10 ? 365 + 5 / 24 + 997 * PART + 48 / 76 * PART : 365.25;
  const off = method === 10 ? 9 / 24 + 642 * PART : 7 + 9 / 24 + 642 * PART;
  const t1 = moladNisanRd(1) - off;
  return t1 + (y - 1) * yearLen + yearLen / 2; // valore RD frazionario (ora media di Gerusalemme)
}
// Primo giorno (RD civile) in cui si chiede la pioggia nella diaspora: 60° giorno contando il giorno della tequfà come 1°.
function sheelaStartDiaspora(hy, method) { // hy = anno che inizia a Tishrì
  return floor(tequfaTishri(hy - 1, method)) + 59;
}

// ---------- Calcolo della giornata ----------
function computeDay(rd, opt) {
  const { lat, lon } = opt;
  const sr = sunrise(rd, lat, lon), ss = sunset(rd, lat, lon);
  const srNext = sunrise(rd + 1, lat, lon), ssPrev = sunset(rd - 1, lat, lon);
  const info = dayInfo(rd, opt);
  const res = { rd, greg: gregFromRd(rd), heb: hebFromRd(rd), info, times: [], polar: !(sr && ss) };
  if (res.polar) return res;
  const dayMs = ss - sr, hour = dayMs / 12;
  const at = h => new Date(sr.getTime() + h * hour);
  const tz = opt.tzethMinutes;
  const T = (key, date, extra) => res.times.push(Object.assign({ key, date }, extra || {}));
  if (opt.dawn !== false) T('alot', new Date(sr.getTime() - 1.2 * hour));
  T('netz', sr);
  T('shema', at(3));
  T('tefilla', at(4));
  if (info.musaf) T('musaf', at(7));
  T('hatzot', at(6));
  T('minhaG', at(6.5));
  T('minhaQ', at(9.5));
  T('plag', at(10.75));
  T('shqia', ss);
  T('tzeth', new Date(ss.getTime() + tz * 60000));
  T('hatzotLayla', new Date(ss.getTime() + (srNext - ss) / 2));
  res.hourMs = hour;
  res.sunrise = sr; res.sunset = ss;

  // Nefilath appayim (MT Tefillà 5:16 [15])
  const tomorrow = dayInfo(rd + 1, opt);
  const festive = info.shabbath || info.yomTov || info.holMoed || info.roshHashana || info.roshHodesh || info.hanukka || info.purim;
  // Vigilia di Kippur esclusa: non è tra i «ימים טובים» (Sheḇithath Yom Ṭoḇ 1:1)
  const ereb = tomorrow.shabbath || tomorrow.yomTov;
  // ʿArvith appartiene al giorno ebraico che comincia la sera: si fa solo la sera che apre Yom ha-Kippurim.
  res.na = info.yomKippur ? { all: true, shahrith: true, minha: true, arvith: false } :
    { shahrith: !festive, minha: !festive && !ereb, arvith: tomorrow.yomKippur };

  // Pioggia (Tefillà 2:17–19; formula secondo il rito italiano)
  const { y, m, d } = res.heb;
  // L'anno y comincia a Tishrì: Nisan–Elul di y vengono dopo Tishrì–Aḏar dello stesso y
  const startMention = rdFromHeb(y, 7, 22);   // Musaf di Sheminì ʿAṣereth
  const endMention = rdFromHeb(y, 1, 15);     // fino a Shaḥrith del 1° giorno di Pesaḥ
  const mention = rd >= startMention && rd <= endMention;
  const askStart = opt.israel ? rdFromHeb(y, 8, 7) : sheelaStartDiaspora(y, opt.tequfaMethod);
  const ask = rd >= askStart && rd < endMention;
  res.rain = { mention, firstMention: rd === startMention, lastMention: rd === endMention, ask, askStart };
  return res;
}

const api = { sciRoman, rdFromGreg, gregFromRd, weekday, hebFromRd, rdFromHeb, hLeap, monthName, hebNumeral, dayInfo, parashaFor, PARASHIYYOTH, sunrise, sunset, tequfaTishri, sheelaStartDiaspora, computeDay, monthLen, newYear };
if (typeof module !== 'undefined') module.exports = api; else root.MTEngine = api;
})(this);
