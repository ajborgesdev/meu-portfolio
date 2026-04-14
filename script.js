const links = document.querySelectorAll('.js-menu a[href^="#"]');
const scrollLink = document.getElementById('js-scroll');

function scrollToSection(event) {
  event.preventDefault();

  let href;

  if (event.currentTarget === scrollLink) {
    href = '#projetos';
  } else {
    href = event.currentTarget.getAttribute('href');
  }

  if (href === '#home' || href === '#hero') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const section = document.querySelector(href);

  if (section) {
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop;

    const topo = sectionTop - 40 - windowHeight / 2 + sectionHeight / 2;

    window.scrollTo({
      top: topo,
      behavior: 'smooth'
    });
  }
}

links.forEach((link) => {
  link.addEventListener('click', scrollToSection);
});

if (scrollLink) {
  scrollLink.addEventListener('click', scrollToSection);
}

const track = document.getElementById('carrossel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let cardWidth = 0;
let visibleCards = 3;
let totalCards = 0;

function updateCarrossel() {
  if (!track) return;

  const firstCard = track.querySelector('.projeto-card');
  if (!firstCard) return;

  const trackStyle = window.getComputedStyle(track);
  const gap = parseInt(trackStyle.gap) || 30;
  const firstLink = track.querySelector('.projeto-card-link');
  if (firstLink) {
    cardWidth = firstLink.offsetWidth + gap;
  }

  totalCards = track.children.length;

  if (window.innerWidth <= 768) {
    visibleCards = 1;
  } else if (window.innerWidth <= 1024) {
    visibleCards = 2;
  } else {
    visibleCards = 3;
  }

  const maxIndex = Math.max(0, totalCards - visibleCards);
  currentIndex = Math.min(currentIndex, maxIndex);

  const translateX = -currentIndex * cardWidth;
  track.style.transform = `translateX(${translateX}px)`;
}

function nextSlide() {
  const maxIndex = Math.max(0, totalCards - visibleCards);
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarrossel();
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarrossel();
  }
}

if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

window.addEventListener('resize', () => {
  updateCarrossel();
});

updateCarrossel();

// ========== MENU HAMBÚRGUER ==========
const hamburguer = document.getElementById('hamburguer');
const navMenu = document.querySelector('.nav-menu');

if (hamburguer && navMenu) {
  hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Fecha o menu ao clicar em um link
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      hamburguer.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ========== TEMA CLARO/ESCURO ==========
const themeBtnDesktop = document.getElementById('js-btn-desktop');
const themeBtnMobile = document.getElementById('js-btn-mobile');
const html = document.documentElement;

// Pega as imagens DENTRO dos botões
const themeImgDesktop = themeBtnDesktop
  ? themeBtnDesktop.querySelector('img')
  : null;
const themeImgMobile = themeBtnMobile
  ? themeBtnMobile.querySelector('img')
  : null;

// Função que alterna o tema
function toggleTheme() {
  // Alterna a classe no HTML
  html.classList.toggle('light-mode');

  const isLightMode = html.classList.contains('light-mode');

  // Troca a imagem do botão DESKTOP
  if (themeImgDesktop) {
    themeImgDesktop.src = isLightMode ? 'imgs/moon.png' : 'imgs/sun.png';
  }

  // Troca a imagem e texto do botão MOBILE
  if (themeImgMobile) {
    themeImgMobile.src = isLightMode
      ? 'imgs/meia-lua-p.png'
      : 'imgs/meia-lua-b.png';
  }

  // Troca o texto do botão mobile
  const mobileBtn = document.querySelector('.mobile-btn');
  if (mobileBtn) {
    const textNode = mobileBtn.childNodes[0];
    if (textNode && textNode.nodeType === 3) {
      textNode.textContent = isLightMode ? ' Modo Escuro' : ' Modo Claro';
    }
  }

  // Salva no localStorage
  localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
}

// Carrega o tema salvo ao iniciar
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light-mode') {
  html.classList.add('light-mode');
  if (themeImgDesktop) themeImgDesktop.src = 'imgs/moon.png';
  if (themeImgMobile) themeImgMobile.src = 'imgs/meia-lua-p.png';

  const mobileBtn = document.querySelector('.mobile-btn');
  if (mobileBtn) {
    const textNode = mobileBtn.childNodes[0];
    if (textNode && textNode.nodeType === 3) {
      textNode.textContent = ' Modo Escuro';
    }
  }
}

// Adiciona os eventos
if (themeBtnDesktop) {
  themeBtnDesktop.addEventListener('click', toggleTheme);
}

if (themeBtnMobile) {
  themeBtnMobile.addEventListener('click', toggleTheme);
}

// Fechar o menu ao clicar fora dele

document.addEventListener('click', function (event) {
  if (navMenu.classList.contains('active')) {

    const clicouForaMenu = !event.target.closest('.nav-menu');
    const clicouForaHamburguer = !event.target.closest('.hamburguer');

    if (clicouForaMenu && clicouForaHamburguer) {
      navMenu.classList.remove('active');
      hamburguer.classList.remove('active');
    }
  }
});
