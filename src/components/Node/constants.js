import colors from 'shared/colors';

export const finalRouteColors = [
  colors.veryDarkPurple,
  colors.darkPurple,
  colors.purple,
  colors.lightPurple,
  colors.veryLightPurple,
  colors.veryLightPurple,
  colors.yellow,
];

export const routeColors = [
  colors.veryDarkPurple,
  colors.darkPurple,
  colors.purple,
  colors.lightPurple,
  colors.veryLightPurple,
];

export const mazeColors = [colors.lightGray, colors.white];

export const getVisitedTimes = (finalRouteKeyframeDelay = false) => {
  if (finalRouteKeyframeDelay) {
    return [
      0.05 / finalRouteKeyframeDelay,
      0.1 / finalRouteKeyframeDelay,
      0.3 / finalRouteKeyframeDelay,
      0.6 / finalRouteKeyframeDelay,
      0.998 / finalRouteKeyframeDelay,
      0.999,
      1,
    ];
  }
  return [0.05, 0.1, 0.3, 0.6, 1];
};

export const getMazeBorders = (walls) => ({
  borderTop: `solid ${walls.north ? 0.1 : 0}px ${colors.darkGray}`,
  borderRight: `solid ${walls.east ? 0.1 : 0}px ${colors.darkGray}`,
  borderBottom: `solid ${walls.south ? 0.1 : 0}px ${colors.darkGray}`,
  borderLeft: `solid ${walls.west ? 0.1 : 0}px ${colors.darkGray}`,
});

export const idleBorder = `solid 0.5px ${colors.veryLightGray}`;
export const idleBackground = colors.white;
export const finalRouteBackground = colors.yellow;
