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
  function update() {
    const matches = cards.filter(card => category === 'all' || card.dataset.stackCategory === category);
    cards.forEach(card => {
      const show = matches.includes(card) && (category !== 'all' || expanded || card.dataset.featured === 'true');
      card.hidden = !show;
      if (!show) card.querySelector('details').open = false;
    });
    const visible = cards.filter(card => !card.hidden).length;
    count.textContent = category === 'all' ? `Showing ${visible} of ${cards.length} stacks` : `${matches.length} stacks · ${category}`;
    more.hidden = category !== 'all';
    moreButton.textContent = expanded ? 'Show the overview ↑' : `Explore all ${cards.length} stacks ↓`;
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
    if (!expanded) library.querySelector('.stack-filters').scrollIntoView({block:'start', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  controls.hidden = false;
  update();
  document.addEventListener('autonoa:show-stack', event => {
    const card = cards.find(c => c.querySelector('h3').textContent === event.detail?.title);
    if (!card) return;
    category = card.dataset.stackCategory;
    update();
    card.querySelector('details').open = true;
    const heading = card.querySelector('h3');
    heading.tabIndex = -1;
    heading.focus({preventScroll:true});
    card.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
})();
