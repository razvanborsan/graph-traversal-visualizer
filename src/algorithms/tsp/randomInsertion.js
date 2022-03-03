import usaCapitals from 'components/TspVisualizer/UsaCapitals';
import { randomIntFromInterval } from 'shared/variables';
import { computeCost } from './helpers';

const randomInsertion = () => {
  const points = [...usaCapitals.features];

  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  const path = [randomItem];

  path.push(path[0]);
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    const closestPointIndex = randomIntFromInterval(0, points.length - 1);

    const [nextPoint] = points.splice(closestPointIndex, 1);

    const bestPointIndex = computeCost(path, nextPoint);
    path.splice(bestPointIndex, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  return pathsAnimation;
};

export default randomInsertion;
