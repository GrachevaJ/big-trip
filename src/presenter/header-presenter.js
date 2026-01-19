import MainInfoView from '../view/main-info-view.js';
import {remove, render, RenderPosition } from '../framework/render.js';


export default class HeaderPresenter {
  #headerContainer = null;
  #headerComponent = null;

  constructor(headerContainer) {
    this.#headerContainer = headerContainer;
  }

  init = (points) => {
    this.#headerComponent = new MainInfoView(points);
    render(this.#headerComponent, this.#headerContainer, RenderPosition.AFTERBEGIN);
  };

  destroy = () => {
    if (this.#headerComponent === null) {
      return;
    }

    remove(this.#headerComponent);
    this.#headerComponent = null;
  };
}
