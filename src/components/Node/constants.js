import colors from 'shared/colors';
import { MAZE_TYPES } from 'components/GraphVisualizer/constants';

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

export const mazeColors = [colors.veryLightGray, colors.white];

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

export const getMazeBorders = (walls, mazeType) => {
  if (mazeType === MAZE_TYPES.PRIM) {
    return {
      borderTop: [
        `solid 0.05px ${colors.veryLightGray}`,
        `solid 0px ${colors.darkGray}`,
        `solid ${walls.north ? 0.1 : 0}px ${colors.darkGray}`,
      ],
      borderRight: [
        `solid 0.1px ${colors.veryLightGray}`,
        `solid 0px ${colors.darkGray}`,
        `solid ${walls.east ? 0.1 : 0}px ${colors.darkGray}`,
      ],
      borderBottom: [
        `solid 0.1px ${colors.veryLightGray}`,
        `solid 0px ${colors.darkGray}`,
        `solid ${walls.south ? 0.1 : 0}px ${colors.darkGray}`,
      ],
      borderLeft: [
        `solid 0.1px ${colors.veryLightGray}`,
        `solid 0px ${colors.darkGray}`,
        `solid ${walls.west ? 0.1 : 0}px ${colors.darkGray}`,
      ],
    };
  }
  return {
    borderTop: `solid ${walls.north ? 0.1 : 0}px ${colors.darkGray}`,
    borderRight: `solid ${walls.east ? 0.1 : 0}px ${colors.darkGray}`,
    borderBottom: `solid ${walls.south ? 0.1 : 0}px ${colors.darkGray}`,
    borderLeft: `solid ${walls.west ? 0.1 : 0}px ${colors.darkGray}`,
  };
};

export const getMazeBordersTransition = (maze, mazeType) => {
  if (mazeType === MAZE_TYPES.PRIM) {
    return {
      borderTop: {
        duration: maze.lastVisitDelay - maze.firstVisitDelay,
        delay: maze.firstVisitDelay,
        times: [0.99, 0.999, 1],
      },
      borderRight: {
        duration: maze.lastVisitDelay - maze.firstVisitDelay,
        delay: maze.firstVisitDelay,
        times: [0.99, 0.999, 1],
      },
      borderBottom: {
        duration: maze.lastVisitDelay - maze.firstVisitDelay,
        delay: maze.firstVisitDelay,
        times: [0.99, 0.999, 1],
      },
      borderleft: {
        duration: maze.lastVisitDelay - maze.firstVisitDelay,
        delay: maze.firstVisitDelay,
        times: [0.99, 0.999, 1],
      },
    };
  }
};

export const idleBorder = `solid 0.5px ${colors.veryLightGray}`;
export const idleBackground = colors.white;
export const finalRouteBackground = colors.yellow;
