import React, { useEffect, useState } from 'react';

import { Button, Select, Box, Checkbox } from '@chakra-ui/react';
import { Flex, Wrap, Spacer } from '@chakra-ui/layout';

import {
  bfs,
  dfs,
  recursiveBacktracking,
  eller,
  prim,
  recursiveDivision,
} from 'algorithms';

import {
  addEdge,
  buildNodeKey,
  findDirection,
  getNodeElements,
  getNodeKey,
} from './helpers';

import {
  possibleNeighbourCoords,
  DIRECTIONS,
  MAZE_TYPES,
  getInitialNodes,
} from './constants';

export default function GraphVisualizer() {
  const [nodeElements, setNodeElements] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [adjacencyList, setAdjacencyList] = useState();
  const [isMazeAnimated, setIsMazeAnimated] = useState(true);
  const [animateIfNotPathReset, setAnimateIfNotPathReset] = useState(true);
  const [reset, setReset] = useState(true);
  const [enableStart, setEnableStart] = useState(true);
  const [enableFindPath, setEnableFindPath] = useState(false);
  const [mazeType, setMazeType] = useState(MAZE_TYPES.BACKTRACKING);
  const [pathfinderAlgo, setPathfinderAlgo] = useState('bfs');
  const [snapshot, setSnapshot] = useState([]);

  const handleSetVisitedNodes = (visited) => {
    setVisitedNodes(visited);
  };

  const handleSetAdjacencyList = (newList) => {
    setAdjacencyList(newList);
  };

  const handleSetSnapshot = (visited) => {
    setSnapshot(visited);
  };

  const startPoint = (deepClone) => {
    const startNode = deepClone.get('0-0');

    startNode.controlState.isStart = true;
    setNodeElements(() => [
      ...getNodeElements(deepClone, mazeType, isMazeAnimated),
    ]);
    setAdjacencyList(deepClone);
  };

  const endPoint = (deepClone) => {
    const startNode = deepClone.get('5-25');

    startNode.controlState.isEnd = true;
    setNodeElements(() => [
      ...getNodeElements(deepClone, mazeType, isMazeAnimated),
    ]);
    setAdjacencyList(deepClone);
  };

  useEffect(() => {
    if (reset) {
      setReset(false);

      // This function runs only once; we build the graph here
      const initialNodes = getInitialNodes();
      const deepClone = new Map();
      initialNodes.forEach((node) => {
        deepClone.set(getNodeKey(node), node);
      });

      initialNodes.forEach((node) => {
        const { row, col } = node.coords;
        const { x, y } = possibleNeighbourCoords;

        for (let i = 0; i < x.length; i += 1) {
          const neighbourKey = buildNodeKey(row + x[i], col + y[i]);

          if (deepClone.has(neighbourKey)) {
            addEdge(...[node.maze, deepClone.get(neighbourKey)]);
          }
        }
      });

      const nodeElementsArray = getNodeElements(
        deepClone,
        mazeType,
        isMazeAnimated,
      );
      setNodeElements(() => [...nodeElementsArray]);
      setAdjacencyList(deepClone);
      startPoint(deepClone);
      endPoint(deepClone);
    }
  }, [reset]);

  useEffect(() => {
    // We use this function to upgrade the graph when it is traversed
    if (visitedNodes.length) {
      const deepClone = new Map();
      adjacencyList?.forEach((value, key) =>
        deepClone.set(
          key,
          visitedNodes.find((val) => val.id === value.id) || value,
        ),
      );

      visitedNodes.forEach((node) => {
        const { row, col } = node.coords;
        const { x, y } = possibleNeighbourCoords;

        for (let i = 0; i < x.length; i += 1) {
          const neighbourKey = buildNodeKey(row + x[i], col + y[i]);

          if (deepClone.has(neighbourKey)) {
            const next = deepClone.get(neighbourKey);

            // the difference in coordinates shows us the direction of the neighbour
            const xDirection = next.coords.row - node.coords.row;
            const yDirection = next.coords.col - node.coords.col;

            const direction = findDirection(xDirection, yDirection);
            const { north, east, south, west } = node.walls;

            // We only add an edge if there is no wall between the 2 neighbours
            if (
              (direction === DIRECTIONS.NORTH && !north) ||
              (direction === DIRECTIONS.EAST && !east) ||
              (direction === DIRECTIONS.SOUTH && !south) ||
              (direction === DIRECTIONS.WEST && !west)
            ) {
              addEdge(...[node, next]);
            }
          }
        }
      });

      const nodeElementsArray = getNodeElements(
        deepClone,
        mazeType,
        isMazeAnimated && animateIfNotPathReset,
      );
      setAnimateIfNotPathReset(true);
      setNodeElements(() => [...nodeElementsArray]);
      setAdjacencyList(deepClone);
    }
  }, [visitedNodes]);

  return (
    <>
      <Wrap
        style={{
          width: 1080,
          paddingBottom: 25,
        }}
      >
        {nodeElements}
      </Wrap>

      <Flex>
        <Box style={{ width: 230 }}>
          <Select
            onChange={(e) => {
              setPathfinderAlgo(e.target.value);
            }}
          >
            <option value="bfs">Breadth First Search</option>
            <option value="dfs">Depth First Search</option>
          </Select>
        </Box>
        <Spacer />

        <Button
          colorScheme="teal"
          disabled={!enableFindPath}
          onClick={() => {
            setEnableFindPath(false);
            switch (pathfinderAlgo) {
              case 'dfs':
                dfs(
                  adjacencyList,
                  adjacencyList.get('0-0'),
                  handleSetVisitedNodes,
                  handleSetAdjacencyList,
                );
                break;
              case 'bfs':
                bfs(
                  adjacencyList,
                  adjacencyList.get('0-0'),
                  handleSetVisitedNodes,
                  handleSetAdjacencyList,
                );
                break;
              default:
            }
          }}
        >
          Find path
        </Button>
        <Spacer />

        <Button
          colorScheme="red"
          onClick={() => {
            setEnableFindPath(true);
            setAnimateIfNotPathReset(false);
            setVisitedNodes(
              [...snapshot].map((value) => ({
                ...value,
                controlState: {
                  ...value.controlState,
                  isVisited: false,
                  isPartOfFinalRoute: false,
                },
                routeToStart: new Map(),
              })),
            );

            const deepClone = new Map();
            adjacencyList.forEach((value, key) =>
              deepClone.set(key, {
                ...value,
                controlState: {
                  ...value.controlState,
                  isVisited: false,
                  isPartOfFinalRoute: false,
                },
                routeToStart: new Map(),
              }),
            ),
              setAdjacencyList(deepClone);
          }}
        >
          Reset path
        </Button>
        <Spacer />

        <Box style={{ width: 230 }}>
          <Select
            onChange={(e) => {
              setEnableStart(true);
              setReset(true);
              setVisitedNodes([]);
              setMazeType(e.target.value);
            }}
          >
            <option value={MAZE_TYPES.BACKTRACKING}>
              Recursive Backtracking
            </option>
            <option value={MAZE_TYPES.ELLER}>Eller&apos;s Algorithm</option>
            <option value={MAZE_TYPES.PRIM}>Prim&apos;s Algorithm</option>
            <option value={MAZE_TYPES.RECURSIVE_DIVISION}>
              Recursive Division
            </option>
          </Select>
        </Box>

        <Spacer />

        <Checkbox
          colorScheme="green"
          onChange={() => setIsMazeAnimated(!isMazeAnimated)}
          isChecked={isMazeAnimated}
        >
          Animate maze
        </Checkbox>
        <Spacer />

        <Button
          colorScheme="teal"
          disabled={!enableStart}
          onClick={() => {
            setEnableStart(false);
            setEnableFindPath(true);
            // setSnapshot(adjacencyList);
            switch (mazeType) {
              case MAZE_TYPES.BACKTRACKING:
                recursiveBacktracking(
                  adjacencyList,
                  adjacencyList.get('0-0'),
                  handleSetVisitedNodes,
                  handleSetSnapshot,
                );
                break;
              case MAZE_TYPES.ELLER:
                eller(adjacencyList, handleSetVisitedNodes, handleSetSnapshot);
                break;
              case MAZE_TYPES.PRIM:
                prim(adjacencyList, handleSetVisitedNodes, handleSetSnapshot);
                break;
              case MAZE_TYPES.RECURSIVE_DIVISION:
                recursiveDivision(
                  adjacencyList,
                  handleSetVisitedNodes,
                  handleSetAdjacencyList,
                  handleSetSnapshot,
                );
                break;
              default:
            }
          }}
        >
          Build Maze
        </Button>

        <Spacer />

        <Button
          colorScheme="red"
          onClick={() => {
            setEnableStart(true);
            setReset(true);
          }}
        >
          Reset Maze
        </Button>
      </Flex>
    </>
  );
}
