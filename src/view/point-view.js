import { createElement } from '../render.js';
import { humanizeDate, humanizeDatetime } from '../utils.js';
import { generateOffersByType } from '../mock/offers.js';

const createPointTmplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, isFavorite, type} = point;

  const checkFavorite = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const createOffers = () => {
    const offersByType = generateOffersByType();
    const pointTypeOffer = offersByType.find((offer) => offer.type === type);
    return `<ul class="event__selected-offers">
              ${pointTypeOffer.offers.map((offer) => `<li class="event__offer">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </li>`)}
                </ul>`;

  };

  const getDifferentDate = () => {
    const end = new Date(dateTo);
    const start = new Date(dateFrom);

    const different = end - start;
    const hours = Math.floor((different % 86400000) / 3600000);
    const minutes = Math.round(((different % 86400000) / 3600000) / 60000);

    if (hours === 0) {
      return `${minutes}M`;
    }
    else if (minutes === 0){
      return `${hours}H`;
    }
    else {
      return `${hours}H ${minutes}M`;
    }
  };

  return (
    `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${humanizeDate(dateFrom)}">${humanizeDate(dateFrom)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateFrom}">${humanizeDatetime(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTo}">${humanizeDatetime(dateTo)}</time>
                  </p>
                  <p class="event__duration">${getDifferentDate()}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                ${createOffers()}
                <button class="event__favorite-btn ${checkFavorite}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`
  );
};

export default class PointView {
  #point = null;
  #element = null;

  constructor(point) {
    this.#point = point;
  }

  get template() {
    return createPointTmplate(this.#point);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

