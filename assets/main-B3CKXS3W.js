(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();class u extends HTMLElement{constructor(){super();let s=localStorage.getItem("user"),r=s?JSON.parse(s).role:"";this.innerHTML=`
          <header class="header">
            <img src="./src/img/logo.svg" alt="Logo" class="header__logo">
            <button id="burger" class="header__open-main-nav">
              <span id="burgerIcon" class="header__burger"></span>
              <span class="header__burger-text" data-i18n="menu-text">Menu</span>
            </button>
            <nav id="main-nav" class="header__nav">
              <ul class="header__nav-list">
                <li class="header__nav-point">
                  <a href="http://localhost:5173" class="header__link" data-i18n="nav-home">Home</a>
                </li>
                <li class="header__nav-point">
                  <a href="http://localhost:5173/about.html" class="header__link" data-i18n="nav-about">About</a>
                </li>
                ${s?`
                  <li class="header__nav-point">
                    <a href="http://localhost:5173/catalog.html" class="header__link" data-i18n="nav-buy">Buy</a>
                  </li>
                  <li class="header__nav-point">
                    <a href="http://localhost:5173/feedback.html" class="header__link" data-i18n="nav-feedback">Feedback</a>
                  </li>
                  <li class="header__nav-point">
                    <a href="http://localhost:5173/user.html" class="header__link" data-i18n="nav-account">Account</a>
                  </li>
                `:""}
                ${r==="admin"?`
                  <li class="header__nav-point">
                    <a href="http://localhost:5173/admin.html" class="header__link" data-i18n="nav-settings">Settings</a>
                  </li>
                `:""}
                <li class="header__nav-point">
                  <a href="#" id="logoutBtn" class="header__link header__cart-text" data-i18n="${s?"nav-logout":"nav-signin"}">
                    ${s?"LogOut":"SignIn"}
                  </a>
                </li>
              </ul>
            </nav>
          </header>
        `,document.getElementById("logoutBtn").addEventListener("click",async()=>{const e=JSON.parse(localStorage.getItem("user")),t=JSON.parse(localStorage.getItem("cart")||"[]"),a=JSON.parse(localStorage.getItem("favorite")||"[]");if(e&&e.id)try{await fetch(`http://localhost:3000/users/${e.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({cart:t,favorites:a})}),localStorage.removeItem("user"),localStorage.removeItem("cart"),localStorage.removeItem("favorite"),window.location.href="/"}catch(o){console.error("Ошибка при сохранении данных перед выходом:",o)}else window.location.href="/auth.html"})}}class h extends HTMLElement{constructor(){super()}async connectedCallback(){try{const n=(await(await fetch("http://localhost:3000/design_products")).json()).slice(0,7);this.innerHTML="";const e=document.createElement("div");e.classList.add("swiper-container");const t=document.createElement("div");t.classList.add("swiper-button-prev");const a=document.createElement("div");a.classList.add("swiper-button-next");const o=document.createElement("div");o.classList.add("swiper-wrapper"),n.forEach(c=>{const d=document.createElement("div");d.classList.add("swiper-slide"),d.innerHTML=`
          <div class="products__cart cart">
            <img src="${c.photo_url||"https://via.placeholder.com/250"}" alt="${c.name}" class="cart__img">
            <div class="cart__text">
              <p class="cart__info">${c.description.length>30?c.description.slice(0,30)+"...":c.description}</p>
              <p class="cart__price">${c.price}₽</p>
            </div>
            <p class="cart__name">${c.name}</p>
            <a href="javascript:void(0);" class="cart__button button" data-i18n="shop">Shop now</a>
          </div>
        `,o.appendChild(d)});const l=document.createElement("div");l.classList.add("swiper-pagination"),e.appendChild(t),e.appendChild(o),e.appendChild(a),e.appendChild(l),this.appendChild(e),new Swiper(e,{loop:!0,slidesPerView:1,spaceBetween:0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{320:{slidesPerView:1,spaceBetween:0},768:{slidesPerView:2,spaceBetween:5},1024:{slidesPerView:4,spaceBetween:10}},speed:500,autoplay:{delay:3e3,disableOnInteraction:!1}}),this.querySelectorAll(".cart__button").forEach(c=>{c.addEventListener("click",()=>{localStorage.getItem("user")?window.location.href="http://localhost:5173/catalog.html":window.location.href="http://localhost:5173/auth.html"})})}catch(s){console.error("Error fetching data:",s),this.innerHTML="<p>Failed to load products. Please try again later.</p>"}}}class f extends HTMLElement{constructor(){super(),this.innerHTML=`
          <footer class="footer">
            <div class="footer__skinn">
              <img src="./src/img/logo.svg" alt="logo" class="footer__logo">
              <p class="footer__wise" data-i18n="footer-wise">The wise man therefore always holds in these matters to this principle</p>
              <p class="footer__web footer__web_first" data-i18n="footer-designed">Designed by <a class="footer__link">Webestica</a></p>
              <p class="footer__web" data-i18n="footer-powered">Powered by <a class="footer__link">Webflow</a></p>
            </div>
            <div class="footer__pages">
              <h2 class="footer__header" data-i18n="footer-pages-header">Pages</h2>
              <div class="footer__lists">
                  <ul class="footer__ul-1">
                    <li class="footer__li" data-i18n="footer-page-home">Home</li>
                    <li class="footer__li" data-i18n="footer-page-home2">Home 2</li>
                    <li class="footer__li" data-i18n="footer-page-shop-all">Shop All</li>
                    <li class="footer__li" data-i18n="footer-page-our-story">Our Story</li>
                    <li class="footer__li" data-i18n="footer-page-blog">Blog</li>
                    <li class="footer__li" data-i18n="footer-page-faqs">FAQs</li>
                  </ul>
                  <ul class="footer__ul-2">
                    <li class="footer__li" data-i18n="footer-page-contact-us">Contact Us</li>
                    <li class="footer__li" data-i18n="footer-page-instructions">Instructions</li>
                    <li class="footer__li" data-i18n="footer-page-style-guide">Style Guide</li>
                    <li class="footer__li" data-i18n="footer-page-licenses">Licenses</li>
                    <li class="footer__li" data-i18n="footer-page-changelog">Changelog</li>
                  </ul>
                </div>
              </div>
            <div class="footer__contacts">
              <h2 class="footer__header" data-i18n="footer-contact-header">Contact us</h2>
              <p class="footer__contact-text" data-i18n="footer-contact-question">Have questions or suggestions?</p>
              <a href="" class="footer__contact" data-i18n="footer-contact-email">hello@webestica.com</a>
              <p class="footer__contact-text" data-i18n="footer-contact-assistance">Need assistance? Give us a call.</p>
              <a href="" class="footer__contact" data-i18n="footer-contact-phone">+01 598 269 4756</a>
            </div>
            <div class="footer__for-you">
              <h2 class="footer__header" data-i18n="footer-support-header">We’re here for you</h2>
              <div class="footer__schedule">
                <p class="footer__schedule-text" data-i18n="footer-schedule-mon-thu">Monday - Thursday: 9:30 - 18:00</p>
                <p class="footer__schedule-text" data-i18n="footer-schedule-fri">Friday: 9:30 - 15:00</p>
              </div>
              <div class="footer__networks">
                <img src="./src/img/face.svg" alt="network" class="footer__network">
                <img src="./src/img/inst.svg" alt="network" class="footer__network">
                <img src="./src/img/p.svg" alt="network" class="footer__network">
                <img src="./src/img/x.svg" alt="network" class="footer__network">
              </div>
            </div>
          </footer>
        `}}function _(){if(window.innerWidth>426)return;const i=document.getElementById("burger"),s=document.getElementById("burgerIcon"),r=document.getElementById("main-nav"),n=document.body,e=document.querySelector("widget-product"),t=()=>{r.classList.remove("is-open"),i.classList.remove("is-open"),s.classList.remove("is-open"),n.style.overflow="",e&&(e.style.display="block")};i.addEventListener("click",function(){this.classList.toggle("is-open"),r.classList.toggle("is-open"),s.classList.toggle("is-open"),this.classList.contains("is-open")?(n.style.overflow="hidden",e&&(e.style.display="none")):(n.style.overflow="",e&&(e.style.display="block"))}),document.addEventListener("click",function(o){const l=r.querySelectorAll(".header__link");!i.contains(o.target)&&!Array.from(l).some(p=>p.contains(o.target))&&t()}),r.querySelectorAll(".header__link").forEach(o=>{o.addEventListener("click",function(l){l.preventDefault(),t(),r.addEventListener("transitionend",function(){window.location.href=l.target.href},{once:!0})})})}customElements.define("widget-header",u);customElements.define("widget-product",h);customElements.define("widget-footer",f);document.addEventListener("DOMContentLoaded",()=>{_();const i=document.querySelectorAll("section");if(i){const t=new IntersectionObserver(a=>{a.forEach(o=>{o.isIntersecting&&(o.target.classList.add("visible"),t.unobserve(o.target))})},{threshold:.2});i.forEach(a=>{t.observe(a)})}const s=document.getElementById("scrollToTop");s&&(window.addEventListener("scroll",()=>{s.classList.toggle("show",window.scrollY>300)}),s.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}));const r=localStorage.getItem("theme")||"light";document.body.setAttribute("data-theme",r);function n(t){document.querySelectorAll("img").forEach(o=>{const l=o.getAttribute("src");o.hasAttribute("data-dark-src")&&(o.src=t==="dark"?o.getAttribute("data-dark-src"):o.getAttribute("data-light-src")||l)})}n(r);const e=document.getElementById("toggle-theme");e&&e.addEventListener("click",()=>{const t=document.body.getAttribute("data-theme")==="light"?"dark":"light";document.body.setAttribute("data-theme",t),localStorage.setItem("theme",t),n(t)})});
