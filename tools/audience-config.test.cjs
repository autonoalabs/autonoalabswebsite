const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {profiles,safe}=require('../assets/audience-config.js');
const catalog=JSON.parse(fs.readFileSync('assets/stack-catalog.json','utf8'));
test('only explicit supported views are accepted',()=>{
  for(const key of ['small','growing','enterprise','all'])assert.equal(safe(key),key);
  for(const key of [undefined,null,'__proto__','constructor','unknown','<script>'])assert.equal(safe(key),'all');
});
test('each suggested example points to a real architecture',()=>{
  for(const p of Object.values(profiles)){
    assert.equal(p.examples.length,new Set(p.examples).size);
    for(const i of p.examples)assert.ok(catalog[i],`${p.label}: ${i}`);
  }
  assert.equal(profiles.small.examples.length,3);
});
test('audience copy does not alter assessment answers or infer team size',()=>{
  for(const p of [profiles.small,profiles.growing,profiles.enterprise]){
    assert.equal(p.steps.length,4);assert.equal(p.stepDescriptions.length,4);
    assert.ok(!Object.hasOwn(p,'answers'));assert.ok(!Object.hasOwn(p,'size'));
  }
});
