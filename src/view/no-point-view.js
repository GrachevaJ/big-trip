import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points now',
  [FilterType.PAST]: 'There are no past points now'
};
const createNoPointViewTemplate = (filterType) => {
  const noPointTextValue = NoPointsTextType[filterType];

  return (
    `<section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>

          <p class="trip-events__msg">${noPointTextValue}</p>
</section>`
  );
};

export default class NoPointView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoPointViewTemplate(this.#filterType);
  }
}
