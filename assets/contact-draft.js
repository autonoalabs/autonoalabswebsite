(function(root){
  'use strict';
  const services={automation:'Workflow automation',integration:'Business systems integration',ai:'AI document assistants',martech:'MarTech services','not-sure':'Help choosing a starting point'};
  function prepare(input){
    const service=Object.hasOwn(services,input.service)?input.service:'not-sure';
    const name=String(input.name||'').trim().slice(0,80);
    const email=String(input.email||'').trim().slice(0,254);
    const company=String(input.company||'').trim().slice(0,120);
    const message=String(input.message||'').trim().slice(0,1500);
    const subject=`Website enquiry: ${services[service]}`;
    const body=`Hello Autonoa Labs,\n\nI would like to discuss ${services[service].toLowerCase()}.\n\nName: ${name}\nReply email: ${email}\nCompany: ${company||'Not provided'}\n\nWhat I would like to improve:\n${message}\n`;
    return {subject,body,href:`mailto:contact@autonoalabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
  }
  if(typeof module!=='undefined'&&module.exports){module.exports={prepare,services};return;}
  const form=document.querySelector('#enquiry-form');
  if(!form)return;
  const draft=document.querySelector('#email-draft');
  const preview=document.querySelector('#draft-preview');
  const status=document.querySelector('#draft-status');
  const params=new URL(location.href).searchParams;
  const service=params.get('service');
  if(Object.hasOwn(services,service))form.elements.service.value=service;
  const topic=params.get('topic');
  if(topic)form.elements.message.value=`Please help me review the ${topic.slice(0,120)} example for our business.\n\nOur current tools:\nOur main requirement:\n`;
  form.addEventListener('submit',event=>{
    event.preventDefault();
    form.elements.name.setCustomValidity(form.elements.name.value.trim()?'':'Enter your name.');
    form.elements.message.setCustomValidity(form.elements.message.value.trim().length>=20?'':'Describe what you want to improve using at least 20 characters.');
    if(!form.reportValidity())return;
    const result=prepare(Object.fromEntries(new FormData(form)));
    preview.value=result.body;
    document.querySelector('#open-email-draft').href=result.href;
    document.querySelector('#draft-subject').textContent=result.subject;
    draft.hidden=false;
    status.textContent='Draft prepared. Open your email app, review the message and send it. Nothing has been sent yet.';
    document.querySelector('#draft-title').focus({preventScroll:false});
  });
  for(const key of ['name','message'])form.elements[key].addEventListener('input',()=>form.elements[key].setCustomValidity(''));
  const invalidateDraft=event=>{if(event.target.name){draft.hidden=true;status.textContent='';}};
  form.addEventListener('input',invalidateDraft);
  form.addEventListener('change',invalidateDraft);
  document.querySelector('#copy-enquiry').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(preview.value);status.textContent='Email text copied. Paste it into an email to contact@autonoalabs.com.';}
    catch{preview.focus();preview.select();status.textContent='Select and copy the draft below, then paste it into your email app.';}
  });
  form.hidden=false;
})(typeof window!=='undefined'?window:globalThis);
