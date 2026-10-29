(function(root){
  'use strict';
  const parts=[
    {id:'chassis',name:'The chassis',role:'Your IT foundation',number:'01',
      heading:'A reliable base for your apps and data.',
      analogy:'The chassis supports the car. Your IT foundation supports your business software, files and staff access. We help these parts work together, with backups and clear permissions.',
      image:'assets/car-components/chassis-v2.png',imageWidth:1536,imageHeight:1024,caption:'The chassis · the supporting frame',alt:'Standalone chassis frame with suspension and four wheels, illustrated in graphite and gold.',
      responsibilities:[['Keep your software running','Give your website, accounts software, customer records and staff tools a reliable place to run.'],['Connect information and access','Let the right people use the right apps and data, without copying everything by hand.'],['Plan for problems','Monitor important systems, back up business data and check that it can be restored.']],
      technologies:[['azure','Azure','Example app hosting'],['postgresql','PostgreSQL','Business records'],['keycloak','Keycloak','Application sign-in']],
      exampleTitle:'Keep the invoice and supplier details together.',
      example:'An invoice arrives. The accounts system stores it with the correct supplier record. Only authorised staff can open or change it, and the backup plan covers the record.',
      flow:[['Staff sign-in','Check who may access it'],['Accounts software','Receive the invoice'],['Invoice record','Store the file and details']],
      outcome:'Your team has a dependable place to work with business information.',
      review:'Start by checking who owns each system, who needs access and how you would recover lost data.'},
    {id:'engine',name:'The engine',role:'AI support for your team',number:'02',
      heading:'Help your team read, find and check information.',
      analogy:'The engine powers the car. AI helps your software do more with information: read a document, find an answer or prepare a summary. Your team checks important or uncertain results.',
      image:'assets/car-components/engine-v2.png',imageWidth:1536,imageHeight:1024,caption:'The engine · the power source',alt:'Standalone complete automotive engine illustration in graphite, brushed metal and restrained gold.',
      responsibilities:[['Read documents','Pick out details such as a supplier name, invoice number or amount from approved files.'],['Find useful answers','Search company documents and records that the person asking is allowed to see.'],['Prepare work for review','Summarise information or highlight differences, then send uncertain results to your team.']],
      technologies:[['python','Python','Read and process documents'],['ollama','Ollama','Run an AI model on your systems'],['postgresql','PostgreSQL','Store and search information']],
      exampleTitle:'Read the invoice and highlight differences.',
      example:'AI can help read the invoice details. Software then compares them with approved records. A missing number or a different amount goes to the accounts team to check.',
      flow:[['Approved invoice','Read the details'],['AI + record checks','Find missing or different details'],['Team review','Check uncertain results']],
      outcome:'Less time searching and reading, with important results checked by people.',
      review:'Test with real examples before use. Show where answers came from and keep the original access permissions.'},
    {id:'transmission',name:'The transmission',role:'Connected daily workflows',number:'03',
      heading:'Move routine work between your tools.',
      analogy:'The transmission passes power to the wheels. Automation passes information and tasks between your business tools. It follows agreed steps and asks for approval when needed.',
      image:'assets/car-components/transmission-v2.png',imageWidth:1536,imageHeight:1024,caption:'The transmission · power put to work',alt:'Standalone cutaway gearbox illustration showing the transmission gear train and shafts.',
      responsibilities:[['Connect your tools','Pass approved information between accounts, customer records, support and other software.'],['Follow your approval rules','Send each task to the right person. Wait for approval before important changes.'],['Keep track of the result','Record completed steps, flag failures and avoid creating the same action twice.']],
      technologies:[['n8n','n8n','Connect task steps'],['nodejs','Node.js','Connect business software'],['kafka','Apache Kafka','Share system updates at scale']],
      exampleTitle:'Update the accounts system after approval.',
      example:'After the right person approves, the workflow updates the accounts system and notifies the team. If the update fails, someone is asked to check it. Payment approval stays with the responsible team.',
      flow:[['Team approval','Confirm the action'],['Connected software','Update the right system'],['Result check','Record success or flag a problem']],
      outcome:'Less copying and chasing, with a clear record of what happened.',
      review:'Agree who approves each step, how failures are handled and how a wrong change can be corrected.'}
  ];
  if(typeof module!=='undefined'&&module.exports)module.exports=parts;else root.AutonoaCarParts=parts;
})(typeof window!=='undefined'?window:globalThis);
