import MainInfoView from './view/main-info-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

import { render,RenderPosition } from './framework/render.js';


const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const siteMainElement = siteBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const pointsPresenter = new PointsPresenter(siteMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
const newPointButton = document.querySelector('.trip-main__event-add-btn');

render(new MainInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);

const handleNewPointFormClose = () => {
  newPointButton.removeAttribute('disabled', 'disabled');
};

const handleNewPointButtonClick = () => {
  pointsPresenter.createPoint(handleNewPointFormClose);
  newPointButton.setAttribute('disabled', 'disabled');
};

newPointButton.addEventListener('click', handleNewPointButtonClick);

filterPresenter.init();
pointsPresenter.init();

