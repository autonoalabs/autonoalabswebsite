# AUTONOA LABS website

Open index.html in a browser. The website is static and does not require a build or external logo service.

The car architecture explorer has distinct chassis, engine and transmission views, mapping to application foundations, business AI and workflows/integrations. It explains software responsibilities using the same supplier-invoice example across all three parts. All three illustrations are created from scratch, rendered in full, and saved locally in assets/car-components/. New coordinated matte black/bronze desktop and mobile hero images are in assets/car-hero-bronze-desktop.png and assets/car-hero-bronze-mobile.png, with labels embedded in the PNGs. Original earlier hero files are preserved. See CAR-PARTS-DESIGN.md, BRAND-REFINEMENT.md and assets/hero-generation-prompts.md. Regenerate the component section with node tools/build_car_parts.cjs.

The header/footer use the ribbon extracted from the user's full original gold-and-black logo, directly on graphite, paired with a separate typeset company name. The self-contained assets/brand/autonoa-ribbon.svg retains the original image pixels and uses an alpha-only white-background mask; no dark overlay or recolouring is applied. Original source bytes and extraction provenance are in assets/brand/. Rebuild with node tools/build_ribbon_logo.cjs. No light panel, gradient badge or status dot surrounds the logo. The technology logos sit in an aligned dark toolbox row. Styling is in assets/brand-refinement.css; responsive menu behavior is in assets/site-navigation.js.

Visitors can now choose Small business, Growing business, Enterprise or Explore everything. The choice adapts the language, hero, architecture introduction, suggested examples and assessment wording. A Change view bar remains available. Small-business visitors start with three everyday examples and can request the technical detail or full catalogue. The view is retained in a whitelisted URL parameter, without cookies or inferred business data. Assessment answers and all data/approval rules are preserved when switching views. See AUDIENCE-DESIGN.md for the design and validation notes.

The technology section contains 24 example architectures across six categories: cloud and infrastructure, business applications, ERP/CRM/automation, data and analytics, AI and machine learning, and IT operations and security. It starts with six overview cards, supports category filtering, and expands each card into a four-stage system flow and production considerations. Without JavaScript, all 24 examples remain accessible.

## Files

Content revision: the hero now explains how IT, AI and automation match the three car parts. Service text, all 24 example introductions and pre-use checks, audience views, assessment questions/results, navigation, contact wording and footer use plain English. See CONTENT-REVIEW.md for the analysis, final hero, audience approach and source map. Assessment answer IDs and decision rules are preserved. The content revision was validated locally before publication.

- index.html: homepage and static stack cards.
- assets/stack-library.css and assets/stack-library.js: responsive stack library.
- assets/tech-logos/: local SVG logos and a source manifest.
- assets/stack-catalog.json: readable export of the 24 examples.
- tools/build_stack_library.py: editable catalogue and generator. Run from the project root with Python to rebuild the static section and catalogue export.
- tools/download_logos.py: optional helper to restore assets using recorded source URLs.
- ARCHITECTURE-REFERENCES.md: design references and logo provenance.

The assessment is a four-step browser-local questionnaire. It keeps answers during Back/Edit, validates required choices, and uses explicit rules to produce a starting plan, checkpoints and links to relevant stack examples. It does not inspect systems or use a hosted AI model. Unknown answers lead to discovery tasks; data-location choices and human approvals constrain the suggestions.

Visitors can download the plan as plain text or open an email draft. Answers are held in memory only and are cleared by refreshing or starting again. No answers are submitted automatically. Stack contact links also open an email draft. Adapt each architecture to customer requirements, regional availability, security needs, licensing and budget.

Assessment source: assets/assessment-engine.js (questions, rules and text export), assets/assessment.js (form and results), and assets/assessment.css (responsive design). See ASSESSMENT-DESIGN.md for the design and limitations. Run node --test tools/assessment-engine.test.cjs to check the rules.

Audience source: assets/audience-config.js (copy and suggested examples), assets/audience.js (view switching) and assets/audience.css. Run node --test tools/assessment-engine.test.cjs tools/audience-config.test.cjs to check the configuration and assessment rules.

Car-part source: assets/car-parts-data.js, assets/car-parts.js and assets/car-parts.css. Add tools/car-parts.test.cjs to the test command to check distinct standalone images, native image dimensions, logo references and tab/panel associations.

## Preview

Run python -m http.server 8765 --bind 127.0.0.1 from this folder, then visit http://127.0.0.1:8765/#blueprints.

## Validation

Checked the stack library on desktop, tablet and phone; category counts; show-all behavior; disclosure diagrams; local SVG assets; and horizontal overflow. The assessment, audience and car-part configuration have thirteen automated checks, plus browser checks for assessment behavior, audience switching, keyboard tab navigation, distinct component views and optional technical disclosure. The car-part revision was validated locally before publication.
