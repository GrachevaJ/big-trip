import { getRandomInteger, getRandomValue } from '../utils/common.js';
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

const offersByType = [];
const generateOffersByType = () => {

  types.forEach((type) => (offersByType.push({
    type,
    offers: generateOffers(),
  })));
  return offersByType;
};
generateOffersByType();

export { offersByType};

