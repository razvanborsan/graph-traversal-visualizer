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

export const getNodeElements = (adjacencyList, mazeType) => {
  const nodeElements = [];

  adjacencyList.forEach((value) => {
    nodeElements.push(
      <WrapItem key={value.id} style={{ margin: 0, padding: 0 }}>
        <Node
          controlState={value.controlState}
          maze={value.maze}
          mazeType={mazeType}
          delays={value.delays}
          color={value.color}
          walls={value.walls}
        />
      </WrapItem>,
    );
  });
  return nodeElements;
};
