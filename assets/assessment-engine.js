/* A transparent, browser-local planning questionnaire. It does not inspect live systems. */
(function (root) {
  'use strict';
  const option = (value, label, detail = '') => ({value, label, detail});
  const fields = {
    goal: {label:'What would you most like to improve?', hint:'Choose your main goal. We will use this to keep the plan focused.', options:[
      option('automate','Reduce manual work','Spend less time on repeat tasks.'), option('connect','Connect our systems','Stop copying data between tools.'),
      option('ai','Use AI with our business knowledge','Help people find and use information.'), option('reports','Get clearer business reports','Make decisions with consistent data.'),
      option('reliable','Make our IT more reliable','Improve access, backups and service health.'), option('unsure','Help us find a starting point','We want advice before choosing tools.') ]},
    size: {label:'How many people will use the system?', hint:'Optional. This helps us think about support and rollout.', optional:true, options:[option('small','Up to 25 people'),option('medium','26–100 people'),option('large','More than 100 people'),option('unsure','Not sure yet')]},
    environment: {label:'Where do your systems run today?', hint:'Choose the closest match.', options:[option('cloud','Mostly in the cloud','Online services or cloud-hosted apps.'),option('office','Mostly in our office','Our own servers or local software.'),option('hybrid','A mix of both','Office systems connected to cloud tools.'),option('unsure','I am not sure','We can map this out together.')]},
    systems: {label:'Which tools do you already use?', hint:'Choose all that apply. We aim to work with what you have.', multi:true, options:[option('microsoft','Microsoft 365 / Teams'),option('sap','SAP'),option('erp','Another ERP system'),option('oracle','Oracle'),option('salesforce','Salesforce'),option('crm','Another CRM system'),option('spreadsheets','Excel / spreadsheets'),option('custom','Custom-built software'),option('unsure','Not sure / none of these')]},
    task: {label:'Which piece of work should we look at first?', hint:'Choose one real process to start with.', options:[option('documents','Finding answers in documents','Policies, manuals or internal guidance.'),option('records','Checking and matching records','Invoices, orders or stock data.'),option('requests','Handling requests and approvals','Tickets, follow-ups or staff approvals.'),option('reporting','Preparing reports','Combining data and updating dashboards.'),option('portal','Running a customer or staff app','A portal, booking service or business app.'),option('unsure','We need help choosing','Identify a useful process first.')]},
    control: {label:'How should the system work with your team?', hint:'Important decisions need clear owners and approval rules.', options:[option('suggest','Suggest, then let us decide','The team reviews suggestions and acts.'),option('approve','Prepare actions for approval','The system acts only after approval.'),option('bounded','Handle routine steps within limits','Send exceptions and important decisions to people.'),option('unsure','Help us set the right controls','Agree the limits before automating.')]},
    data: {label:'What kind of data will the process use?', hint:'Choose the most sensitive type involved. No documents or records are needed here.', options:[option('public','Public information','Content anyone is allowed to see.'),option('internal','Internal business information','Staff documents and routine business data.'),option('sensitive','Customer, finance or sensitive data','Records that need extra access and handling checks.'),option('unsure','We need help checking this','Classify the data before choosing a design.')]},
    location: {label:'Where does your data need to stay?', hint:'Think about storage, backups and AI processing. We will check specific requirements with you.', options:[option('india','India'),option('uae','UAE'),option('saudi','Saudi Arabia'),option('existing','Within our own environment'),option('other','Another country / region'),option('flexible','No fixed location requirement'),option('unsure','We need help deciding')]}
  };
  const steps = [
    {title:'Your goal', description:'Start with the business need.', fields:['goal','size']},
    {title:'Current setup', description:'Tell us what is already in place.', fields:['environment','systems']},
    {title:'Daily work', description:'Choose one process and the right level of control.', fields:['task','control']},
    {title:'Data & priorities', description:'Help us plan around your data and location needs.', fields:['data','location']}
  ];
  function clean(answers = {}) {
    const safe = {};
    for (const [key, field] of Object.entries(fields)) {
      const values = field.options.map(o => o.value);
      if (field.multi) {
        const selected = Array.isArray(answers[key]) ? [...new Set(answers[key].filter(x => values.includes(x)))] : [];
        safe[key] = selected.includes('unsure') ? ['unsure'] : selected;
      } else if (values.includes(answers[key])) safe[key] = answers[key];
    }
    return safe;
  }
  function label(key, value) {
    if (Array.isArray(value)) return value.map(v => label(key, v)).join(', ');
    return fields[key].options.find(o => o.value === value)?.label || 'Not provided';
  }
  function missing(answers, step) {
    const safe = clean(answers);
    return steps[step].fields.filter(k => !fields[k].optional && (!safe[k] || (Array.isArray(safe[k]) && !safe[k].length)));
  }
  const patterns = {
    privateAI:{index:16,title:'Private Document Assistant',logos:['ollama','fastapi','postgresql']},
    azureAI:{index:17,title:'Azure Document AI Assistant',logos:['azure','python','dotnet']},
    automation:{index:11,title:'Workflow Automation with n8n',logos:['n8n','postgresql','python']},
    sap:{index:8,title:'SAP and Business Integration',logos:['sap','java','postgresql']},
    oracle:{index:9,title:'Oracle Business Data Integration',logos:['oracle','java','python']},
    crm:{index:10,title:'Salesforce Sales and Service',logos:['salesforce','nodejs','postgresql']},
    reports:{index:15,title:'Practical Business Dashboards',logos:['postgresql','python','metabase']},
    warehouse:{index:12,title:'Cloud Data Warehouse',logos:['airflow','dbt','snowflake']},
    app:{index:4,title:'React and Node.js Web Apps',logos:['react','nodejs','postgresql']},
    dotnet:{index:5,title:'.NET Business Systems',logos:['dotnet','azure','sqlserver']},
    monitoring:{index:21,title:'Monitoring and Service Health',logos:['opentelemetry','prometheus','grafana']},
    recovery:{index:23,title:'Backup and Recovery Foundation',logos:['linux','ansible','postgresql']}
  };
  const pilots = {
    documents:{title:'Pilot a document assistant with a small, approved collection.', reason:'Start with one useful source of business knowledge and test answers with the people who use it.', work:'Choose approved documents, keep their access permissions, and test questions with known answers. Show sources and route uncertain answers to staff.', measure:'Track useful answers, source accuracy and questions that still need a person.'},
    records:{title:'Pilot record matching with a review queue.', reason:'Choose one set of records so you can check the rules and exceptions before extending the process.', work:'Use a copy of one invoice, order or stock dataset. Agree matching rules, highlight differences and keep approval before any write-back.', measure:'Track matching accuracy, review time and incorrect matches. Compare with the current manual process.'},
    requests:{title:'Pilot one request and approval workflow.', reason:'A small, repeatable workflow lets your team test the handovers and controls.', work:'Map one request from arrival to completion. Add clear ownership, an approval point, safe retries and an exception queue.', measure:'Track handling time, missed requests, exceptions and duplicate actions.'},
    reporting:{title:'Start with one trusted business dashboard.', reason:'Agree the numbers and their sources before building a larger reporting platform.', work:'Choose one report, agree its measures and update frequency, and compare its output against the source records.', measure:'Track data freshness, reconciliation differences and time spent preparing the report.'},
    portal:{title:'Scope one useful app journey before building.', reason:'A defined user journey keeps the design and integration work focused.', work:'Choose one user task, confirm access and API needs, then test a small version with its intended users.', measure:'Track task completion, response time, error rate and support requests.'},
    foundation:{title:'Review the IT foundation before adding new tools.', reason:'You identified reliability as the main goal. Verify access, service health and recovery needs first.', work:'Map critical systems and owners. Check access, monitoring and backup restore evidence, then prioritise the gaps with the team.', measure:'Agree service availability and recovery targets; check monitoring coverage and evidence from a restore exercise.'},
    discovery:{title:'Start with a short systems and process review.', reason:'There is not enough detail yet to select a useful pilot. A review will help you choose one.', work:'Meet the system owner and one business team. Map tools, data and one slow process, then agree a small pilot and its success measures.', measure:'Finish with an agreed process, owner, baseline and a clear decision on what to try first.'}
  };
  function evaluate(input) {
    const answers = clean(input);
    if (steps.some((_, i) => missing(answers, i).length)) throw new Error('Complete the required questions before building a plan.');
    let kind = answers.task;
    if (answers.goal === 'reliable') kind = 'foundation';
    else if (kind === 'unsure') kind = {automate:'requests',connect:'records',ai:'documents',reports:'reporting',unsure:'discovery'}[answers.goal] || 'discovery';
    const pilot = pilots[kind];
    const shortlist = [];
    const add = (key, why) => { if (!shortlist.some(s => s.title === patterns[key].title)) shortlist.push({...patterns[key], why}); };
    const systems = answers.systems || [];
    const privateBoundary = answers.location === 'existing';
    if (kind === 'documents') {
      if (systems.includes('microsoft') && !privateBoundary) {
        add('azureAI','An option to review because you already use Microsoft tools. Check model availability and data handling terms.');
        add('privateAI','An alternative if self-hosting is needed and your team can support the model and hardware.');
      } else {
        add('privateAI','An option for a self-hosted pilot. Confirm hardware, document permissions and model suitability.');
        if (!privateBoundary) add('azureAI','A managed-service alternative to compare after checking data handling and regional support.');
      }
    } else if (['records','requests'].includes(kind)) {
      if (systems.includes('sap')) add('sap','Review the supported integration path for the ERP you use. SAP-specific tools apply only if your ERP is SAP.');
      if (systems.includes('oracle')) add('oracle','Review APIs and controlled data access around your existing Oracle systems.');
      if (systems.includes('salesforce') && shortlist.length < 2) add('crm','A reference if your CRM is Salesforce. For other CRMs, use their supported integration tools.');
      if (shortlist.length < 2) add('automation','A workflow option to test after confirming connectors, approvals and safe retries.');
    } else if (kind === 'reporting') {
      add('reports','A smaller reporting setup to consider first, with agreed measures and read-only data access.');
      if (systems.filter(s => s !== 'unsure').length >= 3 || answers.size === 'large') add('warehouse','A larger option to compare if source count, volume and reporting needs justify the extra operating work.');
    } else if (kind === 'portal') {
      add(systems.includes('microsoft') ? 'dotnet' : 'app','A reference application stack. Confirm your team’s skills and the fit with existing APIs before choosing it.');
    } else if (kind === 'foundation') {
      add('monitoring','A reference for understanding faults and service health.');
      add('recovery','A reference for backup isolation and tested recovery procedures.');
    }
    const checks = [];
    if (answers.data === 'sensitive') checks.push('Classify the sensitive records, limit access and use masked or sample data in the pilot. Keep human approval for important customer or financial actions.');
    if (answers.data === 'unsure') checks.push('Identify the data types and their owners before sharing records with a new service or AI model.');
    if (answers.control === 'bounded') checks.push('Start automation with tested, low-risk steps. Set limits, keep an audit trail and route exceptions to a person.');
    if (answers.control === 'suggest') checks.push('Keep the pilot advisory: show suggestions and evidence, and let the team make and carry out decisions.');
    if (answers.control === 'approve') checks.push('Add an explicit approval gate before changes are applied. Record who approved each important action.');
    if (answers.control === 'unsure') checks.push('Agree which actions need approval, who handles exceptions and how to stop or reverse a change.');
    if (privateBoundary) checks.push('Keep storage, model processing and backups inside your approved environment. Check integrations for any data leaving that boundary.');
    else if (['india','uae','saudi','other'].includes(answers.location)) checks.push(`Confirm the required hosting location (${label('location',answers.location)}), including backups, AI processing and support access. Check product availability before selecting services.`);
    else if (answers.location === 'unsure') checks.push('Agree data location requirements with the business and relevant policy owners before choosing hosting or AI services.');
    else checks.push('Even with no fixed location requirement, confirm data processing terms, access controls and backup locations.');
    const unknowns = [];
    for (const key of ['environment','systems','task','control','data','location']) {
      if (answers[key] === 'unsure' || (Array.isArray(answers[key]) && answers[key].includes('unsure'))) unknowns.push(label(key, 'unsure'));
    }
    const discovery = (answers.environment === 'unsure' || systems.includes('unsure'))
      ? 'Map your systems, access routes and data owners before choosing integration or hosting tools.'
      : `Review the ${label('environment',answers.environment).toLowerCase()} setup, current access, supported APIs and recovery arrangements.`;
    const rollout = answers.size === 'small'
      ? 'Keep the pilot easy for a small team to support. Agree an owner, a support route and a rollback plan.'
      : answers.size === 'large'
        ? 'Test with a small user group first. Assign business, IT and security owners before extending access.'
        : 'Start with one team and a named owner. Expand only after the results and support process have been reviewed.';
    return {answers,kind,title:pilot.title,reason:pilot.reason,measure:pilot.measure,shortlist:shortlist.slice(0,2),checks,unknowns,
      phases:[{title:'Check the foundation',text:discovery},{title:kind === 'discovery' ? 'Choose the first pilot' : kind === 'foundation' ? 'Verify the gaps' : 'Prove one use case',text:pilot.work},{title:'Review before expanding',text:rollout}]};
  }
  function report(plan) {
    const summary = Object.keys(fields).map(k => `${fields[k].label}\n${label(k,plan.answers[k])}`).join('\n\n');
    return `AUTONOA LABS — YOUR STARTING PLAN\nBased only on the answers you selected; live systems have not been inspected.\n\n${plan.title}\n${plan.reason}\n\nYOUR ANSWERS\n${summary}\n\nNEXT STEPS\n${plan.phases.map((p,i)=>`${i+1}. ${p.title}\n${p.text}`).join('\n\n')}\n\nWHAT TO MEASURE\n${plan.measure}\n\nCHECK BEFORE BUILDING\n${plan.checks.map(t=>'• '+t).join('\n')}\n\nSTACK EXAMPLES TO REVIEW\n${plan.shortlist.length ? plan.shortlist.map(s=>s.title+'\n'+s.why).join('\n\n') : 'Select a use case after the systems and process review.'}\n\nA technical review is needed to confirm the final design, effort and cost.\nContact: contact@autonoalabs.com\n`;
  }
  const api = {fields,steps,clean,label,missing,evaluate,report};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AutonoaAssessment = api;
})(typeof window !== 'undefined' ? window : globalThis);
