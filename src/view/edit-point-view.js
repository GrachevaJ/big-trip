import AbstractStatefulView from '..//framework/view/abstract-stateful-view.js';
import { humanizeDateWithYear } from '../utils/date.js';

import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';



const createEditPointTemplate = (point) => {
  const { basePrice, dateFrom, dateTo, destination, offers, type} = point.point;

  const createDestination = () => {
    const pointName = point.pointDetails.destinations.find((item) => item.name === destination.name);
    return pointName;
  };
  const Destination = createDestination();

  const createTypeList = () => `${point.pointDetails.offers.map((typeItem) => `<div class="event__type-item">
                          <input id="event-type-${typeItem.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeItem.type}">
                          <label class="event__type-label  event__type-label--${typeItem.type}" for="event-type-${typeItem.type}-1">${typeItem.type}</label>
                        </div>`).join('')}`;

  const createDestinationList = () => `${point.pointDetails.destinations.map((elem) => `<option value="${elem.name}"></option>`)}`;

  const createOffers = () => {
    const pointTypeOffer = point.pointDetails.offers.find((offer) => offer.type === type);


    return `<div class="event__available-offers">
    ${pointTypeOffer.offers.map((offer) => {

    const checked = offers.includes(offer.id) ? 'checked' : '';

    return `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" ${checked}>
                        <label class="event__offer-label" for="event-offer-${offer.title}-1">
                          <span class="event__offer-title">${offer.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${offer.price}</span>
                        </label></div>
                      `;}).join('')}

                      </div>`;

  };

  const createPicturesList = () => `${(destination.pictures === null || destination.pictures === undefined) ? '' : Destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)}`;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                      ${createTypeList()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name === '' ? '' : Destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationList()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom === null ? '' : humanizeDateWithYear(dateFrom)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo === null ? '' : humanizeDateWithYear(dateTo)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                </header>
                <section class="event__details">
                  ${type !== '' ? `<section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${createOffers()}
                  </section>` : ''}

                  <section class="event__section  event__section--destination">
                    ${(destination.description || destination.name) !== '' ?`<h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${Destination.description}</p>` : ''}

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPicturesList()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class EditPointView extends AbstractStatefulView {
  #datepicker = null;

  constructor(point, pointDetails) {
    super();
    this._state = EditPointView.parsePointToState({point, pointDetails});


    this.#setInnerHandlers();
    this.#setDatepicker();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setClickHandler(this._callback.click);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => (
    {...point}
  );

  static parseStateToPoint = (state) => ({...state});

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((element) => {
      element.addEventListener('click', this.#typeClickHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#namePointClickHandler);
  };

  #dateChangeHandler = ([userDateFrom, userDateTo]) => {
    this.updateElement({
      dateFrom: userDateFrom,
      dateTo: userDateTo,
    });
  };

  #setDatepicker = () => {
    this.#datepicker = flatpickr(
      this.element.querySelector('.event__field-group--time'),
      {
        mode: 'range',
        dateFormat: 'Y-m-d H:i',
        enableTime: true,
        defaultDate: [this._state.dateFrom, this._state.dateTo],
        onClose: this.#dateChangeHandler,
      },
    );
  };

  reset = (point) => {
    this.updateElement(EditPointView.parsePointToState(point));
  };

  #namePointClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {destination: {name: evt.target.value}}
    });
  };

  #typeClickHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {type: evt.target.value},
    });
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };
}
