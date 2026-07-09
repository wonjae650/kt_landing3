document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-item__question');
    const icon = item.querySelector('.faq-item__icon');

    button.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      icon.textContent = isOpen ? '−' : '+';
    });
  });

  const chips = document.querySelectorAll('.faq__chips .chip');
  const faqItems = document.querySelectorAll('.faq-item');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      const filter = chip.dataset.filter;
      faqItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.hidden = !match;
      });
    });
  });
});
