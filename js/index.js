import DeliveryEdit from "./DeliveryEdit.js";
import { getTotalDistanceBlock } from "./components.js";

// Исходный массив доставок
export const deliveryArr = [
  new DeliveryEdit('Ольга', 'ул. Вымыслов, д. 12', 8, 'completed'),
  new DeliveryEdit('Дмитрий', 'ул. Задачная, д. 7', 3, 'inProgress'),
  new DeliveryEdit('Оля', 'ул. Ткачей, д. 43', 11, 'inProgress'),
  new DeliveryEdit('Василий', 'ул. Ленина, д. 15', 2),
  new DeliveryEdit('Сергей', 'ул. Гоголя, д. 3', 1, 'inProgress'),
  new DeliveryEdit('Мария', 'ул. Пушкина, д. 84', 5, 'completed'),
]

//Установка значения
deliveryArr[2].status = 'cancelled';

// Отрисовка карточек
export function renderContent(arr) {
  const app = document.querySelector('.app');
  arr.forEach((item) => {
    app.append(item.getCard());
  })
  app.append(getTotalDistanceBlock(arr))
}

// Вызов функции при загрузке
document.addEventListener('DOMContentLoaded', () => {
  renderContent(deliveryArr);
})
