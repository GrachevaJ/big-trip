import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import NoPointView from '../view/no-point-view.js';

import { render, replace, RenderPosition } from '../framework/render.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();
  #noPointsComponent = new NoPointView();

  #points = [];

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#points = [...this.#pointsModel.points];

    this.#renderPointsList();
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#container);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#container);

    if (this.#points.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderSort();
    this.#renderPoints();
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const editPointComponent = new EditPointView(point);

    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
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
