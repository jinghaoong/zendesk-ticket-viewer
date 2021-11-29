import {
  capitaliseString,
  convertDate,
  convertDateToNow
} from './index';

describe('Helpers', () => {
  it('capitaliseString capitalises the first letter of lowercase string', () => {
    const str = 'testing';
    const capitalisedStr = capitaliseString(str);
    expect(capitalisedStr).toEqual('Testing');
  });

  it('convertDate converts Date in ISO format to format e.g. "Mon, 29 Nov 2021"', () => {
    const isoDate = '2021-11-29T00:00:00Z';
    const value = convertDate(isoDate);
    expect(value).toEqual('Mon, 29 Nov 2021');
  });

  it('convertDateToNow converts Date in ISO format to now', () => {
    const isoDate = (new Date()).toISOString();
    const dateNow = convertDateToNow(isoDate);
    expect(dateNow).toEqual('less than a minute ago');
  });
});