/* ------ Navbar scroll ------ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
});

/* ------ Hamburger menu ------ */
document.getElementById('hamburgerBtn').addEventListener('click', function () {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('open'));
});

/* ------ Scroll reveal ------ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ------ Stats counter ------ */
function formatNumber(n, isDecimal) {
  if (isDecimal) return (n / 10).toFixed(1);
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K+';
  return n.toString() + (n === 50 ? '+' : '');
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target);
    const isDecimal = el.dataset.decimal === '1';
    const duration = 1800;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = formatNumber(current, isDecimal);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = formatNumber(target, isDecimal);
    }
    requestAnimationFrame(step);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number[data-target]').forEach(el => statsObserver.observe(el));

/* ------ Subject tabs ------ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
    document.getElementById('tab-' + this.dataset.tab).classList.add('active');
  });
});

/* ------ Accordion ------ */
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', function () {
    const item = this.closest('.accordion-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ------ Confetti ------ */
function launchConfetti(e) {
  const colors = ['#DC2626', '#F59E0B', '#F97316', '#FFFFFF', '#FCA5A5', '#FDE68A'];
  const origin = { x: e.clientX, y: e.clientY };
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = Math.random() * 8 + 6;
    piece.style.cssText = `
      left: ${origin.x + (Math.random() - .5) * 80}px;
      top: ${origin.y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > .5 ? '50%' : '2px'};
      animation-duration: ${Math.random() * 1.2 + 1}s;
      animation-delay: ${Math.random() * .3}s;
      transform: translateX(${(Math.random() - .5) * 200}px);
    `;
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

/* ------ Newsletter form ------ */
document.querySelector('.newsletter-form button').addEventListener('click', function () {
  const input = this.previousElementSibling;
  if (input.value.trim()) {
    this.textContent = '✅ Đã đăng ký!';
    input.value = '';
    setTimeout(() => this.textContent = 'Đăng ký ngay →', 2500);
  }
});
