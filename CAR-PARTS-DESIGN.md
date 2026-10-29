# Car parts and software responsibilities

The architecture section uses three separately selectable component views. Each view connects a car analogy to application responsibilities and a shared supplier-invoice example. Three new standalone illustrations replace the earlier crops. The supplied hero artwork remains unchanged.

| Part | Software role | Supplier-invoice example |
| --- | --- | --- |
| Chassis | Business applications, identity, data, hosting and recovery | Check access, receive the invoice in the accounts application and retain its records/files. |
| Engine | Document processing, retrieval and tested AI assistance | Extract invoice details, compare approved information and send uncertain results for review. |
| Transmission | Workflows, integration APIs, approvals and operational tracking | Perform authorised application updates, notify the right team and handle failures or duplicates. |

Human access rules, approval ownership and exceptions apply across the three parts. AI is optional; a workflow can begin with connected applications and deterministic rules. The invoice example does not imply autonomous payment authorisation.

## Visual treatment

- Chassis, engine and transmission each use a new 1536 × 1024 PNG, created from scratch with the built-in image generation tool. Each object is fully visible, on a coordinated dark studio backdrop with graphite, metal and restrained gold details.
- The website uses the complete image with object-fit: contain. There are no crop coordinates or magnified car details. Asset paths and exact generation prompts are recorded in assets/car-components/generation-prompts.md.
- The original hero images and their embedded labels remain untouched.
- Software logos sit in an aligned full-width toolbox row, with readable names and roles. The individual white icon tiles are removed. Monochrome vendor marks use a light contrast treatment on the dark rail; original Autonoa brand artwork is unfiltered.

Each panel has a component visual, a short analogy, application responsibilities, illustrative software choices, an invoice example, an accessible three-stage software flow and review considerations. The narrow outcome sidebar is replaced with a full-width outcome row. A persistent human-control note applies to the explorer.

## Behavior

Tabs use native tab/tabpanel semantics with one active panel. Left/Right arrows wrap; Home/End select the first/last part; only the selected tab is in the tab order. The single active panel changes without timers or automatic rotation. With JavaScript disabled, all three static panels remain readable and the tab controls stay hidden.

The small-business view retains its plain service cards and optional technical disclosure. Growing, enterprise and general views expose the explorer. Phones use a single content column and vertical software flows; desktop uses artwork and software explanations side by side.

## Source

- assets/car-parts-data.js contains the three component records and standalone artwork paths.
- tools/build_car_parts.cjs regenerates the static section and can be run repeatedly without changing the result.
- assets/car-parts.js controls accessible tab selection.
- assets/car-parts.css provides the responsive layout.

## References

The practical examples follow the roles described in [Microsoft document processing guidance](https://learn.microsoft.com/en-us/azure/architecture/data-guide/ai-services/targeted-language-processing), [Keycloak application-security guides](https://www.keycloak.org/guides) and [n8n human-approval workflow guidance](https://blog.n8n.io/human-in-the-loop-automation/). Products are illustrative choices, not a required package or a certification claim.

## Validation

Thirteen automated checks cover the assessment/audience rules, three distinct image files, full PNG dimensions, logo paths and unique tab/panel associations. Browser checks confirm contain rendering, component selection, keyboard tabs, logo contrast, responsive menus and no horizontal overflow at desktop, tablet, 390px and 320px phone widths. Browser error logs were empty. Validation was completed locally.
