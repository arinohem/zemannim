/* Zemannim — nome del luogo in ebraico.
   Regole decise con il proprietario (DECISIONS.md, «Hebrew spelling of town names»):
   grafia degli ebrei italiani sul nome italiano; fuori d'Italia la pronuncia del luogo,
   scritta con le stesse lettere e secondo la grammatica ebraica. Le forme tradizionali
   (elenco delle eccezioni) sono nei dati (places.json) e prevalgono sempre.
   Tutto il codice è originale; nessuna dipendenza esterna. */
(function (root) {
'use strict';

const FINAL = { 'כ': 'ך', 'מ': 'ם', 'נ': 'ן', 'פ': 'ף', 'צ': 'ץ' };
const finalForm = w => w.replace(/[כמנפצ](?=[׳ׄ]?$)/, c => FINAL[c]);   // also before a geresh or a dot (ץ׳, ךׄ)

function lower(s) { return s.normalize('NFC').toLocaleLowerCase('und'); }

/* ---------- Generic tokenizer ----------
   rules: [pattern, out, kind, cond?] tried in order at each position; kind: 'V' vowel,
   'C' consonant, '' silent. cond(ctx) with ctx = { w, i, prev (previous token), end (index after match) }.
   Vowel tokens take an alef at the beginning of a word and after another vowel. */
const isV = c => /[aeiouyàáâäãåæèéêëìíîïòóôõöùúûüýÿąęėīīūųőűăœøāēī]/.test(c || '');
function tokenize(w, rules) {
  const toks = [];
  let i = 0;
  while (i < w.length) {
    let hit = null;
    for (const r of rules) {
      const p = r[0];
      if (w.startsWith(p, i)) {
        const ctx = { w, i, end: i + p.length, prev: toks[toks.length - 1], toks };
        if (!r[3] || r[3](ctx)) { hit = r; break; }
      }
    }
    if (!hit) { i++; continue; }          // unknown sign: dropped
    const out = typeof hit[1] === 'function' ? hit[1]({ w, i, end: i + hit[0].length, toks }) : hit[1];
    toks.push({ out, kind: hit[2], src: hit[0], at: i });
    i += hit[0].length;
  }
  return toks;
}
function join(toks) {
  let s = '', prevV = false, first = true;
  for (const t of toks) {
    if (t.kind === '') continue;
    let o = t.out;
    if (t.kind === 'V') {
      const carrier = (first || prevV) && !/^[אע]/.test(o);
      if (carrier) o = 'א' + o;
      prevV = !/^ע|ע$/.test(o);   // ע counts as a consonant letter for the carrier rule
    } else prevV = false;
    s += o; first = false;
  }
  return s;
}
// No doubled letters: collapse a letter repeated by doubling in the source (not ניי, יי of the rules)
function collapse(toks) {
  const r = [];
  for (const t of toks) {
    const p = r[r.length - 1];
    if (p && t.kind === 'C' && p.kind === 'C' && p.src === t.src && t.src.length === 1) continue;
    r.push(t);
  }
  return r;
}

/* ---------- Italian ---------- */
const between = (w, i, end) => isV(w[i - 1]) && isV(w[end]);
function itWord(w, z, s) {
  w = lower(w).replace(/['’]/g, '').replace(/(.)\1/g, (m, c) => c === 's' ? 'S' : c); // ss = S (voiceless), other doubles single
  w = w.replace(/cq/g, 'q');
  const stressedI = /ì/.test(w);
  w = w.replace(/[àá]/g, 'a').replace(/[èé]/g, 'e').replace(/[ìí]/g, 'i').replace(/[òó]/g, 'o').replace(/[ùú]/g, 'u');
  const V = c => isV(c);
  const rules = [
    // c, g, sc
    ['sch', 'סק', 'C'],
    ['sci', 'ש', 'C', x => V(x.w[x.end]) && !stressedI],
    ['sc', 'ש', 'C', x => /[ei]/.test(x.w[x.end] || '')],
    ['ch', 'ק', 'C'], ['gh', 'ג', 'C'],
    ['ci', 'צ', 'C', x => V(x.w[x.end]) && !stressedI],
    ['c', 'צ', 'C', x => /[ei]/.test(x.w[x.end] || '')],
    ['c', 'ק', 'C'],
    ['gli', 'לי', 'C'],
    ['gni', 'ניי', 'C'],                       // Bagni: not נייי (asked the owner)
    ['gn', 'ניי', 'C', x => V(x.w[x.end])],
    ['gi', 'גי', 'C', x => V(x.w[x.end]) && !stressedI],
    ['g', 'ג', 'C'],
    ['qu', 'קו', 'C'],
    ['q', 'ק', 'C'],
    // s, z
    ['S', 'ס', 'C'],
    ['s', 'ז', 'C', x => between(x.w, x.i, x.end) && s !== 'u'],
    ['s', 'ס', 'C'],
    ['z', '', '', x => z === 'silent'],
    ['z', 'ז', 'C', x => z === 'v'],
    ['z', 'צ', 'C'],
    // v
    ['v', 'ו', 'C', x => x.i === 0],
    ['v', 'ב', 'C', x => between(x.w, x.i, x.end)],
    ['v', 'וו', 'C'],
    ['w', 'וו', 'C'],
    // i between vowels is a consonant (Pistoia, Aquileia)
    ['i', 'י', 'C', x => x.i > 0 && V(x.w[x.i - 1]) && V(x.w[x.end])],
    ['j', 'י', 'C'], ['y', 'י', 'V'],
    ['a', 'א', 'V'], ['e', 'י', 'V'], ['i', 'י', 'V'], ['o', 'ו', 'V'], ['u', 'ו', 'V'],
    ['b', 'ב', 'C'], ['d', 'ד', 'C'], ['f', 'פ', 'C'], ['p', 'פ', 'C'], ['t', 'ט', 'C'], ['l', 'ל', 'C'],
    ['m', 'מ', 'C'], ['n', 'נ', 'C'], ['r', 'ר', 'C'], ['k', 'ק', 'C'], ['x', 'קס', 'C'], ['h', '', '']
  ];
  // u after q, g is a semivowel: the vowel after it takes no alef
  const toks = tokenize(w, rules);
  for (let k = 1; k < toks.length; k++)
    if (toks[k].src === 'u' && /^(q|qu|g)$/.test(toks[k - 1].src) && toks[k + 1] && toks[k + 1].kind === 'V') toks[k].kind = 'C';
  return finalForm(join(toks));
}
function italian(name, data) {
  const z = (data && data.z) || {}, s = (data && data.s) || {};
  return name.replace(/['’]\s*/g, "'").split(/[\s\-]+/).filter(Boolean)
    .map(w => itWord(w, z[w] || z[w.replace(/^.*'/, '')], s[w] || s[w.replace(/^.*'/, '')])).join(' ');
}

/* ---------- French ---------- */
function frWord(w) {
  w = lower(w).replace(/['’]/g, '');
  const n = w.length;
  const vow = c => /[aeiouyàâäéèêëîïôöùûüœ]/.test(c || '');
  const nasalOK = x => !vow(x.w[x.end]) && !/[nm]/.test(x.w[x.end] || '');
  const atEnd = x => x.end === n;
  const finalSilent = x => x.end === n || (x.end === n - 1 && x.w[n - 1] === 's' && x.w[x.i] !== 's');
  const rules = [
    ['eaux', 'ו', 'V'], ['eau', 'ו', 'V'], ['aux', 'ו', 'V', atEnd],
    ['aill', 'אי' + 'י', 'V'], ['ail', 'איי', 'V', atEnd],
    ['eill', 'יי', 'V'], ['eil', 'יי', 'V', atEnd],
    ['ouill', 'ויי', 'V'],
    ['euill', 'ייי', 'V'],
    ['œu', 'יו', 'V'], ['eu', 'יו', 'V'],
    ['oin', 'וינ', 'V', nasalOK],
    ['oi', 'וא', 'V'], ['oy', 'וא', 'V'],
    ['ou', 'ו', 'V'], ['où', 'ו', 'V'], ['oû', 'ו', 'V'],
    ['au', 'ו', 'V'],
    ['ain', 'ינ', 'V', nasalOK], ['aim', 'ינ', 'V', nasalOK], ['ein', 'ינ', 'V', nasalOK],
    ['ai', 'י', 'V'], ['ei', 'י', 'V'], ['aî', 'י', 'V'],
    ['ien', 'יינ', 'V', nasalOK],
    ['an', 'אנ', 'V', nasalOK], ['am', 'אנ', 'V', nasalOK], ['en', 'אנ', 'V', nasalOK], ['em', 'אנ', 'V', nasalOK],
    ['in', 'ינ', 'V', nasalOK], ['im', 'ינ', 'V', nasalOK], ['yn', 'ינ', 'V', nasalOK], ['ym', 'ינ', 'V', nasalOK],
    ['on', 'ונ', 'V', nasalOK], ['om', 'ונ', 'V', nasalOK],
    ['un', 'יונ', 'V', nasalOK], ['um', 'יונ', 'V', nasalOK],
    // final -er, -ez, -et (-ers, -ets): /e/
    ['ers', 'י', 'V', atEnd], ['er', 'י', 'V', x => atEnd(x) && x.i > 1], ['ez', 'י', 'V', atEnd], ['et', 'י', 'V', atEnd], ['ets', 'י', 'V', atEnd],
    // e muet: final, or before one consonant + vowel (schwa); not written
    ['es', '', '', x => atEnd(x) && x.i > 0],
    ['e', '', '', x => x.i > 0 && (atEnd(x) || (!vow(x.w[x.end]) && x.w[x.end] !== x.w[x.end + 1] && vow(x.w[x.end + 1]) && !/[rl]/.test(x.w[x.end + 1] || '')) && !vow(x.w[x.i - 1]))],
    ['e', '', '', x => x.i > 0 && atEnd(x)],
    // i, y before a vowel: consonant /j/, except before o, u (ליאון)
    ['i', 'י', 'C', x => x.i > 0 && vow(x.w[x.end]) && !/[ou]/.test(x.w[x.end])],
    ['y', 'י', 'C', x => vow(x.w[x.end]) && !/[ou]/.test(x.w[x.end]) && x.i > 0],
    // consonants
    ['ch', 'ש', 'C'], ['ph', 'פ', 'C'], ['th', 'ט', 'C'], ['gn', 'ניי', 'C'],
    ['ill', 'יי', 'C', x => x.i > 0 && vow(x.w[x.i - 1])],
    ['qu', 'ק', 'C'], ['gu', 'ג', 'C', x => /[eiéèêy]/.test(x.w[x.end] || '')],
    ['ge', 'ז׳', 'C', x => /[aou]/.test(x.w[x.end] || '')],
    ['g', 'ז׳', 'C', x => /[eiéèêy]/.test(x.w[x.end] || '')],
    ['g', '', '', finalSilent], ['g', 'ג', 'C'],
    ['ç', 'ס', 'C'], ['c', 'ס', 'C', x => /[eiéèêy]/.test(x.w[x.end] || '')], ['ck', 'ק', 'C'], ['c', 'ק', 'C'],
    ['ss', 'ס', 'C'], ['s', '', '', finalSilent], ['s', 'ז', 'C', x => vow(x.w[x.i - 1]) && vow(x.w[x.end])], ['s', 'ס', 'C'],
    ['z', '', '', atEnd], ['z', 'ז', 'C'],
    ['x', '', '', atEnd], ['x', 'קס', 'C'],
    ['t', '', '', finalSilent], ['d', '', '', finalSilent], ['p', '', '', finalSilent],
    ['j', 'ז׳', 'C'], ['h', '', ''], ['w', 'וו', 'C'], ['k', 'ק', 'C'], ['q', 'ק', 'C'],
    ['v', 'ו', 'C', x => x.i === 0], ['v', 'וו', 'C', x => x.i > 0 && !vow(x.w[x.i - 1])], ['v', 'ב', 'C'],
    ['b', 'ב', 'C'], ['d', 'ד', 'C'], ['f', 'פ', 'C'], ['p', 'פ', 'C'], ['t', 'ט', 'C'], ['l', 'ל', 'C'],
    ['m', 'מ', 'C'], ['n', 'נ', 'C'], ['r', 'ר', 'C'],
    // vowels
    ['a', 'א', 'V'], ['à', 'א', 'V'], ['â', 'א', 'V'],
    ['é', 'י', 'V'], ['è', 'י', 'V'], ['ê', 'י', 'V'], ['ë', 'י', 'V'], ['e', 'י', 'V'],
    ['i', 'י', 'V'], ['î', 'י', 'V'], ['ï', 'י', 'V'], ['y', 'י', 'V'],
    ['o', 'ו', 'V'], ['ô', 'ו', 'V'], ['u', 'ו', 'V'], ['û', 'ו', 'V'], ['ü', 'ו', 'V'], ['ù', 'ו', 'V']
  ];
  return finalForm(join(collapse(tokenize(w, rules))));
}
function french(name) {
  let words = name.split(/[\s\-]+/).filter(Boolean), out = [], le = false;
  words.forEach((w, k) => {
    const lw = lower(w);
    if (k === 0 && lw === 'le' && words.length > 1) { le = true; return; }
    if (lw === 'le') { out.push('לי'); return; }       // article inside the name (Saint-Germain-en-Laye: rare)
    if (lw === 'la') { out.push('לא'); return; }
    if (lw === 'les') { out.push('לי'); return; }
    let m = /^([ld])['’](.+)$/i.exec(w), h;
    if (m) { h = (m[1].toLowerCase() === 'l' ? 'ל' : 'ד') + frWord(m[2]).replace(/^א(?=[יו])/, '').replace(/^א/, 'א'); }
    else h = frWord(w);
    if (le) { h = 'ל' + h.replace(/^א(?=[יו])/, ''); le = false; }
    out.push(h);
  });
  return out.join(' ');
}

/* ---------- German ---------- */
const DE_COMPOUND = /^(stadt|statt|stätt|stedt|stein|stett|stock|stieg|steig|stauf|spring|spitz|stern|straß|strass)/;
function deWord(w) {
  w = lower(w).replace(/ß/g, 'S');
  const n = w.length;
  const vow = c => /[aeiouyäöü]/.test(c || '');
  const sylStart = x => x.i === 0 || DE_COMPOUND.test(x.w.slice(x.i));   // word start, or a compound element (-stadt, -stein…)
  const devoice = x => x.end === n || (!vow(x.w[x.end]) && !/[lr]/.test(x.w[x.end]) && x.w[x.end] !== x.w[x.i]);
  const rules = [
    ['tsch', 'צ׳', 'C'], ['dsch', 'ג׳', 'C'], ['sch', 'ש', 'C'], ['chs', 'קס', 'C'], ['ch', 'כ', 'C'], ['ck', 'ק', 'C'], ['pf', 'פפ', 'C'], ['ph', 'פ', 'C'],
    ['qu', 'קוו', 'C'], ['dt', 'ט', 'C'], ['th', 'ט', 'C'], ['tz', 'צ', 'C'], ['z', 'צ', 'C'],
    ['S', 'ס', 'C'], ['ss', 'ס', 'C'],
    ['sp', 'שפ', 'C', sylStart], ['st', 'שט', 'C', sylStart],
    ['s', 'ז', 'C', x => vow(x.w[x.end])], ['s', 'ס', 'C'],
    ['w', 'וו', 'C'], ['v', 'פ', 'C'], ['f', 'פ', 'C'], ['j', 'י', 'C'], ['k', 'ק', 'C'], ['x', 'קס', 'C'],
    ['c', 'צ', 'C', x => /[eiäy]/.test(x.w[x.end] || '')], ['c', 'ק', 'C'],
    ['h', 'ה', 'C', x => x.i === 0 || (!vow(x.w[x.i - 1]) && vow(x.w[x.end]))], ['h', '', ''],
    ['b', 'פ', 'C', devoice], ['d', 'ט', 'C', devoice], ['g', 'ק', 'C', devoice],
    ['b', 'ב', 'C'], ['d', 'ד', 'C'], ['g', 'ג', 'C'], ['p', 'פ', 'C'], ['t', 'ט', 'C'], ['l', 'ל', 'C'],
    ['m', 'מ', 'C'], ['n', 'נ', 'C'], ['r', 'ר', 'C'],
    // vowels
    ['aa', 'א', 'V'], ['ee', 'ע', 'V'], ['oo', 'ו', 'V'], ['ie', 'י', 'V'],
    ['ei', 'יי', 'V'], ['ai', 'יי', 'V'], ['ey', 'יי', 'V'], ['ay', 'יי', 'V'],
    ['au', 'וי', 'V'], ['eu', 'יי', 'V'], ['äu', 'יי', 'V'],
    ['a', 'א', 'V'], ['e', 'ע', 'V'], ['ä', 'ע', 'V'], ['ö', 'ע', 'V'],
    ['i', 'י', 'V'], ['ü', 'י', 'V'], ['y', 'י', 'V'], ['o', 'ו', 'V'], ['u', 'ו', 'V']
  ];
  return finalForm(join(collapse(tokenize(w, rules))));
}
const german = name => name.split(/[\s\-]+/).filter(Boolean).map(deWord).join(' ');

/* ---------- Spanish ---------- */
const MX_X = /^(méxico|mexico|oaxaca|xalapa|texcoco|xochimilco|mexicali)$/;
function esWord(w, cc) {
  const lw = lower(w);
  const xJ = cc === 'MX' && MX_X.test(lw);
  w = lw.replace(/[áà]/g, 'a').replace(/[éè]/g, 'e').replace(/[íì]/g, 'i').replace(/[óò]/g, 'o').replace(/ú/g, 'u');
  const vow = c => /[aeiouü]/.test(c || '');
  const rules = [
    ['ch', 'צ׳', 'C'], ['lli', 'לי', 'C', x => !vow(x.w[x.end])], ['ll', 'לי', 'C'], ['ñ', 'ניי', 'C'],
    ['qu', 'ק', 'C'], ['gü', 'גו', 'C'], ['gu', 'ג', 'C', x => /[ei]/.test(x.w[x.end] || '')],
    ['c', 'ס', 'C', x => /[ei]/.test(x.w[x.end] || '')], ['c', 'ק', 'C'], ['z', 'ס', 'C'], ['s', 'ס', 'C'],
    ['j', 'ח', 'C'], ['g', 'ח', 'C', x => /[ei]/.test(x.w[x.end] || '')], ['g', 'ג', 'C'],
    ['h', '', ''], ['x', 'ח', 'C', () => xJ], ['x', 'קס', 'C'],
    ['y', 'יי', 'C', x => vow(x.w[x.end])], ['y', 'י', 'V'],
    ['b', 'ב', 'C'], ['v', 'ב', 'C'], ['rr', 'ר', 'C'], ['r', 'ר', 'C'], ['f', 'פ', 'C'], ['t', 'ט', 'C'],
    ['k', 'ק', 'C'], ['w', 'וו', 'C'], ['d', 'ד', 'C'], ['p', 'פ', 'C'], ['l', 'ל', 'C'], ['m', 'מ', 'C'], ['n', 'נ', 'C'],
    ['a', 'א', 'V'], ['e', 'י', 'V'], ['i', 'י', 'V'], ['o', 'ו', 'V'], ['u', 'ו', 'V'], ['ü', 'ו', 'V']
  ];
  return finalForm(join(collapse(tokenize(w, rules))));
}
const spanish = (name, cc) => name.split(/[\s\-]+/).filter(Boolean).map(w => esWord(w, cc)).join(' ');

/* ---------- Ashkenazi East (by sound on the local name) ---------- */
function eastWord(w, lang) {
  w = lower(w).replace(/['’ʹʼ]/g, '');
  const n = w.length;
  const vow = c => /[aeiouyąęóőöüűáéíúůýěăâîėūųįāēīõä]/.test(c || '');
  const cyr = lang === 'uk' || lang === 'be' || lang === 'ru';
  const hu = lang === 'hu', ro = lang === 'ro', pl = lang === 'pl', czsk = lang === 'cs' || lang === 'sk', balt = lang === 'lt' || lang === 'lv' || lang === 'et';
  const rules = [];
  const R = (...r) => rules.push(r);
  if (cyr) {
    R('shch', 'שצ׳', 'C'); R('sh', 'ש', 'C'); R('zh', 'ז׳', 'C'); R('kh', 'ח', 'C'); R('ch', 'צ׳', 'C'); R('ts', 'צ', 'C');
    R('ya', 'יא', 'V'); R('ia', 'יא', 'V'); R('yu', 'יו', 'V'); R('iu', 'יו', 'V'); R('ye', 'יע', 'V'); R('ie', 'יע', 'V'); R('yi', 'יי', 'V'); R('yo', 'יא', 'V');
    R('h', 'ה', 'C');
  }
  if (pl) {
    R('szcz', 'שצ׳', 'C'); R('sz', 'ש', 'C'); R('cz', 'צ׳', 'C'); R('rz', 'ש', 'C', x => /[ptk]/.test(x.w[x.i - 1] || '')); R('rz', 'ז׳', 'C');
    R('ch', 'ח', 'C'); R('h', 'ח', 'C'); R('dź', 'ג׳', 'C'); R('dż', 'ג׳', 'C'); R('dz', 'דז', 'C');
    R('ów', 'וב', 'V', x => x.end === n); R('ó', 'א', 'V');
  }
  if (czsk) { R('ch', 'ח', 'C'); R('h', 'ה', 'C'); R('dž', 'ג׳', 'C'); R('dz', 'דז', 'C'); R('ř', 'ש', 'C', x => /[ptk]/.test(x.w[x.i - 1] || '')); R('ř', 'ז', 'C'); R('ě', 'יע', 'V'); R('ô', 'ו', 'V'); }
  if (hu) {
    R('dzs', 'ג׳', 'C'); R('cs', 'צ׳', 'C'); R('sz', 'ס', 'C'); R('zs', 'ז׳', 'C'); R('s', 'ש', 'C'); R('ny', 'ני', 'C'); R('gy', 'די', 'C'); R('ty', 'טי', 'C'); R('ly', 'י', 'C');
    R('ch', 'ח', 'C'); R('h', 'ה', 'C');
  }
  if (ro) {
    R('che', 'קע', 'C'); R('chi', 'קי', 'C'); R('ghe', 'גע', 'C'); R('ghi', 'גי', 'C');
    R('ce', 'צ׳ע', 'C'); R('ci', 'צ׳', 'C', x => vow(x.w[x.end])); R('ci', 'צ׳י', 'C');
    R('ge', 'ג׳ע', 'C'); R('gi', 'ג׳', 'C', x => vow(x.w[x.end])); R('gi', 'ג׳י', 'C');
    R('ș', 'ש', 'C'); R('ş', 'ש', 'C'); R('ț', 'צ', 'C'); R('ţ', 'צ', 'C'); R('j', 'ז׳', 'C'); R('h', 'ה', 'C');
    R('ă', 'ע', 'V'); R('â', 'י', 'V'); R('î', 'י', 'V');
  }
  if (balt) { R('ch', 'ח', 'C'); R('h', 'ה', 'C'); R('dž', 'ג׳', 'C'); R('dz', 'דז', 'C'); R('ķ', 'ק', 'C'); R('ģ', 'ג', 'C'); R('ļ', 'ל', 'C'); R('ņ', 'ני', 'C'); R('ą', 'א', 'V'); R('ę', 'ע', 'V'); }
  // shared table
  R('ov', 'וב', 'V', x => x.end === n && cyr);
  R('ev', 'עב', 'V', x => x.end === n && cyr);
  R('ć', 'צ׳', 'C'); R('č', 'צ׳', 'C'); R('ś', 'ש', 'C'); R('š', 'ש', 'C'); R('ż', 'ז׳', 'C'); R('ź', 'ז׳', 'C'); R('ž', 'ז׳', 'C');
  R('ł', 'ל', 'C'); R('ń', 'ני', 'C'); R('ň', 'ני', 'C'); R('ť', 'ט', 'C'); R('ď', 'ד', 'C'); R('ľ', 'ל', 'C'); R('ĺ', 'ל', 'C'); R('ŕ', 'ר', 'C');
  R('w', 'וו', 'C'); R('v', 'וו', 'C'); R('c', 'צ', 'C'); R('j', 'י', 'C'); R('k', 'ק', 'C'); R('q', 'ק', 'C'); R('t', 'ט', 'C'); R('f', 'פ', 'C');
  R('x', 'קס', 'C'); R('s', 'ס', 'C'); R('z', 'ז', 'C'); R('h', 'ה', 'C'); R('g', 'ג', 'C');
  R('b', 'ב', 'C'); R('d', 'ד', 'C'); R('p', 'פ', 'C'); R('l', 'ל', 'C'); R('m', 'מ', 'C'); R('n', 'נ', 'C'); R('r', 'ר', 'C');
  R('ę', 'ענ', 'V'); R('ą', 'אנ', 'V');   // final nun only at the end (finalForm)
  for (const c of 'aáāoóõ') R(c, 'א', 'V');
  for (const c of 'eéēėöőä') R(c, 'ע', 'V');
  for (const c of 'iíīįyýüű') R(c, 'י', 'V');
  for (const c of 'uúūųů') R(c, 'ו', 'V');
  return finalForm(join(collapse(tokenize(w, rules))));
}
const east = (name, lang) => name.split(/[\s\-]+/).filter(Boolean).map(w => eastWord(w, lang)).join(' ');

/* ---------- Israeli form (Hebrew Wikipedia) adapted to the Judeo-Italian spelling ----------
   Owner, 2026-11-05: for places with no rules and for English names (not for Arabic-speaking
   countries, which have their own rule below). The geresh letters ג׳ ז׳ צ׳ stay; the other geresh
   letters lose the geresh. The vowels are aligned with the Latin name: an unwritten a takes א,
   o/u ו, i י, e י (not in Dutch or Flemish, where it is a schwa); final ה is א for a, י for e;
   a final vowel the Israeli form does not write is silent. English names that do not match go by the pronunciation, if known. When the Israeli
   name is another name (Den Bosch for 's-Hertogenbosch), only the letters are changed. */
const DOT = 'ׄ';   // Judeo-Arabic upper dot (U+05C4)
const MEDIAL = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
const LC = { b: 'בו', c: 'קסצכשג', d: 'דטג', f: 'פ', g: 'גחזכק', h: 'החכ', j: 'גזיחש', k: 'קכ', l: 'ל', m: 'מ', n: 'נ', p: 'פ',
  q: 'קכג', r: 'ר', s: 'סשזצת', t: 'טתצד', v: 'ובפ', w: 'וב', x: 'קסשחזכ', z: 'זצסשד' };
function latFold(w) {
  return w.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ı/g, 'i').replace(/ł/g, 'l').replace(/ø/g, 'o')
    .replace(/æ/g, 'ae').replace(/œ/g, 'oe').replace(/ß/g, 'ss').replace(/đ/g, 'd').replace(/þ/g, 'th').replace(/ð/g, 'd');
}
function latTokens(w, en) {
  w = latFold(w);
  if (en) w = w.replace(/([^aeiouy])e$/, '$1');   // English silent final e
  w = w.replace(/([aeiou])h$/, '$1');               // -ah, -eh (Jeddah)
  const out = [];
  for (let i = 0; i < w.length;) {
    const c = w[i];
    if (/[aeiouy]/.test(c)) { let j = i; while (j < w.length && /[aeiouy]/.test(w[j])) j++; out.push(['V', w.slice(i, j)]); i = j; }
    else if (/[a-z]/.test(c)) { const p = out[out.length - 1]; if (!(p && p[0] === 'C' && p[1] === c)) out.push(['C', c]); i++; }
    else i++;
  }
  return out;
}
// Hebrew word -> units (a letter with its geresh or dot)
function heUnits(h, cc) {
  h = h.replace(/[֑-ׇ]/g, m => (m === DOT ? m : '')).replace(/['’`]/g, '׳').replace(/[ךםןףץ]/g, c => MEDIAL[c]);
  const u = [];
  for (let i = 0; i < h.length; i++) {
    let c = h[i];
    if (!/[א-ת]/.test(c)) continue;
    if (h[i + 1] === '׳' || h[i + 1] === DOT) {
      i++;
      if ('גזצ'.includes(c)) c += '׳';
    }
    u.push(c);
  }
  return u;
}
const isMater = x => x === 'א' || x === 'ו' || x === 'י' || x === 'ה';   // ה only at the end of the word
function israeliWord(units, lat, opt) {
  const L = latTokens(lat, opt.en), H = units, n = L.length, m = H.length, INF = 1e9;
  const D = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(INF)), B = D.map(r => r.map(() => null));
  D[0][0] = 0;
  const rel = (a, b, c, from) => { if (c < D[a][b]) { D[a][b] = c; B[a][b] = from; } };
  for (let i = 0; i <= n; i++) for (let j = 0; j <= m; j++) {
    const d = D[i][j]; if (d >= INF) continue;
    if (i < n) {
      const [k, t] = L[i];
      if (k === 'V') {
        for (const ln of [1, 2, 3, 4]) if (ln <= t.length + 1 && j + ln <= m && H.slice(j, j + ln).every((x, q) => isMater(x) && (x !== 'ה' || j + q === m - 1))) rel(i + 1, j + ln, d, [i, j, 'keep']);
        rel(i + 1, j, d + 1, [i, j, 'ins']);
      } else {
        if (j < m && (LC[t] || '').includes(H[j][0])) rel(i + 1, j + 1, d, [i, j, 'keep']);
        if (t === 'h' || t === 'w' || (t === 's' && i > 0 && L[i - 1][1] === 'c')) rel(i + 1, j, d + 0.5, [i, j, 'skip']);
        if (i > 0 && L[i - 1][0] === 'C') rel(i + 1, j, d + 1.5, [i, j, 'skip']);   // second letter of a cluster (sh, ch, th…)
        if (j < m) rel(i + 1, j + 1, d + 2.5, [i, j, 'keep']);
        rel(i + 1, j, d + 3, [i, j, 'skip']);
      }
    }
    if (j < m) rel(i, j + 1, d + 3, [i, j, 'extra']);
  }
  if (D[n][m] >= 6) return null;
  const ops = [];
  for (let i = n, j = m; i > 0 || j > 0;) { const b = B[i][j]; ops.push([b[0], b[1], i, j, b[2]]); i = b[0]; j = b[1]; }
  ops.reverse();
  let out = '', prevV = false;
  for (const [pi, pj, , j, op] of ops) {
    let seg = H.slice(pj, j).join('');
    if (op === 'ins') {
      const t = L[pi][1];
      if (pi === n - 1) { prevV = true; continue; }   // a final vowel the Israeli form does not write is silent (Ouarzazate)
      seg = t[0] === 'a' ? 'א' : /[ou]/.test(t[0]) ? 'ו' : (t[0] === 'e' && opt.schwa) ? '' : 'י';
      if (seg && (pi === 0 || prevV) && seg !== 'א') seg = 'א' + seg;
      if (seg) prevV = true;
      out += seg;
      continue;
    }
    if (op === 'keep' && L[pi][0] === 'V') {
      const t = L[pi][1];
      if (pi === n - 1 && /ה$/.test(seg)) {
        const f = t.slice(-1) === 'a' ? 'א' : (t.slice(-1) === 'e' && !opt.schwa) ? 'י' : 'ה';
        seg = seg.slice(0, -1) + (f === 'א' && /א$/.test(seg.slice(0, -1)) ? '' : f);   // Pessoa פסואה → פיסוא
      }
      prevV = true;
    } else if (op !== 'extra') prevV = false;
    out += seg;
  }
  return out.replace(/([בגדזחטכלמנסעפצקרשת])\1/g, '$1');   // no doubled letters (נאן-נינג → נאנינג)
}
function israeli(w, name, cc, rule) {
  const opt = { en: rule === 'en', schwa: cc === 'NL' || cc === 'BE' };
  const words = (t, re) => t.split(re).filter(Boolean);
  // the Israeli hyphen may join (נאן-נינג = Nanning) or separate (אל-עין = Al Ain) the words of the Latin name
  for (const hw of [words(w, /[\s\-־]+/), words(w.replace(/[\-־]/g, ''), /\s+/)]) {
    const lw = words(name || '', /[\s\-]+/);
    if (hw.length !== lw.length) continue;
    const r = hw.map((h, k) => israeliWord(heUnits(h, cc), lw[k], opt));
    if (!r.includes(null)) return { he: r.map(finalForm).join(' '), phonetic: true };
  }
  return { he: words(w, /[\s\-־]+/).map(h => finalForm(heUnits(h, cc).join(''))).join(' '), phonetic: false };
}

/* ---------- Arabic-speaking countries: Judeo-Arabic spelling (owner, 2026-11-05) ----------
   The Arabic name in Hebrew letters, letter for letter, as in Classical Judeo-Arabic; no vowels
   added. tāʾ marbūṭa ה; dots: khāʾ כׄ, ghayn גׄ, thāʾ תׄ, dhāl דׄ, ḍād צׄ, ẓāʾ טׄ, jīm plain ג. The
   article ال at the start of the name is dropped, as Hebrew texts do (בצרה, מוצל); inside the name
   it stays, joined (קצר אלכביר). Morocco and Algeria: ك is ג where the Latin name has g (أكادير
   אגאדיר). Without an Arabic name, the spelling is rebuilt from the Latin name by the same rules. */
const AR = { 'ا': 'א', 'أ': 'א', 'إ': 'א', 'آ': 'א', 'ٱ': 'א', 'ء': '', 'ؤ': 'ו', 'ئ': 'י', 'ب': 'ב', 'ت': 'ת', 'ث': 'ת' + DOT,
  'ج': 'ג', 'ح': 'ח', 'خ': 'כ' + DOT, 'د': 'ד', 'ذ': 'ד' + DOT, 'ر': 'ר', 'ز': 'ז', 'س': 'ס', 'ش': 'ש', 'ص': 'צ', 'ض': 'צ' + DOT,
  'ط': 'ט', 'ظ': 'ט' + DOT, 'ع': 'ע', 'غ': 'ג' + DOT, 'ف': 'פ', 'ق': 'ק', 'ك': 'כ', 'ک': 'כ', 'ل': 'ל', 'م': 'מ', 'ن': 'נ',
  'ه': 'ה', 'ة': 'ה', 'و': 'ו', 'ي': 'י', 'ى': 'י', 'ی': 'י', 'گ': 'ג', 'چ': 'צ׳', 'پ': 'פ', 'ڤ': 'פ', 'ڨ': 'ג' };
const LAT_ART = /^(al|el|ad|ar|as|ash|at|az|an|adh|ath|ed|er|es|ech|et|ez|en|l)$/;
function latWords(name) {   // the Latin words, the article as a separate word (Ksar el-Kebir → ksar, el, kebir)
  return lower(name).replace(/[’‘ʿʾ`']/g, m => (m === '‘' || m === 'ʿ' || m === '`' ? 'ʿ' : '')).split(/[\s\-]+/).filter(Boolean);
}
function fromArabic(ar, name, cc) {
  let words = ar.replace(/[ً-ٰٟـ‎‏()]/g, '').split(/[\s\-]+/).filter(Boolean);
  // administrative words of GeoNames (municipality, province, emirate…), not part of the name
  while (words.length > 1 && (/^(بلدية|ولاية|دائرة|ناحية|قضاء|إمارة|محافظة|البلدية)$/.test(words[0]) ||
    (words[0] === 'مدينة' && !/^((al|el)[\s\-])?(mad[iī]n|medina)/i.test(name)))) words = words.slice(1);
  words = words.filter(w => w !== 'البلدية');
  const lat = latWords(name).filter(w => !LAT_ART.test(w));
  const gk = cc === 'MA' || cc === 'DZ', mg = /^(MA|DZ|TN|LY|MR)$/.test(cc || '');
  return words.map((w, k) => {
    if (k === 0 && w.length > 3 && w.startsWith('ال')) w = w.slice(2);
    const lw = lat.length === words.length ? lat[k] : '';
    const g = gk && /g(?!h)/.test(lw) && !/[kcq]/.test(lw);   // ك for /g/
    // Maghreb: ڤ and ڨ write the /g/ of ق (ڤفصة Gafsa): ק, as ق (owner, R5)
    return finalForm([...w].map(c => (c === 'ك' && g ? 'ג' : mg && (c === 'ڤ' || c === 'ڨ') ? 'ק' : AR[c] !== undefined ? AR[c] : '')).join(''));
  }).filter(Boolean).join(' ');
}
// Common words of place names, in their Arabic spelling
const JA_WORDS = { 'ain': 'עין', 'aïn': 'עין', 'ʿain': 'עין', 'ʿaïn': 'עין', 'ayn': 'עין', 'ʿayn': 'עין', 'oued': 'ואדי', 'wadi': 'ואדי',
  'wādī': 'ואדי', 'ouadi': 'ואדי', 'sidi': 'סידי', 'sīdī': 'סידי', 'bir': 'ביר', 'bīr': 'ביר', 'beni': 'בני', 'bani': 'בני', 'banī': 'בני',
  'bni': 'בני', 'oulad': 'אולאד', 'ouled': 'אולאד', 'awlād': 'אולאד', 'souk': 'סוק', 'souq': 'סוק', 'sūq': 'סוק', 'suq': 'סוק',
  'douar': 'דואר', 'ksar': 'קצר', 'qasr': 'קצר', 'qaşr': 'קצר', 'kebir': 'כביר', 'kbir': 'כביר', 'kabir': 'כביר', 'kabīr': 'כביר',
  'sghir': 'צגׄיר', 'seghir': 'צגׄיר', 'şaghīr': 'צגׄיר', 'djebel': 'גבל', 'jebel': 'גבל', 'jabal': 'גבל', 'hammam': 'חמאם',
  'ḩammām': 'חמאם', 'ras': 'ראס', 'raʾs': 'ראס', 'ra’s': 'ראס', 'dar': 'דאר', 'dār': 'דאר', 'kafr': 'כפר', 'tall': 'תל', 'tell': 'תל',
  'umm': 'אם', 'oum': 'אם', 'abu': 'אבו', 'abū': 'אבו', 'abou': 'אבו', 'bou': 'בו', 'ben': 'בן', 'bin': 'בן', 'ibn': 'אבן',
  'jdid': 'גדיד', 'djedid': 'גדיד', 'jadid': 'גדיד', 'jadīd': 'גדיד', 'jadīdah': 'גדידה', 'madinat': 'מדינה', 'madīnat': 'מדינה',
  'zaouia': 'זאויה', 'zaouiet': 'זאויה', 'zawiya': 'זאויה', 'zāwiyah': 'זאויה', 'zawyat': 'זאויה', 'hassi': 'חאסי' };
function jaWord(w, long) {
  if (JA_WORDS[w]) return JA_WORDS[w];
  const R = [], add = (p, o, c) => R.push([p, o, c]);
  for (const [p, o] of [['kh', 'כ' + DOT], ['gh', 'ג' + DOT], ['sh', 'ש'], ['ch', 'ש'], ['th', 'ת' + DOT], ['dh', 'ד' + DOT],
    ['dj', 'ג'], ['tch', 'צ׳'], ['gue', 'ג'], ['gui', 'ג'], ['ou', 'ו'], ['ḩ', 'ח'], ['ḥ', 'ח'], ['ţ', 'ט'], ['ṭ', 'ט'],
    ['ḑ', 'צ' + DOT], ['ḍ', 'צ' + DOT], ['z̧', 'ט' + DOT], ['ẓ', 'ט' + DOT], ['ş', 'צ'], ['ṣ', 'צ'], ['ç', 'ס'], ['ʿ', 'ע'],
    ['b', 'ב'], ['p', 'פ'], ['t', 'ת'], ['j', 'ג'], ['h', 'ה'], ['d', 'ד'], ['r', 'ר'], ['z', 'ז'], ['s', 'ס'], ['f', 'פ'],
    ['v', 'פ'], ['q', 'ק'], ['k', 'כ'], ['g', 'ג'], ['l', 'ל'], ['m', 'מ'], ['n', 'נ'], ['w', 'ו'], ['x', 'כס']]) add(p, o, 'C');
  add('ce', 'ס', 'C'); add('ci', 'ס', 'C'); add('c', 'ק', 'C');
  const out = [];
  let i = 0;
  w = w.normalize('NFC');
  while (i < w.length) {
    const c = w[i];
    if (c === 'y' && (i === 0 || /[aeiouāīūâîûéèê]/.test(w[i - 1]) || /[aeiouāīūâîû]/.test(w[i + 1] || ''))) {
      const p = out[out.length - 1];
      if (!(p && p[1] === 'י')) out.push(['C', 'י']);   // īy, yy: one yod, as in Arabic (ية)
      i++; continue;
    }
    if (!long && c === 'a' && w[i + 1] === 'y' && !/[aeiouāīū]/.test(w[i + 2] || '') && i > 0) { i++; continue; }   // ay: diphthong (Shaykh שיך)
    if (!long && /[ae]/.test(c) && w[i + 1] === 'h' && i === w.length - 2 && i > 0) { out.push(['V', 'ה']); i += 2; continue; }   // final -ah: tāʾ marbūṭa
    const r = R.find(([p]) => w.startsWith(p, i));
    if (r) {
      let o = r[1], kind = r[2];
      if (r[0] === 'gue' || r[0] === 'gui') { out.push(['C', 'ג']); i += 2; continue; }
      if (r[0] === 'ce' || r[0] === 'ci') { out.push(['C', 'ס']); i += 1; continue; }
      if (r[0] === 'ou') kind = /[aeiouéè]/.test(w[i + 2] || '') && !long ? 'C' : 'V';
      const p = out[out.length - 1];
      if (!(p && kind === 'C' && p[1] === o && (p[0] === 'C' || o === 'ו'))) out.push([kind, o]);   // shadda, ūw: no doubled letter
      i += r[0].length; continue;
    }
    // vowels
    let o = '';
    const fin = i === w.length - 1;
    if (/[āâ]/.test(c)) o = 'א'; else if (/[īî]/.test(c)) o = 'י'; else if (/[ūûô]/.test(c)) o = 'ו'; else if (c === 'á') o = 'י';
    else if (long) o = c === 'a' && fin ? 'ה' : '';                                 // short vowels not written
    else if (/[aà]/.test(c)) o = fin ? 'ה' : 'א'; else if (/[iïy]/.test(c)) o = 'י'; else if (/[ouöü]/.test(c)) o = 'ו';
    else if (/[éèêë]/.test(c)) o = 'י';                                             // e: a schwa, not written
    if (/[aeiouyāīūâîûôáàéèêëïöü]/.test(c)) {
      const p = out[out.length - 1];
      if (fin && o === 'ה' && p && p[0] === 'V' && p[1]) out.push(['V', 'ה']);   // -iya, -ia: ה (Youssoufia יוסופיה)
      else if (!p || (p[0] === 'V' && p[1])) { if (!p || o !== '') out.push(['V', o === 'א' ? 'א' : 'א' + o]); }   // vowel at the start or after a vowel: alef
      else if (o) out.push(['V', o]);
      else out.push(['V', '']);
    }
    i++;
  }
  return out.map(t => t[1]).join('').replace(/^אא/, 'א').replace(/(.)\1/g, (m, a) => (a === 'ו' || a === 'י' ? m : a));
}
function judeoArabic(name) {
  const long = /[āīūâîûáḩţşḑẓ]/.test(name.normalize('NFC'));   // a romanization with long vowels marked
  const ws = latWords(name.normalize('NFC'));
  const out = [];
  ws.forEach((w, k) => {
    if (LAT_ART.test(w) && k < ws.length - 1) { if (out.length) out.push('אל'); return; }   // the article: dropped at the start, joined inside
    let h = jaWord(w, long);
    if (long && k < ws.length - 1 && /[^aeiouāīū]at$/.test(w)) h = h.replace(/ת$/, 'ה');   // construct -at: tāʾ marbūṭa ה (Minyat מניה)
    if (out[out.length - 1] === 'אל') { out.pop(); h = 'אל' + h; }
    out.push(finalForm(h));
  });
  return out.join(' ');
}

/* ---------- Entry point ----------
   rule: it, fr, de, es, en, ar, pl, cs, sk, hu, ro, lt, lv, et, uk, be, ru; data: the extra fields of places.json
   (he: traditional form; w, c: Hebrew Wikipedia title and country, for no rule and English; ar: Arabic name). */
function hebrew(name, rule, data, cc) {
  if (data && data.he) return data.he;
  if (!name) return '';
  if (data && data.w && (rule === '' || rule === 'en')) {
    // English: when the Israeli form does not match the spelling (Leicester לסטר), the pronunciation decides
    const r = israeli(data.w, name, data.c, rule);
    if (r.phonetic || rule === '' || !data.p) return r.he;
  }
  switch (rule) {
    case 'it': return italian(name, data);
    case 'fr': return french(name);
    case 'de': return german(name);
    case 'es': return spanish(name, cc);
    case 'en': return (data && data.p) ? english(data.p, name) : '';
    case 'ar': return (data && data.ar) ? fromArabic(data.ar, name, data.c || cc) : judeoArabic(name);
    case 'pl': case 'cs': case 'sk': case 'hu': case 'ro': case 'lt': case 'lv': case 'et': case 'uk': case 'be': case 'ru':
      return east(name, rule);
    default: return '';
  }
}
/* ---------- English (by the pronunciation: IPA from tools/english-ipa.tsv) ----------
   /æ/ /ɑː/ → א; /e/ /ɪ/ /iː/ → י; /ɒ/ /ɔː/ /oʊ/ /ʊ/ /uː/ → ו; /ʌ/ /ɜː/ and schwa → the vowel
   letter of the spelling; /eɪ/ → יי; /aɪ/ → איי; /aʊ/ → או; /ɔɪ/ → וי; r after a vowel where
   spelled; ch צ׳, j ג׳, /ʒ/ ז׳ (the geresh of the Israeli spelling, owner 2026-11-05), sh ש, θ ת, ð ד,
   w וו, v as in Italian. */
const EN_PH = ['juː', 'tʃ', 'dʒ', 'eɪ', 'aɪ', 'aʊ', 'ɔɪ', 'oʊ', 'əʊ', 'ɪə', 'eə', 'ɛə', 'ʊə', 'iː', 'uː', 'ɑː', 'ɔː', 'ɜː', 'ɛː', 'aː', 'ʉː', 'oː'];
const EN_V = { 'æ': 'A', 'a': 'A', 'ɑ': 'A', 'ɑː': 'A', 'aː': 'A',
  'e': 'I', 'ɛ': 'I', 'ɛː': 'I', 'ɪ': 'I', 'i': 'I', 'iː': 'I', 'ᵻ': 'I',
  'ɒ': 'O', 'ɔ': 'O', 'ɔː': 'O', 'o': 'O', 'oː': 'O', 'oʊ': 'O', 'əʊ': 'O', 'ʊ': 'O', 'u': 'O', 'uː': 'O', 'ʉ': 'O', 'ʉː': 'O',
  'ʌ': 'S', 'ə': 'S', 'ɜ': 'S', 'ɜː': 'S', 'ɝ': 'S', 'ɚ': 'S', 'ɐ': 'S', 'ɘ': 'S', 'ɵ': 'S',
  'eɪ': 'יי', 'aɪ': 'איי', 'aʊ': 'או', 'ɔɪ': 'וי', 'ɪə': 'I+', 'eə': 'I+', 'ɛə': 'I+', 'ʊə': 'O+' };
const EN_C = { 'p': 'פ', 'b': 'ב', 't': 'ט', 'd': 'ד', 'k': 'ק', 'ɡ': 'ג', 'g': 'ג', 'f': 'פ', 'θ': 'ת', 'ð': 'ד', 's': 'ס', 'z': 'ז',
  'ʃ': 'ש', 'ʒ': 'ז׳', 'tʃ': 'צ׳', 'dʒ': 'ג׳', 'h': 'ה', 'm': 'מ', 'n': 'נ', 'ŋ': 'נג', 'l': 'ל', 'ɫ': 'ל', 'r': 'ר', 'ɹ': 'ר',
  'ɾ': 'ט', 'w': 'וו', 'ʍ': 'וו', 'j': 'י', 'x': 'ח', 'ʔ': '', 'v': 'v' };
function enPhones(ipa) {
  ipa = ipa.normalize('NFD').replace(/[ˈˌ.‿()]/g, '').replace(/[̩̍]/g, 'ˑ').replace(/[̀-ͯ]/g, '').replace(/ːː/g, 'ː');
  const out = [];
  for (let i = 0; i < ipa.length;) {
    if (ipa[i] === 'ˑ') { const c = out.pop(); out.push('ə', c); i++; continue; }   // syllabic consonant
    const m = EN_PH.find(p => ipa.startsWith(p, i)) || ipa[i];
    if (m === 'juː') { out.push('j', 'uː'); i += 3; continue; }
    if (EN_V[m] || EN_C[m] !== undefined) out.push(m);
    i += m.length;
  }
  return out;
}
function enGroups(word) {   // vowel-letter groups of the spelling, with the index after each
  const g = [], re = /[aeiouy]+/g; let m;
  const w = word.toLowerCase();
  while ((m = re.exec(w))) {
    if (m[0] === 'y' && m.index === 0) continue;
    g.push({ s: m[0], end: m.index + m[0].length, last: m.index + m[0].length === w.length });
  }
  return { g, w };
}
const EN_COMPAT = { A: /a/, I: /[eiya]/, O: /[ouw]/, 'יי': /a|e/, 'איי': /i|y/, 'או': /ou|ow|au/, 'וי': /oi|oy/, 'I+': /e|i/, 'O+': /o|u/ };
function enAlign(nuc, groups) {   // DP: each nucleus to a spelling group, in order; groups may be skipped
  const N = nuc.length, G = groups.length, INF = 1e9;
  const cost = Array.from({ length: N + 1 }, () => new Array(G + 1).fill(INF)), back = cost.map(r => r.map(() => null));
  cost[0][0] = 0;
  for (let i = 0; i <= N; i++) for (let j = 0; j <= G; j++) {
    const c = cost[i][j]; if (c >= INF) continue;
    if (j < G) { const k = c + (groups[j].last && groups[j].s === 'e' ? 0.2 : 1); if (k < cost[i][j + 1]) { cost[i][j + 1] = k; back[i][j + 1] = [i, j, -1]; } }
    if (i < N) { const k = c + 3; if (k < cost[i + 1][j]) { cost[i + 1][j] = k; back[i + 1][j] = [i, j, null]; } }
    if (i + 1 < N && j < G && groups[j].s.length > 1) {   // two nuclei in one spelling group (Philadelphia: -ia)
      const k = c + 0.5;
      if (k < cost[i + 2][j + 1]) { cost[i + 2][j + 1] = k; back[i + 2][j + 1] = [i, j, j, 2]; }
    }
    if (i < N && j < G) {
      const cls = EN_V[nuc[i]], re = EN_COMPAT[cls];
      const k = c + (cls === 'S' || (re && re.test(groups[j].s)) ? 0 : 1.5);
      if (k < cost[i + 1][j + 1]) { cost[i + 1][j + 1] = k; back[i + 1][j + 1] = [i, j, j]; }
    }
  }
  const map = new Array(N).fill(null);
  for (let i = N, j = G; i > 0 || j > 0;) {
    const b = back[i][j]; if (!b) break;
    if (b[3] === 2) { map[b[0]] = { g: b[2], part: 'first' }; map[b[0] + 1] = { g: b[2], part: 'last' }; }
    else if (b[2] !== -1 && b[2] !== null) map[b[0]] = { g: b[2] };
    [i, j] = [b[0], b[1]];
  }
  return map;
}
function enWord(ipa, word) {
  const ph = enPhones(ipa);
  const { g, w } = enGroups(word);
  const nucIdx = ph.map((p, k) => EN_V[p] ? k : -1).filter(k => k >= 0);
  const map = enAlign(nucIdx.map(k => ph[k]), g);
  const letterOf = (grp, part) => { if (!grp) return ''; const c = part === 'last' ? grp.s.slice(-1) : grp.s[0]; return c === 'a' ? 'א' : /[eiy]/.test(c) ? 'י' : 'ו'; };
  const toks = [];
  ph.forEach((p, k) => {
    const n = nucIdx.indexOf(k);
    if (n >= 0) {
      const m = map[n], grp = m ? g[m.g] : null, cls = EN_V[p];
      let out = cls === 'A' ? 'א' : cls === 'I' ? 'י' : cls === 'O' ? 'ו' : cls === 'S' ? letterOf(grp, m && m.part) : cls === 'I+' ? 'י' : cls === 'O+' ? 'ו' : cls;
      if (out) toks.push({ out, kind: 'V' });
      const nx = ph[k + 1];
      if (grp && (!m.part || m.part === 'last') && w[grp.end] === 'r' && !/^[rɹɾ]$/.test(nx || '')) toks.push({ out: 'ר', kind: 'C' });
    } else toks.push({ out: EN_C[p], kind: EN_C[p] ? 'C' : '', ph: p });
  });
  // v as in Italian
  toks.forEach((t, k) => {
    if (t.out === 'v') {
      const pv = toks[k - 1], nx = toks[k + 1];
      t.out = k === 0 ? 'ו' : (pv && pv.kind === 'V' && nx && nx.kind === 'V') ? 'ב' : 'וו';
    }
  });
  const dedup = toks.filter((t, k) => !(t.kind === 'C' && k > 0 && toks[k - 1].kind === 'C' && toks[k - 1].out.slice(-1) === t.out && t.out.length === 1));
  return finalForm(join(dedup));
}
function english(ipa, name) {
  const iw = ipa.trim().split(/\s+/), nw = name.split(/[\s\-]+/).filter(Boolean);
  if (iw.length === nw.length) return iw.map((x, k) => enWord(x, nw[k])).join(' ');
  return enWord(iw.join(''), nw.join(''));
}

/* ---------- Nearest town ---------- */
function nearest(list, lat, lon) {
  let best = null, bd = Infinity;
  const k = Math.cos(lat * Math.PI / 180);
  for (const e of list) {
    const dy = e[0] - lat, dx = (e[1] - lon) * k, d = dx * dx + dy * dy;
    if (d < bd) { bd = d; best = e; }
  }
  return best ? { entry: best, km: Math.sqrt(bd) * 111.2 } : null;
}

const api = { hebrew, nearest, italian, french, german, spanish, east, israeli, fromArabic, judeoArabic };
if (typeof module !== 'undefined') module.exports = api; else root.MTPlace = api;
})(this);
