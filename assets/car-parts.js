(() => {
  'use strict';
  const section=document.querySelector('#architecture');
  if(!section)return;
  const list=section.querySelector('.parts-tabs');
  const tabs=[...list.querySelectorAll('[role=tab]')];
  const panels=[...section.querySelectorAll('.part-panel')];
  function select(index,focus=false){
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});
    if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(index));
    tab.addEventListener('keydown',event=>{
      let target;
      if(event.key==='ArrowRight')target=(index+1)%tabs.length;
      if(event.key==='ArrowLeft')target=(index+tabs.length-1)%tabs.length;
      if(event.key==='Home')target=0;
      if(event.key==='End')target=tabs.length-1;
      if(target!==undefined){event.preventDefault();select(target,true);}
    });
  });
  list.hidden=false;select(0);
})();
