/* eslint-disable import/prefer-default-export */
import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';

export const getInsertionCost = (previous, toInsert, next) => {
  const costBeforeInsertion = getDistanceFromCoords(
    previous.geometry.coordinates,
    next.geometry.coordinates,
  );
  const costAfterInsertion =
    getDistanceFromCoords(
      previous.geometry.coordinates,
      toInsert.geometry.coordinates,
    ) +
    getDistanceFromCoords(
      toInsert.geometry.coordinates,
      next.geometry.coordinates,
    );

  return costAfterInsertion - costBeforeInsertion;
};

export const computeCost = (path, nextPoint) => {
  let [bestCost, bestPointIndex] = [Infinity, null];

  for (let i = 1; i < path.length; i += 1) {
    const insertionCost = getInsertionCost(path[i - 1], nextPoint, path[i]);
    if (insertionCost < bestCost) {
      [bestCost, bestPointIndex] = [insertionCost, i];
    }
  }

  return bestPointIndex;
};

export const totalPathCost = (path) => {
  let distance = 0;

  path.forEach((point, pointIndex) => {
    if (pointIndex > 0) {
      distance += getDistanceFromCoords(
        path[pointIndex - 1].geometry.coordinates,
        path[pointIndex].geometry.coordinates,
      );
    }
  });

  return distance;
};
