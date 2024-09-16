import DeliveryEdit from "./DeliveryEdit.js";

function getCardWrapper(mod) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('delivery-card');
  if (mod) {
    wrapper.classList.add(mod);
  }
  return wrapper;
}

function getTextWrapper(labelText, valueText) {
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text-wrapper');
  const label = document.createElement('span');
  label.textContent = labelText;
  const value = document.createElement('span');
  value.textContent = valueText;
  textWrapper.append(label, value);
  return textWrapper;
}

function getButton(type, text, mod) {
  const button = document.createElement('button');
  button.classList.add('btn');
  if (mod) {
    button.classList.add(mod);
  }
  button.textContent = text;
  button.type = type;
  return button;
}

function getIcon(mode) {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  switch (mode) {
    case 'inProgress':
      icon.classList.add('icon', 'icon-in-progress');
      icon.innerHTML = `<use xlink:href="img/sprite.svg#icon-in-progress"></use>`;
      break;
    case 'cancelled':
      icon.classList.add('icon', 'icon-cancelled');
      icon.innerHTML = `<use xlink:href="img/sprite.svg#icon-cancelled"></use>`;
      break;
    case 'close-btn':
      icon.classList.add('icon', 'icon-close');
      icon.innerHTML = `<use xlink:href="img/sprite.svg#icon-close"></use>`;
      break;
    default:
      icon.classList.add('icon', 'icon-completed');
      icon.innerHTML = `<use xlink:href="img/sprite.svg#icon-completed"></use>`;
      break;
  }
  return icon;
}

function getWrapper(className) {
  const wrapper = document.createElement('div');
  wrapper.classList.add(className);
  return wrapper;
}

function getH2Title(className, text) {
  const title = document.createElement('h2');
  title.classList.add(className);
  title.textContent = text;
  return title;
}

function getForm(className, action, method) {
  const form = document.createElement('form');
  form.classList.add(className);
  form.action = action;
  form.method = method;
  return form;
}

function getInput(className, type, name, id, placeholder, min) {
  const input = document.createElement('input');
  input.classList.add(className);
  input.type = type;
  input.name = name;
  input.id = id;
  input.placeholder = placeholder;
  if (min) {
    input.min = min;
  }
  return input;
}

function getSelect(className, name, id, options) {
  const select = document.createElement('select');
  select.classList.add(className);
  select.name = name;
  select.id = id;

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt[0];
    option.textContent = opt[1];
    select.append(option);
  });

  return select;
}

function getModal(data) {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  setTimeout(()=> {
    modal.classList.add('modal--active')
  });

  const modalContentWrapper = getWrapper('modal__wrapper');

  const modalTitle = getH2Title('modal__title', 'Изменить');
  const modalForm = getForm('modal__form', '#', 'POST');

  const nameInput = getInput('modal__input', 'text', 'name', 'name', 'Имя');
  const addressInput = getInput('modal__input', 'text', 'address', 'address', 'Адрес');
  const distanceInput = getInput('modal__input', 'number', 'distance', 'distance', 'Расстояние', 1);
  const selectOptions = [
    ['', '--Выберите статус доставки--'],
    ['inProgress', 'Доставляется'],
    ['completed', 'Доставлен'],
    ['cancelled', 'Отменен']
  ];
  const selectInput = getSelect('modal__select', 'status', 'status', selectOptions);

  const saveBtn = getButton('submit', 'Сохранить', 'submit-btn');
  const closeBtn = getButton('button', '', 'close-btn');
  const closeBtnIcon = getIcon('close-btn');

  closeBtn.append(closeBtnIcon);
  modalContentWrapper.append(modalTitle, modalForm, closeBtn);

  nameInput.value = data.name;
  addressInput.value = data.address;
  distanceInput.value = data.distance;
  selectInput.value = data.status;

  modalForm.append(nameInput, addressInput, distanceInput, selectInput, saveBtn);
  modal.append(modalContentWrapper);

  return modal;
}

function getTotalDistanceBtn() {
  const btn = getButton('button', 'Общее расстояние', 'total-distance-btn');
  return btn;
}

function getParagraph(className, text) {
  const paragraph = document.createElement('p');
  paragraph.classList.add(className);
  paragraph.textContent = text;
  return paragraph;
}

// Получение блока расстояния
function getTotalDistanceBlock(arr) {
  const wrapper = getWrapper('total-distance-wrapper');
  const btn = getTotalDistanceBtn();
  wrapper.append(btn);

  // Добавление текста с расстоянием
  btn.addEventListener('click', () => {
    if (document.querySelector('.total-distance-text')) {
      document.querySelector('.total-distance-text').remove();
    }
    const distanceText = getParagraph('total-distance-text', `Общее расстояние: ${DeliveryEdit.getTotalDistance(arr)} км`);
    wrapper.append(distanceText);
  });

  return wrapper;
}

export {
  getCardWrapper,
  getTextWrapper,
  getButton,
  getIcon,
  getWrapper,
  getH2Title,
  getForm,
  getInput,
  getSelect,
  getModal,
  getTotalDistanceBtn,
  getParagraph,
  getTotalDistanceBlock
}