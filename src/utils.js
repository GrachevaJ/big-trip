import dayjs from 'dayjs';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const humanizeDatetime = (dueDate) => dayjs(dueDate).format('HH:MM');
const humanizeDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeDateWithYear = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:MM');
export {getRandomInteger, getRandomValue, humanizeDatetime, humanizeDate, humanizeDateWithYear};
