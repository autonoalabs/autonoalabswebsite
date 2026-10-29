"""Generate the static stacks section. Run from the website root; no build needed to view."""
import json
from pathlib import Path
from html import escape as esc
from urllib.parse import quote

catalog = []
def add(category, title, description, logos, steps, note):
    catalog.append(dict(category=category, title=title, description=description,
                        logos=logos.split(), steps=steps, note=note))

add('Cloud & infrastructure', 'Microsoft Azure Hybrid Cloud',
    'Connect office systems and online apps with one staff sign-in. A useful example for a business that already uses Microsoft tools.',
    'azure dotnet sqlserver',
    [('Access','Microsoft Entra ID','Staff sign in with access checks.'),('Connect','VPN / ExpressRoute','Link the office network to Azure.'),('Run','App Service + Azure SQL','Host business apps and their data.'),('Operate','Azure Monitor + Backup','Track health and restore lost data.')],
    'Confirm where apps, data and backups will be stored. Plan private connections where needed, and keep testing separate from live business work.')
add('Cloud & infrastructure', 'AWS Customer App Platform',
    'Run a customer portal, booking service or business app that can handle busy and quiet periods.',
    'aws docker postgresql',
    [('Protect','CloudFront + AWS WAF','Filter and deliver incoming web traffic.'),('Run','ALB + Amazon ECS','Route requests to application containers.'),('Store','Amazon RDS + S3','Keep app records and uploaded files.'),('Operate','CloudWatch + AWS Backup','Monitor services and manage recovery.')],
    'Plan for a server or location failure. Protect database access and passwords, monitor the service and test restoring backups.')
add('Cloud & infrastructure', 'Google Cloud Serverless Apps',
    'Run online forms, booking services and business tools without managing the application servers yourself.',
    'googlecloud python postgresql',
    [('Access','HTTPS Load Balancer','Route requests and apply access rules.'),('Run','Cloud Run','Run an API in managed containers.'),('Store','Cloud SQL + Cloud Storage','Keep business records and files.'),('Connect','Pub/Sub + Monitoring','Process background work and track health.')],
    'Set limits on running services and costs. Check database connections and whether each service is available in the required location.')
add('Cloud & infrastructure', 'Private Cloud with OpenShift',
    'Run business apps on your own systems or an approved cloud when you need control over where they run.',
    'redhat kubernetes ansible',
    [('Foundation','RHEL + network + storage','Provide the compute and storage base.'),('Platform','Red Hat OpenShift','Schedule and run application containers.'),('Delivery','GitOps + Ansible','Deploy approved changes consistently.'),('Operations','Monitoring + backup','Protect workloads and platform state.')],
    'Plan who supports the platform, installs updates and manages storage. Keep and test a separate recovery setup.')

add('Business applications', 'React and Node.js Web Apps',
    'Build a customer portal, booking tool or staff dashboard with screens and features that fit your work.',
    'react nodejs postgresql',
    [('Interface','React','Build the screens customers use.'),('Service','Node.js API','Apply business rules and permissions.'),('Data','PostgreSQL + Redis','Store records and cache frequent reads.'),('Delivery','Containers + CI/CD','Release and monitor app changes.')],
    'Check permissions and incoming data in the service that runs the business rules. Add extra tools only when there is a clear need.')
add('Business applications', '.NET Business Systems',
    'Build staff portals and business software that connect with the Microsoft systems you already use.',
    'dotnet azure sqlserver',
    [('Access','Entra ID','Control staff and application access.'),('Application','ASP.NET Core','Run business rules and APIs.'),('Data','SQL Server / Azure SQL','Store transactions and business records.'),('Hosting','Azure App Service','Run and monitor the application.')],
    'Check database compatibility, licence costs and recovery needs. Keep application access separate from database administration.')
add('Business applications', 'Java and Spring Business Apps',
    'Build business software for orders, customer services and connections to larger or older systems.',
    'java spring postgresql',
    [('Entry','API gateway','Authenticate and route requests.'),('Services','Spring Boot','Run business services and validations.'),('Transactions','PostgreSQL','Keep consistent business records.'),('Deployment','Containers + monitoring','Deploy services and track failures.')],
    'Start with a system your team can support. Separate it into smaller services only when scale or team responsibilities require it.')
add('Business applications', 'WordPress and WooCommerce',
    'Set up a product catalogue or online store where your team can manage products, content and orders.',
    'wordpress woocommerce mysql',
    [('Customers','CDN + web protection','Deliver store pages and filter traffic.'),('Store','WordPress + WooCommerce','Manage products, content and orders.'),('Records','MySQL + object storage','Store orders, media and catalogue data.'),('Payments','Hosted payment gateway','Send payment processing to a provider.')],
    'Use supported add-ons, protect administrator access and test updates and backups. Use a payment provider to handle card payments.')

add('ERP, CRM & automation', 'SAP and Business Integration',
    'Connect SAP accounts, orders and stock information to other business tools, so teams do less copying between systems.',
    'sap java postgresql',
    [('System of record','SAP S/4HANA','Keep approved business transactions.'),('Integration','SAP Integration Suite','Map and validate approved API messages.'),('Applications','Business APIs + Java apps','Serve portals and connected systems.'),('Tracking','Logs + reconciliation','Check failed and duplicate transactions.')],
    'Use supported SAP connections. Check licences, prevent duplicate updates and keep a record of failed actions. Avoid direct changes to ERP database tables.')
add('ERP, CRM & automation', 'Oracle Business Data Integration',
    'Use information from your Oracle systems in new business apps and reports while keeping the main system in place.',
    'oracle java python',
    [('Core data','Oracle Database','Retain existing business records.'),('Access','Approved API / CDC','Expose permitted data or changes.'),('Processing','Java / Python services','Validate, map and process records.'),('Use','Portal / reporting store','Serve apps without overloading the core.')],
    'Check the supported way to connect to each Oracle product. Confirm software versions, licences and the effect of data copying on the live system.')
add('ERP, CRM & automation', 'Salesforce Sales and Service',
    'Keep customer enquiries, sales follow-ups and service requests connected to orders and accounts.',
    'salesforce nodejs postgresql',
    [('Channels','Website / customer portal','Capture a lead or service request.'),('CRM','Salesforce','Manage customer and case records.'),('Connect','Flow + integration API','Apply approvals and exchange updates.'),('Business systems','ERP + reporting','Send approved orders and status updates.')],
    'Agree which system keeps the main customer record. Check access permissions, connection limits and how failed or duplicate updates are handled.')
add('ERP, CRM & automation', 'Workflow Automation with n8n',
    'Move requests, invoice follow-ups and approvals between tools, using steps your team has agreed.',
    'n8n postgresql python',
    [('Trigger','Form / email / webhook','Receive a request or system event.'),('Workflow','n8n','Validate inputs and connect approved tools.'),('Approval','Human review','Pause important actions for a decision.'),('Result','Business API + audit log','Record the outcome and failed tasks.')],
    'Protect connection passwords and check incoming requests. Make sure a failed step can be retried without creating the same action twice.')

add('Data & analytics', 'Cloud Data Warehouse',
    'Bring sales, accounts and operations data together so teams can work from the same business numbers.',
    'airflow dbt snowflake',
    [('Sources','ERP / CRM / business data','Collect approved business datasets.'),('Load','Airflow + ingestion jobs','Schedule and monitor data movement.'),('Model','Snowflake + dbt','Clean, test and organise reporting tables.'),('Report','BI dashboards','Publish agreed business measures.')],
    'Agree who owns each source, how often data is updated and how the numbers are checked. Set access and usage limits.')
add('Data & analytics', 'Spark Data Lakehouse',
    'Organise large files and years of business records for reporting, analysis and AI projects.',
    'spark python airflow',
    [('Ingest','Business files + events','Land approved data in object storage.'),('Process','Apache Spark','Clean and transform large datasets.'),('Organise','Delta Lake tables','Keep versioned analytical tables.'),('Use','SQL reports + ML','Serve governed analysis and model inputs.')],
    'Keep a list of data sources and owners. Set access, storage and cost limits, and decide when old records should be removed.')
add('Data & analytics', 'Kafka Event Processing',
    'Share updates about orders, stock and payment status between systems as the work happens.',
    'kafka java postgresql',
    [('Publish','Business services','Publish a confirmed business event.'),('Stream','Apache Kafka','Retain and distribute event messages.'),('Process','Consumer services','Validate and process each event.'),('Update','Operational databases','Update views and notify other systems.')],
    'Agree the message format and order. Check delayed updates and make sure replaying a message does not repeat a business action.')
add('Data & analytics', 'Practical Business Dashboards',
    'Bring sales and daily work into clear reports without starting with a large data system.',
    'postgresql python metabase',
    [('Collect','Business apps + exports','Collect data on an agreed schedule.'),('Prepare','Python jobs','Validate and clean source records.'),('Store','PostgreSQL reporting DB','Keep reporting separate from live apps.'),('Visualise','Metabase','Share dashboards with role-based access.')],
    'Use read-only access for reports. Agree what each number means and show when the data was last updated. Expand the setup only when needed.')

add('AI & machine learning', 'Private Document Assistant',
    'Help staff find answers in approved company documents, using an AI model running on your own systems.',
    'ollama fastapi postgresql',
    [('Prepare','Approved documents','Extract text with document permissions.'),('Retrieve','PostgreSQL + pgvector','Find relevant content the user may access.'),('Answer','FastAPI + Ollama','Generate an answer using retrieved sources.'),('Review','Sources + staff feedback','Show evidence and flag uncertain answers.')],
    'Check hardware needs, document permissions and answer quality. Show sources. An AI answer still needs checking and may be wrong.')
add('AI & machine learning', 'Azure Document AI Assistant',
    'Help staff search company documents and prepare answers using Microsoft cloud AI, with access checks and sources.',
    'azure python dotnet',
    [('Access','Entra ID + application','Verify the user and their permissions.'),('Retrieve','Azure AI Search','Search authorised company content.'),('Generate','Azure-hosted model endpoint','Create a response using retrieved content.'),('Review','Citations + evaluation','Check quality and retain approved logs.')],
    'Check model availability, data handling terms and the location used for processing. Test that people see only documents they are allowed to access.')
add('AI & machine learning', 'Google Cloud AI Applications',
    'Add document search and AI support to staff or customer apps using Google Cloud services.',
    'googlecloud python fastapi',
    [('Content','Cloud Storage','Keep approved documents and metadata.'),('Retrieve','Vector Search','Find relevant content with access filters.'),('Generate','Vertex AI model endpoint','Produce a grounded response.'),('Serve','Cloud Run application','Show sources, collect feedback and logs.')],
    'Check answer quality, document access, data handling and service availability in the required location before giving users access.')
add('AI & machine learning', 'Prediction and ML Serving',
    'Use business data to test tools such as demand forecasts or image checks, and track how well they work.',
    'pytorch mlflow fastapi',
    [('Prepare','Versioned training data','Validate inputs and separate test data.'),('Train','PyTorch','Train and evaluate a suitable model.'),('Release','MLflow registry','Track versions and approve deployment.'),('Serve','FastAPI + monitoring','Return predictions and track quality.')],
    'Compare results with a simple existing method. Track errors and changes in accuracy, and keep a way to return to the previous model.')

add('IT operations & security', 'Infrastructure and GitOps Delivery',
    'Set up systems and release software through reviewed, repeatable steps, with a way to recover if a change goes wrong.',
    'gitlab terraform kubernetes',
    [('Change','GitLab repository','Review code and environment changes.'),('Provision','Terraform','Create approved infrastructure.'),('Deploy','CI pipeline + GitOps','Apply reviewed app changes to Kubernetes.'),('Operate','Health checks + rollback','Observe releases and recover safely.')],
    'Protect deployment access and stored settings. Separate testing from live systems and plan how software and database changes can be reversed.')
add('IT operations & security', 'Monitoring and Service Health',
    'Bring faults, slow apps and system alerts into one place so the right team can investigate.',
    'opentelemetry prometheus grafana',
    [('Instrument','Apps + infrastructure','Produce metrics, logs and traces.'),('Collect','OpenTelemetry Collector','Receive, filter and forward telemetry.'),('Store','Prometheus + Loki / Tempo','Store metrics, logs and traces separately.'),('Respond','Grafana + alert routing','Investigate issues and notify responders.')],
    'Agree useful alerts and who responds to them. Keep private information out of logs and set limits on how much monitoring data is stored.')
add('IT operations & security', 'Identity and Secure App Access',
    'Give staff one way to sign in to business apps, with extra sign-in checks and clear access permissions.',
    'keycloak nginx postgresql',
    [('Identity','Keycloak + staff directory','Check identity and multi-factor sign-in.'),('Entry','NGINX + TLS','Route encrypted application traffic.'),('Application','OIDC / OAuth validation','Verify tokens and enforce app permissions.'),('Audit','Access events + alerts','Track sign-ins and important actions.')],
    'One sign-in does not cover every security need. Also check devices, network access, administrator accounts and emergency account recovery.')
add('IT operations & security', 'Backup and Recovery Foundation',
    'Back up important business systems and practise restoring them, so the team knows what to do after a failure.',
    'linux ansible postgresql',
    [('Protect','Apps + PostgreSQL','Identify business systems and recovery order.'),('Back up','Database-native backups','Capture consistent backups and transaction logs.'),('Isolate','Encrypted backup storage','Keep an isolated, immutable copy where supported.'),('Recover','Ansible + restore tests','Rebuild systems and verify restored data.')],
    'Agree how quickly systems must return and how much recent data could be lost. Keep a separate protected copy and practise a full restore.')

manifest=json.loads(Path('assets/tech-logos/manifest.json').read_text())
assert len(catalog)==24
def logo(key):
    m=manifest[key]; assert 'file' in m and Path(m['file']).exists(), key
    return f'<span class="technology"><span class="technology-icon"><img src="{m["file"]}" alt="" width="26" height="26" loading="lazy"></span><span>{esc(m["name"])}</span></span>'
categories=list(dict.fromkeys(s['category'] for s in catalog))
filters=''.join(f'<button type="button" class="stack-filter" aria-pressed="false" data-stack-category="{esc(c)}">{esc(c)}</button>' for c in categories)
cards=[]
for i,s in enumerate(catalog):
    flow=''.join(f'<li><span class="architecture-role">{esc(role)}</span><strong>{esc(product)}</strong><span>{esc(note)}</span></li>' for role,product,note in s['steps'])
    # Mark the six overview cards as featured: one from each family.
    featured='true' if i%4==0 else 'false'
    href='mailto:contact@autonoalabs.com?subject='+quote('Discuss '+s['title'])+'&body='+quote('Hello Autonoa Labs,\n\nI would like to discuss the '+s['title']+' example for our business.\n\nOur current systems:\nOur main requirement:\nPreferred data location:\n')
    cards.append(f'''<article class="stack-example" data-stack-category="{esc(s['category'])}" data-featured="{featured}" aria-labelledby="stack-title-{i}">
      <div class="stack-family">{esc(s['category'])}</div>
      <div class="technology-row">{''.join(logo(k) for k in s['logos'])}</div>
      <h3 id="stack-title-{i}">{esc(s['title'])}</h3><p class="stack-description">{esc(s['description'])}</p>
      <details class="stack-architecture"><summary>See the tools and steps <span aria-hidden="true">+</span></summary>
        <ol class="architecture-flow" aria-label="{esc(s['title'])} system flow">{flow}</ol>
        <p class="production-note"><strong>What to check before use</strong>{esc(s['note'])}</p>
      </details>
      <a class="stack-contact" href="{esc(href)}">Discuss this example <span aria-hidden="true">→</span></a>
    </article>''')
section=f'''<section class="section blueprints stack-library" id="blueprints" aria-labelledby="stack-library-title">
    <div class="eyebrow">PRACTICAL SYSTEM EXAMPLES <span class="soft">// BUILT AROUND YOUR BUSINESS</span></div>
    <div class="stack-library-heading"><div><h2 id="stack-library-title">Business Needs First.<br>Technology That Fits.</h2>
    <p class="lead">A technology stack is the set of tools behind a system. Explore examples for everyday business needs, then open the technical details when you want to see how the tools connect.</p></div><a class="stack-help" href="#diagnostic">Not sure which tools you need? <span>Find your starting point →</span></a></div>
    <div class="stack-filters" role="group" aria-label="Filter technology stacks" hidden><button class="stack-filter" type="button" aria-pressed="true" data-stack-category="all">All examples <span>24</span></button>{filters}</div>
    <div class="stack-results"><p id="stack-result-count" role="status" aria-live="polite">24 system examples</p><span>Open an example to see how the tools connect</span></div>
    <div class="stack-library-grid">{''.join(cards)}</div>
    <div class="stack-library-more" hidden><button type="button" class="btn" id="stack-show-more">Explore all 24 examples <span aria-hidden="true">↓</span></button></div>
    <div class="stack-library-foot"><p>You do not need every tool shown here. We choose a setup around your work, existing systems, budget, support team and data requirements.</p><small>These are example setups. The final choice depends on your requirements. Product names and logos belong to their owners; their use does not imply a partnership.</small></div>
  </section>'''
page=Path('index.html');text=page.read_text(encoding='utf-8')
start=text.index('<section class="section blueprints"') if '<section class="section blueprints"' in text else text.index('<section class="section blueprints stack-library"')
end=text.index('<section class="section diagnostic',start)
text=text[:start]+section+text[end:]
if 'assets/stack-library.css' not in text:text=text.replace('</head>','  <link rel="stylesheet" href="assets/stack-library.css">\n</head>')
if 'assets/stack-library.js' not in text:text=text.replace('</body>','  <script src="assets/stack-library.js" defer></script>\n</body>')
page.write_text(text,encoding='utf-8')
Path('assets/stack-catalog.json').write_text(json.dumps(catalog,indent=2),encoding='utf-8')
print('Generated',len(catalog),'architecture cards with',len(set(k for s in catalog for k in s['logos'])),'unique logos')
