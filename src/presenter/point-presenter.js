import { render, replace } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointView from '../view/edit-point-view.js';

export default class PointPresenter {
  #pointsContainer = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;

  constructor(pointsContainer) {
    this.#pointsContainer = pointsContainer;
  }

  init = (point) => {
    this.#point = point;

    this.#pointComponent = new PointView(point);
    this.#editPointComponent = new EditPointView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#editPointComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editPointComponent.setClickHandler(this.#handleCloseClick);

    render(this.#pointComponent, this.#pointsContainer);
  };

  #replacePointToForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };

  #handleCloseClick = () => {
    this.#replaceFormToPoint();
  };

  // pointComponent.setEditClickHandler(() => {
  //   replacePointToForm();
  //   document.addEventListener('keydown', onEscKeyDown);
  // });

  // editPointComponent.setClickHandler(() => {
  //   replaceFormToPoint();
  //   document.removeEventListener('keydown', onEscKeyDown);
  // });

  // editPointComponent.setFormSubmitHandler(() => {
  //   replaceFormToPoint();
  //   document.removeEventListener('keydown', onEscKeyDown);
  // });

  // render(pointComponent, this.#pointsListComponent.element);

}
