// Tiers of Joy — main.js
// Scroll-reveal animations with progressive enhancement.
// body.js-ready gates CSS transitions so no-JS users see content immediately.
// navigator.webdriver is true in CDP/Puppeteer (screenshot tools), so we
// reveal everything upfront in that context.

document.body.classList.add('js-ready');

const revealAll = () =>
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

if (navigator.webdriver || document.documentElement.scrollHeight <= window.innerHeight) {
  revealAll();
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px 100px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
