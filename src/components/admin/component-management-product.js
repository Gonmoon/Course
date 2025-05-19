import { API_URL } from "../../api/api.js";
import "../../styles/adminProduct.scss";
import { initAlert } from "../../utils/initAlert.js";

function showError(input, message) {
  let msg = input.parentElement.querySelector('.error-msg');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'error-msg';
    msg.style.color = 'red';
    msg.style.fontSize = '12px';
    msg.style.marginTop = '0px';
    input.parentElement.appendChild(msg);
  }
  msg.textContent = message;
}

function removeError(input) {
  const msg = input.parentElement.querySelector('.error-msg');
  if (msg) msg.remove();
}

export class AdminProductComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
      <div class="container-product">
        <h2 class="container-product__title" data-i18n="product-manage-title">Управление товарами</h2>
        <div class="container-product__wrapper">
          <select id="productList" class="container__select">
            <option value="" data-i18n="product-select-default">Выберите товар</option>
          </select>
          <form id="productForm" class="product-form">
            <input type="hidden" id="product-id" class="product-form__input" />
    
            ${this.renderField('name', 'Название', 'text', 'product-field-name')}
            ${this.renderField('category', 'Категория', 'text', 'product-field-category')}
            ${this.renderField('price', 'Цена', 'number', 'product-field-price')}
            ${this.renderField('material', 'Материал', 'text', 'product-field-material')}
            ${this.renderField('style', 'Стиль', 'text', 'product-field-style')}
            ${this.renderTextarea('description', 'Описание', 'product-field-description')}
            ${this.renderField('photo_url', 'Ссылка на изображение', 'url', 'product-field-photo')}
    
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
    `;

    this.assignFields();
    this.inputs.forEach(input => input.addEventListener('input', () => this.validateForm()));
    this.addBtn.addEventListener('click', () => this.createProduct());
    this.updateBtn.addEventListener('click', () => this.updateProduct());
    this.deleteBtn.addEventListener('click', () => this.deleteProduct());

    this.loadProducts();
  }

  renderField(id, placeholder, type, i18nKey) {
    return `
      <div class="product-form__field">
        <input type="${type}" id="${id}" data-i18n="${i18nKey}" class="product-form__input" placeholder="${placeholder}" />
      </div>
    `;
  }

  renderTextarea(id, placeholder, i18nKey) {
    return `
      <div class="product-form__field">
        <textarea id="${id}" data-i18n="${i18nKey}" class="product-form__textarea" placeholder="${placeholder}"></textarea>
      </div>
    `;
  }

  assignFields() {
    this.idInput = this.querySelector('#product-id');
    this.nameInput = this.querySelector('#name');
    this.categoryInput = this.querySelector('#category');
    this.priceInput = this.querySelector('#price');
    this.materialInput = this.querySelector('#material');
    this.styleInput = this.querySelector('#style');
    this.descInput = this.querySelector('#description');
    this.photoInput = this.querySelector('#photo_url');
    this.inStockInput = this.querySelector('#in_stock');

    this.addBtn = this.querySelector('#addBtn');
    this.updateBtn = this.querySelector('#updateBtn');
    this.deleteBtn = this.querySelector('#deleteBtn');

    this.productList = this.querySelector('#productList');
    this.inputs = [
      this.nameInput, this.categoryInput, this.priceInput,
      this.materialInput, this.styleInput, this.descInput, this.photoInput
    ];
  }

  validateForm() {
    let valid = true;
    this.inputs.forEach(input => {
      const value = input.value.trim();
      if (!value || (input === this.priceInput && (isNaN(value) || value <= 0))) {
        showError(input, 'Поле обязательно');
        valid = false;
      } else {
        removeError(input);
      }
    });
    this.addBtn.disabled = !valid || !!this.idInput.value;
    this.updateBtn.disabled = !valid || !this.idInput.value;
    this.deleteBtn.disabled = !this.idInput.value;
  }

  async loadProducts() {
    try {
      const res = await fetch(API_URL);
      const products = await res.json();
      this.productList.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = 'Выберите товар';
      this.productList.appendChild(defaultOption);

      products.forEach(prod => {
        const option = document.createElement('option');
        option.value = prod.id;
        option.textContent = `${prod.name} (${prod.category}) - ${prod.price}₽`;
        this.productList.appendChild(option);
      });

      this.productList.addEventListener('change', (e) => {
        const selectedProductId = e.target.value;
        if (selectedProductId) {
          const selectedProduct = products.find(prod => prod.id == selectedProductId);
          if (selectedProduct) {
            this.fillForm(selectedProduct);
          }
        } else {
          this.resetForm();
        }
      });

    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  }

  fillForm(product) {
    this.idInput.value = product.id;
    this.nameInput.value = product.name;
    this.categoryInput.value = product.category;
    this.priceInput.value = product.price;
    this.materialInput.value = product.material;
    this.styleInput.value = product.style;
    this.descInput.value = product.description || '';
    this.photoInput.value = product.photo_url;
    this.inStockInput.checked = product.in_stock;
    this.validateForm();
  }

  getFormData() {
    return {
      name: this.nameInput.value.trim(),
      category: this.categoryInput.value.trim(),
      price: parseFloat(this.priceInput.value),
      material: this.materialInput.value.trim(),
      style: this.styleInput.value.trim(),
      description: this.descInput.value.trim(),
      photo_url: this.photoInput.value.trim(),
      in_stock: this.inStockInput.checked,
      favorites: false,
      cart: false
    };
  }

  async createProduct() {
    try {
      const data = this.getFormData();
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Ошибка при добавлении товара');
      this.resetForm();
      this.loadProducts();
      initAlert("Товар добавлен!", 3000);
    } catch (err) {
      console.error(err);
    }
  }

  async updateProduct() {
    const id = this.idInput.value;
    if (!id) return;
    try {
      const data = this.getFormData();
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Ошибка при обновлении товара');
      this.resetForm();
      this.loadProducts();
      initAlert("Товар изменён!", 3000);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteProduct() {
    const id = this.idInput.value;
    if (!id) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Ошибка при удалении товара');
      this.resetForm();
      this.loadProducts();
      initAlert("Товар удалён!", 3000);
    } catch (err) {
      console.error(err);
    }
  }

  resetForm() {
    this.idInput.value = '';
    this.nameInput.value = '';
    this.categoryInput.value = '';
    this.priceInput.value = '';
    this.materialInput.value = '';
    this.styleInput.value = '';
    this.descInput.value = '';
    this.photoInput.value = '';
    this.inStockInput.checked = false;
    this.inputs.forEach(removeError);
    this.validateForm();
  }
}
