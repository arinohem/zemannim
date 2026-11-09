import glob, html, re, sys, json
sys.stdout.reconfigure(encoding='utf-8')
MT = sys.argv[1]; DOC = sys.argv[2]; OUT = sys.argv[3]
LET = re.compile(r'[א-ת]')
# local corpus: list of (ref, text)
corpus = []
for f in sorted(glob.glob(MT + '/*.htm')):
    t = open(f, 'rb').read().decode('cp1255', errors='replace').replace('�', '').replace('־', ' ')
    t = re.sub(r'[֑-ֽֿ-ׇ]', '', t)
    title = ''
    for m in re.finditer(r'<H2>(.*?)</H2>|<P>(.*?)</P>', t, re.S | re.I):
        if m.group(1):
            title = re.sub(r'<[^>]+>', '', m.group(1)).strip(); continue
        p = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', m.group(2)))).strip()
        num = re.match(r'([א-ת]+,[א-ת]+)', p)
        corpus.append((title + ' ' + (num.group(1) if num else ''), p))

def norm(s):
    """letters and single spaces only, with a map to original indices"""
    out, idx = [], []
    for i, c in enumerate(s):
        if LET.match(c):
            out.append(c); idx.append(i)
        elif c.isspace() or c in ',.;:-"\'()[]':
            if out and out[-1] != ' ':
                out.append(' '); idx.append(i)
    return ''.join(out), idx

ncorpus = [(ref, p, *norm(p)) for ref, p in corpus]

def pattern(q):
    nq, _ = norm(q)
    nq = nq.strip()
    parts = []
    for c in nq:
        if c in 'יו':
            parts.append('[יו]?')
        elif c == ' ':
            parts.append(' ?')
        else:
            parts.append(re.escape(c) + '[יו]?' if False else re.escape(c))
    # allow a mater to be missing or present between any two letters
    return re.compile(''.join(parts))

doc = open(DOC, encoding='utf-8').read()
res = []
for m in re.finditer(r'«([^«»]*[א-ת][^«»]*)»', doc):
    q = m.group(1)
    if not LET.search(q):
        continue
    pat = pattern(q)
    hits = []
    for ref, p, n, idx in ncorpus:
        for h in pat.finditer(n):
            a, b = idx[h.start()], idx[h.end() - 1] + 1
            hits.append((ref, p[a:b]))
    forms = sorted(set(x[1] for x in hits))
    res.append({'pos': m.start(), 'quote': q, 'forms': forms, 'refs': sorted(set(x[0] for x in hits))[:6]})
json.dump(res, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for r in res:
    same = r['forms'] == [r['quote']]
    tag = 'NOT FOUND' if not r['forms'] else ('same' if same else 'CHANGE' if len(r['forms']) == 1 else 'AMBIGUOUS')
    print(tag, '|', r['quote'], '|', ' / '.join(r['forms'][:3]), '|', '; '.join(r['refs'][:3]))
