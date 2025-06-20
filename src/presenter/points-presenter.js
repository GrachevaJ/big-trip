import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

import { render, RenderPosition } from '../framework/render.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;

  #sortComponent = new SortView();
  #pointsListComponent = new PointsListView();
  #noPointsComponent = new NoPointView();

  #points = [];
  #pointPresenter = new Map();

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
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
