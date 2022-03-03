import usaCapitals from 'components/TspVisualizer/UsaCapitals';
import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';

const orientation = (p, q, r) => {
  const pX = Math.abs(p.geometry.coordinates[0]);
  const pY = Math.abs(p.geometry.coordinates[1]);
  const qX = Math.abs(q.geometry.coordinates[0]);
  const qY = Math.abs(q.geometry.coordinates[1]);
  const rX = Math.abs(r.geometry.coordinates[0]);
  const rY = Math.abs(r.geometry.coordinates[1]);

  const val = (qY - pY) * (rX - qX) - (qX - pX) * (rY - qY);
  if (val === 0) {
    return 0;
  }

  return val > 0 ? 1 : 2;
};

export const convexHull = () => {
  const points = [...usaCapitals.features];

  let leftmostPoint = points[0];

  points.forEach((point) => {
    if (point.geometry.coordinates[0] < leftmostPoint.geometry.coordinates[0]) {
      leftmostPoint = point;
    }
  });

  const path = [leftmostPoint];
  const pathAnimation = [[...path]];

  while (true) {
    const currentPoint = path[path.length - 1];
    let [selectedIndex, selected] = [0, null];

    points.forEach((point, pointIndex) => {
      if (!selected || orientation(currentPoint, point, selected) === 2) {
        [selectedIndex, selected] = [pointIndex, point];
      }
    });

    points.splice(selectedIndex, 1);

    if (selected.properties.state === leftmostPoint.properties.state) {
      break;
    }

    path.push(selected);
    pathAnimation.push([...path]);
  }

  while (points.length > 0) {
    let [bestRatio, bestPointIndex, insertIndex] = [Infinity, null, 0];

    points.forEach((basicPoint, basicPointIndex) => {
      let [bestCost, bestCostIndex] = [Infinity, 0];

      path.forEach((pathPoint, pathPointIndex) => {
        const nextPathPoint = path[(pathPointIndex + 1) % path.length];

        const evalCost =
          getDistanceFromCoords(
            pathPoint.geometry.coordinates,
            basicPoint.geometry.coordinates,
          ) +
          getDistanceFromCoords(
            basicPoint.geometry.coordinates,
            nextPathPoint.geometry.coordinates,
          ) -
          getDistanceFromCoords(
            pathPoint.geometry.coordinates,
            nextPathPoint.geometry.coordinates,
          );

        if (evalCost < bestCost) {
          [bestCost, bestCostIndex] = [evalCost, pathPointIndex];
        }
      });

      const nextPoint = path[(bestCostIndex + 1) % path.length];
      const prevCost = getDistanceFromCoords(
        path[bestCostIndex].geometry.coordinates,
        nextPoint.geometry.coordinates,
      );
      const newCost =
        getDistanceFromCoords(
          path[bestCostIndex].geometry.coordinates,
          basicPoint.geometry.coordinates,
        ) +
        getDistanceFromCoords(
          basicPoint.geometry.coordinates,
          nextPoint.geometry.coordinates,
        );

      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIndex, insertIndex] = [
          ratio,
          basicPointIndex,
          bestCostIndex + 1,
        ];
      }
    });

    const [nextPoint] = points.splice(bestPointIndex, 1);
    path.splice(insertIndex, 0, nextPoint);
    pathAnimation.push([...path]);
  }

  path.push(path[0]);
  pathAnimation.push([...path]);

  return pathAnimation;
};

export default convexHull;
