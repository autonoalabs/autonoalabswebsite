(() => {
  'use strict';
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controllers = [];
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.dispatchEvent(new CustomEvent('workflow:visibility', {detail:entry.isIntersecting}));
  }, {threshold:0.12}) : null;

  document.querySelectorAll('[data-workflow]').forEach(root => {
    const steps = [...root.querySelectorAll('[data-flow-step]')];
    const play = root.querySelector('[data-flow-play]');
    const next = root.querySelector('[data-flow-next]');
    const caption = root.querySelector('[data-flow-caption]');
    const announcement = root.querySelector('[data-flow-announcement]');
    let index = 0, paused = motion.matches, visible = !observer, timer = null;
    const clear = () => {if (timer !== null) {clearTimeout(timer); timer = null;}};
    const hidden = () => !!root.closest('[hidden]') || root.getClientRects().length === 0;
    function paint(announce = false) {
      steps.forEach((step,i) => {
        step.classList.toggle('is-current', i === index);
        step.classList.toggle('is-complete', i < index);
        if (i === index) step.setAttribute('aria-current','step'); else step.removeAttribute('aria-current');
      });
      caption.textContent = steps[index].dataset.caption;
      if (announce) announcement.textContent = `Step ${index+1} of ${steps.length}. ${caption.textContent}`;
      root.classList.toggle('is-paused', paused || motion.matches);
      play.disabled = motion.matches;
      play.textContent = motion.matches ? 'Reduced motion' : paused ? 'Play animation' : 'Pause animation';
      play.setAttribute('aria-pressed', String(!paused && !motion.matches));
      next.textContent = index === steps.length-1 ? 'Start again' : 'Next step';
    }
    function schedule() {
      clear();
      if (paused || motion.matches || !visible || document.hidden || hidden()) return;
      timer = setTimeout(() => {index = (index+1) % steps.length; paint(); schedule();}, index === steps.length-1 ? 4000 : 2600);
    }
    play.addEventListener('click', () => {paused = !paused; paint(); schedule();});
    next.addEventListener('click', () => {paused = true; index = (index+1) % steps.length; paint(true); schedule();});
    root.addEventListener('workflow:visibility', event => {visible = event.detail; schedule();});
    // Hidden tabs must not keep running. Their play/pause choice is preserved.
    const controller = {refresh:schedule, motionChanged:() => {if(motion.matches) paused = true; paint(); schedule();}};
    controllers.push(controller);
    root.querySelector('.wf-controls').hidden = false;
    root.classList.add('is-enhanced'); paint();
    if (observer) observer.observe(root); else schedule();
  });
  document.querySelectorAll('[data-workflow-tabs]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role=tab]')];
    const select = (index, focus = false) => {
      tabs.forEach((tab,i) => {
        tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = i !== index;
      });
      if (focus) tabs[index].focus();
      controllers.forEach(c => c.refresh());
    };
    tabs.forEach((tab,i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', event => {
        let index;
        if(event.key === 'ArrowRight') index = (i+1)%tabs.length;
        if(event.key === 'ArrowLeft') index = (i+tabs.length-1)%tabs.length;
        if(event.key === 'Home') index = 0;
        if(event.key === 'End') index = tabs.length-1;
        if(index !== undefined) {event.preventDefault(); select(index,true);}
      });
    });
    list.hidden = false; select(0);
  });
  // Attribute observation also covers the car tabs and the business-size picker.
  const changes = new MutationObserver(() => controllers.forEach(c => c.refresh()));
  changes.observe(document.body, {subtree:true, attributes:true, attributeFilter:['hidden','data-audience']});
  document.addEventListener('visibilitychange', () => controllers.forEach(c => c.refresh()));
  motion.addEventListener('change', () => controllers.forEach(c => c.motionChanged()));
})();
