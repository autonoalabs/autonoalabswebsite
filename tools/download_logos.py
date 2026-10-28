"""Restore exact SVG assets recorded in the local provenance manifest."""
import json, urllib.request
from pathlib import Path
manifest=json.loads(Path('assets/tech-logos/manifest.json').read_text())
for key,logo in manifest.items():
    request=urllib.request.Request(logo['source'],headers={'User-Agent':'AutonoaWebsiteAssetPrep'})
    data=urllib.request.urlopen(request,timeout=35).read()
    if b'<svg' not in data: raise ValueError(f'Expected SVG for {key}')
    Path(logo['file']).write_bytes(data)
    print(f'Restored {key}')
