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

export const generatePoint = () => ({
  id: nanoid(),
  basePrice: getRandomInteger(200, 3000),
  dateFrom: generateDate(),
  dateTo: '2019-07-11T22:55:13.845Z',
  destination: {
    description: getRandomValue(description),
    name: getRandomValue(destinationNames),
    pictures: Array.from({length: getRandomInteger(0,5)}, generatePictures)
  },
  isFavorite: Math.random() < 0.5 ,
  offers: Array.from({length: getRandomInteger(0,5)}, (i) => i+1),
  type: getRandomValue(types)
});

