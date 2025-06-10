import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-view.js';

import { render } from '../framework/render.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();

  #points = [];

  init = (container, pointsModel) => {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];

    if (this.#points.length === 0) {
      render(new NoPointView(), this.#container);
    } else {
      render(this.#sortComponent, this.#container);
      render(this.#pointsListComponent, this.#container);

      for (let i = 0; i < this.#points.length; i++) {
        this.#renderPoint(this.#points[i]);
      }}
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const editPointComponent = new EditPointView(point);

    const replacePointToForm = () => {
      this.#pointsListComponent.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointsListComponent.element);
  };
}
