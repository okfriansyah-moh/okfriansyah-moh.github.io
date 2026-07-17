#!/usr/bin/env python3
"""Generate sharp opi favicon assets at all common browser sizes."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / 'static' / 'img'
BLUE = (29, 78, 216, 255)
WHITE = (255, 255, 255, 255)
TEXT = 'opi'
FONT_CANDIDATES = (
    '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
    '/System/Library/Fonts/Helvetica.ttc',
    '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
)


def load_font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def render_icon(size: int) -> Image.Image:
    """Render at 4x supersample then downscale for crisp small sizes."""
    scale = 4 if size <= 48 else 2
    canvas = size * scale
    img = Image.new('RGBA', (canvas, canvas), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = max(scale * 2, round(canvas * 0.22))
    draw.rounded_rectangle((0, 0, canvas - 1, canvas - 1), radius=radius, fill=BLUE)

    # opi needs a smaller ratio than two-letter marks
    font_size = max(scale * 2, round(canvas * 0.34))
    font = load_font(font_size)
    bbox = draw.textbbox((0, 0), TEXT, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (canvas - tw) / 2 - bbox[0]
    y = (canvas - th) / 2 - bbox[1]
    draw.text((x, y), TEXT, fill=WHITE, font=font)

    return img.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sizes = (16, 32, 48, 192)
    images = {s: render_icon(s) for s in sizes}

    images[16].save(OUT / 'favicon-16.png')
    images[32].save(OUT / 'favicon-32.png')
    images[192].save(OUT / 'icon-192.png')

    base = render_icon(64)
    base.save(
        OUT / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="opi">
  <rect width="32" height="32" rx="7" fill="#1D4ED8"/>
  <text x="16" y="17" text-anchor="middle" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="12.5" font-weight="800" letter-spacing="-0.5">opi</text>
</svg>
'''
    (OUT / 'favicon.svg').write_text(svg, encoding='utf-8')
    (OUT / 'logo.svg').write_text(svg.replace('aria-label="opi"', 'aria-label="okfriansyah"'), encoding='utf-8')
    print('Generated opi favicons:', ', '.join(str(s) for s in sizes))


if __name__ == '__main__':
    main()
