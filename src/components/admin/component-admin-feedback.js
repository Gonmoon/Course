import { API_URL, ORDER_URL, FEEDBACK_URL } from "../../api/api.js";
import "../../styles/feedback/style.scss";

import { initAlert } from "../../utils/initAlert.js";

import { AdminProductComponent } from "./component-management-product.js";
customElements.define('management-product-component', AdminProductComponent);

class AdminFeedbackComponent extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = `
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
    `;

    await this.populateUsers();
    await this.populateProducts();
    await this.loadFeedbacks();

    this.querySelector('#userSelect').addEventListener('change', () => this.loadFeedbacks());
    this.querySelector('#productSelect').addEventListener('change', () => this.loadFeedbacks());
  }

  async populateUsers() {
    try {
      const res = await fetch(FEEDBACK_URL);
      const data = await res.json();
      const userSelect = this.querySelector('#userSelect');

      const nicknames = [...new Set(data.map(entry => entry.nickname))];
      nicknames.forEach(nickname => {
        const option = document.createElement('option');
        option.value = nickname;
        option.textContent = nickname;
        userSelect.appendChild(option);
      });
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
    }
  }

  async populateProducts() {
    try {
      const res = await fetch(API_URL);
      const products = await res.json();
      const productSelect = this.querySelector('#productSelect');

      products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name;
        option.textContent = product.name;
        productSelect.appendChild(option);
      });
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  }

  async loadFeedbacks() {
    const selectedUser = this.querySelector('#userSelect').value;
    const selectedProduct = this.querySelector('#productSelect').value;
    const list = this.querySelector('#feedbacks');
    list.innerHTML = '';

    try {
      const res = await fetch(FEEDBACK_URL);
      const data = await res.json();

      data.forEach(entry => {
        const nickname = entry.nickname;
        const feedbacks = entry[nickname];
        const feedbackId = entry.id;

        if (Array.isArray(feedbacks)) {
          if (!selectedUser || selectedUser === nickname) {
            feedbacks.forEach((fb, index) => {
              const matchesProduct =
                !selectedProduct ||
                fb.startsWith(`${selectedProduct}:`) ||
                fb.startsWith(`${selectedProduct} —`);

              if (matchesProduct) {
                const li = document.createElement('li');
                li.className = 'container__feedback';
                li.innerHTML = `
                  <span>${nickname}: ${fb}</span>
                  <button 
                    class="container__delete button" 
                    data-user="${nickname}" 
                    data-id="${feedbackId}" 
                    data-index="${index}"
                    data-i18n="admin-feedback-delete"
                  >Удалить</button>
                `;
                list.appendChild(li);
              }
            });
          }
        }
      });

      list.querySelectorAll('.container__delete').forEach(button => {
        button.addEventListener('click', async (e) => {
          const nickname = e.target.dataset.user;
          const feedbackId = e.target.dataset.id;
          const index = Number(e.target.dataset.index);

          try {
            const res = await fetch(`${FEEDBACK_URL}/${feedbackId}`);
            const entry = await res.json();
            const updated = [...entry[nickname]];
            updated.splice(index, 1);

            await fetch(`${FEEDBACK_URL}/${feedbackId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ [nickname]: updated })
            });

            this.loadFeedbacks();
            initAlert("Отзыв удалён!", 3000);
          } catch (err) {
            console.error('Ошибка удаления отзыва:', err);
          }
        });
      });
    } catch (err) {
      console.error('Ошибка загрузки отзывов:', err);
    }
  }
}

customElements.define('admin-feedback-component', AdminFeedbackComponent);
