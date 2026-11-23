# AUTONOA LABS website

Open index.html in a browser. The website is static and does not require a build or external logo service.

The car architecture explorer has distinct chassis, engine and transmission views, mapping to application foundations, business AI and workflows/integrations. It explains software responsibilities using the same supplier-invoice example across all three parts. All three illustrations are created from scratch, rendered in full, and saved locally in assets/car-components/. New coordinated matte black/bronze desktop and mobile hero images are in assets/car-hero-bronze-desktop.png and assets/car-hero-bronze-mobile.png, with labels embedded in the PNGs. Original earlier hero files are preserved. See CAR-PARTS-DESIGN.md, BRAND-REFINEMENT.md and assets/hero-generation-prompts.md. Regenerate the component section with node tools/build_car_parts.cjs.

The header/footer use the ribbon extracted from the user's full original gold-and-black logo, directly on graphite, paired with a separate typeset company name. The self-contained assets/brand/autonoa-ribbon.svg retains the original image pixels and uses an alpha-only white-background mask; no dark overlay or recolouring is applied. Original source bytes and extraction provenance are in assets/brand/. Rebuild with node tools/build_ribbon_logo.cjs. No light panel, gradient badge or status dot surrounds the logo. The technology logos sit in an aligned dark toolbox row. Styling is in assets/brand-refinement.css; responsive menu behavior is in assets/site-navigation.js.

Visitors can now choose Small business, Growing business, Enterprise or Explore everything. The choice adapts the language, hero, architecture introduction, suggested examples and assessment wording. A Change view bar remains available. Small-business visitors start with three everyday examples and can request the technical detail or full catalogue. The view is retained in a whitelisted URL parameter, without cookies or inferred business data. Assessment answers and all data/approval rules are preserved when switching views. See AUDIENCE-DESIGN.md for the design and validation notes.

The technology section contains 27 example architectures across seven categories: cloud and infrastructure, business applications, ERP/CRM/automation, data and analytics, AI and machine learning, and IT operations and security. It starts with six overview cards, supports category filtering, and expands each card into a four-stage system flow and production considerations. Without JavaScript, all 27 examples remain accessible.

## Files

MarTech is a named service alongside IT, AI, automation and business applications. The dedicated section covers lead capture and CRM connections, campaigns and follow-ups, marketing measurement, and customer data connections. All business views link to it. Four MarTech examples are included in the 27-example library, with local logos and system flows. The assessment includes marketing goals, campaign tools and a customer-journey starting plan. The unsupported vendor offering has been removed from the catalogue, questionnaire, recommendation rules and logo manifest. New section styling is in assets/martech.css. The original three-part car explanation remains the foundation for these connected capabilities.

Content revision: the hero now explains how IT, AI and automation match the three car parts. Service text, all 27 example introductions and pre-use checks, audience views, assessment questions/results, navigation, contact wording and footer use plain English. See CONTENT-REVIEW.md for the analysis, final hero, audience approach and source map. Assessment answer IDs and decision rules are preserved. The content revision was validated locally before publication.

- index.html: homepage and static stack cards.
- assets/stack-library.css and assets/stack-library.js: responsive stack library.
- assets/tech-logos/: local SVG logos and a source manifest.
- assets/stack-catalog.json: readable export of the 27 examples.
- tools/build_stack_library.py: editable catalogue and generator. Run from the project root with Python to rebuild the static section and catalogue export.
- tools/download_logos.py: optional helper to restore assets using recorded source URLs.
- ARCHITECTURE-REFERENCES.md: design references and logo provenance.

The assessment is a four-step browser-local questionnaire. It keeps answers during Back/Edit, validates required choices, and uses explicit rules to produce a starting plan, checkpoints and links to relevant stack examples. It does not inspect systems or use a hosted AI model. Unknown answers lead to discovery tasks; data-location choices and human approvals constrain the suggestions.

Visitors can download the plan as plain text or open an email draft. Answers are held in memory only and are cleared by refreshing or starting again. No answers are submitted automatically. Stack contact links open the contact page with the relevant example filled in; the visitor can then prepare and send an email draft. Adapt each architecture to customer requirements, regional availability, security needs, licensing and budget.

Assessment source: assets/assessment-engine.js (questions, rules and text export), assets/assessment.js (form and results), and assets/assessment.css (responsive design). See ASSESSMENT-DESIGN.md for the design and limitations. Run node --test tools/assessment-engine.test.cjs to check the rules.

Audience source: assets/audience-config.js (copy and suggested examples), assets/audience.js (view switching) and assets/audience.css. Run node --test tools/assessment-engine.test.cjs tools/audience-config.test.cjs to check the configuration and assessment rules.

Car-part source: assets/car-parts-data.js, assets/car-parts.js and assets/car-parts.css. Add tools/car-parts.test.cjs to the test command to check distinct standalone images, native image dimensions, logo references and tab/panel associations.

## Search and contact pages

The site now has dedicated pages for workflow automation, business systems integration, AI document assistants and MarTech, plus contact.html. Each page includes a practical example, service-specific enquiry links, a unique search title/description, a canonical URL, social metadata and structured data. The visible company details use the supplied name Autonoa Labs Private Limited, Bhiwandi, Maharashtra, India, and contact@autonoalabs.com. No street address, phone number, opening hours or Maps listing is invented. Organization structured data describes the business without claiming a verified storefront.

The existing canonical host, https://www.autonoalabs.com/, is used consistently. sitemap.xml lists the six public HTML pages and robots.txt points to it. Publish the new files before submitting the sitemap or inspecting new URLs in Search Console. Google chooses when to crawl and what title/snippet to display; source changes do not submit a listing or indexing request. See https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl and https://support.google.com/business/answer/7039811 for the current Google guidance.

The contact form prepares an email draft, as requested. Required fields are checked in the browser; the draft can be opened in an email app or copied. Editing an answer hides the old draft. Nothing is submitted to a backend and the page does not claim the enquiry was sent. A direct email link and no-JavaScript fallback remain available. Core draft construction is in assets/contact-draft.js, and page source/copy is maintained in tools/build_service_pages.py. Rebuild with Python from the project root. Existing artwork and dark bronze branding are reused.

Run node --test tools/assessment-engine.test.cjs tools/audience-config.test.cjs tools/car-parts.test.cjs tools/contact-draft.test.cjs and python tools/check_site_pages.py to validate the form logic, assessment, metadata and links.

## Publishing to Cloudflare

Cloudflare production is connected to the GitHub `master` branch. Publish the tested website to `origin/master`; pushing only to `main` does not update the live domain. After pushing, verify https://www.autonoalabs.com/ and https://www.autonoalabs.com/contact.html before reporting the update as live. This checkout uses `master` for future publishing work.

## Local preview

Run python -m http.server 8765 --bind 127.0.0.1 from this folder, then visit http://127.0.0.1:8765/#blueprints.

## Validation

Checked the stack library on desktop, tablet and phone; category counts; show-all behavior; disclosure diagrams; local SVG assets; and horizontal overflow. The assessment, audience and car-part configuration have seventeen automated checks, plus browser checks for assessment behavior, audience switching, keyboard tab navigation, distinct component views and optional technical disclosure. The car-part revision was validated locally before publication.
