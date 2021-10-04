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

export function addEdge(origin, destination) {
  if (!origin.neighbours.find((node) => node.id === destination.id)) {
    origin.neighbours.push(destination);
  }
}

export const getNodeElements = (adjacencyList) => {
  const nodeElements = [];

  adjacencyList.forEach((value) => {
    nodeElements.push(
      <WrapItem key={value.id} style={{ margin: 0, padding: 0 }}>
        <Node
          controlState={value.controlState}
          maze={value.maze}
          delays={value.delays}
          color={value.color}
          walls={value.walls}
        />
      </WrapItem>,
    );
  });
  return nodeElements;
};
