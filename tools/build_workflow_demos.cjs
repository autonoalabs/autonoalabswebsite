// Run after the service-page generator. No dependencies or build step on hosting.
const fs=require('node:fs');
const path=require('node:path');
const {renderFlow,examples,esc}=require('./workflow_markup.cjs');
const root=path.resolve(__dirname,'..');
process.chdir(root);
require('./build_car_parts.cjs');
const version='20261123-workflows1';
function assets(html){
  if(!html.includes('href="assets/workflow-demos.css')) html=html.replace('</head>',`<link rel="stylesheet" href="assets/workflow-demos.css?v=${version}">\n</head>`);
  if(!html.includes('src="assets/workflow-demos.js')) html=html.replace('</body>',`<script src="assets/workflow-demos.js?v=${version}" defer></script>\n</body>`);
  return html;
}
const tabs=examples.map((e,i)=>`<button type="button" role="tab" id="workflow-tab-${e.id}" aria-controls="workflow-panel-${e.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${esc(e.tab)}</button>`).join('');
const panels=examples.map(e=>`<div class="workflow-panel" id="workflow-panel-${e.id}" role="tabpanel" aria-labelledby="workflow-tab-${e.id}" tabindex="0"><div class="wf-panel-heading"><div><h3>${esc(e.title)}</h3><p>${esc(e.intro)}</p></div><a href="contact.html?service=${e.service}">Discuss this workflow</a></div>${renderFlow('demo-'+e.id,e)}<div class="wf-tool-examples">Example tools, chosen around your needs:${e.logos.map(([key,name])=>`<span><img src="assets/tech-logos/${key}.svg" width="23" height="23" alt=""${['ollama','n8n','metabase'].includes(key)?' data-mono':''} loading="lazy">${esc(name)}</span>`).join('')}</div></div>`).join('');
const block=`<!-- workflow-showcase:start -->
<section class="section workflow-showcase" id="workflows" aria-labelledby="workflows-title"><div class="eyebrow">EVERYDAY WORK, CONNECTED</div><h2 id="workflows-title">See How the Work Moves.</h2><p class="lead">Choose a daily task. Watch the tools connect and see where your team stays in control.</p><div class="workflow-tabs" role="tablist" aria-label="Choose a business workflow" data-workflow-tabs hidden>${tabs}</div>${panels}<p class="wf-disclaimer">Illustrated examples. No live systems are connected. We choose the final steps and tools around your business.</p></section>
<!-- workflow-showcase:end -->`;
let home=fs.readFileSync(path.join(root,'index.html'),'utf8');
home=home.replace('<a class="btn" href="#architecture">Explore the Three Parts <b>→</b></a>','<a class="btn" href="#workflows">See Work in Action</a>');
home=home.replace(/assets\/audience-config\.js\?v=[^\"]+/,`assets/audience-config.js?v=${version}`);
const smallBusiness={title:'Following up on an enquiry',steps:[
  {title:'An enquiry comes in',detail:'Keep the details together',kind:'',icon:'form',caption:'Keep the request and customer details in one place.'},
  {title:'Your team checks it',detail:'Decide the next step',kind:'',icon:'people',caption:'The right person checks the request and agrees what happens next.'},
  {title:'Follow up',detail:'Connect the task and reminder',kind:'',icon:'connect',caption:'Assign the follow-up and record the response.'}
]};
home=home.replace(/<div class="hero-business-visual[^\"]*">[\s\S]*?(?=<div class="triad-strip">)/,()=>`<div class="hero-business-visual workflow-martech">${renderFlow('small-business-workflow',smallBusiness,{compact:true})}</div>`);
if(home.includes('<!-- workflow-showcase:start -->'))home=home.replace(/<!-- workflow-showcase:start -->[\s\S]*?<!-- workflow-showcase:end -->/,()=>block);
else home=home.replace('    <section class="section martech-section"',block+'\n    <section class="section martech-section"');
// The dedicated MarTech area uses a compact vertical journey rather than long paragraphs.
const martech=`<aside class="martech-example workflow-martech" aria-labelledby="martech-example-title"><div class="eyebrow">FROM ENQUIRY TO FOLLOW-UP</div><h3 id="martech-example-title">One Customer Journey.<br>Connected at Every Step.</h3>${renderFlow('martech-workflow',examples[0],{compact:true})}<p class="wf-disclaimer">Illustrated example. Your team chooses the tools, messages and approval steps.</p></aside>`;
home=home.replace(/<aside class="martech-example[^\"]*"[\s\S]*?<\/aside>/,()=>martech);
home=home.replace(/<p class="martech-intro">[\s\S]*?<\/p>/,'<p class="martech-intro"><strong>MarTech is the technology behind your marketing.</strong> Connect your website, customer records and campaigns so every enquiry has a clear next step.</p>');
home=home.replace(/(<ul class="martech-capabilities"[\s\S]*?<\/ul>)/,match=>match.replace(/<p>[\s\S]*?<\/p>/g,''));
fs.writeFileSync(path.join(root,'index.html'),assets(home).replace(/^[ \t]+$/gm,''));
const mapping={'workflow-automation.html':'invoice','business-systems-integration.html':'systems','ai-document-assistants.html':'documents','martech-services.html':'enquiry'};
for(const [file,id]of Object.entries(mapping)){
  let html=fs.readFileSync(path.join(root,file),'utf8');
  const e=examples.find(e=>e.id===id);
  const flow=`<!-- service-workflow:start -->${renderFlow('service-'+id,e)}<p class="wf-disclaimer">Illustration only. No live systems are connected.</p><!-- service-workflow:end -->`;
  if(html.includes('<!-- service-workflow:start -->'))html=html.replace(/<!-- service-workflow:start -->[\s\S]*?<!-- service-workflow:end -->/,()=>flow);
  else html=html.replace(/<p class="example-intro">[\s\S]*?<\/ol>/,()=>flow);
  fs.writeFileSync(path.join(root,file),assets(html));
}
console.log('Built four switchable business workflows, the MarTech journey and four service-page animations.');
