// Tiers of Joy — main.js

// ── SCROLL REVEAL ──────────────────────────────────────────────────────────────
// body.js-ready gates CSS transitions so no-JS users see content immediately.
// navigator.webdriver is true in CDP/Puppeteer (screenshot tools).
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


// ── MOBILE MENU ────────────────────────────────────────────────────────────────
const hamburger  = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  const openMenu = () => {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.textContent = '✕';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.textContent = '☰';
  };

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Close on any link click (including the Order Now CTA)
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the nav
  document.addEventListener('click', e => {
    if (mobileMenu.classList.contains('open') && !e.target.closest('nav')) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}


// ── GALLERY LIGHTBOX ───────────────────────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lbImg        = lightbox && lightbox.querySelector('.lightbox-img');
const lbCaption    = lightbox && lightbox.querySelector('.lightbox-caption');
const lbClose      = lightbox && lightbox.querySelector('.lightbox-close');
const lbPrev       = lightbox && lightbox.querySelector('.lightbox-prev');
const lbNext       = lightbox && lightbox.querySelector('.lightbox-next');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

if (lightbox && galleryItems.length) {
  // Build image data array from the DOM
  const images = galleryItems.map(item => ({
    src:     item.querySelector('img').src,
    alt:     item.querySelector('img').alt,
    caption: item.querySelector('.gallery-label') ? item.querySelector('.gallery-label').textContent : '',
  }));

  let currentIdx = 0;

  const setImage = (idx, animate) => {
    if (animate) {
      lbImg.classList.add('switching');
      setTimeout(() => {
        lbImg.src             = images[idx].src;
        lbImg.alt             = images[idx].alt;
        lbCaption.textContent = images[idx].caption;
        lbImg.classList.remove('switching');
      }, 150);
    } else {
      lbImg.src             = images[idx].src;
      lbImg.alt             = images[idx].alt;
      lbCaption.textContent = images[idx].caption;
    }
  };

  const openLightbox = idx => {
    currentIdx = idx;
    setImage(idx, false);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (galleryItems[currentIdx]) galleryItems[currentIdx].focus();
  };

  const navigate = dir => {
    currentIdx = (currentIdx + dir + images.length) % images.length;
    setImage(currentIdx, true);
  };

  // Open on click or Enter/Space keypress
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click',  () => navigate(-1));
  lbNext.addEventListener('click',  () => navigate(1));

  // Click the dark backdrop to close
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}
