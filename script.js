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

const cardTiltSelector = [
  '.panel-card',
  '.service-card',
  '.process-item',
  '.home-project-card',
  '.project-type-card',
  '.category-project-card',
  '.category-empty',
  '.project-feature',
  '.project-image',
  '.project-card',
  '.cta-box',
  '.contact-card',
  '.info-card',
  '.scope-index a',
  '.google-form-panel'
].join(', ');
const supportsCardTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const enableCardTilt = (card) => {
  if (!supportsCardTilt || card.classList.contains('tilt-card')) return;

  card.classList.add('tilt-card');
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let animationFrame = null;

  const updateTilt = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;

    const magnitude = Math.hypot(currentX, currentY);
    const tiltLimit = 6;
    const angle = Math.min(magnitude, 1) * tiltLimit;
    if (angle > 0.01) {
      card.style.setProperty('--tilt-axis-x', String(-currentY / magnitude));
      card.style.setProperty('--tilt-axis-y', String(currentX / magnitude));
      card.style.setProperty('--tilt-angle', `${angle}deg`);
    } else {
      card.style.setProperty('--tilt-angle', '0deg');
    }

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      animationFrame = window.requestAnimationFrame(updateTilt);
    } else {
      currentX = targetX;
      currentY = targetY;
      animationFrame = null;
    }
  };

  card.addEventListener('pointermove', (event) => {
    const bounds = card.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    targetX = Math.max(-1, Math.min(1, targetX));
    targetY = Math.max(-1, Math.min(1, targetY));

    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(updateTilt);
    }
  });

  card.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;

    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(updateTilt);
    }
  });
};

document.querySelectorAll(cardTiltSelector).forEach(enableCardTilt);

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

const projectCategories = {
  architecture: 'Architecture',
  'urban-planning': 'Urban Planning',
  'site-planning': 'Site Planning',
  'gis-remote-sensing': 'GIS & Remote Sensing'
};

const portfolioProjects = [
  {
    id: 'eye-hospital',
    category: 'architecture',
    name: 'Chennai Eye Care Hospital',
    area: 'Healthcare',
    image: 'EyeHospital_Exterior1_Architecture.png',
    imageAlt: 'Street-facing exterior of Chennai Eye Care Hospital',
    description: 'A welcoming healthcare environment with carefully planned patient, clinical, and support spaces.',
    intro: 'A clear, welcoming environment for eye care.',
    galleryTitle: 'Interior spaces',
    galleryIntro: 'Designed around the patient journey.',
    gallerySections: [
      {
        label: 'Arrival',
        title: 'Reception',
        images: [
          { src: 'EyeHospital_Reception_Architecture.png', caption: 'Reception / Main desk', alt: 'Front view of the hospital reception desk and feature wall' },
          { src: 'EyeHospital_Reception1_Architecure.png', caption: 'Reception / Waiting area', alt: 'Reception desk with visitor seating and wayfinding posters' },
          { src: 'EyeHospital_Reception2_Architecture.png', caption: 'Reception / Side view', alt: 'Angled view of the reception desk and entry doors' },
          { src: 'EyeHospital_Reception3_Architecure.png', caption: 'Reception / Feature wall', alt: 'Reception counter and illuminated hospital feature wall' }
        ]
      },
      {
        label: 'Consultation',
        title: 'Consultation rooms',
        images: [
          { src: 'EyeHospital_Consultationroom_Architecture.png', caption: 'Consultation / Room 1', alt: 'Eye examination consultation room with desk and vision chart' },
          { src: 'EyeHospital_Consultationroom1_Architecture.png', caption: 'Consultation / Room 2', alt: 'Ophthalmology consultation room with examination equipment' },
          { src: 'EyeHospital_Consultationrooom2_Architecture.png', caption: 'Consultation / Room 3', alt: 'Clinical eye consultation room with examination chair and equipment' }
        ]
      },
      {
        label: 'Support',
        title: 'Medical store',
        images: [
          { src: 'EyeHospital_MedicalStore_Architecure.png', caption: 'Medical store / Interior', alt: 'Interior of the hospital medical store with medicine shelving and counter' },
          { src: 'EyeHospital_MedicalStore1_Architecture.png', caption: 'Medical store / Service counter', alt: 'Medical store shelving and service counter facing the window' }
        ]
      },
      {
        label: 'Facilities',
        title: 'Washrooms',
        images: [
          { src: 'EyeHospital_Toilet_Architecture.png', caption: 'Washroom / Vanity and shower', alt: 'Tiled washroom interior with shower and vanity' },
          { src: 'EyeHospital_Toilet1_Arrchitecture.png', caption: 'Washroom / Vanity detail', alt: 'Washroom vanity and shower enclosure in a neutral finish' }
        ]
      }
    ]
  },
  {
    id: 'abhi-residence',
    category: 'architecture',
    name: 'Abhi Residence',
    area: 'Residential',
    image: 'AbhiResidence_Exterior1_Architecture.png',
    imageAlt: 'Exterior view of Abhi Residence',
    description: 'A private residential design presented through three exterior views.',
    intro: 'A contemporary residence with layered balconies and warm material details.',
    galleryTitle: 'Exterior views',
    galleryIntro: 'Exterior views of the residential design.',
    gallerySections: [{
      label: 'Architecture',
      title: 'Exterior views',
      images: [
        { src: 'AbhiResidence_Exterior1_Architecture.png', caption: 'Exterior / View 1', alt: 'Exterior view 1 of Abhi Residence' },
        { src: 'AbhiResidense_Exterior2_Architecture.png', caption: 'Exterior / View 2', alt: 'Exterior view 2 of Abhi Residence' },
        { src: 'AbhiResidence_Exterior3_Architecture.png', caption: 'Exterior / View 3', alt: 'Exterior view 3 of Abhi Residence' }
      ]
    }]
  },
  {
    id: 'b1-residence',
    category: 'architecture',
    name: 'B1 Residence',
    area: 'Residential',
    image: 'B1Residence_Exterior1_Architecture.png',
    imageAlt: 'Exterior view of B1 Residence',
    description: 'A private residential design presented through three exterior views.',
    intro: 'A compact urban residence framed by a distinctive curved facade.',
    galleryTitle: 'Exterior views',
    galleryIntro: 'Exterior views of the residential design.',
    gallerySections: [{
      label: 'Architecture',
      title: 'Exterior views',
      images: [
        { src: 'B1Residence_Exterior1_Architecture.png', caption: 'Exterior / View 1', alt: 'Exterior view 1 of B1 Residence' },
        { src: 'B1Residence_Exterior2_Architecture.png', caption: 'Exterior / View 2', alt: 'Exterior view 2 of B1 Residence' },
        { src: 'B1Residence_Exterior3_Architecture.png', caption: 'Exterior / View 3', alt: 'Exterior view 3 of B1 Residence' }
      ]
    }]
  },
  {
    id: 'b2-residence',
    category: 'architecture',
    name: 'B2 Residence',
    area: 'Residential',
    image: 'B2Residence_Exterior1_Architecture.png',
    imageAlt: 'Exterior view of B2 Residence',
    description: 'A private residential design presented through three exterior views.',
    intro: 'A slender residence with shaded balconies and a strong vertical composition.',
    galleryTitle: 'Exterior views',
    galleryIntro: 'Exterior views of the residential design.',
    gallerySections: [{
      label: 'Architecture',
      title: 'Exterior views',
      images: [
        { src: 'B2Residence_Exterior1_Architecture.png', caption: 'Exterior / View 1', alt: 'Exterior view 1 of B2 Residence' },
        { src: 'B2Residence_Exterior2_Architecture.png', caption: 'Exterior / View 2', alt: 'Exterior view 2 of B2 Residence' },
        { src: 'B2Residence_Exterior3_Architecture.png', caption: 'Exterior / View 3', alt: 'Exterior view 3 of B2 Residence' }
      ]
    }]
  },
  {
    id: 'b3-residence',
    category: 'architecture',
    name: 'B3 Residence',
    area: 'Residential',
    image: 'B3Residence_Exterior1_Architecture.png',
    imageAlt: 'Exterior view of B3 Residence',
    description: 'A private residential design presented through three exterior views.',
    intro: 'A warm-toned residence with a sheltered entry and layered facade details.',
    galleryTitle: 'Exterior views',
    galleryIntro: 'Exterior views of the residential design.',
    gallerySections: [{
      label: 'Architecture',
      title: 'Exterior views',
      images: [
        { src: 'B3Residence_Exterior1_Architecture.png', caption: 'Exterior / View 1', alt: 'Exterior view 1 of B3 Residence' },
        { src: 'B3Residence_Exterior2_Architecture.png', caption: 'Exterior / View 2', alt: 'Exterior view 2 of B3 Residence' },
        { src: 'B3Residence_Exterior3_Architecture.png', caption: 'Exterior / View 3', alt: 'Exterior view 3 of B3 Residence' }
      ]
    }]
  },
  {
    id: 'factory',
    category: 'architecture',
    name: 'Factory',
    area: 'Industrial',
    image: 'Factory_Exterior1_Architecture.png',
    imageAlt: 'Exterior of a contemporary factory building',
    description: 'An industrial building design shown through three exterior views.',
    intro: 'A contemporary industrial facility with a clear, efficient building form.',
    galleryTitle: 'Exterior views',
    galleryIntro: 'Exterior views of the industrial building design.',
    gallerySections: [{
      label: 'Architecture',
      title: 'Exterior views',
      images: [
        { src: 'Factory_Exterior1_Architecture.png', caption: 'Exterior / View 1', alt: 'Exterior view 1 of the factory project' },
        { src: 'Factory_Exterior2_Architecture.png', caption: 'Exterior / View 2', alt: 'Exterior view 2 of the factory project' },
        { src: 'Factory_Exterior3_Architecture.png', caption: 'Exterior / View 3', alt: 'Exterior view 3 of the factory project' }
      ]
    }]
  },
  {
    id: 'sik-residence',
    category: 'architecture',
    name: 'SIK Residence',
    area: 'Residential',
    image: 'SIKResidence_Exterior_Architecture.png',
    imageAlt: 'Exterior view of SIK Residence',
    description: 'A private residential design shown through an exterior view and four facade options.',
    intro: 'A residence explored through multiple exterior and facade options.',
    galleryTitle: 'Exterior design options',
    galleryIntro: 'A selection of exterior views and design options.',
    gallerySections: [{
      label: 'Architecture',
      title: 'Exterior options',
      images: [
        { src: 'SIKResidence_Exterior_Architecture.png', caption: 'Exterior / View', alt: 'Exterior view of SIK Residence' },
        { src: 'SIKResidence_Exterior2_Architecture.png', caption: 'Exterior / View 2', alt: 'Second exterior view of SIK Residence' },
        { src: 'SIKResidence_ExteriorOption2_Architecture.png', caption: 'Exterior / Option 2', alt: 'Exterior design option 2 for SIK Residence' },
        { src: 'SIKResidence_ExteriorOption3_Architecture.png', caption: 'Exterior / Option 3', alt: 'Exterior design option 3 for SIK Residence' },
        { src: 'SIKResidence_ExteriorOption4_Architecture.png', caption: 'Exterior / Option 4', alt: 'Exterior design option 4 for SIK Residence' }
      ]
    }]
  }
];

const categoryResults = document.getElementById('category-projects');
if (categoryResults) {
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

  const matchingProjects = portfolioProjects.filter((project) => project.category === categoryId);
  if (matchingProjects.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'category-empty reveal visible';
    const message = document.createElement('p');
    message.textContent = categoryName
      ? 'Projects will be added here.'
      : 'This project type is not available.';
    emptyState.append(message);
    categoryResults.append(emptyState);
    enableCardTilt(emptyState);
  } else {
    matchingProjects.forEach((project) => {
      const card = document.createElement('a');
      card.className = 'category-project-card reveal';
      card.href = `project-detail.html?project=${encodeURIComponent(project.id)}`;

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
      enableCardTilt(card);
      revealObserver.observe(card);
    });
  }
}

const projectDetail = document.getElementById('project-detail');
if (projectDetail) {
  const requestedProject = new URLSearchParams(window.location.search).get('project') || 'eye-hospital';
  const project = portfolioProjects.find((item) => item.id === requestedProject) || portfolioProjects[0];
  const categoryName = projectCategories[project.category];
  const heroLabel = document.getElementById('project-category-label');
  const titleNode = document.getElementById('project-title');
  const heroImage = document.getElementById('project-hero-image');
  const heroImageCaption = document.getElementById('project-hero-caption');
  const introLabel = document.getElementById('project-intro-label');
  const introTitle = document.getElementById('project-intro-title');
  const introDescription = document.getElementById('project-description');
  const galleryEyebrow = document.getElementById('project-gallery-eyebrow');
  const galleryTitle = document.getElementById('project-gallery-title');
  const galleryIntro = document.getElementById('project-gallery-intro');
  const galleryContainer = document.getElementById('project-galleries');
  const backLink = document.getElementById('project-back-link');

  document.title = `${project.name} | blocOne Studio`;
  if (heroLabel) heroLabel.textContent = `${project.area} / ${categoryName}`;
  if (titleNode) titleNode.textContent = project.name;
  if (heroImage) {
    heroImage.src = project.image;
    heroImage.alt = project.imageAlt;
  }
  if (heroImageCaption) {
    heroImageCaption.textContent = 'Exterior';
  }
  if (introLabel) introLabel.textContent = `${project.area} / ${categoryName}`;
  if (introTitle) introTitle.textContent = project.intro;
  if (introDescription) introDescription.textContent = project.description;
  if (galleryEyebrow) {
    galleryEyebrow.textContent = project.id === 'eye-hospital' ? 'Interior spaces' : 'Exterior views';
  }
  if (galleryTitle) galleryTitle.textContent = project.galleryTitle;
  if (galleryIntro) galleryIntro.textContent = project.galleryIntro;
  if (backLink) {
    backLink.href = `project-category.html?type=${encodeURIComponent(project.category)}`;
    backLink.textContent = `\u2190 Back to ${categoryName.toLowerCase()} projects`;
  }

  if (galleryContainer) {
    project.gallerySections.forEach((section, sectionIndex) => {
      const area = document.createElement('section');
      area.className = 'project-area reveal';
      const headingId = `project-gallery-heading-${sectionIndex + 1}`;
      area.setAttribute('aria-labelledby', headingId);

      const areaHeading = document.createElement('div');
      areaHeading.className = 'project-area-heading';
      const label = document.createElement('p');
      label.className = 'section-tag';
      label.textContent = section.label;
      const title = document.createElement('h3');
      title.id = headingId;
      title.textContent = section.title;
      areaHeading.append(label, title);

      const imageGrid = document.createElement('div');
      imageGrid.className = 'project-image-grid';
      section.images.forEach((item) => {
        const figure = document.createElement('figure');
        figure.className = 'project-image reveal';
        const image = document.createElement('img');
        image.src = item.src;
        image.alt = item.alt;
        image.loading = 'lazy';
        image.decoding = 'async';
        const caption = document.createElement('figcaption');
        caption.textContent = item.caption;
        figure.append(image, caption);
        imageGrid.append(figure);
        enableCardTilt(figure);
      });

      area.append(areaHeading, imageGrid);
      galleryContainer.append(area);
      revealObserver.observe(area);
      area.querySelectorAll('.project-image.reveal').forEach((figure) => revealObserver.observe(figure));
    });
  }
}
