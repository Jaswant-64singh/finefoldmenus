/* Fine Fold Menus — Waterproof Menu Covers (NTR) */

/* Scroll-triggered reveals */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.setProperty('--d', (i % 6) * 70 + 'ms');
  io.observe(el);
});

/* Stagger children of grids */
document.querySelectorAll('.swatch, .panel, .chip, .feature').forEach((el, i) => {
  el.style.transitionDelay = (i % 8) * 60 + 'ms';
});

/* Soft parallax on hero + media */
const parallaxEls = [...document.querySelectorAll('.hero__media img, .final__media img')];
let ticking = false;

window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    parallaxEls.forEach((img) => {
      const r = img.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.transform = `scale(1.08) translateY(${(p * 26).toFixed(2)}px)`;
    });
    ticking = false;
  });
}, { passive: true });

/* Accordion — MDF-style (ntr-faq) */
document.querySelectorAll('.ntr-faq-item').forEach(function (item) {
  var q = item.querySelector('.ntr-faq-q');
  var a = item.querySelector('.ntr-faq-a');
  q.addEventListener('click', function () {
    var open = item.classList.contains('open');
    document.querySelectorAll('.ntr-faq-item.open').forEach(function (o) {
      o.classList.remove('open');
      o.querySelector('.ntr-faq-a').style.maxHeight = null;
    });
    if (!open) {
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

window.addEventListener('resize', function () {
  document.querySelectorAll('.ntr-faq-item.open .ntr-faq-a').forEach(function (a) {
    a.style.maxHeight = a.scrollHeight + 'px';
  });
});

/* Button ripple */
document.querySelectorAll('.ripple').forEach((b) => {
  b.addEventListener('click', (e) => {
    const r = b.getBoundingClientRect();
    const s = document.createElement('span');
    s.className = 'ripple__wave';
    s.style.left = (e.clientX - r.left) + 'px';
    s.style.top = (e.clientY - r.top) + 'px';
    b.appendChild(s);
    setTimeout(() => s.remove(), 650);
  });
});

/* Smooth anchor scroll */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
