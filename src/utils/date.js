import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const humanizeDatetime = (dueDate) => dayjs(dueDate).format('HH:mm');
const humanizeDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeDateWithYear = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:mm');


dayjs.extend(duration);
const durationTravel = (dateTo, dateFrom) => {
  const days = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).days();
  const hours = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).hours();
  const minutes = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).minutes();
  if (days === 0 && hours === 0) {
    return `${minutes}M`;
  } else if (days === 0) {
    return `${hours}H ${minutes}M`;
  } else {
    return `${days}D ${hours}H ${minutes}M`;
  }
};

const isPast = (dueDate) => dayjs(dueDate).isBefore();
const isFuture = (dueDate) => dayjs(dueDate).isAfter();

const sortDay = (pointA, pointB) => new Date(pointA.dateFrom) - new Date(pointB.dateFrom);

const sortTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(pointB.dateFrom) - dayjs(pointA.dateTo).diff(pointA.dateFrom);


const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {humanizeDatetime, humanizeDate, humanizeDateWithYear, durationTravel, isFuture, isPast, sortDay, sortPrice, sortTime};
