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

The system check is a browser-local example; it does not submit data to a server. Stack contact links open an email draft with the selected example. Adapt each architecture to customer requirements, regional availability, security needs, licensing and budget.

## Preview

Run python -m http.server 8765 --bind 127.0.0.1 from this folder, then visit http://127.0.0.1:8765/#blueprints.

## Validation

Checked desktop (1440px), tablet (700px) and phone (390px) layouts; category counts; show-all behavior; disclosure diagrams; local SVG assets; and horizontal overflow. JavaScript syntax and local asset references were also checked. Changes have not been pushed or deployed.
