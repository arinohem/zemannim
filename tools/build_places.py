# Builds places.json: the list of towns the app searches for the name of the place
# found from the phone's location (nearest town to the coordinates).
#
# Source: GeoNames (https://www.geonames.org, CC BY 4.0): all Italian comuni (ADM3),
# San Marino, the Vatican and Monaco, and the towns of 15,000+ inhabitants elsewhere,
# plus the towns of the exceptions list (tools/place-exceptions.tsv) and of the
# Ashkenazi East list (notes/place-name/east-names.json), which may be smaller.
#
# Usage: python3 tools/build_places.py   (downloads GeoNames into tools/cache/ the first time)
#
# Each entry of places.json is [lat, lon, name, rule, extra?]:
#   name  = the name the Hebrew spelling is made from (local name; the Italian name in
#           Italy and in the Italian-named places abroad; the Castilian name in Spain; etc.)
#   rule  = which spelling rules apply (it, fr, de, es, en, pl, cs, sk, hu, ro, lt, lv, et,
#           uk, be, ru), or '' when the app shows the Latin name only
#   extra = {it, en, fr: display names where they differ from name; he: fixed Hebrew form
#           (exceptions list, Ashkenazi East, Israel); z: words with voiced or silent z;
#           s: words with voiceless intervocalic s; w: title of the Hebrew Wikipedia article,
#           for places with no rules and English names (owner, 2026-11-05), adapted to the
#           Judeo-Italian spelling by placename.js; c: country code, with w)
#
# Hebrew Wikipedia (CC BY-SA 4.0): the article of the GeoNames place, found through Wikidata
# (GeoNames id P1566, by a query to query.wikidata.org; the Wikidata id in GeoNames) or through
# the English Wikipedia link in GeoNames; titles from the hewiki dumps (page, page_props,
# langlinks) in tools/cache/. Redirects and disambiguation pages are left out.
import gzip, io, json, math, os, re, sys, unicodedata, urllib.parse, urllib.request, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'tools', 'cache')
NOTES = os.path.join(ROOT, 'notes', 'place-name')
GN = 'https://download.geonames.org/export/dump/'
FILES = ['IT.zip', 'cities15000.zip', 'cities1000.zip', 'alternateNamesV2.zip']
HEWIKI = 'https://dumps.wikimedia.org/hewiki/latest/hewiki-latest-'
DUMPS = ['page', 'page_props', 'langlinks']
UA = {'User-Agent': 'zemannim-build/1.0 (personal PWA; build script)'}
WDQS = ('SELECT ?item ?gn ?title WHERE { ?item wdt:P1566 ?gn . ?sl schema:about ?item ; '
        'schema:isPartOf <https://he.wikipedia.org/> ; schema:name ?title . }')

def download(url, p):
    print('downloading', url, file=sys.stderr)
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=900) as r, open(p + '.part', 'wb') as fh:
        while True:
            b = r.read(1 << 20)
            if not b: break
            fh.write(b)
    os.replace(p + '.part', p)

def fetch():
    os.makedirs(CACHE, exist_ok=True)
    for f in FILES:
        p = os.path.join(CACHE, f)
        if not os.path.exists(p): download(GN + f, p)
    for f in DUMPS:
        p = os.path.join(CACHE, 'hewiki-' + f + '.sql.gz')
        if not os.path.exists(p): download(HEWIKI + f + '.sql.gz', p)
    p = os.path.join(CACHE, 'hewiki-geonames.tsv')
    if not os.path.exists(p):
        q = urllib.parse.urlencode({'query': WDQS})
        try: download('https://query.wikidata.org/sparql?' + q + '&format=tsv', p)
        except Exception as e: print('Wikidata query failed (P1566 join skipped):', e, file=sys.stderr)

def sql_rows(name):
    """Rows of a MediaWiki SQL dump (one tuple per line)."""
    with gzip.open(os.path.join(CACHE, 'hewiki-' + name + '.sql.gz'), 'rt', encoding='utf-8', errors='replace') as fh:
        for line in fh:
            if not line.startswith('('): continue
            i, n, row, cur, q = 1, len(line), [], [], False
            while i < n:
                c = line[i]
                if q:
                    if c == chr(92): cur.append(line[i + 1]); i += 2; continue
                    if c == "'": q = False
                    else: cur.append(c)
                elif c == "'": q = True
                elif c == ',': row.append(''.join(cur)); cur = []
                elif c == ')':
                    row.append(''.join(cur)); yield row
                    row, cur = [], []
                    while i + 1 < n and line[i + 1] in ',(': i += 1   # next tuple on the same line
                else: cur.append(c)
                i += 1

NOT_PLACE = {'אוכל', 'פירושונים'}   # disambiguators of articles that are not the town
def hewiki():
    """Wikidata id -> title, English title -> title, GeoNames id -> title (articles only, no redirects)."""
    page = {}
    for r in sql_rows('page'):
        if r[1] == '0' and r[3] == '0': page[r[0]] = r[2].replace('_', ' ')
    disamb, byq = set(), {}
    for r in sql_rows('page_props'):
        if r[1] == 'disambiguation': disamb.add(r[0])
        elif r[1] == 'wikibase_item' and r[0] in page: byq[r[0]] = r[2]
    ok = lambda pid: pid in page and pid not in disamb and not (re.search(r'\(([^)]*)\)$', page[pid]) or [None, ''])[1] in NOT_PLACE
    q = {v: page[k] for k, v in byq.items() if ok(k)}
    en = {}
    for r in sql_rows('langlinks'):
        if r[1] == 'en' and ok(r[0]): en[r[2]] = page[r[0]]
    gn = {}
    p = os.path.join(CACHE, 'hewiki-geonames.tsv')
    if os.path.exists(p):
        for line in open(p, encoding='utf-8').read().splitlines()[1:]:
            f = line.split('\t')
            if len(f) < 3: continue
            qid, g = f[0].rsplit('/', 1)[-1].rstrip('>'), f[1].strip('"')
            if qid in q: gn.setdefault(g, q[qid])
    return q, en, gn

def strip_title(t):
    """Article title without the disambiguator: «ברדה (הולנד)» → ברדה; «פורטלנד, אורגון» → פורטלנד."""
    return re.sub(r',.*$', '', re.sub(r'\s*\([^)]*\)$', '', t)).strip()

def rows(zname, inner):
    with zipfile.ZipFile(os.path.join(CACHE, zname)) as z, z.open(inner) as fh:
        for line in io.TextIOWrapper(fh, encoding='utf-8'):
            yield line.rstrip('\n').split('\t')

def fold(s):
    s = unicodedata.normalize('NFKD', s.lower())
    return ''.join(c for c in s if not unicodedata.combining(c)).replace('’', "'")

def km(a, b, c, d):
    x = (d - b) * math.cos(math.radians((a + c) / 2)); y = c - a
    return 111.2 * math.hypot(x, y)

BUREAU = re.compile(r'(comune|municipio|gemeinde|stadt|commune|municipality|city of|ville de|town of|borough of|county of|gmina|miasto|obec|město|mesto|municipiul|comuna|oraș|orașul)\b', re.I)
SKIP = {'PPLX', 'PPLH', 'PPLQ', 'PPLW', 'PPLCH'}
SPANISH = set('ES MX GT HN SV NI CR PA CU DO PR CO VE EC PE BO CL AR UY PY'.split())
ENGLISH = set('GB IE US CA AU NZ'.split())
EAST = {'PL': 'pl', 'CZ': 'cs', 'SK': 'sk', 'HU': 'hu', 'RO': 'ro', 'MD': 'ro', 'LT': 'lt', 'LV': 'lv',
        'EE': 'et', 'UA': 'uk', 'BY': 'be', 'RU': 'ru'}
GERMAN = {'DE', 'AT', 'LI'}
CH_FR, CH_IT = {'GE', 'VD', 'NE', 'JU', 'FR', 'VS'}, {'TI'}
DALMATIA_ISTRIA = {('HR', '04'), ('HR', '03'), ('HR', '13'), ('HR', '15'), ('HR', '19'),
                   ('SI', 'J9'), ('SI', '40'), ('SI', '50')}   # Istria, Dalmatian counties; Piran, Izola, Koper

def rule_of(cc, a1, a2, name):
    """Spelling rules and the language of the name they work on."""
    if cc in ('IT', 'SM', 'VA', 'MC'): return 'it', 'it'
    if cc == 'CH': return ('it', 'it') if a1 in CH_IT else ('fr', 'fr') if a1 in CH_FR else ('de', 'de')
    if cc == 'FR':
        if a1 == '94' or fold(name) in ('nice', 'tende', 'la brigue', 'breil-sur-roya', 'saorge', 'fontan'): return 'it', 'it'
        if a2 in ('67', '68', '57'): return 'de', 'de'
        return 'fr', 'fr'
    if (cc, a1) in DALMATIA_ISTRIA: return 'it', 'it'
    if cc == 'BE': return ('fr', 'fr') if a1 in ('WAL', 'BRU') else ('', '')
    if cc == 'CA' and a1 == '10': return 'fr', 'fr'
    if cc in GERMAN: return 'de', 'de'
    if cc in SPANISH: return 'es', 'es'
    if cc in ENGLISH: return 'en', 'en'
    if cc in EAST:
        r = EAST[cc]
        return r, (r if r not in ('uk', 'be', 'ru') else '')   # Cyrillic: the GeoNames name is the romanization
    if cc in ('IL', 'PS'): return 'he', 'he'
    if cc in ARAB: return 'ar', ''
    return '', ''

# Arabic-speaking countries (owner, 2026-11-05): the Arabic name, letter for letter, if it is the same
# name as the Latin one (GeoNames sometimes gives another place's name: Mohammedia, Soran).
ARAB = set('MA DZ TN LY EG SD SA YE OM AE QA BH KW IQ SY LB JO MR DJ SO KM EH'.split())
AR_CLASS = {'ب': 'B', 'پ': 'B', 'ت': 'T', 'ط': 'T', 'ث': 'TS', 'د': 'D', 'ض': 'D', 'ذ': 'DZ', 'ظ': 'ZD', 'ج': 'G', 'چ': 'S',
            'غ': 'GR', 'ق': 'KG', 'ك': 'KG', 'ک': 'KG', 'گ': 'G', 'ڨ': 'G', 'س': 'S', 'ص': 'S', 'ش': 'S', 'ز': 'Z', 'ف': 'F', 'ڤ': 'FG',
            'ر': 'R', 'ل': 'L', 'م': 'M', 'ن': 'N', 'خ': 'K', 'ح': '', 'ه': '', 'ع': '', 'ة': '', 'و': '', 'ي': '', 'ى': '', 'ا': '',
            'أ': '', 'إ': '', 'آ': '', 'ء': '', 'ئ': '', 'ؤ': ''}
LAT_CLASS = {'b': 'B', 'p': 'B', 't': 'T', 'd': 'D', 'j': 'G', 'g': 'G', 'k': 'K', 'c': 'K', 'q': 'K', 's': 'S', 'z': 'Z',
             'x': 'K', 'f': 'F', 'v': 'F', 'r': 'R', 'l': 'L', 'm': 'M', 'n': 'N'}
AR_ADMIN = re.compile(r'^(بلدية|ولاية|دائرة|ناحية|قضاء|إمارة|محافظة|مدينة)\s+')
def ar_skel(a):
    a = re.sub(r'[ً-ٰٟـ‎‏()]|البلدية', '', a)
    a = AR_ADMIN.sub('', a)
    a = re.sub(r'(^|\s)ال', r'', a)
    return [AR_CLASS[c] for c in a if AR_CLASS.get(c)]
def lat_skel(n):
    n = fold(n)
    n = re.sub(r"(al|el|ad|ar|as|ash|at|az|an|ed|er|es|ech|et|ez|en)[\s\-]", ' ', ' ' + n)
    for a, b in (('kh', 'k'), ('gh', 'g'), ('sh', 's'), ('ch', 's'), ('th', 't'), ('dh', 'd'), ('dj', 'j'), ('ou', 'w')):
        n = n.replace(a, b)
    n = re.sub(r'(.)', r'', n)   # doubled letters (Sousse: s, s)
    return [LAT_CLASS[c] for c in n if c in LAT_CLASS]
def ar_matches(a, names):
    A = ar_skel(a)
    if not A: return False
    for n in names:
        L = lat_skel(n)
        if not L: continue
        m = [[0] * (len(L) + 1) for _ in range(len(A) + 1)]
        for i in range(len(A)):
            for j in range(len(L)):
                m[i + 1][j + 1] = m[i][j] + 1 if L[j] in A[i] else max(m[i][j + 1], m[i + 1][j])
        if m[-1][-1] / max(len(A), len(L)) >= 0.6: return True
    return False

def main():
    fetch()
    places = {}   # geonameid -> dict
    for f in rows('IT.zip', 'IT.txt'):
        if f[7] == 'ADM3':
            places[f[0]] = dict(id=f[0], name=f[1], lat=float(f[4]), lon=float(f[5]), cc='IT', a1=f[10], a2=f[11], pop=int(f[14] or 0))
    for f in rows('cities15000.zip', 'cities15000.txt'):
        borough = (f[8] == 'GB' and f[11] == 'GLA' and f[7] == 'PPLA3') or (f[8] == 'US' and f[10] == 'NY' and f[11] in ('005', '047', '061', '081', '085') and f[1] != 'New York City')
        if f[8] != 'IT' and f[7] not in SKIP and not borough:   # London boroughs and New York boroughs: the city is found instead
            places[f[0]] = dict(id=f[0], name=f[1], lat=float(f[4]), lon=float(f[5]), cc=f[8], a1=f[10], a2=f[11], pop=int(f[14] or 0))
    # Sections of the largest cities (Highbury, Paris 04, Brooklyn…): the city is found instead.
    # Radius 0.004·√population km (London, New York 12 km; Paris 6 km; Milan 5 km: Monza stays apart).
    big = [d for d in places.values() if d['pop'] >= 1000000 and d['cc'] != 'IT']
    for d in list(places.values()):
        if d['cc'] == 'IT': continue
        if re.match(r'^(Paris|Lyon|Marseille) \d\d', d['name']): del places[d['id']]; continue
        for c in big:
            if c is not d and c['pop'] > 3 * d['pop'] and km(c['lat'], c['lon'], d['lat'], d['lon']) < 0.004 * math.sqrt(c['pop']):
                del places[d['id']]; break
    small = []
    for f in rows('cities1000.zip', 'cities1000.txt'):
        d = dict(id=f[0], name=f[1], lat=float(f[4]), lon=float(f[5]), cc=f[8], a1=f[10], a2=f[11], pop=int(f[14] or 0),
                 alt={fold(x) for x in f[3].split(',') if x} | {fold(f[1]), fold(f[2])}, fc=f[7])
        small.append(d)
        if f[8] in ('SM', 'VA', 'MC') and f[7] not in SKIP: places[f[0]] = d
    by_id = {d['id']: d for d in small}

    # Alternate names in the languages the app needs
    langs = {'it', 'en', 'fr', 'de', 'es', 'he', 'ar', 'pl', 'cs', 'sk', 'hu', 'ro', 'lt', 'lv', 'et'}
    want = set(places) | set(by_id)
    alt = {}   # id -> lang -> (score, name)
    allnames = {}
    wkdt, enlink = {}, {}
    for f in rows('alternateNamesV2.zip', 'alternateNamesV2.txt'):
        gid = f[1]
        if gid not in want: continue
        lang, nm = f[2], f[3]
        if lang == 'wkdt': wkdt.setdefault(gid, nm)
        if lang == 'link' and '//en.wikipedia.org/wiki/' in nm:
            enlink.setdefault(gid, urllib.parse.unquote(nm.split('/wiki/', 1)[1]).replace('_', ' '))
        if lang in ('link', 'post', 'iata', 'icao', 'faac', 'abbr', 'wkdt', 'unlc', 'fr_1793'): continue
        pref, short, colloq, hist = f[4] == '1', f[5] == '1', f[6] == '1', f[7] == '1'
        if not hist: allnames.setdefault(gid, set()).add(fold(nm))
        if lang in langs and not colloq and not hist and not BUREAU.match(nm):
            score = (2 if pref else 0) + (0 if short else 1)
            cur = alt.setdefault(gid, {}).get(lang)
            if cur is None or score > cur[0]: alt[gid][lang] = (score, nm)
    A = lambda gid, lang: alt.get(gid, {}).get(lang, (0, None))[1]

    def names_of(d):
        return {fold(d['name'])} | allnames.get(d['id'], set()) | d.get('alt', set())
    every = dict(by_id); every.update(places)
    index, grid = {}, {}
    for d in every.values():
        for n in names_of(d): index.setdefault(n, []).append(d)
        grid.setdefault((round(d['lat']), round(d['lon'])), []).append(d)
    def around(lat, lon):
        return [d for i in (-1, 0, 1) for j in (-1, 0, 1) for d in grid.get((round(lat) + i, round(lon) + j), [])]

    # Exceptions list
    he = {}
    for line in open(os.path.join(ROOT, 'tools', 'place-exceptions.tsv'), encoding='utf-8'):
        if line.startswith('#') or not line.strip(): continue
        heb, nm, cc = line.rstrip('\n').split('\t')
        cands = [d for d in index.get(fold(nm), []) if d['cc'] == cc]
        if not cands: sys.exit('exception not found: ' + nm)
        best = max(cands, key=lambda d: (d['id'] in places, d['pop']))
        places[best['id']] = best; he[best['id']] = heb

    # Ashkenazi East (method approved by the owner, 2026-11-04)
    MODERN_YI = {'קאלינינגראד', 'דניפרא', 'דאנעצק', 'זאפאראזשיע', 'טאלין'}
    SPECIAL = {'Budapest': 'בודאפעסט', 'Mohyliv-Podilskyi': None}
    for t in json.load(open(os.path.join(NOTES, 'east-names.json'), encoding='utf-8')):
        heb = SPECIAL.get(t['local'], t['rab'] or (t['yi'] if t['yi'] not in MODERN_YI else ''))
        if not heb: continue
        near = [d for d in around(t['lat'], t['lon']) if d['cc'] == t['cc'] and km(d['lat'], d['lon'], t['lat'], t['lon']) < 12]
        named = [d for d in near if fold(t['local']) in names_of(d) or fold(t.get('title', '')) in names_of(d)]
        pick = max(named or near, key=lambda d: d['pop'], default=None)
        if pick is None:
            pick = dict(id='e' + t['local'], name=t['local'], lat=t['lat'], lon=t['lon'], cc=t['cc'], a1='', a2='', pop=0)
        places[pick['id']] = pick
        he.setdefault(pick['id'], heb)

    # Italian voicing data (owner, 2026-11-04)
    zdat = json.load(open(os.path.join(NOTES, 'z-voiced-final.json'), encoding='utf-8'))
    sdat = json.load(open(os.path.join(NOTES, 's-intervocalic-final.json'), encoding='utf-8'))

    ipa = {}
    p = os.path.join(ROOT, 'tools', 'english-ipa.tsv')
    if os.path.exists(p):
        for line in open(p, encoding='utf-8'):
            if line.startswith('#') or not line.strip(): continue
            n, cc, pr, src = line.rstrip('\n').split('\t')
            ipa[(n, cc)] = pr

    hq, hen, hgn = hewiki()
    def wiki(gid):
        t = hgn.get(gid) or hq.get(wkdt.get(gid, '')) or hen.get(enlink.get(gid, ''))
        return strip_title(t) if t else None

    out, stats = [], {}
    for d in places.values():
        gid, cc = d['id'], d['cc']
        rule, lang = rule_of(cc, d['a1'], d['a2'], d['name'])
        if cc == 'IT':
            name = d['name'].split('/')[0]   # South Tyrol: «Bolzano/Bozen»
            if name not in zdat and name not in sdat and A(gid, 'it') in zdat.keys() | sdat.keys(): name = A(gid, 'it')
        elif lang and lang != 'he':
            name = A(gid, lang) or d['name']
        else:
            name = d['name']
        if (cc, d['a1']) in DALMATIA_ISTRIA and not A(gid, 'it'): rule = ''
        x = {}
        for l in ('it', 'en', 'fr'):
            v = A(gid, l)
            if v and fold(v).replace('ş', 's').replace('ţ', 't') != fold(name).replace('ș', 's').replace('ț', 't'): x[l] = v
        if gid in he: x['he'] = he[gid]
        elif rule == 'he':
            if A(gid, 'he'): x['he'] = A(gid, 'he')
        if rule == 'he': rule = ''
        if rule == 'en' and 'he' not in x and (d['name'], cc) in ipa: x['p'] = ipa[(d['name'], cc)]
        if rule == 'ar' and 'he' not in x:
            a = A(gid, 'ar')
            lat_names = [n for n in names_of(d) if re.search('[a-z]', n)]
            if a and ar_matches(a, lat_names): x['ar'] = a; x['c'] = cc; stats['arabic'] = stats.get('arabic', 0) + 1
        if rule in ('', 'en') and 'he' not in x and cc not in ('IL', 'PS'):
            w = wiki(gid)
            if w: x['w'] = w; x['c'] = cc; stats['wiki'] = stats.get('wiki', 0) + 1
        if cc == 'IT':
            z = {w: v for w, v in zdat.get(name, {}).items() if v != 'u'}
            s = {w: v for w, v in sdat.get(name, {}).items() if v != 'v'}
            if z: x['z'] = z
            if s: x['s'] = s
        e = [round(d['lat'], 3), round(d['lon'], 3), name, rule]
        if x: e.append(x)
        out.append(e)
        stats[rule] = stats.get(rule, 0) + 1
    out.sort(key=lambda e: (e[0], e[1]))
    with open(os.path.join(ROOT, 'places.json'), 'w', encoding='utf-8') as fh:
        fh.write('[\n' + ',\n'.join(json.dumps(e, ensure_ascii=False, separators=(',', ':')) for e in out) + '\n]\n')
    print(len(out), 'places;', ', '.join(f'{k or "latin only"} {v}' for k, v in sorted(stats.items())), file=sys.stderr)

if __name__ == '__main__':
    main()
