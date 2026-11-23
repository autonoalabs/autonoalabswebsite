// Shared, static HTML: the explanation still works without JavaScript.
const examples = require('../assets/workflow-examples.json');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = {
  form:'M5 4h14v16H5z M8 8h8 M8 12h5 M8 16h3',
  contact:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-3a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v3',
  people:'M14 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM3 20v-2a6 6 0 0 1 12 0v2 M17 5a3 3 0 0 1 0 6 M18 14a5 5 0 0 1 3 5',
  chart:'M4 3v17h17 M8 16v-5 M13 16V7 M18 16v-8',
  file:'M14 3H5v18h14V8z M14 3v5h5 M8 12h8 M8 16h6',
  scan:'M8 3H3v5 M16 3h5v5 M21 16v5h-5 M8 21H3v-5 M7 8h10 M7 12h10 M7 16h6',
  shield:'m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z m-4 9 3 3 5-6',
  database:'M20 6c0 2-4 3-8 3S4 8 4 6s4-3 8-3 8 1 8 3ZM4 6v12c0 2 4 3 8 3s8-1 8-3V6 M4 12c0 2 4 3 8 3s8-1 8-3',
  chat:'M4 4h16v12H9l-5 4z M8 8h8 M8 12h5',
  search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
  cart:'M3 4h3l3 12h10l2-9H7 M11 20h.01 M18 20h.01',
  connect:'M8 8H6a4 4 0 0 0 0 8h4 M16 8h2a4 4 0 0 1 0 8h-4 M8 12h8'
};
const icon = key => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[key] || paths.connect}"/></svg>`;
function renderFlow(id, example, {compact = false} = {}) {
  return `<div class="workflow-demo${compact?' wf-compact':''}" data-workflow id="${id}">
    <div class="wf-toolbar"><span class="wf-example-label">${compact?'WATCH THE STEPS':'ILLUSTRATED WORKFLOW'}</span><div class="wf-controls" hidden><button type="button" data-flow-play aria-pressed="false">Pause animation</button><button type="button" data-flow-next>Next step</button></div></div>
    <ol class="wf-nodes" aria-label="${esc(example.title)}" style="--wf-count:${example.steps.length}">${example.steps.map((step,i)=>`<li class="wf-step" data-flow-step data-caption="${esc(step.caption)}"><div class="wf-node"><span class="wf-node-top"><span class="wf-icon">${icon(step.icon)}</span><span class="wf-kind">${esc(step.kind)}</span><span class="wf-state" aria-hidden="true"></span></span><strong>${esc(step.title)}</strong><span class="wf-detail">${esc(step.detail)}</span>${compact?'':`<span class="wf-sample">${icon(step.human?'people':step.icon)}<span>${esc(step.sample)}</span></span>`}</div><span class="wf-connector" aria-hidden="true"><i></i></span></li>`).join('')}</ol>
    <div class="wf-caption"><span class="wf-caption-icon">${icon('connect')}</span><p data-flow-caption>${esc(example.steps[0].caption)}</p></div>
    ${example.review?`<div class="wf-review">${icon('people')}<p><strong>People stay in control.</strong> ${esc(example.review)}</p></div>`:''}
    ${!compact?`<div class="wf-result">${icon('shield')}<p>${esc(example.result)}</p></div>`:''}
    <span class="wf-sr" data-flow-announcement role="status" aria-live="polite"></span>
  </div>`;
}
module.exports = {renderFlow, examples, esc, icon};
