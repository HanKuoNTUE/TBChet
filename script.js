const navLinks = [...document.querySelectorAll('.nav-link')];
const menuToggle = document.querySelector('[data-menu-toggle]');
const mainNav = document.querySelector('#main-nav');
const sections = navLinks
  .filter((link) => link.getAttribute('href')?.startsWith('#'))
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setActiveLink = (id) => {
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
};

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActiveLink(visible.target.id);
  },
  { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.1, 0.4, 0.8] },
);

sections.forEach((section) => observer.observe(section));

const closeMenu = () => {
  mainNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav?.classList.toggle('is-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
