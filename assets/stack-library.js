(() => {
  const library = document.querySelector('.stack-library');
  if (!library) return;
  const cards = [...library.querySelectorAll('.stack-example')];
  const controls = library.querySelector('.stack-filters');
  const more = library.querySelector('.stack-library-more');
  const moreButton = library.querySelector('#stack-show-more');
  const count = library.querySelector('#stack-result-count');
  let category = 'all';
  let expanded = false;
  let audience = 'all';
  let suggested = new Set([0,4,8,12,16,20]);
  const originals = cards.map(card => {
    const heading = card.querySelector('h3');
    card.dataset.stackTitle = heading.textContent;
    return {title:heading.textContent,description:card.querySelector('.stack-description').textContent,family:card.querySelector('.stack-family').textContent,summary:card.querySelector('summary').innerHTML};
  });
  function update() {
    const matches = cards.filter(card => category === 'all' || card.dataset.stackCategory === category);
    cards.forEach(card => {
      const index = Number(card.querySelector('h3').id.replace('stack-title-',''));
      const show = matches.includes(card) && (category !== 'all' || expanded || suggested.has(index));
      card.hidden = !show;
      if (!show) card.querySelector('details').open = false;
    });
    const visible = cards.filter(card => !card.hidden).length;
    count.textContent = category === 'all'
      ? audience !== 'all' && !expanded ? `${visible} suggested examples · ${window.AutonoaAudienceConfig.profiles[audience].label}` : `Showing ${visible} of ${cards.length} examples`
      : `${matches.length} examples · ${category}`;
    more.hidden = category !== 'all';
    moreButton.textContent = expanded ? 'Show suggested examples ↑' : `Explore all ${cards.length} system examples ↓`;
    controls.hidden = audience === 'small' && category === 'all' && !expanded;
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.stackCategory === category)));
  }
  controls.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    category = button.dataset.stackCategory;
    update();
  });
  moreButton.addEventListener('click', () => {
    expanded = !expanded;
    update();
    if (!expanded) library.querySelector('.stack-library-heading').scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  controls.hidden = false;
  update();
  document.addEventListener('autonoa:show-stack', event => {
    const card = cards.find(c => c.dataset.stackTitle === event.detail?.title);
    if (!card) return;
    category = card.dataset.stackCategory;
    update();
    card.querySelector('details').open = true;
    const heading = card.querySelector('h3');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
    card.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  document.addEventListener('autonoa:audience-change', event => {
    const config = window.AutonoaAudienceConfig;
    audience = config.safe(event.detail?.key);
    const profile = config.profiles[audience];
    suggested = new Set(profile.examples);
    category = 'all';expanded = false;
    cards.forEach((card,i) => {
      const alternate = profile.examplesCopy?.[i];
      card.querySelector('h3').textContent = alternate?.[0] || originals[i].title;
      card.querySelector('.stack-description').textContent = alternate?.[1] || originals[i].description;
      card.querySelector('.stack-family').textContent = audience === 'small' ? 'BUSINESS EXAMPLE' : originals[i].family;
      card.querySelector('summary').innerHTML = audience === 'small' ? 'How this works <span aria-hidden="true">+</span>' : originals[i].summary;
    });
    library.querySelector('.stack-results>span').textContent = audience === 'small' ? 'Open an example to see the tools and steps' : 'Open an example to see how the tools connect';
    update();
  });
})();
