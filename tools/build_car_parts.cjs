// Regenerate only the architecture explorer. Run from the website root.
const fs=require('node:fs');
const parts=require('../assets/car-parts-data.js');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tabs=parts.map((p,i)=>`<button type="button" class="tab part-tab" role="tab" id="part-tab-${p.id}" aria-controls="part-panel-${p.id}" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-car-part="${p.id}"><span class="part-tab-number">${p.number}</span><span><strong>${esc(p.name)}</strong><small>${esc(p.role)}</small></span></button>`).join('');
const panels=parts.map((p,i)=>`<article class="part-panel" id="part-panel-${p.id}" role="tabpanel" aria-labelledby="part-tab-${p.id}" tabindex="0">
  <div class="part-visual-column"><figure class="part-figure"><img class="part-reference" src="${p.image}" width="${p.imageWidth}" height="${p.imageHeight}" alt="${esc(p.alt)}" loading="lazy" decoding="async"><figcaption>${esc(p.caption)}</figcaption></figure>
  <div class="part-example"><span class="part-overline">EXAMPLE / A SUPPLIER INVOICE</span><h4>${esc(p.exampleTitle)}</h4><p>${esc(p.example)}</p></div></div>
  <div class="part-software-column"><div class="part-panel-label"><span class="part-overline">${p.number} / ${esc(p.name)} → ${esc(p.role)}</span><span class="part-position">${i+1} of 3</span></div><h3>${esc(p.heading)}</h3><p class="part-analogy">${esc(p.analogy)}</p>
  <div class="part-responsibilities"><h4>What this means for your business</h4><ul>${p.responsibilities.map(([t,d])=>`<li><span class="part-tick" aria-hidden="true">✓</span><div><strong>${esc(t)}</strong><p>${esc(d)}</p></div></li>`).join('')}</ul></div>
  <div class="part-flow"><span class="part-overline">HOW THE STEPS CONNECT</span><ol aria-label="${esc(p.name)} software flow">${p.flow.map(([t,d])=>`<li><strong>${esc(t)}</strong><span>${esc(d)}</span></li>`).join('')}</ol></div></div>
  <div class="part-products"><div class="part-products-intro"><span class="part-overline">EXAMPLE TOOLS</span><p>These tools show one possible setup. We choose around your needs, budget and existing systems.</p></div><div class="part-product-list" role="list" aria-label="Software examples for ${esc(p.name)}">${p.technologies.map(([key,name,role])=>`<span class="part-product" role="listitem"><span class="part-product-icon${['ollama','keycloak','kafka'].includes(key)?' monochrome-logo':''}"><img src="assets/tech-logos/${key}.svg" alt="" width="40" height="40" loading="lazy"></span><span><strong>${esc(name)}</strong><small>${esc(role)}</small></span></span>`).join('')}</div></div>
  <div class="part-outcome"><div><span class="part-overline">THE BUSINESS BENEFIT</span><strong>${esc(p.outcome)}</strong></div><p>${esc(p.review)}</p></div>
</article>`).join('');
let page=fs.readFileSync('index.html','utf8');
const tabsId=page.indexOf('id="architecture-technical-tabs"');
const start=tabsId<0?-1:page.lastIndexOf('<div',tabsId);
const tabEnd=page.indexOf('</div></div></div>',start);
if(start<0||tabEnd<0)throw Error('Architecture tabs not found');
page=page.slice(0,start)+`<div class="tabs parts-tabs" id="architecture-technical-tabs" role="tablist" aria-label="Explore car parts and their software roles" hidden>${tabs}`+page.slice(tabEnd);
const layerStart=page.indexOf('<div class="layer',start);
const sectionEnd=page.indexOf('</section>',layerStart);
if(layerStart<0||sectionEnd<0)throw Error('Architecture section not found');
page=page.slice(0,layerStart)+`<div class="layer parts-explorer" id="architecture-technical-layer">${panels}<div class="part-human"><span aria-hidden="true">✓</span><p><strong>Your team stays in control.</strong> You decide who can see information and who approves important actions. Start with reliable tools and clear steps. Add AI where it helps, and send problems to the right person.</p><a href="#diagnostic">Find your starting point →</a></div></div>`+page.slice(sectionEnd);
const scriptStart=page.indexOf('    const layers=[');
const scriptEnd=page.indexOf('    const hamb=',scriptStart);
if(scriptStart>=0&&scriptEnd>=0)page=page.slice(0,scriptStart)+page.slice(scriptEnd);
if(!page.includes('assets/car-parts.css'))page=page.replace('</head>','  <link rel="stylesheet" href="assets/car-parts.css">\n</head>');
if(!page.includes('assets/car-parts.js'))page=page.replace('<script src="assets/audience.js" defer></script>','<script src="assets/car-parts-data.js" defer></script>\n  <script src="assets/car-parts.js" defer></script>\n  <script src="assets/audience.js" defer></script>');
page=page.replace(/Three Connected Parts\.<br>One Team to Work With\.|Three Car Parts\.<br>One Connected Software System\./,'Three Parts.<br>One Connected System.');
page=page.replace('AI works best when it fits your IT systems and your way of working. We connect the tools, add clear checks, and keep people in control.','Explore the chassis, engine and transmission to see how applications, AI and workflows fit together. Follow the same invoice example through each part.');
fs.writeFileSync('index.html',page);
console.log('Built three car-part panels with standalone component illustrations.');
