import"./main-B3CKXS3W.js";import{O as _,A as $,F as c}from"./api-CdacEXtS.js";/* empty css              */import{i as x}from"./initAlert-BKKo3IwO.js";class S extends HTMLElement{constructor(){super()}async connectedCallback(){const e=JSON.parse(localStorage.getItem("user")||"{}").nickname;if(!e){this.innerHTML="<p>Пользователь не найден</p>";return}const s=(await(await fetch(_)).json()).flatMap(t=>t[e]||[]).map(t=>t.id),n=(await(await fetch(`${$}?id=${s.join("&id=")}`)).json()).map(t=>`<option value="${t.id}">${t.name}</option>`).join("");this.innerHTML=`
      <div class="container">
        <div class="container__wrapper">
          <select name="product" id="product" class="container__select">
            ${n}
          </select>
          <textarea
            name="feedback"
            id="text"
            class="container__text"
            placeholder="Ваш отзыв..."
            data-i18n-placeholder="feedback-placeholder"
          ></textarea>
          <button class="container__button button" data-i18n="btn-send">Send</button>
        </div>
        <ul class="container__feedbacks" id="feedbacks"></ul>
      </div>
    `,this.loadFeedbacks(),this.querySelector(".container__button").addEventListener("click",async()=>{var m;const t=this.querySelector("#text").value.trim(),u=(m=this.querySelector("#product").selectedOptions[0])==null?void 0:m.textContent;if(t&&u){const i=`${u} — ${t}`,k=this.querySelector("#feedbacks"),d=document.createElement("li");d.className="container__feedback",d.textContent=`${e}: ${i}`,k.appendChild(d),this.querySelector("#text").value="";try{const f=await(await fetch(`${c}?nickname=${e}`)).json();if(f.length>0){const[b]=f,y=[...b[e],i];await fetch(`${c}/${b.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({[e]:y})})}else await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({nickname:e,[e]:[i]})});x("Отзыв оставлен!")}catch(h){console.error("Ошибка при отправке отзыва:",h)}}})}async loadFeedbacks(){try{const e=await(await fetch(c)).json();if(e.length>0){const l=this.querySelector("#feedbacks");e.forEach(o=>{const s=o.nickname,r=o[s];Array.isArray(r)&&r.forEach(p=>{const n=document.createElement("li");n.className="container__feedback",n.textContent=`${s}: ${p}`,l.appendChild(n)})})}}catch(a){console.error("Ошибка загрузки отзывов:",a)}}}customElements.define("feedback-component",S);
