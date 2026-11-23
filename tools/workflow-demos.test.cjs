const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {renderFlow,examples}=require('./workflow_markup.cjs');

// A small browser harness exercises playback decisions without real waiting.
function harness(reduced=false){
  class Element {
    constructor(){this.listeners={};this.attrs={};this.dataset={};this.textContent='';this.classes=new Set();this.classList={add:x=>this.classes.add(x),toggle:(x,on)=>on?this.classes.add(x):this.classes.delete(x)};}
    addEventListener(name,fn){this.listeners[name]=fn;}
    dispatchEvent(event){this.listeners[event.type]?.(event);}
    setAttribute(k,v){this.attrs[k]=v;}
    removeAttribute(k){delete this.attrs[k];}
    click(){this.listeners.click?.();}
  }
  const steps=examples[1].steps.map(s=>{const e=new Element();e.dataset.caption=s.caption;return e;});
  const play=new Element(),next=new Element(),caption=new Element(),announcement=new Element(),controls=new Element(),root=new Element();
  root.querySelectorAll=()=>steps;
  root.querySelector=s=>({'[data-flow-play]':play,'[data-flow-next]':next,'[data-flow-caption]':caption,'[data-flow-announcement]':announcement,'.wf-controls':controls})[s];
  root.closest=()=>root.ancestorHidden?{}:null;
  root.getClientRects=()=>root.ancestorHidden?[]:[{}];
  const document=new Element();document.body=new Element();document.hidden=false;
  document.querySelectorAll=s=>s==='[data-workflow]'?[root]:[];
  const motion={matches:reduced,addEventListener:(type,fn)=>{motion.changed=fn;}};
  const timers=new Map();let id=0,intersect,mutated;
  const context={document,window:{matchMedia:()=>motion},CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},
    IntersectionObserver:class{constructor(fn){intersect=fn;}observe(){}},
    MutationObserver:class{constructor(fn){mutated=fn;}observe(){}},
    setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:key=>timers.delete(key)};
  // The same capability check used by browsers.
  context.window.IntersectionObserver=context.IntersectionObserver;
  vm.runInNewContext(fs.readFileSync('assets/workflow-demos.js','utf8'),context);
  return {steps,play,next,caption,announcement,root,document,motion,timers,
    visible:value=>intersect([{target:root,isIntersecting:value}]),
    mutation:()=>mutated(),tick:()=>{const [key,fn]=timers.entries().next().value;timers.delete(key);fn();}};
}
test('visible playback advances; manual steps pause, announce and restart correctly',()=>{
  const h=harness();assert.equal(h.timers.size,0);
  h.visible(true);assert.equal(h.timers.size,1);h.tick();
  assert.equal(h.steps[1].attrs['aria-current'],'step');
  h.next.click();assert.equal(h.timers.size,0);
  assert.equal(h.caption.textContent,examples[1].steps[2].caption);
  assert.match(h.announcement.textContent,/Step 3 of 4/);
  assert.equal(h.play.attrs['aria-pressed'],'false');
  h.next.click();assert.equal(h.next.textContent,'Start again');
  h.next.click();assert.equal(h.steps[0].attrs['aria-current'],'step');
  h.play.click();assert.equal(h.timers.size,1);
});
test('offscreen flows, hidden panels and background tabs do not keep timers running',()=>{
  const h=harness();h.visible(true);assert.equal(h.timers.size,1);
  h.visible(false);assert.equal(h.timers.size,0);
  h.visible(true);h.root.ancestorHidden=true;h.mutation();assert.equal(h.timers.size,0);
  h.root.ancestorHidden=false;h.mutation();assert.equal(h.timers.size,1);
  h.document.hidden=true;h.document.dispatchEvent({type:'visibilitychange'});assert.equal(h.timers.size,0);
  h.document.hidden=false;h.document.dispatchEvent({type:'visibilitychange'});assert.equal(h.timers.size,1);
});
test('reduced motion disables autoplay and retains manual explanation controls',()=>{
  const h=harness(true);h.visible(true);
  assert.equal(h.play.disabled,true);assert.equal(h.timers.size,0);
  h.next.click();assert.equal(h.caption.textContent,examples[1].steps[1].caption);
  assert.equal(h.timers.size,0);
  h.motion.matches=false;h.motion.changed();assert.equal(h.play.disabled,false);
  assert.equal(h.timers.size,0);h.play.click();assert.equal(h.timers.size,1);
  h.motion.matches=true;h.motion.changed();assert.equal(h.timers.size,0);
});
test('every example has complete static steps, real local logos and a relevant enquiry link',()=>{
  assert.equal(examples.length,4);
  for(const e of examples){
    assert.ok(['martech','automation','ai','integration'].includes(e.service));
    assert.equal(e.steps.length,4);
    for(const [logo]of e.logos)assert.ok(fs.existsSync(`assets/tech-logos/${logo}.svg`));
    const html=renderFlow('test-'+e.id,e);
    for(const step of e.steps)assert.ok(html.includes(step.title));
    assert.ok(html.includes('People stay in control.'));
    assert.ok(!html.includes('<iframe')&&!html.includes('fetch('));
  }
});
