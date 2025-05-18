export class ComponentProduct extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
      const response = await fetch('http://localhost:3000/design_products');
      const items = await response.json();

      const limitedItems = items.slice(0, 7);

      this.innerHTML = '';

      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-container');

      const prevButton = document.createElement('div');
      prevButton.classList.add('swiper-button-prev');
      
      const nextButton = document.createElement('div');
      nextButton.classList.add('swiper-button-next');
      
      const swiperSlideWrapper = document.createElement('div');
      swiperSlideWrapper.classList.add('swiper-wrapper');

      limitedItems.forEach(item => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
        swiperSlide.innerHTML = `
          <div class="products__cart cart">
            <img src="${item.photo_url || 'https://via.placeholder.com/250'}" alt="${item.name}" class="cart__img">
            <div class="cart__text">
              <p class="cart__info">${item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description}</p>
              <p class="cart__price">${item.price}₽</p>
            </div>
            <p class="cart__name">${item.name}</p>
            <a href="javascript:void(0);" class="cart__button button">Shop now</a>
          </div>
        `;
        swiperSlideWrapper.appendChild(swiperSlide);
      });

      const paginationElement = document.createElement('div');
      paginationElement.classList.add('swiper-pagination');

      swiperWrapper.appendChild(prevButton);
      swiperWrapper.appendChild(swiperSlideWrapper);
      swiperWrapper.appendChild(nextButton);
      swiperWrapper.appendChild(paginationElement);
      this.appendChild(swiperWrapper);

      new Swiper(swiperWrapper, {
        loop: true,         
        slidesPerView: 1,
        spaceBetween: 0,    
        navigation: {       
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true, 
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        },
        speed: 500,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      });

      const shopNowButtons = this.querySelectorAll('.cart__button');
      shopNowButtons.forEach(button => {
        button.addEventListener('click', () => {
          const user = localStorage.getItem('user');
          if (!user) {
            window.location.href = 'http://localhost:5173/auth.html';
          } else {
            window.location.href = 'http://localhost:5173/catalog.html';
          }
        });
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    }
  }
}
