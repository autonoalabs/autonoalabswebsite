# Brand and artwork refinement

Three new component illustrations were created from scratch with the built-in image generation tool. The images share a restrained product-render direction: complete mechanical assemblies, graphite/titanium materials, gold functional accents and a dark studio background. No reference crops or generated labels were used.

Final project files:

- assets/car-components/chassis-v2.png
- assets/car-components/engine-v2.png
- assets/car-components/transmission-v2.png

The exact prompt set and generation method are saved in assets/car-components/generation-prompts.md. These are illustrative mechanical renders for the software analogy, not manufacturing drawings.

## Autonoa identity

The user supplied a genuinely transparent standalone gold-and-black ribbon. `assets/autonoa-ribbon-original.png` is a byte-identical copy of that supplied file (SHA-256: 2d2f213354e2095cbb16a6e9cdca2b67f536654d8ebe5d4d7d34f5866506377f). It uses no colour filters, blend modes, generated replacement, glow or light panel. Graphite behind the full header gives the black folds subtle contrast while leaving the gold untouched. A separate typeset AUTONOA / LABS name sits alongside the original emblem in warm ivory and muted bronze. This is a horizontal web lockup, not a recoloured version of the original full logo. The footer repeats the same lockup directly on its dark background. The supplied full logo and previous assets remain available unchanged.

The header is 78px on desktop and 72px on phones. The audience-switch bar follows the actual header height. Tablet/phone navigation opens below the header, closes after a selection or Escape, and resets when crossing the desktop breakpoint.

## Coordinated hero

Desktop and mobile heroes were newly generated with the built-in image tool to match the accepted component illustrations: matte graphite, black mechanical assemblies, restrained brushed bronze rails and fasteners, soft studio light, and a quiet graphite backdrop. The chassis, front engine and central transmission are assembled in one car. Three thin labels and leaders are part of the image itself, not positioned in HTML. The portrait is its own complete composition. Source PNGs are 1536 × 1024 and 1024 × 1536, and the picture source swaps at 640px. Desktop and tablet use the full landscape; phone uses the full portrait. No cover crop or colour/saturation filter is used. A narrow edge feather blends the background without moving or relabeling any component. Below 1100px, the artwork sits centered below the copy rather than squeezing both columns.

The exact prompts, reference roles and built-in generation method are recorded in `assets/hero-generation-prompts.md`. Final artwork: `assets/car-hero-bronze-desktop.png` and `assets/car-hero-bronze-mobile.png`. Original earlier hero files remain untouched. These are illustrative renders for the software analogy, not manufacturing drawings.

## Technology marks

Vendor logos occupy one aligned toolbox row below each component's explanation and software flow. Names and roles are readable at a consistent scale. No individual white tiles surround the vendor icons. Only monochrome vendor marks receive a light contrast treatment for the dark background; the underlying SVG files remain unchanged. This display does not imply partnership or certification.

## Local review

The component images, header, menus, toolbox rail and footer have been checked at desktop, tablet and phone sizes. The Autonoa image files retain their original colours; the entire component images use contain rendering. No horizontal overflow was found at 1440px, 820px, 390px or 320px widths. Validation was completed locally.
