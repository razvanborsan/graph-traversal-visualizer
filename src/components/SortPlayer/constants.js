import { nanoid } from 'nanoid';
import colors from 'shared/colors';

export const barColors = [
  colors.brightPink,
  colors.darkPink,
  colors.brightPurple,
  colors.darkPurple,
];

export const MAX_NUMBER_OF_BARS = 64;

export const constantIds = [...Array(MAX_NUMBER_OF_BARS)].map(() => nanoid());

export const BAR_NUMBER_ACTIONS = {
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
};

export const SORTED_ARRAY_TYPE = {
  INCREASING: 'INCREASING',
  DECREASING: 'DECREASING',
};
