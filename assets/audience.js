(() => {
  'use strict';
  const {profiles,safe}=window.AutonoaAudienceConfig;
  const picker=document.querySelector('#business-view');
  if(!picker)return;
  const choices=picker.querySelector('.audience-options');
  const current=picker.querySelector('.audience-current');
  const status=picker.querySelector('#audience-status');
  const mappings={heroTitle:'.hero h1',heroDescription:'.hero-copy>p',architectureTitle:'#architecture h2',architectureLead:'#architecture .lead',stacksTitle:'#stack-library-title',stacksLead:'.stack-library-heading .lead',assessmentTitle:'#assessment-title',assessmentLead:'.assessment-intro .lead',closingTitle:'.closing h2',closingLead:'.closing>p'};
  const originals=new Map();
  const remember=node=>{if(node&&!originals.has(node))originals.set(node,node.innerHTML);return node;};
  Object.values(mappings).forEach(s=>remember(document.querySelector(s)));
  const primary=remember(document.querySelector('.hero-actions a:first-child'));
  const secondary=remember(document.querySelector('.hero-actions a:last-child'));
  const closing=remember(document.querySelector('.closing>.btn'));
  const nav=[...document.querySelectorAll('.nav a')].map(remember);
  const pills=[...document.querySelectorAll('.triad-pill span')].map(remember);
  const footerLinks=[...document.querySelectorAll('.footer-cols>div:not(:first-child) a')].map(remember);
  const hero=document.querySelector('.hero');
  const stackEyebrow=remember(document.querySelector('.stack-library>.eyebrow'));
  const architecture=document.querySelector('#architecture');
  const technicalToggle=architecture.querySelector('[data-audience-technical]');
  function apply(value,{writeURL=true,announce=true,collapse=true}={}) {
    const key=safe(value), profile=profiles[key];
    originals.forEach((html,node)=>node.innerHTML=html);
    document.body.dataset.audience=key;
    document.body.classList.remove('show-small-technical');
    technicalToggle.setAttribute('aria-expanded','false');
    technicalToggle.textContent='Show the technical detail +';
    if(key!=='all'){
      for(const [field,selector] of Object.entries(mappings))document.querySelector(selector).textContent=profile[field];
      primary.textContent=profile.primary+' →';secondary.textContent=profile.secondary+' →';closing.textContent=profile.closingButton+' →';
      nav.forEach((a,i)=>a.textContent=profile.nav[i]);
      if(key==='small'){
        stackEyebrow.textContent='PRACTICAL BUSINESS IDEAS // START WITH A DAILY NEED';
        ['<b>YOUR TOOLS</b>Connect what you already use.','<b>YOUR KNOWLEDGE</b>Find useful answers with AI.','<b>YOUR DAILY WORK</b>Make repeat tasks easier.'].forEach((t,i)=>pills[i].innerHTML=t);
        ['Tools your team can rely on','AI help with your documents','Tasks with team approval','Keep people in control','Connect your daily tools','Make reporting clearer','Follow up on requests','Find your starting point','Protect access to your tools','Plan backup and recovery','Check sensitive-data handling','Report a security issue'].forEach((t,i)=>{if(footerLinks[i])footerLinks[i].textContent=t;});
      }
    }
    choices.querySelectorAll('[data-audience-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.audienceChoice===key)));
    current.querySelector('strong').textContent=profile.label;
    current.hidden=!collapse;choices.hidden=collapse;picker.classList.toggle('is-collapsed',collapse);
    window.AutonoaAudience={current:key,profile};
    if(writeURL){try{const url=new URL(location.href);if(key==='all')url.searchParams.delete('view');else url.searchParams.set('view',key);history.replaceState(null,'',url);}catch{/* file previews may restrict URL changes */}}
    document.dispatchEvent(new CustomEvent('autonoa:audience-change',{detail:{key,profile}}));
    if(announce)status.textContent=`${profile.label} view selected. The page examples and wording have been updated. Change your view anytime.`;
  }
  picker.addEventListener('click',event=>{
    const button=event.target.closest('[data-audience-choice]');
    if(button){apply(button.dataset.audienceChoice);const heading=hero.querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});}
    if(event.target.closest('[data-audience-change]')){current.hidden=true;choices.hidden=false;picker.classList.remove('is-collapsed');picker.querySelector('h2').focus();}
  });
  technicalToggle.addEventListener('click',()=>{
    const open=document.body.classList.toggle('show-small-technical');technicalToggle.setAttribute('aria-expanded',String(open));technicalToggle.textContent=open?'Hide the technical detail −':'Show the technical detail +';
  });
  const init=new URL(location.href).searchParams.get('view');
  apply(init||'all',{writeURL:false,announce:false,collapse:!!init&&Object.hasOwn(profiles,init)});
  picker.hidden=false;
  window.addEventListener('popstate',()=>apply(new URL(location.href).searchParams.get('view')||'all',{writeURL:false}));
})();
