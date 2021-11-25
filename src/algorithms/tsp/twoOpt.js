import { totalPathCost } from './helpers';
import randomNearestNeighbour from './randomNearestNeighbour';

const twoOptHelper = () => {
  const pathAnimation = randomNearestNeighbour();

  const initialPath = pathAnimation[pathAnimation.length - 1];
  let best = totalPathCost(initialPath);

  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let pointA = 1; pointA < initialPath.length - 1; pointA += 1) {
      for (
        let pointB = pointA + 1;
        pointB < initialPath.length - 1;
        pointB += 1
      ) {
        const subPath = initialPath.slice(pointA, pointB + 1);
        subPath.reverse();

        initialPath.splice(pointA, pointB + 1 - pointA, ...subPath);

        const newPath = initialPath;
        const cost = totalPathCost(newPath);

        if (cost < best) {
          swapped = true;
          best = cost;
          pathAnimation.push([...newPath]);
        } else {
          subPath.reverse();
          initialPath.splice(pointA, pointB + 1 - pointA, ...subPath);
        }
      }
    }
  }

  return pathAnimation;
};

const twoOpt = () => {
  let [bestPath, smallestDistance] = [null, Infinity];
  const iterations = [];
  for (let i = 0; i < 15; i += 1) {
    const trial = twoOptHelper();
    const cost = totalPathCost(trial[trial.length - 1]);

    if (cost < smallestDistance) {
      smallestDistance = cost;
      bestPath = trial;
      iterations.push(i);
    }
  }

  bestPath.splice(48, 1);
  return bestPath;
};

export default twoOpt;
