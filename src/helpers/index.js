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

/**
   * Handles error and returns appropriate error message.
   * 
   * @param {Error} error Error caught by fetch call
   * @returns {String} Returns appropriate error message
   */
const handleErrors = (error) => {
  const defaultErrorMessage = 'Error: ';
  if (!error.status) {
    return (defaultErrorMessage + '- Unable to retrieve Tickets');
  } else {
    switch (error.status) {
      case 400:
        return (defaultErrorMessage + '- Invalid Attribute.')
      case 401:
        return (defaultErrorMessage + "- Access Token is expired / malformed / invalid.")
      case 404:
        return (defaultErrorMessage + '- Tickets Not Found.');
      case 429:
        return ('Read limit exceeded, please wait 1 minute before reloading.');
      default:
        return (defaultErrorMessage + '- Unable to retrieve Tickets.');
    };
  }
};

export {
  auth,
  baseUrl,
  getRequestAttributes,
  capitaliseString,
  convertDate,
  convertDateToNow,
  handleErrors
};
