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
  if (toggleIcon.src.includes('moon.svg')) {
    toggleIcon.src = 'assets/icons/sun.svg';
    toggleText.textContent = 'Light Mode';
  } else {
    toggleIcon.src = 'assets/icons/moon.svg';
    toggleText.textContent = 'Dark Mode';
  }
});

toggleColors.addEventListener('click', (e) => {
  rootStyles.setProperty("--primary-color", e.target.dataset.color);
});


document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.querySelector(".custom-scroll-top");

  // Ocultar el botón inicialmente
  if (scrollButton) {
    scrollButton.style.display = "none";

    // Mostrar u ocultar según el scroll
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > 250) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
      }
    });

    // Scroll suave al hacer clic
    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

