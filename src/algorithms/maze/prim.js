import { randomIntFromInterval } from 'shared/variables';
import { MAZE } from 'components/GraphVisualizer/constants';
import {
  buildNodeKey,
  removeWallBetweenNodes,
} from 'components/GraphVisualizer/helpers';

const MAZE_DELAY = 0.01;

export default function prim(
  adjacencyList,
  handleSetVisitedNodes,
  handleSetAdjacencyList,
  handleSetSnapshot,
  setEnableFindPath,
  setEnableResetPath,
) {
  const frontier = new Map();
  const visited = [];
  let delay = 0;

  // Deep clone the adjacency list so we never modify it directly
  const deepCloneAdjacencyList = new Map();
  adjacencyList.forEach((value, key) => {
    deepCloneAdjacencyList.set(key, {
      ...value,
      neighbours: [],
    });
  });

  const randomCol = randomIntFromInterval(0, MAZE.COLS - 1);
  const randomRow = randomIntFromInterval(0, MAZE.ROWS - 1);
  const randomNodeKey = buildNodeKey(randomRow, randomCol);
  const randomNode = deepCloneAdjacencyList.get(randomNodeKey);

  randomNode.maze.isFrontier = true;
  frontier.set(randomNodeKey, randomNode);

  while (frontier.size) {
    const items = Array.from(frontier);
    const frontierNodeKey =
      items[randomIntFromInterval(0, items.length - 1)][0];
    const frontierNode = deepCloneAdjacencyList.get(frontierNodeKey);

    frontierNode.maze.neighbours.forEach((neighbour) => {
      if (!neighbour.maze.isFrontier && !neighbour.maze.isVisited) {
        neighbour.maze.firstVisitDelay = delay;
        delay += MAZE_DELAY;

        removeWallBetweenNodes(frontierNode, neighbour);

        const { row, col } = neighbour.coords;
        const nodeKey = buildNodeKey(row, col);
        frontier.set(nodeKey, neighbour);
        neighbour.maze.isFrontier = true;
      }
    });

    frontierNode.maze.lastVisitDelay = delay;
    frontierNode.maze.isVisited = true;
    frontierNode.maze.isFrontier = false;
    delay += MAZE_DELAY;

    frontier.delete(frontierNodeKey);
    visited.push(frontierNode);
  }

  setTimeout(() => {
    setEnableFindPath(true);
    setEnableResetPath(true);
  }, 1000 * delay);

  handleSetVisitedNodes([...visited]);
  handleSetSnapshot([...visited]);
  handleSetAdjacencyList(deepCloneAdjacencyList);
}
