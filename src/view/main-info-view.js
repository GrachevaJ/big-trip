import AbstractView from '../framework/view/abstract-view.js';
import { sortDay, humanizeDate } from '../utils/date.js';

const createMainInfoTemplate = (points) => {
  const getTotalPrice = () => {
    const sum = [];
    points.forEach((item) => sum.push(item.basePrice));
    return sum.reduce((a, b) => a + b);
  };

  const getTitle = () => {
    const titles = new Set();
    points.forEach((item) => titles.add(item.destination.name));
    const arr = Array.from(titles);

    if (arr === 3) {
      return `${arr[0]} &mdash; ${arr[1]} &mdash; ${arr[2]}`;
    }

    return `${arr[0]} &mdash; ... &mdash; ${arr[arr.length - 1]}`;
  };

  const getDate = () => {
    const date = [];
    points.forEach((elem) => date.push(humanizeDate(elem.dateFrom)));

    return `<p class="trip-info__dates">${date[0]}&nbsp;&mdash;&nbsp;${date[date.length - 1]}</p>`
  };


  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${getTitle()}</h1>

              ${getDate()}
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTotalPrice()}</span>
            </p>
          </section>`;
};

export default class MainInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = points;
  }

  get template() {
    return createMainInfoTemplate(this.#points);
  }
}
