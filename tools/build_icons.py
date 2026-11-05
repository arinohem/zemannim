#!/usr/bin/env python3
"""Writes the app icons from one drawing (direction D, «L'iniziale»): tools/icon.svg,
tools/icon-maskable.svg, icon-180/192/512.png, icon-maskable-192/512.png.

Needs Pillow. The zayin outline was taken once from Frank Ruhl Hofshi Bold (Yanek Iontef,
Fontef) and is stored here, so the font is not needed to rebuild.

The ordinary icon fills the canvas (iOS rounds the corners). In the maskable icon everything
that matters stays inside the circle of radius 40% of the canvas (W3C safe zone), because
Android launchers crop the rest. All PNGs are opaque: iOS shows transparency as black.
"""
import math, os, re
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
BROWN, CREAM, AMBER = '#7a4b16', '#f4f1ea', '#e0a861'   # the app's --acc, --bg and dark --acc
ZAYIN = "M192 540 115 551C91 554 85 564 85 584V597H66C56 574 30 517 30 460C30 415 42 397 92 389L128 383C102 319 94 267 107 203L133 75C144 23 136 12 132 6V-2C139 -3 148 -4 156 -4C197 -4 215 28 201 89L162 257C151 308 155 351 160 378L198 372C213 370 215 362 217 356H226C232 368 254 402 254 452C254 497 239 534 192 540Z"
ZAYIN_BOX = (30, -4, 254, 597)                                     # x0, y0, x1, y1, y upwards

# half: half side of the outer rule; gap: between the rules; widths of the rules; letter height.
PLAIN = dict(half=196, gap=19, outer=10, inner=6, letter=284)
MASKABLE = dict(half=138, gap=14, outer=8, inner=5, letter=200)


def transform(height):
    x0, y0, x1, y1 = ZAYIN_BOX
    s = height / (y1 - y0)
    return s, 256 - s * (x0 + x1) / 2, 256 + height / 2 + s * y0


def svg(p):
    s, tx, ty = transform(p['letter'])
    a, b = 256 - p['half'], 2 * p['half']
    i = p['gap']
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
            f'<rect width="512" height="512" fill="{BROWN}"/>'
            f'<rect x="{a}" y="{a}" width="{b}" height="{b}" fill="none" stroke="{CREAM}" stroke-width="{p["outer"]}"/>'
            f'<rect x="{a + i}" y="{a + i}" width="{b - 2 * i}" height="{b - 2 * i}" fill="none" stroke="{AMBER}" stroke-width="{p["inner"]}"/>'
            f'<path fill="{CREAM}" transform="translate({tx:.3f} {ty:.3f}) scale({s:.5f} {-s:.5f})" d="{ZAYIN}"/>'
            f'</svg>\n')


def flatten(d, n=24):
    """Points of the outline, which uses only M, L, H, V, C, Q, Z in absolute coordinates."""
    out, x, y = [], 0.0, 0.0
    for cmd, args in re.findall(r'([MLHVCQZ])([^MLHVCQZ]*)', d):
        v = [float(t) for t in re.findall(r'-?\d*\.?\d+', args)]
        if cmd in 'ML':
            for k in range(0, len(v), 2):
                x, y = v[k], v[k + 1]; out.append((x, y))
        elif cmd == 'H':
            for t in v:
                x = t; out.append((x, y))
        elif cmd == 'V':
            for t in v:
                y = t; out.append((x, y))
        elif cmd == 'C':
            for k in range(0, len(v), 6):
                a, b, c, e, f, g = v[k:k + 6]
                for j in range(1, n + 1):
                    t = j / n; u = 1 - t
                    out.append((u**3*x + 3*u*u*t*a + 3*u*t*t*c + t**3*f, u**3*y + 3*u*u*t*b + 3*u*t*t*e + t**3*g))
                x, y = f, g
        elif cmd == 'Q':
            for k in range(0, len(v), 4):
                a, b, f, g = v[k:k + 4]
                for j in range(1, n + 1):
                    t = j / n; u = 1 - t
                    out.append((u*u*x + 2*u*t*a + t*t*f, u*u*y + 2*u*t*b + t*t*g))
                x, y = f, g
    return out


def raster(p, size):
    k = 2048 / 512                                      # draw large, then reduce
    im = Image.new('RGB', (2048, 2048), BROWN)
    dr = ImageDraw.Draw(im)
    def rule(half, w, colour):
        lo, hi = (256 - half - w / 2) * k, (256 + half + w / 2) * k
        dr.rectangle([lo, lo, hi, hi], outline=colour, width=round(w * k))
    rule(p['half'], p['outer'], CREAM)
    rule(p['half'] - p['gap'], p['inner'], AMBER)
    s, tx, ty = transform(p['letter'])
    dr.polygon([((tx + s * x) * k, (ty - s * y) * k) for x, y in flatten(ZAYIN)], fill=CREAM)
    return im.resize((size, size), Image.LANCZOS)


def main():
    for name, p in (('icon.svg', PLAIN), ('icon-maskable.svg', MASKABLE)):
        with open(os.path.join(ROOT, 'tools', name), 'w', encoding='utf-8') as fh:
            fh.write(svg(p))
    for name, p, size in (('icon-180.png', PLAIN, 180), ('icon-192.png', PLAIN, 192), ('icon-512.png', PLAIN, 512),
                          ('icon-maskable-192.png', MASKABLE, 192), ('icon-maskable-512.png', MASKABLE, 512)):
        raster(p, size).save(os.path.join(ROOT, name), optimize=True)
    corner = math.hypot(MASKABLE['half'] + MASKABLE['outer'] / 2, MASKABLE['half'] + MASKABLE['outer'] / 2)
    assert corner <= 0.4 * 512, 'maskable frame outside the safe zone'


if __name__ == '__main__':
    main()
