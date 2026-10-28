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
    'Connect office systems and cloud apps with one staff sign-in. A good fit for teams already using Microsoft tools.',
    'azure dotnet sqlserver',
    [('Access','Microsoft Entra ID','Staff sign in with access checks.'),('Connect','VPN / ExpressRoute','Link the office network to Azure.'),('Run','App Service + Azure SQL','Host business apps and their data.'),('Operate','Azure Monitor + Backup','Track health and restore lost data.')],
    'Plan private network access, separate production from testing, and confirm the regions used for data and backups.')
add('Cloud & infrastructure', 'AWS Customer App Platform',
    'Run customer portals, booking systems and mobile backends that need to handle changing demand.',
    'aws docker postgresql',
    [('Protect','CloudFront + AWS WAF','Filter and deliver incoming web traffic.'),('Run','ALB + Amazon ECS','Route requests to application containers.'),('Store','Amazon RDS + S3','Keep app records and uploaded files.'),('Operate','CloudWatch + AWS Backup','Monitor services and manage recovery.')],
    'Use multiple availability zones, private databases, managed secrets and tested restore procedures. Use EKS when Kubernetes is needed.')
add('Cloud & infrastructure', 'Google Cloud Serverless Apps',
    'Build web services and APIs without maintaining application servers. Useful for new services and uneven workloads.',
    'googlecloud python postgresql',
    [('Access','HTTPS Load Balancer','Route requests and apply access rules.'),('Run','Cloud Run','Run an API in managed containers.'),('Store','Cloud SQL + Cloud Storage','Keep business records and files.'),('Connect','Pub/Sub + Monitoring','Process background work and track health.')],
    'Set minimum and maximum instances, protect database connections, and check service availability in the chosen region.')
add('Cloud & infrastructure', 'Private Cloud with OpenShift',
    'Run container apps in your own environment or across approved clouds. Useful when location and operating control matter.',
    'redhat kubernetes ansible',
    [('Foundation','RHEL + network + storage','Provide the compute and storage base.'),('Platform','Red Hat OpenShift','Schedule and run application containers.'),('Delivery','GitOps + Ansible','Deploy approved changes consistently.'),('Operations','Monitoring + backup','Protect workloads and platform state.')],
    'Allow for platform support, storage resilience, cluster upgrades and a separate recovery location. A cluster alone is not disaster recovery.')

add('Business applications', 'React and Node.js Web Apps',
    'A flexible stack for customer portals, booking tools and internal business dashboards.',
    'react nodejs postgresql',
    [('Interface','React','Build the screens customers use.'),('Service','Node.js API','Apply business rules and permissions.'),('Data','PostgreSQL + Redis','Store records and cache frequent reads.'),('Delivery','Containers + CI/CD','Release and monitor app changes.')],
    'Keep permissions in the API, validate inputs, limit requests and decide whether Redis is actually needed.')
add('Business applications', '.NET Business Systems',
    'Build staff portals and business applications that fit an existing Microsoft environment.',
    'dotnet azure sqlserver',
    [('Access','Entra ID','Control staff and application access.'),('Application','ASP.NET Core','Run business rules and APIs.'),('Data','SQL Server / Azure SQL','Store transactions and business records.'),('Hosting','Azure App Service','Run and monitor the application.')],
    'Choose managed or self-hosted SQL based on compatibility, licensing and recovery needs. Keep app and database access separate.')
add('Business applications', 'Java and Spring Business Apps',
    'Support transaction-heavy systems, customer services and integration with older enterprise platforms.',
    'java spring postgresql',
    [('Entry','API gateway','Authenticate and route requests.'),('Services','Spring Boot','Run business services and validations.'),('Transactions','PostgreSQL','Keep consistent business records.'),('Deployment','Containers + monitoring','Deploy services and track failures.')],
    'Start with a modular application when possible. Split into microservices only where independent scaling or ownership justifies it.')
add('Business applications', 'WordPress and WooCommerce',
    'Launch a product catalogue or online store with a familiar content and order management system.',
    'wordpress woocommerce mysql',
    [('Customers','CDN + web protection','Deliver store pages and filter traffic.'),('Store','WordPress + WooCommerce','Manage products, content and orders.'),('Records','MySQL + object storage','Store orders, media and catalogue data.'),('Payments','Hosted payment gateway','Send payment processing to a provider.')],
    'Use supported plugins, secure admin access, test updates and backups, and use a hosted checkout to reduce card-data exposure.')

add('ERP, CRM & automation', 'SAP and Business Integration',
    'Connect finance, orders and stock data from SAP to customer apps and other business systems.',
    'sap java postgresql',
    [('System of record','SAP S/4HANA','Keep approved business transactions.'),('Integration','SAP Integration Suite','Map and validate approved API messages.'),('Applications','Business APIs + Java apps','Serve portals and connected systems.'),('Tracking','Logs + reconciliation','Check failed and duplicate transactions.')],
    'Use supported SAP APIs and business events. Avoid direct writes to ERP tables; confirm licensing and the integration edition needed.')
add('ERP, CRM & automation', 'Oracle Business Data Integration',
    'Connect existing Oracle databases to new portals and reporting tools without replacing the core system.',
    'oracle java python',
    [('Core data','Oracle Database','Retain existing business records.'),('Access','Approved API / CDC','Expose permitted data or changes.'),('Processing','Java / Python services','Validate, map and process records.'),('Use','Portal / reporting store','Serve apps without overloading the core.')],
    'Use supported APIs for ERP products. Database replication and change capture need version, licensing and load checks.')
add('ERP, CRM & automation', 'Salesforce Sales and Service',
    'Move customer enquiries into sales and service processes, with connections to finance and order systems.',
    'salesforce nodejs postgresql',
    [('Channels','Website / customer portal','Capture a lead or service request.'),('CRM','Salesforce','Manage customer and case records.'),('Connect','Flow + integration API','Apply approvals and exchange updates.'),('Business systems','ERP + reporting','Send approved orders and status updates.')],
    'Agree which system owns each record. Design for API limits, duplicate prevention, customer permissions and integration retries.')
add('ERP, CRM & automation', 'Workflow Automation with n8n',
    'Connect everyday tasks such as invoice follow-up, approval requests and service ticket routing.',
    'n8n postgresql python',
    [('Trigger','Form / email / webhook','Receive a request or system event.'),('Workflow','n8n','Validate inputs and connect approved tools.'),('Approval','Human review','Pause important actions for a decision.'),('Result','Business API + audit log','Record the outcome and failed tasks.')],
    'Protect credentials, verify webhooks, and design safe retries. Use a queue and workers when workload or availability needs grow.')

add('Data & analytics', 'Cloud Data Warehouse',
    'Bring sales, finance and operations data together so teams can use consistent business reports.',
    'airflow dbt snowflake',
    [('Sources','ERP / CRM / business data','Collect approved business datasets.'),('Load','Airflow + ingestion jobs','Schedule and monitor data movement.'),('Model','Snowflake + dbt','Clean, test and organise reporting tables.'),('Report','BI dashboards','Publish agreed business measures.')],
    'Define data owners, access rules and freshness targets. Apply warehouse usage limits and test financial reporting logic.')
add('Data & analytics', 'Spark Data Lakehouse',
    'Process large files, historical records and mixed datasets for analytics and machine learning.',
    'spark python airflow',
    [('Ingest','Business files + events','Land approved data in object storage.'),('Process','Apache Spark','Clean and transform large datasets.'),('Organise','Delta Lake tables','Keep versioned analytical tables.'),('Use','SQL reports + ML','Serve governed analysis and model inputs.')],
    'Use a data catalogue, access controls, table maintenance and workload limits. Separate sensitive data and manage retention.')
add('Data & analytics', 'Kafka Event Processing',
    'Share order, stock or payment-status changes between systems without making every app wait for the next one.',
    'kafka java postgresql',
    [('Publish','Business services','Publish a confirmed business event.'),('Stream','Apache Kafka','Retain and distribute event messages.'),('Process','Consumer services','Validate and process each event.'),('Update','Operational databases','Update views and notify other systems.')],
    'Plan message schemas, ordering, replay and consumer lag. Use idempotent consumers so replay does not create duplicate business actions.')
add('Data & analytics', 'Practical Business Dashboards',
    'Give growing businesses clear sales and operations reports without starting with a large data platform.',
    'postgresql python metabase',
    [('Collect','Business apps + exports','Collect data on an agreed schedule.'),('Prepare','Python jobs','Validate and clean source records.'),('Store','PostgreSQL reporting DB','Keep reporting separate from live apps.'),('Visualise','Metabase','Share dashboards with role-based access.')],
    'Use read-only reporting access, agree metric definitions and display data freshness. Add a warehouse when scale justifies it.')

add('AI & machine learning', 'Private Document Assistant',
    'Let staff search company manuals and policies using models hosted in your own environment.',
    'ollama fastapi postgresql',
    [('Prepare','Approved documents','Extract text with document permissions.'),('Retrieve','PostgreSQL + pgvector','Find relevant content the user may access.'),('Answer','FastAPI + Ollama','Generate an answer using retrieved sources.'),('Review','Sources + staff feedback','Show evidence and flag uncertain answers.')],
    'Size compute for the chosen model and concurrent users. Test retrieval, access filtering and answer quality; no answer is guaranteed correct.')
add('AI & machine learning', 'Azure Document AI Assistant',
    'Use managed AI and company documents for staff support, with existing Microsoft access controls.',
    'azure python dotnet',
    [('Access','Entra ID + application','Verify the user and their permissions.'),('Retrieve','Azure AI Search','Search authorised company content.'),('Generate','Azure-hosted model endpoint','Create a response using retrieved content.'),('Review','Citations + evaluation','Check quality and retain approved logs.')],
    'Confirm model and search availability, data processing terms and region. Use private connectivity where supported and validate document permissions.')
add('AI & machine learning', 'Google Cloud AI Applications',
    'Add document search and AI support to customer or staff applications using managed Google Cloud services.',
    'googlecloud python fastapi',
    [('Content','Cloud Storage','Keep approved documents and metadata.'),('Retrieve','Vector Search','Find relevant content with access filters.'),('Generate','Vertex AI model endpoint','Produce a grounded response.'),('Serve','Cloud Run application','Show sources, collect feedback and logs.')],
    'Validate the model, retrieval quality, safety rules, regional support and data handling terms before opening access to users.')
add('AI & machine learning', 'Prediction and ML Serving',
    'Deploy demand forecasts, risk scores or image classification models with a controlled release process.',
    'pytorch mlflow fastapi',
    [('Prepare','Versioned training data','Validate inputs and separate test data.'),('Train','PyTorch','Train and evaluate a suitable model.'),('Release','MLflow registry','Track versions and approve deployment.'),('Serve','FastAPI + monitoring','Return predictions and track quality.')],
    'Compare against a simple baseline. Monitor drift, response time and business impact; keep rollback and retraining procedures.')

add('IT operations & security', 'Infrastructure and GitOps Delivery',
    'Build environments and release software through approved, repeatable changes instead of manual server edits.',
    'gitlab terraform kubernetes',
    [('Change','GitLab repository','Review code and environment changes.'),('Provision','Terraform','Create approved infrastructure.'),('Deploy','CI pipeline + GitOps','Apply reviewed app changes to Kubernetes.'),('Operate','Health checks + rollback','Observe releases and recover safely.')],
    'Protect deployment credentials and Terraform state. Scan images, separate environments and test database migration rollback plans.')
add('IT operations & security', 'Monitoring and Service Health',
    'See application faults, slow requests and infrastructure issues in one place, with alerts for the right team.',
    'opentelemetry prometheus grafana',
    [('Instrument','Apps + infrastructure','Produce metrics, logs and traces.'),('Collect','OpenTelemetry Collector','Receive, filter and forward telemetry.'),('Store','Prometheus + Loki / Tempo','Store metrics, logs and traces separately.'),('Respond','Grafana + alert routing','Investigate issues and notify responders.')],
    'Set service targets, useful alert thresholds and retention limits. Remove sensitive fields and control high-cardinality telemetry.')
add('IT operations & security', 'Identity and Secure App Access',
    'Give staff one controlled way to access internal applications, with multi-factor sign-in and clear permissions.',
    'keycloak nginx postgresql',
    [('Identity','Keycloak + staff directory','Check identity and multi-factor sign-in.'),('Entry','NGINX + TLS','Route encrypted application traffic.'),('Application','OIDC / OAuth validation','Verify tokens and enforce app permissions.'),('Audit','Access events + alerts','Track sign-ins and important actions.')],
    'Single sign-on is one layer of security. Also plan device controls, network restrictions, privileged access and emergency account recovery.')
add('IT operations & security', 'Backup and Recovery Foundation',
    'Protect databases and business systems, with a recovery plan the team can actually practise.',
    'linux ansible postgresql',
    [('Protect','Apps + PostgreSQL','Identify business systems and recovery order.'),('Back up','Database-native backups','Capture consistent backups and transaction logs.'),('Isolate','Encrypted backup storage','Keep an isolated, immutable copy where supported.'),('Recover','Ansible + restore tests','Rebuild systems and verify restored data.')],
    'Agree recovery time and data-loss targets. Separate backup credentials, keep an offsite copy and schedule full restore exercises.')

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
      <details class="stack-architecture"><summary>See the system design <span aria-hidden="true">+</span></summary>
        <ol class="architecture-flow" aria-label="{esc(s['title'])} system flow">{flow}</ol>
        <p class="production-note"><strong>Before going live</strong>{esc(s['note'])}</p>
      </details>
      <a class="stack-contact" href="{esc(href)}">Discuss this stack <span aria-hidden="true">→</span></a>
    </article>''')
section=f'''<section class="section blueprints stack-library" id="blueprints" aria-labelledby="stack-library-title">
    <div class="eyebrow">PRACTICAL IT STACKS <span class="soft">// BUILT AROUND YOUR BUSINESS</span></div>
    <div class="stack-library-heading"><div><h2 id="stack-library-title">The Right Tools.<br>A System That Fits.</h2>
    <p class="lead">Explore 24 practical ways to connect your cloud, apps, business data and AI. Start with what you need to achieve, then see how the parts work together.</p></div><a class="stack-help" href="#diagnostic">Not sure where to start? <span>Check your system needs →</span></a></div>
    <div class="stack-filters" role="group" aria-label="Filter technology stacks" hidden><button class="stack-filter" type="button" aria-pressed="true" data-stack-category="all">All stacks <span>24</span></button>{filters}</div>
    <div class="stack-results"><p id="stack-result-count" role="status" aria-live="polite">24 example architectures</p><span>Choose a card to see the system flow</span></div>
    <div class="stack-library-grid">{''.join(cards)}</div>
    <div class="stack-library-more" hidden><button type="button" class="btn" id="stack-show-more">Explore all 24 stacks <span aria-hidden="true">↓</span></button></div>
    <div class="stack-library-foot"><p>Every business needs a different mix. We choose the stack around your existing systems, budget, support team and where your data needs to stay.</p><small>Example architectures, not fixed packages. Product names and logos belong to their owners; their use does not imply a partnership.</small></div>
  </section>'''
page=Path('index.html');text=page.read_text(encoding='utf-8')
start=text.index('<section class="section blueprints"') if '<section class="section blueprints"' in text else text.index('<section class="section blueprints stack-library"')
end=text.index('<section class="section diagnostic"',start)
text=text[:start]+section+text[end:]
if 'assets/stack-library.css' not in text:text=text.replace('</head>','  <link rel="stylesheet" href="assets/stack-library.css">\n</head>')
if 'assets/stack-library.js' not in text:text=text.replace('</body>','  <script src="assets/stack-library.js" defer></script>\n</body>')
page.write_text(text,encoding='utf-8')
Path('assets/stack-catalog.json').write_text(json.dumps(catalog,indent=2),encoding='utf-8')
print('Generated',len(catalog),'architecture cards with',len(set(k for s in catalog for k in s['logos'])),'unique logos')
