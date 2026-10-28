# AUTONOA LABS website

Open index.html in a browser. The website is static and does not require a build or external logo service.

The technology section contains 24 example architectures across six categories: cloud and infrastructure, business applications, ERP/CRM/automation, data and analytics, AI and machine learning, and IT operations and security. It starts with six overview cards, supports category filtering, and expands each card into a four-stage system flow and production considerations. Without JavaScript, all 24 examples remain accessible.

## Files

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

## Preview

Run python -m http.server 8765 --bind 127.0.0.1 from this folder, then visit http://127.0.0.1:8765/#blueprints.

## Validation

Checked the stack library on desktop, tablet and phone; category counts; show-all behavior; disclosure diagrams; local SVG assets; and horizontal overflow. The assessment has eight automated rule checks, plus browser checks for validation, answer retention, exclusive unknown choices, changed results, data-boundary constraints, report download, email draft content, linked stack diagrams and reset. The assessment revision is local and has not been pushed or deployed.
