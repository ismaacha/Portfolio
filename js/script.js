/**
 * Ismael Achamrouk - Portfolio Script
 * Modern vanilla JS setup for interactive portfolio
 */

// ===================================
// DOM Elements
// ===================================
const body = document.body;
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const backToTopBtn = document.getElementById('back-to-top');
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

// ===================================
// Custom Cursor
// ===================================
const initCursor = () => {
  // Only init if not on mobile/touch device
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    // Dot follows fast
    dotX += (mouseX - dotX) * 0.5;
    dotY += (mouseY - dotY) * 0.5;
    
    // Ring follows with delay
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Hover effects on clickable elements
  const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .chip, .value');
  
  clickables.forEach(el => {
    el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
  });
};

// ===================================
// Page Loader
// ===================================
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    // Once loaded, start typing and animations
    initTyping();
    initParticles();
    animateStats();
  }, 1000); // Wait for the fill animation to finish
});

// ===================================
// Navigation Toggle
// ===================================
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===================================
// Theme Toggle (Dark/Light)
// ===================================
const initTheme = () => {
  const savedTheme = localStorage.getItem('ismaTheme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('ismaTheme', newTheme);
    updateThemeIcon(newTheme);
    
    // Refresh particles color if canvas exists
    if (window.pJSDom && window.pJSDom.length > 0) {
      initParticles(); 
    }
  });
};

const updateThemeIcon = (theme) => {
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
};

// ===================================
// Scroll Events (Navbar & BackToTop)
// ===================================
window.addEventListener('scroll', () => {
  // Navbar blur
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active Nav Links
  let current = '';
  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });

  // Back to Top button
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================================
// Typing Effect
// ===================================
const initTyping = () => {
  const textElement = document.getElementById('typed-text');
  if (!textElement) return;

  const words = ['Ismael Achamrouk', 'Desarrollador Web', 'Entusiasta del código'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newWordDelay = 2000;

  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      textElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = newWordDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 500;
    }

    setTimeout(type, speed);
  };

  type();
};

// ===================================
// Magnetic Buttons
// ===================================
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0px, 0px)';
  });
});

// ===================================
// Stats Counter Animation
// ===================================
const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            entry.target.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target;
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
};

// ===================================
// Simple Particles Background
// ===================================
const initParticles = () => {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  window.addEventListener('resize', resize);
  resize();

  const theme = document.documentElement.getAttribute('data-theme');
  const particleColor = theme === 'light' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)';

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particleCount = Math.min(window.innerWidth / 15, 100);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  };
  animate();
};

// ===================================
// Skills Tabs
// ===================================
const initTabs = () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active to clicked
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const panel = document.querySelector(`[data-panel="${target}"]`);
      if (panel) {
        panel.classList.add('active');
        // Re-trigger bar animations inside this panel
        setTimeout(() => {
          animateSkillBars(panel);
        }, 50);
      }
    });
  });
};

const animateSkillBars = (context = document) => {
  const bars = context.querySelectorAll('.skill-bar');
  bars.forEach(bar => {
    const w = bar.getAttribute('data-w');
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = w + '%';
    }, 100);
  });
};

// Initial intersection observer for skills to animate on scroll
const initSkillObserver = () => {
  const skillsSec = document.getElementById('skills');
  if(!skillsSec) return;
  
  const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting) {
      animateSkillBars(document.querySelector('.tab-panel.active'));
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  
  observer.observe(skillsSec);
};

// ===================================
// Scroll Reveal (Custom AOS alternative)
// ===================================
const initScrollReveal = () => {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
};

// ===================================
// Form Submission
// ===================================
const initForm = () => {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const btn = form.querySelector('button[type="submit"]');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate thinking/sending
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalText;
      btn.disabled = false;
      successMsg.style.display = 'flex';
      
      setTimeout(() => {
        successMsg.style.display = 'none';
      }, 5000);
    }, 1500);
  });
};

// ===================================
// Initialize everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initTheme();
  initTabs();
  initSkillObserver();
  initScrollReveal();
  initForm();
  
  console.log("%c¡Hola dev! 👋", "color: #3b82f6; font-size: 24px; font-weight: bold;");
  console.log("%cEl código fuente de este portfolio está súper limpio. ¡Echa un vistazo!", "color: #10b981; font-size: 14px;");
});