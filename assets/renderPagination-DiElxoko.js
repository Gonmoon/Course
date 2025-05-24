import{A as f}from"./api-CdacEXtS.js";const r=document.getElementById("catalog");async function g(p){if(r.innerHTML="",p.length===0){r.innerHTML='<p class="no-products">Товары не найдены</p>';return}p.forEach(a=>{r.innerHTML+=`
            <div class="catalog-cart"
                 data-name="${a.name}"
                 data-price="${a.price}₽"
                 data-description="${a.description}"
                 data-stock="${a.in_stock?"✓ В наличии":"✗ Нет в наличии"}"
                 data-style="${a.style}">
                <img src="${a.photo_url||"https://via.placeholder.com/250"}" alt="product" class="catalog-cart__img">
                <div class="catalog-cart__text-wrapper">
                    <p class="catalog-cart__name">${a.name}</p>
                    <p class="catalog-cart__price">${a.price}₽</p>
                </div>
                <p class="catalog-cart__description">${a.description}</p>
                <p>${a.in_stock?"✓ В наличии":"✗ Нет в наличии"}</p>
                <p>Стиль: ${a.style}</p>
                <div class="catalog-cart__buttons">
                    <button class="catalog-cart__button favorite button" data-id="${a.id}"></button>
                    <button class="catalog-cart__button cart button" data-id="${a.id}">В корзину</button>
                </div>
            </div>
        `});function i(a,e){const t=document.getElementById(a);t&&(t.textContent=e,t.classList.remove("pop-animation"),t.offsetWidth,t.classList.add("pop-animation"))}function s(){const a=JSON.parse(localStorage.getItem("favorite"))||[],e=JSON.parse(localStorage.getItem("cart"))||[];i("favorite-counter",a.length),i("cart-counter",e.length)}function l(){const a=r.querySelectorAll(".favorite");let e=JSON.parse(localStorage.getItem("favorite"))||[];r.addEventListener("click",t=>{if(t.target&&t.target.classList.contains("favorite")){const o=t.target,n=o.dataset.id;if(e.some(c=>c.id===n))e=e.filter(c=>c.id!==n),o.textContent="В избранное";else{const c={id:n};e.push(c),o.textContent="Убрать из избранного"}localStorage.setItem("favorite",JSON.stringify(e)),s()}}),a.forEach(t=>{const o=t.dataset.id,n=e.some(c=>c.id===o);t.textContent=n?"Убрать из избранного":"В избранное"})}function d(){const a=r.querySelectorAll(".cart");let e=JSON.parse(localStorage.getItem("cart"))||[];r.addEventListener("click",t=>{if(t.target&&t.target.classList.contains("cart")){const o=t.target,n=o.dataset.id;if(e.some(c=>c.id===n))e=e.filter(c=>c.id!==n),o.textContent="В корзину";else{const c={id:n};e.push(c),o.textContent="Убрать из корзины"}localStorage.setItem("cart",JSON.stringify(e)),s()}}),a.forEach(t=>{const o=t.dataset.id,n=e.some(c=>c.id===o);t.textContent=n?"Убрать из корзины":"В корзину"})}l(),d(),s()}const u=document.getElementById("pagination");async function _(p=!1,i="",s=1,l=f){fetch(`${l}${i}`).then(d=>d.json()).then(d=>{let a=Math.ceil(d.length/10),e=`${l}?_page=${s}&_limit=10&${i.slice(1)}`;p===!0&&fetch(e).then(t=>t.json()).then(t=>g(t)),u.innerHTML="";for(let t=1;t<=a;t++){const o=document.createElement("button");o.textContent=t,o.className="pagination__button",t===s&&o.classList.add("pagination__button_active"),o.addEventListener("click",()=>{s=t,e=`${l}?_page=${t}&_limit=10&${i.slice(1)}`,fetch(e).then(n=>n.json()).then(n=>g(n)).then(()=>_(!1,i,s))}),u.appendChild(o)}})}export{_ as r};
