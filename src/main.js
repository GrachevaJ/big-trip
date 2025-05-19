import MainInfoView from './view/main-info-view.js';
import FilterView from './view/filter-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';

import { render } from './render.js';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const siteMainElement = siteBodyElement.querySelector('.trip-events');

const pointsPresenter = new PointsPresenter();
const pointsModel = new PointsModel(); //создаем экземпляр модели

render(new MainInfoView(), siteHeaderInfoElement, 'afterbegin');
render(new FilterView(), siteFilterElement);

pointsPresenter.init(siteMainElement, pointsModel); //передаем презентеру контейнер для отрисовки данных и модель


import './mock/point.js';
