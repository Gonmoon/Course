import"./main-B3CKXS3W.js";import{U as s}from"./api-CdacEXtS.js";/* empty css                     */import{i}from"./initAlert-BKKo3IwO.js";class n extends HTMLElement{constructor(){super(),this.currentUser=null,this.fullUserData=null}connectedCallback(){const e=localStorage.getItem("user");if(!e){this.innerHTML='<p class="container-product__title" data-i18n="not-authorized">Пользователь не авторизован</p>';return}this.currentUser=JSON.parse(e),this.renderUI(),this.loadUserData(),this.addEventListeners()}renderUI(){this.innerHTML=`
      <div class="container-product">
        <h2 class="container-product__title">${this.currentUser.nickname}</h2>
        <div class="container-product__wrapper">
          <form id="userForm" class="product-form">
            <input type="hidden" id="user-id" class="product-form__input" />
  
            ${this.renderField("firstName","Имя","text","form-firstname")}
            ${this.renderField("phone","Телефон","text","form-phone")}
            ${this.renderField("email","Email","email","form-email")}
            ${this.renderField("nickname","Никнейм","text","form-nickname")}
            ${this.renderField("password","Пароль","text","form-password")}
  
            <button type="button" id="updateBtn" class="product-form__button product-form__button--update button" data-i18n="btn-update">Обновить</button>
            <button type="button" id="deleteBtn" class="product-form__button product-form__button--delete button" data-i18n="btn-delete">Сброс настроек</button>
          </form>
        </div>
      </div>
    `}renderField(e,t,a="text",r=""){return`
      <label for="${e}" class="product-form__label" ${r?`data-i18n="${r}"`:""}>${t}</label>
      <input type="${a}" id="${e}" class="product-form__input" />
    `}async loadUserData(){try{const e=await fetch(`${s}/${this.currentUser.id}`);if(!e.ok)throw new Error;const t=await e.json();this.fullUserData=t,this.fillForm(t)}catch{i("Не удалось загрузить данные пользователя","error")}}fillForm(e){this.querySelector("#user-id").value=e.id,this.querySelector("#firstName").value=e.firstName||"",this.querySelector("#phone").value=e.phone||"",this.querySelector("#email").value=e.email||"",this.querySelector("#nickname").value=e.nickname||"",this.querySelector("#password").value=e.password||""}addEventListeners(){this.querySelector("#updateBtn").addEventListener("click",()=>this.handleUpdate()),this.querySelector("#deleteBtn").addEventListener("click",()=>this.handleDelete())}async handleUpdate(){const e=+this.querySelector("#user-id").value,t=this.getFormData(),a=this.validateForm(t);if(!a.valid){i(a.message,"error");return}const r={...this.fullUserData,...t,role:this.currentUser.role};try{if((await fetch(`${s}/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)localStorage.setItem("user",JSON.stringify({id:e,email:r.email,nickname:r.nickname,role:r.role})),i("Данные обновлены","success"),this.fullUserData=r;else throw new Error}catch{i("Ошибка при обновлении","error")}}async handleDelete(){localStorage.setItem("theme","light"),localStorage.setItem("lang","en"),i("Установлены значения по умолчанию"),setTimeout(()=>{location.reload()},1e3)}getFormData(){return{firstName:this.querySelector("#firstName").value.trim(),phone:this.querySelector("#phone").value.trim(),email:this.querySelector("#email").value.trim(),nickname:this.querySelector("#nickname").value.trim(),password:this.querySelector("#password").value.trim()}}validateForm(e){const t=/^\+375(25|29|33|44)\d{7}$/,a=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!e.firstName||e.firstName.length<2?{valid:!1,message:"Имя должно содержать минимум 2 символа"}:t.test(e.phone)?a.test(e.email)?!e.nickname||e.nickname.length<3?{valid:!1,message:"Никнейм должен содержать минимум 3 символа"}:!e.password||e.password.length<6?{valid:!1,message:"Пароль должен содержать минимум 6 символов"}:{valid:!0}:{valid:!1,message:"Некорректный email-адрес"}:{valid:!1,message:"Телефон должен быть в формате +375XXXXXXXXX"}}}customElements.define("component-user",n);
