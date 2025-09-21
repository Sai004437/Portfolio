// Smooth scroll for internal nav links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute('href');
  if (href === '#' || href === '') return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Active nav link on scroll
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinks.map(l => document.querySelector(l.getAttribute('href')));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(n => n.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { root: null, rootMargin: '-35% 0px -55% 0px', threshold: 0 });

sections.forEach(s => { if (s) observer.observe(s); });

// Set year in footer
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
