"""Build static service/contact pages and consistent search metadata. No server is required."""
from pathlib import Path
from html import escape as esc
from urllib.parse import urlencode
import json
import re

ROOT=Path(__file__).resolve().parents[1]
BASE='https://www.autonoalabs.com/'
VERSION='20261123-contact1'
DATE='2026-11-23'
COMPANY='Autonoa Labs Private Limited'
EMAIL='contact@autonoalabs.com'
services=[
 dict(key='automation',file='workflow-automation.html',nav='Automation',name='Workflow Automation',title='Workflow Automation Services | Autonoa Labs',description='Connect requests, approvals and business software with Autonoa Labs. Start with one workflow, clear ownership and a practical way to track results.',
      heading='Workflow Automation That Keeps Work Moving.',lead='We connect requests, approvals and updates across your business tools. Your team knows what needs attention, who approves the next step and what has been completed.',image='assets/car-components/transmission-v2.png',caption='The transmission represents connected workflows: turning an agreed decision into the next step.',
      scope=[('Requests and approvals','Bring forms, team requests and approval steps into one clear process.'),('Connected business tools','Pass approved updates between accounts, customer records, staff tools and other software.'),('Tracking and recovery','Record completed steps, flag failures and avoid creating the same action twice.')],
      exampleTitle='A Supplier Invoice Approval',example='An invoice arrives, the accounts team checks it and the right person approves it. The workflow then updates the accounts system and records the result. Payment approval stays with the responsible team.',
      flow=[('Receive and check','Keep the invoice and supplier record together. Highlight missing information.'),('Ask for approval','Send the task to the right person and wait for their decision.'),('Update and confirm','Apply the approved update, record the result and flag failures.')],
      checks=['Which task takes the most time today, and who is responsible for each step?','Which systems need to exchange information, and how can they connect?','Which changes need approval, and how should failed or incorrect steps be handled?']),
 dict(key='integration',file='business-systems-integration.html',nav='Integration',name='Business Systems Integration',title='Business Systems Integration | Autonoa Labs',description='Connect your customer records, accounts, business apps and reports. Autonoa Labs plans system integration around your existing tools and data access.',
      heading='Business Systems Integration That Fits Your Tools.',lead='We connect the software your team already uses, so information can move between the right systems. Start with a clear record owner, the right access and one useful connection.',image='assets/car-components/chassis-v2.png',caption='The chassis represents the IT foundation that supports your apps, data and staff access.',
      scope=[('Application connections','Connect websites, customer records, accounts software and staff tools through supported connections.'),('Data quality and access','Agree which system owns each record, check duplicates and limit access to the people and tools that need it.'),('Reliable operation','Plan monitoring, backups and recovery for the connections your business relies on.')],
      exampleTitle='From an Approved Order to Accounts',example='The sales team confirms an order in its business tool. A supported connection passes the approved details to the accounts system, and the team checks the result without copying the same record by hand.',
      flow=[('Agree the main record','Confirm the order details, owner and approval point.'),('Connect the systems','Map the fields and exchange only the approved information.'),('Check the result','Confirm the update and send missing or conflicting details to the team.')],
      checks=['Which tools are involved, and which one keeps the main record?','What access, software licences and supported connections are available?','How will you spot duplicate, missing or failed updates and recover from them?']),
 dict(key='ai',file='ai-document-assistants.html',nav='AI Assistants',name='AI Document Assistants',title='AI Document Assistants for Business | Autonoa Labs',description='Help staff find answers in approved company documents. Autonoa Labs builds AI document assistants with access checks, source references and human review.',
      heading='AI Document Assistants for Your Team.',lead='We build AI assistants that help staff search approved policies, manuals and business documents. Answers show their sources, and your team checks important or uncertain results.',image='assets/car-components/engine-v2.png',caption='The engine represents AI support for reading, finding and checking information.',
      scope=[('Document search','Help staff find relevant information in the company documents they are allowed to access.'),('Answers with sources','Prepare answers and summaries that point back to the supporting documents.'),('Testing and review','Test real questions, check accuracy and decide when a person needs to review the result.')],
      exampleTitle='Finding an Answer in a Company Policy',example='A staff member asks a question about a company process. The assistant finds relevant content in documents that person may access and prepares an answer with sources. If the evidence is unclear, the question goes to a person.',
      flow=[('Check access','Confirm who is asking and which documents they may use.'),('Find supporting information','Search the approved document collection for relevant material.'),('Prepare and review','Show an answer with sources, and flag uncertainty or important decisions.')],
      checks=['Which documents are useful, current and approved for the assistant?','Who may access each document, and where must information be stored or processed?','Which test questions and review rules will show whether the answers are useful?']),
 dict(key='martech',file='martech-services.html',nav='MarTech',name='MarTech Services',title='MarTech Services: CRM, Campaigns & Reporting | Autonoa Labs',description='Connect lead capture, CRM, campaign tools and marketing reports. Autonoa Labs helps marketing and sales teams follow customer enquiries through to outcomes.',
      heading='MarTech for Connected Marketing and Sales.',lead='MarTech is the technology behind your marketing. We connect website enquiries, customer records, campaign tools and reports so marketing and sales can follow the same customer journey.',image=None,
      scope=[('Lead capture and CRM','Connect forms and customer records, reduce duplicates and assign enquiries to the right team.'),('Campaigns and customer journeys','Connect approved audiences, messages and follow-ups, with clear ownership and contact preferences.'),('Customer data and measurement','Connect useful customer information and reports that show enquiries, responses and outcomes.')],
      exampleTitle='From a Website Enquiry to Sales Follow-up',example='A customer completes your website form. The CRM keeps the contact and enquiry together, the right team receives a follow-up task and the report records what happened next.',
      flow=[('Capture the enquiry','Keep the contact details, enquiry source and preferences together.'),('Follow up with ownership','Assign the task and connect the next agreed action or campaign step.'),('Review the outcome','Compare responses, follow-ups and bookings or sales across the tools.')],
      checks=['Which enquiry or customer journey should you improve first?','Which website, CRM and campaign tools are already in use?','How will contact preferences, approvals, duplicate contacts and results be checked?'])
]

def organization():
 return {'@type':'Organization','@id':BASE+'#organization','name':'Autonoa Labs','legalName':COMPANY,'url':BASE,'logo':BASE+'assets/brand/source-logo.png','email':EMAIL,'address':{'@type':'PostalAddress','addressLocality':'Bhiwandi','addressRegion':'Maharashtra','addressCountry':'IN'},'contactPoint':{'@type':'ContactPoint','contactType':'sales','email':EMAIL,'url':BASE+'contact.html'}}

def metadata(title,description,file,service=None):
 url=BASE+file
 graph=[organization(),{'@type':'WebSite','@id':BASE+'#website','url':BASE,'name':'Autonoa Labs','publisher':{'@id':BASE+'#organization'}}, {'@type':'ContactPage' if file=='contact.html' else 'WebPage','@id':url+'#page','url':url,'name':title,'description':description,'isPartOf':{'@id':BASE+'#website'},'about':{'@id':BASE+'#organization'}}]
 if service:
  graph.append({'@type':'Service','@id':url+'#service','name':service['name'],'description':description,'url':url,'provider':{'@id':BASE+'#organization'}})
 if file:
  graph.append({'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':'Home','item':BASE},{'@type':'ListItem','position':2,'name':service['name'] if service else 'Contact','item':url}]})
 return f'''<link rel="canonical" href="{url}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Autonoa Labs">
  <meta property="og:title" content="{esc(title,quote=True)}"><meta property="og:description" content="{esc(description,quote=True)}"><meta property="og:url" content="{url}">
  <meta property="og:image" content="{BASE}assets/brand/source-logo.png"><meta property="og:image:alt" content="Autonoa Labs gold ribbon logo">
  <meta name="twitter:card" content="summary"><meta name="twitter:title" content="{esc(title,quote=True)}"><meta name="twitter:description" content="{esc(description,quote=True)}">
  <script type="application/ld+json">{json.dumps({'@context':'https://schema.org','@graph':graph},ensure_ascii=False)}</script>'''

def brand():
 return '<img class="brand-mark" src="assets/brand/autonoa-ribbon.svg" width="1078" height="604" alt=""><span class="brand-copy"><span class="brand-name">AUTONOA</span><span class="brand-labs">LABS</span></span>'

def header(file):
 links=''.join(f'<a href="{s["file"]}"'+(' aria-current="page"' if s['file']==file else '')+f'>{s["nav"]}</a>' for s in services)
 links+='<a href="contact.html"'+(' aria-current="page"' if file=='contact.html' else '')+'>Contact</a>'
 return f'<a class="skip-link" href="#main">Skip to content</a><header class="topbar"><div class="inner wrap"><a class="brand" href="index.html" aria-label="Autonoa Labs home">{brand()}</a><nav class="nav" id="main-navigation" aria-label="Main navigation">{links}</nav><button class="hamb" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="main-navigation">☰</button></div></header>'

def identity():
 return f'<address class="business-identity"><strong>{COMPANY}</strong><span>Bhiwandi, Maharashtra, India</span><a href="mailto:{EMAIL}">{EMAIL}</a><a href="contact.html">Contact our team</a></address>'

def footer():
 return f'<footer class="site-footer"><div class="wrap"><div class="footer-layout"><div><a class="brand" href="index.html" aria-label="Autonoa Labs home">{brand()}</a>{identity()}</div><nav class="footer-links" aria-label="Footer navigation"><a href="index.html">Home</a>'+''.join(f'<a href="{s["file"]}">{s["name"]}</a>' for s in services)+'<a href="contact.html">Contact</a><a href="index.html#diagnostic">Quick assessment</a></nav></div><p class="copyright">© 2026 Autonoa Labs. Connected systems. People in control.</p></div></footer>'

def shell(title,description,file,body,service=None,extra_script=''):
 return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#0b1418"><title>{esc(title)}</title><meta name="description" content="{esc(description,quote=True)}">
  {metadata(title,description,file,service)}
  <link rel="stylesheet" href="assets/service-pages.css?v={VERSION}"></head><body>{header(file)}<main id="main" class="wrap">{body}</main>{footer()}<script src="assets/site-navigation.js?v=20261123-contact1" defer></script>{extra_script}</body></html>'''

for s in services:
 enquiry='contact.html?'+urlencode({'service':s['key']})
 if s['image']:
  visual=f'<figure class="hero-image"><img src="{s["image"]}" width="1536" height="1024" alt="{esc(s["caption"])}" fetchpriority="high"><figcaption>{esc(s["caption"])}</figcaption></figure>'
 else:
  visual='<aside class="journey-summary"><div class="eyebrow">ONE CONNECTED JOURNEY</div><h2>Website enquiry. Customer record. Team follow-up.</h2><ol><li><strong>Capture</strong><span>Keep the enquiry and its source together.</span></li><li><strong>Connect</strong><span>Update the customer record and assign the next step.</span></li><li><strong>Review</strong><span>See the response and outcome in your reports.</span></li></ol></aside>'
 body=f'<p class="breadcrumb"><a href="index.html">Home</a><span>/</span>{s["name"]}</p><section class="page-hero"><div><div class="eyebrow">{s["name"]}</div><h1>{s["heading"]}</h1><p>{s["lead"]}</p><div class="hero-actions"><a class="btn primary" href="{enquiry}">Discuss Your Needs</a><a class="btn" href="index.html#diagnostic">Explore Your Starting Point</a></div></div>{visual}</section>'
 body+='<section class="service-section"><h2>What We Can Help With</h2><div class="service-scope">'+''.join(f'<article><h3>{esc(t)}</h3><p>{esc(d)}</p></article>' for t,d in s['scope'])+'</div></section>'
 body+=f'<section class="service-section"><div class="eyebrow">A PRACTICAL EXAMPLE</div><h2>{s["exampleTitle"]}</h2><p class="example-intro">{s["example"]}</p><ol class="service-flow">'+''.join(f'<li><strong>{esc(t)}</strong><span>{esc(d)}</span></li>' for t,d in s['flow'])+'</ol><p class="service-note">This is an example of a possible setup. We review your existing tools and requirements before agreeing a design.</p></section>'
 body+='<section class="service-section"><h2>What We Check Before Building</h2><ul class="service-checks">'+''.join(f'<li>{esc(t)}</li>' for t in s['checks'])+'</ul></section>'
 body+=f'<section class="page-close"><h2>Start with One Useful Improvement.</h2><p>Tell us about the task, the tools you use and where work slows down. We can then agree what to review first.</p><a class="btn primary" href="{enquiry}">Make an Enquiry</a><nav class="related-services" aria-label="Other services">'+''.join(f'<a href="{other["file"]}">{other["name"]}</a>' for other in services if other['key']!=s['key'])+'</nav></section>'
 (ROOT/s['file']).write_text(shell(s['title'],s['description'],s['file'],body,s),encoding='utf-8')

contact_body=f'''<p class="breadcrumb"><a href="index.html">Home</a><span>/</span>Contact</p>
<header class="contact-heading"><div class="eyebrow">CONTACT AUTONOA LABS</div><h1>Tell Us What You Want to Improve.</h1><p>Ask about workflow automation, systems integration, AI document assistants or MarTech. Start with the work that slows your team down; we will help you review the next step.</p></header>
<div class="contact-layout"><aside class="contact-details"><h2>Speak to Our Team</h2><p>You can email us directly or use the short form to prepare an enquiry.</p><a class="email-link" href="mailto:{EMAIL}">{EMAIL}</a><address><strong>{COMPANY}</strong><br>Bhiwandi, Maharashtra, India</address><p class="contact-optional">Want to explore first? <a href="index.html#diagnostic">Try the quick assessment</a>.</p><nav class="related-services" aria-label="Explore our services">'''+''.join(f'<a href="{s["file"]}">{s["name"]}</a>' for s in services)+f'''</nav></aside>
<div><noscript><div class="noscript-contact">Email <a href="mailto:{EMAIL}">{EMAIL}</a> to discuss your needs. Enable JavaScript to prepare a draft with the form.</div></noscript>
<form class="contact-form" id="enquiry-form" novalidate hidden><h2>Prepare an Enquiry</h2><p>This form prepares an email draft. You review and send it from your email app.</p>
<div class="form-row"><label class="contact-field"><span>Your name <small>(required)</small></span><input name="name" autocomplete="name" required maxlength="80"></label><label class="contact-field"><span>Email for a reply <small>(required)</small></span><input name="email" type="email" autocomplete="email" required maxlength="254"></label></div>
<label class="contact-field"><span>Company <small>(optional)</small></span><input name="company" autocomplete="organization" maxlength="120"></label>
<label class="contact-field"><span>What would you like help with?</span><select name="service"><option value="not-sure">Help choosing a starting point</option><option value="automation">Workflow automation</option><option value="integration">Business systems integration</option><option value="ai">AI document assistants</option><option value="martech">MarTech services</option></select></label>
<label class="contact-field"><span>What would you like to improve? <small>(required)</small></span><textarea name="message" rows="6" required minlength="20" maxlength="1500" aria-describedby="message-help"></textarea></label><p class="form-help" id="message-help">Mention your current tools, the task and the main problem. Use 20–1,500 characters.</p>
<button class="btn primary" type="submit">Prepare Email Draft</button><p class="form-help">Your answers stay on this page. We receive your enquiry only after you send the email. Refreshing clears the form.</p>
<section class="email-draft" id="email-draft" aria-labelledby="draft-title" hidden><h3 id="draft-title" tabindex="-1">Your Enquiry Draft</h3><p class="draft-status" id="draft-status" role="status"></p><p class="form-help" id="draft-subject"></p><div class="draft-actions"><a class="btn primary" id="open-email-draft" href="mailto:{EMAIL}">Open Email App</a><button class="btn" type="button" id="copy-enquiry">Copy Email Text</button></div><label class="contact-field" for="draft-preview"><span>Your message</span></label><textarea class="draft-preview" id="draft-preview" readonly rows="10"></textarea></section></form></div></div>'''
(ROOT/'contact.html').write_text(shell('Contact Autonoa Labs | Bhiwandi, Maharashtra','Contact Autonoa Labs Private Limited in Bhiwandi, Maharashtra. Ask about automation, systems integration, AI document assistants and MarTech services.','contact.html',contact_body,extra_script=f'<script src="assets/contact-draft.js?v={VERSION}" defer></script>'),encoding='utf-8')

home=ROOT/'index.html'
text=home.read_text(encoding='utf-8')
title='Autonoa Labs | Workflow Automation, AI, IT & MarTech'
description='Autonoa Labs connects business software, automates approvals, builds AI document assistants and links marketing tools, customer records and reporting.'
text=re.sub(r'<title>.*?</title>',f'<title>{esc(title)}</title>',text,count=1)
text=re.sub(r'<meta name="description" content="[^"]*">',f'<meta name="description" content="{esc(description,quote=True)}">',text,count=1)
block='<!-- search-metadata:start -->\n  '+metadata(title,description,'')+'\n  <!-- search-metadata:end -->'
if '<!-- search-metadata:start -->' in text:
 text=re.sub(r'<!-- search-metadata:start -->.*?<!-- search-metadata:end -->',lambda m:block,text,flags=re.S)
else:text=text.replace('  <style>','  '+block+'\n  <style>',1)
if 'class="nav" id="main-navigation"' in text and '<a href="contact.html">Contact</a>' not in text:
 text=text.replace('<a href="#philosophy">Our Approach</a>','<a href="#philosophy">Our Approach</a><a href="contact.html">Contact</a>',1)
if 'class="service-page-links"' not in text:
 architecture=text.index('<section class="section" id="architecture">')
 lead_end=text.index('</p>',architecture)+4
 links='<nav class="service-page-links" aria-label="Explore our services">'+''.join(f'<a href="{s["file"]}">{s["name"]}</a>' for s in services[:3])+'</nav>'
 text=text[:lead_end]+links+text[lead_end:]
if 'class="martech-service-link"' not in text:
 text=text.replace('<a class="btn primary martech-action"','<a class="martech-service-link" href="martech-services.html">Explore MarTech services</a>\n      <a class="btn primary martech-action"',1)
text=text.replace('Strong IT supports your apps. AI helps your team use information. Automation moves work between tools. Together, they also connect your marketing, customer enquiries and follow-ups. Like the parts of a car, they work best as one system.','We help with workflow automation, business systems integration, AI document assistants and MarTech. Strong IT supports your apps, AI helps your team use information, and automation connects the next steps, like the parts of a car.')
text=text.replace('href="mailto:contact@autonoalabs.com?subject=Discuss%20my%20business%20needs"','href="contact.html"')
text=text.replace('Email our team. No need to choose a technology first.','Make an enquiry or email our team. No need to choose a technology first.')
for old,new in [('<a href="#architecture">IT for your apps and data</a>','<a href="business-systems-integration.html">IT for your apps and data</a>'),('<a href="#architecture">AI support for your team</a>','<a href="ai-document-assistants.html">AI support for your team</a>'),('<a href="#architecture">Connected daily workflows</a>','<a href="workflow-automation.html">Connected daily workflows</a>')]:text=text.replace(old,new)
# Keep the MarTech section anchor in the main menu and the detailed page in the footer.
text=text.replace('<a href="#martech">MarTech and customer journeys</a>','<a href="martech-services.html">MarTech and customer journeys</a>')
if '<address class="business-identity">' not in text:
 text=text.replace('We connect business software and marketing tools to make daily work and customer follow-ups easier.</p>','We connect business software and marketing tools to make daily work and customer follow-ups easier.</p>'+identity(),1)
if 'assets/site-contact.css' not in text:text=text.replace('</head>',f'  <link rel="stylesheet" href="assets/site-contact.css?v={VERSION}">\n</head>')
text=text.replace('src="assets/site-navigation.js"',f'src="assets/site-navigation.js?v={VERSION}"')
text=text.replace('assets/audience-config.js?v=20261123-martech1',f'assets/audience-config.js?v={VERSION}')
text=text.replace('assets/audience.js?v=20261123-martech1',f'assets/audience.js?v={VERSION}')
home.write_text(text,encoding='utf-8')

urls=['']+[s['file'] for s in services]+['contact.html']
(ROOT/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{BASE}{file}</loc><lastmod>{DATE}</lastmod></url>\n' for file in urls)+'</urlset>\n',encoding='utf-8')
(ROOT/'robots.txt').write_text('User-agent: *\nAllow: /\n\nSitemap: '+BASE+'sitemap.xml\n',encoding='utf-8')
print('Built four service pages, contact page, homepage search metadata and six-URL sitemap.')
