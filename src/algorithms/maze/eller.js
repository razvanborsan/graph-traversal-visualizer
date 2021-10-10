import { MAZE } from 'components/GraphVisualizer/constants';
import { buildNodeKey } from 'components/GraphVisualizer/helpers';

export default function eller(adjacencyList, handleSetVisitedNodes) {
  const visited = [];
  let uniqueSetNumber = 0;
  let delay = 0;

  for (let row = 0; row < MAZE.ROWS; row += 1) {
    const currentRowVisited = [];
    if (row === 0) {
      // Assign a unique set for each column in the first row
      for (let col = 0; col < MAZE.COLS; col += 1) {
        const nodeKey = buildNodeKey(row, col);
        const currNode = adjacencyList.get(nodeKey);

        currNode.maze.ellerSet = col;
        uniqueSetNumber += 1;
      }
    } else {
      // For the other rows, if there isn't a wall above a node, assign it to
      // the set of the above node. Otherwise, assign it to a new unique set
      for (let col = 0; col < MAZE.COLS; col += 1) {
        const nodeKey = buildNodeKey(row, col);
        const aboveNodeKey = buildNodeKey(row - 1, col);

        const currNode = adjacencyList.get(nodeKey);
        const aboveNode = adjacencyList.get(aboveNodeKey);

        if (currNode.walls.north === false) {
          currNode.maze.ellerSet = aboveNode.maze.ellerSet;
        } else {
          currNode.maze.ellerSet = uniqueSetNumber;
          uniqueSetNumber += 1;
        }
      }
    }

    // If we're not generating the last row
    if (row !== MAZE.ROWS - 1) {
      // Iterate through each column
      for (let col = 0; col < MAZE.COLS; col += 1) {
        const nodeKey = buildNodeKey(row, col);
        const nextNodeKey = buildNodeKey(row, col + 1);

        const currNode = adjacencyList.get(nodeKey);
        const nextNode = adjacencyList.get(nextNodeKey);

        // If the columns are part of different sets,
        // randomly decide to destroy the wall between them
        // and union the sets
        if (currNode.maze.ellerSet !== nextNode?.maze?.ellerSet) {
          if (Math.random() > 0.5) {
            if (nextNode) {
              currNode.walls.east = false;
              nextNode.walls.west = false;

              const setToUnion = nextNode.maze.ellerSet;

              for (let column = 0; column < MAZE.COLS; column += 1) {
                const newUnionNodeKey = buildNodeKey(row, column);
                const newUnionNode = adjacencyList.get(newUnionNodeKey);

                if (newUnionNode.maze.ellerSet === setToUnion) {
                  newUnionNode.maze.ellerSet = currNode.maze.ellerSet;
                }
              }
            }
          }
        }

        currentRowVisited.push(currNode);
      }

      // Iterate again through each column and randomly destroy bottom walls
      // Every set must have at least one bottom wall destroyed
      for (let col = 0; col < MAZE.COLS; col += 1) {
        const nodeKey = buildNodeKey(row, col);
        const currNode = adjacencyList.get(nodeKey);

        const belowNodeKey = buildNodeKey(row + 1, col);
        const belowNode = adjacencyList.get(belowNodeKey);

        const currentSetIndex = currNode.maze.ellerSet;
        const currentSet = currentRowVisited.filter(
          (node) => node.maze.ellerSet === currentSetIndex,
        );
        const totalSouthWalls = currentSet.filter(
          (node) => !node.walls.south,
        ).length;

        // If there is a single element present in the set, destroy it's south wall
        // Else, If the current node is the last element in its set and no paths to below nodes
        // have been created, destroy its bottom wall
        // Else, randomly decide whether to remove the bottom wall
        if (currentSet.length === 1) {
          currNode.walls.south = false;
          belowNode.walls.north = false;
        } else if (
          totalSouthWalls === 0
          && currentSet.at(-1).id === currNode.id
        ) {
          currNode.walls.south = false;
          belowNode.walls.north = false;
        } else if (Math.random() < 0.5) {
          currNode.walls.south = false;
          belowNode.walls.north = false;
        }
        currNode.maze.isVisited = true;
        visited.push(currNode);
      }
    } else {
      // For the last row, iterate through every cell
      for (let col = 0; col < MAZE.COLS; col += 1) {
        const nodeKey = buildNodeKey(row, col);
        const nextNodeKey = buildNodeKey(row, col + 1);
        const prevNodeKey = buildNodeKey(row, col - 1);

        const currNode = adjacencyList.get(nodeKey);
        const nextNode = adjacencyList.get(nextNodeKey);
        const prevNode = adjacencyList.get(prevNodeKey);

        const currentSetIndex = currNode.maze.ellerSet;
        const currentSet = currentRowVisited.filter(
          (node) => node.maze.ellerSet === currentSetIndex,
        );

        // if they're not part of the same set, remove the wall
        if (currNode.maze.ellerSet !== nextNode?.maze?.ellerSet) {
          if (nextNode) {
            currNode.walls.east = false;
            nextNode.walls.west = false;
          }
        }

        // Make sure that there is a wall between every 2 elements of the same set
        if (currentSet.length > 0) {
          let noBorderFound = true;

          // If there isn't a wall between the current node and the previous node
          // in its own set, add a wall
          if (currentSet.at(-1).walls.east === true) {
            noBorderFound = false;
          }

          if (noBorderFound && prevNode) {
            currNode.walls.west = true;
            prevNode.walls.east = true;
          }
        }

        currNode.maze.isVisited = true;
        currentRowVisited.push(currNode);
      }
    }

    // Add every node of the last row to the visited array
    for (let col = 0; col < MAZE.COLS; col += 1) {
      const nodeKey = buildNodeKey(row, col);
      const currNode = adjacencyList.get(nodeKey);

      currNode.maze.firstVisitDelay = delay;
      currNode.maze.lastVisitDelay = delay;
      delay += 0.01;
      visited.push(currNode);
    }
  }
  handleSetVisitedNodes([...visited]);
}
