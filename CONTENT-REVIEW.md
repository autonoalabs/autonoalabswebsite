# Autonoa Labs content review and rewrite

## The main finding

The visual explains three parts of a connected IT system, but the previous hero only said that AI and IT work together. It did not explain the transmission/automation role or give the visitor a clear business reason to continue. Lower down the page, plain-English passages sat beside specialist language and buttons that suggested reports, deployments or demos that the links did not provide.

The rewrite uses one story: reliable IT supports apps and data; AI helps people use information; automation connects the next steps. The car introduces these roles. A supplier invoice shows what the roles mean in actual work. The visitor then explores suitable tools and answers questions to choose a starting point.

## What changed and why

| Area | Previous problem | Revised approach |
| --- | --- | --- |
| Hero | Generic headline and no explicit link to the three car parts | Business outcome first; explain the three roles and connect them to the car |
| Service explanation | Words such as application foundation, retrieval, orchestration and exception queue appeared before their purpose was clear | Use familiar verbs: store, read, find, check, approve, update and follow up |
| Three-part example | Technical descriptions required the reader to translate the analogy | Follow the same invoice through storage, checking and approved updates |
| Technology library | Tools and architecture names could feel like a shopping list | Explain each business use first; keep the 24 real tool combinations and optional technical detail |
| Audience views | The enterprise view reintroduced difficult wording such as current estate and governed workflows | Change the scope and examples for each business size while keeping plain language |
| Assessment | Pilot, advisory, write-back and baseline made the suggested plan harder to understand | Describe a small trial, who approves work and how to check the result |
| Buttons | Deploy Your System and View System Reports did not describe the next page action | Find My Starting Point opens the assessment; Explore the Three Parts opens the explanation |
| Footer | Old reference numbers, demo claims, security jargon and unverified compliance wording did not match the current site | Name actual services and examples; offer specific security discussions through clearly addressed email links |
| Search description | Resilient, sovereign and governed repeated the jargon before the page opened | Describe connected IT, AI, automation and everyday business work |

## Final default hero

Eyebrow: IT, AI & AUTOMATION FOR YOUR BUSINESS

Headline: **Keep Your Business Moving.**

Strong IT supports your apps. AI helps your team use information. Automation moves work between your tools. Like the chassis, engine and transmission of a car, each part has a job. We help them work together.

Primary action: **Find My Starting Point** → assessment.

Secondary action: **Explore the Three Parts** → car-part explanation.

The supporting strip makes the image labels concrete:

- The chassis · IT: A reliable base for your apps and data.
- The engine · AI: Help reading, finding and checking information.
- The transmission · automation: Routine tasks connected. Important steps approved.

The embedded image labels and accepted artwork are preserved. Enterprise IT Infrastructure is explained as the IT foundation for apps and data; AI Intelligence becomes practical AI support; Autonomous Workflow is explained as agreed steps, approval and problem handling. The copy does not suggest that important financial decisions should happen without people.

## Section story

1. **Choose your business view.** Visitors choose examples without needing to know a technology or disclose business details.
2. **Understand the three roles.** The car is a visual explanation of a connected business system.
3. **Follow one familiar example.** The IT foundation stores an invoice; AI helps read it; software checks records; an approved workflow updates the accounts system. Payment approval stays with the responsible team.
4. **Explore suitable tools.** All 24 descriptions and their pre-use checks are rewritten. Technology names remain accurate and optional detail remains available.
5. **Find the right first step.** The questionnaire asks about business goals, tools, tasks, approvals and data. It gives a starting plan, not a claim to have inspected live systems.
6. **Discuss the work.** The closing asks where copying, checking or chasing slows the team down and explains that the contact action opens email.

## Business-size views

- **Small business:** Less chasing. More time for your business. Starts with daily tasks and existing tools; technical detail remains optional. The existing simpler process visual remains appropriate for this audience.
- **Growing business:** Connect your tools. Keep work moving. Explains the three car parts through information sharing and clear responsibilities across teams.
- **Enterprise:** Connected systems. Clear control. Keeps access, approvals, existing systems, recovery and support responsibilities explicit without using difficult language for its own sake.
- **Explore everything:** The complete car-led explanation and library.

## Language for Indian and Gulf audiences

The aim is clear international English for readers with different levels of technical knowledge and English fluency. The copy avoids regional stereotypes, slang, unexplained business idioms and assumed local certifications. Familiar examples include invoices, customer enquiries, orders, accounts, staff access and follow-ups. Existing India, UAE and Saudi Arabia data-location choices remain available. No local office presence, legal compliance, guaranteed savings or customer results are invented.

Keep sentences short, explain the benefit before the technology, and use the same term for the same action. Use AI only where it helps; connected apps and workflow rules may be enough. Keep technical product names in examples for buyers and IT teams who need them. Keep uncertainty, approvals and review requirements understandable in the suggested plan.

## Source and maintenance

The main copy is in index.html. Audience variants are in assets/audience-config.js and assets/audience.js. Component content is in assets/car-parts-data.js and the template in tools/build_car_parts.cjs. Technology introductions and pre-use checks are in tools/build_stack_library.py, which updates the HTML and assets/stack-catalog.json. Assessment questions, plan text and interface copy are in assets/assessment-engine.js and assets/assessment.js. Script references carry a copy-version parameter so returning browsers load the revised wording.

Product names, logo assets, accepted images, audience choices, assessment answer IDs, decision rules, data-location controls and approval logic are preserved. The existing generator was corrected to recognise the current assessment section class when regenerating the technology library.

## Validation

All 13 existing assessment, audience and component checks pass. The regenerated catalogue retains all 24 examples and their links. Browser review covers desktop and phone copy fit, business-view switching, the car tabs and a complete assessment with the revised questions and result text. Local references and duplicate IDs are checked before packaging. Validation was completed locally.
