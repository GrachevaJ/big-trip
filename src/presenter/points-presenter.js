import PointsListView from '../view/points-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { remove, render, RenderPosition} from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType} from '../const.js';
import { sortDay, sortPrice, sortTime } from '../utils/date.js';
import { filter } from '../utils/filter.js';

export default class PointsPresenter {
  #container = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterModel = null;
  #pointNewPresenter = null;
  #pointDetailsModel = null;

  #pointsListComponent = new PointsListView();
  #noPointsComponent = null;
  #loadingComponent = new LoadingView();

  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;


  constructor(container, pointsModel, filterModel, pointDetailsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointDetailsModel = pointDetailsModel;
    this.#pointNewPresenter = new PointNewPresenter(this.#pointsListComponent.element, this.#handleViewAction);

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#pointDetailsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
      case SortType.DAY:
        return filteredPoints.sort(sortDay);
    }

    return filteredPoints.sort(sortDay);
  }

  get pointDetails() {
    const destinations = this.#pointDetailsModel.destinations;
    const offers = this.#pointDetailsModel.offers;
    const pointDetails = {destinations, offers};

    return pointDetails;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, this.pointDetails);
  };

  #renderPoints = (points, pointDetails) => {
    points.forEach((point) => this.#renderPoint(point, pointDetails));
  };

  #renderNoPoints = () => {
    this.#noPointsComponent = new NoPointView(this.#filterType);
    render(this.#noPointsComponent, this.#container);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderBoard = () => {
    render(this.#pointsListComponent, this.#container);
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointDetails = this.pointDetails;

    if (points.length === 0) {
      this.#renderNoPoints();
      return;
    }
  this.#renderSort();
    this.#renderPoints(points, pointDetails);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#container);
  };

  #renderPoint = (point, pointDetails) => {
    const pointPresenter = new PointPresenter(this.#pointsListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, pointDetails);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearBoard = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
