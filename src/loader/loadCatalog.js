import { initCatalog } from "../utils/catalog/initCatalog.js";

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if(preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initCatalog();
})