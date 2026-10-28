# Business views

Visitors can choose Small business, Growing business, Enterprise or Explore everything. The chooser is inline and optional; it never blocks the website. After selection it collapses into a slim, sticky bar with a Change view action. Visitors who are unsure can go straight to the assessment.

## What changes

| View | First impression | Examples and detail |
| --- | --- | --- |
| Small business | Plain language about daily work, a customer-enquiry flow and one practical next step | Three business examples; product logos and architecture appear when requested. The original technical architecture remains available through a disclosure button. |
| Growing business | Connected teams, systems, data and ownership | Six examples covering cloud apps, ERP, CRM, reporting and workflows. |
| Enterprise | Integration, data boundaries, review points and operations | Six architecture examples covering hybrid platforms, enterprise apps, SAP, events, AI and delivery. |
| Explore everything | Original general website | Six overview examples plus the full, filterable library of 24 architectures. |

Navigation, hero, section introductions, assessment language and closing contact wording follow the chosen view. The small-business footer uses plainer descriptions. The original supplied car artwork remains in the growing, enterprise and general views. The small-business view introduces the services through a simple business workflow instead.

The existing architecture catalogue stays available in every view. Small-business visitors can explicitly explore the full catalogue. Assessment result links still open the correct design, including a design outside the current shortlist. Titles used for navigation have stable canonical identifiers, independently of the displayed business wording.

## Assessment continuity and controls

Changing views preserves existing assessment answers and the current step or result. The small-business tool list starts with common tool categories; specific products already selected in another view remain visible. Technical examples in a small-business result sit behind an optional disclosure. Data sensitivity, hosting location, human approval and all assessment rules are identical in every view. Choosing a view does not fill in team size, goal, data type, budget or hosting requirements.

## Preference and privacy

The only preference saved is a whitelisted URL parameter: view=small, view=growing or view=enterprise. Refreshing or sharing that URL retains the selected view. Explore everything removes the parameter. Invalid values fall back to the general website. There is no cookie, profile inference, browser storage or answer upload. Assessment answers remain in page memory and clear on refresh as before.

With JavaScript disabled, the general website remains readable; the optional chooser is hidden. Profile copy and suggested example indexes live in assets/audience-config.js. The page adaptation is handled by assets/audience.js, with explicit integration events in the catalogue and assessment.

## Design basis

This uses [progressive disclosure](https://www.nngroup.com/articles/progressive-disclosure/) to introduce essential information first, and [user-controlled customization](https://www.nngroup.com/articles/customization-personalization/) so a visitor can change the experience explicitly. Business size is self-described rather than inferred from employee thresholds. These are design choices to validate with real customers; reduced overwhelm has not been measured in a user study.

## Validation

Eleven automated checks cover the existing assessment rules, supported view keys, valid catalogue indexes and the separation of profile copy from assessment answers. Browser checks cover all four views, restoration of the general content, URL refresh persistence, optional full-catalogue access, technical disclosures, preservation of selected SAP/Microsoft tools across views, sensitive-data approval checks, result disclosures and links into the catalogue. Layouts were checked at 1440px, 820px, 390px and 320px widths without horizontal overflow. Browser error logs were empty. This revision is local and has not been pushed.
