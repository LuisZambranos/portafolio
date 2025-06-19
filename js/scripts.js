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


