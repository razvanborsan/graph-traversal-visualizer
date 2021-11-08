import { getNodeKey } from 'components/GraphVisualizer/helpers';

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

  // run while there are still nodes left to visit
  while (nodesToVisitQueue.length > 0) {
    const currentNode = nodesToVisitQueue.shift();
    currentNode.controlState.isVisited = true;
    currentNode.delays.keyframeDelay = getBFSDelay(currentNode);

    visited.push(currentNode);

    const { neighbours } = currentNode;
    neighbours.forEach((neighbour) => {
      const originalNeighbourNode = deepCloneAdjacencyList.get(
        getNodeKey(neighbour),
      );

      if (originalNeighbourNode.controlState.isEnd) {
        currentNode.routeToStart.forEach((value, key) => {
          originalNeighbourNode.routeToStart.set(key, value);
        });
        originalNeighbourNode.routeToStart.set(
          getNodeKey(currentNode),
          currentNode,
        );

        keyframeDelay = getBFSDelay(currentNode);
        originalNeighbourNode.delays.keyframeDelay = keyframeDelay;

        isTargetFound = true;

        return undefined;
      }
      if (
        !visited.find((node) => node.id === originalNeighbourNode.id) &&
        !isTargetFound
      ) {
        currentNode.routeToStart.forEach((value, key) => {
          originalNeighbourNode.routeToStart.set(key, value);
        });
        originalNeighbourNode.routeToStart.set(
          getNodeKey(currentNode),
          currentNode,
        );
        nodesToVisitQueue.push(originalNeighbourNode);
      }
    });
  }

  let endNode = null;
  deepCloneAdjacencyList.forEach((node) => {
    if (node.controlState.isEnd) {
      endNode = node;
    }
  });

  endNode.routeToStart.forEach((node) => {
    node.controlState.isPartOfFinalRoute = true;

    node.delays.finalRouteKeyframeDelay = keyframeDelay;
  });

  handleSetAdjacencyList(deepCloneAdjacencyList);
  handleSetVisitedNodes([...visited]);
}
