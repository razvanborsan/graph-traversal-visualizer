/* eslint-disable import/prefer-default-export */
export const getVariants = (current, previous) => ({
  previous: (i) => ({
    height: previous.find((value) => value.id === i).value / 22,
  }),
  current: (i) => ({
    height: current.find((value) => value.id === i).value / 22,
    transition: { duration: 0.5 },
  }),
});
