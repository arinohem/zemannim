# Pronunciations of English-speaking town names, for the Hebrew spelling by sound
# (owner, 2026-11-04: «pronunciation taken from a pronouncing dictionary or IPA list
# prepared with the town list; with no known pronunciation, Latin name only»).
#
# Sources, in this order:
#   1. English Wiktionary (CC BY-SA 4.0): the IPA of the town's own sense where the page
#      distinguishes senses; British/Irish/Australian/New Zealand accent for GB, IE, AU, NZ,
#      American for US and CA.
#   2. CMU Pronouncing Dictionary (BSD-style licence), American, for US and CA only,
#      when every word of the name is in it.
# Writes tools/english-ipa.tsv (name, country, IPA, source), read by build_places.py.
# Usage: python3 tools/build_english.py   (needs tools/cache/cities15000.zip from build_places.py)
import io, json, os, re, sys, time, urllib.parse, urllib.request, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, 'tools', 'cache')
UA = {'User-Agent': 'Zemannim-build/1.0 (personal calendar app; build script, one-off)'}
ENGLISH = set('GB IE US CA AU NZ'.split())
SKIP = {'PPLX', 'PPLH', 'PPLQ', 'PPLW', 'PPLCH'}

def towns():
    out = set()
    with zipfile.ZipFile(os.path.join(CACHE, 'cities15000.zip')) as z, z.open('cities15000.txt') as fh:
        for line in io.TextIOWrapper(fh, encoding='utf-8'):
            f = line.split('\t')
            if f[8] in ENGLISH and f[7] not in SKIP and not (f[8] == 'CA' and f[10] == '10'):
                out.add((f[1], f[8]))
    for line in open(os.path.join(ROOT, 'tools', 'place-exceptions.tsv'), encoding='utf-8'):
        if not line.startswith('#') and line.strip():
            h, n, cc = line.rstrip('\n').split('\t')
            if cc in ENGLISH: out.add((n, cc))
    return sorted(out)

UKISH = re.compile(r'\b(UK|U\.K\.|England|English|Scotland|Scottish|Wales|Welsh|Britain|British|Ireland|Irish|Northern Ireland)\b')
USISH = re.compile(r'\b(US|U\.S\.|United States|America|American|Canada|Canadian|[A-Z][a-z]+, USA)\b')
AUISH = re.compile(r'\b(Australia|Australian|New Zealand)\b')
ACC = {'GB': ('RP', 'UK', 'GB', 'SSB', 'England', 'Received Pronunciation', 'Scotland', 'Wales', 'Ireland', 'Northern Ireland'),
       'IE': ('Ireland', 'IE', 'RP', 'UK', 'GB', 'SSB'),
       'AU': ('AU', 'Australia', 'GenAm', 'RP', 'UK'), 'NZ': ('NZ', 'New Zealand', 'RP', 'UK'),
       'US': ('GA', 'US', 'GenAm', 'General American', 'CA', 'Canada'), 'CA': ('CA', 'Canada', 'GA', 'US', 'GenAm')}
SENSE = {'GB': UKISH, 'IE': UKISH, 'US': USISH, 'CA': USISH, 'AU': AUISH, 'NZ': AUISH}

def parse(wikitext):
    """[(sense text or '', accent tags, ipa)] from the English Pronunciation section."""
    m = re.search(r'==English==(.*?)(?:\n==[^=]|\Z)', wikitext, re.S)
    if not m: return []
    en = m.group(1)
    res = []
    for p in re.finditer(r'===+\s*Pronunciation[^=]*===+(.*?)(?=\n===|\Z)', en, re.S):
        sense = ''
        for line in p.group(1).split('\n'):
            s = re.search(r'\{\{(?:sense|s|q|qualifier)\|([^}]*)\}\}', line)
            if s and not line.startswith('*:'): sense = s.group(1)
            elif not line.startswith('*:') and line.startswith('*') and '{{IPA' not in line: sense = ''
            for ipa in re.finditer(r'\{\{IPA\|en\|([^}]*)\}\}', line):
                parts = ipa.group(1).split('|')
                prons = [x for x in parts if x.startswith('/') or x.startswith('[')]
                acc = [x[2:] for x in parts if x.startswith('a=')] + [x[3:] for x in parts if x.startswith('aa=')]
                acc = [y.strip() for a in acc for y in a.split(',')]
                inline_q = re.search(r'\{\{(?:q|qualifier|i)\|([^}]*)\}\}', line)
                for pr in prons:
                    if pr.strip('/[]').startswith('-') or pr.strip('/[]').endswith('-'): continue   # partial pronunciations
                    res.append((sense or (inline_q.group(1) if inline_q else ''), acc, pr.strip('/[]')))
    return res

def choose(entries, cc):
    if not entries: return None
    senses = {s for s, a, p in entries if s}
    if senses:
        mine = [e for e in entries if e[0] and SENSE[cc].search(e[0])]
        if mine: entries = mine
        elif cc in ('US', 'CA'): entries = [e for e in entries if not e[0] or not UKISH.search(e[0])] or entries
        else: entries = [e for e in entries if not e[0] or not USISH.search(e[0])] or entries
    for tag in ACC[cc]:
        for s, a, p in entries:
            if tag in a: return p
    untagged = [p for s, a, p in entries if not a]
    return untagged[0] if untagged else entries[0][2]

def wiktionary(names):
    got = {}
    names = sorted(names)
    for k in range(0, len(names), 50):
        batch = names[k:k + 50]
        url = 'https://en.wiktionary.org/w/api.php?' + urllib.parse.urlencode({
            'action': 'query', 'prop': 'revisions', 'rvprop': 'content', 'rvslots': 'main', 'format': 'json',
            'redirects': '1', 'titles': '|'.join(batch)})
        for attempt in range(5):
            try:
                d = json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60)); break
            except Exception as e:
                time.sleep(5 * (attempt + 1))
        else:
            sys.exit('Wiktionary not reachable')
        redir = {r['from']: r['to'] for r in d['query'].get('redirects', [])}
        norm = {r['from']: r['to'] for r in d['query'].get('normalized', [])}
        pages = {p['title']: p for p in d['query']['pages'].values()}
        for n in batch:
            t = redir.get(norm.get(n, n), norm.get(n, n))
            p = pages.get(t)
            if p and 'revisions' in p:
                got[n] = parse(p['revisions'][0]['slots']['main']['*'])
        time.sleep(1)
        print(f'wiktionary {k + len(batch)}/{len(names)}', file=sys.stderr)
    return got

ARPA = {'AA': 'ɑː', 'AE': 'æ', 'AH': 'ʌ', 'AO': 'ɔː', 'AW': 'aʊ', 'AY': 'aɪ', 'EH': 'ɛ', 'ER': 'ɝ', 'EY': 'eɪ', 'IH': 'ɪ',
        'IY': 'iː', 'OW': 'oʊ', 'OY': 'ɔɪ', 'UH': 'ʊ', 'UW': 'uː', 'B': 'b', 'CH': 'tʃ', 'D': 'd', 'DH': 'ð', 'F': 'f',
        'G': 'ɡ', 'HH': 'h', 'JH': 'dʒ', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'NG': 'ŋ', 'P': 'p', 'R': 'r', 'S': 's',
        'SH': 'ʃ', 'T': 't', 'TH': 'θ', 'V': 'v', 'W': 'w', 'Y': 'j', 'Z': 'z', 'ZH': 'ʒ'}
def cmu():
    p = os.path.join(CACHE, 'cmudict.dict')
    if not os.path.exists(p):
        urllib.request.urlretrieve('https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict', p)
    d = {}
    for line in open(p, encoding='utf-8'):
        w, *ph = line.split('#')[0].split()
        if '(' in w: continue
        ipa = ''
        for x in ph:
            base = re.sub(r'\d', '', x)
            v = ARPA[base]
            if base == 'AH' and x.endswith('0'): v = 'ə'
            if base == 'ER' and x.endswith('0'): v = 'ɚ'
            if x.endswith('1'): v = 'ˈ' + v
            ipa += v
        d[w] = ipa
    return d

def main():
    ts = towns()
    wk = wiktionary({n for n, cc in ts})
    dic = cmu()
    rows, nw, nc = [], 0, 0
    for n, cc in ts:
        ipa = choose(wk.get(n, []), cc)
        src = 'wiktionary'
        if not ipa and cc in ('US', 'CA'):
            ws = re.findall(r"[A-Za-z']+", n.replace('.', ''))
            if ws and all(w.lower() in dic for w in ws):
                ipa = ' '.join(dic[w.lower()] for w in ws); src = 'cmudict'
        if ipa:
            rows.append(f'{n}\t{cc}\t{ipa}\t{src}')
            if src == 'wiktionary': nw += 1
            else: nc += 1
    with open(os.path.join(ROOT, 'tools', 'english-ipa.tsv'), 'w', encoding='utf-8') as fh:
        fh.write('# Pronunciations of English-speaking town names (tools/build_english.py): name, country, IPA, source\n')
        fh.write('\n'.join(rows) + '\n')
    print(f'{len(ts)} towns: {nw} from Wiktionary, {nc} from CMUdict, {len(ts) - nw - nc} without pronunciation', file=sys.stderr)

if __name__ == '__main__':
    main()
