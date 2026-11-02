/* Interfaccia — Zemannim secondo il Mishne Tora */
(function () {
'use strict';
const E = window.MTEngine;

// ---------- Impostazioni (salvate sul dispositivo, se possibile) ----------
const DEFAULTS = {
  lang: 'it', tzeth: 20, tequfa: 9, dawn: true, israel: 'auto', walled: 'auto', prudent: true,
  place: { name: 'Ferrara', lat: 44.8378, lon: 11.6198, tz: 'Europe/Rome' }
};
let S = Object.assign({}, DEFAULTS);
try { const raw = localStorage.getItem('mt-zemanim'); if (raw) S = Object.assign({}, DEFAULTS, JSON.parse(raw)); } catch (e) {}
function save() { try { localStorage.setItem('mt-zemanim', JSON.stringify(S)); } catch (e) {} }

const CITIES = [
  ['Ferrara', 44.8378, 11.6198, 'Europe/Rome'], ['Torino', 45.0703, 7.6869, 'Europe/Rome'],
  ['Padova', 45.4064, 11.8768, 'Europe/Rome'], ['Altavilla Vicentina', 45.5122, 11.4667, 'Europe/Rome'],
  ['Venezia', 45.4408, 12.3155, 'Europe/Rome'], ['Bologna', 44.4949, 11.3426, 'Europe/Rome'],
  ['Milano', 45.4642, 9.19, 'Europe/Rome'], ['Roma', 41.8925, 12.4853, 'Europe/Rome'],
  ['Firenze', 43.7696, 11.2558, 'Europe/Rome'], ['Livorno', 43.5485, 10.3106, 'Europe/Rome'],
  ['Trieste', 45.6495, 13.7768, 'Europe/Rome'], ['Napoli', 40.8518, 14.2681, 'Europe/Rome'],
  ['Londra', 51.5072, -0.1276, 'Europe/London'], ['Coventry', 52.4068, -1.5197, 'Europe/London'],
  ['Parigi', 48.8566, 2.3522, 'Europe/Paris'],
  ['Gerusalemme', 31.7767, 35.2345, 'Asia/Jerusalem'], ['Tel Aviv', 32.0853, 34.7818, 'Asia/Jerusalem'],
  ['Seul', 37.5665, 126.978, 'Asia/Seoul'], ['New York', 40.7128, -74.006, 'America/New_York']
];

// ---------- Testi ----------
const T = {
  it: {
    title: 'Zemannim secondo il Mishne Tora', today: 'Oggi', week: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'],
    months: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    afterSunset: 'Dopo il tramonto', parasha: 'Parashà della settimana', festShabbath: 'Sabato festivo: lettura della festa',
    na: 'Nefilath appayim', shahrith: 'Shaḥrith', minha: 'Minḥà', arvith: 'ʿArvith', yes: 'sì', no: 'no',
    rainMention: 'Seconda benedizione', rainSummer: 'd’estate non si dice nulla', ask: 'Richiesta della pioggia',
    askYes: 'sì', askNo: 'non ancora', askFrom: 'dal', hour: 'Ora stagionale', settings: 'Impostazioni', notes: 'Note sulle scelte',
    close: 'Chiudi', place: 'Luogo', useGps: 'Usa la mia posizione', gpsFail: 'Posizione non disponibile in questa pagina: scegli una città.',
    gpsWait: 'Ricerca della posizione…', manual: 'Coordinate', apply: 'Applica', tzethLbl: 'Ṣeth ha-kokhavim (fine dello Shabbath)',
    tequfaLbl: 'Tequfa per la richiesta della pioggia (diaspora)', dawnLbl: 'Mostra ʿalòth ha-shaḥar', israelLbl: 'Terra d’Israele',
    walledLbl: 'Città murata (Purim il 15)', auto: 'automatico', on: 'sì', off: 'no', prudentLbl: 'Arrotondamento prudente',
    langLbl: 'Lingua', zone: 'Orari nel fuso', shabbIn: 'Inizio dello Shabbath', shabbOut: 'Fine dello Shabbath',
    ytIn: 'Inizio della festa', ytOut: 'Fine della festa', source: 'Fonte', polar: 'In questo luogo e giorno il sole non sorge o non tramonta.',
    firstMention: 'da Musaf si comincia a dire', lastMention: 'si dice fino a Shaḥrith; da Musaf non si dice più', israelOn: 'Israele', diaspora: 'diaspora', inIsrael: 'In Israele', naAll: 'in ogni preghiera', arvithKippur: 'ʿArvith (sera di Kippur)', inDiaspora: 'Nella diaspora', festReading: 'lettura della festa'
  },
  he: {
    title: 'זמנים על פי משנה תורה', today: 'היום', week: ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'שבת'],
    months: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'],
    afterSunset: 'אחר השקיעה', parasha: 'פרשת השבוע', festShabbath: 'שבת של מועד: קריאת המועד',
    na: 'נפילת אפים', shahrith: 'שחרית', minha: 'מנחה', arvith: 'ערבית', yes: 'כן', no: 'לא',
    rainMention: 'ברכה שנייה', rainSummer: 'בימות החמה אין אומרים כלום', ask: 'שאלת גשמים',
    askYes: 'כן', askNo: 'עדיין לא', askFrom: 'מ־', hour: 'שעה זמנית', settings: 'הגדרות', notes: 'הערות על הבחירות (באיטלקית)',
    close: 'סגור', place: 'מקום', useGps: 'השתמש במיקום שלי', gpsFail: 'המיקום אינו זמין בדף זה: בחר עיר.',
    gpsWait: 'מחפש מיקום…', manual: 'קואורדינטות', apply: 'החל', tzethLbl: 'צאת הכוכבים (מוצאי שבת)',
    tequfaLbl: 'תקופה לשאלת גשמים (חוץ לארץ)', dawnLbl: 'הצג עלות השחר', israelLbl: 'ארץ ישראל',
    walledLbl: 'עיר מוקפת חומה (פורים בט״ו)', auto: 'אוטומטי', on: 'כן', off: 'לא', prudentLbl: 'עיגול לחומרא',
    langLbl: 'שפה', zone: 'שעות לפי אזור הזמן', shabbIn: 'כניסת שבת', shabbOut: 'יציאת שבת',
    ytIn: 'כניסת יום טוב', ytOut: 'יציאת יום טוב', source: 'מקור', polar: 'במקום וביום זה החמה אינה זורחת או אינה שוקעת.',
    firstMention: 'מתחילים במוסף', lastMention: 'אומרים עד שחרית; ממוסף אין אומרים', israelOn: 'ארץ ישראל', diaspora: 'חוץ לארץ', inIsrael: 'בארץ ישראל', naAll: 'בכל תפלה ותפלה', arvithKippur: 'ערבית (ליל יום הכפורים)', inDiaspora: 'בחוץ לארץ', festReading: 'קריאת המועד'
  }
};
const L = () => T[S.lang];

// Voci della lista: etichetta ebraica, didascalia italiana, fonte, tipo di arrotondamento
const ZEMANIM = {
  alot:    { he: 'עלות השחר', it: 'Spuntare dell’alba', src: 'Rambam, Comm. alla Mishna, Berakhoth 1:1 (non MT): 1⅕ ore stagionali prima del sorgere', r: 'n' },
  netz:    { he: 'הנץ החמה', it: 'Sorgere del sole', src: 'MT Qeriath Shemaʿ 1:12; Tefilla 3:1', r: 'n' },
  shema:   { he: 'סוף זמן קריאת שמע', it: 'Fine dello Shemaʿ del mattino (3 ore)', src: 'MT Qeriath Shemaʿ 1:12–14', r: 'f' },
  tefilla: { he: 'סוף זמן תפלת השחר', it: 'Fine di Shaḥrith (4 ore)', src: 'MT Tefilla 3:1', r: 'f' },
  hatzot:  { he: 'חצות היום', it: 'Mezzogiorno (6 ore)', src: 'MT Tefilla 3:9 («חצי היום»)', r: 'n' },
  minhaG:  { he: 'מנחה גדולה', it: 'Minḥà gedolà (6½ ore)', src: 'MT Tefilla 3:2, 3:4', r: 'c' },
  musaf:   { he: 'סוף זמן תפלת המוספין', it: 'Fine di Musaf (7 ore)', src: 'MT Tefilla 3:5', r: 'f' },
  minhaQ:  { he: 'מנחה קטנה', it: 'Minḥà qetannà (9½ ore)', src: 'MT Tefilla 3:2, 3:4', r: 'c' },
  plag:    { he: 'שעה ורביע קודם השקיעה', it: 'Fine della minḥà qetannà, 1¼ ore prima del tramonto (si può pregare fino al tramonto)', src: 'MT Tefilla 3:4', r: 'f' },
  shqia:   { he: 'שקיעת החמה', it: 'Tramonto', src: 'MT Shabbath 5:3–4; Tefilla 3:4', r: 'f' },
  tzeth:   { he: 'צאת הכוכבים', it: 'Uscita delle stelle', src: 'MT Terumoth 7:2 («כמו שליש שעה אחר שקיעת החמה»); Shabbath 5:4', r: 'c' },
  hatzotLayla: { he: 'חצות הלילה', it: 'Mezzanotte (fine preferibile dello Shemaʿ della sera)', src: 'MT Qeriath Shemaʿ 1:10; calcolata a metà fra tramonto e sorgere', r: 'n' }
};

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
    return new Date(ms).toLocaleTimeString(S.lang === 'he' ? 'he-IL' : 'it-IT', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: S.place.tz || undefined });
  } catch (e) { return new Date(ms).toTimeString().slice(0, 5); }
}
function hebDateStr(h) {
  return S.lang === 'he'
    ? E.hebNumeral(h.d) + ' ' + E.monthName(h.m, h.y, 'he') + ' ' + E.hebNumeral(h.y)
    : h.d + ' ' + E.monthName(h.m, h.y, 'it') + ' ' + h.y;
}
function gregStr(g) { return g.d + ' ' + L().months[g.m - 1] + ' ' + g.y; }
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
  html += `<button class="place" id="placeBtn">${esc(S.place.name)} · ${o.israel ? l.israelOn : l.diaspora}</button>`;
  html += `<section class="card date"><div class="wd">${l.week[wd]}${S.lang === 'it' ? ' / ' + T.he.week[wd] : ''}</div>
    <div class="big">${isToday ? l.today + ' – ' : ''}${gregStr(g)}</div>
    <div class="heb">${hebDateStr(h)}</div>
    <div class="small">${l.afterSunset}: ${hebDateStr(nextHeb)}</div></section>`;

  // Parashà del sabato di questa settimana (o della festa)
  const sat = current + ((6 - wd + 7) % 7);
  const par = E.parashaFor(sat, o.israel);
  const other = E.parashaFor(sat, !o.israel);
  const pHe = p => p ? p.map(i => E.PARASHOTH[i][1]).join('–') : null;
  const pIt = p => p ? p.map(i => E.PARASHOTH[i][0]).join('–') : null;
  html += '<section class="card par">';
  if (par) html += `<div class="label">${l.parasha}</div><div class="parhe" lang="he" dir="rtl">${pHe(par)}</div>${S.lang === 'it' ? `<div class="small">${pIt(par)}</div>` : ''}`;
  else html += `<div class="label">${l.festShabbath}</div>`;
  if (JSON.stringify(par) !== JSON.stringify(other)) {
    const where = o.israel ? l.inDiaspora : l.inIsrael;
    const what = other ? (S.lang === 'it' ? `<span lang="he">${pHe(other)}</span> (${pIt(other)})` : pHe(other)) : l.festReading;
    html += `<div class="diverge">${where}: ${what}</div>`;
  }
  html += '</section>';

  // Note del giorno
  const notes = [];
  for (const n of r.info.names) notes.push(S.lang === 'he' ? n.he : `${n.it} <span lang="he">${n.he}</span>`);
  if (!r.polar) {
    const na = r.na, yn = v => v ? l.yes : l.no;
    notes.push(na.all ? `${l.na}: ${l.naAll}` :
      `${l.na}: ${l.shahrith} ${yn(na.shahrith)} · ${l.minha} ${yn(na.minha)}${na.arvith ? ` · ${l.arvithKippur} ${yn(true)}` : ''}`);
  }
  const rain = r.rain;
  let rainTxt = rain.mention ? '<span lang="he">משיב הרוח ומוריד הגשם</span>' : l.rainSummer;
  if (rain.firstMention) rainTxt += ` (${l.firstMention})`;
  if (rain.lastMention) rainTxt += ` (${l.lastMention})`;
  notes.push(`${l.rainMention}: ${rainTxt}`);
  if (rain.mention) {
    const af = E.gregFromRd(rain.askStart);
    notes.push(`${l.ask}: ${rain.ask ? l.askYes : l.askNo} (${l.askFrom} ${af.d} ${l.months[af.m - 1]}${o.israel ? '' : (S.lang === 'he' ? ', תקופה לפי פרק ' + E.hebNumeral(S.tequfa).replace(/[׳״]/g, '') : ', tequfa cap. ' + S.tequfa)})`);
  }
  html += `<section class="notes">${notes.map(n => `<div>${n}</div>`).join('')}</section>`;

  // Orari
  if (r.polar) html += `<p class="small">${l.polar}</p>`;
  else {
    const now = Date.now();
    const list = r.times.slice().sort((a, b) => a.date - b.date);
    const nextIdx = isToday ? list.findIndex(t => t.date.getTime() > now) : -1;
    html += '<section class="times">';
    list.forEach((t, i) => {
      const z = ZEMANIM[t.key];
      let extra = '';
      if (t.key === 'shqia' && (tomorrow.shabbath || tomorrow.yomTov)) extra = tomorrow.shabbath ? l.shabbIn : l.ytIn;
      if (t.key === 'tzeth' && (r.info.shabbath || r.info.yomTov) && !(tomorrow.shabbath || tomorrow.yomTov)) extra = r.info.shabbath ? l.shabbOut : l.ytOut;
      const kind = (t.key === 'tzeth' && extra) ? 'c' : z.r;
      html += `<details class="row${i === nextIdx ? ' next' : ''}"><summary>
        <span class="t">${fmtTime(t.date, kind)}${i === nextIdx ? ' ◂' : ''}</span>
        <span class="z"><span class="zhe" lang="he" dir="rtl">${z.he}</span>${S.lang === 'it' ? `<span class="zit">${z.it}</span>` : ''}${extra ? `<span class="tag">${extra}</span>` : ''}</span>
        </summary><div class="src">${l.source}: ${esc(z.src)}${t.key === 'tzeth' ? ` · ${S.tzeth} min` : ''}</div></details>`;
    });
    const hm = r.hourMs / 60000;
    html += `<div class="foot">${l.hour}: ${Math.floor(hm)}m ${Math.round((hm % 1) * 60)}s · ${l.zone} ${esc(S.place.tz || '')}</div>`;
    html += '</section>';
  }
  document.getElementById('main').innerHTML = html;
  document.getElementById('placeBtn').onclick = () => openSheet('settings');
  document.getElementById('dateInput').value = `${g.y}-${String(g.m).padStart(2, '0')}-${String(g.d).padStart(2, '0')}`;
  document.getElementById('appTitle').textContent = l.title;
  document.getElementById('settingsBtn').textContent = l.settings;
  document.getElementById('todayBtn').textContent = l.today;
}

// ---------- Impostazioni e note ----------
function seg(name, val, choices) {
  return `<div class="seg" data-name="${name}">${choices.map(([v, t]) => `<button data-v="${v}" class="${String(S[name]) === String(v) ? 'on' : ''}">${t}</button>`).join('')}</div>`;
}
function openSheet(which) {
  const l = L();
  const sh = document.getElementById('sheet');
  let html = `<div class="sheethead"><b>${which === 'notes' ? l.notes : l.settings}</b><button id="closeSheet">${l.close}</button></div>`;
  if (which === 'settings') {
    html += `<h3>${l.place}</h3><p>${esc(S.place.name)} (${S.place.lat.toFixed(4)}, ${S.place.lon.toFixed(4)})</p>
      <button class="wide" id="gps">${l.useGps}</button><p class="small" id="gpsMsg"></p>
      <select id="city">${CITIES.map((c, i) => `<option value="${i}" ${c[0] === S.place.name ? 'selected' : ''}>${c[0]}</option>`).join('')}</select>
      <h3>${l.langLbl}</h3>${seg('lang', S.lang, [['it', 'Italiano'], ['he', 'עברית']])}
      <h3>${l.tzethLbl}</h3>${seg('tzeth', S.tzeth, [[20, '20 min'], [18, '18 min']])}
      <h3>${l.tequfaLbl}</h3>${seg('tequfa', S.tequfa, [[9, 'cap. 9 (365¼)'], [10, 'cap. 10']])}
      <h3>${l.dawnLbl}</h3>${seg('dawn', S.dawn, [[true, l.on], [false, l.off]])}
      <h3>${l.israelLbl}</h3>${seg('israel', S.israel, [['auto', l.auto], ['on', l.on], ['off', l.off]])}
      <h3>${l.walledLbl}</h3>${seg('walled', S.walled, [['auto', l.auto], ['on', l.on], ['off', l.off]])}
      <h3>${l.prudentLbl}</h3>${seg('prudent', S.prudent, [[true, l.on], [false, l.off]])}
      <button class="wide" id="openNotes">${l.notes}</button>`;
  } else html += document.getElementById('notesTpl').innerHTML;
  sh.innerHTML = html;
  sh.classList.add('open');
  document.getElementById('closeSheet').onclick = () => sh.classList.remove('open');
  sh.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
    const name = b.parentNode.dataset.name; let v = b.dataset.v;
    if (v === 'true') v = true; else if (v === 'false') v = false; else if (/^\d+$/.test(v)) v = +v;
    S[name] = v; save(); render(); openSheet('settings');
  });
  const city = document.getElementById('city');
  if (city) city.onchange = () => { const c = CITIES[+city.value]; S.place = { name: c[0], lat: c[1], lon: c[2], tz: c[3] }; save(); current = todayRd(); render(); openSheet('settings'); };
  const gps = document.getElementById('gps');
  if (gps) gps.onclick = () => {
    const msg = document.getElementById('gpsMsg');
    if (!navigator.geolocation) { msg.textContent = l.gpsFail; return; }
    msg.textContent = l.gpsWait;
    navigator.geolocation.getCurrentPosition(p => {
      let tz; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
      S.place = { name: (S.lang === 'he' ? 'מיקום נוכחי' : 'Posizione attuale'), lat: p.coords.latitude, lon: p.coords.longitude, tz };
      save(); current = todayRd(); render(); openSheet('settings');
    }, () => { msg.textContent = l.gpsFail; }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 });
  };
  const on = document.getElementById('openNotes');
  if (on) on.onclick = () => openSheet('notes');
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
setInterval(() => { if (!document.getElementById('sheet').classList.contains('open')) render(); }, 60000);
render();

// Lavoratore per l'uso senza rete (funziona solo se la pagina è ospitata normalmente, non come anteprima)
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  try { navigator.serviceWorker.register('sw.js').catch(() => {}); } catch (e) {}
}
})();
