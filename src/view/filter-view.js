import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filterName, isChecked) => `
  <div class="trip-filters__filter">
                  <input id="filter-${filterName}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterName}"
                  ${isChecked ? 'checked' : ''}>
                  <label class="trip-filters__filter-label" for="filter-${filterName}">${filterName.charAt(0).toUpperCase()}${filterName.slice(1)}</label>
                </div>
  `;

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return `<form class="trip-filters" action="#" method="get">
                ${filterItemsTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
