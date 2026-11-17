/** Animação de entrada suave ao fazer scroll (respeita prefers-reduced-motion). */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer =
  !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
      )
    : null;

export function observeReveal(root = document) {
  root.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el, i) => {
    if (!observer) return el.classList.add('is-visible');
    el.style.setProperty('--reveal-delay', `${(i % 4) * 70}ms`);
    observer.observe(el);
  });
}
