// Fasts, the four parashiyyoth, and the ʿOmer count, compared with @hebcal/core for 5600–6199.
import {HDate, HebrewCalendar, flags} from '@hebcal/core';
import {createRequire} from 'module'; const require = createRequire(import.meta.url);
const E = require('../engine.js');

const FAST = {"Tzom Gedaliah": 'gedalya', "Asara B'Tevet": 'tevet10', "Ta'anit Esther": 'esther', 'Tzom Tammuz': 'tammuz17', "Tish'a B'Av": 'av9', "Tish'a B'Av (observed)": 'av9'};
const SPEC = {'Shabbat Shekalim': 'sheqalim', 'Shabbat Zachor': 'zakhor', 'Shabbat Parah': 'para', 'Shabbat HaChodesh': 'hahodesh'};
let fastBad = 0, specBad = 0, omerBad = 0, n = 0;
for (let hy = 5600; hy < 6200; hy++) {
  const theirsFast = new Map(), theirsSpec = new Map(), theirsOmer = new Map();
  for (const ev of HebrewCalendar.calendar({year: hy, isHebrewYear: true, omer: true, noModern: true})) {
    const rd = ev.getDate().abs(), d = ev.getDesc();
    if (FAST[d]) theirsFast.set(rd, FAST[d]);
    if (SPEC[d]) theirsSpec.set(rd, SPEC[d]);
    if (ev.getFlags() & flags.OMER_COUNT) theirsOmer.set(rd, ev.omer);
  }
  const start = E.rdFromHeb(hy, 7, 1), end = E.rdFromHeb(hy + 1, 7, 1);
  for (let rd = start; rd < end; rd++) {
    n++;
    for (const il of [false, true]) {
      const f = E.dayInfo(rd, {israel: il}).fast;
      const ours = f ? f.key : undefined;
      if (ours !== theirsFast.get(rd)) { if (fastBad++ < 8) console.log('fast', hy, E.gregFromRd(rd), 'ours', ours, 'hebcal', theirsFast.get(rd)); }
    }
    const sp = E.weekday(rd) === 6 ? E.specialParasha(rd) : null;
    if ((sp || undefined) !== theirsSpec.get(rd)) { if (specBad++ < 8) console.log('special', hy, E.gregFromRd(rd), 'ours', sp, 'hebcal', theirsSpec.get(rd)); }
    const om = E.omerDay(rd);
    if ((om || undefined) !== theirsOmer.get(rd)) { if (omerBad++ < 8) console.log('omer', hy, E.gregFromRd(rd), 'ours', om, 'hebcal', theirsOmer.get(rd)); }
  }
}
console.log('fast mismatches', fastBad, '· four parashiyyoth mismatches', specBad, '· ʿomer mismatches', omerBad, 'of', n, 'days');
if (fastBad || specBad || omerBad) process.exitCode = 1;
