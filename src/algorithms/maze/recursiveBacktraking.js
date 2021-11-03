import { getNodeKey } from 'components/GraphVisualizer/helpers';

import { randomIntFromInterval } from 'shared/variables';

const MAZE_BUILDING_DELAY = 0.05;

const randomlyChooseNext = (neighbours) => {
  const i = randomIntFromInterval(0, neighbours.length - 1);

  if (!neighbours[i].controlState.isVisited) {
    return neighbours[i];
  }

  randomlyChooseNext(neighbours);

  return {};
};

export default function recursiveBacktracking(
  adjacencyList,
  start,
  handleSetVisitedNodes,
  handleSetSnapshot,
) {
  const visited = [];
  let delay = 0;

  // Deep clone the adjacency list so we never modify it directly
  const deepCloneAdjacencyList = new Map();
  adjacencyList.forEach((value, key) => {
    deepCloneAdjacencyList.set(key, value);
  });
  const deepCloneStartNode = deepCloneAdjacencyList.get(getNodeKey(start));

  function loop(currentNode) {
    const { neighbours } = currentNode.maze;

    currentNode.maze.firstVisitDelay = delay;
    delay += MAZE_BUILDING_DELAY;

    visited.push(currentNode);

    // Don't exit the current recursion level while the node still has unvisited neighbours
    while (neighbours.find((neighbour) => !neighbour.maze.isVisited)) {
      const next = randomlyChooseNext(neighbours);
      if (!next.maze.isVisited) {
        const xCoord = next.coords.row - currentNode.coords.row;
        const yCoord = next.coords.col - currentNode.coords.col;
        next.maze.isVisited = true;

        // The next node is positioned south of the current one
        if (xCoord === -1 && yCoord === 0) {
          next.walls.south = false;
          currentNode.walls.north = false;
        }

        // The next node is positioned west of the current one
        if (xCoord === 0 && yCoord === 1) {
          next.walls.west = false;
          currentNode.walls.east = false;
        }

        // The next node is positioned north of the current one
        if (xCoord === 1 && yCoord === 0) {
          next.walls.north = false;
          currentNode.walls.south = false;
        }

        // The next node is positioned east of the current one
        if (xCoord === 0 && yCoord === -1) {
          next.walls.east = false;
          currentNode.walls.west = false;
        }

        // Repeat until no nodes are left
        loop(next);
      }
    }

    currentNode.maze.lastVisitDelay = delay;
    delay += MAZE_BUILDING_DELAY;
  }

  loop(deepCloneStartNode);

  handleSetVisitedNodes([...visited]);
  handleSetSnapshot([...visited]);
}
