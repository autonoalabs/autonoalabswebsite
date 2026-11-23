"""Export favicon formats from the original ribbon; never regenerate or recolour it.

Requires Pillow. The crop matches assets/brand/provenance.json. The original
white background keeps the black folds legible in browser and search icons.
"""
from pathlib import Path
from hashlib import sha256
from PIL import Image
import json

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'assets/brand/source-logo.png'
provenance = json.loads((ROOT / 'assets/brand/provenance.json').read_text())
assert sha256(source.read_bytes()).hexdigest() == provenance['sha256'], 'Check the original logo before rebuilding.'
original = Image.open(source).convert('RGB')
x, y, width, height = provenance['viewBox']
ribbon = original.crop((x, y, x + width, y + height))

def square(size):
    canvas = Image.new('RGB', (size, size), 'white')
    target_width = round(size * .86)
    target_height = round(target_width * height / width)
    mark = ribbon.resize((target_width, target_height), Image.Resampling.LANCZOS)
    canvas.paste(mark, ((size-target_width)//2, (size-target_height)//2))
    return canvas

outputs = {
    'favicon.png': 96,
    'apple-touch-icon.png': 180,
    'assets/brand/icon-192.png': 192,
    'assets/brand/icon-512.png': 512,
}
for name, size in outputs.items():
    square(size).save(ROOT / name, optimize=True)
square(256).save(ROOT / 'favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
for name, size in outputs.items():
    with Image.open(ROOT / name) as icon:
        assert icon.size == (size, size) and icon.format == 'PNG', name
with Image.open(ROOT / 'favicon.ico') as icon:
    assert {(16,16),(32,32),(48,48),(256,256)} <= icon.ico.sizes()
print('Exported and verified square PNG, Apple, app and multi-size ICO favicons from the original AL ribbon.')
