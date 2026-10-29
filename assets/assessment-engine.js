/* A transparent, browser-local planning questionnaire. It does not inspect live systems. */
(function (root) {
  'use strict';
  const option = (value, label, detail = '') => ({value, label, detail});
  const fields = {
    goal: {label:'What would you like to improve first?', hint:'Choose the main problem you want to solve.', options:[
      option('automate','Reduce manual work','Spend less time on repeat tasks.'), option('connect','Connect our systems','Stop copying data between tools.'),
      option('ai','Find and use company information with AI','Help staff search documents and prepare answers.'), option('reports','Get clearer business reports','Bring the right business numbers together.'),
      option('reliable','Make our IT more reliable','Improve sign-in, backups and system availability.'), option('unsure','Help us find a starting point','We want advice before choosing tools.') ]},
    size: {label:'How many people will use the system?', hint:'Optional. This helps us plan training and support.', optional:true, options:[option('small','Up to 25 people'),option('medium','26–100 people'),option('large','More than 100 people'),option('unsure','Not sure yet')]},
    environment: {label:'Where do your systems run today?', hint:'Choose the closest match.', options:[option('cloud','Mostly in the cloud','Online services or cloud-hosted apps.'),option('office','Mostly in our office','Our own servers or local software.'),option('hybrid','A mix of both','Office systems connected to cloud tools.'),option('unsure','I am not sure','We can map this out together.')]},
    systems: {label:'Which tools do you already use?', hint:'Choose all that apply. We start by looking at what you already have.', multi:true, options:[option('microsoft','Microsoft 365 / Teams'),option('sap','SAP'),option('erp','Other ERP / business management software'),option('oracle','Oracle'),option('salesforce','Salesforce'),option('crm','Other CRM / customer management software'),option('spreadsheets','Excel / spreadsheets'),option('custom','Software built for our business'),option('unsure','Not sure / none of these')]},
    task: {label:'Which piece of work should we look at first?', hint:'Choose one real process to start with.', options:[option('documents','Finding answers in documents','Policies, manuals or internal guidance.'),option('records','Checking and matching records','Invoices, orders or stock data.'),option('requests','Handling requests and approvals','Tickets, follow-ups or staff approvals.'),option('reporting','Preparing reports','Combining data and updating dashboards.'),option('portal','Running a customer or staff app','A portal, booking service or business app.'),option('unsure','We need help choosing','Identify a useful process first.')]},
    control: {label:'How much work should the system do on its own?', hint:'Your team decides which actions need approval and who handles problems.', options:[option('suggest','Make suggestions for our team','People check the suggestion and do the work.'),option('approve','Prepare work, then wait for approval','The system acts only after someone approves.'),option('bounded','Do agreed routine steps automatically','Send problems and important decisions to people.'),option('unsure','Help us decide the right limits','Agree what is allowed before automating.')]},
    data: {label:'What kind of information will the work use?', hint:'Choose the type that needs the most protection. You do not need to share any documents here.', options:[option('public','Public information','Content anyone is allowed to see.'),option('internal','Internal business information','Company documents and routine business records.'),option('sensitive','Customer, finance or other private records','Information that needs extra care and restricted access.'),option('unsure','We need help checking this','Check the information before choosing a setup.')]},
    location: {label:'Where does your data need to stay?', hint:'Think about storage, backups and AI processing. We will check specific requirements with you.', options:[option('india','India'),option('uae','UAE'),option('saudi','Saudi Arabia'),option('existing','Within our own environment'),option('other','Another country / region'),option('flexible','No fixed location requirement'),option('unsure','We need help deciding')]}
  };
  const steps = [
    {title:'Your goal', description:'Start with the business need.', fields:['goal','size']},
    {title:'Your tools', description:'Tell us which systems you use today.', fields:['environment','systems']},
    {title:'Daily work', description:'Choose a task and who should approve it.', fields:['task','control']},
    {title:'Your data', description:'Tell us how your information should be handled.', fields:['data','location']}
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
    documents:{title:'Try an AI assistant with a small set of company documents.', reason:'Start with documents your team uses often. Check whether the answers are useful before adding more.', work:'Choose approved documents and keep their access permissions. Test questions with known answers, show the sources and send uncertain answers to staff.', measure:'Check answer accuracy, whether the sources support each answer and how often someone still needs help.'},
    records:{title:'Try matching one set of business records.', reason:'Start with one type of record so your team can check the matching rules and any differences.', work:'Use a test copy of invoices, orders or stock records. Agree what should match, highlight differences and ask for approval before changing the main system.', measure:'Compare correct and incorrect matches, review time and time spent using the current manual process.'},
    requests:{title:'Try one request and approval process.', reason:'One familiar process makes it easier to test each step and decide who is responsible.', work:'Follow one request from arrival to completion. Name the person responsible for each step, set approvals and make sure failed steps can be retried without duplicate actions.', measure:'Check completion time, missed requests, failed steps and repeated actions.'},
    reporting:{title:'Start with one clear business report.', reason:'Agree which numbers matter and where they come from before building more reports.', work:'Choose one report. Agree what the numbers mean and how often they should update. Compare the report with the original records.', measure:'Check when the data was updated, whether the numbers match the source and time spent preparing the report.'},
    portal:{title:'Plan one useful task for your business app.', reason:'Choose one job a customer or staff member needs to do. This keeps the first version focused.', work:'Agree the task, who can use it and which systems it must connect to. Test a small version with the people who will use it.', measure:'Check whether people can finish the task, how long it takes, errors and requests for help.'},
    foundation:{title:'Check your IT foundation before adding new tools.', reason:'You chose reliability as the main need. Start with access, system problems and recovery arrangements.', work:'List important systems and who looks after them. Check sign-in, monitoring and evidence that backups can be restored. Agree which gaps to fix first.', measure:'Agree how quickly systems must recover and how much recent data could be lost. Test a restore and check that useful alerts reach the right person.'},
    discovery:{title:'Start by reviewing your tools and daily work.', reason:'A short review will help you choose a useful first improvement before selecting technology.', work:'Meet the people who use and support your systems. List the tools, information and steps in one slow process, then agree what to try and how to check the result.', measure:'Finish with a clear task, a person responsible and a way to compare the result with how work is done today.'}
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
        add('azureAI','An option because you already use Microsoft tools. Check where the AI runs, whether it is available there and how it handles your documents.');
        add('privateAI','Another option if the AI must run on your own systems. Check hardware needs and who will support it.');
      } else {
        add('privateAI','An option for a small trial on your own systems. Check hardware, document access and how well the AI handles your questions.');
        if (!privateBoundary) add('azureAI','A cloud service to compare after checking data handling and availability in your required location.');
      }
    } else if (['records','requests'].includes(kind)) {
      if (systems.includes('sap')) add('sap','Check the supported connections for your SAP system. Use these tools only if your business software is SAP.');
      if (systems.includes('oracle')) add('oracle','Check how other software can connect to your Oracle systems with the right permissions.');
      if (systems.includes('salesforce') && shortlist.length < 2) add('crm','An example for a business using Salesforce. Other customer-management software needs its own supported connections.');
      if (shortlist.length < 2) add('automation','An option for connecting tasks. Check which tools it can connect, who approves actions and how failed steps are retried.');
    } else if (kind === 'reporting') {
      add('reports','A smaller reporting setup to consider first. Agree the business numbers and let reports read data without changing the original records.');
      if (systems.filter(s => s !== 'unsure').length >= 3 || answers.size === 'large') add('warehouse','A larger setup to compare if you have many data sources or large amounts of reporting data. Check the extra cost and support work.');
    } else if (kind === 'portal') {
      add(systems.includes('microsoft') ? 'dotnet' : 'app','An example set of tools for a business app. Check that it fits your existing software and the skills of the team supporting it.');
    } else if (kind === 'foundation') {
      add('monitoring','An example for tracking system problems and sending alerts to the right team.');
      add('recovery','An example for protected backup copies and a recovery process the team has tested.');
    }
    const checks = [];
    if (answers.data === 'sensitive') checks.push('Identify private records, limit who can access them and use sample or masked data in the trial. Keep human approval for important customer or financial actions.');
    if (answers.data === 'unsure') checks.push('Identify the data types and their owners before sharing records with a new service or AI model.');
    if (answers.control === 'bounded') checks.push('Start with tested, low-risk steps. Set limits, record what happened and send problems to the right person.');
    if (answers.control === 'suggest') checks.push('Keep the trial to suggestions only. Show the supporting information and let your team decide and do the work.');
    if (answers.control === 'approve') checks.push('Wait for approval before making changes. Record who approved each important action.');
    if (answers.control === 'unsure') checks.push('Agree which actions need approval, who handles exceptions and how to stop or reverse a change.');
    if (privateBoundary) checks.push('Keep storage, model processing (where the AI runs) and backups on your approved systems. Check whether any connected tool sends data elsewhere.');
    else if (['india','uae','saudi','other'].includes(answers.location)) checks.push(`Confirm the required hosting location (${label('location',answers.location)}), including backups, AI processing and support access. Check product availability before selecting services.`);
    else if (answers.location === 'unsure') checks.push('Agree data location requirements with the business and relevant policy owners before choosing hosting or AI services.');
    else checks.push('Even with no fixed location requirement, confirm data processing terms, access controls and backup locations.');
    const unknowns = [];
    for (const key of ['environment','systems','task','control','data','location']) {
      if (answers[key] === 'unsure' || (Array.isArray(answers[key]) && answers[key].includes('unsure'))) unknowns.push(label(key, 'unsure'));
    }
    const discovery = (answers.environment === 'unsure' || systems.includes('unsure'))
      ? 'List your systems, who uses them and who looks after the information before choosing new tools.'
      : `${{cloud:'Review your cloud services',office:'Review the systems running in your office',hybrid:'Review the connections between your office systems and cloud tools'}[answers.environment]}. Check who has access, how other software can connect and how data can be recovered.`;
    const rollout = answers.size === 'small'
      ? 'Keep the trial easy for a small team to support. Agree who looks after it, how to get help and how to return to the old process.'
      : answers.size === 'large'
        ? 'Test with a small user group first. Assign business, IT and security owners before extending access.'
        : 'Start with one team and a named owner. Expand only after the results and support process have been reviewed.';
    return {answers,kind,title:pilot.title,reason:pilot.reason,measure:pilot.measure,shortlist:shortlist.slice(0,2),checks,unknowns,
      phases:[{title:'Check your current setup',text:discovery},{title:kind === 'discovery' ? 'Choose the first improvement' : kind === 'foundation' ? 'Check what needs fixing' : 'Try one process',text:pilot.work},{title:'Review the results before expanding',text:rollout}]};
  }
  function report(plan) {
    const summary = Object.keys(fields).map(k => `${fields[k].label}\n${label(k,plan.answers[k])}`).join('\n\n');
    return `AUTONOA LABS — YOUR STARTING PLAN\nBased only on the answers you selected; live systems have not been inspected.\n\n${plan.title}\n${plan.reason}\n\nYOUR ANSWERS\n${summary}\n\nNEXT STEPS\n${plan.phases.map((p,i)=>`${i+1}. ${p.title}\n${p.text}`).join('\n\n')}\n\nHOW TO CHECK THE RESULT\n${plan.measure}\n\nCHECK BEFORE BUILDING\n${plan.checks.map(t=>'• '+t).join('\n')}\n\nSYSTEM EXAMPLES TO REVIEW\n${plan.shortlist.length ? plan.shortlist.map(s=>s.title+'\n'+s.why).join('\n\n') : 'Select a use case after the systems and process review.'}\n\nOur team needs to review your systems to confirm the final design, work involved and cost.\nContact: contact@autonoalabs.com\n`;
  }
  const api = {fields,steps,clean,label,missing,evaluate,report};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AutonoaAssessment = api;
})(typeof window !== 'undefined' ? window : globalThis);
