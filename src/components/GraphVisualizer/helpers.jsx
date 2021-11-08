import React from 'react';
import { WrapItem } from '@chakra-ui/layout';

import Node from 'components/Node';

import { DIRECTIONS } from './constants';

export function getNodeKey(node) {
  return `${node.coords.row}-${node.coords.col}`;
}

export function buildNodeKey(row, col) {
  return `${row}-${col}`;
}

export const findDirection = (xCoord, yCoord) => {
  if (xCoord === -1 && yCoord === 0) {
    return DIRECTIONS.NORTH;
  }

  if (xCoord === 0 && yCoord === 1) {
    return DIRECTIONS.EAST;
  }

  if (xCoord === 1 && yCoord === 0) {
    return DIRECTIONS.SOUTH;
  }

  if (xCoord === 0 && yCoord === -1) {
    return DIRECTIONS.WEST;
  }
};

export const removeWallBetweenNodes = (rootNode, neighbourNode) => {
  // the difference in coordinates shows use the direction of the neighbour
  const xDirection = neighbourNode.coords.row - rootNode.coords.row;
  const yDirection = neighbourNode.coords.col - rootNode.coords.col;

  const direction = findDirection(xDirection, yDirection);

  switch (direction) {
    case DIRECTIONS.NORTH:
      rootNode.walls.north = false;
      neighbourNode.walls.south = false;
      break;
    case DIRECTIONS.EAST:
      rootNode.walls.east = false;
      neighbourNode.walls.west = false;
      break;
    case DIRECTIONS.WEST:
      rootNode.walls.west = false;
      neighbourNode.walls.east = false;
      break;
    case DIRECTIONS.SOUTH:
      rootNode.walls.south = false;
      neighbourNode.walls.north = false;
      break;
    default:
      break;
  }
};

export function addEdge(origin, destination) {
  if (!origin.neighbours.find((node) => node.id === destination.id)) {
    origin.neighbours.push(destination);
  }
}

export const getNodeElements = (
  adjacencyList,
  mazeType,
  isMazeAnimated,
  setStartPointCoords,
  setEndPointCoords,
) => {
  const nodeElements = [];
  adjacencyList.forEach((value) => {
    nodeElements.push(
      <WrapItem key={value.id} style={{ margin: 0, padding: 0 }}>
        <Node
          coords={value.coords}
          controlState={value.controlState}
          isMazeAnimated={isMazeAnimated}
          weight={value.weight}
          maze={value.maze}
          mazeType={mazeType}
          delays={value.delays}
          color={value.color}
          walls={value.walls}
          setStartPointCoords={setStartPointCoords}
          setEndPointCoords={setEndPointCoords}
        />
      </WrapItem>,
    );
  });
  return nodeElements;
};

export function resetPath(
  handlers,
  snapshot,
  adjacencyList,
  startPointCoords,
  setEndPointCoords,
) {
  const {
    handleSetEnableFindPath,
    handleSetAnimateIfNotPathReset,
    handleSetVisitedNodes,
    handleSetAdjacencyList,
  } = handlers;
  handleSetEnableFindPath(true);
  handleSetAnimateIfNotPathReset(false);
  // reset visited nodes array
  handleSetVisitedNodes(
    [...snapshot].map((value) => ({
      ...value,
      controlState: {
        ...value.controlState,
        isEnd:
          buildNodeKey(value.coords.row, value.coords.col) ===
          setEndPointCoords,
        isStart:
          buildNodeKey(value.coords.row, value.coords.col) === startPointCoords,
        isVisited: false,
        isPartOfFinalRoute: false,
      },
      neighbours: value.neighbours.map((neighbour) => ({
        ...neighbour,
        controlState: {
          ...neighbour.controlState,
          isVisited: false,
        },
        routeToStart: new Map(),
      })),
      routeToStart: new Map(),
    })),
  );

  // reset adjacency list
  const deepClone = new Map();
  adjacencyList.forEach((value, key) =>
    deepClone.set(key, {
      ...value,
      controlState: {
        ...value.controlState,
        isEnd:
          buildNodeKey(value.coords.row, value.coords.col) ===
          setEndPointCoords,
        isStart:
          buildNodeKey(value.coords.row, value.coords.col) === startPointCoords,
        isVisited: false,
        isPartOfFinalRoute: false,
      },
      neighbours: value.neighbours.map((neighbour) => ({
        ...neighbour,
        controlState: {
          ...neighbour.controlState,
          isEnd:
            buildNodeKey(value.coords.row, value.coords.col) ===
            setEndPointCoords,
          isStart:
            buildNodeKey(neighbour.coords.row, neighbour.coords.col) ===
            startPointCoords,
          isVisited: false,
        },
        routeToStart: new Map(),
      })),
      routeToStart: new Map(),
    }),
  );
  handleSetAdjacencyList(deepClone);
}

export const changeWeights = (
  weights,
  visitedNodes,
  changeEndPoint,
  handleSetSnapshot,
  setWeights,
  handleSetVisitedNodes,
  adjacencyList,
) => {
  const currentWeight = !weights;
  const weightedVisitedNodes = visitedNodes.map((node) => {
    const random = Math.random() > 0.95;

    return {
      ...node,
      controlState: {
        ...node.controlState,
        isWeighted: random,
      },
      weight: random ? 15 : 1,
    };
  });

  const newVisitedNodes = weightedVisitedNodes.map((node) => ({
    ...node,
    neighbours: node.neighbours.map((neighbour) =>
      weightedVisitedNodes.find((entry) => entry.id === neighbour.id),
    ),
  }));
  handleSetVisitedNodes(newVisitedNodes);

  const deepClone = new Map();
  adjacencyList?.forEach((value, key) => {
    deepClone.set(
      key,
      newVisitedNodes.find((val) => val.id === value.id) || value,
    );
  });

  changeEndPoint(deepClone);
  handleSetSnapshot(newVisitedNodes);
  setWeights(currentWeight);
};

export const removeWeights = (
  weights,
  visitedNodes,
  changeEndPoint,
  handleSetSnapshot,
  setWeights,
  handleSetVisitedNodes,
  adjacencyList,
) => {
  const currentWeight = !weights;
  const weightedVisitedNodes = visitedNodes.map((node) => ({
    ...node,
    controlState: {
      ...node.controlState,
      isWeighted: false,
    },
    weight: 1,
  }));

  const newVisitedNodes = weightedVisitedNodes.map((node) => ({
    ...node,
    neighbours: node.neighbours.map((neighbour) =>
      weightedVisitedNodes.find((entry) => entry.id === neighbour.id),
    ),
  }));
  handleSetVisitedNodes(newVisitedNodes);

  const deepClone = new Map();
  adjacencyList?.forEach((value, key) => {
    deepClone.set(
      key,
      newVisitedNodes.find((val) => val.id === value.id) || value,
    );
  });

  changeEndPoint(deepClone);
  handleSetSnapshot(newVisitedNodes);
  setWeights(currentWeight);
};
