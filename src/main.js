import { render } from './render.js';
import TripMainInfoView from './view/trip-main-info-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListEventsPresenter from './presenter/trip-events-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const filterElelment = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const listPresenter = new ListEventsPresenter();

render(new TripMainInfoView(), tripMainElement, 'afterbegin');
render(new FilterView(), filterElelment);
render(new SortView(), tripEventsElement);

listPresenter.init(tripEventsElement);
