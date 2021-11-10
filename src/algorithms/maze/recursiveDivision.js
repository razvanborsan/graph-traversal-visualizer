import { MAZE, DIRECTIONS } from 'components/GraphVisualizer/constants';
import { randomIntFromInterval } from 'shared/variables';
import { buildNodeKey } from 'components/GraphVisualizer/helpers';

const MAZE_DELAY = 0.025;

// Unless the node is a frontier node, reset all its walls
const resetWall = (wallType, coords) => {
  const { row, col } = coords;

  switch (wallType) {
    case DIRECTIONS.NORTH:
      return row === 0;
    case DIRECTIONS.EAST:
      return col === MAZE.COLS - 1;
    case DIRECTIONS.SOUTH:
      return row === MAZE.ROWS - 1;
    case DIRECTIONS.WEST:
      return col === 0;
    default:
  }
};

export default function recursiveDivision(
  adjacencyList,
  handleSetVisitedNodes,
  handleSetAdjacencyList,
  handleSetSnapshot,
  setEnableFindPath,
  setEnableResetPath,
) {
  let delay = 0;
  const visited = [];
  const deepCloneAdjacencyList = new Map();

  // remove the pre-build walls
  adjacencyList.forEach((value, key) => {
    deepCloneAdjacencyList.set(key, {
      ...value,
      walls: {
        north: resetWall(DIRECTIONS.NORTH, value.coords),
        east: resetWall(DIRECTIONS.EAST, value.coords),
        south: resetWall(DIRECTIONS.SOUTH, value.coords),
        west: resetWall(DIRECTIONS.WEST, value.coords),
      },
      neighbours: [],
    });
  });

  const loop = (startColumn, endColumn, startRow, endRow) => {
    const noColumns = endColumn - startColumn;
    const noRows = endRow - startRow;

    if (noColumns < 1 && noRows < 1) {
      return;
    }

    if (noColumns > noRows) {
      // randomly select where to place the line
      const randomColumn = randomIntFromInterval(startColumn, endColumn - 1);
      // randomly select the hole position in the line
      const randomHole = randomIntFromInterval(startRow, endRow);

      // go from the start row to the end row and add the required border
      for (let index = startRow; index <= endRow; index += 1) {
        if (index !== randomHole) {
          // get the nodes
          const nodeKey = buildNodeKey(index, randomColumn);
          const node = deepCloneAdjacencyList.get(nodeKey);

          const neighbourKey = buildNodeKey(index, randomColumn + 1);
          const neighbour = deepCloneAdjacencyList.get(neighbourKey);

          // delay is border/wall based, not node based
          node.maze.recursiveDivisionDelay.east = delay;
          neighbour.maze.recursiveDivisionDelay.west = delay;

          delay += MAZE_DELAY;

          node.walls.east = true;
          neighbour.walls.west = true;
        }
      }

      // loop left half and right half of the current column
      loop(startColumn, randomColumn, startRow, endRow);
      loop(randomColumn + 1, endColumn, startRow, endRow);
    } else {
      // randomly select where to place the line
      const randomRow = randomIntFromInterval(startRow, endRow - 1);
      // randomly select the hole position in the line
      const randomHole = randomIntFromInterval(startColumn, endColumn);

      // go from the start column to the end column and add the required border
      for (let index = startColumn; index <= endColumn; index += 1) {
        if (index !== randomHole) {
          // get the nodes
          const nodeKey = buildNodeKey(randomRow, index);
          const node = deepCloneAdjacencyList.get(nodeKey);

          const neighbourKey = buildNodeKey(randomRow + 1, index);
          const neighbour = deepCloneAdjacencyList.get(neighbourKey);

          // delay is border/wall based, not node based
          node.maze.recursiveDivisionDelay.south = delay;
          neighbour.maze.recursiveDivisionDelay.north = delay;

          delay += MAZE_DELAY;

          node.walls.south = true;
          neighbour.walls.north = true;
        }
      }

      // loop up half and above half of the current row
      loop(startColumn, endColumn, startRow, randomRow);
      loop(startColumn, endColumn, randomRow + 1, endRow);
    }
  };

  loop(0, MAZE.COLS - 1, 0, MAZE.ROWS - 1);

  // mark every node as visited and create the visited array
  deepCloneAdjacencyList.forEach((value, key) => {
    value.maze.isVisited = true;
    visited.push(value);
  });

  setTimeout(() => {
    setEnableFindPath(true);
    setEnableResetPath(true);
  }, 1000 * delay);

  handleSetAdjacencyList(deepCloneAdjacencyList);
  handleSetVisitedNodes([...visited]);
  handleSetSnapshot([...visited]);
}
