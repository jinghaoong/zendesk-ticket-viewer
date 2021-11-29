import { format, formatDistanceToNow, parseISO } from 'date-fns';

const auth = `Bearer ${process.env.REACT_APP_TOKEN}`;

const baseUrl = process.env.REACT_APP_ZCC_URL; // Company Domain URL

const getRequestAttributes = {
  method: 'GET',
  mode: 'cors',
  credentials: 'same-origin',
  headers: {
    'Authorization': auth
  }
};

const capitaliseString = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

const convertDate = (isoDate) => {
  return format(parseISO(isoDate), 'eee, dd MMM yyyy');
};

const convertDateToNow = (isoDate) => {
  return formatDistanceToNow(parseISO(isoDate), { addSuffix: true });
};

export {
  auth,
  baseUrl,
  getRequestAttributes,
  capitaliseString,
  convertDate,
  convertDateToNow
};
