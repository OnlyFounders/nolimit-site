/* ══════════════════════════════════════════
   PRELOADER
   ══════════════════════════════════════════ */
const preloader = document.getElementById('preloader');
if (preloader) {
  setTimeout(() => {
    preloader.classList.add('fade-out');
    document.body.classList.remove('preloader-active');
    setTimeout(() => { preloader.style.display = 'none'; }, 650);
  }, 1100);
}

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER — Scroll reveals
   ══════════════════════════════════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ══════════════════════════════════════════
   NAV — Scroll effect
   ══════════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ══════════════════════════════════════════
   PARALLAX — Subtle backdrop image shift
   ══════════════════════════════════════════ */
const backdrops = document.querySelectorAll('.section-backdrop img');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      backdrops.forEach(img => {
        const section = img.closest('section');
        const rect = section.getBoundingClientRect();
        const progress = -rect.top / window.innerHeight;
        const shift = progress * 30;
        img.style.transform = `translateY(${shift}px) scale(1.08)`;
      });
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ══════════════════════════════════════════
   MOBILE NAV — Toggle menu
   ══════════════════════════════════════════ */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

/* ══════════════════════════════════════════
   SMOOTH SCROLL — Anchor links
   ══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
