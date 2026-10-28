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
test('generic ERP does not imply SAP and unknown tools are exclusive',()=>{
  const p=a.evaluate({...base,systems:['erp'],task:'records'});
  assert.ok(!p.shortlist.some(x=>x.title.includes('SAP')));
  assert.deepEqual(a.clean({...base,systems:['sap','unsure']}).systems,['unsure']);
  assert.equal(a.clean({...base,goal:'<script>'}).goal,undefined);
});
test('plan exports answers and every suggested card points to the library',()=>{
  const html=fs.readFileSync('index.html','utf8');
  for(const goal of ['automate','connect','ai','reports','reliable','unsure']){
    const p=a.evaluate({...base,goal,task:'unsure',systems:['sap','oracle','microsoft'],size:'large'});
    assert.ok(a.report(p).includes('YOUR ANSWERS'));
    assert.ok(a.report(p).includes(a.label('location',p.answers.location)));
    for(const s of p.shortlist)assert.ok(html.includes(`id="stack-title-${s.index}">${s.title}</h3>`),s.title);
  }
});
