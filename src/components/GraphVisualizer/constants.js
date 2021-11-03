import { nanoid } from 'nanoid';

export const DIRECTIONS = {
  NORTH: 'NORTH',
  EAST: 'EAST',
  SOUTH: 'SOUTH',
  WEST: 'WEST',
};

// Go only North - East - South - West
export const possibleNeighbourCoords = {
  x: [-1, 0, 1, 0],
  y: [0, 1, 0, -1],
};

// Each node is 30px wide, so we have 1080 / 30 = 36 columns
export const MAZE = {
  COLS: 36,
  ROWS: 15,
};

export const getInitialNodes = () =>
  [...Array(MAZE.COLS * MAZE.ROWS)].map((_, index) => ({
    id: String(nanoid()),
    coords: {
      row: Math.floor(index / MAZE.COLS),
      col: Math.floor(index % MAZE.COLS),
    },
    controlState: {
      isStart: false,
      isEnd: false,
      isVisited: false,
      isPartOfFinalRoute: false,
    },
    routeToStart: new Map(),
    maze: {
      isVisited: false,
      isFrontier: false,
      neighbours: [],
      ellerSet: -1,
      firstVisitDelay: 0,
      lastVisitDelay: 0,
      recursiveDivisionDelay: {
        north: 0,
        east: 0,
        south: 0,
        west: 0,
      },
    },
    delays: {
      keyframeDelay: 0,
      finalRouteKeyframeDelay: 0,
    },
    walls: {
      north: true,
      east: true,
      south: true,
      west: true,
    },
    neighbours: [],
  }));

export const MAZE_TYPES = {
  BACKTRACKING: 'BACKTRACKING',
  ELLER: 'ELLER',
  PRIM: 'PRIM',
  RECURSIVE_DIVISION: 'RECURSIVE_DIVISION',
};
