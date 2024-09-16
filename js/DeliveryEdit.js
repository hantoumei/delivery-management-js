import { getIcon, getCardWrapper, getTextWrapper, getButton, getModal } from "./components.js";
import Delivery from "./Delivery.js";
import { renderContent, deliveryArr } from './index.js';

// Новый наследуюший класс
export default class DeliveryEdit extends Delivery {

  // Конструктор класса
  constructor(name, address, distance, status) {
    super(name, address, distance);
    this.status = status;
  }

  // Получение карточки
  getCard() {
    switch (this.status) {
      case 'inProgress':
        this.wrapper = getCardWrapper('delivery-card--in-progress');
        this.icon = getIcon('inProgress');
        break;
      case 'cancelled':
        this.wrapper = getCardWrapper('delivery-card--cancelled');
        this.icon = getIcon('cancelled');
        break;
      case 'completed':
        this.wrapper = getCardWrapper('delivery-card--completed');
        this.icon = getIcon('completed');
        break;
      default:
        this.wrapper = getCardWrapper();
        break;
    }

    this.nameWrapper = getTextWrapper('Имя', this.name);
    this.addressWrapper = getTextWrapper('Адрес', this.address);
    this.distanceWrapper = getTextWrapper('Расстояние', `${this.distance} км`);
    this.editBtn = this.getEditBtn();

    this.wrapper.append(this.nameWrapper, this.addressWrapper, this.distanceWrapper, this.editBtn);

    if(this.icon) {
      this.wrapper.append(this.icon);
    }

    return this.wrapper;
  }

  // Сеттер и геттер нового ключа
  get status() {
    return this._status;
  }

  set status(value) {
    if (!value) {
      this._status = '';
    } else {
      this._status = value;
    }
  }

  // Получение кнопки редактирования
  getEditBtn() {
    const editBtn = getButton('button', 'Изменить');

    // Создание модального окна
    editBtn.addEventListener('click', () => {
      const main = document.querySelector('main');
      const app = document.querySelector('.app');
      app.classList.add('app--modal')
      main.append(getModal(this));

      const form = document.querySelector('.modal__form');
      const closeBtn = document.querySelector('.close-btn');

      // Сабмит редактирования
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Замена исходных данных массива на новые
        const newData = Object.fromEntries(new FormData(form));
        this.name = newData.name;
        this.address = newData.address;
        this.distance = +newData.distance;
        this.status = newData.status;

        let index = deliveryArr.indexOf(this);
        deliveryArr[index] = new DeliveryEdit(newData.name, newData.address, +newData.distance, newData.status);

        // Отрисовка нового массива
        this.closeModal();
        app.innerHTML = '';
        renderContent(deliveryArr);
      })

      // Закрытие модального окна
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      })

      document.addEventListener('keydown', (event) => {
        if (event.key === "Escape" && document.querySelector('.modal')) {
          this.closeModal();
        }
      })
    })

    return editBtn;
  }

  closeModal() {
    document.querySelector('.modal').remove();
    document.querySelector('.app').classList.remove('app--modal');
  }

  // Получение общего расстояния
  static getTotalDistance(arr) {
    let total = 0;
    arr.forEach(item => {
      if (item._status != 'cancelled') {
        total = total + item.distance;
      }
    });
    return total;
  }
}
