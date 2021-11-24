import { getDistanceFromLatLonInKm } from 'components/TspVisualizer/helpers';
import UsaCapitals from 'components/TspVisualizer/UsaCapitals';

const nearestNeighbour = () => {
  const points = [...UsaCapitals.features];

  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  const path = [randomItem];

  while (points.length > 0) {
    points.sort(
      (a, b) =>
        getDistanceFromLatLonInKm(
          path[path.length - 1].geometry.coordinates,
          b.geometry.coordinates,
        ) -
        getDistanceFromLatLonInKm(
          path[path.length - 1].geometry.coordinates,
          a.geometry.coordinates,
        ),
    );

    path.push(points.pop());
  }

  path.push(path[0]);
  return path;
};

export default nearestNeighbour;
