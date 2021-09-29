import { faPlay, faRedo, faStop } from '@fortawesome/free-solid-svg-icons';

import { barColors, constantIds, SORTED_ARRAY_TYPE } from './constants';

const getElements = (level) => {
  switch (level) {
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
      return 16;
    case 4:
      return 32;
    case 5:
    default:
      return 64;
  }
};

export const getRandomValues = (numberOfValues) => {
  const elements = getElements(numberOfValues);

  return [...Array(elements)].map((_, index) => ({
    id: constantIds[index],
    color: barColors[1],
    value: Math.floor(Math.random() * 10000),
  }));
};

export const getSorted = (numberOfValues, type) => {
  const newValues = getRandomValues(numberOfValues);

  return newValues.sort((barA, barB) => {
    if (barA.value < barB.value) {
      return type === SORTED_ARRAY_TYPE.INCREASING ? -1 : 1;
    }
    return type === SORTED_ARRAY_TYPE.INCREASING ? 1 : -1;
  });
};

export const getPlayIcon = (isSortFinished, startSorting) => {
  if (isSortFinished) {
    return faRedo;
  }
  if (startSorting) {
    return faStop;
  }
  return faPlay;
};
