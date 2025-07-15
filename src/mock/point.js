import dayjs from 'dayjs';
import { getRandomInteger, getRandomValue } from '../utils/common.js';
import { types, picturesSrc, description, destinationNames } from './const.js';
import {nanoid} from 'nanoid';

const generatePictures = () => ({
  src: getRandomValue(picturesSrc),
  description: getRandomValue(description).slice(0, 30)
});

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};
const destinations = [];
const createDestination = () => {
  destinationNames.forEach((item) => (destinations.push({
    name: item,
    description: getRandomValue(description),
    pictures: Array.from({length: getRandomInteger(0,5)}, generatePictures)
  })));
};
createDestination();

export const generatePoint = () => ({
  id: nanoid(),
  basePrice: getRandomInteger(200, 3000),
  dateFrom: generateDate(),
  dateTo: '2025-07-20T22:55:13.845Z',
  destination: getRandomValue(destinations),
  // {
  //   description: getRandomValue(description),
  //   name: getRandomValue(destinationNames),
  //   pictures: Array.from({length: getRandomInteger(0,5)}, generatePictures)
  // },
  isFavorite: Math.random() < 0.5 ,
  offers: Array.from({length: getRandomInteger(0,5)}, (v, i) => i+1),
  type: getRandomValue(types)
});

