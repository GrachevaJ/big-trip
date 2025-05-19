import { getRandomInteger, getRandomValue } from '../utils.js';
import { offerTitles, types } from './const.js';

const generateOffer = () => ({
  title: getRandomValue(offerTitles),
  price: getRandomInteger(10, 300)
});

const generateOffers = () => Array.from({length: getRandomInteger(0, offerTitles.length)}, (_value, index) => {
  const offerItem = generateOffer();

  return {
    id: index + 1,
    ...offerItem,
  };
});

const generateOffersByType = () => {
  const offersByType = [];

  types.forEach((type) => (offersByType.push({
    type,
    offers: generateOffers(),
  })));
  return offersByType;
};

export { generateOffersByType};

