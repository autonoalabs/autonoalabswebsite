(() => {
  'use strict';
  const section = document.querySelector('#diagnostic');
  const engine = window.AutonoaAssessment;
  if (!section || !engine) return;
  const form = section.querySelector('#needs-assessment');
  const workspace = section.querySelector('.assessment-workspace');
  const result = section.querySelector('#assessment-result');
  const question = section.querySelector('#assessment-questions');
  const navigation = section.querySelector('#assessment-navigation');
  const snapshot = section.querySelector('#assessment-snapshot');
  let answers = {}, active = 0, visited = 0, errors = [], plan;
  const audience = () => window.AutonoaAudience?.current || 'all';
  const audienceProfile = () => window.AutonoaAudience?.profile || {};
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const focusTitle = element => element.focus({preventScroll:false});
  function field(key) {
    const f = engine.fields[key];
    const selected = answers[key];
    const options = key === 'systems' && audience() === 'small'
      ? f.options.filter(o => ['microsoft','erp','crm','spreadsheets','custom','unsure'].includes(o.value) || (selected || []).includes(o.value))
      : f.options;
    const simpleToolLabels = {erp:'Accounts / business software',crm:'Customer / sales software',custom:'Software built for your business'};
    return `<fieldset class="assessment-field${errors.includes(key)?' has-error':''}" aria-describedby="${key}-hint${errors.includes(key)?' '+key+'-error':''}">
      <legend>${escape(f.label)}${f.optional?'<span class="assessment-optional">Optional</span>':''}</legend>
      <p id="${key}-hint" class="assessment-hint">${escape(f.hint)}</p>
      <div class="assessment-choices${key==='size'?' compact-choices':''}">${options.map(o => `<label class="assessment-choice"><input type="${f.multi?'checkbox':'radio'}" name="${key}" value="${o.value}" ${f.multi?(selected||[]).includes(o.value)?'checked':'':selected===o.value?'checked':''}><span><strong>${escape(key==='systems' && audience()==='small' ? simpleToolLabels[o.value] || o.label : o.label)}</strong>${o.detail?`<small>${escape(o.detail)}</small>`:''}</span><span class="choice-mark" aria-hidden="true"></span></label>`).join('')}</div>
      ${errors.includes(key)?`<p class="assessment-error" id="${key}-error">Choose an answer. “Not sure” is fine.</p>`:''}
    </fieldset>`;
  }
  function updateSnapshot() {
    const a = engine.clean(answers);
    const chosen = (key, fallback) => a[key] && (!Array.isArray(a[key]) || a[key].length) ? engine.label(key,a[key]) : fallback;
    snapshot.innerHTML = `<div><span>Your goal</span><strong>${escape(chosen('goal','Choose what matters most.'))}</strong></div><div><span>Current setup</span><strong>${escape(chosen('environment','Tell us what is in place.'))}</strong>${a.systems?.length?`<p>${escape(engine.label('systems',a.systems))}</p>`:''}</div><div><span>People & data</span><strong>${escape(chosen('control','Set the right level of control.'))}</strong><p>${escape(chosen('location','Data location to be confirmed.'))}</p></div>`;
  }
  function renderStep(focus = true) {
    form.hidden = false; workspace.hidden = false; result.hidden = true;
    const step = engine.steps[active];
    navigation.innerHTML = engine.steps.map((s,i)=>`<li><button type="button" data-assessment-step="${i}" ${i>visited?'disabled':''} ${i===active?'aria-current="step"':''}><span aria-hidden="true">${i<active?'✓':i+1}</span><b>${escape(audienceProfile().steps?.[i] || s.title)}</b></button></li>`).join('');
    section.querySelector('#assessment-progress').value=active+1;
    section.querySelector('#assessment-progress-label').textContent=`Step ${active+1} of ${engine.steps.length}`;
    question.innerHTML=`<header class="assessment-step-heading"><h3 tabindex="-1" id="assessment-step-title">${escape(audienceProfile().stepDescriptions?.[active] || step.description)}</h3><p>Choose the closest answer. You can go back and change it.</p></header>${errors.length?'<p class="assessment-error-summary" role="alert">Please answer the highlighted question before continuing.</p>':''}${step.fields.map(field).join('')}`;
    section.querySelector('#assessment-back').hidden = active===0;
    section.querySelector('#assessment-next').innerHTML = active===3?'Build my starting plan <span aria-hidden="true">→</span>':'Continue <span aria-hidden="true">→</span>';
    updateSnapshot();
    if (focus) focusTitle(question.querySelector('h3'));
  }
  function logoRow(pattern) {
    return `<div class="assessment-pattern-logos" aria-hidden="true">${pattern.logos.map(k=>`<span><img src="assets/tech-logos/${k}.svg" alt="" width="26" height="26" loading="lazy"></span>`).join('')}</div>`;
  }
  function updatePatternDisclosure() {
    const patterns = result.querySelector('.assessment-patterns');
    if (!patterns) return;
    const isSmall = audience() === 'small';
    if (isSmall && patterns.tagName !== 'DETAILS') {
      const details = document.createElement('details');details.className = 'assessment-patterns';
      const summary = document.createElement('summary');summary.textContent = 'Explore the tools behind this plan';details.append(summary);
      while (patterns.firstChild) details.append(patterns.firstChild);
      patterns.replaceWith(details);
    } else if (!isSmall && patterns.tagName === 'DETAILS') {
      patterns.querySelector('summary').remove();
      const div = document.createElement('div');div.className = 'assessment-patterns';
      while (patterns.firstChild) div.append(patterns.firstChild);
      patterns.replaceWith(div);
    }
  }
  function showResult() {
    plan = engine.evaluate(answers);
    workspace.hidden=true;
    result.hidden=false;
    const summary = Object.keys(engine.fields).map(k=>`<div><dt>${escape(engine.fields[k].label)}</dt><dd>${escape(engine.label(k,plan.answers[k]))}</dd></div>`).join('');
    const mailBody = `Hello Autonoa Labs,\n\nI completed your IT and AI starting-point assessment.\n\nSuggested starting point: ${plan.title}\n\n${['goal','environment','systems','task','control','data','location','size'].map(k=>engine.fields[k].label+' '+engine.label(k,plan.answers[k])).join('\n')}\n\nPlease help me review this starting plan. I can share the downloaded summary in a follow-up.\n`;
    result.innerHTML=`<header class="assessment-result-heading"><span class="assessment-kicker">YOUR STARTING PLAN</span><h3 tabindex="-1" id="assessment-plan-title">${escape(plan.title)}</h3><p>${escape(plan.reason)}</p><span class="assessment-scope">Based on your selections. A technical review is needed to confirm the design, effort and cost.</span></header>
      <div class="assessment-result-grid"><div class="assessment-roadmap"><h4>A practical way forward</h4><ol>${plan.phases.map((p,i)=>`<li><span aria-hidden="true">0${i+1}</span><div><h5>${escape(p.title)}</h5><p>${escape(p.text)}</p></div></li>`).join('')}</ol><div class="assessment-measure"><span>What to measure</span><p>${escape(plan.measure)}</p></div></div>
      <aside class="assessment-checks"><h4>Check before building</h4><ul>${plan.checks.map(c=>`<li>${escape(c)}</li>`).join('')}</ul>${plan.unknowns.length?`<p class="assessment-unknowns"><strong>${plan.unknowns.length} areas to clarify together</strong>It is fine to be unsure. We will confirm these choices during the review.</p>`:''}</aside></div>
      ${plan.shortlist.length?`<div class="assessment-patterns"><div class="assessment-patterns-heading"><h4>Example designs to review</h4><p>These are options to discuss, based on your answers.</p></div><div class="assessment-pattern-grid">${plan.shortlist.map(p=>`<article>${logoRow(p)}<h5>${escape(p.title)}</h5><p>${escape(p.why)}</p><a href="#stack-title-${p.index}" data-assessment-pattern="${escape(p.title)}">View the system flow <span aria-hidden="true">↗</span></a></article>`).join('')}</div></div>`:'<p class="assessment-discovery-note">We will shortlist technology options after you choose a process and confirm the system and data requirements.</p>'}
      <details class="assessment-answer-review"><summary>Review your answers</summary><dl>${summary}</dl></details>
      <div class="assessment-result-actions"><a class="btn primary" href="mailto:contact@autonoalabs.com?subject=${encodeURIComponent('Review my IT and AI starting plan')}&body=${encodeURIComponent(mailBody)}">Discuss this plan <span aria-hidden="true">→</span></a><button type="button" class="btn" data-assessment-download>Download plan (.txt)</button><button type="button" class="assessment-text-button" data-assessment-edit>Edit answers</button><button type="button" class="assessment-text-button" data-assessment-reset>Start again</button></div><p class="assessment-export-hint">“Discuss this plan” opens your email app with a draft. Your answers are shared only if you send it.</p><p class="assessment-export-status" role="status"></p>`;
    updatePatternDisclosure();
    focusTitle(result.querySelector('h3'));
  }
  form.addEventListener('change', event => {
    const input=event.target;
    if (!engine.fields[input.name]) return;
    if (input.type==='checkbox') {
      let selected = new Set(answers[input.name] || []);
      if(input.checked) {
        if(input.value==='unsure') selected=new Set(['unsure']);
        else {selected.delete('unsure');selected.add(input.value);}
      } else selected.delete(input.value);
      answers[input.name]=[...selected];
      form.querySelectorAll(`input[name="${input.name}"]`).forEach(i=>i.checked=selected.has(i.value));
    } else answers[input.name]=input.value;
    const group=input.closest('fieldset');
    group.classList.remove('has-error');
    group.querySelector('.assessment-error')?.remove();
    group.setAttribute('aria-describedby',input.name+'-hint');
    errors=errors.filter(k=>k!==input.name);
    if(!errors.length) form.querySelector('.assessment-error-summary')?.remove();
    updateSnapshot();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    errors=engine.missing(answers,active);
    if(errors.length){renderStep(false);question.querySelector(`input[name="${errors[0]}"]`).focus();return;}
    if(active<3){active++;visited=Math.max(visited,active);renderStep();}
    else {
      const incomplete=engine.steps.findIndex((_,i)=>engine.missing(answers,i).length);
      if(incomplete!==-1){active=incomplete;errors=engine.missing(answers,active);renderStep();return;}
      showResult();
    }
  });
  section.querySelector('#assessment-back').addEventListener('click',()=>{active=Math.max(0,active-1);errors=[];renderStep();});
  navigation.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&!b.disabled){active=Number(b.dataset.assessmentStep);errors=[];renderStep();}});
  result.addEventListener('click',event=>{
    const target=event.target;
    if(target.closest('[data-assessment-edit]')){active=0;errors=[];renderStep();}
    if(target.closest('[data-assessment-reset]')){answers={};active=0;visited=0;errors=[];plan=undefined;result.innerHTML='';renderStep();}
    if(target.closest('[data-assessment-download]')&&plan){
      const url=URL.createObjectURL(new Blob([engine.report(plan)],{type:'text/plain;charset=utf-8'}));
      const link=document.createElement('a');link.href=url;link.download='Autonoa-Labs-Starting-Plan.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      result.querySelector('.assessment-export-status').textContent='Your plan is ready to save as a text file.';
    }
    const pattern=target.closest('[data-assessment-pattern]');
    if(pattern){event.preventDefault();document.dispatchEvent(new CustomEvent('autonoa:show-stack',{detail:{title:pattern.dataset.assessmentPattern}}));}
  });
  document.addEventListener('autonoa:audience-change', () => {
    if (!result.hidden && plan) updatePatternDisclosure();
    else renderStep(false);
  });
  renderStep(false);
})();
