#!/usr/bin/env python3
"""Generate sharp, high-legibility opi favicon assets at all browser sizes."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / 'static' / 'img'
BLUE = (30, 58, 138, 255)  # #1E3A8A — darker for contrast on tab chrome
WHITE = (255, 255, 255, 255)
TEXT = 'opi'
FONT_CANDIDATES = (
    '/System/Library/Fonts/Supplemental/Arial Black.ttf',
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


def text_width(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> float:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0]


def fit_tight_font(
    draw: ImageDraw.ImageDraw,
    canvas: int,
    *,
    max_width_ratio: float,
    kern_ratio: float,
) -> tuple[ImageFont.ImageFont, float]:
    """Return the largest font + kerning that fits the mark edge-to-edge."""
    max_w = canvas * max_width_ratio
    chosen = load_font(max(8, round(canvas * 0.2)))
    chosen_kern = 0.0
    for size in range(8, canvas):
        font = load_font(size)
        kern = -size * kern_ratio
        total = sum(text_width(draw, ch, font) for ch in TEXT) + kern * (len(TEXT) - 1)
        if total > max_w:
            break
        chosen, chosen_kern = font, kern
    return chosen, chosen_kern


def draw_tight_text(
    draw: ImageDraw.ImageDraw,
    canvas: int,
    font: ImageFont.ImageFont,
    kern: float,
    *,
    stroke: int,
) -> None:
    chars = list(TEXT)
    widths = [text_width(draw, ch, font) for ch in chars]
    total_w = sum(widths) + kern * (len(chars) - 1)
    x = (canvas - total_w) / 2
    ref_bbox = draw.textbbox((0, 0), 'o', font=font)
    y = (canvas - (ref_bbox[3] - ref_bbox[1])) / 2 - ref_bbox[1]
    for ch, w in zip(chars, widths):
        draw.text(
            (x, y),
            ch,
            fill=WHITE,
            font=font,
            stroke_width=stroke,
            stroke_fill=WHITE,
        )
        x += w + kern


def render_icon(size: int) -> Image.Image:
    """Render at high supersample then downscale for crisp tab icons."""
    scale = 8 if size <= 32 else 4
    canvas = size * scale
    img = Image.new('RGBA', (canvas, canvas), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Tiny tab icons: nearly square corners = more room for glyphs.
    radius = max(scale, round(canvas * (0.04 if size <= 16 else 0.07)))
    draw.rounded_rectangle((0, 0, canvas - 1, canvas - 1), radius=radius, fill=BLUE)

    max_ratio = 0.97 if size <= 16 else 0.94 if size <= 32 else 0.9
    kern_ratio = 0.14 if size <= 16 else 0.1 if size <= 32 else 0.06
    font, kern = fit_tight_font(draw, canvas, max_width_ratio=max_ratio, kern_ratio=kern_ratio)
    stroke = max(1, scale // 2 if size <= 16 else scale // 3)
    draw_tight_text(draw, canvas, font, kern, stroke=stroke)

    return img.resize((size, size), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    sizes = (16, 32, 48, 192)
    images = {s: render_icon(s) for s in sizes}

    images[16].save(OUT / 'favicon-16.png')
    images[32].save(OUT / 'favicon-32.png')
    images[48].save(OUT / 'favicon-48.png')
    images[192].save(OUT / 'icon-192.png')

    base = render_icon(64)
    base.save(
        OUT / 'favicon.ico',
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)],
    )

    svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="opi">
  <rect width="32" height="32" rx="2" fill="#1E3A8A"/>
  <text
    x="16"
    y="16.5"
    text-anchor="middle"
    dominant-baseline="central"
    fill="#FFFFFF"
    font-family="Inter, Arial, system-ui, sans-serif"
    font-size="17.5"
    font-weight="900"
    letter-spacing="-2.2"
    stroke="#FFFFFF"
    stroke-width="0.8"
    paint-order="stroke fill">opi</text>
</svg>
'''
    (OUT / 'favicon.svg').write_text(svg, encoding='utf-8')
    (OUT / 'logo.svg').write_text(svg.replace('aria-label="opi"', 'aria-label="okfriansyah"'), encoding='utf-8')
    print('Generated large-legibility opi favicons:', ', '.join(str(s) for s in sizes))


if __name__ == '__main__':
    main()
