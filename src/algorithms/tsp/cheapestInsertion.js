import usaCapitals from 'components/TspVisualizer/UsaCapitals';
import { getInsertionCost } from './helpers';

const cheapestInsertion = () => {
  const points = [...usaCapitals.features];

  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  const path = [randomItem];

  path.push(path[0]);
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    let [bestCost, bestInsertionIndex, bestPointIndex] = [Infinity, null, null];

    points.forEach((point, pointIndex) => {
      for (let i = 1; i < path.length; i += 1) {
        const cost = getInsertionCost(path[i - 1], point, path[i]);
        if (cost < bestCost) {
          [bestCost, bestInsertionIndex, bestPointIndex] = [
            cost,
            i,
            pointIndex,
          ];
        }
      }
    });

    const [nextPoint] = points.splice(bestPointIndex, 1);

    path.splice(bestInsertionIndex, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  return pathsAnimation;
};

export default cheapestInsertion;
