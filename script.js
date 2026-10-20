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

const categoryResults = document.getElementById('category-projects');
if (categoryResults) {
  const projectCategories = {
    architecture: 'Architecture',
    'urban-planning': 'Urban Planning',
    'site-planning': 'Site Planning',
    'gis-remote-sensing': 'GIS & Remote Sensing'
  };
  const projects = [
    {
      category: 'architecture',
      name: 'Chennai Eye Care Hospital',
      area: 'Healthcare',
      image: 'EyeHospital_Exterior1_Architecture.png',
      imageAlt: 'Street-facing exterior of Chennai Eye Care Hospital',
      description: 'A welcoming healthcare environment with carefully planned patient, clinical, and support spaces.',
      href: 'project-detail.html'
    }
  ];
  const categoryId = new URLSearchParams(window.location.search).get('type');
  const categoryName = projectCategories[categoryId];
  const titleNode = document.getElementById('category-title');
  const subtitleNode = document.getElementById('category-subtitle');

  if (titleNode) {
    titleNode.textContent = categoryName || 'Project type not found';
  }
  if (subtitleNode) {
    subtitleNode.textContent = categoryName ? `${categoryName} projects` : 'Choose a project type to browse work.';
  }
  document.title = `${categoryName || 'Project Type'} | blocOne Studio`;

  const matchingProjects = projects.filter((project) => project.category === categoryId);
  if (matchingProjects.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'category-empty reveal visible';
    const message = document.createElement('p');
    message.textContent = categoryName
      ? 'Projects will be added here.'
      : 'This project type is not available.';
    emptyState.append(message);
    categoryResults.append(emptyState);
  } else {
    matchingProjects.forEach((project) => {
      const card = document.createElement('a');
      card.className = 'category-project-card reveal visible';
      card.href = project.href;

      const image = document.createElement('img');
      image.src = project.image;
      image.alt = project.imageAlt;
      image.loading = 'lazy';
      image.decoding = 'async';

      const content = document.createElement('div');
      content.className = 'category-project-copy';
      const area = document.createElement('span');
      area.className = 'project-type-label';
      area.textContent = `${project.area} / ${projectCategories[project.category]}`;
      const name = document.createElement('h3');
      name.textContent = project.name;
      const description = document.createElement('p');
      description.textContent = project.description;
      const action = document.createElement('span');
      action.className = 'project-type-action';
      action.textContent = 'View project';

      content.append(area, name, description, action);
      card.append(image, content);
      categoryResults.append(card);
    });
  }
}
