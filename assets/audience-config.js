(function(root){
  'use strict';
  const profiles={
    all:{label:'Explore everything',examples:[0,4,8,12,16,20]},
    small:{label:'Small business',examples:[11,15,7],
      heroTitle:'Less admin. More time for your business.',heroDescription:'Connect the tools you already use, keep track of daily work and make repeat tasks easier. Start with one useful improvement and grow from there.',primary:'Find my starting point',secondary:'See business examples',
      architectureTitle:'Make one part of the day easier.',architectureLead:'You do not need to choose technology first. Tell us where work gets stuck, and we will help you find a practical starting point.',
      stacksTitle:'Everyday problems. Practical solutions.',stacksLead:'Start with a familiar business need. See the tools behind it whenever you want more detail.',
      assessmentTitle:'What would make your work easier?',assessmentLead:'A few simple questions about your business, daily work and data. Get a useful first step without choosing the technology yourself.',
      closingTitle:'Start with one useful improvement.',closingLead:'Tell us about a task that slows your business down. We will help you check what can be improved using the tools you have.',closingButton:'Talk about your business',
      nav:['How we help','Examples','Quick check','Our approach','Start here'],
      examplesCopy:{11:['Keep requests and follow-ups moving','Connect incoming requests, team approvals and follow-ups so fewer tasks need manual chasing.'],15:['Get your business numbers in one place','Bring sales and daily operations into clear reports your team can understand.'],7:['Sell and manage orders online','Bring products, orders and payments together in a manageable online store.']},
      steps:['Your business','Your tools','Daily work','Your data'],stepDescriptions:['What would you like to make easier?','Which tools do you use today?','Choose one task to start with.','How should we look after your data?']},
    growing:{label:'Growing business',examples:[0,1,8,10,12,11],
      heroTitle:'Connect your teams. Make room to grow.',heroDescription:'Bring business apps, data and workflows together. Reduce repeated handovers, improve reporting and build systems your team can support.',primary:'Plan the next step',secondary:'Explore connected systems',
      architectureTitle:'Connected systems for a growing team.',architectureLead:'Keep useful tools, connect the gaps and add automation with clear ownership. Start with one process and plan for the next stage.',
      stacksTitle:'Systems that grow with your business.',stacksLead:'Explore examples for connected apps, ERP, CRM, reporting and daily workflows. Compare the designs when you need the detail.',
      assessmentTitle:'Where are your next bottlenecks?',assessmentLead:'Tell us about your tools, handovers and data needs. Build a starting plan for the next stage of your business.',
      closingTitle:'Build your next stage on clearer systems.',closingLead:'Review the gaps between your teams and tools. Agree a focused improvement, then expand with the right support and controls.',closingButton:'Discuss your next stage',
      nav:['How it works','Connected systems','System check','Our approach','Plan your next step'],
      steps:['Your goal','Current setup','Daily work','Data & priorities'],stepDescriptions:['What needs to improve as you grow?','Map your existing tools and systems.','Choose the handover or task to improve.','Set the data and location requirements.']},
    enterprise:{label:'Enterprise',examples:[3,6,8,14,17,20],
      heroTitle:'Enterprise systems. Connected with control.',heroDescription:'Integrate existing platforms, private AI and governed workflows around your architecture. Plan for identity, data boundaries, recovery and operational ownership.',primary:'Scope an architecture review',secondary:'Explore reference architectures',
      architectureTitle:'Design the connections. Define the controls.',architectureLead:'Align infrastructure, AI and workflow execution with existing platforms and operating standards. Make access, ownership and review points explicit.',
      stacksTitle:'Architecture patterns for complex environments.',stacksLead:'Review reference designs for hybrid platforms, ERP integration, event processing, AI and controlled delivery. Adapt them to workload and regional requirements.',
      assessmentTitle:'Scope your IT and AI review.',assessmentLead:'Capture the business goal, existing estate, workflow controls and data constraints. Use the starting plan to prepare a focused architecture discussion.',
      closingTitle:'Bring the right questions to the architecture review.',closingLead:'Agree workload boundaries, integration routes and operating responsibilities before committing to a delivery plan.',closingButton:'Discuss an architecture review',
      nav:['Architecture','Reference stacks','Initial review','Our approach','Scope a review'],
      steps:['Business goal','Current estate','Workflow controls','Data boundaries'],stepDescriptions:['Define the business outcome.','Identify existing systems and hosting.','Select the process and approval model.','Capture the data and location constraints.']}
  };
  const safe=value=>Object.hasOwn(profiles,value)?value:'all';
  const api={profiles,safe};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.AutonoaAudienceConfig=api;
})(typeof window!=='undefined'?window:globalThis);
