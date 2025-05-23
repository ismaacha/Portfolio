// File: js/script.js

// === Menú móvil y scroll suave ===
// (Esto ya lo tenías antes, mantenlo)
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if (link.getAttribute('href').startsWith('#')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  }
});

const skillsSection = document.getElementById('skills-section');
const skillLevels = document.querySelectorAll('.skill-level');
function animateSkills() {
  if (!skillsSection) return;
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;
  if (sectionPos < screenPos) {
    skillLevels.forEach(bar => {
      const width = bar.getAttribute('style');
      bar.style.width = width;
    });
    window.removeEventListener('scroll', animateSkills);
  }
}
window.addEventListener('scroll', animateSkills);

// === Switch modo oscuro / claro ===
const toggleSwitch = document.getElementById('theme-toggle');

// Función para aplicar el tema guardado al cargar la página
function loadTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleSwitch.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    toggleSwitch.checked = false;
  }
}

// Función que se ejecuta al cambiar el checkbox
function switchTheme(e) {
  if (e.target.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

// Listener para detectar el cambio del switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Al cargar, aplicar tema guardado
loadTheme();
