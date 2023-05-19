import moment from 'moment';

import {
  DATE_FORMAT,
  dateFormat,
  enumGender,
  HOUR_FORMAT,
  NOT_HAVE,
  PREV_DATE_FORMAT,
  PREV_HOUR_FORMAT,
} from '@configs';

export const formatAppDate = (date?: string, endFormat?: string) => {
  const dateValue = Number(date);
  if (date) return moment(dateValue).format(endFormat || dateFormat);
  return '---';
};

export const formatPrevAppDate = (
  date?: string | Date,
  prevFormat?: string,
  endFormat?: string
) => {
  if (date) return moment(date, prevFormat || PREV_DATE_FORMAT).format(endFormat || DATE_FORMAT);
  return '---';
};

export const formatAppGender = (value?: any) => {
  switch (value) {
    case enumGender.MALE:
      return 'Nam';
    case enumGender.FEMALE:
      return 'Nữ';
    case enumGender.OTHER:
      return 'Khác';
    default:
      return NOT_HAVE;
  }
};

export const formatAppAddress = (
  address?: string,
  flat?: string,
  floor?: string,
  buildingName?: string
) => {
  return `${flat ? `${flat}, ` : ''}${floor ? `${floor}, ` : ''}${
    buildingName ? `${buildingName}, ` : ''
  }${address || ''}`;
};

export const formatAppNumberValue = (
  value: string | number,
  unit: string,
  isEnglish: boolean,
  unitSuf?: 's' | 'es' // s or es
) => {
  if (Number(value) !== 1 && isEnglish) {
    return `${value} ${unit.concat(unitSuf || 's')}`;
  }
  return `${value || ''} ${unit}`;
};

export const formatAppHour = (
  hour?: string,
  prevFormat?: string,
  endFormat?: string,
  timezone?: string
) => {
  if (hour) return moment(hour, prevFormat || PREV_HOUR_FORMAT).format(endFormat || HOUR_FORMAT);
  return 'none';
};

export const formatSEDate = (date?: Date, endFormat?: string) => {
  if (date) return moment(date).format(endFormat || PREV_DATE_FORMAT);
  return '';
};

export function formatAppUnit(x: number | string, sign?: string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sign || ',');
}
