import MainInfoView from './view/main-info-view.js';
import FilterView from './view/filter-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

import { render,RenderPosition } from './framework/render.js';
import { generateFilter } from './mock/filter.js';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const siteMainElement = siteBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const pointsPresenter = new PointsPresenter(siteMainElement, pointsModel);
const filters = generateFilter(pointsModel.points);

render(new MainInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
render(new FilterView(filters), siteFilterElement);

pointsPresenter.init();

