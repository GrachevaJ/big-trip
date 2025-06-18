import { getRandomInteger, getRandomValue } from '../utils/common.js';
import { types, picturesSrc, description, destinationNames } from './const.js';


const generatePictures = () => ({
  src: getRandomValue(picturesSrc),
  description: getRandomValue(description).slice(0, 30)
});


export const generatePoint = () => ({
  basePrice: getRandomInteger(200, 3000),
  dateFrom: '2019-07-11T12:35:56.845Z',
  dateTo: '2019-07-11T22:55:13.845Z',
  destination: {
    description: getRandomValue(description),
    name: getRandomValue(destinationNames),
    pictures: Array.from({length: getRandomInteger(0,5)}, generatePictures)
  },
  isFavorite: Math.random() < 0.5 ,
  offers: Array.from({length: getRandomInteger(0,5)}, (value, i) => i+1),
  type: getRandomValue(types)
});

