import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';
import UsaCapitals from 'components/TspVisualizer/UsaCapitals';

const nearestInsertion = () => {
  const points = [...UsaCapitals.features];

  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  const path = [randomItem];

  points.sort(
    (a, b) =>
      getDistanceFromCoords(
        path[path.length - 1].geometry.coordinates,
        b.geometry.coordinates,
      ) -
      getDistanceFromCoords(
        path[path.length - 1].geometry.coordinates,
        a.geometry.coordinates,
      ),
  );

  path.push(points.pop());
  path.push(path[0]);
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    let [closestPointIndex, closestDistance] = [null, Infinity];

    points.forEach((point, pointIndex) => {
      path.forEach((pathPoint) => {
        const dist = getDistanceFromCoords(
          pathPoint.geometry.coordinates,
          point.geometry.coordinates,
        );

        if (dist < closestDistance) {
          closestPointIndex = pointIndex;
          closestDistance = dist;
        }
      });
    });

    const [nextPoint] = points.splice(closestPointIndex, 1);

    let [bestCost, bestPointIndex] = [Infinity, null];

    for (let i = 1; i < path.length; i += 1) {
      const insertionCost =
        getDistanceFromCoords(
          path[i - 1].geometry.coordinates,
          nextPoint.geometry.coordinates,
        ) +
        getDistanceFromCoords(
          nextPoint.geometry.coordinates,
          path[i].geometry.coordinates,
        );

      if (insertionCost < bestCost) {
        [bestCost, bestPointIndex] = [insertionCost, i];
      }
    }
    path.splice(bestPointIndex, 0, nextPoint);

    pathsAnimation.push([...path]);
  }

  return pathsAnimation;
};

export default nearestInsertion;
