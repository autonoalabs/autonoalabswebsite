const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const parts=require('../assets/car-parts-data.js');
test('component illustrations use three distinct full-size local PNGs',()=>{
  assert.equal(new Set(parts.map(p=>p.image)).size,3);
  for(const p of parts){
    const image=fs.readFileSync(p.image);
    assert.equal(image.readUInt32BE(16),p.imageWidth);
    assert.equal(image.readUInt32BE(20),p.imageHeight);
    assert.ok(p.imageWidth>=1536&&p.imageHeight>=1024,p.id);
    assert.ok(!Object.hasOwn(p,'viewBox'),'Component artwork should not use crop coordinates');
    for(const [logo] of p.technologies)assert.ok(fs.existsSync(`assets/tech-logos/${logo}.svg`),logo);
  }
  const html=fs.readFileSync('index.html','utf8');
  assert.ok(!html.includes('<svg class="part-reference"'));
});
test('every tab controls a uniquely labelled panel and a complete software example',()=>{
  const html=fs.readFileSync('index.html','utf8');
  for(const p of parts){
    assert.equal(html.split(`id="part-tab-${p.id}"`).length-1,1);
    assert.equal(html.split(`id="part-panel-${p.id}"`).length-1,1);
    assert.ok(html.includes(`aria-controls="part-panel-${p.id}"`));
    assert.ok(html.includes(`aria-labelledby="part-tab-${p.id}"`));
    assert.ok(p.flow.length>=3&&p.example&&p.review);
  }
});
