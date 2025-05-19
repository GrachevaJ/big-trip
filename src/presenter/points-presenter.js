import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import NewPointView from '../view/new-point-view.js';

import { render } from '../render.js';

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

    render(this.#sortComponent, this.#container);
    render(this.#pointsListComponent, this.#container);
    render(new NewPointView(this.#points[0]), this.#pointsListComponent.element);

    for (let i = 0; i < this.#points.length; i++) {
      render(new PointView(this.#points[i]), this.#pointsListComponent.element);
    }
  };
}
