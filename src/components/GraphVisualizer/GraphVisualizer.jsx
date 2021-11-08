import React, { useEffect, useState } from 'react';

import { Button, Select, Checkbox } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

import {
  bfs,
  dfs,
  dijkstra,
  recursiveBacktracking,
  eller,
  prim,
  recursiveDivision,
} from 'algorithms';

import Pathfinder from './Pathfinder';

import {
  addEdge,
  buildNodeKey,
  changeWeights,
  findDirection,
  getNodeElements,
  getNodeKey,
  removeWeights,
  resetPath,
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
  const [weights, setWeights] = useState(false);
  const [startPointCoords, setStartPointCoords] = useState('5-10');
  const [endPointCoords, setEndPointCoords] = useState('5-25');
  const [isMazeBuild, setIsMazeBuild] = useState(false);

  const handleSetVisitedNodes = (visited) => {
    setVisitedNodes(visited);
  };

  const handleSetAdjacencyList = (newList) => {
    setAdjacencyList(newList);
  };

  const handleSetSnapshot = (visited) => {
    setSnapshot(visited);
  };

  const handleSetEnableFindPath = (value) => {
    setEnableFindPath(value);
  };

  const handleSetAnimateIfNotPathReset = (value) => {
    setAnimateIfNotPathReset(value);
  };

  const handlers = {
    handleSetVisitedNodes,
    handleSetAdjacencyList,
    handleSetSnapshot,
    handleSetEnableFindPath,
    handleSetAnimateIfNotPathReset,
  };

  // If the start/end points are moved, reset the current path
  useEffect(() => {
    if (adjacencyList) {
      resetPath(
        handlers,
        snapshot,
        adjacencyList,
        startPointCoords,
        endPointCoords,
      );
    }
  }, [startPointCoords, endPointCoords]);

  const changeStartPoint = (deepClone) => {
    deepClone.forEach((value) => {
      value.controlState.isStart = false;
      value.routeToStart = new Map();
      value.neighbours = value.neighbours.map((neighbour) => ({
        ...neighbour,
        routeToStart: new Map(),
      }));
    });
    const startNode = deepClone.get(startPointCoords);

    startNode.controlState.isStart = true;
    startNode.controlState.isWeighted = false;
    setNodeElements(() => [
      ...getNodeElements(
        deepClone,
        mazeType,
        isMazeAnimated,
        setStartPointCoords,
        setEndPointCoords,
      ),
    ]);
    setAdjacencyList(deepClone);
  };

  const changeEndPoint = (deepClone) => {
    deepClone.forEach((value) => {
      value.controlState.isEnd = false;
      value.routeToStart = new Map();
      value.neighbours = value.neighbours.map((neighbour) => ({
        ...neighbour,
        routeToStart: new Map(),
      }));
    });
    const endNode = deepClone.get(endPointCoords);

    endNode.controlState.isEnd = true;
    endNode.controlState.isWeighted = false;
    setNodeElements(() => [
      ...getNodeElements(
        deepClone,
        mazeType,
        isMazeAnimated,
        setStartPointCoords,
        setEndPointCoords,
      ),
    ]);
    setAdjacencyList(deepClone);
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
      setWeights(false);

      const noWeightsInitialNodes = getInitialNodes(false);

      // This function runs only once; we build the graph here
      const deepClone = new Map();
      noWeightsInitialNodes.forEach((node) => {
        deepClone.set(getNodeKey(node), node);
      });

      noWeightsInitialNodes.forEach((node) => {
        const { row, col } = node.coords;
        const { x, y } = possibleNeighbourCoords;

        for (let i = 0; i < x.length; i += 1) {
          const neighbourKey = buildNodeKey(row + x[i], col + y[i]);

          if (deepClone.has(neighbourKey)) {
            addEdge(...[node.maze, deepClone.get(neighbourKey)]);
          }
        }
      });

      changeStartPoint(deepClone);
      changeEndPoint(deepClone);
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
        setStartPointCoords,
        setEndPointCoords,
      );
      setAnimateIfNotPathReset(true);
      setNodeElements(() => [...nodeElementsArray]);
      setAdjacencyList(deepClone);
    }
  }, [visitedNodes]);

  return (
    <>
      <Pathfinder elements={nodeElements} />
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignitems: 'flex-start',
          gap: 15,
          marginBottom: 15,
        }}
      >
        <Box style={{ width: 230 }}>
          <Select
            onChange={(e) => {
              setEnableStart(true);
              setReset(true);
              setVisitedNodes([]);
              setIsMazeBuild(false);
              setMazeType(e.target.value);
              setPathfinderAlgo('bfs');
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
        <Checkbox
          colorScheme="green"
          onChange={() => setIsMazeAnimated(!isMazeAnimated)}
          isChecked={isMazeAnimated}
        >
          Animate maze
        </Checkbox>
        <Button
          disabled={
            !isMazeBuild || pathfinderAlgo !== 'dijkstra' || !enableFindPath
          }
          onClick={() =>
            changeWeights(
              weights,
              visitedNodes,
              changeStartPoint,
              handleSetSnapshot,
              setWeights,
              handleSetVisitedNodes,
              adjacencyList,
            )
          }
        >
          Change Weigths
        </Button>

        <Button
          colorScheme="teal"
          disabled={!enableStart}
          onClick={() => {
            setIsMazeBuild(true);
            setEnableStart(false);
            setEnableFindPath(true);
            switch (mazeType) {
              case MAZE_TYPES.BACKTRACKING:
                recursiveBacktracking(
                  adjacencyList,
                  adjacencyList.get(startPointCoords),
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
        <Button
          colorScheme="red"
          onClick={() => {
            setIsMazeBuild(false);
            setEnableStart(true);
            setReset(true);
          }}
        >
          Reset Maze
        </Button>
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignitems: 'flex-start',
          gap: 15,
          marginBottom: 15,
        }}
      >
        <Box style={{ width: 230 }}>
          <Select
            disabled={!enableFindPath || !isMazeBuild}
            value={pathfinderAlgo}
            onChange={(e) => {
              if (e.target.value !== 'dijkstra') {
                removeWeights(
                  weights,
                  visitedNodes,
                  changeStartPoint,
                  handleSetSnapshot,
                  setWeights,
                  handleSetVisitedNodes,
                  adjacencyList,
                );
              } else {
                changeWeights(
                  weights,
                  visitedNodes,
                  changeStartPoint,
                  handleSetSnapshot,
                  setWeights,
                  handleSetVisitedNodes,
                  adjacencyList,
                );
              }
              setPathfinderAlgo(e.target.value);
            }}
          >
            <option value="bfs">Breadth First Search</option>
            <option value="dfs">Depth First Search</option>
            <option value="dijkstra">Dijkstra's Algorithm</option>
          </Select>
        </Box>
        <Button
          colorScheme="teal"
          disabled={!enableFindPath || !isMazeBuild}
          onClick={() => {
            setEnableFindPath(false);
            switch (pathfinderAlgo) {
              case 'dfs':
                dfs(
                  adjacencyList,
                  adjacencyList.get(startPointCoords),
                  handleSetVisitedNodes,
                  handleSetAdjacencyList,
                );
                break;
              case 'bfs':
                bfs(
                  adjacencyList,
                  adjacencyList.get(startPointCoords),
                  handleSetVisitedNodes,
                  handleSetAdjacencyList,
                );
                break;
              case 'dijkstra':
                dijkstra(
                  adjacencyList,
                  adjacencyList.get(startPointCoords),
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

        <Button
          colorScheme="red"
          onClick={() => {
            resetPath(
              handlers,
              snapshot,
              adjacencyList,
              startPointCoords,
              endPointCoords,
            );
          }}
        >
          Reset path
        </Button>
      </Box>
    </>
  );
}
