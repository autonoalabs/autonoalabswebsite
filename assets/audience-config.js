(function(root){
  'use strict';
  const profiles={
    all:{label:'Explore everything',examples:[0,4,8,12,16,20]},
    small:{label:'Small business',examples:[11,15,7],
      heroTitle:'Less chasing. More time for your business.',heroDescription:'Keep customer details, follow-ups and daily tasks connected. We help you improve one process using the tools you already have. Add AI only when it helps.',primary:'Find my starting point',secondary:'See how we help',
      architectureTitle:'Make one part of the day easier.',architectureLead:'You do not need to choose technology first. Tell us where work gets stuck, and we will help you find a practical starting point.',
      stacksTitle:'Everyday work. Practical improvements.',stacksLead:'Start with a task you recognise. Open an example to see how it works and which tools can help.',
      assessmentTitle:'What would make your working day easier?',assessmentLead:'Answer a few questions about your work and the tools you use. Get a starting plan. You do not need to know which technology to choose.',
      closingTitle:'Start with one useful improvement.',closingLead:'Tell us about a task that slows your business down. We will help you check what can be improved using the tools you have.',closingButton:'Talk about your business',
      nav:['How we help','Examples','Quick assessment','Our approach','Start here'],
      examplesCopy:{11:['Keep requests and follow-ups moving','Connect incoming requests, team approvals and follow-ups so fewer tasks need manual chasing.'],15:['Get your business numbers in one place','Bring sales and daily operations into clear reports your team can understand.'],7:['Sell and manage orders online','Bring products, orders and payments together in a manageable online store.']},
      steps:['Your business','Your tools','Daily work','Your data'],stepDescriptions:['What would you like to make easier?','Which tools do you use today?','Choose one task to start with.','How should we look after your data?']},
    growing:{label:'Growing business',examples:[0,1,8,10,12,11],
      heroTitle:'Connect your tools. Keep work moving.',heroDescription:'As your team grows, gaps between tools create extra work. We connect your IT, AI and workflows like the chassis, engine and transmission of a car. Your teams share information, follow clear steps and keep important decisions in their hands.',primary:'Find my starting point',secondary:'Explore the three parts',
      architectureTitle:'Three parts that help your team work together.',architectureLead:'IT supports your apps and data. AI helps people use information. Automation moves work between teams. Follow one supplier invoice to see how the parts connect.',
      stacksTitle:'Tools for the next stage of your business.',stacksLead:'See examples for business apps, customer records, accounts, reports and approvals. Open the system design when you want more detail.',
      assessmentTitle:'Where does work slow down as you grow?',assessmentLead:'Tell us which tools you use and where your team spends extra time. Get a starting plan for one useful improvement.',
      closingTitle:'Make your next step a practical one.',closingLead:'Tell us where work gets delayed between teams or tools. We will review the process with you and agree what to improve first.',closingButton:'Discuss your business needs',
      nav:['How it works','Solutions','Quick assessment','Our approach','Find my starting point'],
      steps:['Your goal','Your tools','Daily work','Your data'],stepDescriptions:['What would you like to improve first?','Tell us which systems you use.','Choose a task and who should approve it.','Tell us how your data should be handled.']},
    enterprise:{label:'Enterprise',examples:[3,6,8,14,17,20],
      heroTitle:'Connected systems. Clear control.',heroDescription:'Keep the systems your business relies on. Connect your IT foundation, AI tools and workflows around them, like the three parts of the car. Define who can access data, who approves changes and how your team handles problems.',primary:'Find my starting point',secondary:'Explore the three parts',
      architectureTitle:'Connect the parts. Keep responsibilities clear.',architectureLead:'The chassis, engine and transmission explain three roles: reliable IT, AI support and connected workflows. See how they handle the same invoice, with clear access and approval checks.',
      stacksTitle:'Technology choices for connected business systems.',stacksLead:'Review examples for existing business software, cloud systems, data, AI and approvals. Check the details against your own support, security and data requirements.',
      assessmentTitle:'Plan your IT and AI review.',assessmentLead:'Tell us what needs to improve, which systems are involved and how your data must be handled. Use the starting plan to prepare a discussion with your business and IT teams.',
      closingTitle:'Agree the first step before building.',closingLead:'Review the systems, connections, approvals and support responsibilities with your team. Use that discussion to agree a clear scope and delivery plan.',closingButton:'Discuss your system needs',
      nav:['How it works','System examples','Quick assessment','Our approach','Find my starting point'],
      steps:['Business goal','Existing systems','Tasks & approvals','Data requirements'],stepDescriptions:['What business result do you need?','Which systems are already in place?','Which task needs to move, and who approves it?','Where must data stay, and who may access it?']}
  };
  const safe=value=>Object.hasOwn(profiles,value)?value:'all';
  const api={profiles,safe};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AutonoaAudienceConfig=api;
})(typeof window!=='undefined'?window:globalThis);
