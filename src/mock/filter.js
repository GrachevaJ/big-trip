import { filter } from '../utils/filter.js';

const generateFilter = () => Object.entries(filter).map(([filterName]) => filterName);


export {generateFilter};

