import { getCardWrapper, getTextWrapper } from "./components.js";

export default class Delivery {

  constructor(name, address, distance) {
    this.name = name;
    this.address = address;
    this.distance = distance;
  }

  getCard() {
    this.wrapper = getCardWrapper();
    this.nameWrapper = getTextWrapper('Имя', this.name);
    this.addressWrapper = getTextWrapper('Адрес', this.address);
    this.distanceWrapper = getTextWrapper('Расстояние', `${this.distance} км`);

    this.wrapper.append(this.nameWrapper, this.addressWrapper, this.distanceWrapper);
    return this.wrapper;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value === '' || !value) {
      this._name = 'N/A';
    } else {
      this._name = value;
    }
  }

  get address() {
    return this._address;
  }

  set address(value) {
    if (value === '' || !value) {
      this._address = 'N/A';
    } else {
      this._address = value;
    }
  }

  get distance() {
    return this._distance;
  }

  set distance(value) {
    if (value === '' || !value) {
      this._distance = 'N/A';
    } else {
    this._distance = value;
    }
  }
}