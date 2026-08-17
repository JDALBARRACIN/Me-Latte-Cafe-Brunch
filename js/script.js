const BUSINESS = {
  phone: '573103551662',
  whatsappMessage: 'Hola, quisiera conocer el menú de Me Latte Cafe Brunch.',
  instagram: 'https://www.instagram.com/melattecafebrunch/',
  maps: 'https://www.google.com/maps/search/?api=1&query=Cra.%2011a%20%23191a-52%20Loc%208%2C%20Bogot%C3%A1'
};

const menuItems = [
  {name:'Espresso', category:'cafe', description:'Café corto e intenso · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/cafe.jpg'},
  {name:'Americano', category:'cafe', description:'Café suave y aromático · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/cafe.jpg'},
  {name:'Latte', category:'cafe', description:'Café con leche cremosa · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/cafe.jpg'},
  {name:'Cappuccino', category:'cafe', description:'Espresso, leche y espuma · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/cafe.jpg'},
  {name:'Mocaccino', category:'cafe', description:'Café con chocolate · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/cafe.jpg'},
  {name:'Waffle clásico', category:'waffles', description:'Waffle para acompañar con tu topping favorito · DEMO', price:'PRECIO DEMO', image:'img/waffles.jpg'},
  {name:'Waffle con frutas', category:'waffles', description:'Frutas y toque dulce · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/waffles.jpg'},
  {name:'Waffle con chocolate', category:'waffles', description:'Chocolate y toppings · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/waffles.jpg'},
  {name:'Waffle especial', category:'waffles', description:'Propuesta especial de la casa · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/waffles.jpg'},
  {name:'Brunch clásico', category:'brunch', description:'Composición de brunch · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/brunch.jpg'},
  {name:'Huevos', category:'brunch', description:'Preparación para brunch · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/brunch.jpg'},
  {name:'Tostadas', category:'brunch', description:'Tostadas para acompañar · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/brunch.jpg'},
  {name:'Sándwiches', category:'brunch', description:'Sándwich para brunch · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/brunch.jpg'},
  {name:'Pancakes', category:'brunch', description:'Pancakes para compartir · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/brunch.jpg'},
  {name:'Jugos', category:'bebidas', description:'Opción fresca · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/bebidas.jpg'},
  {name:'Smoothies', category:'bebidas', description:'Bebida cremosa y fría · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/bebidas.jpg'},
  {name:'Chocolate', category:'bebidas', description:'Bebida caliente · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/bebidas.jpg'},
  {name:'Bebida fría', category:'bebidas', description:'Refrescante · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/bebidas.jpg'},
  {name:'Cheesecake', category:'postres', description:'Postre de ejemplo · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/postres.jpg'},
  {name:'Brownie', category:'postres', description:'Postre de chocolate · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/postres.jpg'},
  {name:'Torta del día', category:'postres', description:'Porción de ejemplo · CONTENIDO DEMO', price:'PRECIO DEMO', image:'img/postres.jpg'}
];

const categoryNames = {cafe:'Café', waffles:'Waffles', brunch:'Brunch', bebidas:'Bebidas', postres:'Postres'};

function whatsappUrl(itemName = '') {
  const message = itemName
    ? `Hola, quisiera pedir información sobre: ${itemName}. ${BUSINESS.whatsappMessage}`
    : BUSINESS.whatsappMessage;
  return `https://wa.me/${BUSINESS.phone}?text=${encodeURIComponent(message)}`;
}

function renderMenu(filter = 'todos') {
  const grid = document.getElementById('menuGrid');
  const visible = filter === 'todos' ? menuItems : menuItems.filter(item => item.category === filter);
  grid.innerHTML = visible.map(item => `
    <article class="menu-item reveal visible">
      <div class="menu-image"><img src="${item.image}" alt="${item.name}, imagen demo editable" loading="lazy"></div>
      <div class="menu-body">
        <div class="menu-meta"><span class="menu-category">${categoryNames[item.category]}</span><span class="menu-price">${item.price}</span></div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="menu-cta"><span class="demo-label">Demo / editable</span><a class="btn btn-primary btn-sm" href="${whatsappUrl(item.name)}" target="_blank" rel="noopener">Pedir <i class="bi bi-whatsapp"></i></a></div>
      </div>
    </article>`).join('');
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.filter);
    });
  });
}

function setupNavbar() {
  const header = document.querySelector('.site-header');
  const update = () => header.classList.toggle('scrolled', window.scrollY > 20);
  update();
  window.addEventListener('scroll', update, {passive: true});

  document.querySelectorAll('.navbar .nav-link, .navbar .btn').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('mainNav');
      if (collapse.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });
}

function setupReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  elements.forEach(el => observer.observe(el));
}

function setupLightbox() {
  const box = document.getElementById('lightbox');
  const image = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');

  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      image.src = item.dataset.lightbox;
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  closeBtn.addEventListener('click', close);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function setupFloatingActions() {
  const whatsapp = document.getElementById('whatsappBtn');
  whatsapp.href = whatsappUrl();

  const backTop = document.getElementById('backTop');
  const update = () => backTop.classList.toggle('show', window.scrollY > 650);
  window.addEventListener('scroll', update, {passive: true});
  update();
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

function setupYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupFilters();
  setupNavbar();
  setupReveal();
  setupLightbox();
  setupFloatingActions();
  setupYear();
});
