import { nanoid } from 'nanoid';
import colors from 'shared/colors';

export const barColors = [
  colors.brightPink,
  colors.darkPink,
  colors.brightPurple,
  colors.darkPurple,
];

export const NUMBER_OF_BARS = 16;

export const constantIds = [...Array(NUMBER_OF_BARS)].map(() => nanoid());
