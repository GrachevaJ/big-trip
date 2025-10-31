import { render, RenderPosition, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';


export default class PointNewPresenter {
  #pointsContainer = null;
  #changeData = null;
  #editPointComponent = null;
  #destroyCallback = null;

  #point = null;

  constructor(pointsContainer, changeData) {
    this.#pointsContainer = pointsContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#editPointComponent !== null) {
      return;
    }

    this.#editPointComponent = new EditPointView();

    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setClickHandler(this.#handleCloseClick);


    render(this.#editPointComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#editPointComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#editPointComponent);
    this.#editPointComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleCloseClick = () => {
    this.destroy();
  };


}
