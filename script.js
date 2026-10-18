const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.getElementById('contact-form');
const statusNode = document.getElementById('form-status');

if (form && statusNode) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    statusNode.textContent = 'Opening the Google Form for your enquiry...';
    statusNode.classList.remove('error');
    window.open(
      'https://docs.google.com/forms/d/1yVHgBoYXMUC4zXAfmT_I1OtiYrwCKY_M8TZKINSMoPo/viewform?usp=pp_url',
      '_blank',
      'noopener,noreferrer'
    );
  });
}

const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

const heroPanel = document.querySelector('.panel-card');
if (heroPanel) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;
    heroPanel.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
}

const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
forms.forEach((formEl) => {
  formEl.addEventListener('submit', () => {
    const button = formEl.querySelector('button[type="submit"]');
    if (button) {
      button.textContent = 'Sending...';
      button.disabled = true;
    }
  });
});
