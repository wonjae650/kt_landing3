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

  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const cards = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    const dotsWrap = carousel.querySelector('.carousel__dots');

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', `${i + 1}번째 프로젝트로 이동`);
      dot.addEventListener('click', () => cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start' }));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    const setActiveDot = () => {
      const trackLeft = track.getBoundingClientRect().left;
      let closestIndex = 0;
      let closestDistance = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === closestIndex));
    };

    const scrollByCard = (direction) => {
      const amount = cards[0].getBoundingClientRect().width + 24;
      track.scrollBy({ left: amount * direction, behavior: 'smooth' });
    };

    prevBtn.addEventListener('click', () => scrollByCard(-1));
    nextBtn.addEventListener('click', () => scrollByCard(1));
    track.addEventListener('scroll', () => {
      window.clearTimeout(track._scrollTimer);
      track._scrollTimer = window.setTimeout(setActiveDot, 80);
    });

    setActiveDot();
  });

  document.querySelectorAll('.reviews-carousel').forEach((carousel) => {
    const rail = carousel.querySelector('.reviews-carousel__rail');
    const tracks = carousel.querySelectorAll('.reviews-carousel__track');
    if (tracks.length < 2) return;

    const speed = 32; // px per second
    let offset = 0;
    let distance = 0;
    let paused = false;
    let lastTimestamp = null;

    const measure = () => {
      distance = tracks[1].getBoundingClientRect().left - tracks[0].getBoundingClientRect().left;
    };
    measure();
    window.addEventListener('resize', measure);

    carousel.addEventListener('mouseenter', () => { paused = true; });
    carousel.addEventListener('mouseleave', () => { paused = false; });

    const step = (timestamp) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (!paused && distance > 0) {
        offset = (offset + speed * delta) % distance;
        rail.style.transform = `translateX(${-offset}px)`;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });

  document.querySelectorAll('.curr-row').forEach((row) => {
    const num = row.querySelector('.curr-num');
    const header = row.querySelector('.curr-header');

    const toggle = () => {
      const isOpen = row.classList.toggle('is-open');
      header.setAttribute('aria-expanded', String(isOpen));
    };

    num.addEventListener('click', toggle);
    header.addEventListener('click', toggle);
  });
});
