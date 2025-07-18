const toggleTheme = document.getElementById('toggle-theme');
const toggleIcon = document.getElementById('toggle-icon');
const toggleText = document.getElementById('toggle-text');
const toggleColors = document.getElementById('toggle-colors');
const rootStyles = document.documentElement.style;
const flagsElement = document.getElementById('flags');

const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;
    textToChange.innerHTML = texts[section][value].replace(/\n/g, "<br>");

  }
};

flagsElement.addEventListener('click', (e) => {
  const lang = e.target.parentElement.dataset.language;
  if (lang) changeLanguage(lang);
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');

  // Cambia el ícono
  toggleIcon.src = isDark ? 'assets/icons/moon.svg' : 'assets/icons/sun.svg';

  // Cambia el data-value y deja que el cambio de idioma lo maneje automáticamente
  toggleText.setAttribute('data-value', isDark ? 'dark' : 'light');

  // Llama a changeLanguage de nuevo si ya hay un idioma cargado
  const currentLang = document.querySelector('.flags__item[data-language].active')?.dataset.language;
  if (currentLang) {
    changeLanguage(currentLang);
  } else {
    changeLanguage('es'); // por defecto, por si no hay una activa
  }
});


toggleColors.addEventListener('click', (e) => {
  rootStyles.setProperty("--primary-color", e.target.dataset.color);
});


document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".custom-scroll-top");

  if (scrollButton) {
    const toggleScrollButton = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 150) {
        scrollButton.classList.add("show");
      } else {
        scrollButton.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleScrollButton);
    toggleScrollButton(); // Ejecutar al cargar por si ya está abajo

    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});


// CAROUSEL
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Organizar slides uno al lado del otro
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
};

// Botón derecho
nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const nextDot = currentDot.nextElementSibling;

  if (!nextSlide) return;

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
});

// Botón izquierdo
prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide');
  const prevDot = currentDot.previousElementSibling;

  if (!prevSlide) return;

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
});

// Dots
dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');
  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
});

const updateSlidePosition = () => {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
};

// MODAL

  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("certificatesModal");

  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

// LIGHTBOX

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  // Agrega evento a cada imagen del modal
  document.querySelectorAll('.modal__img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  // Cerrar con botón
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
  });

  // Cerrar haciendo clic fuera de la imagen
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
    }
  });

