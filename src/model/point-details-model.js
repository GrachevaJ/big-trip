import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class PointDetailsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];
  #offers = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  init = async() => {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch(err) {
      this.#destinations = [];
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };
}

