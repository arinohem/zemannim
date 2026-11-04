# Genera index.html (servito da GitHub Pages) da tools/index.src.html.
# Uso: python3 tools/build.py            -> index.html
#      python3 tools/build.py --preview  -> preview.html (file unico, script incorporati)
import sys, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(root, 'tools', 'index.src.html'), encoding='utf-8').read()
if '--preview' in sys.argv:
    eng = open(os.path.join(root, 'engine.js'), encoding='utf-8').read()
    ui = open(os.path.join(root, 'ui.js'), encoding='utf-8').read()
    pn = open(os.path.join(root, 'placename.js'), encoding='utf-8').read()
    out = src.replace('<!--PWA-->', '').replace('<!--SCRIPTS-->', '<script>\n' + eng + '\n</script>\n<script>\n' + pn + '\n</script>\n<script>\n' + ui + '\n</script>')
    open(os.path.join(root, 'preview.html'), 'w', encoding='utf-8').write(out)
else:
    pwa = '<link rel="manifest" href="manifest.json">\n<link rel="apple-touch-icon" href="icon-180.png">'
    out = src.replace('<!--PWA-->', pwa).replace('<!--SCRIPTS-->', '<script src="engine.js"></script>\n<script src="placename.js"></script>\n<script src="ui.js"></script>')
    open(os.path.join(root, 'index.html'), 'w', encoding='utf-8').write(out)
