import { faPlay, faRedo, faStop } from '@fortawesome/free-solid-svg-icons';

import { barColors, constantIds, NUMBER_OF_BARS } from './constants';

export const getRandomValues = () => [...Array(NUMBER_OF_BARS)].map((_, index) => ({
  id: constantIds[index],
  color: barColors[index % 4],
  value: Math.floor(Math.random() * 10000),
}));

export const getSortedValues = (type) => [...Array(NUMBER_OF_BARS)].map((_, index) => ({
  id: constantIds[index],
  color: barColors[index % 4],
  value: type === 'ascending' ? index * 520 : (NUMBER_OF_BARS - index) * 520,
}));

export const getPlayIcon = (isSortFinished, startSorting) => {
  if (isSortFinished) {
    return faRedo;
  }
  if (startSorting) {
    return faStop;
  }
  return faPlay;
};
