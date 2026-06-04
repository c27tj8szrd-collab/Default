// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Particle background
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 8;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      background:rgba(0,191,255,${0.1 + Math.random() * 0.3});
      border-radius:50%;
      left:${x}%;
      top:${Math.random() * 100}%;
      animation:float-up ${duration}s ${delay}s linear infinite;
      pointer-events:none;
    `;
    particleContainer.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float-up {
      0%   { transform: translateY(0) scale(1); opacity: 0; }
      10%  { opacity: 1; }
      90%  { opacity: 0.5; }
      100% { transform: translateY(-120vh) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.service-card, .step, .reason-card, .tech-item, .channel-item'
);
const observer = new IntersectionObserver(
  entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
fadeEls.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '¡Solicitud Enviada!';
      btn.style.background = 'linear-gradient(135deg,#00c853,#00a040)';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Enviar Solicitud';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Animate reading bars on scroll
const readingBars = document.querySelectorAll('.r-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const w = e.target.style.width;
      e.target.style.width = '0%';
      setTimeout(() => { e.target.style.width = w; e.target.style.transition = 'width 1.2s ease'; }, 100);
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
readingBars.forEach(b => barObserver.observe(b));
