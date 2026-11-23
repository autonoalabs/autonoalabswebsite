const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const a = require('../assets/assessment-engine.js');
const base = {goal:'automate',size:'small',environment:'hybrid',systems:['spreadsheets'],task:'requests',control:'approve',data:'internal',location:'flexible'};

test('required questions validate while team size stays optional',()=>{
  assert.deepEqual(a.missing({},0),['goal']);
  assert.deepEqual(a.missing({},1),['environment','systems']);
  assert.throws(()=>a.evaluate({}),/required questions/);
  assert.doesNotThrow(()=>a.evaluate({...base,size:undefined}));
});
test('unknown answers lead to discovery without a vendor recommendation',()=>{
  const p=a.evaluate({goal:'unsure',environment:'unsure',systems:['unsure'],task:'unsure',control:'unsure',data:'unsure',location:'unsure'});
  assert.equal(p.kind,'discovery');assert.equal(p.shortlist.length,0);assert.equal(p.unknowns.length,6);
});
test('sensitive data and bounded automation retain approval guidance',()=>{
  const p=a.evaluate({...base,task:'records',data:'sensitive',control:'bounded',location:'uae'});
  assert.equal(p.kind,'records');assert.ok(p.checks.some(x=>x.includes('human approval')));
  assert.ok(p.checks.some(x=>x.includes('low-risk')));assert.ok(p.checks.some(x=>x.includes('UAE')));
});
test('own-environment data boundary excludes managed AI from shortlist',()=>{
  const p=a.evaluate({...base,goal:'ai',task:'documents',systems:['microsoft'],location:'existing'});
  assert.deepEqual(p.shortlist.map(x=>x.title),['Private Document Assistant']);
  assert.ok(p.checks.some(x=>x.includes('model processing')));
});
test('Microsoft document scenario offers managed and self-hosted alternatives',()=>{
  const p=a.evaluate({...base,goal:'ai',task:'documents',systems:['microsoft'],location:'india'});
  assert.equal(p.shortlist[0].title,'Azure Document AI Assistant');assert.equal(p.shortlist.length,2);
});
test('reliability goal prioritises foundation; reports use a different plan',()=>{
  assert.equal(a.evaluate({...base,goal:'reliable'}).kind,'foundation');
  const p=a.evaluate({...base,goal:'reports',task:'reporting'});
  assert.equal(p.shortlist[0].title,'Practical Business Dashboards');assert.notEqual(p.title,a.evaluate(base).title);
});
test('unsupported vendor choices are removed and unknown tools are exclusive',()=>{
  const p=a.evaluate({...base,systems:['erp'],task:'records'});
  assert.ok(!p.shortlist.some(x=>x.title.includes('SAP')));
  assert.ok(!a.fields.systems.options.some(x=>x.value==='sap'));
  assert.deepEqual(a.clean({...base,systems:['sap','crm']}).systems,['crm']);
  assert.deepEqual(a.clean({...base,systems:['sap','unsure']}).systems,['unsure']);
  assert.equal(a.clean({...base,goal:'<script>'}).goal,undefined);
});
test('plan exports answers and every suggested card points to the library',()=>{
  const html=fs.readFileSync('index.html','utf8');
  for(const goal of a.fields.goal.options.map(o=>o.value)){
    const p=a.evaluate({...base,goal,task:'unsure',systems:['crm','oracle','microsoft'],size:'large'});
    assert.ok(a.report(p).includes('YOUR ANSWERS'));
    assert.ok(a.report(p).includes(a.label('location',p.answers.location)));
    for(const s of p.shortlist)assert.ok(html.includes(`id="stack-title-${s.index}">${s.title}</h3>`),s.title);
  }
});

test('a marketing goal with an undecided task leads to a customer-journey plan',()=>{
  const p=a.evaluate({...base,goal:'marketing',task:'unsure',systems:['crm','website']});
  assert.equal(p.kind,'marketing');
  assert.equal(p.shortlist[0].title,'Lead Capture and CRM Follow-up');
  assert.ok(p.shortlist.some(x=>x.title==='Marketing Measurement and Dashboards'));
  assert.ok(p.checks.some(x=>/unsubscribe/.test(x)));
  assert.ok(a.report(p).includes('Connect one enquiry'));
});

test('marketing task and campaign tools retain approval and location constraints',()=>{
  const p=a.evaluate({...base,goal:'automate',task:'marketing',systems:['marketing','crm'],data:'sensitive',location:'saudi'});
  assert.equal(p.kind,'marketing');
  assert.ok(p.shortlist.some(x=>x.title==='Campaign and Customer Journey Automation'));
  assert.ok(p.checks.some(x=>/human approval/.test(x)));
  assert.ok(p.checks.some(x=>/Saudi Arabia/.test(x)));
});

test('marketing reporting uses a marketing measurement example and valid catalogue links',()=>{
  const p=a.evaluate({...base,goal:'marketing',task:'reporting'});
  assert.equal(p.kind,'reporting');
  assert.equal(p.shortlist[0].index,25);
  const catalogue=JSON.parse(fs.readFileSync('assets/stack-catalog.json','utf8'));
  for(const s of p.shortlist) assert.equal(catalogue[s.index].title,s.title);
});

test('published catalogue exposes MarTech and excludes the unsupported service',()=>{
  const catalogue=JSON.parse(fs.readFileSync('assets/stack-catalog.json','utf8'));
  assert.equal(catalogue.filter(s=>s.category==='Marketing technology (MarTech)').length,4);
  assert.ok(!/\bsap\b|s\/4hana/i.test(JSON.stringify(catalogue)));
  assert.ok(!/\bsap\b|s\/4hana/i.test(fs.readFileSync('index.html','utf8')));
  for(const s of catalogue) for(const logo of s.logos) assert.ok(fs.existsSync(`assets/tech-logos/${logo}.svg`));
});
