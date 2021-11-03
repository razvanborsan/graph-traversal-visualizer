import { getNodeKey, buildNodeKey } from 'components/GraphVisualizer/helpers';

const getBFSDelay = (node) => node.routeToStart.size / 20;

export default function bfs(
  adjacencyList,
  start,
  handleSetVisitedNodes,
  handleSetAdjacencyList,
) {
  // Deep clone the adjacency list so we never modify it directly
  const deepCloneAdjacencyList = new Map();
  adjacencyList.forEach((value, key) => {
    deepCloneAdjacencyList.set(key, value);
  });
  const deepCloneStartNode = deepCloneAdjacencyList.get(getNodeKey(start));

  const visited = [];
  const nodesToVisitQueue = [deepCloneStartNode];
  let keyframeDelay = 0;
  let isTargetFound = false;
  let finalRoute = new Map();

  // run while there are still nodes left to visit
  while (nodesToVisitQueue.length > 0) {
    const currentNode = nodesToVisitQueue.shift();
    currentNode.controlState.isVisited = true;
    currentNode.delays.keyframeDelay = getBFSDelay(currentNode);
    visited.push(currentNode);

    const { neighbours } = currentNode;
    neighbours.forEach((neighbour) => {
      if (neighbour.controlState.isEnd) {
        currentNode.routeToStart.forEach((value, key) => {
          neighbour.routeToStart.set(key, value);
        });
        neighbour.routeToStart.set(getNodeKey(currentNode), currentNode);

        keyframeDelay = getBFSDelay(currentNode);
        neighbour.delays.keyframeDelay = keyframeDelay;

        finalRoute = neighbour.routeToStart;

        isTargetFound = true;

        return undefined;
      }
      if (!visited.find((node) => node.id === neighbour.id) && !isTargetFound) {
        currentNode.routeToStart.forEach((value, key) => {
          neighbour.routeToStart.set(key, value);
        });
        neighbour.routeToStart.set(getNodeKey(currentNode), currentNode);
        nodesToVisitQueue.push(neighbour);
      }
    });
  }

  deepCloneAdjacencyList.forEach((node) => {
    const { row, col } = node.coords;

    const nodeKey = buildNodeKey(row, col);
    const isPartOfFinalRoute = finalRoute?.has(nodeKey) || false;

    node.controlState.isPartOfFinalRoute = isPartOfFinalRoute;
    node.delays.finalRouteKeyframeDelay = keyframeDelay;
  });

  handleSetAdjacencyList(deepCloneAdjacencyList);
  handleSetVisitedNodes([...visited]);
}
