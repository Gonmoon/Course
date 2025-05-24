import"./main-B3CKXS3W.js";import{A as u,F as m}from"./api-CdacEXtS.js";/* empty css              */import{i as f}from"./initAlert-BKKo3IwO.js";/* empty css                     */function b(o,t){let e=o.parentElement.querySelector(".error-msg");e||(e=document.createElement("div"),e.className="error-msg",e.style.color="red",e.style.fontSize="12px",e.style.marginTop="0px",o.parentElement.appendChild(e)),e.textContent=t}function y(o){const t=o.parentElement.querySelector(".error-msg");t&&t.remove()}class _ extends HTMLElement{constructor(){super()}async connectedCallback(){this.innerHTML=`
      <div class="container-product">
        <h2 class="container-product__title" data-i18n="product-manage-title">Управление товарами</h2>
        <div class="container-product__wrapper">
          <select id="productList" class="container__select">
            <option value="" data-i18n="product-select-default">Выберите товар</option>
          </select>
          <form id="productForm" class="product-form">
            <input type="hidden" id="product-id" class="product-form__input" />
    
            ${this.renderField("name","Название","text","product-field-name")}
            ${this.renderField("category","Категория","text","product-field-category")}
            ${this.renderField("price","Цена","number","product-field-price")}
            ${this.renderField("material","Материал","text","product-field-material")}
            ${this.renderField("style","Стиль","text","product-field-style")}
            ${this.renderTextarea("description","Описание","product-field-description")}
            ${this.renderField("photo_url","Ссылка на изображение","url","product-field-photo")}
    
            <label class="product-form__label">
              <input type="checkbox" id="in_stock" class="product-form__checkbox" />
              <span data-i18n="product-field-instock">В наличии</span>
            </label>
    
            <button type="button" id="addBtn" class="product-form__button product-form__button--add button" data-i18n="product-btn-add" disabled>Добавить</button>
            <button type="button" id="updateBtn" class="product-form__button product-form__button--update button" data-i18n="product-btn-update" disabled>Обновить</button>
            <button type="button" id="deleteBtn" class="product-form__button product-form__button--delete button" data-i18n="product-btn-delete" disabled>Удалить</button>
          </form>
        </div>
      </div>
    `,this.assignFields(),this.inputs.forEach(t=>t.addEventListener("input",()=>this.validateForm())),this.addBtn.addEventListener("click",()=>this.createProduct()),this.updateBtn.addEventListener("click",()=>this.updateProduct()),this.deleteBtn.addEventListener("click",()=>this.deleteProduct()),this.loadProducts()}renderField(t,e,r,a){return`
      <div class="product-form__field">
        <input type="${r}" id="${t}" data-i18n="${a}" class="product-form__input" placeholder="${e}" />
      </div>
    `}renderTextarea(t,e,r){return`
      <div class="product-form__field">
        <textarea id="${t}" data-i18n="${r}" class="product-form__textarea" placeholder="${e}"></textarea>
      </div>
    `}assignFields(){this.idInput=this.querySelector("#product-id"),this.nameInput=this.querySelector("#name"),this.categoryInput=this.querySelector("#category"),this.priceInput=this.querySelector("#price"),this.materialInput=this.querySelector("#material"),this.styleInput=this.querySelector("#style"),this.descInput=this.querySelector("#description"),this.photoInput=this.querySelector("#photo_url"),this.inStockInput=this.querySelector("#in_stock"),this.addBtn=this.querySelector("#addBtn"),this.updateBtn=this.querySelector("#updateBtn"),this.deleteBtn=this.querySelector("#deleteBtn"),this.productList=this.querySelector("#productList"),this.inputs=[this.nameInput,this.categoryInput,this.priceInput,this.materialInput,this.styleInput,this.descInput,this.photoInput]}validateForm(){let t=!0;this.inputs.forEach(e=>{const r=e.value.trim();!r||e===this.priceInput&&(isNaN(r)||r<=0)?(b(e,"Поле обязательно"),t=!1):y(e)}),this.addBtn.disabled=!t||!!this.idInput.value,this.updateBtn.disabled=!t||!this.idInput.value,this.deleteBtn.disabled=!this.idInput.value}async loadProducts(){try{const e=await(await fetch(u)).json();this.productList.innerHTML="";const r=document.createElement("option");r.value="",r.textContent="Выберите товар",this.productList.appendChild(r),e.forEach(a=>{const s=document.createElement("option");s.value=a.id,s.textContent=`${a.name} (${a.category}) - ${a.price}₽`,this.productList.appendChild(s)}),this.productList.addEventListener("change",a=>{const s=a.target.value;if(s){const i=e.find(n=>n.id==s);i&&this.fillForm(i)}else this.resetForm()})}catch(t){console.error("Ошибка загрузки товаров:",t)}}fillForm(t){this.idInput.value=t.id,this.nameInput.value=t.name,this.categoryInput.value=t.category,this.priceInput.value=t.price,this.materialInput.value=t.material,this.styleInput.value=t.style,this.descInput.value=t.description||"",this.photoInput.value=t.photo_url,this.inStockInput.checked=t.in_stock,this.validateForm()}getFormData(){return{name:this.nameInput.value.trim(),category:this.categoryInput.value.trim(),price:parseFloat(this.priceInput.value),material:this.materialInput.value.trim(),style:this.styleInput.value.trim(),description:this.descInput.value.trim(),photo_url:this.photoInput.value.trim(),in_stock:this.inStockInput.checked,favorites:!1,cart:!1}}async createProduct(){try{const t=this.getFormData();if(!(await fetch(u,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok)throw new Error("Ошибка при добавлении товара");this.resetForm(),this.loadProducts(),f("Товар добавлен!",3e3)}catch(t){console.error(t)}}async updateProduct(){const t=this.idInput.value;if(t)try{const e=this.getFormData();if(!(await fetch(`${u}/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw new Error("Ошибка при обновлении товара");this.resetForm(),this.loadProducts(),f("Товар изменён!",3e3)}catch(e){console.error(e)}}async deleteProduct(){const t=this.idInput.value;if(t)try{if(!(await fetch(`${u}/${t}`,{method:"DELETE"})).ok)throw new Error("Ошибка при удалении товара");this.resetForm(),this.loadProducts(),f("Товар удалён!",3e3)}catch(e){console.error(e)}}resetForm(){this.idInput.value="",this.nameInput.value="",this.categoryInput.value="",this.priceInput.value="",this.materialInput.value="",this.styleInput.value="",this.descInput.value="",this.photoInput.value="",this.inStockInput.checked=!1,this.inputs.forEach(y),this.validateForm()}}customElements.define("management-product-component",_);class I extends HTMLElement{constructor(){super()}async connectedCallback(){this.innerHTML=`
      <div class="container">
        <div class="container__wrapper">
          <select id="userSelect" class="container__select">
            <option value="" data-i18n="admin-feedback-all-users">Все пользователи</option>
          </select>
          <select id="productSelect" class="container__select">
            <option value="" data-i18n="admin-feedback-all-products">Все товары</option>
          </select>
        </div>
        <ul class="container__feedbacks" id="feedbacks"></ul>
      </div>
    `,await this.populateUsers(),await this.populateProducts(),await this.loadFeedbacks(),this.querySelector("#userSelect").addEventListener("change",()=>this.loadFeedbacks()),this.querySelector("#productSelect").addEventListener("change",()=>this.loadFeedbacks())}async populateUsers(){try{const e=await(await fetch(m)).json(),r=this.querySelector("#userSelect");[...new Set(e.map(s=>s.nickname))].forEach(s=>{const i=document.createElement("option");i.value=s,i.textContent=s,r.appendChild(i)})}catch(t){console.error("Ошибка загрузки пользователей:",t)}}async populateProducts(){try{const e=await(await fetch(u)).json(),r=this.querySelector("#productSelect");e.forEach(a=>{const s=document.createElement("option");s.value=a.name,s.textContent=a.name,r.appendChild(s)})}catch(t){console.error("Ошибка загрузки товаров:",t)}}async loadFeedbacks(){const t=this.querySelector("#userSelect").value,e=this.querySelector("#productSelect").value,r=this.querySelector("#feedbacks");r.innerHTML="";try{(await(await fetch(m)).json()).forEach(i=>{const n=i.nickname,d=i[n],p=i.id;Array.isArray(d)&&(!t||t===n)&&d.forEach((l,h)=>{if(!e||l.startsWith(`${e}:`)||l.startsWith(`${e} —`)){const c=document.createElement("li");c.className="container__feedback",c.innerHTML=`
                  <span>${n}: ${l}</span>
                  <button 
                    class="container__delete button" 
                    data-user="${n}" 
                    data-id="${p}" 
                    data-index="${h}"
                    data-i18n="admin-feedback-delete"
                  >Удалить</button>
                `,r.appendChild(c)}})}),r.querySelectorAll(".container__delete").forEach(i=>{i.addEventListener("click",async n=>{const d=n.target.dataset.user,p=n.target.dataset.id,l=Number(n.target.dataset.index);try{const c=[...(await(await fetch(`${m}/${p}`)).json())[d]];c.splice(l,1),await fetch(`${m}/${p}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({[d]:c})}),this.loadFeedbacks(),f("Отзыв удалён!",3e3)}catch(h){console.error("Ошибка удаления отзыва:",h)}})})}catch(a){console.error("Ошибка загрузки отзывов:",a)}}}customElements.define("admin-feedback-component",I);
