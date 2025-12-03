import MainInfoView from './view/main-info-view.js';
import PointsPresenter from './presenter/points-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointDetailsModel from './model/point-details-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsApiService from './points-api-service.js';
import { render,RenderPosition } from './framework/render.js';

const AUTHORIZATION = 'Basic sdflkj3lfgfgwkejfls89';
const END_POINT = 'https://17.ecmascript.htmlacademy.pro/big-trip';

const siteBodyElement = document.querySelector('.page-body');
const siteHeaderElement = siteBodyElement.querySelector('.page-header');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const siteMainElement = siteBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const pointDetailsModel = new PointDetailsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const pointsPresenter = new PointsPresenter(siteMainElement, pointsModel, filterModel, pointDetailsModel);
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
pointsModel.init();
pointDetailsModel.init();

