// File: js/script.js
document.addEventListener('DOMContentLoaded', function() {
  // === Menú móvil ===
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Cerrar menú al hacer clic en un enlace
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // === Scroll suave ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // === Cambio de tema ===
  const toggleSwitch = document.getElementById('theme-toggle');
  
  // Aplicar tema guardado al cargar
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleSwitch.checked = true;
    }
  }
  
  // Cambiar tema
  function switchTheme(e) {
    if (e.target.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }
  
  toggleSwitch.addEventListener('change', switchTheme);
  loadTheme();
  
  // === Animaciones al hacer scroll ===
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tile-card, .project-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight * 0.8;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Configurar observadores iniciales
  window.addEventListener('scroll', animateOnScroll);
  
  // Inicializar elementos
  document.querySelectorAll('.tile-card, .project-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Ejecutar al cargar
  animateOnScroll();
  
  // === Header scroll effect ===
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scroll hacia abajo
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scroll hacia arriba
      header.style.transform = 'translateY(0)';
    }
    
    // Cambiar estilo del header al hacer scroll
    if (scrollTop > 50) {
      header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
      header.style.backgroundColor = 'var(--header-bg)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'transparent';
    }
    
    lastScrollTop = scrollTop;
  });
});