import dayjs from 'dayjs';

const humanizeDatetime = (dueDate) => dayjs(dueDate).format('HH:MM');
const humanizeDate = (dueDate) => dayjs(dueDate).format('MMM D');
const humanizeDateWithYear = (dueDate) => dayjs(dueDate).format('YY/MM/DD HH:MM');
export {humanizeDatetime, humanizeDate, humanizeDateWithYear};
