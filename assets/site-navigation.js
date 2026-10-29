(() => {
  const button=document.querySelector('.hamb');
  const nav=document.querySelector('.topbar .nav');
  const compact=matchMedia('(max-width:1040px)');
  function close(){nav.removeAttribute('style');button.setAttribute('aria-expanded','false');button.setAttribute('aria-label','Open navigation');}
  button.addEventListener('click',()=>{
    if(button.getAttribute('aria-expanded')==='true'){close();return;}
    Object.assign(nav.style,{display:'flex',position:'fixed',top:document.querySelector('.topbar').offsetHeight+'px',left:'0',right:'0',flexDirection:'column',padding:'22px',gap:'18px',background:'#080f13',borderBottom:'1px solid #35454c'});
    button.setAttribute('aria-expanded','true');button.setAttribute('aria-label','Close navigation');
  });
  nav.addEventListener('click',event=>{if(compact.matches&&event.target.closest('a'))close();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){close();button.focus();}});
  compact.addEventListener('change',close);
})();
