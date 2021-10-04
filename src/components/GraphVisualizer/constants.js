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
const cols = 36;
const rows = 15;

export const initialNodes = [...Array(cols * rows)].map((_, index) => ({
  id: String(nanoid()),
  coords: {
    row: Math.floor(index / cols),
    col: Math.floor(index % cols),
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
    neighbours: [],
    firstVisitDelay: 0,
    lastVisitDelay: 0,
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
