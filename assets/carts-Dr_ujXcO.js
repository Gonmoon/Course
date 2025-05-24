import"./main-B3CKXS3W.js";import{r as u}from"./renderPagination-DiElxoko.js";import{A as l,O as g}from"./api-CdacEXtS.js";import{C as _,i as y}from"./component-popup-DlzYQJtm.js";customElements.define("widget-popup",_);document.addEventListener("DOMContentLoaded",()=>{const s=JSON.parse(localStorage.getItem("cart"))||[];if(s.length===0){const c=document.getElementById("catalog");c.innerHTML='<p class="no-products">Товары не найдены</p>'}else{const n=`?${s.map(e=>e.id).map(e=>`id=${e}`).join("&")}`;u(!0,n,1,l)}document.getElementById("order").addEventListener("click",()=>{const n=`?${s.map(e=>e.id).map(e=>`id=${e}`).join("&")}`;fetch(`${l}${n}`).then(e=>e.json()).then(e=>{let a='<div class="order">';e.map(t=>t.name).forEach((t,o)=>{a+=`
                        <div class="order__product">
                            <p class="order__name">${t}</p>
                            <input type="number" min="1" max="40" step="1" value="1" 
                                   class="order__input" data-price="${e[o].price}"
                                   onchange="updateTotal()">
                        </div>
                    `}),a+='<hr class="order__hr">';const p=e.reduce((t,o)=>t+o.price,0);a+=`
                    <div class="order__info">
                        <p class="order__sum">Итого: <span id="total-sum">${p}</span>₽</p>
                        <span class="order__span" id="result"></span>
                    </div>
                    <button class="order__button" id="execute">Заказать</button>
                </div>`,y("Оформление заказа",a),window.updateTotal=function(){const t=document.querySelectorAll(".order__input");let o=0;t.forEach(r=>{const d=parseInt(r.value)||0,m=parseFloat(r.dataset.price)||0;o+=d*m}),document.getElementById("total-sum").textContent=o};const i=document.getElementById("execute");i.addEventListener("click",()=>{const t=document.getElementById("result");t.innerHTML="Заказ оформлен",i.style.display="none";const o=JSON.parse(localStorage.getItem("user")||"{}"),r=JSON.parse(localStorage.getItem("cart")||"[]");fetch(`${g}${n}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({[o.nickname]:r})}),localStorage.removeItem("cart");const d=document.getElementById("catalog");d.innerHTML='<p class="no-products">Товары не найдены</p>'})})})});
