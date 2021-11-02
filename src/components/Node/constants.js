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

export const getMazeColors = (mazeType) => {
  if (mazeType === MAZE_TYPES.PRIM) {
    return [colors.darkGray, colors.white];
  }
  return [colors.lightGray, colors.white];
};

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
  switch (mazeType) {
    case MAZE_TYPES.RECURSIVE_DIVISION:
      return {
        borderTop: [
          `solid 0px ${colors.white}`,
          `solid ${walls.north ? 0.1 : 0}px ${colors.darkGray}`,
        ],
        borderRight: [
          `solid 0px ${colors.white}`,
          `solid ${walls.east ? 0.1 : 0}px ${colors.darkGray}`,
        ],
        borderLeft: [
          `solid 0px ${colors.white}`,
          `solid ${walls.west ? 0.1 : 0}px ${colors.darkGray}`,
        ],
        borderBottom: [
          `solid 0px ${colors.white}`,
          `solid ${walls.south ? 0.1 : 0}px ${colors.darkGray}`,
        ],
      };
    case MAZE_TYPES.PRIM: {
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
    default:
      return {
        borderTop: `solid ${walls.north ? 0.1 : 0}px ${colors.darkGray}`,
        borderRight: `solid ${walls.east ? 0.1 : 0}px ${colors.darkGray}`,
        borderBottom: `solid ${walls.south ? 0.1 : 0}px ${colors.darkGray}`,
        borderLeft: `solid ${walls.west ? 0.1 : 0}px ${colors.darkGray}`,
      };
  }
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
  if (mazeType === MAZE_TYPES.RECURSIVE_DIVISION) {
    const { north, east, south, west } = maze.recursiveDivisionDelay;
    return {
      borderTop: {
        duration: 0,
        delay: north,
        times: [0.999, 1],
      },
      borderRight: {
        duration: 0,
        delay: east,
        times: [0.999, 1],
      },
      borderLeft: {
        duration: 0,
        delay: west,
        times: [0.999, 1],
      },
      borderBottom: {
        duration: 0,
        delay: south,
        times: [0.999, 1],
      },
    };
  }
};

export const idleBorder = `solid 0.5px ${colors.veryLightGray}`;
export const idleBackground = colors.white;
export const finalRouteBackground = colors.yellow;
