/* ============================================
   PANAMA FOREVER GREEN INTL S.A. — script.js
   ============================================ */

/* ── NAVBAR scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
  toggleScrollTop();
});

/* ── HAMBURGER menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ── ACTIVE nav link on scroll ── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.pageYOffset;
  sections.forEach(s => {
    const top = s.offsetTop - 100;
    const bot = top + s.offsetHeight;
    const id  = s.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bot);
  });
}

/* ── PARTICLES (hero) ── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 60 + 10;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
})();

/* ── COUNTER animation ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

/* ── INTERSECTION OBSERVER ── */
const observerOptions = { threshold: 0.15 };

// AOS-style animations
const aosObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.aosDelay || 0;
      setTimeout(() => e.target.classList.add('aos-animate'), +delay);
      aosObserver.unobserve(e.target);
    }
  });
}, observerOptions);
document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// Counter triggers
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num, .stat-count').forEach(el => counterObserver.observe(el));

/* ── PROJECT FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'all .3s ease';
      card.style.opacity = match ? '1' : '0';
      card.style.transform = match ? 'scale(1)' : 'scale(.95)';
      setTimeout(() => card.classList.toggle('hidden', !match), 300);
      if (match) { card.classList.remove('hidden'); setTimeout(() => { card.style.opacity='1'; card.style.transform='scale(1)'; }, 10); }
    });
  });
});

/* ── TESTIMONIALS slider ── */
const slides  = document.querySelectorAll('.testimonial-card');
const dots    = document.querySelectorAll('.dot');
let current   = 0;
let autoplay;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
    dots[i]?.classList.toggle('active', i === index);
  });
  current = index;
}

function nextSlide() { showSlide((current + 1) % slides.length); }
function prevSlide() { showSlide((current - 1 + slides.length) % slides.length); }

document.getElementById('testNext')?.addEventListener('click', () => { nextSlide(); resetAuto(); });
document.getElementById('testPrev')?.addEventListener('click', () => { prevSlide(); resetAuto(); });
dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); resetAuto(); }));

function resetAuto() { clearInterval(autoplay); autoplay = setInterval(nextSlide, 5000); }
autoplay = setInterval(nextSlide, 5000);

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
    btn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1500);
});

/* ── SCROLL TOP button ── */
const scrollTopBtn = document.getElementById('scrollTop');
function toggleScrollTop() {
  scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
}
scrollTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SMOOTH SCROLL for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── TYPING effect on hero title ── */
(function heroEntrance() {
  const lines = document.querySelectorAll('.hero-title .title-line');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
    line.style.transition = 'opacity .6s ease, transform .6s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 300 + i * 200);
  });
  const badge = document.querySelector('.hero-badge');
  const desc  = document.querySelector('.hero-desc');
  const acts  = document.querySelector('.hero-actions');
  const stats = document.querySelector('.hero-stats');
  [badge, desc, acts, stats].forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 150);
  });
})();
