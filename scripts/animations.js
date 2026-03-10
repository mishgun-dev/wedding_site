document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = Array.from(document.querySelectorAll('main > section, footer'));

  if (!targets.length) {
    return;
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  targets.forEach((item) => item.classList.add('reveal-init'));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  targets.forEach((item) => observer.observe(item));
});
