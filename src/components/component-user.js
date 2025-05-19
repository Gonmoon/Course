import { USERS_URL } from "../api/api.js";
import "../styles/adminProduct.scss";
import { initAlert } from "../utils/initAlert.js";


export class ComponentUser extends HTMLElement {
  constructor() {
    super();
    this.currentUser = null;
    this.fullUserData = null;
  }

  connectedCallback() {
    const stored = localStorage.getItem("user");
    if (!stored) {
      this.innerHTML = `<p class="container-product__title">Пользователь не авторизован</p>`;
      return;
    }

    this.currentUser = JSON.parse(stored);
    this.renderUI();
    this.loadUserData();
    this.addEventListeners();
  }

  renderUI() {
    this.innerHTML = `
      <div class="container-product">
        <h2 class="container-product__title">${this.currentUser.nickname}</h2>
        <div class="container-product__wrapper">
          <form id="userForm" class="product-form">
            <input type="hidden" id="user-id" class="product-form__input" />

            ${this.renderField('firstName', 'Имя', 'text')}
            ${this.renderField('phone', 'Телефон', 'text')}
            ${this.renderField('email', 'Email', 'email')}
            ${this.renderField('nickname', 'Никнейм', 'text')}
            ${this.renderField('password', 'Пароль', 'text')}

            <button type="button" id="updateBtn" class="product-form__button product-form__button--update button">Обновить</button>
            <button type="button" id="deleteBtn" class="product-form__button product-form__button--delete button">Удалить</button>
          </form>
        </div>
      </div>
    `;
  }

  renderField(id, label, type = 'text') {
    return `
      <label for="${id}" class="product-form__label">${label}</label>
      <input type="${type}" id="${id}" class="product-form__input" />
    `;
  }

  async loadUserData() {
    try {
      const res = await fetch(`${USERS_URL}/${this.currentUser.id}`);
      if (!res.ok) throw new Error();
      const user = await res.json();
      this.fullUserData = user;
      this.fillForm(user);
    } catch {
      initAlert("Не удалось загрузить данные пользователя", "error");
    }
  }

  fillForm(user) {
    this.querySelector("#user-id").value = user.id;
    this.querySelector("#firstName").value = user.firstName || '';
    this.querySelector("#phone").value = user.phone || '';
    this.querySelector("#email").value = user.email || '';
    this.querySelector("#nickname").value = user.nickname || '';
    this.querySelector("#password").value = user.password || '';
  }

  addEventListeners() {
    this.querySelector("#updateBtn").addEventListener("click", () => this.handleUpdate());
    this.querySelector("#deleteBtn").addEventListener("click", () => this.handleDelete());
  }

  async handleUpdate() {
    const id = +this.querySelector("#user-id").value;
    const formUser = this.getFormData();

    const validation = this.validateForm(formUser);
    if (!validation.valid) {
      initAlert(validation.message, "error");
      return;
    }

    const updatedUser = {
      ...this.fullUserData,
      ...formUser,
      role: this.currentUser.role
    };

    try {
      const res = await fetch(`${USERS_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify({
          id,
          email: updatedUser.email,
          nickname: updatedUser.nickname,
          role: updatedUser.role
        }));
        initAlert("Данные обновлены", "success");
        this.fullUserData = updatedUser;
      } else {
        throw new Error();
      }
    } catch {
      initAlert("Ошибка при обновлении", "error");
    }
  }

  async handleDelete() { // изменить, только LS
    const id = +this.querySelector("#user-id").value;

    try {
      const res = await fetch(`${USERS_URL}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        localStorage.removeItem("user");
        initAlert("Пользователь удалён. localStorage очищен.", "success");
        this.innerHTML = `<p class="container-product__title">Пользователь удалён</p>`;
      } else {
        throw new Error();
      }
    } catch {
      initAlert("Ошибка при удалении", "error");
    }
  }

  getFormData() {
    return {
      firstName: this.querySelector("#firstName").value.trim(),
      phone: this.querySelector("#phone").value.trim(),
      email: this.querySelector("#email").value.trim(),
      nickname: this.querySelector("#nickname").value.trim(),
      password: this.querySelector("#password").value.trim()
    };
  }

  validateForm(user) {
    const phoneRegex = /^\+375(25|29|33|44)\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.firstName || user.firstName.length < 2) {
      return { valid: false, message: "Имя должно содержать минимум 2 символа" };
    }

    if (!phoneRegex.test(user.phone)) {
      return { valid: false, message: "Телефон должен быть в формате +375XXXXXXXXX" };
    }

    if (!emailRegex.test(user.email)) {
      return { valid: false, message: "Некорректный email-адрес" };
    }

    if (!user.nickname || user.nickname.length < 3) {
      return { valid: false, message: "Никнейм должен содержать минимум 3 символа" };
    }

    if (!user.password || user.password.length < 6) {
      return { valid: false, message: "Пароль должен содержать минимум 6 символов" };
    }

    return { valid: true };
  }
}

customElements.define("component-user", ComponentUser);