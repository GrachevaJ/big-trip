import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { SortType } from '../const.js';
import { sortDay, sortPrice, sortTime } from '../utils/date.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #sortComponent = null;

  #pointsListComponent = new PointsListView();
  #noPointsComponent = new NoPointView();

  // #points = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;
  // #defaultSortPoints = this.#points.sort(sortDay);

  constructor(container, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPrice);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTime);
    }

    return [...this.#pointsModel.points].sort(sortDay);
  }

  init = () => {
    this.#renderPointsList();
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  };

  #renderNoPoints = () => {
    render(this.#noPointsComponent, this.#container);
  };

  // #sortPoints = (sortType) => {
  //   switch (sortType) {
  //     case SortType.PRICE:
  //       this.#points.sort(sortPrice);
  //       break;
  //     case SortType.TIME:
  //       this.#points.sort(sortTime);
  //       break;
  //     default:
  //       this.#points = [...this.#defaultSortPoints];
  //       break;
  //   }

  //   this.#currentSortType = sortType;
  // };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort = () => {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView(this.#currentSortType);
      render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    } else {
      const updatedSortComponent = new SortView(this.#currentSortType);
      replace(updatedSortComponent, this.#sortComponent);
      this.#sortComponent = updatedSortComponent;
    }

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#container);

    if (this.points.length === 0) {
      this.#renderNoPoints();
    }

    this.#renderSort();
    this.#renderPoints();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };
}
