export function initBurger() {

  if (window.innerWidth > 426) return; 
  
  const burger = document.getElementById("burger");
  const burgerIcon = document.getElementById("burgerIcon");
  const nav = document.getElementById("main-nav");
  const body = document.body;
  const widgetProduct = document.querySelector("widget-product");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burgerIcon.classList.remove("is-open");
    body.style.overflow = "";
    if (widgetProduct) {
      widgetProduct.style.display = "block";
    }
  };

  burger.addEventListener("click", function () {
    this.classList.toggle("is-open");
    nav.classList.toggle("is-open");
    burgerIcon.classList.toggle("is-open");

    if (this.classList.contains("is-open")) {
      body.style.overflow = "hidden";
      if (widgetProduct) {
        widgetProduct.style.display = "none";
      }
    } else {
      body.style.overflow = "";
      if (widgetProduct) {
        widgetProduct.style.display = "block";
      }
    }
  });

  document.addEventListener("click", function (e) {
    const links = nav.querySelectorAll(".header__link");
    if (!burger.contains(e.target) && !Array.from(links).some(link => link.contains(e.target))) {
      closeMenu();
    }
  });

  const links = nav.querySelectorAll(".header__link");
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      closeMenu();

      nav.addEventListener("transitionend", function () {
        window.location.href = e.target.href;
      }, { once: true });
    });
  });
}
