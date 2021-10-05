import { getNodeKey, buildNodeKey } from 'components/GraphVisualizer/helpers';

const DFS_DELAY = 0.05;

export default function dfs(adjacencyList, start, handleSetVisitedNodes) {
  const visited = [];

  let foundTarget = false;
  let keyframeDelay = 0;
  let finalRoute = new Map();

  // Deep clone the adjacency list so we never modify it directly
  const deepCloneAdjacencyList = new Map();
  adjacencyList.forEach((value, key) => {
    deepCloneAdjacencyList.set(key, value);
  });
  const deepCloneStartNode = deepCloneAdjacencyList.get(getNodeKey(start));

  function loop(currentNode) {
    const { neighbours } = currentNode;

    currentNode.controlState.isVisited = true;
    currentNode.delays.keyframeDelay = keyframeDelay;
    keyframeDelay += DFS_DELAY;

    visited.push(currentNode);

    neighbours.forEach((neighbour) => {
      if (neighbour.controlState.isEnd) {
        // The last node must remember the route from itself back to the starting point
        currentNode.routeToStart.forEach((value, key) => {
          neighbour.routeToStart.set(key, value);
        });
        neighbour.routeToStart.set(getNodeKey(currentNode), currentNode);
        neighbour.delays.keyframeDelay = keyframeDelay;

        // Copy the route from start to target separately
        finalRoute = neighbour.routeToStart;

        foundTarget = true;
        return;
      }

      if (!visited.find((node) => node.id === neighbour.id) && !foundTarget) {
        // Every node remembers the route from itself back to the starting point
        currentNode.routeToStart.forEach((value, key) => {
          neighbour.routeToStart.set(key, value);
        });
        neighbour.routeToStart.set(getNodeKey(currentNode), currentNode);
        loop(neighbour);
      }
    });
  }

  loop(deepCloneStartNode);

  // Go through each node and mark it if it's part of the route to target
  deepCloneAdjacencyList.forEach((node) => {
    const { row, col } = node.coords;
    const nodeKey = buildNodeKey(row, col);
    const isPartOfFinalRoute = finalRoute?.has(nodeKey) || false;

    node.controlState.isPartOfFinalRoute = isPartOfFinalRoute;

    // Find the node's place in the visited nodes array
    const currentNodeVisitedIndex = visited?.indexOf(finalRoute?.get(nodeKey));

    // take only the elements that were visited before our current node
    const visitedBeforeCurrentNode = visited.slice(0, currentNodeVisitedIndex);

    // This is the number of nodes that have been visited but are not leading to the target
    const dissipatedNodes = visitedBeforeCurrentNode?.length
      - visitedBeforeCurrentNode?.filter((node) => finalRoute?.has(buildNodeKey(node.coords.row, node.coords.col)))?.length;

    // When animating the final route from start to end,
    // we remove the delay time it took to animate all the nodes not leading to the target
    // The last keyframeDelay is the entire duration of the animation
    node.delays.finalRouteKeyframeDelay = keyframeDelay - dissipatedNodes * DFS_DELAY;
  });

  handleSetVisitedNodes([...visited]);
}
