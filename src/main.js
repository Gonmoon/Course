import './styles/main/style.scss';
import './styles/main/tablet-style.scss';
import './styles/main/phone-style.scss';

import { ComponentHeader } from "./components/component-header.js";
import { ComponentProduct } from "./components/component-product.js";
import { ComponentFooter } from "./components/component-footer.js";

customElements.define("widget-header", ComponentHeader);
customElements.define("widget-product", ComponentProduct);
customElements.define("widget-footer", ComponentFooter);

import { initBurger } from "./utils/initBurger.js";

document.addEventListener("DOMContentLoaded", () => {
  initBurger();

  const sections = document.querySelectorAll('section');

  if(sections) {
      const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  const scrollBtn = document.getElementById('scrollToTop');

  if(scrollBtn) {
      window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
  
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  const currentTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", currentTheme);
  
  function updateImagesForTheme(theme) {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (img.hasAttribute('data-dark-src')) {
        img.src = theme === 'dark' ? img.getAttribute('data-dark-src') : img.getAttribute('data-light-src') || src;
      }
    });
  }
  
  updateImagesForTheme(currentTheme);
  
  const toggleThemeBtn = document.getElementById("toggle-theme");
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      const newTheme = document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      
      updateImagesForTheme(newTheme);
    });
  }
});
